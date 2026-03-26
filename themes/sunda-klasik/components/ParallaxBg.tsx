"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

function useScrollParallax(speed: number) {
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

/* Layer 1 - Batik Sunda background (slowest) */
function BatikBackground() {
  const ref = useScrollParallax(0.05);
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
      {/* Top batik pattern */}
      <div
        style={{
          position: "absolute",
          top: "-5%",
          left: "0",
          width: "100%",
          height: "35%",
          opacity: 0.25,
        }}
      >
        <Image
          src="/parallax/batik-1.jpg"
          alt="Batik Sunda pattern"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "sepia(0.3) hue-rotate(20deg) saturate(1.2)",
            maskImage: "linear-gradient(to bottom, black 30%, transparent 90%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 90%)",
          }}
          priority
        />
      </div>

      {/* Bottom batik pattern */}
      <div
        style={{
          position: "absolute",
          bottom: "-5%",
          left: "0",
          width: "100%",
          height: "30%",
          opacity: 0.2,
          transform: "rotate(180deg)",
        }}
      >
        <Image
          src="/parallax/batik-1.jpg"
          alt="Batik Sunda pattern"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "sepia(0.3) hue-rotate(20deg) saturate(1.2)",
            maskImage: "linear-gradient(to bottom, black 30%, transparent 90%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 90%)",
          }}
        />
      </div>
    </div>
  );
}

/* Layer 2 - Rumah Adat Sunda (Julang Ngapak) silhouette */
function RumahAdatLayer() {
  const ref = useScrollParallax(0.12);

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
      {/* Left side - stylized Julang Ngapak roof */}
      <svg
        viewBox="0 0 200 150"
        width={160}
        height={120}
        style={{
          position: "absolute",
          top: "10%",
          left: "2%",
          opacity: 0.12,
        }}
      >
        {/* Roof shape - characteristic curved horn-like tips */}
        <path
          d="M10,100 L40,50 C50,35 60,30 100,25 C140,30 150,35 160,50 L190,100"
          fill="none"
          stroke="#8B6914"
          strokeWidth="4"
        />
        <path
          d="M40,50 L20,30 M160,50 L180,30"
          fill="none"
          stroke="#8B6914"
          strokeWidth="3"
        />
        {/* House body */}
        <rect x="50" y="100" width="100" height="40" fill="#8B6914" opacity="0.5" />
        {/* Pillars */}
        <line x1="60" y1="100" x2="60" y2="140" stroke="#8B6914" strokeWidth="4" />
        <line x1="140" y1="100" x2="140" y2="140" stroke="#8B6914" strokeWidth="4" />
        {/* Door */}
        <rect x="90" y="115" width="20" height="25" fill="none" stroke="#8B6914" strokeWidth="2" />
      </svg>

      {/* Right side - another variation */}
      <svg
        viewBox="0 0 200 150"
        width={140}
        height={105}
        style={{
          position: "absolute",
          top: "50%",
          right: "3%",
          opacity: 0.1,
          transform: "scaleX(-1)",
        }}
      >
        <path
          d="M10,100 L40,50 C50,35 60,30 100,25 C140,30 150,35 160,50 L190,100"
          fill="none"
          stroke="#8B6914"
          strokeWidth="4"
        />
        <path
          d="M40,50 L20,30 M160,50 L180,30"
          fill="none"
          stroke="#8B6914"
          strokeWidth="3"
        />
        <rect x="50" y="100" width="100" height="40" fill="#8B6914" opacity="0.5" />
      </svg>
    </div>
  );
}

/* Layer 3 - Angklung silhouettes */
function AngklungLayer() {
  const ref = useScrollParallax(0.2);

  const angklungPositions = [
    { left: "8%", top: "40%", scale: 1, opacity: 0.15 },
    { left: "88%", top: "30%", scale: 0.8, opacity: 0.12 },
    { left: "15%", top: "70%", scale: 0.9, opacity: 0.13 },
    { left: "82%", top: "65%", scale: 0.85, opacity: 0.14 },
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
      {angklungPositions.map((pos, i) => (
        <svg
          key={i}
          viewBox="0 0 60 100"
          width={60 * pos.scale}
          height={100 * pos.scale}
          style={{
            position: "absolute",
            left: pos.left,
            top: pos.top,
            opacity: pos.opacity,
          }}
        >
          {/* Frame top bar */}
          <rect x="5" y="5" width="50" height="4" fill="#8B6914" rx="2" />
          {/* Hanging bamboo tubes */}
          <rect x="10" y="12" width="8" height="50" fill="#8B6914" rx="3" />
          <rect x="22" y="12" width="6" height="40" fill="#8B6914" rx="2" />
          <rect x="32" y="12" width="7" height="55" fill="#8B6914" rx="3" />
          <rect x="43" y="12" width="5" height="35" fill="#8B6914" rx="2" />
          {/* Strings */}
          <line x1="14" y1="9" x2="14" y2="12" stroke="#8B6914" strokeWidth="1" />
          <line x1="25" y1="9" x2="25" y2="12" stroke="#8B6914" strokeWidth="1" />
          <line x1="35" y1="9" x2="35" y2="12" stroke="#8B6914" strokeWidth="1" />
          <line x1="45" y1="9" x2="45" y2="12" stroke="#8B6914" strokeWidth="1" />
          {/* Handle */}
          <rect x="27" y="1" width="6" height="10" fill="#8B6914" rx="2" />
        </svg>
      ))}
    </div>
  );
}

/* Layer 4 - Floating batik circles with images */
function FloatingBatikImages() {
  const ref = useScrollParallax(0.15);

  const circles = [
    { left: "12%", top: "35%", size: 70, opacity: 0.35 },
    { left: "78%", top: "45%", size: 60, opacity: 0.3 },
    { left: "25%", top: "75%", size: 65, opacity: 0.32 },
    { left: "65%", top: "25%", size: 55, opacity: 0.28 },
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
      {circles.map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: c.left,
            top: c.top,
            width: c.size,
            height: c.size,
            opacity: c.opacity,
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <Image
            src="/parallax/batik-1.jpg"
            alt="Batik element"
            fill
            style={{
              objectFit: "cover",
              filter: "sepia(0.2) hue-rotate(15deg) saturate(1.3)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* Layer 5 - Mega Mendung pattern elements */
function MegaMendungLayer() {
  const ref = useScrollParallax(0.28);

  const clouds = [
    { left: "20%", top: "25%", scale: 1.2, opacity: 0.18 },
    { left: "70%", top: "20%", scale: 1, opacity: 0.15 },
    { left: "35%", top: "55%", scale: 0.9, opacity: 0.16 },
    { left: "75%", top: "60%", scale: 1.1, opacity: 0.14 },
    { left: "10%", top: "80%", scale: 0.85, opacity: 0.12 },
    { left: "55%", top: "85%", scale: 1, opacity: 0.17 },
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
      {clouds.map((c, i) => (
        <svg
          key={i}
          viewBox="0 0 80 40"
          width={80 * c.scale}
          height={40 * c.scale}
          style={{
            position: "absolute",
            left: c.left,
            top: c.top,
            opacity: c.opacity,
          }}
        >
          {/* Layered cloud pattern (Mega Mendung style) */}
          <path
            d="M10,35 Q15,25 25,28 Q30,20 40,22 Q50,15 55,22 Q65,18 70,28 Q75,35 70,35 Z"
            fill="none"
            stroke="#2E5090"
            strokeWidth="1.5"
          />
          <path
            d="M15,32 Q20,24 28,26 Q33,20 40,21 Q48,16 53,21 Q60,18 65,26 Q68,32 65,32 Z"
            fill="none"
            stroke="#3A65A8"
            strokeWidth="1.2"
          />
          <path
            d="M20,29 Q24,23 30,24 Q35,19 40,20 Q46,17 50,20 Q55,18 58,24 Q60,29 58,29 Z"
            fill="none"
            stroke="#4A7AC0"
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
}

export default function ParallaxBg() {
  return (
    <>
      <BatikBackground />
      <RumahAdatLayer />
      <AngklungLayer />
      <FloatingBatikImages />
      <MegaMendungLayer />
    </>
  );
}
