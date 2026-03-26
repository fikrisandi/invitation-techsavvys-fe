"use client";

import { useInvitation } from "../context";

export default function Footer() {
  const { groom, bride } = useInvitation();
  return (
    <footer className="grad-mb-footer relative overflow-hidden text-center">
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "120px 32px 50px" }}>
        <div className="reveal-up" style={{ marginBottom: "48px" }}>
          {/* Star ornament */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", justifyContent: "center", marginBottom: "40px" }}>
            <div style={{ flex: 1, maxWidth: "60px", height: "1px", background: "linear-gradient(to right, transparent, var(--color-blue-accent))", opacity: 0.3 }} />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-blue-accent)" opacity="0.4"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <div style={{ flex: 1, maxWidth: "60px", height: "1px", background: "linear-gradient(to left, transparent, var(--color-blue-accent))", opacity: 0.3 }} />
          </div>
          <p style={{ fontFamily: "var(--font-display-mb)", fontSize: "15px", fontWeight: 300, fontStyle: "italic", lineHeight: 2.2, marginBottom: "4px", color: "var(--color-text-mb)", opacity: 0.8 }}>
            &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya.&rdquo;
          </p>
          <p style={{ fontSize: "11px", marginBottom: "40px", letterSpacing: "0.15em", color: "var(--color-text-mb-dim)" }}>— QS. Ar-Rum: 21</p>
        </div>
        <div className="reveal-up delay-2">
          <p className="shimmer-blue my-4" style={{ fontFamily: "var(--font-display-mb)", fontSize: "clamp(1.8rem, 5vw, 2.4rem)", fontStyle: "italic" }}>
            {groom.nickname} &amp; {bride.nickname}
          </p>
          <p style={{ fontSize: "11px", lineHeight: 2.2, maxWidth: "300px", margin: "0 auto 16px", opacity: 0.6, color: "var(--color-text-mb)", fontFamily: "var(--font-body-mb)" }}>
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu.
          </p>
          <p style={{ fontSize: "11px", letterSpacing: "0.15em", marginBottom: "48px", color: "var(--color-text-mb-muted)", fontFamily: "var(--font-body-mb)" }}>Wassalamu&apos;alaikum Wr. Wb.</p>
        </div>
        <div style={{ height: "1px", width: "100%", background: "linear-gradient(to right, transparent, var(--color-blue-accent), transparent)", opacity: 0.1, marginBottom: "20px" }} />
        <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, opacity: 0.35, color: "var(--color-text-mb-dim)", fontFamily: "var(--font-body-mb)" }}>
          &copy; {new Date().getFullYear()} — Kami Yang Berbahagia &bull; Powered by{" "}
          <a href="https://techsavvys.com" style={{ color: "var(--color-blue-accent)", textDecoration: "none", opacity: 0.7 }}>Invitation Savvys</a>
        </p>
      </div>
    </footer>
  );
}
