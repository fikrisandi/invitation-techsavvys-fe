"use client";

import { useInvitation } from "../context";

export default function Hero() {
  const { groom, bride, events, openingText } = useInvitation();
  const firstEvent = events[0];
  const lastEvent = events[events.length - 1];
  const dateLabel =
    firstEvent?.date === lastEvent?.date
      ? firstEvent?.date
      : `${firstEvent?.date} — ${lastEvent?.date}`;

  return (
    <section
      style={{
        minHeight: "100svh",
        background: "var(--galaxy-bg-t)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Nebula bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 30%, rgba(232,121,160,0.1) 0%, transparent 50%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Decorative star dots */}
      {Array.from({ length: 20 }).map((_, i) => {
        const tops = [8, 15, 23, 31, 42, 55, 67, 72, 80, 88, 12, 28, 46, 61, 75, 19, 37, 53, 69, 84];
        const lefts = [5, 18, 33, 47, 62, 78, 91, 12, 27, 44, 59, 73, 86, 7, 22, 39, 54, 68, 82, 96];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${tops[i]}%`,
              left: `${lefts[i]}%`,
              width: i % 5 === 0 ? "3px" : "1.5px",
              height: i % 5 === 0 ? "3px" : "1.5px",
              borderRadius: "50%",
              background: i % 3 === 0 ? "var(--galaxy-purple)" : "rgba(255,255,255,0.6)",
              opacity: 0.5 + (i % 3) * 0.15,
              animation: `galaxy-twinkle-h ${3 + (i % 4)}s ease-in-out ${i * 0.4}s infinite`,
            }}
          />
        );
      })}

      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "120px 48px",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <p
          className="reveal-up"
          style={{
            fontFamily: "var(--font-galaxy-body)",
            fontSize: "9px",
            letterSpacing: "0.7em",
            textTransform: "uppercase",
            color: "var(--galaxy-text-soft)",
            marginBottom: "40px",
          }}
        >
          {openingText ?? "The Wedding Of"}
        </p>

        {/* Names with nebula gradient */}
        <h1
          className="reveal-up delay-2"
          style={{
            fontFamily: "var(--font-galaxy-script)",
            fontSize: "clamp(4rem, 18vw, 9rem)",
            fontWeight: 400,
            lineHeight: 1,
            background: "linear-gradient(135deg, var(--galaxy-text) 0%, var(--galaxy-purple) 50%, var(--galaxy-pink) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "4px",
          }}
        >
          {groom.nickname}
        </h1>

        <p
          className="reveal-up delay-3"
          style={{
            fontFamily: "var(--font-galaxy-display)",
            fontStyle: "italic",
            fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
            color: "var(--galaxy-purple)",
            opacity: 0.8,
            marginBottom: "4px",
          }}
        >
          &amp;
        </p>

        <h1
          className="reveal-up delay-4"
          style={{
            fontFamily: "var(--font-galaxy-script)",
            fontSize: "clamp(4rem, 18vw, 9rem)",
            fontWeight: 400,
            lineHeight: 1,
            background: "linear-gradient(135deg, var(--galaxy-pink) 0%, var(--galaxy-purple) 50%, var(--galaxy-text) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "48px",
          }}
        >
          {bride.nickname}
        </h1>

        <div className="reveal-up delay-5">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              maxWidth: "280px",
              margin: "0 auto 20px",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "var(--galaxy-purple)", opacity: 0.4 }} />
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--galaxy-purple)", opacity: 0.8 }} />
            <div style={{ flex: 1, height: "1px", background: "var(--galaxy-purple)", opacity: 0.4 }} />
          </div>
          <p
            style={{
              fontFamily: "var(--font-galaxy-body)",
              fontSize: "9px",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "var(--galaxy-gold)",
              fontWeight: 500,
            }}
          >
            {dateLabel}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes galaxy-twinkle-h {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 0.9; transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
}
