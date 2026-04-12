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

        {/* Masonry-style grid */}
        <div
          className="reveal-scale"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          {photos.map((src, i) => (
            <div
              key={i}
              onClick={() => setLightbox(src)}
              style={{
                position: "relative",
                borderRadius: "4px",
                overflow: "hidden",
                aspectRatio: i % 3 === 0 ? "3/4" : "1/1",
                cursor: "pointer",
                background: "rgba(212,112,138,0.06)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid var(--sakura-border)",
              }}
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  transition: "transform 0.5s ease",
                  display: "block",
                }}
              />
              {/* Hover overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(135deg, rgba(212,112,138,0.6) 0%, rgba(192,88,120,0.4) 100%)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="gallery-overlay-sakura"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                </svg>
              </div>

              {/* Index indicator */}
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: "rgba(253,248,249,0.85)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9px",
                  color: "var(--sakura-pink)",
                  fontFamily: "var(--font-sakura-body)",
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </div>
            </div>
          ))}
        </div>

        {/* CSS for hover - inline style tag */}
        <style>{`
          .gallery-overlay-sakura:hover,
          div:hover > .gallery-overlay-sakura {
            opacity: 1 !important;
          }
          div:hover > img {
            transform: scale(1.06);
          }
        `}</style>
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
