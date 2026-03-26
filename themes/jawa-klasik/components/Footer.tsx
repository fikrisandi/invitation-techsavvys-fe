"use client";

import { BatikBorder, GununganDivider } from "./JawaOrnament";
import { useInvitation } from "../context";

export default function Footer() {
  const { groom, bride } = useInvitation();

  return (
    <footer style={{
      background: "var(--jawa-bg)",
      position: "relative",
      overflow: "hidden",
      textAlign: "center",
    }}>
      <BatikBorder />

      {/* Subtle glow */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,160,32,0.03) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative",
        zIndex: 2,
        maxWidth: "560px",
        margin: "0 auto",
        padding: "80px 32px 60px",
      }}>
        {/* Gunungan ornament */}
        <div className="reveal-up" style={{ marginBottom: "40px" }}>
          <GununganDivider />
        </div>

        {/* Quote */}
        <div className="reveal-up delay-2" style={{ marginBottom: "48px" }}>
          <p style={{
            fontFamily: "var(--font-jawa-display)",
            fontSize: "13px",
            fontStyle: "italic",
            lineHeight: 2.2,
            color: "var(--jawa-text-soft)",
            maxWidth: "440px",
            margin: "0 auto 12px",
          }}>
            &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.&rdquo;
          </p>
          <p style={{
            fontFamily: "var(--font-jawa-body)",
            fontSize: "10px",
            color: "var(--jawa-text-muted)",
            letterSpacing: "0.15em",
          }}>
            — QS. Ar-Rum: 21
          </p>
        </div>

        {/* Names */}
        <div className="reveal-up delay-3">
          <div style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--jawa-gold), transparent)",
            opacity: 0.25,
            marginBottom: "24px",
          }} />

          <p style={{
            fontFamily: "var(--font-jawa-script)",
            fontSize: "clamp(2rem, 6vw, 2.6rem)",
            color: "var(--jawa-gold-light)",
            marginBottom: "20px",
          }}>
            {groom.nickname} &amp; {bride.nickname}
          </p>

          <p style={{
            fontFamily: "var(--font-jawa-display)",
            fontSize: "12px",
            fontStyle: "italic",
            lineHeight: 2.2,
            color: "var(--jawa-text-soft)",
            maxWidth: "340px",
            margin: "0 auto 12px",
          }}>
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu.
          </p>

          <p style={{
            fontFamily: "var(--font-jawa-body)",
            fontSize: "12px",
            letterSpacing: "0.15em",
            color: "var(--jawa-gold)",
            marginBottom: "40px",
          }}>
            Matur Nuwun
          </p>

          <div style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--jawa-gold), transparent)",
            opacity: 0.15,
            marginBottom: "20px",
          }} />

          <p style={{
            fontFamily: "var(--font-jawa-body)",
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            opacity: 0.4,
            color: "var(--jawa-text-soft)",
          }}>
            &copy; {new Date().getFullYear()} — Kami Yang Berbahagia &bull; Powered by{" "}
            <a
              href="https://techsavvys.com"
              style={{ color: "var(--jawa-gold)", textDecoration: "none" }}
            >
              Invitation Savvys
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
