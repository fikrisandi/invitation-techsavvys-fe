"use client";

import { BatikBorder, GununganDivider } from "./JawaOrnament";
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
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--jawa-bg-t)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <BatikBorder />

      {/* Subtle background texture */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,160,32,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative",
        zIndex: 2,
        textAlign: "center",
        padding: "80px 32px",
        maxWidth: "560px",
        margin: "0 auto",
      }}>
        {/* Greeting */}
        <div className="reveal-up" style={{ marginBottom: "48px" }}>
          <p style={{
            fontFamily: "var(--font-jawa-body)",
            fontSize: "9px",
            letterSpacing: "0.4em",
            textTransform: "uppercase" as const,
            color: "var(--jawa-text-muted)",
          }}>
            Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
          </p>
        </div>

        <GununganDivider />

        {/* Opening text */}
        <div className="reveal-up delay-2" style={{ margin: "40px 0" }}>
          <p style={{
            fontFamily: "var(--font-jawa-body)",
            fontSize: "9px",
            letterSpacing: "0.45em",
            textTransform: "uppercase" as const,
            color: "var(--jawa-gold)",
            marginBottom: "32px",
          }}>
            {openingText ?? "Undangan Pernikahan"}
          </p>
          <h1 style={{
            fontFamily: "var(--font-jawa-script)",
            fontSize: "clamp(3.2rem, 10vw, 5.5rem)",
            lineHeight: 1.05,
            color: "var(--jawa-gold-light)",
            textShadow: "0 2px 30px rgba(212,160,32,0.2)",
          }}>
            {groom.nickname}
            <span style={{ color: "var(--jawa-text-soft)", margin: "0 12px", fontSize: "0.5em" }}>&amp;</span>
            {bride.nickname}
          </h1>
        </div>

        {/* Date */}
        <div className="reveal-up delay-4">
          <div style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--jawa-gold), transparent)",
            marginBottom: "20px",
            opacity: 0.3,
          }} />
          <p style={{
            fontFamily: "var(--font-jawa-display)",
            fontSize: "14px",
            fontWeight: 300,
            letterSpacing: "0.25em",
            color: "var(--jawa-text-soft)",
            textTransform: "uppercase" as const,
          }}>
            {dateLabel}
          </p>
          <div style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--jawa-gold), transparent)",
            marginTop: "20px",
            opacity: 0.3,
          }} />
        </div>

        {/* Scripture */}
        <div className="reveal-up delay-6" style={{ marginTop: "48px" }}>
          <p style={{
            fontFamily: "var(--font-jawa-display)",
            fontSize: "13px",
            fontStyle: "italic",
            lineHeight: 2.2,
            color: "var(--jawa-text-soft)",
            maxWidth: "400px",
            margin: "0 auto",
          }}>
            &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri&rdquo;
          </p>
          <p style={{
            fontFamily: "var(--font-jawa-body)",
            fontSize: "10px",
            color: "var(--jawa-text-muted)",
            letterSpacing: "0.15em",
            marginTop: "10px",
          }}>
            — QS. Ar-Rum: 21
          </p>
        </div>
      </div>

      <BatikBorder />
    </section>
  );
}
