"use client";

export function FilmStrip({ side }: { side: "left" | "right" }) {
  const holes = Array.from({ length: 12 });
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        [side]: 0,
        width: "28px",
        height: "100vh",
        background: "var(--cine-bg)",
        borderRight: side === "left" ? "1px solid var(--cine-border)" : undefined,
        borderLeft: side === "right" ? "1px solid var(--cine-border)" : undefined,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "16px 0",
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      {holes.map((_, i) => (
        <div
          key={i}
          style={{
            width: "10px",
            height: "14px",
            borderRadius: "2px",
            background: "var(--cine-bg-mid)",
            border: "1px solid var(--cine-border)",
          }}
        />
      ))}
    </div>
  );
}

export function CineRule({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        width: "100%",
        maxWidth: "320px",
        margin: "0 auto",
      }}
    >
      <div style={{ flex: 1, height: "1px", background: "var(--cine-gold)", opacity: 0.4 }} />
      <div
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "var(--cine-gold)",
          opacity: 0.7,
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, height: "1px", background: "var(--cine-gold)", opacity: 0.4 }} />
    </div>
  );
}
