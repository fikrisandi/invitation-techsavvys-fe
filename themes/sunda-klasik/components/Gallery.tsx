"use client";

import { useState } from "react";
import { MegaMendung, SundaDivider } from "./SundaOrnament";
import { useInvitation } from "../context";

export default function Gallery() {
  const { photos } = useInvitation();
  const [sel, setSel] = useState<number | null>(null);

  if (photos.length === 0) return null;

  return (
    <section style={{ background: "var(--sunda-bg-mid-t)", position: "relative", overflow: "hidden" }}>
      {/* Top mega mendung */}
      <div style={{ display: "flex", justifyContent: "center", opacity: 0.35 }}>
        <MegaMendung />
      </div>

      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "80px 32px",
        position: "relative",
        zIndex: 2,
      }}>
        {/* Header */}
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{
            fontFamily: "var(--font-sunda-body)",
            fontSize: "9px",
            letterSpacing: "0.45em",
            textTransform: "uppercase" as const,
            color: "var(--sunda-gold)",
            marginBottom: "16px",
          }}>
            Our Moments
          </p>
          <h2 style={{
            fontFamily: "var(--font-sunda-script)",
            fontSize: "clamp(2rem, 7vw, 2.8rem)",
            color: "var(--sunda-text)",
            marginBottom: "16px",
          }}>
            Galeri Foto
          </h2>
          <SundaDivider />
        </div>

        {/* Photo grid */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
          {photos.map((src, i) => (
            <div key={i} style={{ flex: "0 0 auto", width: photos.length <= 4 ? "calc(50% - 4px)" : "calc(33.33% - 6px)", cursor: "pointer", borderRadius: "4px", overflow: "hidden" }}
              onClick={() => setSel(i)}>
              <img src={src} alt={`Foto ${i+1}`} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom mega mendung */}
      <div style={{ display: "flex", justifyContent: "center", opacity: 0.35 }}>
        <MegaMendung flip />
      </div>

      {/* Lightbox */}
      {sel !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(10px)",
            cursor: "pointer",
          }}
          onClick={() => setSel(null)}
        >
          <img
            src={photos[sel]}
            alt=""
            style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: "4px" }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              width: "40px",
              height: "40px",
              borderRadius: "4px",
              border: "1px solid var(--sunda-border)",
              background: "var(--sunda-bg-mid-t)",
              color: "var(--sunda-gold)",
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setSel(null)}
          >
            &times;
          </button>
        </div>
      )}
    </section>
  );
}
