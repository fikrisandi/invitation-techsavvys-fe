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

/* Layer 1 - Deep space nebula background (slowest) */
function NebulaBackground() {
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
      {/* Full background nebula */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.55,
        }}
      >
        <Image
          src="/parallax/galaxy-1.jpg"
          alt="Nebula background"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "saturate(1.3) brightness(0.8)",
          }}
          priority
        />
      </div>
    </div>
  );
}

/* Layer 2 - Galaxy spiral elements */
function GalaxySpiralLayer() {
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
      {/* Top-left galaxy */}
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
          src="/parallax/galaxy-2.jpg"
          alt="Galaxy spiral"
          fill
          style={{
            objectFit: "cover",
            filter: "saturate(1.4) brightness(0.9)",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          }}
        />
      </div>

      {/* Bottom-right galaxy */}
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
          src="/parallax/galaxy-3.jpg"
          alt="Galaxy spiral"
          fill
          style={{
            objectFit: "cover",
            filter: "saturate(1.4) brightness(0.85)",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}

/* Layer 3 - Star clusters */
function StarClusters() {
  const ref = useScrollParallax(0.18);

  const clusters = [
    { x: "5%", y: "10%", color1: "#8B5CF6", color2: "#F0C060" },
    { x: "85%", y: "20%", color1: "#E879A0", color2: "#8B5CF6" },
    { x: "30%", y: "75%", color1: "#F0C060", color2: "#E879A0" },
    { x: "70%", y: "60%", color1: "#8B5CF6", color2: "#E879A0" },
    { x: "50%", y: "40%", color1: "#E879A0", color2: "#F0C060" },
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
          <svg width="130" height="130" viewBox="0 0 130 130">
            <circle cx="65" cy="65" r="3.5" fill={c.color1} opacity="0.35" />
            <circle cx="65" cy="48" r="2.5" fill={c.color1} opacity="0.28" />
            <circle cx="79" cy="53" r="2" fill={c.color2} opacity="0.25" />
            <circle cx="83" cy="68" r="2.5" fill={c.color1} opacity="0.28" />
            <circle cx="77" cy="80" r="2" fill={c.color2} opacity="0.22" />
            <circle cx="65" cy="84" r="2.5" fill={c.color1} opacity="0.26" />
            <circle cx="52" cy="79" r="2" fill={c.color2} opacity="0.25" />
            <circle cx="46" cy="67" r="2.5" fill={c.color1} opacity="0.28" />
            <circle cx="51" cy="54" r="2" fill={c.color2} opacity="0.23" />
            <circle cx="65" cy="36" r="1.5" fill={c.color2} opacity="0.22" />
            <circle cx="89" cy="46" r="1.5" fill={c.color2} opacity="0.20" />
            <circle cx="94" cy="72" r="1.5" fill={c.color2} opacity="0.20" />
            <circle cx="78" cy="91" r="1.5" fill={c.color2} opacity="0.20" />
            <circle cx="51" cy="91" r="1.5" fill={c.color2} opacity="0.22" />
            <circle cx="35" cy="72" r="1.5" fill={c.color2} opacity="0.20" />
            <circle cx="40" cy="46" r="1.5" fill={c.color2} opacity="0.20" />
          </svg>
        </div>
      ))}
    </div>
  );
}

/* Layer 4 - Constellation lines */
function Constellations() {
  const ref = useScrollParallax(0.25);

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
      {/* Constellation A */}
      <svg
        style={{ position: "absolute", top: "8%", left: "4%" }}
        width="160"
        height="140"
        viewBox="0 0 160 140"
      >
        <g stroke="rgba(139,92,246,0.4)" strokeWidth="0.5" fill="none">
          <line x1="20" y1="80" x2="50" y2="50" />
          <line x1="50" y1="50" x2="90" y2="60" />
          <line x1="90" y1="60" x2="120" y2="30" />
          <line x1="90" y1="60" x2="130" y2="80" />
          <line x1="50" y1="50" x2="40" y2="20" />
        </g>
        <g fill="rgba(255,255,255,0.7)">
          <circle cx="20" cy="80" r="2.5" />
          <circle cx="50" cy="50" r="3" />
          <circle cx="90" cy="60" r="2.5" />
          <circle cx="120" cy="30" r="2" />
          <circle cx="130" cy="80" r="2" />
          <circle cx="40" cy="20" r="2" />
        </g>
      </svg>

      {/* Constellation B */}
      <svg
        style={{ position: "absolute", top: "38%", right: "5%" }}
        width="150"
        height="160"
        viewBox="0 0 150 160"
      >
        <g stroke="rgba(139,92,246,0.4)" strokeWidth="0.5" fill="none">
          <line x1="75" y1="20" x2="110" y2="55" />
          <line x1="110" y1="55" x2="130" y2="90" />
          <line x1="110" y1="55" x2="90" y2="90" />
          <line x1="90" y1="90" x2="50" y2="80" />
          <line x1="50" y1="80" x2="20" y2="100" />
        </g>
        <g fill="rgba(255,255,255,0.7)">
          <circle cx="75" cy="20" r="2.5" />
          <circle cx="110" cy="55" r="3" />
          <circle cx="130" cy="90" r="2" />
          <circle cx="90" cy="90" r="2.5" />
          <circle cx="50" cy="80" r="3" />
          <circle cx="20" cy="100" r="2" />
        </g>
      </svg>

      {/* Constellation C */}
      <svg
        style={{ position: "absolute", bottom: "10%", left: "8%" }}
        width="155"
        height="145"
        viewBox="0 0 155 145"
      >
        <g stroke="rgba(139,92,246,0.4)" strokeWidth="0.5" fill="none">
          <line x1="30" y1="30" x2="70" y2="50" />
          <line x1="70" y1="50" x2="120" y2="40" />
          <line x1="70" y1="50" x2="60" y2="90" />
          <line x1="60" y1="90" x2="90" y2="115" />
        </g>
        <g fill="rgba(255,255,255,0.7)">
          <circle cx="30" cy="30" r="2.5" />
          <circle cx="70" cy="50" r="3" />
          <circle cx="120" cy="40" r="2.5" />
          <circle cx="60" cy="90" r="3" />
          <circle cx="90" cy="115" r="2" />
        </g>
      </svg>
    </div>
  );
}

/* Layer 5 - Cosmic dust */
function CosmicDust() {
  const ref = useScrollParallax(0.32);
  const wisps = [
    { left: "15%", top: "30%", color: "rgba(139,92,246,0.15)", rot: 20 },
    { left: "60%", top: "15%", color: "rgba(232,121,160,0.12)", rot: -15 },
    { left: "80%", top: "45%", color: "rgba(139,92,246,0.15)", rot: 35 },
    { left: "25%", top: "65%", color: "rgba(232,121,160,0.12)", rot: -25 },
    { left: "45%", top: "80%", color: "rgba(139,92,246,0.15)", rot: 10 },
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
          <svg width="80" height="30" viewBox="0 0 80 30">
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
      <NebulaBackground />
      <GalaxySpiralLayer />
      <StarClusters />
      <Constellations />
      <CosmicDust />
    </>
  );
}
