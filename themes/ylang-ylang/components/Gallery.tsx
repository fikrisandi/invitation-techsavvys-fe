"use client";
import { useState } from "react";
import { BotanicalDivider } from "./BotanicalOrnament";
import { useInvitation } from "../context";

export default function Gallery() {
  const { photos } = useInvitation();
  const [sel, setSel] = useState<number | null>(null);

  if (photos.length === 0) return null;

  return (
    <section id="gallery" className="grad-yy-alt relative overflow-hidden geo-yy">
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "140px 32px", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase" as const, color: "var(--color-yy-text-soft)", marginBottom: "20px", fontFamily: "var(--font-yy-body)" }}>Our Moments</p>
          <h2 style={{ fontFamily: "var(--font-yy-script)", fontSize: "clamp(2.2rem, 7vw, 3rem)", color: "var(--color-yy-forest)", marginBottom: "8px" }}>Galeri Foto</h2>
          <BotanicalDivider />
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
          style={{ background: "rgba(44,32,22,0.85)", backdropFilter: "blur(12px)", animation: "fade-in 0.3s ease" }}
          onClick={() => setSel(null)}>
          <img
            src={photos[sel]}
            alt=""
            style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: "4px" }}
            onClick={(e) => e.stopPropagation()}
          />
          <button className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.9)", color: "var(--color-yy-text)", fontSize: "20px", cursor: "pointer", border: "none" }} onClick={() => setSel(null)}>&times;</button>
        </div>
      )}
    </section>
  );
}
