"use client";

import { MegaMendung, SundaDivider } from "./SundaOrnament";
import { useInvitation } from "../context";

export default function Footer() {
  const { groom, bride } = useInvitation();

  return (
    <footer style={{
      background: "var(--sunda-bg-t)",
      position: "relative",
      overflow: "hidden",
      textAlign: "center",
    }}>
      {/* Top mega mendung */}
      <div style={{ display: "flex", justifyContent: "center", opacity: 0.45 }}>
        <MegaMendung />
      </div>

      {/* Subtle earthy glow */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(176,80,32,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative",
        zIndex: 2,
        maxWidth: "560px",
        margin: "0 auto",
        padding: "60px 32px 60px",
      }}>
        {/* SundaDivider */}
        <div className="reveal-up" style={{ marginBottom: "36px" }}>
          <SundaDivider />
        </div>

        {/* Quote */}
        <div className="reveal-up delay-2" style={{ marginBottom: "40px" }}>
          <p style={{
            fontFamily: "var(--font-sunda-display)",
            fontSize: "13px",
            fontStyle: "italic",
            lineHeight: 2.2,
            color: "var(--sunda-text-soft)",
            maxWidth: "440px",
            margin: "0 auto 12px",
          }}>
            &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.&rdquo;
          </p>
          <p style={{
            fontFamily: "var(--font-sunda-body)",
            fontSize: "10px",
            color: "var(--sunda-text-muted)",
            letterSpacing: "0.15em",
          }}>
            — QS. Ar-Rum: 21
          </p>
        </div>

        {/* Names */}
        <div className="reveal-up delay-3">
          <div style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--sunda-gold), transparent)",
            opacity: 0.2,
            marginBottom: "22px",
          }} />

          <p style={{
            fontFamily: "var(--font-sunda-script)",
            fontSize: "clamp(2rem, 6vw, 2.6rem)",
            color: "var(--sunda-gold)",
            marginBottom: "18px",
          }}>
            {groom.nickname} &amp; {bride.nickname}
          </p>

          <p style={{
            fontFamily: "var(--font-sunda-display)",
            fontSize: "12px",
            fontStyle: "italic",
            lineHeight: 2.2,
            color: "var(--sunda-text-soft)",
            maxWidth: "340px",
            margin: "0 auto 14px",
          }}>
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu.
          </p>

          {/* Sundanese closing */}
          <p style={{
            fontFamily: "var(--font-sunda-display)",
            fontSize: "14px",
            fontStyle: "italic",
            color: "var(--sunda-terra)",
            marginBottom: "8px",
          }}>
            Hatur Nuhun
          </p>
          <p style={{
            fontFamily: "var(--font-sunda-body)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "var(--sunda-text-muted)",
            marginBottom: "36px",
          }}>
            Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
          </p>

          <div style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--sunda-gold), transparent)",
            opacity: 0.12,
            marginBottom: "18px",
          }} />

          <p style={{
            fontFamily: "var(--font-sunda-body)",
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            opacity: 0.4,
            color: "var(--sunda-text-soft)",
          }}>
            &copy; {new Date().getFullYear()} — Kami Yang Berbahagia &bull; Powered by{" "}
            <a
              href="https://techsavvys.com"
              style={{ color: "var(--sunda-gold)", textDecoration: "none" }}
            >
              Invitation Savvys
            </a>
          </p>
        </div>
      </div>

      {/* Bottom mega mendung */}
      <div style={{ display: "flex", justifyContent: "center", opacity: 0.45 }}>
        <MegaMendung flip />
      </div>
    </footer>
  );
}
