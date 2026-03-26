import type { InvitationData } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function getInvitation(slug: string): Promise<InvitationData | null> {
  if (!BASE_URL) return null;
  try {
    const res = await fetch(`${BASE_URL}/api/invitation/${slug}`, {
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
  const res = await fetch(`${BASE_URL}/api/invitation/${slug}/rsvp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("RSVP gagal");
}

export async function getWishes(slug: string) {
  if (!BASE_URL) return [];
  try {
    const res = await fetch(`${BASE_URL}/api/invitation/${slug}/wishes`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
