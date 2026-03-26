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

/* ─── Layer 1 ─── Large detailed mega mendung cloud formation (speed 0.04) */
function Layer1() {
  const ref = useScrollParallax(0.04);

  /*
    Mega mendung = stacked concentric arcs forming a cloud dome shape.
    Each cloud group has 6 concentric arcs growing outward from center.
    Three cloud groups spread across full width.
  */
  function cloudGroup(ox: number, oy: number, scale: number) {
    /* Arc radii — innermost to outermost */
    const arcs = [18, 28, 38, 50, 62, 75].map((r, i) => {
      const x1 = ox - r * scale;
      const x2 = ox + r * scale;
      const y  = oy;
      const ry = r * 0.55 * scale;
      return (
        <path
          key={i}
          d={`M ${x1} ${y} A ${r * scale} ${ry} 0 0 1 ${x2} ${y}`}
          fill="none"
          stroke="#C89020"
          strokeWidth={1.2 - i * 0.12}
        />
      );
    });
    return <g>{arcs}</g>;
  }

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
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "120px",
          opacity: 0.07,
        }}
      >
        {/* Cloud group 1 — left third */}
        {cloudGroup(200, 100, 1.1)}
        {/* Cloud group 1b — offset sub-cloud */}
        {cloudGroup(320, 108, 0.75)}
        {/* Cloud group 2 — center */}
        {cloudGroup(600, 95, 1.25)}
        {/* Cloud group 2b */}
        {cloudGroup(730, 105, 0.85)}
        {/* Cloud group 3 — right third */}
        {cloudGroup(1000, 100, 1.15)}
        {/* Cloud group 3b */}
        {cloudGroup(870, 110, 0.7)}
        {/* Baseline ground line */}
        <line x1="0" y1="115" x2="1200" y2="115" stroke="#C89020" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

/* ─── Layer 2 ─── Kujang silhouette ornaments (speed 0.14) */
function Layer2() {
  const ref = useScrollParallax(0.14);

  /*
    Kujang: iconic Sundanese weapon — curved blade, wider at the top/spine,
    tapers to a pointed tip, with a distinctive hole cutout near the spine
    and an ornate handle at the base.

    Blade path (viewBox 50×80):
    - Spine runs top-left to bottom-right in a gentle curve
    - Cutting edge sweeps a wider arc, narrowing to the tip
    - A small oval hole near the spine
  */
  function KujangShape({ color }: { color: string }) {
    return (
      <svg viewBox="0 0 50 80" width="50" height="80" style={{ display: "block" }}>
        {/* Blade body */}
        <path
          d={
            "M 10,5 " +
            "C 22,2 42,10 46,24 " +   /* spine curves right and down */
            "C 48,34 44,46 38,55 " +   /* spine continues curving to tip */
            "C 32,65 22,72 18,76 " +   /* near tip */
            "L 14,78 " +               /* tip */
            "C 8,70 6,58 8,46 " +      /* cutting edge sweeps back */
            "C 9,34 8,18 10,5 Z"       /* back to top */
          }
          fill={color}
        />
        {/* Characteristic hole near spine */}
        <ellipse cx="30" cy="30" rx="4" ry="6" fill="#0A0500" />
        {/* Handle crossguard */}
        <rect x="5" y="70" width="18" height="4" rx="2" fill={color} />
        {/* Handle grip */}
        <rect x="8" y="74" width="12" height="5" rx="2" fill={color} opacity="0.7" />
        {/* Decorative notch on blade */}
        <path d="M 14,20 C 16,18 20,19 20,22 C 20,24 17,24 15,23 Z" fill="#0A0500" />
      </svg>
    );
  }

  const placements = [
    { left: "2%",  top: "5%",  color: "#C89020", opacity: 0.12, rotate: -15 },
    { left: "88%", top: "8%",  color: "#C89020", opacity: 0.12, rotate: 15  },
    { left: "4%",  top: "70%", color: "#C89020", opacity: 0.1,  rotate: -20 },
    { left: "86%", top: "65%", color: "#C89020", opacity: 0.11, rotate: 20  },
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
      {placements.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            opacity: p.opacity,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          <KujangShape color={p.color} />
        </div>
      ))}
    </div>
  );
}

/* ─── Layer 3 ─── Siger crown / parang motif elements (speed 0.26) */
function Layer3() {
  const ref = useScrollParallax(0.26);

  /*
    Siger crown: Sundanese bridal crown silhouette.
    Curved base arc, with multiple pointed arched peaks rising from it.
    ViewBox 80×50: base arc at bottom, 5 pointed arches above.
  */
  function SigerShape({ color }: { color: string }) {
    return (
      <svg viewBox="0 0 80 50" width="80" height="50" style={{ display: "block" }}>
        {/* Base curved band */}
        <path
          d="M 4,42 Q 40,48 76,42 L 76,46 Q 40,52 4,46 Z"
          fill={color}
        />
        {/* 5 pointed arches — center tallest, flanking shorter */}
        {/* Arch 1 (leftmost, shortest) */}
        <path
          d="M 6,42 L 6,30 Q 12,18 18,30 L 18,42 Z"
          fill={color}
        />
        {/* Arch 2 */}
        <path
          d="M 20,42 L 20,26 Q 27,12 34,26 L 34,42 Z"
          fill={color}
        />
        {/* Arch 3 (center, tallest) */}
        <path
          d="M 36,42 L 36,20 Q 40,4 44,20 L 44,42 Z"
          fill={color}
        />
        {/* Arch 4 */}
        <path
          d="M 46,42 L 46,26 Q 53,12 60,26 L 60,42 Z"
          fill={color}
        />
        {/* Arch 5 (rightmost, shortest) */}
        <path
          d="M 62,42 L 62,30 Q 68,18 74,30 L 74,42 Z"
          fill={color}
        />
        {/* Small jewel dots on arch tips */}
        <circle cx="12"  cy="20" r="2.5" fill={color} opacity="0.6" />
        <circle cx="27"  cy="14" r="2.5" fill={color} opacity="0.6" />
        <circle cx="40"  cy="6"  r="3"   fill={color} opacity="0.6" />
        <circle cx="53"  cy="14" r="2.5" fill={color} opacity="0.6" />
        <circle cx="68"  cy="20" r="2.5" fill={color} opacity="0.6" />
      </svg>
    );
  }

  /*
    Parang motif: diagonal parallelogram wave — diagonal blade/wave shape
    with internal parallel line details.
  */
  function ParangShape({ color }: { color: string }) {
    return (
      <svg viewBox="0 0 60 40" width="60" height="40" style={{ display: "block" }}>
        {/* Outer parallelogram wave */}
        <path
          d="M 8,38 L 0,20 C 5,10 20,2 35,8 L 58,2 L 52,20 C 47,30 32,38 18,34 Z"
          fill={color}
        />
        {/* Internal parallel wave lines */}
        <path d="M 10,32 C 20,28 34,22 48,10" fill="none" stroke="#0A0500" strokeWidth="1.2" />
        <path d="M 6,26 C 16,22 30,16 44,6"  fill="none" stroke="#0A0500" strokeWidth="1"   />
        {/* Tip accent */}
        <circle cx="54" cy="4" r="2.5" fill="#0A0500" />
      </svg>
    );
  }

  const sigers = [
    { left: "8%",  top: "18%", color: "#C89020", opacity: 0.18 },
    { left: "70%", top: "12%", color: "#B05020", opacity: 0.18 },
    { left: "30%", top: "72%", color: "#C89020", opacity: 0.16 },
    { left: "60%", top: "80%", color: "#B05020", opacity: 0.18 },
  ];

  const parangs = [
    { left: "50%", top: "25%", color: "#C89020", opacity: 0.18, rotate: 0   },
    { left: "15%", top: "45%", color: "#B05020", opacity: 0.18, rotate: 30  },
    { left: "80%", top: "40%", color: "#C89020", opacity: 0.16, rotate: -20 },
    { left: "42%", top: "55%", color: "#B05020", opacity: 0.18, rotate: 15  },
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
      {sigers.map((s, i) => (
        <div
          key={`siger-${i}`}
          style={{
            position: "absolute",
            left: s.left,
            top: s.top,
            opacity: s.opacity,
          }}
        >
          <SigerShape color={s.color} />
        </div>
      ))}
      {parangs.map((p, i) => (
        <div
          key={`parang-${i}`}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            opacity: p.opacity,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          <ParangShape color={p.color} />
        </div>
      ))}
    </div>
  );
}

export default function ParallaxBg() {
  return (
    <>
      <Layer1 />
      <Layer2 />
      <Layer3 />
    </>
  );
}
