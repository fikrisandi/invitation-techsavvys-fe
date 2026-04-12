"use client";

import { useState } from "react";
import { BatikBorder, GununganDivider } from "./JawaOrnament";
import { useInvitation } from "../context";

export default function Gallery() {
  const { photos } = useInvitation();
  const [sel, setSel] = useState<number | null>(null);

  if (photos.length === 0) return null;

  return (
    <section style={{ background: "var(--jawa-bg-t)", position: "relative", overflow: "hidden" }}>
      <BatikBorder />

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "100px 16px", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontFamily: "var(--font-jawa-body)", fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase" as const, color: "var(--jawa-gold)", marginBottom: "20px" }}>Our Moments</p>
          <h2 style={{ fontFamily: "var(--font-jawa-script)", fontSize: "clamp(2rem, 7vw, 2.8rem)", color: "var(--jawa-gold-light)", marginBottom: "20px" }}>Galeri Foto</h2>
          <GununganDivider />
        </div>

        <div style={{ columns: photos.length === 1 ? 1 : 2, columnGap: "8px" }}>
          {photos.map((src, i) => (
            <div
              key={i}
              className={`reveal-scale delay-${Math.min(i + 1, 8)}`}
              style={{ breakInside: "avoid", marginBottom: "8px", cursor: "pointer", borderRadius: "4px", overflow: "hidden" }}
              onClick={() => setSel(i)}
            >
              <img
                src={src}
                alt={`Foto ${i + 1}`}
                style={{ width: "100%", height: "auto", display: "block", transition: "transform 0.5s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
              />
            </div>
          ))}
        </div>
      </div>

      <BatikBorder />

      {sel !== null && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "rgba(0,0,0,0.92)", backdropFilter: "blur(10px)", cursor: "pointer" }}
          onClick={() => setSel(null)}
        >
          <img
            src={photos[sel]}
            alt=""
            style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: "4px" }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            style={{ position: "absolute", top: "20px", right: "20px", width: "40px", height: "40px", borderRadius: "50%", border: "1px solid var(--jawa-border)", background: "rgba(0,0,0,0.6)", color: "var(--jawa-gold)", fontSize: "20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={() => setSel(null)}
          >
            &times;
          </button>
        </div>
      )}
    </section>
  );
}
