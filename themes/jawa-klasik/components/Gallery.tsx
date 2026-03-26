"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { BatikBorder, GununganDivider } from "./JawaOrnament";
import { useInvitation } from "../context";

const PLACEHOLDER_LABELS = ["Prewed 1", "Prewed 2", "Lamaran 1", "Prewed 3", "Bersama 1", "Bersama 2", "Prewed 4", "Prewed 5"];

const GRID_SPANS = [
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
  const items = photos.length > 0 ? photos : PLACEHOLDER_LABELS;
  const isPlaceholder = photos.length === 0;

  const frameStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 2,
  };

  return (
    <section style={{ background: "var(--jawa-bg)", position: "relative", overflow: "hidden" }}>
      <BatikBorder />

      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "100px 32px",
        position: "relative",
        zIndex: 2,
      }}>
        {/* Header */}
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{
            fontFamily: "var(--font-jawa-body)",
            fontSize: "9px",
            letterSpacing: "0.45em",
            textTransform: "uppercase" as const,
            color: "var(--jawa-gold)",
            marginBottom: "20px",
          }}>
            Our Moments
          </p>
          <h2 style={{
            fontFamily: "var(--font-jawa-script)",
            fontSize: "clamp(2rem, 7vw, 2.8rem)",
            color: "var(--jawa-gold-light)",
            marginBottom: "20px",
          }}>
            Galeri Foto
          </h2>
          <GununganDivider />
        </div>

        {/* Photo grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "10px" }}>
          {items.slice(0, 8).map((src, i) => {
            const g = GRID_SPANS[i] ?? GRID_SPANS[0];
            return (
              <div
                key={i}
                className={`reveal-scale delay-${Math.min(i + 1, 8)}`}
                style={{
                  gridColumn: g.col,
                  gridRow: g.row,
                  position: "relative",
                  borderRadius: "2px",
                  overflow: "hidden",
                  aspectRatio: g.aspect,
                  cursor: "pointer",
                  border: "1px solid var(--jawa-border)",
                }}
                onClick={() => setSel(i)}
              >
                {/* Gold frame overlay */}
                <div style={frameStyle}>
                  <div style={{ position: "absolute", top: 6, left: 6, width: "14px", height: "14px", borderTop: "1px solid var(--jawa-gold)", borderLeft: "1px solid var(--jawa-gold)", opacity: 0.7 }} />
                  <div style={{ position: "absolute", top: 6, right: 6, width: "14px", height: "14px", borderTop: "1px solid var(--jawa-gold)", borderRight: "1px solid var(--jawa-gold)", opacity: 0.7 }} />
                  <div style={{ position: "absolute", bottom: 6, left: 6, width: "14px", height: "14px", borderBottom: "1px solid var(--jawa-gold)", borderLeft: "1px solid var(--jawa-gold)", opacity: 0.7 }} />
                  <div style={{ position: "absolute", bottom: 6, right: 6, width: "14px", height: "14px", borderBottom: "1px solid var(--jawa-gold)", borderRight: "1px solid var(--jawa-gold)", opacity: 0.7 }} />
                </div>

                {isPlaceholder ? (
                  <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, var(--jawa-bg-mid), var(--jawa-bg))",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-jawa-display)",
                      color: "var(--jawa-text-muted)",
                      fontSize: "11px",
                    }}>
                      {src}
                    </span>
                  </div>
                ) : (
                  <img
                    src={src}
                    alt={`Foto ${i + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.7s ease" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.08)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <BatikBorder />

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
          <div
            style={{
              maxWidth: "420px",
              width: "100%",
              aspectRatio: "3/4",
              borderRadius: "2px",
              overflow: "hidden",
              border: "1px solid var(--jawa-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--jawa-bg-mid)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox gold corners */}
            <div style={{ position: "absolute", top: 10, left: 10, width: "20px", height: "20px", borderTop: "1.5px solid var(--jawa-gold)", borderLeft: "1.5px solid var(--jawa-gold)", opacity: 0.7 }} />
            <div style={{ position: "absolute", top: 10, right: 10, width: "20px", height: "20px", borderTop: "1.5px solid var(--jawa-gold)", borderRight: "1.5px solid var(--jawa-gold)", opacity: 0.7 }} />
            <div style={{ position: "absolute", bottom: 10, left: 10, width: "20px", height: "20px", borderBottom: "1.5px solid var(--jawa-gold)", borderLeft: "1.5px solid var(--jawa-gold)", opacity: 0.7 }} />
            <div style={{ position: "absolute", bottom: 10, right: 10, width: "20px", height: "20px", borderBottom: "1.5px solid var(--jawa-gold)", borderRight: "1.5px solid var(--jawa-gold)", opacity: 0.7 }} />
            {isPlaceholder ? (
              <span style={{ fontFamily: "var(--font-jawa-display)", color: "var(--jawa-text-muted)" }}>
                {items[sel]}
              </span>
            ) : (
              <img src={items[sel]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            )}
          </div>
          <button
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              width: "40px",
              height: "40px",
              borderRadius: "2px",
              border: "1px solid var(--jawa-border)",
              background: "var(--jawa-bg-mid)",
              color: "var(--jawa-gold)",
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
