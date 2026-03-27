"use client";
import { useEffect, useRef } from "react";

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

/* Layer 0 - Fixed deep space background */
function DeepSpaceBg() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 30% 20%, rgba(74,158,232,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(74,158,232,0.06) 0%, transparent 50%), var(--color-navy-dark, #0B1221)",
      }}
    >
      {/* Nebula glow top-right */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "60%",
          height: "50%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(74,158,232,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Nebula glow bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-10%",
          width: "50%",
          height: "40%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(100,130,220,0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
    </div>
  );
}

/* Layer 1 - Slow drifting star clusters */
function StarClusterLayer() {
  const ref = useScrollParallax(0.08);
  const stars = Array.from({ length: 40 }, (_, i) => ({
    top: `${(i * 17 + 7) % 95}%`,
    left: `${(i * 23 + 5) % 93}%`,
    size: 1 + (i % 3),
    opacity: 0.15 + (i % 5) * 0.08,
    color: i % 7 === 0 ? "var(--color-blue-accent)" : "var(--color-silver-light)",
  }));

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        overflow: "hidden",
        willChange: "transform",
      }}
    >
      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: "50%",
            background: s.color,
            opacity: s.opacity,
            boxShadow: s.size > 1 ? `0 0 ${s.size * 3}px ${s.color}` : "none",
          }}
        />
      ))}
    </div>
  );
}

/* Layer 2 - Floating blue orbs */
function FloatingOrbs() {
  const ref = useScrollParallax(0.15);
  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
        overflow: "hidden",
        willChange: "transform",
      }}
    >
      {[
        { top: "15%", left: "8%", size: 80, opacity: 0.06 },
        { top: "55%", right: "5%", size: 120, opacity: 0.04 },
        { top: "75%", left: "20%", size: 60, opacity: 0.05 },
        { top: "35%", right: "25%", size: 90, opacity: 0.03 },
      ].map((orb, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: orb.top,
            left: orb.left,
            right: (orb as any).right,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(74,158,232,${orb.opacity * 8}) 0%, transparent 70%)`,
            filter: "blur(20px)",
          }}
        />
      ))}
    </div>
  );
}

/* Layer 3 - Silver dust particles */
function SilverDust() {
  const ref = useScrollParallax(0.25);
  const particles = Array.from({ length: 20 }, (_, i) => ({
    top: `${(i * 19 + 3) % 90}%`,
    left: `${(i * 29 + 8) % 88}%`,
    size: 1 + (i % 2) * 0.5,
    opacity: 0.1 + (i % 4) * 0.05,
  }));

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 3,
        pointerEvents: "none",
        overflow: "hidden",
        willChange: "transform",
      }}
    >
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: "var(--color-silver-light)",
            opacity: p.opacity,
            boxShadow: `0 0 4px var(--color-silver-light)`,
          }}
        />
      ))}
    </div>
  );
}

export default function ParallaxBg() {
  return (
    <>
      <DeepSpaceBg />
      <StarClusterLayer />
      <FloatingOrbs />
      <SilverDust />
    </>
  );
}
