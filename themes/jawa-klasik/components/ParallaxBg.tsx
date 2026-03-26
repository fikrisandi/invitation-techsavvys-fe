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

/* ─── Layer 1 ─── Large gunungan wayang silhouettes (speed 0.05) */
function Layer1() {
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
      {/* Gunungan left-center top */}
      <svg
        viewBox="0 0 120 200"
        width={120}
        height={200}
        style={{
          position: "absolute",
          top: "-10px",
          left: "50%",
          transform: "translateX(-50%)",
          fill: "#D4A020",
          opacity: 0.06,
        }}
      >
        {/*
          Gunungan: pointed arch shape — narrow tip at top, broadens toward
          a flat base. Internal symmetrical decorative motifs.
        */}
        {/* Outer silhouette */}
        <path d="M60,2 C60,2 10,70 8,130 C8,160 20,185 60,195 C100,185 112,160 112,130 C110,70 60,2 60,2 Z" />
        {/* Internal diamond motif row 1 */}
        <polygon points="60,30 66,40 60,50 54,40" fill="#0E0600" />
        {/* Flame/lotus petal ring around diamond */}
        <ellipse cx="60" cy="40" rx="3" ry="6" fill="#0E0600" transform="rotate(0,60,40)" />
        <ellipse cx="60" cy="40" rx="3" ry="6" fill="#0E0600" transform="rotate(45,60,40)" />
        <ellipse cx="60" cy="40" rx="3" ry="6" fill="#0E0600" transform="rotate(90,60,40)" />
        <ellipse cx="60" cy="40" rx="3" ry="6" fill="#0E0600" transform="rotate(135,60,40)" />
        {/* Internal triangle row 2 */}
        <polygon points="60,62 50,80 70,80" fill="#0E0600" />
        <polygon points="60,62 50,80 60,75" fill="#D4A020" />
        {/* Small circles — lotus seed pattern */}
        <circle cx="45" cy="100" r="5" fill="#0E0600" />
        <circle cx="60" cy="95" r="5" fill="#0E0600" />
        <circle cx="75" cy="100" r="5" fill="#0E0600" />
        <circle cx="38" cy="115" r="4" fill="#0E0600" />
        <circle cx="60" cy="112" r="5" fill="#0E0600" />
        <circle cx="82" cy="115" r="4" fill="#0E0600" />
        {/* Diamond grid pattern lower */}
        <polygon points="60,130 50,145 60,160 70,145" fill="#0E0600" />
        <polygon points="40,140 30,155 40,165 50,155" fill="#0E0600" />
        <polygon points="80,140 70,155 80,165 90,155" fill="#0E0600" />
        {/* Base flat band */}
        <rect x="20" y="182" width="80" height="8" fill="#0E0600" rx="2" />
      </svg>

      {/* Gunungan bottom-right */}
      <svg
        viewBox="0 0 120 200"
        width={100}
        height={165}
        style={{
          position: "absolute",
          bottom: "-20px",
          right: "2%",
          fill: "#D4A020",
          opacity: 0.06,
          transform: "rotate(180deg)",
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
        <circle cx="38" cy="115" r="4" fill="#0E0600" />
        <circle cx="60" cy="112" r="5" fill="#0E0600" />
        <circle cx="82" cy="115" r="4" fill="#0E0600" />
        <polygon points="60,130 50,145 60,160 70,145" fill="#0E0600" />
        <polygon points="40,140 30,155 40,165 50,155" fill="#0E0600" />
        <polygon points="80,140 70,155 80,165 90,155" fill="#0E0600" />
        <rect x="20" y="182" width="80" height="8" fill="#0E0600" rx="2" />
      </svg>
    </div>
  );
}

/* ─── Layer 2 ─── Batik kawung/diamond decorative strips (speed 0.15) */
function Layer2() {
  const ref = useScrollParallax(0.15);

  /*
    Kawung motif unit: 4 oval petals arranged in a + cross, repeating.
    ViewBox 40×40, tiled via repeated <use> across strip width.
  */
  const kawungUnit = (
    <g id="kawung-unit">
      {/* Center cross of 4 overlapping ovals */}
      <ellipse cx="20" cy="12" rx="6" ry="9" fill="none" stroke="#D4A020" strokeWidth="1" />
      <ellipse cx="20" cy="28" rx="6" ry="9" fill="none" stroke="#D4A020" strokeWidth="1" />
      <ellipse cx="12" cy="20" rx="9" ry="6" fill="none" stroke="#D4A020" strokeWidth="1" />
      <ellipse cx="28" cy="20" rx="9" ry="6" fill="none" stroke="#D4A020" strokeWidth="1" />
      {/* Center dot */}
      <circle cx="20" cy="20" r="2" fill="#D4A020" />
    </g>
  );

  const stripPositions = ["0%", "42%", "85%"];
  const stripOpacities = [0.09, 0.08, 0.1];

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
      {stripPositions.map((top, si) => (
        <svg
          key={si}
          viewBox="0 0 800 60"
          preserveAspectRatio="xMidYMid slice"
          style={{
            position: "absolute",
            top,
            left: 0,
            width: "100%",
            height: "60px",
            opacity: stripOpacities[si],
          }}
        >
          <defs>
            <g id={`kawung-${si}`}>
              {/* 4 oval petals + center */}
              <ellipse cx="20" cy="12" rx="6" ry="9" fill="none" stroke="#D4A020" strokeWidth="1" />
              <ellipse cx="20" cy="28" rx="6" ry="9" fill="none" stroke="#D4A020" strokeWidth="1" />
              <ellipse cx="12" cy="20" rx="9" ry="6" fill="none" stroke="#D4A020" strokeWidth="1" />
              <ellipse cx="28" cy="20" rx="9" ry="6" fill="none" stroke="#D4A020" strokeWidth="1" />
              <circle cx="20" cy="20" r="2" fill="#D4A020" />
            </g>
          </defs>
          {/* Top & bottom border lines */}
          <line x1="0" y1="2" x2="800" y2="2" stroke="#D4A020" strokeWidth="0.5" opacity="0.5" />
          <line x1="0" y1="58" x2="800" y2="58" stroke="#D4A020" strokeWidth="0.5" opacity="0.5" />
          {/* Repeating kawung units across the strip */}
          {Array.from({ length: 21 }).map((_, i) => (
            <use key={i} href={`#kawung-${si}`} transform={`translate(${i * 40 - 5}, 10)`} />
          ))}
        </svg>
      ))}
    </div>
  );
}

/* ─── Layer 3 ─── Floating batik medallion ornaments (speed 0.28) */
function Layer3() {
  const ref = useScrollParallax(0.28);

  const medallions = [
    { left: "10%", top: "20%", color: "#D4A020", opacity: 0.2,  size: 52 },
    { left: "80%", top: "15%", color: "#8B1515", opacity: 0.22, size: 44 },
    { left: "20%", top: "55%", color: "#D4A020", opacity: 0.18, size: 48 },
    { left: "75%", top: "60%", color: "#8B1515", opacity: 0.2,  size: 50 },
    { left: "45%", top: "80%", color: "#D4A020", opacity: 0.15, size: 42 },
    { left:  "5%", top: "75%", color: "#8B1515", opacity: 0.18, size: 46 },
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
      {medallions.map((m, i) => {
        const r = m.size / 2;
        const cx = r;
        const cy = r;
        /* 8-pointed star: alternate between 2 radii */
        const outerR = r * 0.88;
        const innerR = r * 0.52;
        const ringR  = r * 0.38;
        const petalR = r * 0.22;
        const points8 = Array.from({ length: 16 }).map((_, k) => {
          const angle = (k * Math.PI) / 8 - Math.PI / 2;
          const rad = k % 2 === 0 ? outerR : innerR;
          return `${cx + rad * Math.cos(angle)},${cy + rad * Math.sin(angle)}`;
        }).join(" ");
        /* 8 small circles around the ring */
        const ringDots = Array.from({ length: 8 }).map((_, k) => {
          const angle = (k * Math.PI) / 4 - Math.PI / 2;
          return { x: cx + ringR * Math.cos(angle), y: cy + ringR * Math.sin(angle) };
        });
        /* 8 petal ellipses */
        const petals = Array.from({ length: 8 }).map((_, k) => {
          const angleDeg = k * 45;
          return angleDeg;
        });

        return (
          <svg
            key={i}
            viewBox={`0 0 ${m.size} ${m.size}`}
            width={m.size}
            height={m.size}
            style={{
              position: "absolute",
              left: m.left,
              top: m.top,
              fill: m.color,
              opacity: m.opacity,
            }}
          >
            {/* Outer circle border */}
            <circle cx={cx} cy={cy} r={r - 1} fill="none" stroke={m.color} strokeWidth="0.8" />
            {/* 8-pointed star body */}
            <polygon points={points8} />
            {/* 8 small ring dots */}
            {ringDots.map((d, di) => (
              <circle key={di} cx={d.x} cy={d.y} r={petalR * 0.45} />
            ))}
            {/* Center circle */}
            <circle cx={cx} cy={cy} r={r * 0.16} fill={m.color} />
            {/* Inner ring */}
            <circle cx={cx} cy={cy} r={r * 0.28} fill="none" stroke={m.color} strokeWidth="0.6" />
          </svg>
        );
      })}
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
