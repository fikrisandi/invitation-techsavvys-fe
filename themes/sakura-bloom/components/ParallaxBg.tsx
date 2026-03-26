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

/* ─── Layer 1: large branch silhouettes (speed 0.08) ─── */
function BranchLayer() {
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
      {/* Top-left branch */}
      <svg
        width="280"
        height="200"
        viewBox="0 0 280 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.18 }}
      >
        {/* Main curved stem */}
        <path
          d="M10,10 C40,30 80,50 140,90 C180,115 230,140 270,180"
          stroke="#E8A0B0"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Branch 1 */}
        <path
          d="M40,28 C55,20 75,15 95,18"
          stroke="#E8A0B0"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Petals on branch 1 tip */}
        <ellipse cx="96" cy="16" rx="6" ry="4" fill="#E8A0B0" transform="rotate(-20 96 16)" />
        <ellipse cx="103" cy="14" rx="5" ry="3" fill="#E8A0B0" transform="rotate(10 103 14)" />
        <ellipse cx="100" cy="22" rx="5" ry="3" fill="#E8A0B0" transform="rotate(-40 100 22)" />
        <ellipse cx="108" cy="19" rx="5" ry="3" fill="#E8A0B0" transform="rotate(25 108 19)" />
        <ellipse cx="93" cy="23" rx="4" ry="3" fill="#E8A0B0" transform="rotate(-55 93 23)" />
        {/* Branch 2 */}
        <path
          d="M70,46 C80,35 95,28 115,30"
          stroke="#E8A0B0"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Petals on branch 2 tip */}
        <ellipse cx="116" cy="28" rx="6" ry="4" fill="#E8A0B0" transform="rotate(-15 116 28)" />
        <ellipse cx="123" cy="26" rx="5" ry="3" fill="#E8A0B0" transform="rotate(15 123 26)" />
        <ellipse cx="120" cy="34" rx="5" ry="3" fill="#E8A0B0" transform="rotate(-35 120 34)" />
        <ellipse cx="126" cy="32" rx="4" ry="3" fill="#E8A0B0" transform="rotate(30 126 32)" />
        <ellipse cx="112" cy="34" rx="4" ry="3" fill="#E8A0B0" transform="rotate(-50 112 34)" />
        {/* Branch 3 */}
        <path
          d="M100,66 C112,55 128,48 148,50"
          stroke="#E8A0B0"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Petals on branch 3 tip */}
        <ellipse cx="149" cy="48" rx="6" ry="4" fill="#E8A0B0" transform="rotate(-20 149 48)" />
        <ellipse cx="156" cy="46" rx="5" ry="3" fill="#E8A0B0" transform="rotate(10 156 46)" />
        <ellipse cx="153" cy="54" rx="5" ry="3" fill="#E8A0B0" transform="rotate(-40 153 54)" />
        <ellipse cx="159" cy="52" rx="4" ry="3" fill="#E8A0B0" transform="rotate(25 159 52)" />
        <ellipse cx="145" cy="55" rx="4" ry="3" fill="#E8A0B0" transform="rotate(-55 145 55)" />
        {/* Branch 4 */}
        <path
          d="M130,87 C142,76 158,70 178,72"
          stroke="#E8A0B0"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Petals on branch 4 tip */}
        <ellipse cx="179" cy="70" rx="5" ry="3.5" fill="#E8A0B0" transform="rotate(-15 179 70)" />
        <ellipse cx="185" cy="68" rx="4.5" ry="3" fill="#E8A0B0" transform="rotate(15 185 68)" />
        <ellipse cx="182" cy="76" rx="4.5" ry="3" fill="#E8A0B0" transform="rotate(-35 182 76)" />
        <ellipse cx="187" cy="74" rx="4" ry="2.5" fill="#E8A0B0" transform="rotate(30 187 74)" />
        <ellipse cx="175" cy="76" rx="4" ry="2.5" fill="#E8A0B0" transform="rotate(-50 175 76)" />
        {/* Branch 5 */}
        <path
          d="M160,108 C172,98 188,92 208,95"
          stroke="#E8A0B0"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Petals on branch 5 tip */}
        <ellipse cx="209" cy="93" rx="5" ry="3.5" fill="#E8A0B0" transform="rotate(-20 209 93)" />
        <ellipse cx="215" cy="91" rx="4.5" ry="3" fill="#E8A0B0" transform="rotate(10 215 91)" />
        <ellipse cx="212" cy="99" rx="4.5" ry="3" fill="#E8A0B0" transform="rotate(-40 212 99)" />
        <ellipse cx="217" cy="97" rx="4" ry="2.5" fill="#E8A0B0" transform="rotate(25 217 97)" />
        <ellipse cx="205" cy="99" rx="4" ry="2.5" fill="#E8A0B0" transform="rotate(-55 205 99)" />
        {/* Branch 6 */}
        <path
          d="M50,40 C45,60 42,85 38,110"
          stroke="#E8A0B0"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Branch 7 */}
        <path
          d="M90,65 C85,80 82,100 80,125"
          stroke="#E8A0B0"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Branch 8 */}
        <path
          d="M120,88 C130,100 138,115 145,135"
          stroke="#E8A0B0"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Dangling petals */}
        <ellipse cx="38" cy="115" rx="5" ry="3" fill="#E8A0B0" transform="rotate(20 38 115)" />
        <ellipse cx="34" cy="112" rx="4" ry="2.5" fill="#E8A0B0" transform="rotate(-10 34 112)" />
        <ellipse cx="42" cy="112" rx="4" ry="2.5" fill="#E8A0B0" transform="rotate(40 42 112)" />
        <ellipse cx="80" cy="128" rx="5" ry="3" fill="#E8A0B0" transform="rotate(15 80 128)" />
        <ellipse cx="76" cy="125" rx="4" ry="2.5" fill="#E8A0B0" transform="rotate(-20 76 125)" />
        <ellipse cx="84" cy="125" rx="4" ry="2.5" fill="#E8A0B0" transform="rotate(35 84 125)" />
        <ellipse cx="145" cy="138" rx="5" ry="3" fill="#E8A0B0" transform="rotate(-10 145 138)" />
        <ellipse cx="141" cy="135" rx="4" ry="2.5" fill="#E8A0B0" transform="rotate(-30 141 135)" />
        <ellipse cx="149" cy="135" rx="4" ry="2.5" fill="#E8A0B0" transform="rotate(20 149 135)" />
      </svg>

      {/* Bottom-right mirrored branch */}
      <svg
        width="280"
        height="200"
        viewBox="0 0 280 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          opacity: 0.14,
          transform: "rotate(180deg)",
        }}
      >
        {/* Main curved stem */}
        <path
          d="M10,10 C40,30 80,50 140,90 C180,115 230,140 270,180"
          stroke="#E8A0B0"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Branch 1 */}
        <path
          d="M40,28 C55,20 75,15 95,18"
          stroke="#E8A0B0"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="96" cy="16" rx="6" ry="4" fill="#E8A0B0" transform="rotate(-20 96 16)" />
        <ellipse cx="103" cy="14" rx="5" ry="3" fill="#E8A0B0" transform="rotate(10 103 14)" />
        <ellipse cx="100" cy="22" rx="5" ry="3" fill="#E8A0B0" transform="rotate(-40 100 22)" />
        <ellipse cx="108" cy="19" rx="5" ry="3" fill="#E8A0B0" transform="rotate(25 108 19)" />
        <ellipse cx="93" cy="23" rx="4" ry="3" fill="#E8A0B0" transform="rotate(-55 93 23)" />
        {/* Branch 2 */}
        <path
          d="M70,46 C80,35 95,28 115,30"
          stroke="#E8A0B0"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="116" cy="28" rx="6" ry="4" fill="#E8A0B0" transform="rotate(-15 116 28)" />
        <ellipse cx="123" cy="26" rx="5" ry="3" fill="#E8A0B0" transform="rotate(15 123 26)" />
        <ellipse cx="120" cy="34" rx="5" ry="3" fill="#E8A0B0" transform="rotate(-35 120 34)" />
        <ellipse cx="126" cy="32" rx="4" ry="3" fill="#E8A0B0" transform="rotate(30 126 32)" />
        <ellipse cx="112" cy="34" rx="4" ry="3" fill="#E8A0B0" transform="rotate(-50 112 34)" />
        {/* Branch 3 */}
        <path
          d="M100,66 C112,55 128,48 148,50"
          stroke="#E8A0B0"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="149" cy="48" rx="6" ry="4" fill="#E8A0B0" transform="rotate(-20 149 48)" />
        <ellipse cx="156" cy="46" rx="5" ry="3" fill="#E8A0B0" transform="rotate(10 156 46)" />
        <ellipse cx="153" cy="54" rx="5" ry="3" fill="#E8A0B0" transform="rotate(-40 153 54)" />
        <ellipse cx="159" cy="52" rx="4" ry="3" fill="#E8A0B0" transform="rotate(25 159 52)" />
        <ellipse cx="145" cy="55" rx="4" ry="3" fill="#E8A0B0" transform="rotate(-55 145 55)" />
        {/* Branch 4 */}
        <path
          d="M130,87 C142,76 158,70 178,72"
          stroke="#E8A0B0"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="179" cy="70" rx="5" ry="3.5" fill="#E8A0B0" transform="rotate(-15 179 70)" />
        <ellipse cx="185" cy="68" rx="4.5" ry="3" fill="#E8A0B0" transform="rotate(15 185 68)" />
        <ellipse cx="182" cy="76" rx="4.5" ry="3" fill="#E8A0B0" transform="rotate(-35 182 76)" />
        <ellipse cx="187" cy="74" rx="4" ry="2.5" fill="#E8A0B0" transform="rotate(30 187 74)" />
        <ellipse cx="175" cy="76" rx="4" ry="2.5" fill="#E8A0B0" transform="rotate(-50 175 76)" />
        {/* Branch 5 */}
        <path
          d="M160,108 C172,98 188,92 208,95"
          stroke="#E8A0B0"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="209" cy="93" rx="5" ry="3.5" fill="#E8A0B0" transform="rotate(-20 209 93)" />
        <ellipse cx="215" cy="91" rx="4.5" ry="3" fill="#E8A0B0" transform="rotate(10 215 91)" />
        <ellipse cx="212" cy="99" rx="4.5" ry="3" fill="#E8A0B0" transform="rotate(-40 212 99)" />
        <ellipse cx="217" cy="97" rx="4" ry="2.5" fill="#E8A0B0" transform="rotate(25 217 97)" />
        <ellipse cx="205" cy="99" rx="4" ry="2.5" fill="#E8A0B0" transform="rotate(-55 205 99)" />
      </svg>
    </div>
  );
}

/* ─── Layer 2: medium blossom clusters (speed 0.22) ─── */
function BlossomClusterLayer() {
  const ref = useScrollParallax(0.22);

  const clusters: { cx: string; cy: string; color: string; opacity: number }[] = [
    { cx: "10%",  cy: "15%", color: "#D4708A", opacity: 0.32 },
    { cx: "70%",  cy: "25%", color: "#E8A0C0", opacity: 0.28 },
    { cx: "30%",  cy: "60%", color: "#D4708A", opacity: 0.38 },
    { cx: "80%",  cy: "70%", color: "#E8A0C0", opacity: 0.25 },
    { cx: "50%",  cy: "40%", color: "#D4708A", opacity: 0.30 },
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
      {clusters.map((c, i) => (
        <svg
          key={i}
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            left: c.cx,
            top: c.cy,
            opacity: c.opacity,
            transform: `translate(-50%, -50%) rotate(${i * 18}deg)`,
          }}
        >
          {/* 5 petals arranged in flower shape */}
          <circle cx="30" cy="19" r="9"  fill={c.color} />
          <circle cx="43" cy="26" r="8"  fill={c.color} />
          <circle cx="38" cy="41" r="8"  fill={c.color} />
          <circle cx="22" cy="41" r="8"  fill={c.color} />
          <circle cx="17" cy="26" r="8"  fill={c.color} />
          {/* center */}
          <circle cx="30" cy="30" r="6"  fill={c.color} />
          {/* small accent circles */}
          <circle cx="30" cy="10" r="4"  fill={c.color} />
          <circle cx="49" cy="22" r="3.5" fill={c.color} />
        </svg>
      ))}
    </div>
  );
}

/* ─── Layer 3: small petal dots (speed 0.38) ─── */
function PetalDotsLayer() {
  const ref = useScrollParallax(0.38);

  const dots: { x: string; y: string; size: number; rot: number; opacity: number }[] = [
    { x: "8%",   y: "12%", size: 8,  rot: 20,  opacity: 0.40 },
    { x: "22%",  y: "5%",  size: 10, rot: 55,  opacity: 0.35 },
    { x: "45%",  y: "8%",  size: 7,  rot: -30, opacity: 0.45 },
    { x: "65%",  y: "18%", size: 9,  rot: 70,  opacity: 0.38 },
    { x: "85%",  y: "10%", size: 8,  rot: -15, opacity: 0.32 },
    { x: "15%",  y: "35%", size: 10, rot: 40,  opacity: 0.42 },
    { x: "55%",  y: "30%", size: 7,  rot: -60, opacity: 0.36 },
    { x: "90%",  y: "42%", size: 9,  rot: 25,  opacity: 0.40 },
    { x: "35%",  y: "55%", size: 8,  rot: -45, opacity: 0.35 },
    { x: "72%",  y: "58%", size: 10, rot: 80,  opacity: 0.30 },
    { x: "5%",   y: "72%", size: 7,  rot: -20, opacity: 0.44 },
    { x: "48%",  y: "78%", size: 9,  rot: 35,  opacity: 0.38 },
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
      {dots.map((d, i) => {
        const h = d.size;
        const w = d.size * 0.55;
        // 4-pointed star: two overlapping rotated ellipses
        return (
          <svg
            key={i}
            width={h * 2}
            height={h * 2}
            viewBox={`0 0 ${h * 2} ${h * 2}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              left: d.x,
              top: d.y,
              opacity: d.opacity,
              transform: `translate(-50%, -50%) rotate(${d.rot}deg)`,
            }}
          >
            <ellipse cx={h} cy={h} rx={w} ry={h} fill="#C86080" />
            <ellipse cx={h} cy={h} rx={h} ry={w} fill="#C86080" />
          </svg>
        );
      })}
    </div>
  );
}

/* ─── Main export ─── */
export default function ParallaxBg() {
  return (
    <>
      <BranchLayer />
      <BlossomClusterLayer />
      <PetalDotsLayer />
    </>
  );
}
