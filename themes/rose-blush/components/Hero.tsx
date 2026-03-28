"use client";
import { RoseDivider, FloralCorner } from "./FloralOrnament";
import { useInvitation } from "../context";

export default function Hero() {
  const { groom, bride, openingText, events } = useInvitation();
  const mainEvent = events[0];
  return (
    <section style={{ position: "relative", minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "var(--color-rb-bg-t)", padding: "80px 24px" }}>
      <FloralCorner position="tl" />
      <FloralCorner position="tr" />
      <FloralCorner position="bl" />
      <FloralCorner position="br" />
      <div style={{ maxWidth: "560px", textAlign: "center", position: "relative", zIndex: 2 }}>
        <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase" as const, color: "var(--color-rb-text-soft)", marginBottom: "28px", fontFamily: "var(--font-rb-body)" }}>
          We're Getting Married
        </p>
        <h1 style={{ fontFamily: "var(--font-rb-script)", fontSize: "clamp(3.5rem, 12vw, 6rem)", color: "var(--color-rb-dusty)", lineHeight: 1.0, marginBottom: "8px" }}>
          {groom.nickname}
        </h1>
        <p style={{ fontFamily: "var(--font-rb-display)", fontSize: "clamp(1rem, 3vw, 1.3rem)", color: "var(--color-rb-text-soft)", letterSpacing: "0.4em", textTransform: "uppercase" as const }}>&amp;</p>
        <h1 style={{ fontFamily: "var(--font-rb-script)", fontSize: "clamp(3.5rem, 12vw, 6rem)", color: "var(--color-rb-dusty)", lineHeight: 1.0, marginBottom: "40px" }}>
          {bride.nickname}
        </h1>
        <RoseDivider />
        {mainEvent && (
          <p style={{ fontFamily: "var(--font-rb-display)", fontSize: "12px", letterSpacing: "0.25em", color: "var(--color-rb-text-mid)", marginBottom: "24px", textTransform: "uppercase" as const }}>
            {mainEvent.date}
          </p>
        )}
        {openingText && (
          <p style={{ fontSize: "13px", lineHeight: 2.2, color: "var(--color-rb-text-soft)", fontFamily: "var(--font-rb-body)", maxWidth: "400px", margin: "0 auto" }}>
            {openingText}
          </p>
        )}
        {/* Scroll indicator */}
        <div style={{ marginTop: "56px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "8px", letterSpacing: "0.35em", color: "var(--color-rb-text-soft)", fontFamily: "var(--font-rb-body)", textTransform: "uppercase" as const }}>Scroll</span>
          <div style={{ width: "1px", height: "36px", background: "linear-gradient(to bottom, var(--color-rb-rosegold), transparent)", margin: "0 auto", animation: "bob 2s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}
