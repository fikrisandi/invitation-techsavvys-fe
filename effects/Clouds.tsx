"use client";

export interface CloudsConfig {
  count?: number;
  color?: string;
  glowColor1?: string;
  glowColor2?: string;
  particleCount?: number;
}

const CLOUD_PATH = "M0,40 C10,20 20,5 35,10 C40,0 55,0 60,10 C75,5 85,20 90,35 C95,25 108,22 115,32 C120,22 135,18 145,28 C155,15 170,15 178,28 C185,18 200,20 200,40 Z";

const DEFAULT_CLOUDS = [
  { top: "8%",  opacity: 0.15, scale: 1.4,  dur: 14, delay: 0 },
  { top: "22%", opacity: 0.10, scale: 1.8,  dur: 18, delay: 3 },
  { top: "45%", opacity: 0.08, scale: 2.2,  dur: 22, delay: 6 },
  { top: "65%", opacity: 0.12, scale: 1.6,  dur: 16, delay: 9 },
  { top: "82%", opacity: 0.09, scale: 2.0,  dur: 20, delay: 12 },
];

const DEFAULT_PARTICLES = [
  { left: "5%",  dur: 20, delay: 0,  sz: 4 },
  { left: "20%", dur: 18, delay: 5,  sz: 3 },
  { left: "35%", dur: 23, delay: 2,  sz: 2 },
  { left: "50%", dur: 17, delay: 9,  sz: 4 },
  { left: "65%", dur: 21, delay: 4,  sz: 3 },
  { left: "80%", dur: 25, delay: 7,  sz: 2 },
  { left: "92%", dur: 19, delay: 12, sz: 3 },
];

export default function Clouds({
  count = 5,
  color = "#C89020",
  glowColor1 = "rgba(200,144,32,0.07)",
  glowColor2 = "rgba(176,80,32,0.06)",
  particleCount = 7,
}: CloudsConfig) {
  const clouds = DEFAULT_CLOUDS.slice(0, count);
  const particles = DEFAULT_PARTICLES.slice(0, particleCount);

  return (
    <>
      <style>{`
        @keyframes fx-cloud-drift {
          0%   { transform: translateX(-20px) scaleX(1); opacity: 0.12; }
          50%  { transform: translateX(20px) scaleX(1.04); opacity: 0.22; }
          100% { transform: translateX(-20px) scaleX(1); opacity: 0.12; }
        }
        @keyframes fx-float-up {
          0%   { opacity: 0; transform: translateY(0) rotate(0deg); }
          10%  { opacity: 0.6; }
          90%  { opacity: 0.4; }
          100% { opacity: 0; transform: translateY(-100vh) rotate(360deg); }
        }
        @keyframes fx-cloud-glow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(1.2); }
        }
      `}</style>

      {/* Cloud layers */}
      {clouds.map((c, i) => (
        <svg key={i} viewBox="0 0 200 60" style={{
          position: "absolute", top: c.top, left: 0, width: `${c.scale * 100}%`,
          height: "80px", fill: color, opacity: c.opacity,
          animation: `fx-cloud-drift ${c.dur}s ease-in-out ${c.delay}s infinite`,
        }}>
          <path d={CLOUD_PATH} />
        </svg>
      ))}

      {/* Glow orbs */}
      <div style={{ position: "absolute", top: "15%", left: "10%", width: 350, height: 350, borderRadius: "50%", background: `radial-gradient(circle, ${glowColor1} 0%, transparent 70%)`, animation: "fx-cloud-glow 10s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "20%", right: "8%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${glowColor2} 0%, transparent 70%)`, animation: "fx-cloud-glow 13s ease-in-out 4s infinite" }} />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute", bottom: "-8px", left: p.left,
          width: p.sz, height: p.sz, borderRadius: "50%",
          background: color,
          boxShadow: `0 0 ${p.sz * 2}px ${color}`,
          animation: `fx-float-up ${p.dur}s ease-in-out ${p.delay}s infinite`,
        }} />
      ))}
    </>
  );
}
