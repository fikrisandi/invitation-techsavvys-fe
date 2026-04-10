"use client";

export interface StarsConfig {
  count?: number;
  color?: string;
  accentColor?: string;
  minSize?: number;
  maxSize?: number;
}

export default function Stars({
  count = 15,
  color = "rgba(200,210,230,0.8)",
  accentColor = "rgba(74,158,232,0.9)",
  minSize = 1,
  maxSize = 3,
}: StarsConfig) {
  return (
    <>
      <style>{`
        @keyframes fx-twinkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
      `}</style>
      {Array.from({ length: count }, (_, i) => {
        const size = minSize + (i % (maxSize - minSize + 1));
        const isAccent = i % 6 === 0;
        const c = isAccent ? accentColor : color;
        return (
          <div
            key={`star-${i}`}
            style={{
              position: "absolute",
              top: `${(i * 13 + 5) % 92}%`,
              left: `${(i * 19 + 3) % 90}%`,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "50%",
              background: c,
              animation: `fx-twinkle ${3 + (i % 5)}s ease-in-out ${i * 0.4}s infinite`,
              boxShadow: i % 3 === 0 ? `0 0 6px ${c}` : "none",
            }}
          />
        );
      })}
    </>
  );
}
