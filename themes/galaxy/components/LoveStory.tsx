"use client";

import { useInvitation } from "../context";

export default function LoveStory() {
  const { loveStory } = useInvitation();
  if (!loveStory || loveStory.length === 0) return null;

  return (
    <section
      id="love-story"
      style={{
        background: "var(--galaxy-bg-mid-t)",
        padding: "120px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Nebula bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 80% 30%, rgba(139,92,246,0.08) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(232,121,160,0.06) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "760px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p
            style={{
              fontFamily: "var(--font-galaxy-body)",
              fontSize: "8px",
              letterSpacing: "0.6em",
              textTransform: "uppercase",
              color: "var(--galaxy-text-soft)",
              marginBottom: "24px",
            }}
          >
            Our Journey
          </p>
          <h2
            style={{
              fontFamily: "var(--font-galaxy-script)",
              fontSize: "clamp(2.2rem, 7vw, 3.5rem)",
              fontWeight: 400,
              background: "linear-gradient(135deg, var(--galaxy-purple), var(--galaxy-pink))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "16px",
            }}
          >
            Perjalanan Cinta
          </h2>
          <div
            style={{
              width: "60px",
              height: "1px",
              background: "linear-gradient(to right, transparent, var(--galaxy-purple), transparent)",
              margin: "0 auto",
              opacity: 0.6,
            }}
          />
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
                "linear-gradient(to bottom, transparent, var(--galaxy-purple), var(--galaxy-pink), transparent)",
              opacity: 0.5,
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
                    border: "1px solid var(--galaxy-border)",
                    background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(232,121,160,0.1))",
                    boxShadow: "0 0 20px rgba(139,92,246,0.25)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-galaxy-script)",
                      fontSize: "1.2rem",
                      color: "var(--galaxy-text)",
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
                  background: "rgba(139,92,246,0.05)",
                  border: "1px solid var(--galaxy-border)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}
              >
                {entry.image && (
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "16/9",
                      overflow: "hidden",
                      borderBottom: "1px solid var(--galaxy-border)",
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
                      fontFamily: "var(--font-galaxy-body)",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.4em",
                      textTransform: "uppercase" as const,
                      color: "var(--galaxy-gold)",
                      marginBottom: "8px",
                    }}
                  >
                    {entry.year}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-galaxy-display)",
                      fontSize: "1.3rem",
                      fontWeight: 600,
                      color: "var(--galaxy-text)",
                      marginBottom: "10px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {entry.title}
                  </h3>
                  <p style={{ fontSize: "13px", lineHeight: 1.85, color: "var(--galaxy-text-soft)" }}>
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
