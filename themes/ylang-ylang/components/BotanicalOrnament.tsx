"use client";

export function BotanicalTop({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 100" className={className} style={{ display: "block", margin: "0 auto", width: "220px", opacity: 0.55 }} fill="none">
      <g stroke="currentColor" strokeWidth="0.8">
        {/* Left branch */}
        <path d="M150 90 Q120 65 90 70 Q108 52 150 60" />
        <path d="M150 78 Q122 56 96 60 Q112 44 150 52" />
        <path d="M150 66 Q128 48 108 52 Q122 36 150 44" />
        <path d="M150 56 Q134 40 120 44" />
        {/* Left leaves */}
        <ellipse cx="93" cy="68" rx="6" ry="3" transform="rotate(-20 93 68)" strokeWidth="0.6" />
        <ellipse cx="110" cy="56" rx="5" ry="2.5" transform="rotate(-30 110 56)" strokeWidth="0.6" />
        <ellipse cx="125" cy="46" rx="4" ry="2" transform="rotate(-40 125 46)" strokeWidth="0.5" />
        {/* Right branch */}
        <path d="M150 90 Q180 65 210 70 Q192 52 150 60" />
        <path d="M150 78 Q178 56 204 60 Q188 44 150 52" />
        <path d="M150 66 Q172 48 192 52 Q178 36 150 44" />
        <path d="M150 56 Q166 40 180 44" />
        {/* Right leaves */}
        <ellipse cx="207" cy="68" rx="6" ry="3" transform="rotate(20 207 68)" strokeWidth="0.6" />
        <ellipse cx="190" cy="56" rx="5" ry="2.5" transform="rotate(30 190 56)" strokeWidth="0.6" />
        <ellipse cx="175" cy="46" rx="4" ry="2" transform="rotate(40 175 46)" strokeWidth="0.5" />
        {/* Center stem */}
        <line x1="150" y1="92" x2="150" y2="18" strokeWidth="0.7" />
        {/* Top flower */}
        <circle cx="150" cy="14" r="4" strokeWidth="0.8" />
        <circle cx="150" cy="14" r="2" fill="currentColor" opacity="0.3" />
        {/* Small buds */}
        <circle cx="142" cy="32" r="2.5" strokeWidth="0.6" />
        <circle cx="158" cy="32" r="2.5" strokeWidth="0.6" />
      </g>
    </svg>
  );
}

export function BotanicalDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
      <svg viewBox="0 0 90 20" width="90" height="20" fill="none" style={{ color: "var(--color-yy-gold)", opacity: 0.7 }}>
        <path d="M5 10 Q20 4 35 10 Q50 16 65 10 Q75 6 85 10" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <ellipse cx="20" cy="7" rx="5" ry="2.5" transform="rotate(-15 20 7)" stroke="currentColor" strokeWidth="0.6" fill="none" />
        <ellipse cx="50" cy="13" rx="4" ry="2" transform="rotate(15 50 13)" stroke="currentColor" strokeWidth="0.6" fill="none" />
        <ellipse cx="70" cy="7" rx="4" ry="2" transform="rotate(-10 70 7)" stroke="currentColor" strokeWidth="0.6" fill="none" />
      </svg>
      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-yy-gold)", opacity: 0.6 }} />
      <svg viewBox="0 0 90 20" width="90" height="20" fill="none" style={{ color: "var(--color-yy-gold)", opacity: 0.7, transform: "scaleX(-1)" }}>
        <path d="M5 10 Q20 4 35 10 Q50 16 65 10 Q75 6 85 10" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <ellipse cx="20" cy="7" rx="5" ry="2.5" transform="rotate(-15 20 7)" stroke="currentColor" strokeWidth="0.6" fill="none" />
        <ellipse cx="50" cy="13" rx="4" ry="2" transform="rotate(15 50 13)" stroke="currentColor" strokeWidth="0.6" fill="none" />
        <ellipse cx="70" cy="7" rx="4" ry="2" transform="rotate(-10 70 7)" stroke="currentColor" strokeWidth="0.6" fill="none" />
      </svg>
    </div>
  );
}

export function FloatingPetals() {
  const petals = Array.from({ length: 8 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${8 + i * 11}%`,
          width: `${10 + (i % 3) * 4}px`,
          height: `${10 + (i % 3) * 4}px`,
          borderRadius: "50% 0 50% 0",
          background: i % 2 === 0 ? "rgba(196,151,90,0.25)" : "rgba(61,90,69,0.15)",
          animation: `float-petal ${10 + i * 1.5}s linear infinite`,
          animationDelay: `${i * 1.2}s`,
          transform: `rotate(${i * 45}deg)`,
        }} />
      ))}
    </div>
  );
}
