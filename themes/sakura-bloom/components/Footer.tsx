"use client";
import { useInvitation } from "../context";
import { SakuraDivider } from "./SakuraEffect";

function FooterBranchSVG() {
  return (
    <svg width="160" height="60" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.7 }}>
      {/* Main branch */}
      <path
        d="M10 50 Q50 35 80 20 Q110 5 150 8"
        stroke="var(--sakura-pink-dark)"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      {/* Sub branch right */}
      <path
        d="M125 12 Q135 5 140 2"
        stroke="var(--sakura-pink-dark)"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {/* Sub branch mid */}
      <path
        d="M85 19 Q90 8 95 5"
        stroke="var(--sakura-pink-dark)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {/* Flower right */}
      <g transform="translate(140, 3)">
        {[0, 72, 144, 216, 288].map((a, i) => (
          <ellipse key={i} cx={0} cy={-4.5} rx={2.8} ry={4} fill="var(--sakura-pink-light)" fillOpacity="0.8" transform={`rotate(${a})`} />
        ))}
        <circle cx={0} cy={0} r={2} fill="var(--sakura-gold)" fillOpacity="0.9" />
      </g>
      {/* Flower mid */}
      <g transform="translate(92, 5)">
        {[0, 72, 144, 216, 288].map((a, i) => (
          <ellipse key={i} cx={0} cy={-4} rx={2.5} ry={3.5} fill="var(--sakura-pink)" fillOpacity="0.75" transform={`rotate(${a})`} />
        ))}
        <circle cx={0} cy={0} r={1.8} fill="var(--sakura-gold)" fillOpacity="0.85" />
      </g>
      {/* Flower left */}
      <g transform="translate(45, 35)">
        {[0, 72, 144, 216, 288].map((a, i) => (
          <ellipse key={i} cx={0} cy={-3.5} rx={2.2} ry={3} fill="var(--sakura-pink-light)" fillOpacity="0.65" transform={`rotate(${a})`} />
        ))}
        <circle cx={0} cy={0} r={1.5} fill="var(--sakura-gold)" fillOpacity="0.75" />
      </g>
      {/* Scattered petals */}
      <ellipse cx="60" cy="28" rx="1.8" ry="2.8" fill="var(--sakura-pink)" fillOpacity="0.5" transform="rotate(25, 60, 28)" />
      <ellipse cx="115" cy="15" rx="1.5" ry="2.4" fill="var(--sakura-pink-light)" fillOpacity="0.45" transform="rotate(-15, 115, 15)" />
    </svg>
  );
}

export default function Footer() {
  const { groom, bride, events } = useInvitation();
  const mainEvent = events[0];

  return (
    <footer
      style={{
        background: "var(--sakura-bg)",
        padding: "100px 32px 60px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle top border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background: "linear-gradient(to right, transparent, var(--sakura-pink), transparent)",
          opacity: 0.4,
        }}
      />

      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* Branch ornament */}
        <div className="reveal-scale" style={{ marginBottom: "32px", display: "flex", justifyContent: "center" }}>
          <FooterBranchSVG />
        </div>

        <SakuraDivider />

        {/* Closing message */}
        <div className="reveal-up" style={{ margin: "40px 0" }}>
          <p
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.55em",
              textTransform: "uppercase",
              color: "var(--sakura-text-muted)",
              marginBottom: "20px",
              fontFamily: "var(--font-sakura-body)",
            }}
          >
            Dengan Cinta
          </p>
          <h2
            style={{
              fontFamily: "var(--font-sakura-script)",
              fontSize: "clamp(2.8rem, 9vw, 4.5rem)",
              color: "var(--sakura-pink)",
              lineHeight: 1.1,
              textShadow: "0 4px 20px rgba(212,112,138,0.2)",
              marginBottom: "12px",
            }}
          >
            {groom.nickname} &amp; {bride.nickname}
          </h2>

          {mainEvent && (
            <p
              style={{
                fontFamily: "var(--font-sakura-display)",
                fontSize: "11px",
                letterSpacing: "0.3em",
                color: "var(--sakura-text-soft)",
                textTransform: "uppercase",
                marginTop: "8px",
              }}
            >
              {mainEvent.date}
            </p>
          )}
        </div>

        <SakuraDivider />

        {/* Terima Kasih */}
        <div className="reveal-up" style={{ marginTop: "48px" }}>
          <p
            style={{
              fontFamily: "var(--font-sakura-script)",
              fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
              color: "var(--sakura-rose)",
              marginBottom: "16px",
            }}
          >
            Terima Kasih ♡
          </p>
          <p
            style={{
              fontSize: "11px",
              color: "var(--sakura-text-muted)",
              fontFamily: "var(--font-sakura-body)",
              lineHeight: 2,
              maxWidth: "380px",
              margin: "0 auto",
              letterSpacing: "0.05em",
            }}
          >
            Kehadiran dan doa restu Anda adalah anugerah terbesar bagi kami. Semoga kebahagiaan selalu menyertai kita semua.
          </p>
        </div>

        {/* Bottom ornament dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "48px",
            opacity: 0.45,
          }}
        >
          {[6, 10, 6].map((w, i) => (
            <div
              key={i}
              style={{
                width: `${w}px`,
                height: "2px",
                borderRadius: "2px",
                background: "var(--sakura-pink)",
              }}
            />
          ))}
        </div>

        {/* Brand credit */}
        <p
          style={{
            marginTop: "48px",
            fontSize: "10px",
            color: "var(--sakura-text-muted)",
            fontFamily: "var(--font-sakura-body)",
            letterSpacing: "0.1em",
          }}
        >
          Sakura Bloom &mdash; Wedding Invitation
        </p>
      </div>
    </footer>
  );
}
