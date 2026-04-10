"use client";

export interface DriftParticlesConfig {
  count?: number;
  color?: string;
}

export default function DriftParticles({
  count = 4,
  color = "rgba(74,158,232,0.9)",
}: DriftParticlesConfig) {
  return (
    <>
      <style>{`
        @keyframes fx-drift {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-120px) translateX(20px); opacity: 0; }
        }
      `}</style>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={`drift-${i}`}
          style={{
            position: "absolute",
            bottom: `${10 + i * 10}%`,
            left: `${10 + i * 11}%`,
            width: "2px",
            height: "2px",
            borderRadius: "50%",
            background: color,
            animation: `fx-drift ${8 + i * 2}s ease-in-out ${i * 1.5}s infinite`,
            boxShadow: `0 0 6px ${color}`,
          }}
        />
      ))}
    </>
  );
}
