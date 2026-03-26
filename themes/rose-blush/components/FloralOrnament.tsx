"use client";

export function RoseDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", margin: "20px 0" }}>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, var(--color-rb-dusty))", maxWidth: "80px", opacity: 0.6 }} />
      <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="4" fill="var(--color-rb-rosegold)" opacity="0.7" />
        <path d="M20 4 C16 10 10 14 4 12 C10 16 12 22 10 28 C14 22 20 20 26 24 C22 18 24 12 30 8 C24 10 20 6 20 4Z" fill="var(--color-rb-blush)" opacity="0.5" />
        <path d="M20 36 C24 30 30 26 36 28 C30 24 28 18 30 12 C26 18 20 20 14 16 C18 22 16 28 10 32 C16 30 20 34 20 36Z" fill="var(--color-rb-dusty)" opacity="0.4" />
      </svg>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, var(--color-rb-dusty))", maxWidth: "80px", opacity: 0.6 }} />
    </div>
  );
}

export function FloralCorner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const style: React.CSSProperties = {
    position: "absolute",
    width: "120px",
    height: "120px",
    opacity: 0.18,
    ...(position === "tl" && { top: 0, left: 0 }),
    ...(position === "tr" && { top: 0, right: 0, transform: "scaleX(-1)" }),
    ...(position === "bl" && { bottom: 0, left: 0, transform: "scaleY(-1)" }),
    ...(position === "br" && { bottom: 0, right: 0, transform: "scale(-1)" }),
  };
  return (
    <div style={style}>
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0 Q60 0 60 60" stroke="var(--color-rb-rosegold)" strokeWidth="0.8" fill="none"/>
        <path d="M10 0 Q10 50 70 60" stroke="var(--color-rb-dusty)" strokeWidth="0.6" fill="none"/>
        <circle cx="30" cy="30" r="8" fill="var(--color-rb-blush)" opacity="0.5"/>
        <circle cx="15" cy="50" r="5" fill="var(--color-rb-rosegold)" opacity="0.4"/>
        <circle cx="55" cy="20" r="4" fill="var(--color-rb-dusty)" opacity="0.5"/>
        <path d="M25 25 Q30 15 40 20 Q35 30 25 25Z" fill="var(--color-rb-blush)" opacity="0.6"/>
        <path d="M10 45 Q15 35 22 42 Q16 50 10 45Z" fill="var(--color-rb-dusty)" opacity="0.5"/>
        <path d="M50 15 Q55 8 62 14 Q56 22 50 15Z" fill="var(--color-rb-blush)" opacity="0.5"/>
      </svg>
    </div>
  );
}

export function FloatingPetals() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {[
        { left: "10%", animDelay: "0s", size: 8, dur: "12s" },
        { left: "25%", animDelay: "2s", size: 6, dur: "15s" },
        { left: "50%", animDelay: "4s", size: 10, dur: "10s" },
        { left: "70%", animDelay: "1s", size: 7, dur: "13s" },
        { left: "85%", animDelay: "3s", size: 5, dur: "11s" },
      ].map((p, i) => (
        <div key={i} style={{
          position: "absolute", top: "-20px", left: p.left,
          width: p.size, height: p.size, borderRadius: "50% 0 50% 0",
          background: i % 2 === 0 ? "var(--color-rb-blush)" : "var(--color-rb-rosegold)",
          opacity: 0.25,
          animation: `petal-fall ${p.dur} ${p.animDelay} linear infinite`,
        }} />
      ))}
    </div>
  );
}
