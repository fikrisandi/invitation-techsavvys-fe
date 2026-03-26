"use client";

import { GoldDivider } from "./FloralOrnament";
import { useInvitation } from "../context";

export default function Hero() {
  const { groom, bride, events, openingText } = useInvitation();
  const firstEvent = events[0];
  const lastEvent = events[events.length - 1];
  const dateLabel = firstEvent?.date === lastEvent?.date ? firstEvent?.date : `${firstEvent?.date} — ${lastEvent?.date}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grad-cover">
      <div className="absolute inset-0 geo-pattern opacity-50" />
      {[...Array(6)].map((_, i) => (
        <div key={i} className="absolute pointer-events-none" style={{ left: `${8+i*15}%`, fontSize: `${9+(i%3)*3}px`, opacity: 0.08, color: "var(--color-mint)", animation: `float-leaf ${9+i*2}s linear infinite`, animationDelay: `${i*1.2}s` }}>&#127811;</div>
      ))}
      <div className="relative z-10 text-center px-8 max-w-lg mx-auto" style={{ padding: "120px 32px" }}>
        <div className="reveal-up" style={{ marginBottom: "80px" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontStyle: "italic", lineHeight: 1.6, marginBottom: "32px", color: "var(--color-gold-light)" }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </p>
          <p style={{ fontSize: "10px", letterSpacing: "0.35em", color: "var(--color-text-muted)", textTransform: "uppercase" as const }}>
            Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
          </p>
        </div>
        <div className="reveal-up delay-2" style={{ marginBottom: "80px" }}>
          <p style={{ letterSpacing: "0.5em", fontSize: "9px", marginBottom: "48px", color: "var(--color-gold-dark)", textTransform: "uppercase" as const, fontWeight: 500 }}>
            {openingText ?? "The Wedding Of"}
          </p>
          <h1 style={{ fontFamily: "var(--font-script)", fontSize: "clamp(3.5rem, 12vw, 6rem)", lineHeight: 1.05, color: "var(--color-cream)", textShadow: "0 4px 40px rgba(0,0,0,0.3)" }}>
            {groom.nickname} <span style={{ color: "var(--color-gold)" }}>&amp;</span> {bride.nickname}
          </h1>
        </div>
        <div className="reveal-up delay-4">
          <GoldDivider className="mb-10" />
          <p style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 300, letterSpacing: "0.25em", color: "var(--color-gold-light)" }}>
            {dateLabel}
          </p>
        </div>
      </div>
    </section>
  );
}
