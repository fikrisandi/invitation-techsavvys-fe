"use client";

import type { CSSProperties } from "react";

const janurKeyframes = `
@keyframes janur-sway {
  0%   { transform: rotate(-3deg); }
  50%  { transform: rotate(3deg); }
  100% { transform: rotate(-3deg); }
}
`;

function JanurStyle() {
  return <style>{janurKeyframes}</style>;
}

export function JanurLeft() {
  const style: CSSProperties = {
    animation: "janur-sway 4s ease-in-out infinite",
    transformOrigin: "50% 100%",
    display: "block",
  };

  return (
    <>
      <JanurStyle />
      <svg
        width="80"
        height="300"
        viewBox="0 0 80 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={style}
      >
        {/* Main curved stem — ends at y=60 */}
        <path
          d="M40 290 C38 240 35 190 30 140 C26 100 22 70 22 60"
          stroke="var(--jawa-gold)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        {/* Leaf fronds branching left */}
        <path d="M38 260 C25 250 10 240 4 228" stroke="var(--jawa-gold)" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M37 240 C22 226 8 210 2 196" stroke="var(--jawa-gold)" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M35 220 C20 205 6 186 1 170" stroke="var(--jawa-gold)" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M33 200 C18 183 5 162 0 145" stroke="var(--jawa-gold)" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M31 180 C16 162 5 140 2 122" stroke="var(--jawa-gold)" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M29 158 C16 140 6 118 5 100" stroke="var(--jawa-gold)" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M27 136 C16 118 10 96 10 80" stroke="var(--jawa-gold)" strokeWidth="0.8" strokeLinecap="round" />
        {/* Leaf fronds branching right */}
        <path d="M38 255 C50 245 62 234 68 222" stroke="var(--jawa-gold)" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M36 235 C48 222 60 208 65 194" stroke="var(--jawa-gold)" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M34 215 C46 200 57 183 61 168" stroke="var(--jawa-gold)" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M32 195 C44 178 54 160 57 144" stroke="var(--jawa-gold)" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M30 175 C42 158 52 138 54 122" stroke="var(--jawa-gold)" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M28 153 C40 136 50 114 51 96" stroke="var(--jawa-gold)" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M26 131 C38 114 47 92 47 76" stroke="var(--jawa-gold)" strokeWidth="0.8" strokeLinecap="round" />
        {/* Top tip — short tapered fronds */}
        <path d="M23 80 C18 70 14 62 12 56" stroke="var(--jawa-gold)" strokeWidth="0.7" strokeLinecap="round" />
        <path d="M22 68 C18 60 16 54 15 48" stroke="var(--jawa-gold)" strokeWidth="0.6" strokeLinecap="round" />
        <path d="M23 76 C30 68 36 62 38 56" stroke="var(--jawa-gold)" strokeWidth="0.7" strokeLinecap="round" />
        <path d="M22 66 C28 58 32 52 34 48" stroke="var(--jawa-gold)" strokeWidth="0.6" strokeLinecap="round" />
        {/* Small decorative dots along stem */}
        <circle cx="39" cy="270" r="1" fill="var(--jawa-gold)" opacity="0.5" />
        <circle cx="36" cy="248" r="1" fill="var(--jawa-gold)" opacity="0.5" />
        <circle cx="34" cy="226" r="1" fill="var(--jawa-gold)" opacity="0.5" />
        <circle cx="32" cy="204" r="1" fill="var(--jawa-gold)" opacity="0.5" />
        <circle cx="30" cy="182" r="1" fill="var(--jawa-gold)" opacity="0.5" />
        <circle cx="28" cy="160" r="1" fill="var(--jawa-gold)" opacity="0.5" />
      </svg>
    </>
  );
}

export function JanurRight() {
  const style: CSSProperties = {
    transform: "scaleX(-1)",
    display: "block",
  };
  return (
    <div style={style}>
      <JanurLeft />
    </div>
  );
}

export function GununganDivider() {
  return (
    <svg
      width="40"
      height="60"
      viewBox="0 0 40 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", margin: "0 auto" }}
    >
      {/* Outer gunungan silhouette */}
      <path
        d="M20 2 L36 22 L36 48 L28 54 L20 58 L12 54 L4 48 L4 22 Z"
        stroke="var(--jawa-gold)"
        strokeWidth="0.8"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Inner decoration */}
      <path
        d="M20 8 L32 24 L32 46 L26 51 L20 54 L14 51 L8 46 L8 24 Z"
        stroke="var(--jawa-gold)"
        strokeWidth="0.5"
        fill="none"
        strokeLinejoin="round"
        opacity="0.5"
      />
      {/* Flame/peak at top */}
      <path d="M20 2 L17 8 L20 6 L23 8 Z" fill="var(--jawa-gold)" opacity="0.6" />
      {/* Center diamond ornament */}
      <path d="M20 22 L24 30 L20 38 L16 30 Z" stroke="var(--jawa-gold)" strokeWidth="0.6" fill="none" />
      {/* Horizontal inner lines */}
      <line x1="10" y1="30" x2="30" y2="30" stroke="var(--jawa-gold)" strokeWidth="0.4" opacity="0.4" />
      <line x1="8" y1="38" x2="32" y2="38" stroke="var(--jawa-gold)" strokeWidth="0.4" opacity="0.4" />
      {/* Bottom base details */}
      <line x1="10" y1="48" x2="30" y2="48" stroke="var(--jawa-gold)" strokeWidth="0.5" opacity="0.6" />
      <circle cx="20" cy="30" r="1.5" fill="var(--jawa-gold)" opacity="0.7" />
    </svg>
  );
}

export function BatikBorder() {
  const svgPattern = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='8'><path d='M0 4 L4 0 L8 4 L12 0 L16 4 L12 8 L8 4 L4 8 Z' fill='none' stroke='%23D4A020' stroke-width='0.6' opacity='0.5'/></svg>`;
  const style: CSSProperties = {
    height: "8px",
    width: "100%",
    backgroundImage: `url("data:image/svg+xml,${svgPattern}")`,
    backgroundRepeat: "repeat-x",
    backgroundSize: "16px 8px",
  };
  return <div style={style} />;
}
