"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

function useScrollParallax(speed: number) {
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

/* Layer 1 - Large rose images at corners (slowest) */
function RoseBackground() {
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
      {/* Top-left rose */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "50%",
          height: "45%",
          opacity: 0.7,
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
          opacity: 0.65,
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

/* Layer 2 - SVG rose petals for elegance */
function SvgPetals() {
  const ref = useScrollParallax(0.22);

  const petals = [
    { left: "8%", top: "20%", rotate: 0, size: 28, opacity: 0.25 },
    { left: "85%", top: "35%", rotate: 90, size: 32, opacity: 0.22 },
    { left: "40%", top: "70%", rotate: 270, size: 22, opacity: 0.22 },
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
    { left: "48%", top: "45%", rotate: -20 },
    { left: "72%", top: "40%", rotate: 40 },
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
      <SvgPetals />
      <RoseBuds />
    </>
  );
}
