"use client";
import { useState, useEffect } from "react";
import { useInvitation } from "../context";
import { SakuraDivider } from "./SakuraEffect";
import { getWishes } from "@/lib/api";

interface Wish {
  name: string;
  msg: string;
  date: string;
  badge: string;
}

const BADGE_COLOR: Record<string, string> = {
  hadir: "#3D5A45",
  tidak_hadir: "#A84868",
  mungkin: "#C89050",
};

const BADGE_LABEL: Record<string, string> = {
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
    if (!wishesEnabled) {
      setLoading(false);
      return;
    }
    getWishes(slug).then((d) => {
      setWishes(d);
      setLoading(false);
    });
  }, [slug, wishesEnabled]);

  if (!wishesEnabled) return null;

  const totalPages = Math.max(1, Math.ceil(wishes.length / PER_PAGE));
  const visible = wishes.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <section
      id="wishes"
      style={{
        background: "var(--sakura-bg-alt)",
        padding: "120px 32px",
      }}
    >
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "56px" }}>
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
            Wishes
          </p>
          <h2
            style={{
              fontFamily: "var(--font-sakura-script)",
              fontSize: "clamp(2.2rem, 7vw, 3.2rem)",
              color: "var(--sakura-pink)",
              marginBottom: "8px",
            }}
          >
            Ucapan &amp; Doa
          </h2>
          <SakuraDivider />
        </div>

        <div
          style={{
            maxWidth: "480px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {loading && (
            <p
              style={{
                textAlign: "center",
                color: "var(--sakura-text-soft)",
                fontSize: "12px",
                fontFamily: "var(--font-sakura-body)",
                padding: "40px 0",
              }}
            >
              Memuat ucapan...
            </p>
          )}

          {!loading && wishes.length === 0 && (
            <p
              style={{
                textAlign: "center",
                color: "var(--sakura-text-soft)",
                fontSize: "12px",
                lineHeight: 2,
                fontFamily: "var(--font-sakura-body)",
                padding: "40px 0",
              }}
            >
              Belum ada ucapan. Jadilah yang pertama!
            </p>
          )}

          {visible.map((w, i) => (
            <div
              key={`${w.name}-${i}`}
              style={{
                background: "var(--sakura-bg)",
                border: "1px solid var(--sakura-border)",
                borderRadius: "4px",
                padding: "20px 24px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Left accent line */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "20%",
                  bottom: "20%",
                  width: "3px",
                  background: "linear-gradient(to bottom, var(--sakura-pink), var(--sakura-pink-light))",
                  borderRadius: "0 2px 2px 0",
                }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, var(--sakura-pink) 0%, var(--sakura-rose) 100%)",
                    color: "#fff",
                    fontSize: "13px",
                    fontWeight: 700,
                    flexShrink: 0,
                    fontFamily: "var(--font-sakura-body)",
                    boxShadow: "0 4px 12px rgba(212,112,138,0.3)",
                  }}
                >
                  {w.name.charAt(0).toUpperCase()}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <h4
                      style={{
                        color: "var(--sakura-text)",
                        fontSize: "13px",
                        fontWeight: 600,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontFamily: "var(--font-sakura-body)",
                      }}
                    >
                      {w.name}
                    </h4>
                    {w.badge && BADGE_COLOR[w.badge] && (
                      <span
                        style={{
                          flexShrink: 0,
                          fontSize: "7px",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          padding: "2px 8px",
                          borderRadius: "20px",
                          color: "white",
                          fontWeight: 700,
                          background: BADGE_COLOR[w.badge],
                          fontFamily: "var(--font-sakura-body)",
                        }}
                      >
                        {BADGE_LABEL[w.badge]}
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      color: "var(--sakura-text-muted)",
                      fontSize: "10px",
                      fontFamily: "var(--font-sakura-body)",
                    }}
                  >
                    {w.date}
                  </span>
                </div>
              </div>

              {w.msg && (
                <p
                  style={{
                    color: "var(--sakura-text-soft)",
                    fontSize: "12px",
                    lineHeight: 1.9,
                    paddingLeft: "48px",
                    fontFamily: "var(--font-sakura-body)",
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{w.msg}&rdquo;
                </p>
              )}
            </div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                marginTop: "16px",
              }}
            >
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid var(--sakura-border)",
                  background: "transparent",
                  color: page === 0 ? "var(--sakura-text-muted)" : "var(--sakura-pink)",
                  cursor: page === 0 ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--sakura-text-soft)",
                  fontFamily: "var(--font-sakura-body)",
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
                  borderRadius: "50%",
                  border: "1px solid var(--sakura-border)",
                  background: "transparent",
                  color: page === totalPages - 1 ? "var(--sakura-text-muted)" : "var(--sakura-pink)",
                  cursor: page === totalPages - 1 ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
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
    </section>
  );
}
