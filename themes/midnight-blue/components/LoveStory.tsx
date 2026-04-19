"use client";

import { useInvitation } from "../context";

export default function LoveStory() {
  const { loveStory } = useInvitation();
  if (!loveStory || loveStory.length === 0) return null;

  return (
    <section id="love-story" className="grad-mb-alt relative overflow-hidden geo-pattern-mb">
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "140px 32px", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "72px" }}>
          <p style={{ letterSpacing: "0.5em", textTransform: "uppercase" as const, fontSize: "9px", fontWeight: 500, marginBottom: "24px", color: "var(--color-silver-dark)", fontFamily: "var(--font-body-mb)" }}>Our Journey</p>
          <h2 className="shimmer-silver" style={{ fontFamily: "var(--font-display-mb)", fontSize: "clamp(2rem, 6vw, 2.8rem)", fontStyle: "italic", marginBottom: "20px" }}>Perjalanan Cinta</h2>
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(to right, transparent, var(--color-blue-accent), transparent)", margin: "0 auto", opacity: 0.4 }} />
        </div>

        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "24px", top: "12px", bottom: "12px", width: "1px", background: "linear-gradient(to bottom, transparent, var(--color-blue-accent), transparent)", opacity: 0.4 }} />

          {loveStory.map((entry, i) => (
            <div key={i} className="reveal-up" style={{ display: "flex", gap: "24px", marginBottom: i === loveStory.length - 1 ? 0 : "40px", position: "relative" }}>
              <div style={{ flexShrink: 0, width: "48px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="glass-mb-blue" style={{ width: "48px", height: "48px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(74,158,232,0.3)", boxShadow: "0 0 20px rgba(74,158,232,0.2)" }}>
                  <span style={{ fontFamily: "var(--font-display-mb)", fontStyle: "italic", fontSize: "1.1rem", color: "var(--color-silver-light)", fontWeight: 600 }}>{entry.year.slice(-2)}</span>
                </div>
              </div>

              <div className="glass-mb" style={{ flex: 1, borderRadius: "16px", overflow: "hidden" }}>
                {entry.image && (
                  <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", borderBottom: "1px solid var(--color-glass-mb-border)" }}>
                    <img src={entry.image} alt={entry.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
                <div style={{ padding: "22px 24px 24px" }}>
                  <p style={{ fontFamily: "var(--font-body-mb)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "var(--color-blue-accent)", marginBottom: "8px" }}>{entry.year}</p>
                  <h3 style={{ fontFamily: "var(--font-display-mb)", fontStyle: "italic", fontSize: "1.5rem", color: "var(--color-silver-light)", marginBottom: "10px" }}>{entry.title}</h3>
                  <p style={{ fontSize: "13px", lineHeight: 1.85, color: "var(--color-text-mb)" }}>{entry.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
