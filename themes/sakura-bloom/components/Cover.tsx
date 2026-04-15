"use client";
import { useState, useEffect } from "react";
import { useInvitation } from "../context";
import { SakuraPetals3D } from "./SakuraEffect";
import { musicRef } from "@/lib/musicRef";

function SakuraBranchSVG() {
  return (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main curved branch */}
      <path
        d="M10 70 Q40 50 60 35 Q80 20 110 15"
        stroke="var(--sakura-pink-dark)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      {/* Small sub-branch top */}
      <path
        d="M85 22 Q95 10 100 5"
        stroke="var(--sakura-pink-dark)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      {/* Sub-branch mid */}
      <path
        d="M60 35 Q70 22 75 15"
        stroke="var(--sakura-pink-dark)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      {/* Sub-branch bottom */}
      <path
        d="M35 52 Q28 38 30 30"
        stroke="var(--sakura-pink-dark)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {/* Flowers - group 1 at tip */}
      <g transform="translate(100, 5)">
        {[0, 72, 144, 216, 288].map((a, i) => (
          <ellipse key={i} cx={0} cy={-5} rx={3} ry={4.5} fill="var(--sakura-pink-light)" fillOpacity="0.85" transform={`rotate(${a})`} />
        ))}
        <circle cx={0} cy={0} r={2.2} fill="var(--sakura-gold)" fillOpacity="0.9" />
      </g>
      {/* Flowers - group 2 */}
      <g transform="translate(75, 15)">
        {[0, 72, 144, 216, 288].map((a, i) => (
          <ellipse key={i} cx={0} cy={-4.5} rx={2.8} ry={4} fill="var(--sakura-pink)" fillOpacity="0.8" transform={`rotate(${a})`} />
        ))}
        <circle cx={0} cy={0} r={2} fill="var(--sakura-gold)" fillOpacity="0.85" />
      </g>
      {/* Flowers - group 3 */}
      <g transform="translate(30, 30)">
        {[0, 72, 144, 216, 288].map((a, i) => (
          <ellipse key={i} cx={0} cy={-4} rx={2.5} ry={3.8} fill="var(--sakura-pink-light)" fillOpacity="0.75" transform={`rotate(${a})`} />
        ))}
        <circle cx={0} cy={0} r={1.8} fill="var(--sakura-gold)" fillOpacity="0.8" />
      </g>
      {/* Small petals scattered */}
      <ellipse cx="55" cy="30" rx="2" ry="3" fill="var(--sakura-pink-light)" fillOpacity="0.6" transform="rotate(30, 55, 30)" />
      <ellipse cx="92" cy="18" rx="1.8" ry="2.8" fill="var(--sakura-pink)" fillOpacity="0.55" transform="rotate(-20, 92, 18)" />
    </svg>
  );
}

export default function Cover({ guestName }: { guestName?: string }) {
  const { groom, bride, events } = useInvitation();
  const [opened, setOpened] = useState(false);
  const mainEvent = events[0];

  useEffect(() => {
    document.body.classList.add("no-scroll");
  }, []);

  const handleOpen = () => {
    musicRef.play();
    document.body.classList.remove("no-scroll");
    window.dispatchEvent(new Event("invitation-opened"));
    setOpened(true);
  };

  if (opened) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        background: "var(--sakura-bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* 3D Petals visible immediately on cover */}
      <SakuraPetals3D />

      {/* Content layer above petals */}
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Sakura branch SVG at top */}
        <div style={{ marginBottom: "20px", opacity: 0.9 }}>
          <SakuraBranchSVG />
        </div>

        {/* Japanese harmony label */}
        <p
          style={{
            fontSize: "9px",
            letterSpacing: "0.55em",
            textTransform: "uppercase",
            color: "var(--sakura-text-soft)",
            fontFamily: "var(--font-sakura-body)",
            marginBottom: "8px",
            fontWeight: 600,
          }}
        >
          和 (Wa) &mdash; Harmony
        </p>

        <p
          style={{
            fontSize: "9px",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "var(--sakura-text-muted)",
            fontFamily: "var(--font-sakura-body)",
            marginBottom: "32px",
          }}
        >
          The Wedding of
        </p>

        {/* Groom name */}
        <h1
          style={{
            fontFamily: "var(--font-sakura-script)",
            fontSize: "clamp(3rem, 10vw, 5.2rem)",
            color: "var(--sakura-pink)",
            lineHeight: 1.05,
            marginBottom: "4px",
            textShadow: "0 2px 20px rgba(212,112,138,0.25)",
          }}
        >
          {groom.nickname}
        </h1>

        {/* Ampersand */}
        <p
          style={{
            fontFamily: "var(--font-sakura-display)",
            fontSize: "clamp(1rem, 3vw, 1.2rem)",
            color: "var(--sakura-gold)",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            marginBottom: "4px",
            opacity: 0.9,
          }}
        >
          &amp;
        </p>

        {/* Bride name */}
        <h1
          style={{
            fontFamily: "var(--font-sakura-script)",
            fontSize: "clamp(3rem, 10vw, 5.2rem)",
            color: "var(--sakura-pink)",
            lineHeight: 1.05,
            marginBottom: "28px",
            textShadow: "0 2px 20px rgba(212,112,138,0.25)",
          }}
        >
          {bride.nickname}
        </h1>

        {/* Thin decorative line */}
        <div
          style={{
            width: "60px",
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--sakura-pink), transparent)",
            marginBottom: "20px",
            opacity: 0.6,
          }}
        />

        {/* Date */}
        {mainEvent && (
          <p
            style={{
              fontFamily: "var(--font-sakura-display)",
              fontSize: "11px",
              letterSpacing: "0.28em",
              color: "var(--sakura-text-soft)",
              marginBottom: "32px",
              textTransform: "uppercase",
            }}
          >
            {mainEvent.date}
          </p>
        )}

        {/* Guest name box */}
        {guestName && (
          <div
            style={{
              marginBottom: "32px",
              padding: "14px 28px",
              border: "1px solid var(--sakura-border)",
              borderRadius: "4px",
              background: "rgba(253,248,249,0.7)",
              backdropFilter: "blur(4px)",
            }}
          >
            <p
              style={{
                fontSize: "8px",
                letterSpacing: "0.35em",
                color: "var(--sakura-text-muted)",
                fontFamily: "var(--font-sakura-body)",
                marginBottom: "6px",
                textTransform: "uppercase",
              }}
            >
              Kepada Yth.
            </p>
            <p
              style={{
                fontFamily: "var(--font-sakura-display)",
                fontSize: "clamp(1rem, 3vw, 1.2rem)",
                color: "var(--sakura-pink-dark)",
                fontStyle: "italic",
              }}
            >
              {guestName}
            </p>
          </div>
        )}

        {/* Open button */}
        <button
          onClick={handleOpen}
          style={{
            padding: "14px 44px",
            borderRadius: "40px",
            background: "linear-gradient(135deg, var(--sakura-pink) 0%, var(--sakura-rose) 100%)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-sakura-body)",
            fontSize: "10px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            fontWeight: 700,
            transition: "all 0.3s ease",
            boxShadow: "0 6px 28px rgba(212,112,138,0.4)",
          }}
        >
          Buka Undangan
        </button>

        {/* Bottom decorative dots */}
        <div style={{ display: "flex", gap: "6px", marginTop: "28px", opacity: 0.4 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: i === 1 ? "16px" : "6px",
                height: "2px",
                borderRadius: "2px",
                background: "var(--sakura-pink)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
