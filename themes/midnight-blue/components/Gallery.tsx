"use client";

import { useState } from "react";
import { useInvitation } from "../context";

const PLACEHOLDER_LABELS = ["Prewed 1","Prewed 2","Lamaran 1","Prewed 3","Bersama 1","Bersama 2","Prewed 4","Prewed 5"];
const GRID_SPANS = [
  { col: "span 7", row: "span 2", aspect: "4/5" },
  { col: "span 5", row: "span 1", aspect: "1/1" },
  { col: "span 5", row: "span 1", aspect: "1/1" },
  { col: "span 4", row: "span 1", aspect: "3/4" },
  { col: "span 4", row: "span 1", aspect: "3/4" },
  { col: "span 4", row: "span 1", aspect: "3/4" },
  { col: "span 5", row: "span 1", aspect: "1/1" },
  { col: "span 7", row: "span 1", aspect: "16/10" },
];

export default function Gallery() {
  const { photos } = useInvitation();
  const [sel, setSel] = useState<number | null>(null);
  const items = photos.length > 0 ? photos : PLACEHOLDER_LABELS.map((l) => l);
  const isPlaceholder = photos.length === 0;

  return (
    <section id="gallery" className="grad-mb-alt relative overflow-hidden geo-pattern-mb">
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "140px 32px", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ letterSpacing: "0.5em", textTransform: "uppercase" as const, fontSize: "9px", fontWeight: 500, marginBottom: "24px", color: "var(--color-silver-dark)", fontFamily: "var(--font-body-mb)" }}>Our Moments</p>
          <h2 className="shimmer-silver" style={{ fontFamily: "var(--font-display-mb)", fontSize: "clamp(2rem, 6vw, 2.8rem)", fontStyle: "italic", marginBottom: "32px" }}>Galeri Foto</h2>
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(to right, transparent, var(--color-blue-accent), transparent)", margin: "0 auto", opacity: 0.4 }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "10px" }}>
          {items.slice(0, 8).map((src, i) => {
            const g = GRID_SPANS[i] ?? GRID_SPANS[0];
            return (
              <div key={i} className={`reveal-scale delay-${Math.min(i+1,8)} group relative cursor-pointer`}
                style={{ gridColumn: g.col, gridRow: g.row, borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.4)", aspectRatio: g.aspect }}
                onClick={() => setSel(i)}>
                {isPlaceholder
                  ? <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-700" style={{ background: "linear-gradient(135deg, var(--color-navy-light), var(--color-navy))", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <span style={{ fontFamily: "var(--font-display-mb)", color: "var(--color-text-mb-dim)", fontSize: "11px" }}>{src}</span>
                    </div>
                  : <img src={src} alt={`Foto ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-[rgba(74,158,232,0.1)] transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>

      {sel !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 cursor-pointer"
          style={{ background: "rgba(2,8,16,0.95)", backdropFilter: "blur(16px)", animation: "fade-in 0.3s ease" }}
          onClick={() => setSel(null)}>
          <div style={{ maxWidth: "400px", width: "100%", aspectRatio: "3/4", borderRadius: "20px", overflow: "hidden" }}
            className="glass-mb flex items-center justify-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {isPlaceholder
              ? <span style={{ fontFamily: "var(--font-display-mb)", color: "var(--color-text-mb-dim)" }}>{items[sel]}</span>
              : <img src={items[sel]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
          </div>
          <button className="absolute top-5 right-5 w-10 h-10 rounded-full glass-mb flex items-center justify-center" style={{ color: "white", fontSize: "20px", cursor: "pointer" }} onClick={() => setSel(null)}>&times;</button>
        </div>
      )}
    </section>
  );
}
