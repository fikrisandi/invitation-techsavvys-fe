"use client";

import { SundaDivider, MegaMendung, KujangIcon } from "./SundaOrnament";
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
    <section style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--sunda-bg-t)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* MegaMendung decorative element top */}
      <div style={{
        position: "absolute",
        top: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        opacity: 0.5,
        pointerEvents: "none",
      }}>
        <MegaMendung />
      </div>

      {/* Earthy glow */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(176,80,32,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative",
        zIndex: 2,
        textAlign: "center",
        padding: "100px 32px",
        maxWidth: "560px",
        margin: "0 auto",
      }}>
        {/* SundaDivider as heading ornament */}
        <div className="reveal-up" style={{ marginBottom: "40px" }}>
          <SundaDivider />
        </div>

        {/* Greeting */}
        <div className="reveal-up delay-2" style={{ marginBottom: "36px" }}>
          <p style={{
            fontFamily: "var(--font-sunda-body)",
            fontSize: "9px",
            letterSpacing: "0.4em",
            textTransform: "uppercase" as const,
            color: "var(--sunda-text-muted)",
          }}>
            Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
          </p>
        </div>

        {/* Opening text */}
        <div className="reveal-up delay-3" style={{ marginBottom: "32px" }}>
          <p style={{
            fontFamily: "var(--font-sunda-body)",
            fontSize: "9px",
            letterSpacing: "0.45em",
            textTransform: "uppercase" as const,
            color: "var(--sunda-terra)",
            marginBottom: "24px",
          }}>
            {openingText ?? "Babagi Kabingahan"}
          </p>
          <h1 style={{
            fontFamily: "var(--font-sunda-script)",
            fontSize: "clamp(3.2rem, 10vw, 5.5rem)",
            lineHeight: 1.05,
            color: "var(--sunda-text)",
            textShadow: "0 2px 20px rgba(200,144,32,0.15)",
          }}>
            {groom.nickname}
            <span style={{ color: "var(--sunda-gold)", margin: "0 12px", fontSize: "0.5em" }}>&amp;</span>
            {bride.nickname}
          </h1>
        </div>

        {/* Date */}
        <div className="reveal-up delay-5">
          <div style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--sunda-gold), transparent)",
            marginBottom: "18px",
            opacity: 0.3,
          }} />
          <p style={{
            fontFamily: "var(--font-sunda-display)",
            fontSize: "14px",
            fontWeight: 300,
            letterSpacing: "0.25em",
            color: "var(--sunda-text-soft)",
            textTransform: "uppercase" as const,
          }}>
            {dateLabel}
          </p>
          <div style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--sunda-gold), transparent)",
            marginTop: "18px",
            opacity: 0.3,
          }} />
        </div>

        {/* Kujang + scripture */}
        <div className="reveal-up delay-7" style={{ marginTop: "40px" }}>
          <KujangIcon />
          <p style={{
            fontFamily: "var(--font-sunda-display)",
            fontSize: "13px",
            fontStyle: "italic",
            lineHeight: 2.2,
            color: "var(--sunda-text-soft)",
            maxWidth: "400px",
            margin: "16px auto 0",
          }}>
            &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri&rdquo;
          </p>
          <p style={{
            fontFamily: "var(--font-sunda-body)",
            fontSize: "10px",
            color: "var(--sunda-text-muted)",
            letterSpacing: "0.15em",
            marginTop: "10px",
          }}>
            — QS. Ar-Rum: 21
          </p>
        </div>
      </div>

      {/* MegaMendung bottom */}
      <div style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        opacity: 0.5,
        pointerEvents: "none",
      }}>
        <MegaMendung flip />
      </div>
    </section>
  );
}
