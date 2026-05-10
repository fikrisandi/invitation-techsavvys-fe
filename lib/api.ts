import type { InvitationData } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? "";

const apiHeaders: Record<string, string> = {
  ...(API_KEY ? { "X-API-Key": API_KEY } : {}),
};

// ============ AUTHENTICATED REQUEST HELPERS ============

interface RequestOptions {
  method?: string;
  body?: unknown;
  token?: string;
}

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function api(endpoint: string, options: RequestOptions = {}) {
  const { method = "GET", body, token } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (API_KEY) headers["X-API-Key"] = API_KEY;
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(data.error || "Request failed", res.status);
  }

  return data;
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

export function getRefreshToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refreshToken");
}

export function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

export function clearTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}

export type UserRole = "ADMIN" | "CLIENT";

export interface CurrentUser {
  id: string;
  name: string;
  username?: string | null;
  email: string | null;
  role: UserRole;
  isActive?: boolean;
}

export function setStoredUser(user: CurrentUser) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getStoredUser(): CurrentUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CurrentUser;
  } catch {
    return null;
  }
}

export const MAIN_URL = process.env.NEXT_PUBLIC_MAIN_URL ?? "https://techsavvys-official.com";

export function homeForRole(role?: UserRole | null): string {
  if (role === "CLIENT") return "/dashboard";
  // ADMIN diarahkan ke main domain (admin tidak di subdomain invitation)
  return `${MAIN_URL}/admin/portfolios`;
}

export async function uploadImage(file: File, endpoint = "/api/upload"): Promise<string> {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };
  if (API_KEY) headers["X-API-Key"] = API_KEY;

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers,
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new ApiError(data.error || "Upload failed", res.status);
  }
  return data.imageUrl;
}

export async function apiAuth(endpoint: string, options: RequestOptions = {}) {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");

  try {
    return await api(endpoint, { ...options, token });
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const data = await api("/api/auth/refresh", {
            method: "POST",
            body: { refreshToken },
          });
          setTokens(data.accessToken, refreshToken);
          return await api(endpoint, { ...options, token: data.accessToken });
        } catch {
          clearTokens();
          if (typeof window !== "undefined") window.location.href = "/login";
          throw new Error("Session expired");
        }
      }
    }
    throw err;
  }
}

// ============ END AUTH HELPERS ============

export type ActiveDiscount = { id: string; label: string | null; percentage: number; startAt: string; endAt: string };

export async function getActiveDiscount(): Promise<ActiveDiscount | null> {
  if (!BASE_URL) return null;
  try {
    const res = await fetch(`${BASE_URL}/api/discounts/active`, {
      headers: apiHeaders,
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.percentage ? data : null;
  } catch {
    return null;
  }
}

export async function getInvitation(slug: string, guestName?: string): Promise<InvitationData | null> {
  if (!BASE_URL) return null;
  try {
    const query = guestName ? `?to=${encodeURIComponent(guestName)}` : "";
    const res = await fetch(`${BASE_URL}/api/invitations/${slug}${query}`, {
      headers: apiHeaders,
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function submitRsvp(
  slug: string,
  payload: { name: string; attendance: string; guests: string; message: string }
) {
  const res = await fetch(`${BASE_URL}/api/invitations/${slug}/rsvp`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...apiHeaders },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("RSVP gagal");
}

export async function getWishes(slug: string) {
  if (!BASE_URL) return [];
  try {
    const res = await fetch(`${BASE_URL}/api/invitations/${slug}/wishes`, {
      headers: apiHeaders,
      next: { revalidate: 30 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
