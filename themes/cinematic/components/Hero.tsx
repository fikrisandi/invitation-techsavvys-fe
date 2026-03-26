"use client";

import { useInvitation } from "../context";
import { CineRule } from "./CineOrnament";

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
        background: "var(--cine-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Film grain overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage: `
            radial-gradient(ellipse at 25% 35%, rgba(255,255,255,1) 1px, transparent 1px),
            radial-gradient(ellipse at 75% 15%, rgba(255,255,255,0.8) 1px, transparent 1px),
            radial-gradient(ellipse at 45% 75%, rgba(255,255,255,0.9) 1px, transparent 1px),
            radial-gradient(ellipse at 80% 65%, rgba(255,255,255,0.6) 1px, transparent 1px),
            radial-gradient(ellipse at 15% 55%, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: "5px 5px, 7px 7px, 4px 4px, 6px 6px, 5px 5px",
          pointerEvents: "none",
        }}
      />

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
            fontFamily: "var(--font-cine-body)",
            fontSize: "9px",
            letterSpacing: "0.7em",
            textTransform: "uppercase",
            color: "var(--cine-text-soft)",
            marginBottom: "48px",
          }}
        >
          {openingText ?? "The Wedding Of"}
        </p>

        <h1
          className="reveal-up delay-2"
          style={{
            fontFamily: "var(--font-cine-display)",
            fontStyle: "italic",
            fontSize: "clamp(4rem, 16vw, 8rem)",
            fontWeight: 700,
            lineHeight: 1,
            color: "var(--cine-text)",
            letterSpacing: "-0.02em",
            marginBottom: "12px",
          }}
        >
          {groom.nickname}
        </h1>

        <p
          className="reveal-up delay-3"
          style={{
            fontFamily: "var(--font-cine-display)",
            fontStyle: "italic",
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            color: "var(--cine-gold)",
            opacity: 0.7,
            marginBottom: "12px",
          }}
        >
          &amp;
        </p>

        <h1
          className="reveal-up delay-4"
          style={{
            fontFamily: "var(--font-cine-display)",
            fontStyle: "italic",
            fontSize: "clamp(4rem, 16vw, 8rem)",
            fontWeight: 700,
            lineHeight: 1,
            color: "var(--cine-text)",
            letterSpacing: "-0.02em",
            marginBottom: "56px",
          }}
        >
          {bride.nickname}
        </h1>

        <div className="reveal-up delay-5" style={{ marginBottom: "48px" }}>
          <CineRule />
          <p
            style={{
              fontFamily: "var(--font-cine-body)",
              fontSize: "9px",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "var(--cine-gold)",
              marginTop: "24px",
              fontWeight: 500,
            }}
          >
            {dateLabel}
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          opacity: 0.4,
        }}
      >
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, var(--cine-gold), transparent)",
            animation: "cine-scroll-drop 2s ease-in-out infinite",
          }}
        />
        <p
          style={{
            fontFamily: "var(--font-cine-body)",
            fontSize: "7px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "var(--cine-text-soft)",
          }}
        >
          Scroll
        </p>
      </div>

      <style>{`
        @keyframes cine-scroll-drop {
          0%, 100% { opacity: 0.4; transform: scaleY(1); transform-origin: top; }
          50% { opacity: 0.8; transform: scaleY(1.2); transform-origin: top; }
        }
      `}</style>
    </section>
  );
}
