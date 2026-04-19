"use client";

import { RoseDivider } from "./FloralOrnament";
import { useInvitation } from "../context";

export default function LoveStory() {
  const { loveStory } = useInvitation();
  if (!loveStory || loveStory.length === 0) return null;

  return (
    <section id="love-story" className="grad-rb-alt relative overflow-hidden geo-rb" style={{ padding: "0" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "120px 32px", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ letterSpacing: "0.5em", textTransform: "uppercase" as const, fontSize: "9px", fontWeight: 700, marginBottom: "20px", color: "var(--color-rb-text-soft)", fontFamily: "var(--font-rb-body)" }}>Our Journey</p>
          <h2 style={{ fontFamily: "var(--font-rb-script)", fontSize: "clamp(2.2rem, 7vw, 3rem)", marginBottom: "8px", color: "var(--color-rb-dusty)" }}>Perjalanan Cinta</h2>
          <RoseDivider />
        </div>

        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "24px", top: "12px", bottom: "12px", width: "1px", background: "linear-gradient(to bottom, transparent, var(--color-rb-rose), transparent)", opacity: 0.4 }} />

          {loveStory.map((entry, i) => (
            <div key={i} className="reveal-up" style={{ display: "flex", gap: "24px", marginBottom: i === loveStory.length - 1 ? 0 : "40px", position: "relative" }}>
              <div style={{ flexShrink: 0, width: "48px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="card-rb-rose" style={{ width: "48px", height: "48px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(176,92,112,0.4)", boxShadow: "0 2px 12px rgba(176,92,112,0.18)", background: "rgba(255,255,255,0.9)" }}>
                  <span style={{ fontFamily: "var(--font-rb-script)", fontSize: "1.3rem", color: "var(--color-rb-rose)", fontWeight: 400 }}>{entry.year.slice(-2)}</span>
                </div>
              </div>

              <div className="card-rb" style={{ flex: 1, borderRadius: "16px", overflow: "hidden" }}>
                {entry.image && (
                  <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", borderBottom: "1px solid rgba(176,92,112,0.15)" }}>
                    <img src={entry.image} alt={entry.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
                <div style={{ padding: "22px 24px 24px" }}>
                  <p style={{ fontFamily: "var(--font-rb-body)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "var(--color-rb-rose)", marginBottom: "8px" }}>{entry.year}</p>
                  <h3 style={{ fontFamily: "var(--font-rb-script)", fontSize: "1.9rem", color: "var(--color-rb-rose-dark)", marginBottom: "10px" }}>{entry.title}</h3>
                  <p style={{ fontSize: "13px", lineHeight: 1.85, color: "var(--color-rb-text-mid)" }}>{entry.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
