"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export function useScrollParallax(speed: number) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const vh = window.innerHeight;
      const y = (window.scrollY * speed) % vh;
      el.style.transform = `translate3d(0, ${y}px, 0)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);
  return ref;
}

/* Layer 1 - Tropical flower background (slowest) */
function FlowerBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Top-left flower arrangement */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "50%",
          height: "45%",
          opacity: 0.45,
        }}
      >
        <Image
          src="/parallax/ylang-1.jpg"
          alt="Tropical flowers"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "saturate(1.2) brightness(1.05)",
            maskImage: "radial-gradient(ellipse at 0% 0%, black 30%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at 0% 0%, black 30%, transparent 70%)",
          }}
          priority
        />
      </div>

      {/* Bottom-right flower arrangement */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "50%",
          height: "45%",
          opacity: 0.4,
        }}
      >
        <Image
          src="/parallax/ylang-2.jpg"
          alt="Tropical flowers"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "saturate(1.2) brightness(1.05)",
            maskImage: "radial-gradient(ellipse at 100% 100%, black 30%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at 100% 100%, black 30%, transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}

/* Layer 2 - Monstera leaf silhouettes */
function TropicalLeafLayer() {
  const ref = useScrollParallax(0.1);

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
      {/* Top-left monstera */}
      <svg
        width="220"
        height="220"
        viewBox="0 0 220 220"
        fill="none"
        style={{ position: "absolute", top: -30, left: -30, opacity: 0.08 }}
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

      {/* Bottom-right monstera */}
      <svg
        width="200"
        height="200"
        viewBox="0 0 220 220"
        fill="none"
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
        <path d="M80,60 C110,80 155,100 185,140" stroke="#FAF7F2" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
      </svg>

      {/* Mid-left monstera */}
      <svg
        width="180"
        height="180"
        viewBox="0 0 220 220"
        fill="none"
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
      </svg>
    </div>
  );
}

/* Layer 3 - Floating flower circles */
function FloatingFlowers() {
  const ref = useScrollParallax(0.18);

  const flowers = [
    { left: "15%", top: "25%", size: 70, rotate: 15, opacity: 0.5 },
    { left: "78%", top: "20%", size: 55, rotate: -20, opacity: 0.45 },
    { left: "25%", top: "60%", size: 65, rotate: 35, opacity: 0.5 },
    { left: "80%", top: "55%", size: 50, rotate: -10, opacity: 0.4 },
    { left: "45%", top: "75%", size: 60, rotate: 25, opacity: 0.45 },
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
      {flowers.map((f, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: f.left,
            top: f.top,
            width: f.size,
            height: f.size,
            transform: `rotate(${f.rotate}deg)`,
            opacity: f.opacity,
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <Image
            src="/parallax/ylang-1.jpg"
            alt="Ylang flower"
            fill
            style={{
              objectFit: "cover",
              filter: "saturate(1.3) brightness(1.1)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* Layer 4 - Ylang-ylang flower SVG shapes */
function YlangFlowerSvg() {
  const ref = useScrollParallax(0.25);

  const positions = [
    { left: "20%", top: "20%", scale: 1, opacity: 0.18 },
    { left: "70%", top: "12%", scale: 0.8, opacity: 0.15 },
    { left: "48%", top: "45%", scale: 1.2, opacity: 0.2 },
    { left: "75%", top: "60%", scale: 0.9, opacity: 0.16 },
    { left: "30%", top: "78%", scale: 1, opacity: 0.18 },
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
      {positions.map((p, i) => (
        <svg
          key={i}
          width={70 * p.scale}
          height={70 * p.scale}
          viewBox="0 0 70 70"
          fill="none"
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            opacity: p.opacity,
          }}
        >
          {/* 6 narrow curved petals - ylang-ylang style */}
          <path d="M35,35 C32,28 30,18 35,8 C40,18 38,28 35,35 Z" fill="#3D5A45" />
          <path d="M35,35 C42,30 51,24 60,26 C54,34 44,34 35,35 Z" fill="#3D5A45" transform="rotate(60 35 35)" />
          <path d="M35,35 C42,30 51,24 60,26 C54,34 44,34 35,35 Z" fill="#3D5A45" transform="rotate(120 35 35)" />
          <path d="M35,35 C32,28 30,18 35,8 C40,18 38,28 35,35 Z" fill="#3D5A45" transform="rotate(180 35 35)" />
          <path d="M35,35 C42,30 51,24 60,26 C54,34 44,34 35,35 Z" fill="#3D5A45" transform="rotate(240 35 35)" />
          <path d="M35,35 C42,30 51,24 60,26 C54,34 44,34 35,35 Z" fill="#3D5A45" transform="rotate(300 35 35)" />
          {/* Center */}
          <circle cx="35" cy="35" r="5" fill="#3D5A45" />
        </svg>
      ))}
    </div>
  );
}

/* Layer 5 - Botanical sprigs */
function BotanicalSprigs() {
  const ref = useScrollParallax(0.15);

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
      {/* Sprig 1 - top-right */}
      <svg
        width="120"
        height="130"
        viewBox="0 0 120 130"
        fill="none"
        style={{ position: "absolute", top: "5%", right: "5%", opacity: 0.15 }}
      >
        <path d="M60,125 C55,100 50,75 58,50 C64,30 72,15 80,5" stroke="#3D5A45" strokeWidth="3" strokeLinecap="round" fill="none" />
        <ellipse cx="50" cy="95" rx="16" ry="9" fill="#3D5A45" transform="rotate(-30 50 95)" />
        <ellipse cx="68" cy="78" rx="16" ry="9" fill="#3D5A45" transform="rotate(25 68 78)" />
        <ellipse cx="48" cy="62" rx="15" ry="8" fill="#3D5A45" transform="rotate(-35 48 62)" />
        <ellipse cx="66" cy="46" rx="14" ry="8" fill="#3D5A45" transform="rotate(20 66 46)" />
        <ellipse cx="74" cy="28" rx="13" ry="7" fill="#3D5A45" transform="rotate(-15 74 28)" />
      </svg>

      {/* Sprig 2 - bottom-left */}
      <svg
        width="110"
        height="120"
        viewBox="0 0 120 130"
        fill="none"
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
      </svg>

      {/* Sprig 3 - mid-right */}
      <svg
        width="100"
        height="110"
        viewBox="0 0 120 130"
        fill="none"
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
      </svg>
    </div>
  );
}

/* Layer 6 - Gold accent flowers */
function GoldAccents() {
  const ref = useScrollParallax(0.32);

  const accents = [
    { x: "5%", y: "8%", size: 14, rot: 0, opacity: 0.30 },
    { x: "25%", y: "3%", size: 12, rot: 40, opacity: 0.25 },
    { x: "55%", y: "12%", size: 16, rot: -20, opacity: 0.32 },
    { x: "78%", y: "6%", size: 13, rot: 60, opacity: 0.28 },
    { x: "92%", y: "28%", size: 12, rot: -45, opacity: 0.22 },
    { x: "12%", y: "48%", size: 14, rot: 15, opacity: 0.30 },
    { x: "68%", y: "45%", size: 15, rot: 50, opacity: 0.34 },
    { x: "35%", y: "85%", size: 13, rot: -30, opacity: 0.26 },
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
      {accents.map((f, i) => {
        const r = f.size / 2;
        const pr = r * 0.55;
        return (
          <svg
            key={i}
            width={f.size * 3}
            height={f.size * 3}
            viewBox={`0 0 ${f.size * 3} ${f.size * 3}`}
            fill="none"
            style={{
              position: "absolute",
              left: f.x,
              top: f.y,
              opacity: f.opacity,
              transform: `translate(-50%, -50%) rotate(${f.rot}deg)`,
            }}
          >
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
            <circle cx={r * 3 / 2} cy={r * 3 / 2} r={pr * 0.5} fill="#C4975A" />
          </svg>
        );
      })}
    </div>
  );
}

export default function ParallaxBg() {
  return (
    <>
      <FlowerBackground />
      <TropicalLeafLayer />
      <BotanicalSprigs />
      <FloatingFlowers />
      <YlangFlowerSvg />
      <GoldAccents />
    </>
  );
}
