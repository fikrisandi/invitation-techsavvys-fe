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

/* Layer 1 – Deep background star clusters (speed: 0.03) */
function StarClusters() {
  const ref = useScrollParallax(0.03);
  const clusters = [
    { x: "5%",  y: "10%", color1: "#8B5CF6", color2: "#F0C060" },
    { x: "85%", y: "20%", color1: "#E879A0", color2: "#8B5CF6" },
    { x: "30%", y: "75%", color1: "#F0C060", color2: "#E879A0" },
    { x: "70%", y: "60%", color1: "#8B5CF6", color2: "#E879A0" },
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
        <div
          key={i}
          style={{
            position: "absolute",
            left: c.x,
            top: c.y,
            width: 130,
            height: 130,
            transform: "translate(-50%, -50%)",
          }}
        >
          <svg width="130" height="130" viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg">
            {/* Central bright circle */}
            <circle cx="65" cy="65" r="3.5" fill={c.color1} opacity="0.35" />
            {/* Medium ring dots (2-3px) */}
            <circle cx="65" cy="48" r="2.5" fill={c.color1} opacity="0.28" />
            <circle cx="79" cy="53" r="2"   fill={c.color2} opacity="0.25" />
            <circle cx="83" cy="68" r="2.5" fill={c.color1} opacity="0.28" />
            <circle cx="77" cy="80" r="2"   fill={c.color2} opacity="0.22" />
            <circle cx="65" cy="84" r="2.5" fill={c.color1} opacity="0.26" />
            <circle cx="52" cy="79" r="2"   fill={c.color2} opacity="0.25" />
            <circle cx="46" cy="67" r="2.5" fill={c.color1} opacity="0.28" />
            <circle cx="51" cy="54" r="2"   fill={c.color2} opacity="0.23" />
            {/* Outer tiny dots (1-2px) */}
            <circle cx="65" cy="36" r="1.5" fill={c.color2} opacity="0.22" />
            <circle cx="77" cy="39" r="1"   fill={c.color1} opacity="0.20" />
            <circle cx="89" cy="46" r="1.5" fill={c.color2} opacity="0.20" />
            <circle cx="95" cy="58" r="1"   fill={c.color1} opacity="0.22" />
            <circle cx="94" cy="72" r="1.5" fill={c.color2} opacity="0.20" />
            <circle cx="88" cy="84" r="1"   fill={c.color1} opacity="0.22" />
            <circle cx="78" cy="91" r="1.5" fill={c.color2} opacity="0.20" />
            <circle cx="65" cy="94" r="1"   fill={c.color1} opacity="0.20" />
            <circle cx="51" cy="91" r="1.5" fill={c.color2} opacity="0.22" />
            <circle cx="41" cy="84" r="1"   fill={c.color1} opacity="0.20" />
            <circle cx="35" cy="72" r="1.5" fill={c.color2} opacity="0.20" />
            <circle cx="35" cy="58" r="1"   fill={c.color1} opacity="0.22" />
            <circle cx="40" cy="46" r="1.5" fill={c.color2} opacity="0.20" />
            <circle cx="52" cy="39" r="1"   fill={c.color1} opacity="0.20" />
            {/* Accent scatter dots */}
            <circle cx="58" cy="42" r="1"   fill="#F0C060" opacity="0.30" />
            <circle cx="73" cy="45" r="1"   fill="#F0C060" opacity="0.25" />
            <circle cx="88" cy="63" r="1"   fill="#F0C060" opacity="0.28" />
            <circle cx="71" cy="87" r="1"   fill="#F0C060" opacity="0.25" />
            <circle cx="44" cy="62" r="1"   fill="#F0C060" opacity="0.28" />
          </svg>
        </div>
      ))}
    </div>
  );
}

/* Layer 2 – Constellation line patterns (speed: 0.12) */
function Constellations() {
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
      {/* Constellation A — top-left */}
      <svg
        style={{ position: "absolute", top: "8%", left: "4%" }}
        width="160" height="140"
        viewBox="0 0 160 140"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="rgba(139,92,246,0.4)" strokeWidth="0.5" fill="none">
          <line x1="20" y1="80"  x2="50"  y2="50"  />
          <line x1="50" y1="50"  x2="90"  y2="60"  />
          <line x1="90" y1="60"  x2="120" y2="30"  />
          <line x1="90" y1="60"  x2="130" y2="80"  />
          <line x1="50" y1="50"  x2="40"  y2="20"  />
          <line x1="20" y1="80"  x2="10"  y2="110" />
          <line x1="20" y1="80"  x2="50"  y2="100" />
          <line x1="50" y1="100" x2="80"  y2="120" />
        </g>
        <g fill="rgba(255,255,255,0.7)">
          <circle cx="20"  cy="80"  r="2.5" />
          <circle cx="50"  cy="50"  r="3"   />
          <circle cx="90"  cy="60"  r="2.5" />
          <circle cx="120" cy="30"  r="2"   />
          <circle cx="130" cy="80"  r="2"   />
          <circle cx="40"  cy="20"  r="2"   />
          <circle cx="10"  cy="110" r="2"   />
          <circle cx="50"  cy="100" r="2.5" />
          <circle cx="80"  cy="120" r="2"   />
        </g>
      </svg>

      {/* Constellation B — right-center */}
      <svg
        style={{ position: "absolute", top: "38%", right: "5%" }}
        width="150" height="160"
        viewBox="0 0 150 160"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="rgba(139,92,246,0.4)" strokeWidth="0.5" fill="none">
          <line x1="75"  y1="20"  x2="110" y2="55"  />
          <line x1="110" y1="55"  x2="130" y2="90"  />
          <line x1="110" y1="55"  x2="90"  y2="90"  />
          <line x1="90"  y1="90"  x2="50"  y2="80"  />
          <line x1="50"  y1="80"  x2="20"  y2="100" />
          <line x1="50"  y1="80"  x2="60"  y2="130" />
          <line x1="75"  y1="20"  x2="45"  y2="40"  />
          <line x1="45"  y1="40"  x2="20"  y2="55"  />
        </g>
        <g fill="rgba(255,255,255,0.7)">
          <circle cx="75"  cy="20"  r="2.5" />
          <circle cx="110" cy="55"  r="3"   />
          <circle cx="130" cy="90"  r="2"   />
          <circle cx="90"  cy="90"  r="2.5" />
          <circle cx="50"  cy="80"  r="3"   />
          <circle cx="20"  cy="100" r="2"   />
          <circle cx="60"  cy="130" r="2"   />
          <circle cx="45"  cy="40"  r="2.5" />
          <circle cx="20"  cy="55"  r="2"   />
        </g>
      </svg>

      {/* Constellation C — bottom-left */}
      <svg
        style={{ position: "absolute", bottom: "10%", left: "8%" }}
        width="155" height="145"
        viewBox="0 0 155 145"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="rgba(139,92,246,0.4)" strokeWidth="0.5" fill="none">
          <line x1="30"  y1="30"  x2="70"  y2="50"  />
          <line x1="70"  y1="50"  x2="120" y2="40"  />
          <line x1="120" y1="40"  x2="140" y2="70"  />
          <line x1="70"  y1="50"  x2="60"  y2="90"  />
          <line x1="60"  y1="90"  x2="90"  y2="115" />
          <line x1="60"  y1="90"  x2="30"  y2="110" />
          <line x1="30"  y1="30"  x2="10"  y2="60"  />
          <line x1="10"  y1="60"  x2="30"  y2="110" />
          <line x1="120" y1="40"  x2="130" y2="15"  />
        </g>
        <g fill="rgba(255,255,255,0.7)">
          <circle cx="30"  cy="30"  r="2.5" />
          <circle cx="70"  cy="50"  r="3"   />
          <circle cx="120" cy="40"  r="2.5" />
          <circle cx="140" cy="70"  r="2"   />
          <circle cx="60"  cy="90"  r="3"   />
          <circle cx="90"  cy="115" r="2"   />
          <circle cx="30"  cy="110" r="2.5" />
          <circle cx="10"  cy="60"  r="2"   />
          <circle cx="130" cy="15"  r="2"   />
        </g>
      </svg>
    </div>
  );
}

/* Layer 3 – Cosmic dust / nebula wisps (speed: 0.22) */
function CosmicDust() {
  const ref = useScrollParallax(0.22);
  const wisps = [
    { left: "15%", top: "30%", color: "rgba(139,92,246,0.15)", rot: 20  },
    { left: "60%", top: "15%", color: "rgba(232,121,160,0.12)", rot: -15 },
    { left: "80%", top: "45%", color: "rgba(139,92,246,0.15)", rot: 35  },
    { left: "25%", top: "65%", color: "rgba(232,121,160,0.12)", rot: -25 },
    { left: "45%", top: "80%", color: "rgba(139,92,246,0.15)", rot: 10  },
    { left: "70%", top: "75%", color: "rgba(232,121,160,0.12)", rot: -40 },
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
      {wisps.map((w, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: w.left,
            top: w.top,
            transform: `translate(-50%, -50%) rotate(${w.rot}deg)`,
            filter: "blur(8px)",
          }}
        >
          <svg width="80" height="30" viewBox="0 0 80 30" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="40" cy="15" rx="40" ry="14" fill={w.color} />
          </svg>
        </div>
      ))}
    </div>
  );
}

export default function ParallaxBg() {
  return (
    <>
      <StarClusters />
      <Constellations />
      <CosmicDust />
    </>
  );
}
