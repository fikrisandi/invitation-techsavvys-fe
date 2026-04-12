"use client";

import { useState } from "react";
import { useInvitation } from "../context";

export default function Gallery() {
  const { photos } = useInvitation();
  const [sel, setSel] = useState<number | null>(null);

  if (photos.length === 0) return null;

  const displayItems = photos;

  return (
    <section
      style={{
        background: "var(--galaxy-bg-t)",
        padding: "120px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Nebula bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 20% 60%, rgba(232,121,160,0.07) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p
            style={{
              fontFamily: "var(--font-galaxy-body)",
              fontSize: "8px",
              letterSpacing: "0.6em",
              textTransform: "uppercase",
              color: "var(--galaxy-text-soft)",
              marginBottom: "24px",
            }}
          >
            Our Moments
          </p>
          <h2
            style={{
              fontFamily: "var(--font-galaxy-script)",
              fontSize: "clamp(2.2rem, 7vw, 3.5rem)",
              fontWeight: 400,
              background: "linear-gradient(135deg, var(--galaxy-purple), var(--galaxy-pink))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "32px",
            }}
          >
            Galeri Foto
          </h2>
        </div>

        {/* Masonry columns layout */}
        <div style={{ columns: displayItems.length === 1 ? 1 : 2, columnGap: "8px" }}>
          {displayItems.map((src, i) => (
            <div
              key={i}
              onClick={() => setSel(i)}
              style={{ breakInside: "avoid", marginBottom: "8px", cursor: "pointer", borderRadius: "4px", overflow: "hidden" }}
            >
              <img src={src as string} alt={`Foto ${i + 1}`} style={{ width: "100%", height: "auto", display: "block", transition: "transform 0.5s ease" }} />
            </div>
          ))}
        </div>
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
            background: "rgba(4,4,14,0.96)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            cursor: "pointer",
            animation: "galaxy-fade 0.3s ease",
          }}
          onClick={() => setSel(null)}
        >
          <img
            src={displayItems[sel] as string}
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
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--galaxy-border)",
              color: "var(--galaxy-text)",
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

      <style>{`@keyframes galaxy-fade { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </section>
  );
}
