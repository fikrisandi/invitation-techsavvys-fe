"use client";

import { CineRule } from "./CineOrnament";
import { useInvitation } from "../context";

export default function LoveStory() {
  const { loveStory } = useInvitation();
  if (!loveStory || loveStory.length === 0) return null;

  return (
    <section
      id="love-story"
      style={{
        background: "var(--cine-bg-t)",
        padding: "120px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top rule */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(to right, transparent, var(--cine-gold), transparent)",
          opacity: 0.2,
        }}
      />

      <div style={{ maxWidth: "760px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p
            style={{
              fontFamily: "var(--font-cine-body)",
              fontSize: "8px",
              letterSpacing: "0.6em",
              textTransform: "uppercase",
              color: "var(--cine-text-soft)",
              marginBottom: "24px",
            }}
          >
            Our Journey
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cine-display)",
              fontStyle: "italic",
              fontSize: "clamp(2rem, 6vw, 3.2rem)",
              fontWeight: 700,
              color: "var(--cine-text)",
              marginBottom: "24px",
            }}
          >
            Perjalanan Cinta
          </h2>
          <CineRule />
        </div>

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: "24px",
              top: "12px",
              bottom: "12px",
              width: "1px",
              background: "linear-gradient(to bottom, transparent, var(--cine-gold), transparent)",
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
                    border: "1px solid var(--cine-gold)",
                    background: "var(--cine-card)",
                    boxShadow: "0 0 18px rgba(200,168,120,0.2)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-cine-display)",
                      fontStyle: "italic",
                      fontSize: "1.1rem",
                      color: "var(--cine-gold-light)",
                      fontWeight: 700,
                    }}
                  >
                    {entry.year.slice(-2)}
                  </span>
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  overflow: "hidden",
                  background: "var(--cine-card)",
                  border: "1px solid var(--cine-border)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                {entry.image && (
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "16/9",
                      overflow: "hidden",
                      borderBottom: "1px solid var(--cine-border)",
                    }}
                  >
                    <img
                      src={entry.image}
                      alt={entry.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.05) saturate(0.95)" }}
                    />
                  </div>
                )}
                <div style={{ padding: "22px 24px 24px" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-cine-body)",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.4em",
                      textTransform: "uppercase" as const,
                      color: "var(--cine-gold)",
                      marginBottom: "10px",
                    }}
                  >
                    {entry.year}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-cine-display)",
                      fontStyle: "italic",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--cine-text)",
                      marginBottom: "10px",
                    }}
                  >
                    {entry.title}
                  </h3>
                  <p style={{ fontSize: "13px", lineHeight: 1.85, color: "var(--cine-text-soft)" }}>
                    {entry.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(to right, transparent, var(--cine-gold), transparent)",
          opacity: 0.2,
        }}
      />
    </section>
  );
}
