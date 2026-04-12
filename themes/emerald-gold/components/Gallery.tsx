"use client";

import { useState } from "react";
import { GoldDivider } from "./FloralOrnament";
import Particles from "./Particles";
import { useInvitation } from "../context";

export default function Gallery() {
  const { photos } = useInvitation();
  const [sel, setSel] = useState<number | null>(null);

  if (photos.length === 0) return null;

  return (
    <section id="gallery" className="grad-gallery relative overflow-hidden">
      <Particles count={20} />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "140px 32px", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ letterSpacing: "0.5em", textTransform: "uppercase" as const, fontSize: "9px", fontWeight: 500, marginBottom: "24px", color: "var(--color-gold-dark)" }}>Our Moments</p>
          <h2 style={{ fontFamily: "var(--font-script)", fontSize: "clamp(2.2rem, 7vw, 3rem)", marginBottom: "16px", color: "var(--color-gold-light)" }}>Galeri Foto</h2>
          <GoldDivider />
        </div>
        <div style={{ columns: photos.length === 1 ? 1 : 2, columnGap: "8px" }}>
          {photos.map((src, i) => (
            <div key={i} style={{ breakInside: "avoid", marginBottom: "8px", cursor: "pointer", borderRadius: "4px", overflow: "hidden" }}
              onClick={() => setSel(i)}>
              <img src={src} alt={`Foto ${i+1}`} style={{ width: "100%", height: "auto", display: "block", transition: "transform 0.5s ease" }} />
            </div>
          ))}
        </div>
      </div>

      {sel !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 cursor-pointer"
          style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)", animation: "fade-in 0.3s ease" }}
          onClick={() => setSel(null)}>
          <img
            src={photos[sel]}
            alt=""
            style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: "4px" }}
            onClick={(e) => e.stopPropagation()}
          />
          <button className="absolute top-5 right-5 w-10 h-10 rounded-full glass flex items-center justify-center" style={{ color: "white", fontSize: "20px", cursor: "pointer" }} onClick={() => setSel(null)}>&times;</button>
        </div>
      )}
    </section>
  );
}
