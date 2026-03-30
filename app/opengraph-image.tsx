import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Invitation Savvys — Undangan Digital Elegan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 50%, #1a0a2e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        {/* Love icon */}
        <div style={{ fontSize: 72, marginBottom: 20, display: "flex" }}>
          💌
        </div>
        {/* Title */}
        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            color: "#f5e6c8",
            letterSpacing: "2px",
            display: "flex",
            marginBottom: 12,
          }}
        >
          Invitation Savvys
        </div>
        {/* Tagline */}
        <div
          style={{
            fontSize: 30,
            color: "#d4af37",
            display: "flex",
            marginBottom: 40,
            letterSpacing: "1px",
          }}
        >
          Undangan Digital Elegan &amp; Modern
        </div>
        {/* Features */}
        <div style={{ display: "flex", gap: 24 }}>
          {["💍 Pernikahan", "🎂 Ulang Tahun", "🎉 Acara Spesial"].map(
            (f) => (
              <div
                key={f}
                style={{
                  background: "rgba(212,175,55,0.15)",
                  border: "1px solid rgba(212,175,55,0.4)",
                  borderRadius: 12,
                  padding: "10px 22px",
                  color: "#f5e6c8",
                  fontSize: 24,
                  display: "flex",
                }}
              >
                {f}
              </div>
            )
          )}
        </div>
        {/* Location */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            color: "#6b4c9a",
            fontSize: 20,
            display: "flex",
          }}
        >
          Gresik • Surabaya • Jawa Timur • Indonesia
        </div>
      </div>
    ),
    { ...size }
  );
}
