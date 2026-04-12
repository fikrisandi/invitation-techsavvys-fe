export const dynamic = "force-dynamic";

import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getInvitation } from "@/lib/api";
import { generateColorOverrideCSS } from "@/lib/color-overrides";
import EmeraldGoldTheme from "@/themes/emerald-gold";
import MidnightBlueTheme from "@/themes/midnight-blue";
import YlangYlangTheme from "@/themes/ylang-ylang";
import RoseBlushTheme from "@/themes/rose-blush";
import JawaKlasikTheme from "@/themes/jawa-klasik";
import SundaKlasikTheme from "@/themes/sunda-klasik";
import CinematicTheme from "@/themes/cinematic";
import GalaxyTheme from "@/themes/galaxy";
import SakuraBloomTheme from "@/themes/sakura-bloom";
import EffectLayer from "@/effects/EffectLayer";
import type { EffectName } from "@/effects/index";
import type { InvitationData } from "@/lib/types";
import type { Metadata } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

function resolveUploadUrls(data: InvitationData): InvitationData {
  const fix = (url?: string) => {
    if (!url) return url;
    if (url.startsWith("http")) return url;
    return `${API_URL}${url}`;
  };
  return {
    ...data,
    musicUrl: fix(data.musicUrl),
    groom: { ...data.groom, photo: fix(data.groom.photo) },
    bride: { ...data.bride, photo: fix(data.bride.photo) },
    photos: data.photos.map((p) => fix(p) ?? p),
  };
}

const THEMES: Record<string, React.ComponentType<{ data: InvitationData; guestName?: string }>> = {
  "emerald-gold": EmeraldGoldTheme,
  "midnight-blue": MidnightBlueTheme,
  "ylang-ylang": YlangYlangTheme,
  "rose-blush": RoseBlushTheme,
  "jawa-klasik": JawaKlasikTheme,
  "sunda-klasik": SundaKlasikTheme,
  "cinematic": CinematicTheme,
  "galaxy": GalaxyTheme,
  "sakura-bloom": SakuraBloomTheme,
};

const THEME_IDS = new Set(Object.keys(THEMES));

type Props = {
  params: Promise<{ path?: string[] }>;
  searchParams: Promise<{ to?: string }>;
};

function parsePath(path?: string[]): { theme?: string; slug?: string } {
  if (!path || path.length === 0) return {};
  if (path.length === 1) return { slug: path[0] };
  if (path.length === 2) return { theme: path[0], slug: path[1] };
  return {};
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { path } = await params;
  const { to } = await searchParams;
  const { slug } = parsePath(path);
  if (!slug) return { title: "Tech Savvys Invitation" };

  const guestName = to ? decodeURIComponent(to.replace(/\+/g, " ")) : undefined;
  const data = await getInvitation(slug, guestName);
  if (!data) return { title: "Undangan tidak ditemukan" };
  return {
    title: `Undangan ${data.groom.nickname} & ${data.bride.nickname}`,
    description: guestName
      ? `Kepada ${guestName} — Undangan pernikahan ${data.groom.nickname} & ${data.bride.nickname}`
      : `Undangan pernikahan ${data.groom.nickname} & ${data.bride.nickname}`,
    openGraph: {
      title: `${data.groom.nickname} & ${data.bride.nickname}`,
      description: `Undangan Pernikahan — ${data.events[0]?.date ?? ""}`,
    },
  };
}

function isExpired(data: InvitationData): boolean {
  if (!data.expiredAt) return false;
  return new Date(data.expiredAt) < new Date();
}

function ExpiredPage({ data }: { data: InvitationData }) {
  return (
    <div style={{ minHeight: "100vh", background: "#060608", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ textAlign: "center", maxWidth: "400px" }}>
        <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(255,107,138,0.1)", border: "1px solid rgba(255,107,138,0.2)", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6B8A" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#EEEEF2", marginBottom: "12px" }}>
          Undangan Telah Berakhir
        </h1>
        <p style={{ color: "#666672", fontSize: "14px", lineHeight: 1.8, marginBottom: "32px" }}>
          Undangan pernikahan <strong style={{ color: "#EEEEF2" }}>{data.groom.nickname} &amp; {data.bride.nickname}</strong> sudah tidak aktif.
        </p>
        <Link href="/" style={{ display: "inline-block", background: "rgba(0,191,165,0.1)", border: "1px solid rgba(0,191,165,0.25)", color: "#00BFA5", padding: "12px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: 500, textDecoration: "none" }}>
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

export default async function InvitationPage({ params, searchParams }: Props) {
  const { path } = await params;
  const { to } = await searchParams;
  const { theme, slug } = parsePath(path);

  // Root page (no path) — show home/landing
  if (!slug) {
    // Let the main page.tsx handle this
    return null;
  }

  const guestName = to ? decodeURIComponent(to.replace(/\+/g, " ")) : undefined;
  const data = await getInvitation(slug, guestName);
  if (!data) notFound();

  // Old format: /slug-only → redirect to /theme/slug
  if (!theme) {
    const query = to ? `?to=${encodeURIComponent(to)}` : "";
    redirect(`/${data.theme}/${slug}${query}`);
  }

  if (isExpired(data)) {
    return <ExpiredPage data={data} />;
  }

  const resolved = resolveUploadUrls(data);
  const ThemeComponent = THEMES[resolved.theme] ?? EmeraldGoldTheme;
  const colorCSS = resolved.customColors ? generateColorOverrideCSS(resolved.theme, resolved.customColors) : "";
  const hasCustomEffects = resolved.effects && resolved.effects.length > 0;

  return (
    <>
      {colorCSS && <style dangerouslySetInnerHTML={{ __html: colorCSS }} />}
      {hasCustomEffects && (
        <EffectLayer
          effects={resolved.effects as EffectName[]}
          effectConfig={resolved.effectConfig}
          theme={resolved.theme}
        />
      )}
      <ThemeComponent data={resolved} guestName={guestName} />
    </>
  );
}
