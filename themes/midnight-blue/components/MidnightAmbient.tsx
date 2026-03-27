"use client";

export default function MidnightAmbient() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes mb-twinkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
        @keyframes mb-drift {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-120px) translateX(20px); opacity: 0; }
        }
        @keyframes mb-glow-pulse {
          0%, 100% { opacity: 0.04; transform: scale(1); }
          50% { opacity: 0.08; transform: scale(1.1); }
        }
        @keyframes mb-shooting {
          0% { width: 2px; opacity: 0; transform: translateX(0) translateY(0); }
          20% { opacity: 0.7; }
          100% { width: 80px; opacity: 0; transform: translateX(200px) translateY(100px); }
        }
      `}</style>

      {/* Twinkling stars */}
      {Array.from({ length: 35 }, (_, i) => (
        <div
          key={`star-${i}`}
          style={{
            position: "absolute",
            top: `${(i * 13 + 5) % 92}%`,
            left: `${(i * 19 + 3) % 90}%`,
            width: `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
            borderRadius: "50%",
            background: i % 6 === 0 ? "var(--color-blue-accent)" : "var(--color-silver-light)",
            animation: `mb-twinkle ${3 + (i % 5)}s ease-in-out ${i * 0.4}s infinite`,
            boxShadow: i % 3 === 0 ? `0 0 6px ${i % 6 === 0 ? "var(--color-blue-accent)" : "var(--color-silver-light)"}` : "none",
          }}
        />
      ))}

      {/* Floating particles drifting upward */}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={`drift-${i}`}
          style={{
            position: "absolute",
            bottom: `${10 + i * 10}%`,
            left: `${10 + i * 11}%`,
            width: "2px",
            height: "2px",
            borderRadius: "50%",
            background: "var(--color-blue-accent)",
            animation: `mb-drift ${8 + i * 2}s ease-in-out ${i * 1.5}s infinite`,
            boxShadow: "0 0 6px var(--color-blue-accent)",
          }}
        />
      ))}

      {/* Pulsing glow orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(74,158,232,0.1) 0%, transparent 70%)",
          animation: "mb-glow-pulse 10s ease-in-out infinite",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "5%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(100,130,220,0.08) 0%, transparent 70%)",
          animation: "mb-glow-pulse 13s ease-in-out 3s infinite",
          filter: "blur(35px)",
        }}
      />

      {/* Shooting stars */}
      {[
        { top: "12%", left: "60%", delay: "0s", duration: "0.7s", rotate: "25deg", interval: "8s" },
        { top: "35%", left: "20%", delay: "4s", duration: "0.6s", rotate: "20deg", interval: "12s" },
        { top: "65%", left: "75%", delay: "7s", duration: "0.8s", rotate: "30deg", interval: "15s" },
      ].map((s, i) => (
        <div
          key={`shoot-${i}`}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            height: "1px",
            background: "linear-gradient(to right, var(--color-silver-light), transparent)",
            borderRadius: "1px",
            transform: `rotate(${s.rotate})`,
            animation: `mb-shooting ${s.duration} ease-out ${s.delay} infinite`,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}
