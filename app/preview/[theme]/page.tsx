import Link from "next/link";
import { notFound } from "next/navigation";
import { dummyData } from "@/lib/dummy";
import EffectLayer from "@/effects/EffectLayer";
import EmeraldGoldTheme from "@/themes/emerald-gold";
import MidnightBlueTheme from "@/themes/midnight-blue";
import YlangYlangTheme from "@/themes/ylang-ylang";
import RoseBlushTheme from "@/themes/rose-blush";
import JawaKlasikTheme from "@/themes/jawa-klasik";
import SundaKlasikTheme from "@/themes/sunda-klasik";
import CinematicTheme from "@/themes/cinematic";
import GalaxyTheme from "@/themes/galaxy";
import SakuraBloomTheme from "@/themes/sakura-bloom";

const THEMES = {
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

type Props = { params: Promise<{ theme: string }> };

export default async function PreviewPage({ params }: Props) {
  const { theme } = await params;

  if (!(theme in THEMES)) {
    notFound();
  }

  const ThemeComponent = THEMES[theme as keyof typeof THEMES];
  const previewData = { ...dummyData, theme: theme as keyof typeof THEMES, slug: "preview" };

  return (
    <>
      {/* Back button */}
      <Link href="/" style={{
        position: "fixed", top: "16px", left: "16px", zIndex: 9999,
        background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px",
        padding: "10px 16px", display: "flex", alignItems: "center", gap: "8px",
        textDecoration: "none", cursor: "pointer", transition: "all 0.25s ease",
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
        </svg>
        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.85)", fontFamily: "Outfit, sans-serif", fontWeight: 600, letterSpacing: "0.04em" }}>Kembali</span>
      </Link>

      {/* Preview watermark */}
      <div style={{
        position: "fixed", top: "16px", right: "16px", zIndex: 9999,
        background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px",
        padding: "8px 14px", display: "flex", alignItems: "center", gap: "8px",
        pointerEvents: "none",
      }}>
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00BFA5", animation: "pulse-ring 2s infinite" }} />
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", fontFamily: "Outfit, sans-serif", letterSpacing: "0.05em" }}>PREVIEW</span>
      </div>

      <EffectLayer theme={theme} />

      <ThemeComponent data={previewData} guestName="Tamu Undangan" />
    </>
  );
}

export async function generateStaticParams() {
  return Object.keys(THEMES).map((theme) => ({ theme }));
}
