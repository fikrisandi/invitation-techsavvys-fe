"use client";

import { useInvitation } from "../context";

export default function Hero() {
  const { groom, bride, events, openingText } = useInvitation();
  const firstEvent = events[0];
  const lastEvent = events[events.length - 1];
  const dateLabel = firstEvent?.date === lastEvent?.date ? firstEvent?.date : `${firstEvent?.date} — ${lastEvent?.date}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grad-mb-cover">
      <div className="absolute inset-0 geo-pattern-mb opacity-60" />
      {/* Glow ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ border: "1px solid rgba(74,158,232,0.06)", animation: "orbit 60s linear infinite" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ border: "1px solid rgba(74,158,232,0.04)" }} />
      {/* Stars */}
      {[...Array(20)].map((_, i) => (
        <div key={i} style={{ position: "absolute", top: `${(i * 11 + 5) % 95}%`, left: `${(i * 7 + 3) % 92}%`, width: `${1 + (i % 2)}px`, height: `${1 + (i % 2)}px`, borderRadius: "50%", background: i % 5 === 0 ? "var(--color-blue-accent)" : "var(--color-silver)", animation: `float-star ${4 + (i % 5)}s ease-in-out infinite`, animationDelay: `${i * 0.3}s`, opacity: 0.2, pointerEvents: "none" }} />
      ))}

      <div className="relative z-10 text-center px-8 max-w-2xl mx-auto" style={{ padding: "120px 32px" }}>
        <div className="reveal-up" style={{ marginBottom: "60px" }}>
          <p style={{ fontFamily: "var(--font-body-mb)", fontSize: "10px", letterSpacing: "0.5em", color: "var(--color-text-mb-muted)", textTransform: "uppercase" as const, marginBottom: "40px" }}>
            Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
          </p>
        </div>
        <div className="reveal-up delay-2" style={{ marginBottom: "60px" }}>
          <p style={{ fontFamily: "var(--font-body-mb)", fontSize: "9px", letterSpacing: "0.6em", textTransform: "uppercase" as const, color: "var(--color-silver-dark)", marginBottom: "40px", fontWeight: 400 }}>
            {openingText ?? "The Wedding Of"}
          </p>
          <h1 style={{ fontFamily: "var(--font-display-mb)", fontSize: "clamp(3.5rem, 11vw, 6rem)", fontWeight: 700, fontStyle: "italic", lineHeight: 1.05 }}>
            <span className="shimmer-blue">{groom.nickname}</span>
            <span style={{ display: "block", fontSize: "0.5em", color: "var(--color-blue-accent)", fontStyle: "normal", fontFamily: "var(--font-body-mb)", letterSpacing: "0.3em", textTransform: "uppercase" as const, margin: "16px 0", opacity: 0.6 }}>and</span>
            <span className="shimmer-blue">{bride.nickname}</span>
          </h1>
        </div>
        <div className="reveal-up delay-4">
          <div style={{ display: "flex", alignItems: "center", gap: "20px", justifyContent: "center", marginBottom: "24px" }}>
            <div style={{ flex: 1, maxWidth: "80px", height: "1px", background: "linear-gradient(to right, transparent, var(--color-blue-accent))", opacity: 0.4 }} />
            <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--color-blue-accent)" opacity="0.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <div style={{ flex: 1, maxWidth: "80px", height: "1px", background: "linear-gradient(to left, transparent, var(--color-blue-accent))", opacity: 0.4 }} />
          </div>
          <p style={{ fontFamily: "var(--font-display-mb)", fontSize: "15px", fontWeight: 300, letterSpacing: "0.25em", color: "var(--color-text-mb)" }}>
            {dateLabel}
          </p>
        </div>
      </div>
    </section>
  );
}
