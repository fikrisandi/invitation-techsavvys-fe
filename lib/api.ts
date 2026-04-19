import type { InvitationData } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? "";

const apiHeaders: Record<string, string> = {
  ...(API_KEY ? { "X-API-Key": API_KEY } : {}),
};

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
