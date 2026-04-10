"use client";

export interface SakuraPetalsConfig {
  count?: number;
  color?: string;
  colorLight?: string;
}

const PETAL_KEYFRAMES = `
@keyframes fx-sakura-a {
  0%   { transform: translateY(-20px) translateX(0) rotateX(0) rotateY(0) rotateZ(0) translateZ(0); opacity: 0; }
  10%  { opacity: 0.75; }
  50%  { transform: translateY(50vh) translateX(-12px) rotateX(360deg) rotateY(180deg) rotateZ(60deg) translateZ(70px); }
  100% { transform: translateY(110vh) translateX(-8px) rotateX(720deg) rotateY(360deg) rotateZ(120deg) translateZ(0); opacity: 0; }
}
@keyframes fx-sakura-b {
  0%   { transform: translateY(-20px) translateX(0) rotateX(0) rotateY(0) rotateZ(0) translateZ(0); opacity: 0; }
  10%  { opacity: 0.65; }
  50%  { transform: translateY(50vh) translateX(15px) rotateX(360deg) rotateY(200deg) rotateZ(-50deg) translateZ(80px); }
  100% { transform: translateY(110vh) translateX(10px) rotateX(720deg) rotateY(360deg) rotateZ(-110deg) translateZ(0); opacity: 0; }
}
@keyframes fx-sakura-c {
  0%   { transform: translateY(-20px) translateX(0) rotateX(0) rotateY(0) rotateZ(0) translateZ(0); opacity: 0; }
  10%  { opacity: 0.8; }
  50%  { transform: translateY(50vh) translateX(-18px) rotateX(360deg) rotateY(260deg) rotateZ(85deg) translateZ(65px); }
  100% { transform: translateY(110vh) translateX(-5px) rotateX(720deg) rotateY(360deg) rotateZ(130deg) translateZ(0); opacity: 0; }
}
`;

const ANIM_NAMES = ["fx-sakura-a", "fx-sakura-b", "fx-sakura-c"];
const BORDER_RADII = ["60% 0 60% 0", "50% 40% 50% 40%", "55% 10% 55% 10%"];

export default function SakuraPetals({
  count = 20,
  color = "rgba(212,112,138,0.9)",
  colorLight = "rgba(240,160,180,0.8)",
}: SakuraPetalsConfig) {
  const petals = Array.from({ length: count }, (_, i) => ({
    left: `${(i * 5 + 3) % 95}%`,
    width: 8 + (i % 6),
    height: 10 + (i % 8),
    borderRadius: BORDER_RADII[i % 3],
    opacity: 0.6 + (i % 4) * 0.05,
    duration: 7 + (i % 7),
    delay: (i * 0.6) % 8,
    animation: ANIM_NAMES[i % 3],
  }));

  return (
    <>
      <style>{PETAL_KEYFRAMES}</style>
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1,
        perspective: "1000px", perspectiveOrigin: "50% 0%", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          {petals.map((p, i) => (
            <div key={i} style={{
              position: "absolute", top: "-20px", left: p.left,
              width: p.width, height: p.height, borderRadius: p.borderRadius,
              background: `linear-gradient(135deg, ${color} 0%, ${colorLight} 100%)`,
              opacity: p.opacity, transformStyle: "preserve-3d",
              animation: `${p.animation} ${p.duration}s ease-in-out ${p.delay}s infinite`,
              willChange: "transform, opacity",
              boxShadow: `0 2px 8px rgba(212,112,138,0.3)`,
            }} />
          ))}
        </div>
      </div>
    </>
  );
}
