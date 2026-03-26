"use client";
import { useEffect, useRef } from "react";

export function useScrollParallax(speed: number) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      el.style.transform = `translate3d(0, ${window.scrollY * speed}px, 0)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);
  return ref;
}

/* ─── Layer 1: large tropical leaf silhouettes (speed 0.06) ─── */
function TropicalLeafLayer() {
  const ref = useScrollParallax(0.06);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        willChange: "transform",
      }}
    >
      {/* Top-left monstera — overflowing corner */}
      <svg
        width="220"
        height="220"
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: -30, left: -30, opacity: 0.08 }}
      >
        {/* Stem */}
        <path d="M30,210 C40,160 55,100 80,60" stroke="#2D4A35" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* Main leaf body — large oval */}
        <path
          d="M80,60 C95,20 150,10 185,40 C215,65 220,110 200,145 C180,178 140,195 105,185 C70,175 55,140 60,110 C65,85 75,68 80,60 Z"
          fill="#2D4A35"
        />
        {/* Lobe cut-outs (6 cuts) */}
        <path
          d="M95,55 C90,40 78,38 72,48 C66,58 70,72 82,75 Z"
          fill="#FAF7F2"
        />
        <path
          d="M130,30 C125,18 112,18 108,28 C104,38 110,50 122,50 Z"
          fill="#FAF7F2"
        />
        <path
          d="M165,35 C162,22 150,20 146,32 C142,44 150,54 160,52 Z"
          fill="#FAF7F2"
        />
        <path
          d="M200,75 C210,65 212,52 202,48 C192,44 184,52 186,64 Z"
          fill="#FAF7F2"
        />
        <path
          d="M210,118 C222,112 224,98 214,95 C204,92 196,102 200,114 Z"
          fill="#FAF7F2"
        />
        <path
          d="M195,158 C208,155 212,142 202,138 C193,134 184,143 188,155 Z"
          fill="#FAF7F2"
        />
        {/* Midrib */}
        <path
          d="M80,60 C110,80 155,100 185,140"
          stroke="#FAF7F2"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
      </svg>

      {/* Bottom-right monstera */}
      <svg
        width="200"
        height="200"
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          bottom: -20,
          right: -20,
          opacity: 0.08,
          transform: "rotate(160deg)",
        }}
      >
        <path d="M30,210 C40,160 55,100 80,60" stroke="#2D4A35" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path
          d="M80,60 C95,20 150,10 185,40 C215,65 220,110 200,145 C180,178 140,195 105,185 C70,175 55,140 60,110 C65,85 75,68 80,60 Z"
          fill="#2D4A35"
        />
        <path d="M95,55 C90,40 78,38 72,48 C66,58 70,72 82,75 Z" fill="#FAF7F2" />
        <path d="M130,30 C125,18 112,18 108,28 C104,38 110,50 122,50 Z" fill="#FAF7F2" />
        <path d="M165,35 C162,22 150,20 146,32 C142,44 150,54 160,52 Z" fill="#FAF7F2" />
        <path d="M200,75 C210,65 212,52 202,48 C192,44 184,52 186,64 Z" fill="#FAF7F2" />
        <path d="M210,118 C222,112 224,98 214,95 C204,92 196,102 200,114 Z" fill="#FAF7F2" />
        <path d="M195,158 C208,155 212,142 202,138 C193,134 184,143 188,155 Z" fill="#FAF7F2" />
        <path d="M80,60 C110,80 155,100 185,140" stroke="#FAF7F2" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
      </svg>

      {/* Mid-left monstera */}
      <svg
        width="180"
        height="180"
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          top: "40%",
          left: -40,
          opacity: 0.08,
          transform: "rotate(30deg)",
        }}
      >
        <path d="M30,210 C40,160 55,100 80,60" stroke="#2D4A35" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path
          d="M80,60 C95,20 150,10 185,40 C215,65 220,110 200,145 C180,178 140,195 105,185 C70,175 55,140 60,110 C65,85 75,68 80,60 Z"
          fill="#2D4A35"
        />
        <path d="M95,55 C90,40 78,38 72,48 C66,58 70,72 82,75 Z" fill="#FAF7F2" />
        <path d="M130,30 C125,18 112,18 108,28 C104,38 110,50 122,50 Z" fill="#FAF7F2" />
        <path d="M165,35 C162,22 150,20 146,32 C142,44 150,54 160,52 Z" fill="#FAF7F2" />
        <path d="M200,75 C210,65 212,52 202,48 C192,44 184,52 186,64 Z" fill="#FAF7F2" />
        <path d="M210,118 C222,112 224,98 214,95 C204,92 196,102 200,114 Z" fill="#FAF7F2" />
        <path d="M80,60 C110,80 155,100 185,140" stroke="#FAF7F2" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
      </svg>
    </div>
  );
}

/* ─── Layer 2: medium botanical sprigs + ylang flowers (speed 0.18) ─── */
function BotanicalSprigLayer() {
  const ref = useScrollParallax(0.18);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        willChange: "transform",
      }}
    >
      {/* Sprig 1 — top-right */}
      <svg
        width="120"
        height="130"
        viewBox="0 0 120 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: "5%", right: "5%", opacity: 0.15 }}
      >
        {/* Curved stem */}
        <path d="M60,125 C55,100 50,75 58,50 C64,30 72,15 80,5" stroke="#3D5A45" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* 5 oval leaves on alternating sides */}
        <ellipse cx="50" cy="95" rx="16" ry="9" fill="#3D5A45" transform="rotate(-30 50 95)" />
        <ellipse cx="68" cy="78" rx="16" ry="9" fill="#3D5A45" transform="rotate(25 68 78)" />
        <ellipse cx="48" cy="62" rx="15" ry="8" fill="#3D5A45" transform="rotate(-35 48 62)" />
        <ellipse cx="66" cy="46" rx="14" ry="8" fill="#3D5A45" transform="rotate(20 66 46)" />
        <ellipse cx="74" cy="28" rx="13" ry="7" fill="#3D5A45" transform="rotate(-15 74 28)" />
      </svg>

      {/* Sprig 2 — bottom-left */}
      <svg
        width="110"
        height="120"
        viewBox="0 0 120 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          bottom: "8%",
          left: "6%",
          opacity: 0.12,
          transform: "rotate(15deg)",
        }}
      >
        <path d="M60,125 C55,100 50,75 58,50 C64,30 72,15 80,5" stroke="#3D5A45" strokeWidth="3" strokeLinecap="round" fill="none" />
        <ellipse cx="50" cy="95" rx="16" ry="9" fill="#3D5A45" transform="rotate(-30 50 95)" />
        <ellipse cx="68" cy="78" rx="16" ry="9" fill="#3D5A45" transform="rotate(25 68 78)" />
        <ellipse cx="48" cy="62" rx="15" ry="8" fill="#3D5A45" transform="rotate(-35 48 62)" />
        <ellipse cx="66" cy="46" rx="14" ry="8" fill="#3D5A45" transform="rotate(20 66 46)" />
        <ellipse cx="74" cy="28" rx="13" ry="7" fill="#3D5A45" transform="rotate(-15 74 28)" />
      </svg>

      {/* Sprig 3 — mid-right */}
      <svg
        width="100"
        height="110"
        viewBox="0 0 120 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          top: "45%",
          right: "8%",
          opacity: 0.14,
          transform: "rotate(-20deg)",
        }}
      >
        <path d="M60,125 C55,100 50,75 58,50 C64,30 72,15 80,5" stroke="#3D5A45" strokeWidth="3" strokeLinecap="round" fill="none" />
        <ellipse cx="50" cy="95" rx="16" ry="9" fill="#3D5A45" transform="rotate(-30 50 95)" />
        <ellipse cx="68" cy="78" rx="16" ry="9" fill="#3D5A45" transform="rotate(25 68 78)" />
        <ellipse cx="48" cy="62" rx="15" ry="8" fill="#3D5A45" transform="rotate(-35 48 62)" />
        <ellipse cx="66" cy="46" rx="14" ry="8" fill="#3D5A45" transform="rotate(20 66 46)" />
      </svg>

      {/* Sprig 4 — mid-center-left */}
      <svg
        width="100"
        height="110"
        viewBox="0 0 120 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          top: "65%",
          left: "30%",
          opacity: 0.13,
          transform: "rotate(40deg)",
        }}
      >
        <path d="M60,125 C55,100 50,75 58,50 C64,30 72,15 80,5" stroke="#3D5A45" strokeWidth="3" strokeLinecap="round" fill="none" />
        <ellipse cx="50" cy="95" rx="16" ry="9" fill="#3D5A45" transform="rotate(-30 50 95)" />
        <ellipse cx="68" cy="78" rx="16" ry="9" fill="#3D5A45" transform="rotate(25 68 78)" />
        <ellipse cx="48" cy="62" rx="15" ry="8" fill="#3D5A45" transform="rotate(-35 48 62)" />
        <ellipse cx="66" cy="46" rx="14" ry="8" fill="#3D5A45" transform="rotate(20 66 46)" />
        <ellipse cx="74" cy="28" rx="13" ry="7" fill="#3D5A45" transform="rotate(-15 74 28)" />
      </svg>

      {/* Ylang flower 1 — top-center */}
      <svg
        width="70"
        height="70"
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: "20%", left: "42%", opacity: 0.18 }}
      >
        {/* 6 narrow curved petals */}
        <path d="M35,35 C32,28 30,18 35,8 C40,18 38,28 35,35 Z" fill="#3D5A45" />
        <path d="M35,35 C42,30 51,24 60,26 C54,34 44,34 35,35 Z" fill="#3D5A45" transform="rotate(60 35 35)" />
        <path d="M35,35 C42,30 51,24 60,26 C54,34 44,34 35,35 Z" fill="#3D5A45" transform="rotate(120 35 35)" />
        <path d="M35,35 C32,28 30,18 35,8 C40,18 38,28 35,35 Z" fill="#3D5A45" transform="rotate(180 35 35)" />
        <path d="M35,35 C42,30 51,24 60,26 C54,34 44,34 35,35 Z" fill="#3D5A45" transform="rotate(240 35 35)" />
        <path d="M35,35 C42,30 51,24 60,26 C54,34 44,34 35,35 Z" fill="#3D5A45" transform="rotate(300 35 35)" />
        {/* Center */}
        <circle cx="35" cy="35" r="5" fill="#3D5A45" />
      </svg>

      {/* Ylang flower 2 — bottom-center-right */}
      <svg
        width="65"
        height="65"
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          bottom: "20%",
          right: "25%",
          opacity: 0.16,
          transform: "rotate(25deg)",
        }}
      >
        <path d="M35,35 C32,28 30,18 35,8 C40,18 38,28 35,35 Z" fill="#3D5A45" />
        <path d="M35,35 C42,30 51,24 60,26 C54,34 44,34 35,35 Z" fill="#3D5A45" transform="rotate(60 35 35)" />
        <path d="M35,35 C42,30 51,24 60,26 C54,34 44,34 35,35 Z" fill="#3D5A45" transform="rotate(120 35 35)" />
        <path d="M35,35 C32,28 30,18 35,8 C40,18 38,28 35,35 Z" fill="#3D5A45" transform="rotate(180 35 35)" />
        <path d="M35,35 C42,30 51,24 60,26 C54,34 44,34 35,35 Z" fill="#3D5A45" transform="rotate(240 35 35)" />
        <path d="M35,35 C42,30 51,24 60,26 C54,34 44,34 35,35 Z" fill="#3D5A45" transform="rotate(300 35 35)" />
        <circle cx="35" cy="35" r="5" fill="#3D5A45" />
      </svg>
    </div>
  );
}

/* ─── Layer 3: small gold flowers + leaf pairs (speed 0.32) ─── */
function GoldFloralLayer() {
  const ref = useScrollParallax(0.32);

  const flowers: { x: string; y: string; size: number; rot: number; opacity: number }[] = [
    { x: "5%",   y: "8%",  size: 14, rot: 0,   opacity: 0.30 },
    { x: "25%",  y: "3%",  size: 12, rot: 40,  opacity: 0.25 },
    { x: "55%",  y: "12%", size: 16, rot: -20, opacity: 0.32 },
    { x: "78%",  y: "6%",  size: 13, rot: 60,  opacity: 0.28 },
    { x: "92%",  y: "28%", size: 12, rot: -45, opacity: 0.22 },
    { x: "12%",  y: "48%", size: 14, rot: 15,  opacity: 0.30 },
    { x: "40%",  y: "52%", size: 11, rot: -30, opacity: 0.26 },
    { x: "68%",  y: "45%", size: 15, rot: 50,  opacity: 0.34 },
  ];

  const leafPairs: { x: string; y: string; rot: number; opacity: number }[] = [
    { x: "18%",  y: "22%", rot: -15, opacity: 0.28 },
    { x: "62%",  y: "30%", rot: 30,  opacity: 0.22 },
    { x: "35%",  y: "70%", rot: -40, opacity: 0.30 },
    { x: "80%",  y: "60%", rot: 20,  opacity: 0.25 },
    { x: "48%",  y: "85%", rot: -10, opacity: 0.28 },
    { x: "8%",   y: "78%", rot: 50,  opacity: 0.22 },
  ];

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        willChange: "transform",
      }}
    >
      {/* Small 5-petal flowers */}
      {flowers.map((f, i) => {
        const r = f.size / 2;
        const pr = r * 0.55; // petal radius
        return (
          <svg
            key={`flower-${i}`}
            width={f.size * 3}
            height={f.size * 3}
            viewBox={`0 0 ${f.size * 3} ${f.size * 3}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              left: f.x,
              top: f.y,
              opacity: f.opacity,
              transform: `translate(-50%, -50%) rotate(${f.rot}deg)`,
            }}
          >
            {/* 5 petals at 72° intervals */}
            {[0, 72, 144, 216, 288].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const cx = r * 3 / 2 + Math.sin(rad) * r;
              const cy = r * 3 / 2 - Math.cos(rad) * r;
              return (
                <ellipse
                  key={angle}
                  cx={cx}
                  cy={cy}
                  rx={pr * 0.65}
                  ry={pr}
                  fill="#C4975A"
                  transform={`rotate(${angle} ${cx} ${cy})`}
                />
              );
            })}
            {/* Center dot */}
            <circle cx={r * 3 / 2} cy={r * 3 / 2} r={pr * 0.5} fill="#C4975A" />
          </svg>
        );
      })}

      {/* Tiny leaf pairs */}
      {leafPairs.map((lp, i) => (
        <svg
          key={`leaf-${i}`}
          width="32"
          height="24"
          viewBox="0 0 32 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            left: lp.x,
            top: lp.y,
            opacity: lp.opacity,
            transform: `translate(-50%, -50%) rotate(${lp.rot}deg)`,
          }}
        >
          {/* Short stem */}
          <path d="M16,22 C16,16 16,12 16,8" stroke="#C4975A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Left leaf */}
          <ellipse cx="10" cy="10" rx="8" ry="5" fill="#C4975A" transform="rotate(-30 10 10)" />
          {/* Right leaf */}
          <ellipse cx="22" cy="10" rx="8" ry="5" fill="#C4975A" transform="rotate(30 22 10)" />
        </svg>
      ))}
    </div>
  );
}

/* ─── Main export ─── */
export default function ParallaxBg() {
  return (
    <>
      <TropicalLeafLayer />
      <BotanicalSprigLayer />
      <GoldFloralLayer />
    </>
  );
}
