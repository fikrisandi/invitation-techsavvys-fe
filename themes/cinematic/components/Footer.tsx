"use client";

import { useInvitation } from "../context";
import { CineRule } from "./CineOrnament";

export default function Footer() {
  const { groom, bride } = useInvitation();

  return (
    <footer
      style={{
        background: "#040404",
        padding: "120px 32px 60px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top gold accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(to right, transparent, var(--cine-gold), transparent)",
          opacity: 0.4,
        }}
      />

      <div style={{ maxWidth: "560px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ marginBottom: "56px" }}>
          <p
            style={{
              fontFamily: "var(--font-cine-display)",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 3vw, 1.3rem)",
              fontWeight: 300,
              lineHeight: 2,
              color: "var(--cine-gold)",
              marginBottom: "8px",
              opacity: 0.85,
            }}
          >
            &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya.&rdquo;
          </p>
          <p
            style={{
              fontFamily: "var(--font-cine-body)",
              fontSize: "9px",
              letterSpacing: "0.3em",
              color: "var(--cine-text-muted)",
              opacity: 0.7,
              marginBottom: "40px",
            }}
          >
            — QS. Ar-Rum: 21
          </p>
        </div>

        <div className="reveal-up delay-2">
          <CineRule />

          {/* Gold script names */}
          <div style={{ margin: "40px 0" }}>
            <h2
              style={{
                fontFamily: "var(--font-cine-display)",
                fontStyle: "italic",
                fontSize: "clamp(2.5rem, 8vw, 4rem)",
                fontWeight: 700,
                color: "var(--cine-gold)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              {groom.nickname} &amp; {bride.nickname}
            </h2>
          </div>

          <p
            style={{
              fontFamily: "var(--font-cine-body)",
              fontSize: "11px",
              lineHeight: 2.2,
              maxWidth: "340px",
              margin: "0 auto 24px",
              opacity: 0.6,
              color: "var(--cine-text-soft)",
            }}
          >
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu.
          </p>

          <p
            style={{
              fontFamily: "var(--font-cine-body)",
              fontSize: "9px",
              letterSpacing: "0.3em",
              color: "var(--cine-text-muted)",
              marginBottom: "56px",
            }}
          >
            Wassalamu&apos;alaikum Wr. Wb.
          </p>
        </div>

        <div
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--cine-border), transparent)",
            marginBottom: "24px",
          }}
        />

        <p
          style={{
            fontFamily: "var(--font-cine-body)",
            fontSize: "8px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: 0.35,
            color: "var(--cine-text-soft)",
          }}
        >
          &copy; {new Date().getFullYear()} — Kami Yang Berbahagia &bull; Powered by{" "}
          <a
            href="https://techsavvys.com"
            style={{ color: "var(--cine-gold)", textDecoration: "none" }}
          >
            Invitation Savvys
          </a>
        </p>
      </div>
    </footer>
  );
}
