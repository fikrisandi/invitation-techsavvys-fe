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

/* Layer 1 - Large rose images at corners (slowest) */
function RoseBackground() {
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
      {/* Top-left rose */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "50%",
          height: "45%",
          opacity: 0.5,
        }}
      >
        <Image
          src="/parallax/rose-1.jpg"
          alt="Rose bouquet"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "saturate(1.2)",
            maskImage: "radial-gradient(ellipse at 0% 0%, black 30%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at 0% 0%, black 30%, transparent 70%)",
          }}
          priority
        />
      </div>

      {/* Bottom-right rose */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "50%",
          height: "45%",
          opacity: 0.45,
        }}
      >
        <Image
          src="/parallax/rose-2.jpg"
          alt="Rose bouquet"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "saturate(1.2)",
            maskImage: "radial-gradient(ellipse at 100% 100%, black 30%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at 100% 100%, black 30%, transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}

/* Layer 2 - Floating rose petals (medium speed) */
function FloatingPetals() {
  const ref = useScrollParallax(0.15);

  const petals = [
    { left: "15%", top: "25%", size: 70, rotate: 20, opacity: 0.6 },
    { left: "75%", top: "20%", size: 55, rotate: -15, opacity: 0.5 },
    { left: "25%", top: "55%", size: 65, rotate: 45, opacity: 0.55 },
    { left: "80%", top: "50%", size: 50, rotate: -30, opacity: 0.45 },
    { left: "10%", top: "75%", size: 60, rotate: 35, opacity: 0.5 },
    { left: "65%", top: "80%", size: 70, rotate: -20, opacity: 0.6 },
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
      {petals.map((petal, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: petal.left,
            top: petal.top,
            width: petal.size,
            height: petal.size,
            transform: `rotate(${petal.rotate}deg)`,
            opacity: petal.opacity,
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <Image
            src="/parallax/rose-3.jpg"
            alt="Rose petal"
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

/* Layer 3 - SVG rose petals for elegance */
function SvgPetals() {
  const ref = useScrollParallax(0.22);

  const petals = [
    { left: "8%", top: "20%", rotate: 0, size: 28, opacity: 0.35 },
    { left: "65%", top: "8%", rotate: 45, size: 24, opacity: 0.30 },
    { left: "85%", top: "35%", rotate: 90, size: 32, opacity: 0.28 },
    { left: "15%", top: "50%", rotate: 120, size: 26, opacity: 0.35 },
    { left: "75%", top: "55%", rotate: 200, size: 30, opacity: 0.30 },
    { left: "40%", top: "70%", rotate: 270, size: 22, opacity: 0.28 },
    { left: "90%", top: "75%", rotate: 315, size: 28, opacity: 0.32 },
    { left: "25%", top: "85%", rotate: 160, size: 26, opacity: 0.25 },
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
      {petals.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            transform: `translate(-50%, -50%) rotate(${p.rotate}deg)`,
          }}
        >
          <svg
            width={p.size}
            height={p.size * 1.5}
            viewBox="0 0 20 30"
          >
            <path
              d="M 10 28 C 2 20, 0 10, 10 2 C 20 10, 18 20, 10 28 Z"
              fill="#DCB0BA"
              fillOpacity={p.opacity}
              stroke="none"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

/* Layer 4 - SVG rose buds */
function RoseBuds() {
  const ref = useScrollParallax(0.32);

  const buds = [
    { left: "22%", top: "38%", rotate: 15 },
    { left: "48%", top: "45%", rotate: -20 },
    { left: "72%", top: "40%", rotate: 40 },
    { left: "30%", top: "78%", rotate: -10 },
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
      {buds.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: b.left,
            top: b.top,
            transform: `translate(-50%, -50%) rotate(${b.rotate}deg)`,
          }}
        >
          <svg width="15" height="18" viewBox="0 0 30 36">
            {/* Left petal */}
            <path
              d="M 15 32 C 4 24, 2 12, 10 6 C 14 14, 14 24, 15 32 Z"
              fill="#A85070"
              fillOpacity="0.35"
              stroke="none"
            />
            {/* Right petal */}
            <path
              d="M 15 32 C 26 24, 28 12, 20 6 C 16 14, 16 24, 15 32 Z"
              fill="#A85070"
              fillOpacity="0.35"
              stroke="none"
            />
            {/* Center front petal */}
            <path
              d="M 15 32 C 8 22, 9 10, 15 4 C 21 10, 22 22, 15 32 Z"
              fill="#A85070"
              fillOpacity="0.35"
              stroke="none"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

/* Layer 5 - Full rose SVG shapes */
function RoseSvgLayer() {
  const ref = useScrollParallax(0.08);

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
      {/* Top-left rose SVG */}
      <div style={{ position: "absolute", top: -40, left: -40 }}>
        <svg width={160} height={160} viewBox="0 0 160 160">
          <g fill="#C17A8F" fillOpacity={0.12} stroke="none">
            <path d="M 80 80 C 60 50, 30 45, 28 75 C 26 100, 55 105, 80 80 Z" />
            <path d="M 80 80 C 55 65, 40 38, 65 28 C 85 20, 100 48, 80 80 Z" />
            <path d="M 80 80 C 80 50, 100 30, 120 48 C 138 65, 120 90, 80 80 Z" />
            <path d="M 80 80 C 108 70, 130 85, 125 108 C 120 130, 95 128, 80 80 Z" />
            <path d="M 80 80 C 95 108, 85 135, 62 132 C 42 128, 40 105, 80 80 Z" />
            <path d="M 80 80 C 55 105, 30 100, 32 78 C 34 58, 60 58, 80 80 Z" />
          </g>
        </svg>
      </div>
      {/* Bottom-right rose SVG */}
      <div style={{ position: "absolute", bottom: -40, right: -40 }}>
        <svg width={160} height={160} viewBox="0 0 160 160">
          <g fill="#C17A8F" fillOpacity={0.12} stroke="none">
            <path d="M 80 80 C 60 50, 30 45, 28 75 C 26 100, 55 105, 80 80 Z" />
            <path d="M 80 80 C 55 65, 40 38, 65 28 C 85 20, 100 48, 80 80 Z" />
            <path d="M 80 80 C 80 50, 100 30, 120 48 C 138 65, 120 90, 80 80 Z" />
            <path d="M 80 80 C 108 70, 130 85, 125 108 C 120 130, 95 128, 80 80 Z" />
            <path d="M 80 80 C 95 108, 85 135, 62 132 C 42 128, 40 105, 80 80 Z" />
            <path d="M 80 80 C 55 105, 30 100, 32 78 C 34 58, 60 58, 80 80 Z" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function ParallaxBg() {
  return (
    <>
      <RoseBackground />
      <RoseSvgLayer />
      <FloatingPetals />
      <SvgPetals />
      <RoseBuds />
    </>
  );
}
