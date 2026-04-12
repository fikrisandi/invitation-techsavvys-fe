"use client";
import { useState } from "react";
import { RoseDivider } from "./FloralOrnament";
import { useInvitation } from "../context";

export default function Gallery() {
  const { photos } = useInvitation();
  const [sel, setSel] = useState<number | null>(null);

  if (photos.length === 0) return null;

  return (
    <section id="gallery" style={{ background: "var(--color-rb-bg-t)", padding: "120px 32px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase" as const, color: "var(--color-rb-text-soft)", marginBottom: "20px", fontFamily: "var(--font-rb-body)" }}>Our Moments</p>
          <h2 style={{ fontFamily: "var(--font-rb-script)", fontSize: "clamp(2.2rem, 7vw, 3rem)", color: "var(--color-rb-dusty)", marginBottom: "8px" }}>Galeri Foto</h2>
          <RoseDivider />
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
          style={{ background: "rgba(80,40,50,0.85)", backdropFilter: "blur(12px)", animation: "fade-in 0.3s ease" }}
          onClick={() => setSel(null)}>
          <img
            src={photos[sel]}
            alt=""
            style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: "4px" }}
            onClick={(e) => e.stopPropagation()}
          />
          <button className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.9)", color: "var(--color-rb-text)", fontSize: "20px", cursor: "pointer", border: "none" }} onClick={() => setSel(null)}>&times;</button>
        </div>
      )}
    </section>
  );
}
