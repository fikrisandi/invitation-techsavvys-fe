"use client";

export interface GlowOrbsConfig {
  color1?: string;
  color2?: string;
  size1?: number;
  size2?: number;
}

export default function GlowOrbs({
  color1 = "rgba(74,158,232,0.1)",
  color2 = "rgba(100,130,220,0.08)",
  size1 = 300,
  size2 = 250,
}: GlowOrbsConfig) {
  return (
    <>
      <style>{`
        @keyframes fx-glow-pulse {
          0%, 100% { opacity: 0.04; transform: scale(1); }
          50% { opacity: 0.08; transform: scale(1.1); }
        }
      `}</style>
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: size1,
          height: size1,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color1} 0%, transparent 70%)`,
          animation: "fx-glow-pulse 10s ease-in-out infinite",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "5%",
          width: size2,
          height: size2,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color2} 0%, transparent 70%)`,
          animation: "fx-glow-pulse 13s ease-in-out 3s infinite",
          filter: "blur(35px)",
        }}
      />
    </>
  );
}
