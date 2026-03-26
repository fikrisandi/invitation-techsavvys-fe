"use client";

import { useState, useEffect } from "react";
import { useInvitation } from "../context";
import { CineRule } from "./CineOrnament";
import { getWishes } from "@/lib/api";

interface Wish {
  name: string;
  msg: string;
  date: string;
  badge: string;
}

const BADGE_COLORS: Record<string, string> = {
  hadir: "#4A9E6B",
  tidak_hadir: "#D44444",
  mungkin: "#C8A878",
};
const BADGE_LABELS: Record<string, string> = {
  hadir: "Hadir",
  tidak_hadir: "Tidak Hadir",
  mungkin: "Ragu",
};
const PER_PAGE = 5;

export default function Wishes() {
  const { slug, wishesEnabled } = useInvitation();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!wishesEnabled) { setLoading(false); return; }
    getWishes(slug).then((data) => { setWishes(data); setLoading(false); });
  }, [slug, wishesEnabled]);

  if (!wishesEnabled) return null;

  const totalPages = Math.max(1, Math.ceil(wishes.length / PER_PAGE));
  const visible = wishes.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <section
      style={{
        background: "var(--cine-bg)",
        padding: "120px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
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
            Wishes
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
            Ucapan &amp; Doa
          </h2>
          <CineRule />
        </div>

        <div style={{ maxWidth: "480px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
          {loading && (
            <p
              style={{
                textAlign: "center",
                fontFamily: "var(--font-cine-body)",
                color: "var(--cine-text-soft)",
                fontSize: "12px",
                letterSpacing: "0.1em",
              }}
            >
              Memuat ucapan...
            </p>
          )}

          {!loading && wishes.length === 0 && (
            <p
              style={{
                textAlign: "center",
                fontFamily: "var(--font-cine-body)",
                color: "var(--cine-text-soft)",
                fontSize: "12px",
                lineHeight: 2,
              }}
            >
              Belum ada ucapan. Jadilah yang pertama!
            </p>
          )}

          {visible.map((w, i) => (
            <div
              key={`${w.name}-${i}`}
              style={{
                background: "var(--cine-card)",
                border: "1px solid var(--cine-border)",
                padding: "24px 28px",
                animation: "cine-fade-in 0.4s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                {/* Gold avatar initial */}
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--cine-gold)",
                    color: "var(--cine-bg)",
                    fontFamily: "var(--font-cine-display)",
                    fontStyle: "italic",
                    fontSize: "15px",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {w.name.charAt(0).toUpperCase()}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <h4
                      style={{
                        fontFamily: "var(--font-cine-body)",
                        color: "var(--cine-text)",
                        fontSize: "13px",
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {w.name}
                    </h4>
                    {w.badge && BADGE_COLORS[w.badge] && (
                      <span
                        style={{
                          flexShrink: 0,
                          fontSize: "7px",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          padding: "2px 8px",
                          color: "white",
                          fontWeight: 500,
                          background: BADGE_COLORS[w.badge],
                          fontFamily: "var(--font-cine-body)",
                        }}
                      >
                        {BADGE_LABELS[w.badge]}
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-cine-body)",
                      color: "var(--cine-text-muted)",
                      fontSize: "10px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {w.date}
                  </span>
                </div>
              </div>

              {w.msg && (
                <p
                  style={{
                    fontFamily: "var(--font-cine-body)",
                    color: "var(--cine-text-soft)",
                    fontSize: "12px",
                    lineHeight: 1.9,
                    paddingLeft: "48px",
                  }}
                >
                  {w.msg}
                </p>
              )}
            </div>
          ))}

          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                marginTop: "16px",
              }}
            >
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                style={{
                  width: "36px",
                  height: "36px",
                  border: "1px solid var(--cine-border)",
                  background: "transparent",
                  color: page === 0 ? "var(--cine-text-muted)" : "var(--cine-gold)",
                  cursor: page === 0 ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <span
                style={{
                  fontFamily: "var(--font-cine-body)",
                  fontSize: "10px",
                  color: "var(--cine-text-soft)",
                  letterSpacing: "0.2em",
                }}
              >
                {page + 1} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                style={{
                  width: "36px",
                  height: "36px",
                  border: "1px solid var(--cine-border)",
                  background: "transparent",
                  color: page === totalPages - 1 ? "var(--cine-text-muted)" : "var(--cine-gold)",
                  cursor: page === totalPages - 1 ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`@keyframes cine-fade-in { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </section>
  );
}
