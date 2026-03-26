"use client";
import { useEffect, useRef } from "react";

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

/* A single watercolor-style rose built from Bezier petal paths */
function RoseSVG({ size, color, opacity }: { size: number; color: string; opacity: number }) {
  const s = size / 160; // scale factor relative to 160px design space
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <g fill={color} fillOpacity={opacity} stroke="none">
        {/* Outer ring – 6 large open petals */}
        <path d="M 80 80 C 60 50, 30 45, 28 75 C 26 100, 55 105, 80 80 Z" />
        <path d="M 80 80 C 55 65, 40 38, 65 28 C 85 20, 100 48, 80 80 Z" />
        <path d="M 80 80 C 80 50, 100 30, 120 48 C 138 65, 120 90, 80 80 Z" />
        <path d="M 80 80 C 108 70, 130 85, 125 108 C 120 130, 95 128, 80 80 Z" />
        <path d="M 80 80 C 95 108, 85 135, 62 132 C 42 128, 40 105, 80 80 Z" />
        <path d="M 80 80 C 55 105, 30 100, 32 78 C 34 58, 60 58, 80 80 Z" />
        {/* Middle ring – 5 medium petals */}
        <path d="M 80 80 C 65 62, 50 58, 52 74 C 54 88, 68 88, 80 80 Z" />
        <path d="M 80 80 C 72 60, 82 46, 95 56 C 106 64, 100 76, 80 80 Z" />
        <path d="M 80 80 C 98 72, 108 80, 104 93 C 100 106, 88 104, 80 80 Z" />
        <path d="M 80 80 C 88 98, 82 112, 70 108 C 58 104, 58 92, 80 80 Z" />
        <path d="M 80 80 C 62 90, 50 84, 52 72 C 54 60, 68 64, 80 80 Z" />
        {/* Center tight spiral petals */}
        <path d="M 80 80 C 74 72, 72 76, 76 82 C 78 86, 82 84, 80 80 Z" />
        <path d="M 80 80 C 86 74, 88 78, 84 84 C 82 88, 78 86, 80 80 Z" />
        <path d="M 80 80 C 80 72, 84 72, 86 76 C 88 80, 84 82, 80 80 Z" />
        <path d="M 80 80 C 74 82, 72 86, 76 88 C 80 90, 82 86, 80 80 Z" />
      </g>
    </svg>
  );
}

/* Layer 1 – Large rose silhouettes at corners (speed: 0.07) */
function LargeRoses() {
  const ref = useScrollParallax(0.07);
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
      {/* Top-left rose, partially off screen */}
      <div style={{ position: "absolute", top: -40, left: -40 }}>
        <RoseSVG size={160} color="#C17A8F" opacity={0.12} />
      </div>
      {/* Bottom-right rose, partially off screen */}
      <div style={{ position: "absolute", bottom: -40, right: -40 }}>
        <RoseSVG size={160} color="#C17A8F" opacity={0.12} />
      </div>
    </div>
  );
}

/* Layer 2 – Scattered rose petals (speed: 0.2) */
function ScatteredPetals() {
  const ref = useScrollParallax(0.2);
  const petals = [
    { left: "8%",  top: "20%", rotate: 0,   size: 28, opacity: 0.35 },
    { left: "65%", top: "8%",  rotate: 45,  size: 24, opacity: 0.30 },
    { left: "85%", top: "35%", rotate: 90,  size: 32, opacity: 0.28 },
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
            xmlns="http://www.w3.org/2000/svg"
          >
            {/*
              Teardrop petal shape:
              Start at the bottom tip, curve up and out to the right,
              across the top, back down the left side, close at tip.
            */}
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

/* Layer 3 – Tiny floating petals + rosebud shapes (speed: 0.35) */
function TinyPetalsAndBuds() {
  const ref = useScrollParallax(0.35);

  // 6 tiny petals scattered
  const tinyPetals = [
    { left: "12%", top: "15%", rotate: 30  },
    { left: "55%", top: "25%", rotate: 80  },
    { left: "78%", top: "18%", rotate: 150 },
    { left: "35%", top: "60%", rotate: 220 },
    { left: "62%", top: "72%", rotate: 300 },
    { left: "88%", top: "60%", rotate: 10  },
  ];

  // 4 rosebud shapes scattered
  const buds = [
    { left: "22%", top: "38%", rotate: 15  },
    { left: "48%", top: "45%", rotate: -20 },
    { left: "72%", top: "40%", rotate: 40  },
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
      {tinyPetals.map((p, i) => (
        <div
          key={`tp-${i}`}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            transform: `translate(-50%, -50%) rotate(${p.rotate}deg)`,
          }}
        >
          <svg width="10" height="14" viewBox="0 0 20 28" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 10 26 C 3 18, 0 10, 10 2 C 20 10, 17 18, 10 26 Z"
              fill="#C17A8F"
              fillOpacity="0.30"
              stroke="none"
            />
          </svg>
        </div>
      ))}

      {buds.map((b, i) => (
        <div
          key={`bud-${i}`}
          style={{
            position: "absolute",
            left: b.left,
            top: b.top,
            transform: `translate(-50%, -50%) rotate(${b.rotate}deg)`,
          }}
        >
          {/* Rosebud: 3 tight overlapping petals forming a closed bud */}
          <svg width="15" height="18" viewBox="0 0 30 36" xmlns="http://www.w3.org/2000/svg">
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

export default function ParallaxBg() {
  return (
    <>
      <LargeRoses />
      <ScatteredPetals />
      <TinyPetalsAndBuds />
    </>
  );
}
