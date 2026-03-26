"use client";
import { useInvitation } from "../context";
import { SakuraDivider } from "./SakuraEffect";

export default function Hero() {
  const { groom, bride, events, openingText } = useInvitation();
  const mainEvent = events[0];

  return (
    <section
      id="hero"
      style={{
        background: "var(--sakura-bg)",
        padding: "120px 32px 80px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background circle ornament */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          border: "1px solid var(--sakura-border)",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          border: "1px solid var(--sakura-border)",
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Label */}
        <p
          className="reveal-up"
          style={{
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.55em",
            textTransform: "uppercase",
            color: "var(--sakura-text-soft)",
            marginBottom: "24px",
            fontFamily: "var(--font-sakura-body)",
          }}
        >
          Dengan Penuh Sukacita
        </p>

        {/* Opening text or default */}
        <p
          className="reveal-up"
          style={{
            fontFamily: "var(--font-sakura-display)",
            fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
            color: "var(--sakura-text-soft)",
            lineHeight: 1.9,
            marginBottom: "48px",
            fontStyle: "italic",
            maxWidth: "480px",
            margin: "0 auto 48px",
          }}
        >
          {openingText ??
            "Kami mengundang Anda untuk menjadi saksi ikrar suci dan momen penuh kebahagiaan dalam pernikahan kami."}
        </p>

        <SakuraDivider />

        {/* Names - large script */}
        <div className="reveal-scale" style={{ margin: "48px 0 16px" }}>
          <h1
            style={{
              fontFamily: "var(--font-sakura-script)",
              fontSize: "clamp(3.5rem, 12vw, 6rem)",
              color: "var(--sakura-pink)",
              lineHeight: 1,
              textShadow: "0 4px 24px rgba(212,112,138,0.2)",
              marginBottom: "8px",
            }}
          >
            {groom.nickname}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sakura-display)",
              fontSize: "clamp(1rem, 3vw, 1.3rem)",
              color: "var(--sakura-gold)",
              letterSpacing: "0.5em",
              opacity: 0.85,
              marginBottom: "8px",
            }}
          >
            &amp;
          </p>
          <h1
            style={{
              fontFamily: "var(--font-sakura-script)",
              fontSize: "clamp(3.5rem, 12vw, 6rem)",
              color: "var(--sakura-pink)",
              lineHeight: 1,
              textShadow: "0 4px 24px rgba(212,112,138,0.2)",
            }}
          >
            {bride.nickname}
          </h1>
        </div>

        <SakuraDivider />

        {/* Date & Location */}
        {mainEvent && (
          <div className="reveal-up" style={{ marginTop: "40px" }}>
            <p
              style={{
                fontFamily: "var(--font-sakura-body)",
                fontSize: "11px",
                letterSpacing: "0.3em",
                color: "var(--sakura-text-soft)",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              {mainEvent.date}
            </p>
            <p
              style={{
                fontFamily: "var(--font-sakura-display)",
                fontSize: "clamp(0.85rem, 2vw, 1rem)",
                color: "var(--sakura-text-muted)",
                fontStyle: "italic",
              }}
            >
              {mainEvent.location}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
