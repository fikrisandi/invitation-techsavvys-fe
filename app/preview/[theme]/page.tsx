import { notFound } from "next/navigation";
import { dummyData } from "@/lib/dummy";
import EmeraldGoldTheme from "@/themes/emerald-gold";
import MidnightBlueTheme from "@/themes/midnight-blue";
import YlangYlangTheme from "@/themes/ylang-ylang";
import RoseBlushTheme from "@/themes/rose-blush";

const THEMES = {
  "emerald-gold": EmeraldGoldTheme,
  "midnight-blue": MidnightBlueTheme,
  "ylang-ylang": YlangYlangTheme,
  "rose-blush": RoseBlushTheme,
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
      {/* Preview watermark */}
      <div style={{
        position: "fixed", top: "16px", left: "16px", zIndex: 9999,
        background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px",
        padding: "8px 14px", display: "flex", alignItems: "center", gap: "8px",
        pointerEvents: "none",
      }}>
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00BFA5", animation: "pulse-ring 2s infinite" }} />
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", fontFamily: "Outfit, sans-serif", letterSpacing: "0.05em" }}>PREVIEW — Data Dummy</span>
      </div>

      <ThemeComponent data={previewData} guestName="Tamu Undangan" />
    </>
  );
}

export async function generateStaticParams() {
  return Object.keys(THEMES).map((theme) => ({ theme }));
}
