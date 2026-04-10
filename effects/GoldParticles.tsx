"use client";

export interface GoldParticlesConfig {
  count?: number;
  color?: string;
  accentColor?: string;
}

export default function GoldParticles({
  count = 15,
  color = "rgba(212,175,55,0.9)",
  accentColor = "rgba(255,215,100,0.8)",
}: GoldParticlesConfig) {
  return (
    <>
      <style>{`
        @keyframes fx-glow-dot {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 0.7; transform: scale(1); }
        }
        @keyframes fx-drift-up {
          0% { transform: translateY(0); opacity: 0; }
          15% { opacity: 0.6; }
          85% { opacity: 0.3; }
          100% { transform: translateY(-200px); opacity: 0; }
        }
      `}</style>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} style={{
          position: "absolute",
          top: `${(i * 7 + 3) % 90}%`,
          left: `${(i * 11 + 5) % 95}%`,
          width: `${3 + (i % 3)}px`,
          height: `${3 + (i % 3)}px`,
          borderRadius: "50%",
          background: i % 3 === 0 ? accentColor : color,
          opacity: 0,
          animation: `fx-glow-dot ${3 + (i % 4) * 0.8}s ease-in-out infinite`,
          animationDelay: `${i * 0.4}s`,
        }} />
      ))}
      {Array.from({ length: Math.floor(count / 3) }, (_, i) => (
        <div key={`rise-${i}`} style={{
          position: "absolute",
          bottom: "10%",
          left: `${15 + i * 18}%`,
          width: "2px",
          height: "2px",
          borderRadius: "50%",
          background: color,
          animation: `fx-drift-up ${5 + i * 1.5}s ease-out infinite`,
          animationDelay: `${i * 2}s`,
        }} />
      ))}
    </>
  );
}
