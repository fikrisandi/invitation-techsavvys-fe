"use client";

import { MegaMendung, SundaDivider } from "./SundaOrnament";
import { useInvitation } from "../context";

export default function LoveStory() {
  const { loveStory } = useInvitation();
  if (!loveStory || loveStory.length === 0) return null;

  return (
    <section id="love-story" style={{ background: "var(--sunda-bg-t)", position: "relative", overflow: "hidden" }}>
      {/* Top mega mendung */}
      <div style={{ display: "flex", justifyContent: "center", opacity: 0.3 }}>
        <MegaMendung />
      </div>

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "80px 32px", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontFamily: "var(--font-sunda-body)", fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase" as const, color: "var(--sunda-gold)", marginBottom: "16px" }}>Our Journey</p>
          <h2 style={{ fontFamily: "var(--font-sunda-script)", fontSize: "clamp(2rem, 7vw, 2.8rem)", color: "var(--sunda-text)", marginBottom: "16px" }}>Perjalanan Cinta</h2>
          <SundaDivider />
        </div>

        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "24px", top: "12px", bottom: "12px", width: "1px", background: "linear-gradient(to bottom, transparent, var(--sunda-gold), var(--sunda-terra), transparent)", opacity: 0.5 }} />

          {loveStory.map((entry, i) => (
            <div key={i} className="reveal-up" style={{ display: "flex", gap: "20px", marginBottom: i === loveStory.length - 1 ? 0 : "36px", position: "relative" }}>
              <div style={{ flexShrink: 0, width: "48px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid var(--sunda-gold)",
                  background: "linear-gradient(135deg, rgba(200,144,32,0.15), rgba(176,80,32,0.12))",
                  boxShadow: "0 0 16px rgba(200,144,32,0.25)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}>
                  <span style={{ fontFamily: "var(--font-sunda-script)", fontSize: "1.2rem", color: "var(--sunda-text)", fontWeight: 400 }}>{entry.year.slice(-2)}</span>
                </div>
              </div>

              <div style={{
                flex: 1,
                borderRadius: "6px",
                overflow: "hidden",
                background: "rgba(200,144,32,0.04)",
                border: "1px solid var(--sunda-border)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}>
                {entry.image && (
                  <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", borderBottom: "1px solid var(--sunda-border)" }}>
                    <img src={entry.image} alt={entry.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
                <div style={{ padding: "20px 22px 22px" }}>
                  <p style={{ fontFamily: "var(--font-sunda-body)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase" as const, color: "var(--sunda-gold)", marginBottom: "8px" }}>{entry.year}</p>
                  <h3 style={{ fontFamily: "var(--font-sunda-display)", fontStyle: "italic", fontSize: "1.5rem", color: "var(--sunda-text)", marginBottom: "10px" }}>{entry.title}</h3>
                  <p style={{ fontSize: "13px", lineHeight: 1.85, color: "var(--sunda-text-soft)" }}>{entry.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom mega mendung */}
      <div style={{ display: "flex", justifyContent: "center", opacity: 0.3 }}>
        <MegaMendung flip />
      </div>
    </section>
  );
}
