"use client";

export default function Particles({ count = 15 }: { count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {[...Array(count)].map((_, i) => (
        <div key={i} style={{ position: "absolute", top: `${(i * 7 + 3) % 90}%`, left: `${(i * 11 + 5) % 95}%`, width: `${3 + (i % 3)}px`, height: `${3 + (i % 3)}px`, borderRadius: "50%", background: i % 3 === 0 ? "var(--color-gold-light)" : "var(--color-gold)", opacity: 0, animation: `glow-dot ${3 + (i % 4) * 0.8}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }} />
      ))}
      {[...Array(Math.floor(count / 3))].map((_, i) => (
        <div key={`rise-${i}`} style={{ position: "absolute", bottom: "10%", left: `${15 + i * 18}%`, width: "2px", height: "2px", borderRadius: "50%", background: "var(--color-gold)", animation: `drift-up ${5 + i * 1.5}s ease-out infinite`, animationDelay: `${i * 2}s` }} />
      ))}
    </div>
  );
}
