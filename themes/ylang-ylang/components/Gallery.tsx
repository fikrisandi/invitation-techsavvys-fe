"use client";
import { useState } from "react";
import { BotanicalDivider } from "./BotanicalOrnament";
import { useInvitation } from "../context";

const SPANS = [
  { col: "span 7", row: "span 2", aspect: "4/5", tilt: "photo-tilt-left" },
  { col: "span 5", row: "span 1", aspect: "1/1", tilt: "photo-tilt-right" },
  { col: "span 5", row: "span 1", aspect: "1/1", tilt: "photo-tilt-left" },
  { col: "span 4", row: "span 1", aspect: "3/4", tilt: "photo-tilt-right" },
  { col: "span 4", row: "span 1", aspect: "3/4", tilt: "photo-tilt-left" },
  { col: "span 4", row: "span 1", aspect: "3/4", tilt: "photo-tilt-right" },
  { col: "span 5", row: "span 1", aspect: "1/1", tilt: "photo-tilt-left" },
  { col: "span 7", row: "span 1", aspect: "16/10", tilt: "photo-tilt-right" },
];

export default function Gallery() {
  const { photos } = useInvitation();
  const [sel, setSel] = useState<number | null>(null);

  if (photos.length === 0) return null;

  const items = photos;

  return (
    <section id="gallery" className="grad-yy-alt relative overflow-hidden geo-yy">
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "140px 32px", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase" as const, color: "var(--color-yy-text-soft)", marginBottom: "20px", fontFamily: "var(--font-yy-body)" }}>Our Moments</p>
          <h2 style={{ fontFamily: "var(--font-yy-script)", fontSize: "clamp(2.2rem, 7vw, 3rem)", color: "var(--color-yy-forest)", marginBottom: "8px" }}>Galeri Foto</h2>
          <BotanicalDivider />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "10px" }}>
          {items.slice(0, SPANS.length).map((src, i) => {
            const g = SPANS[i] ?? SPANS[0];
            return (
              <div key={i} className={`${g.tilt} reveal-scale delay-${Math.min(i+1,8)} group relative cursor-pointer`}
                style={{ gridColumn: g.col, gridRow: g.row, borderRadius: "14px", overflow: "hidden", boxShadow: "0 4px 16px rgba(60,40,20,0.1)", aspectRatio: g.aspect, border: "1px solid rgba(196,151,90,0.15)" }}
                onClick={() => setSel(i)}>
                <img src={src} alt={`Foto ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-[rgba(196,151,90,0.15)] transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
      {sel !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 cursor-pointer"
          style={{ background: "rgba(44,32,22,0.85)", backdropFilter: "blur(12px)", animation: "fade-in 0.3s ease" }}
          onClick={() => setSel(null)}>
          <div style={{ maxWidth: "400px", width: "100%", aspectRatio: "3/4", borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", background: "white" }}
            className="flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img src={items[sel]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <button className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.9)", color: "var(--color-yy-text)", fontSize: "20px", cursor: "pointer", border: "none" }} onClick={() => setSel(null)}>&times;</button>
        </div>
      )}
    </section>
  );
}
