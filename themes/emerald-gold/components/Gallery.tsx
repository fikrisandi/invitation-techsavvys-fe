"use client";

import { useState } from "react";
import { GoldDivider } from "./FloralOrnament";
import Particles from "./Particles";
import { useInvitation } from "../context";

const PLACEHOLDER_LABELS = ["Prewed 1","Prewed 2","Lamaran 1","Prewed 3","Bersama 1","Bersama 2","Prewed 4","Prewed 5"];

const GRID_SPANS = [
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
  const items = photos.length > 0 ? photos : PLACEHOLDER_LABELS.map((l) => l);
  const isPlaceholder = photos.length === 0;

  return (
    <section id="gallery" className="grad-gallery relative overflow-hidden">
      <Particles count={20} />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "140px 32px", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ letterSpacing: "0.5em", textTransform: "uppercase" as const, fontSize: "9px", fontWeight: 500, marginBottom: "24px", color: "var(--color-gold-dark)" }}>Our Moments</p>
          <h2 style={{ fontFamily: "var(--font-script)", fontSize: "clamp(2.2rem, 7vw, 3rem)", marginBottom: "16px", color: "var(--color-gold-light)" }}>Galeri Foto</h2>
          <GoldDivider />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "12px" }}>
          {items.slice(0, 8).map((src, i) => {
            const g = GRID_SPANS[i] ?? GRID_SPANS[0];
            return (
              <div key={i} className={`${g.tilt} reveal-scale delay-${Math.min(i+1,8)} group relative cursor-pointer`}
                style={{ gridColumn: g.col, gridRow: g.row, borderRadius: "20px", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.2)", aspectRatio: g.aspect }}
                onClick={() => setSel(i)}>
                {isPlaceholder
                  ? <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-700" style={{ background: "linear-gradient(135deg, var(--color-emerald-light), var(--color-emerald))", border: "1px solid var(--color-glass-border)" }}>
                      <span style={{ fontFamily: "var(--font-display)", color: "var(--color-text-dim)", fontSize: "12px" }}>{src}</span>
                    </div>
                  : <img src={src} alt={`Foto ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>

      {sel !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 cursor-pointer"
          style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)", animation: "fade-in 0.3s ease" }}
          onClick={() => setSel(null)}>
          <div style={{ maxWidth: "400px", width: "100%", aspectRatio: "3/4", borderRadius: "24px", overflow: "hidden" }}
            className="glass-strong flex items-center justify-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}>
            {isPlaceholder
              ? <span style={{ fontFamily: "var(--font-display)", color: "var(--color-text-dim)" }}>{items[sel]}</span>
              : <img src={items[sel]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
          </div>
          <button className="absolute top-5 right-5 w-10 h-10 rounded-full glass flex items-center justify-center" style={{ color: "white", fontSize: "20px", cursor: "pointer" }} onClick={() => setSel(null)}>&times;</button>
        </div>
      )}
    </section>
  );
}
