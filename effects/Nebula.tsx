"use client";

import { useMemo } from "react";

export interface NebulaConfig {
  starCount?: number;
  showNebula?: boolean;
}

function generateStars(count: number) {
  const stars = [];
  let seed = 42;
  const rng = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < count; i++) {
    stars.push({
      top: rng() * 100,
      left: rng() * 100,
      size: rng() > 0.85 ? 3 : rng() > 0.6 ? 2 : 1,
      delay: rng() * 6,
      duration: 2 + rng() * 5,
    });
  }
  return stars;
}

export default function Nebula({
  starCount = 50,
  showNebula = true,
}: NebulaConfig) {
  const stars = useMemo(() => generateStars(starCount), [starCount]);

  return (
    <>
      <style>{`
        @keyframes fx-galaxy-twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          30%, 70% { opacity: 0.9; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>
      {showNebula && (
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `
            radial-gradient(ellipse at 20% 40%, rgba(80,40,120,0.25) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(40,20,80,0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 60% 80%, rgba(100,30,80,0.15) 0%, transparent 55%),
            radial-gradient(ellipse at 30% 70%, rgba(50,10,100,0.18) 0%, transparent 45%)
          `,
        }} />
      )}
      {stars.map((star, i) => (
        <div key={i} style={{
          position: "absolute",
          top: `${star.top}%`, left: `${star.left}%`,
          width: star.size, height: star.size,
          borderRadius: "50%", background: "white", opacity: 0,
          animation: `fx-galaxy-twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
        }} />
      ))}
    </>
  );
}
