"use client";
import { BotanicalDivider } from "./BotanicalOrnament";
import { useInvitation } from "../context";

export default function Hero() {
  const { groom, bride, events, openingText } = useInvitation();
  const firstEvent = events[0];
  const lastEvent = events[events.length - 1];
  const dateLabel = firstEvent?.date === lastEvent?.date ? firstEvent?.date : `${firstEvent?.date} — ${lastEvent?.date}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grad-yy-cover geo-yy">
      <div className="relative z-10 text-center px-8 max-w-lg mx-auto" style={{ padding: "120px 32px" }}>
        <div className="reveal-up" style={{ marginBottom: "60px" }}>
          <p style={{ fontFamily: "var(--font-yy-display)", fontSize: "22px", fontStyle: "italic", lineHeight: 1.6, marginBottom: "24px", color: "var(--color-yy-forest)" }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </p>
          <p style={{ fontSize: "10px", letterSpacing: "0.35em", color: "var(--color-yy-text-soft)", textTransform: "uppercase" as const, fontFamily: "var(--font-yy-body)" }}>
            Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
          </p>
        </div>
        <div className="reveal-up delay-2" style={{ marginBottom: "60px" }}>
          <p style={{ fontFamily: "var(--font-yy-body)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase" as const, color: "var(--color-yy-text-soft)", marginBottom: "32px" }}>
            {openingText ?? "The Wedding Of"}
          </p>
          <h1 style={{ fontFamily: "var(--font-yy-script)", fontSize: "clamp(3.5rem, 12vw, 6rem)", lineHeight: 1.05 }}>
            <span className="shimmer-yy">{groom.nickname}</span>
            <span style={{ display: "block", fontSize: "1.2rem", color: "var(--color-yy-forest)", fontStyle: "italic", fontFamily: "var(--font-yy-display)", margin: "10px 0", opacity: 0.7 }}>&amp;</span>
            <span className="shimmer-yy">{bride.nickname}</span>
          </h1>
        </div>
        <div className="reveal-up delay-4">
          <BotanicalDivider />
          <p style={{ fontFamily: "var(--font-yy-display)", fontSize: "16px", fontWeight: 400, letterSpacing: "0.2em", color: "var(--color-yy-text-mid)", fontStyle: "italic" }}>
            {dateLabel}
          </p>
        </div>
      </div>
    </section>
  );
}
