"use client";

import { useState } from "react";
import { useInvitation } from "../context";

export default function Gallery() {
  const { photos } = useInvitation();
  const [sel, setSel] = useState<number | null>(null);

  if (photos.length === 0) return null;

  return (
    <section id="gallery" className="grad-mb-alt relative overflow-hidden geo-pattern-mb">
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "140px 32px", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ letterSpacing: "0.5em", textTransform: "uppercase" as const, fontSize: "9px", fontWeight: 500, marginBottom: "24px", color: "var(--color-silver-dark)", fontFamily: "var(--font-body-mb)" }}>Our Moments</p>
          <h2 className="shimmer-silver" style={{ fontFamily: "var(--font-display-mb)", fontSize: "clamp(2rem, 6vw, 2.8rem)", fontStyle: "italic", marginBottom: "32px" }}>Galeri Foto</h2>
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(to right, transparent, var(--color-blue-accent), transparent)", margin: "0 auto", opacity: 0.4 }} />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
          {photos.map((src, i) => (
            <div key={i} style={{ flex: "0 0 auto", width: photos.length <= 4 ? "calc(50% - 4px)" : "calc(33.33% - 6px)", cursor: "pointer", borderRadius: "4px", overflow: "hidden" }}
              onClick={() => setSel(i)}>
              <img src={src} alt={`Foto ${i+1}`} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          ))}
        </div>
      </div>

      {sel !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 cursor-pointer"
          style={{ background: "rgba(2,8,16,0.95)", backdropFilter: "blur(16px)", animation: "fade-in 0.3s ease" }}
          onClick={() => setSel(null)}>
          <img
            src={photos[sel]}
            alt=""
            style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: "4px" }}
            onClick={(e) => e.stopPropagation()}
          />
          <button className="absolute top-5 right-5 w-10 h-10 rounded-full glass-mb flex items-center justify-center" style={{ color: "white", fontSize: "20px", cursor: "pointer" }} onClick={() => setSel(null)}>&times;</button>
        </div>
      )}
    </section>
  );
}
