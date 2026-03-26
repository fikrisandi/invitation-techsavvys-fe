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

/* Layer 1 - Wayang & Batik background (slowest) */
function WayangBackground() {
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
      {/* Top center - Wayang silhouette */}
      <div
        style={{
          position: "absolute",
          top: "-5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "50%",
          height: "35%",
          opacity: 0.4,
        }}
      >
        <Image
          src="/parallax/wayang-1.jpg"
          alt="Wayang silhouette"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "sepia(0.5) saturate(1.5)",
            maskImage: "linear-gradient(to bottom, black 30%, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 85%)",
          }}
          priority
        />
      </div>

      {/* Bottom - Batik pattern */}
      <div
        style={{
          position: "absolute",
          bottom: "-5%",
          left: "0",
          width: "100%",
          height: "30%",
          opacity: 0.25,
        }}
      >
        <Image
          src="/parallax/batik-1.jpg"
          alt="Batik pattern"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "sepia(0.6) saturate(1.3)",
            maskImage: "linear-gradient(to top, black 20%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 80%)",
          }}
        />
      </div>
    </div>
  );
}

/* Layer 2 - Gunungan (Javanese tree of life) decorations */
function GununganLayer() {
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
      {/* Left side gunungan */}
      <svg
        viewBox="0 0 120 200"
        width={100}
        height={166}
        style={{
          position: "absolute",
          top: "15%",
          left: "3%",
          fill: "#D4A020",
          opacity: 0.15,
        }}
      >
        <path d="M60,2 C60,2 10,70 8,130 C8,160 20,185 60,195 C100,185 112,160 112,130 C110,70 60,2 60,2 Z" />
        <polygon points="60,30 66,40 60,50 54,40" fill="#0E0600" />
        <ellipse cx="60" cy="40" rx="3" ry="6" fill="#0E0600" transform="rotate(0,60,40)" />
        <ellipse cx="60" cy="40" rx="3" ry="6" fill="#0E0600" transform="rotate(45,60,40)" />
        <ellipse cx="60" cy="40" rx="3" ry="6" fill="#0E0600" transform="rotate(90,60,40)" />
        <ellipse cx="60" cy="40" rx="3" ry="6" fill="#0E0600" transform="rotate(135,60,40)" />
        <polygon points="60,62 50,80 70,80" fill="#0E0600" />
        <circle cx="45" cy="100" r="5" fill="#0E0600" />
        <circle cx="60" cy="95" r="5" fill="#0E0600" />
        <circle cx="75" cy="100" r="5" fill="#0E0600" />
        <polygon points="60,130 50,145 60,160 70,145" fill="#0E0600" />
      </svg>

      {/* Right side gunungan */}
      <svg
        viewBox="0 0 120 200"
        width={90}
        height={150}
        style={{
          position: "absolute",
          top: "45%",
          right: "5%",
          fill: "#D4A020",
          opacity: 0.12,
          transform: "scaleX(-1)",
        }}
      >
        <path d="M60,2 C60,2 10,70 8,130 C8,160 20,185 60,195 C100,185 112,160 112,130 C110,70 60,2 60,2 Z" />
        <polygon points="60,30 66,40 60,50 54,40" fill="#0E0600" />
        <ellipse cx="60" cy="40" rx="3" ry="6" fill="#0E0600" transform="rotate(45,60,40)" />
        <ellipse cx="60" cy="40" rx="3" ry="6" fill="#0E0600" transform="rotate(90,60,40)" />
        <ellipse cx="60" cy="40" rx="3" ry="6" fill="#0E0600" transform="rotate(135,60,40)" />
        <polygon points="60,62 50,80 70,80" fill="#0E0600" />
        <circle cx="45" cy="100" r="5" fill="#0E0600" />
        <circle cx="60" cy="95" r="5" fill="#0E0600" />
        <circle cx="75" cy="100" r="5" fill="#0E0600" />
      </svg>
    </div>
  );
}

/* Layer 3 - Kawung batik pattern elements */
function KawungLayer() {
  const ref = useScrollParallax(0.25);

  const kawungPositions = [
    { left: "10%", top: "25%", size: 50, opacity: 0.18 },
    { left: "85%", top: "20%", size: 45, opacity: 0.15 },
    { left: "20%", top: "60%", size: 55, opacity: 0.2 },
    { left: "75%", top: "65%", size: 48, opacity: 0.16 },
    { left: "50%", top: "80%", size: 52, opacity: 0.18 },
    { left: "5%", top: "75%", size: 42, opacity: 0.14 },
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
      {kawungPositions.map((k, i) => (
        <svg
          key={i}
          viewBox="0 0 40 40"
          width={k.size}
          height={k.size}
          style={{
            position: "absolute",
            left: k.left,
            top: k.top,
            opacity: k.opacity,
          }}
        >
          {/* Kawung motif - 4 oval petals */}
          <ellipse cx="20" cy="10" rx="6" ry="9" fill="none" stroke="#D4A020" strokeWidth="1.5" />
          <ellipse cx="20" cy="30" rx="6" ry="9" fill="none" stroke="#D4A020" strokeWidth="1.5" />
          <ellipse cx="10" cy="20" rx="9" ry="6" fill="none" stroke="#D4A020" strokeWidth="1.5" />
          <ellipse cx="30" cy="20" rx="9" ry="6" fill="none" stroke="#D4A020" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="3" fill="#D4A020" />
        </svg>
      ))}
    </div>
  );
}

/* Layer 4 - Floating image elements with batik */
function FloatingBatik() {
  const ref = useScrollParallax(0.18);

  const elements = [
    { left: "15%", top: "35%", size: 70, rotate: 15, opacity: 0.35 },
    { left: "80%", top: "40%", size: 60, rotate: -20, opacity: 0.3 },
    { left: "30%", top: "70%", size: 65, rotate: 30, opacity: 0.32 },
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
      {elements.map((el, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: el.left,
            top: el.top,
            width: el.size,
            height: el.size,
            transform: `rotate(${el.rotate}deg)`,
            opacity: el.opacity,
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
              filter: "sepia(0.4) saturate(1.4)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default function ParallaxBg() {
  return (
    <>
      <WayangBackground />
      <GununganLayer />
      <KawungLayer />
      <FloatingBatik />
    </>
  );
}
