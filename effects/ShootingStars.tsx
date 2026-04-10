"use client";

export interface ShootingStarsConfig {
  count?: number;
  color?: string;
}

const DEFAULTS = [
  { top: "12%", left: "60%", delay: "0s", duration: "0.7s", rotate: "25deg", interval: "8s" },
  { top: "35%", left: "20%", delay: "4s", duration: "0.6s", rotate: "20deg", interval: "12s" },
  { top: "65%", left: "75%", delay: "7s", duration: "0.8s", rotate: "30deg", interval: "15s" },
];

export default function ShootingStars({
  count = 3,
  color = "rgba(200,210,230,0.8)",
}: ShootingStarsConfig) {
  const items = DEFAULTS.slice(0, count);
  return (
    <>
      <style>{`
        @keyframes fx-shooting {
          0% { width: 2px; opacity: 0; transform: translateX(0) translateY(0); }
          20% { opacity: 0.7; }
          100% { width: 80px; opacity: 0; transform: translateX(200px) translateY(100px); }
        }
      `}</style>
      {items.map((s, i) => (
        <div
          key={`shoot-${i}`}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            height: "1px",
            background: `linear-gradient(to right, ${color}, transparent)`,
            borderRadius: "1px",
            transform: `rotate(${s.rotate})`,
            animation: `fx-shooting ${s.duration} ease-out ${s.delay} infinite`,
          }}
        />
      ))}
    </>
  );
}
