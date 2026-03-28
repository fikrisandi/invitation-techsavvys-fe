"use client";
import { useState } from "react";
import { RoseDivider } from "./FloralOrnament";
import { useInvitation } from "../context";

const LABELS = ["Prewed 1","Prewed 2","Lamaran 1","Prewed 3","Bersama 1","Bersama 2","Prewed 4","Prewed 5"];
const SPANS = [
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
  const items = photos.length > 0 ? photos : LABELS;
  const isPlaceholder = photos.length === 0;

  return (
    <section id="gallery" style={{ background: "var(--color-rb-bg-t)", padding: "120px 32px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase" as const, color: "var(--color-rb-text-soft)", marginBottom: "20px", fontFamily: "var(--font-rb-body)" }}>Our Moments</p>
          <h2 style={{ fontFamily: "var(--font-rb-script)", fontSize: "clamp(2.2rem, 7vw, 3rem)", color: "var(--color-rb-dusty)", marginBottom: "8px" }}>Galeri Foto</h2>
          <RoseDivider />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "10px" }}>
          {items.slice(0, 8).map((src, i) => {
            const g = SPANS[i] ?? SPANS[0];
            return (
              <div key={i} className="reveal-scale group relative cursor-pointer"
                style={{ gridColumn: g.col, gridRow: g.row, borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 16px rgba(193,122,143,0.12)", aspectRatio: g.aspect, border: "1px solid rgba(220,176,186,0.3)" }}
                onClick={() => setSel(i)}>
                {isPlaceholder
                  ? <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-700" style={{ background: "linear-gradient(135deg, var(--color-rb-blush), #F9F0F3)" }}>
                      <span style={{ fontFamily: "var(--font-rb-display)", color: "var(--color-rb-text-soft)", fontSize: "12px", fontStyle: "italic" }}>{src}</span>
                    </div>
                  : <img src={src} alt={`Foto ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-[rgba(193,122,143,0.1)] transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
      {sel !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 cursor-pointer"
          style={{ background: "rgba(80,40,50,0.85)", backdropFilter: "blur(12px)", animation: "fade-in 0.3s ease" }}
          onClick={() => setSel(null)}>
          <div style={{ maxWidth: "400px", width: "100%", aspectRatio: "3/4", borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", background: "white" }}
            className="flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {isPlaceholder ? <span style={{ fontFamily: "var(--font-rb-display)", color: "var(--color-rb-text-soft)", fontStyle: "italic" }}>{items[sel]}</span>
              : <img src={items[sel]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
          </div>
          <button className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.9)", color: "var(--color-rb-text)", fontSize: "20px", cursor: "pointer", border: "none" }} onClick={() => setSel(null)}>&times;</button>
        </div>
      )}
    </section>
  );
}
