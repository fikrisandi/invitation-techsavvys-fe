"use client";

import { SakuraDivider } from "./SakuraEffect";
import { useInvitation } from "../context";

export default function LoveStory() {
  const { loveStory } = useInvitation();
  if (!loveStory || loveStory.length === 0) return null;

  return (
    <section
      id="love-story"
      style={{
        background: "var(--sakura-bg-alt-t)",
        padding: "120px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "var(--sakura-text-soft)",
              marginBottom: "20px",
              fontFamily: "var(--font-sakura-body)",
            }}
          >
            Our Journey
          </p>
          <h2
            style={{
              fontFamily: "var(--font-sakura-script)",
              fontSize: "clamp(2.2rem, 7vw, 3.2rem)",
              color: "var(--sakura-pink)",
              marginBottom: "8px",
            }}
          >
            Perjalanan Cinta
          </h2>
          <SakuraDivider />
        </div>

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: "24px",
              top: "12px",
              bottom: "12px",
              width: "1px",
              background:
                "linear-gradient(to bottom, transparent, var(--sakura-pink), var(--sakura-pink-light), transparent)",
              opacity: 0.4,
            }}
          />

          {loveStory.map((entry, i) => (
            <div
              key={i}
              className="reveal-up"
              style={{
                display: "flex",
                gap: "24px",
                marginBottom: i === loveStory.length - 1 ? 0 : "40px",
                position: "relative",
              }}
            >
              <div style={{ flexShrink: 0, width: "48px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--sakura-pink)",
                    background: "rgba(255,255,255,0.85)",
                    boxShadow: "0 2px 14px rgba(212,112,138,0.22)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-sakura-script)",
                      fontSize: "1.3rem",
                      color: "var(--sakura-pink-dark)",
                      fontWeight: 400,
                    }}
                  >
                    {entry.year.slice(-2)}
                  </span>
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.82)",
                  border: "1px solid var(--sakura-border)",
                  boxShadow: "0 4px 20px rgba(212,112,138,0.1)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                {entry.image && (
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "16/9",
                      overflow: "hidden",
                      borderBottom: "1px solid var(--sakura-border)",
                    }}
                  >
                    <img
                      src={entry.image}
                      alt={entry.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                )}
                <div style={{ padding: "22px 24px 24px" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-sakura-body)",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase" as const,
                      color: "var(--sakura-pink)",
                      marginBottom: "8px",
                    }}
                  >
                    {entry.year}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-sakura-script)",
                      fontSize: "1.9rem",
                      color: "var(--sakura-pink-dark)",
                      marginBottom: "10px",
                    }}
                  >
                    {entry.title}
                  </h3>
                  <p style={{ fontSize: "13px", lineHeight: 1.85, color: "var(--sakura-text-soft)" }}>
                    {entry.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
