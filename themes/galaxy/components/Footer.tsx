"use client";

import { useInvitation } from "../context";

export default function Footer() {
  const { groom, bride } = useInvitation();

  return (
    <footer
      style={{
        background: "var(--galaxy-bg-t)",
        padding: "120px 32px 60px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top nebula fade */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(to right, transparent, var(--galaxy-purple), transparent)",
          opacity: 0.35,
        }}
      />

      {/* Nebula center glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60vw",
          height: "60vh",
          background: "radial-gradient(ellipse at center, rgba(139,92,246,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "560px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ marginBottom: "56px" }}>
          <p
            style={{
              fontFamily: "var(--font-galaxy-display)",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 3vw, 1.3rem)",
              fontWeight: 300,
              lineHeight: 2,
              color: "var(--galaxy-text-soft)",
              marginBottom: "8px",
              opacity: 0.8,
            }}
          >
            &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.&rdquo;
          </p>
          <p
            style={{
              fontFamily: "var(--font-galaxy-body)",
              fontSize: "9px",
              letterSpacing: "0.3em",
              color: "var(--galaxy-text-muted)",
              marginBottom: "40px",
            }}
          >
            — QS. Ar-Rum: 21
          </p>
        </div>

        <div className="reveal-up delay-2">
          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              maxWidth: "280px",
              margin: "0 auto 40px",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "var(--galaxy-purple)", opacity: 0.35 }} />
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--galaxy-purple)", opacity: 0.6 }} />
            <div style={{ flex: 1, height: "1px", background: "var(--galaxy-purple)", opacity: 0.35 }} />
          </div>

          {/* Script names */}
          <h2
            style={{
              fontFamily: "var(--font-galaxy-script)",
              fontSize: "clamp(2.5rem, 9vw, 4.5rem)",
              fontWeight: 400,
              background: "linear-gradient(135deg, var(--galaxy-text), var(--galaxy-purple), var(--galaxy-pink))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1.1,
              marginBottom: "40px",
            }}
          >
            {groom.nickname} &amp; {bride.nickname}
          </h2>

          <p
            style={{
              fontFamily: "var(--font-galaxy-body)",
              fontSize: "11px",
              lineHeight: 2.2,
              maxWidth: "340px",
              margin: "0 auto 24px",
              opacity: 0.6,
              color: "var(--galaxy-text-soft)",
            }}
          >
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu.
          </p>

          <p
            style={{
              fontFamily: "var(--font-galaxy-body)",
              fontSize: "9px",
              letterSpacing: "0.3em",
              color: "var(--galaxy-text-muted)",
              marginBottom: "56px",
            }}
          >
            Wassalamu&apos;alaikum Wr. Wb.
          </p>
        </div>

        <div
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--galaxy-border), transparent)",
            marginBottom: "24px",
          }}
        />

        <p
          style={{
            fontFamily: "var(--font-galaxy-body)",
            fontSize: "8px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: 0.35,
            color: "var(--galaxy-text-soft)",
          }}
        >
          &copy; {new Date().getFullYear()} — Kami Yang Berbahagia &bull; Powered by{" "}
          <a
            href="https://techsavvys.com"
            style={{ color: "var(--galaxy-purple)", textDecoration: "none" }}
          >
            Invitation Savvys
          </a>
        </p>
      </div>
    </footer>
  );
}
