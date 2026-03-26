"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { MegaMendung, SundaDivider } from "./SundaOrnament";
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

  return (
    <section style={{ background: "var(--sunda-bg-mid)", position: "relative", overflow: "hidden" }}>
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "10px" }}>
          {items.slice(0, 8).map((src, i) => {
            const g = GRID_SPANS[i] ?? GRID_SPANS[0];
            const itemStyle: CSSProperties = {
              gridColumn: g.col,
              gridRow: g.row,
              position: "relative",
              borderRadius: "4px",
              overflow: "hidden",
              aspectRatio: g.aspect,
              cursor: "pointer",
              border: "1px solid var(--sunda-border)",
            };

            return (
              <div
                key={i}
                className={`reveal-scale delay-${Math.min(i + 1, 8)}`}
                style={itemStyle}
                onClick={() => setSel(i)}
              >
                {/* Terracotta tint overlay on hover handled via img hover */}
                {isPlaceholder ? (
                  <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, var(--sunda-bg-alt), var(--sunda-bg))",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-sunda-display)",
                      color: "var(--sunda-text-muted)",
                      fontSize: "11px",
                    }}>
                      {src}
                    </span>
                  </div>
                ) : (
                  <>
                    <img
                      src={src}
                      alt={`Foto ${i + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.7s ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.08)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                    />
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(176,80,32,0)",
                      transition: "background 0.4s ease",
                    }} />
                  </>
                )}
                {/* Terracotta/gold corner accents */}
                <div style={{ position: "absolute", top: 6, left: 6, width: "12px", height: "12px", borderTop: "1px solid var(--sunda-terra)", borderLeft: "1px solid var(--sunda-terra)", opacity: 0.6, zIndex: 2 }} />
                <div style={{ position: "absolute", top: 6, right: 6, width: "12px", height: "12px", borderTop: "1px solid var(--sunda-terra)", borderRight: "1px solid var(--sunda-terra)", opacity: 0.6, zIndex: 2 }} />
                <div style={{ position: "absolute", bottom: 6, left: 6, width: "12px", height: "12px", borderBottom: "1px solid var(--sunda-terra)", borderLeft: "1px solid var(--sunda-terra)", opacity: 0.6, zIndex: 2 }} />
                <div style={{ position: "absolute", bottom: 6, right: 6, width: "12px", height: "12px", borderBottom: "1px solid var(--sunda-terra)", borderRight: "1px solid var(--sunda-terra)", opacity: 0.6, zIndex: 2 }} />
              </div>
            );
          })}
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
          <div
            style={{
              maxWidth: "420px",
              width: "100%",
              aspectRatio: "3/4",
              borderRadius: "4px",
              overflow: "hidden",
              border: "1px solid var(--sunda-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--sunda-bg-mid)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terra corners */}
            <div style={{ position: "absolute", top: 10, left: 10, width: "18px", height: "18px", borderTop: "1.5px solid var(--sunda-terra)", borderLeft: "1.5px solid var(--sunda-terra)", opacity: 0.7 }} />
            <div style={{ position: "absolute", top: 10, right: 10, width: "18px", height: "18px", borderTop: "1.5px solid var(--sunda-terra)", borderRight: "1.5px solid var(--sunda-terra)", opacity: 0.7 }} />
            <div style={{ position: "absolute", bottom: 10, left: 10, width: "18px", height: "18px", borderBottom: "1.5px solid var(--sunda-terra)", borderLeft: "1.5px solid var(--sunda-terra)", opacity: 0.7 }} />
            <div style={{ position: "absolute", bottom: 10, right: 10, width: "18px", height: "18px", borderBottom: "1.5px solid var(--sunda-terra)", borderRight: "1.5px solid var(--sunda-terra)", opacity: 0.7 }} />
            {isPlaceholder ? (
              <span style={{ fontFamily: "var(--font-sunda-display)", color: "var(--sunda-text-muted)" }}>
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
              borderRadius: "4px",
              border: "1px solid var(--sunda-border)",
              background: "var(--sunda-bg-mid)",
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
