"use client";
import { useState } from "react";
import { useInvitation } from "../context";
import { SakuraDivider } from "./SakuraEffect";

export default function Gallery() {
  const { photos } = useInvitation();
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (!photos || photos.length === 0) return null;

  return (
    <section
      id="gallery"
      style={{
        background: "var(--sakura-bg-t)",
        padding: "120px 32px",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "var(--sakura-text-soft)",
              marginBottom: "20px",
              fontFamily: "var(--font-sakura-body)",
            }}
          >
            Galeri Foto
          </p>
          <h2
            style={{
              fontFamily: "var(--font-sakura-script)",
              fontSize: "clamp(2.2rem, 7vw, 3.2rem)",
              color: "var(--sakura-pink)",
              marginBottom: "8px",
            }}
          >
            Kenangan Indah
          </h2>
          <SakuraDivider />
        </div>

        {/* Masonry columns layout */}
        <div className="reveal-scale" style={{ columns: photos.length === 1 ? 1 : 2, columnGap: "8px" }}>
          {photos.map((src, i) => (
            <div
              key={i}
              onClick={() => setLightbox(src)}
              style={{ breakInside: "avoid", marginBottom: "8px", cursor: "pointer", borderRadius: "4px", overflow: "hidden" }}
            >
              <img src={src} alt={`Foto ${i + 1}`} style={{ width: "100%", height: "auto", display: "block", transition: "transform 0.5s ease" }} />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 900,
            background: "rgba(42,16,32,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            cursor: "zoom-out",
            backdropFilter: "blur(8px)",
          }}
        >
          <img
            src={lightbox}
            alt=""
            style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: "4px" }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "fixed",
              top: "24px",
              right: "24px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(253,248,249,0.12)",
              border: "1px solid rgba(253,248,249,0.2)",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
