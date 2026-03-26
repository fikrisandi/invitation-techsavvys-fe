"use client";

import { useState, useRef } from "react";
import { useInvitation } from "../context";
import { CineRule } from "./CineOrnament";

const ROTATIONS = [-2.5, 1.8, -1.2, 2.1, -0.8, 1.5, -2, 0.9, -1.6, 2.3];
const PLACEHOLDER_LABELS = ["Scene I", "Scene II", "Scene III", "Scene IV", "Scene V", "Scene VI", "Scene VII", "Scene VIII"];

export default function Gallery() {
  const { photos } = useInvitation();
  const [sel, setSel] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const items = photos.length > 0 ? photos : PLACEHOLDER_LABELS;
  const isPlaceholder = photos.length === 0;
  const displayItems = items.slice(0, 8);

  return (
    <section
      style={{
        background: "var(--cine-bg-mid)",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top rule */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(to right, transparent, var(--cine-gold), transparent)",
          opacity: 0.2,
        }}
      />

      <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px", padding: "0 32px" }}>
        <p
          style={{
            fontFamily: "var(--font-cine-body)",
            fontSize: "8px",
            letterSpacing: "0.6em",
            textTransform: "uppercase",
            color: "var(--cine-text-soft)",
            marginBottom: "24px",
          }}
        >
          Our Moments
        </p>
        <h2
          style={{
            fontFamily: "var(--font-cine-display)",
            fontStyle: "italic",
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            fontWeight: 700,
            color: "var(--cine-text)",
            marginBottom: "32px",
          }}
        >
          Galeri Foto
        </h2>
        <CineRule />
      </div>

      {/* Film-strip horizontal scroll */}
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          padding: "32px 48px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          alignItems: "center",
        }}
      >
        {displayItems.map((src, i) => {
          const rot = ROTATIONS[i % ROTATIONS.length];
          return (
            <div
              key={i}
              onClick={() => setSel(i)}
              style={{
                flexShrink: 0,
                width: "220px",
                height: "300px",
                transform: `rotate(${rot}deg)`,
                cursor: "pointer",
                position: "relative",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "rotate(0deg) scale(1.04)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px rgba(200,168,120,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = `rotate(${rot}deg)`;
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.5)";
              }}
            >
              {/* Film frame top */}
              <div
                style={{
                  height: "20px",
                  background: "#111",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  padding: "0 6px",
                  border: "1px solid #222",
                  borderBottom: "none",
                }}
              >
                {Array.from({ length: 8 }).map((_, hi) => (
                  <div
                    key={hi}
                    style={{
                      width: "8px",
                      height: "10px",
                      background: "#000",
                      border: "1px solid #333",
                      borderRadius: "1px",
                    }}
                  />
                ))}
              </div>

              {/* Image area */}
              <div
                style={{
                  height: "260px",
                  overflow: "hidden",
                  background: "var(--cine-card)",
                  border: "1px solid #222",
                  borderTop: "none",
                  borderBottom: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isPlaceholder ? (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(135deg, #141414, #0a0a0a)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-cine-body)",
                        fontSize: "10px",
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "var(--cine-text-soft)",
                      }}
                    >
                      {src as string}
                    </span>
                  </div>
                ) : (
                  <img
                    src={src as string}
                    alt={`Foto ${i + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                )}
              </div>

              {/* Film frame bottom */}
              <div
                style={{
                  height: "20px",
                  background: "#111",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  padding: "0 6px",
                  border: "1px solid #222",
                  borderTop: "none",
                }}
              >
                {Array.from({ length: 8 }).map((_, hi) => (
                  <div
                    key={hi}
                    style={{
                      width: "8px",
                      height: "10px",
                      background: "#000",
                      border: "1px solid #333",
                      borderRadius: "1px",
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
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
            background: "rgba(0,0,0,0.95)",
            backdropFilter: "blur(12px)",
            cursor: "pointer",
            animation: "cine-fade 0.3s ease",
          }}
          onClick={() => setSel(null)}
        >
          <div
            style={{
              maxWidth: "480px",
              width: "100%",
              maxHeight: "80vh",
              overflow: "hidden",
              border: "1px solid var(--cine-border)",
              cursor: "default",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {isPlaceholder ? (
              <div
                style={{
                  aspectRatio: "3/4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--cine-card)",
                }}
              >
                <span style={{ fontFamily: "var(--font-cine-body)", color: "var(--cine-text-soft)" }}>
                  {displayItems[sel]}
                </span>
              </div>
            ) : (
              <img
                src={displayItems[sel] as string}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            )}
          </div>
          <button
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "1px solid var(--cine-border)",
              color: "var(--cine-text)",
              fontSize: "18px",
              cursor: "pointer",
            }}
            onClick={() => setSel(null)}
          >
            &times;
          </button>
        </div>
      )}

      <style>{`
        @keyframes cine-fade { from { opacity: 0; } to { opacity: 1; } }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
