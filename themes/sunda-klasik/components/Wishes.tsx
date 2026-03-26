"use client";

import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { MegaMendung, SundaDivider } from "./SundaOrnament";
import { useInvitation } from "../context";
import { getWishes } from "@/lib/api";

interface Wish {
  name: string;
  msg: string;
  date: string;
  badge: string;
}

const BC: Record<string, string> = {
  hadir: "#2A5020",
  tidak_hadir: "#8B1515",
  mungkin: "#7A5010",
};
const BL: Record<string, string> = {
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

  const wishCardStyle: CSSProperties = {
    background: "rgba(200,144,32,0.04)",
    border: "1px solid var(--sunda-border)",
    borderRadius: "4px",
    padding: "20px 22px",
    position: "relative",
    overflow: "hidden",
  };

  const navBtnStyle = (disabled: boolean): CSSProperties => ({
    width: "36px",
    height: "36px",
    borderRadius: "4px",
    border: "1px solid var(--sunda-border)",
    background: "transparent",
    color: disabled ? "var(--sunda-text-muted)" : "var(--sunda-gold)",
    cursor: disabled ? "default" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  return (
    <section style={{ background: "var(--sunda-bg-mid)", position: "relative", overflow: "hidden" }}>
      {/* Top mega mendung */}
      <div style={{ display: "flex", justifyContent: "center", opacity: 0.3 }}>
        <MegaMendung />
      </div>

      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "80px 32px", position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{
            fontFamily: "var(--font-sunda-body)",
            fontSize: "9px",
            letterSpacing: "0.45em",
            textTransform: "uppercase" as const,
            color: "var(--sunda-gold)",
            marginBottom: "16px",
          }}>
            Wishes
          </p>
          <h2 style={{
            fontFamily: "var(--font-sunda-script)",
            fontSize: "clamp(2rem, 7vw, 2.8rem)",
            color: "var(--sunda-text)",
            marginBottom: "16px",
          }}>
            Ucapan &amp; Doa
          </h2>
          <SundaDivider />
        </div>

        <div style={{ maxWidth: "480px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "14px" }}>
          {loading && (
            <p style={{ textAlign: "center", color: "var(--sunda-text-muted)", fontSize: "12px", fontFamily: "var(--font-sunda-body)" }}>
              Memuat ucapan...
            </p>
          )}
          {!loading && wishes.length === 0 && (
            <p style={{
              textAlign: "center",
              color: "var(--sunda-text-muted)",
              fontSize: "12px",
              lineHeight: 2,
              fontFamily: "var(--font-sunda-body)",
            }}>
              Belum ada ucapan. Jadilah yang pertama!
            </p>
          )}
          {visible.map((w, i) => (
            <div key={`${w.name}-${i}`} style={wishCardStyle}>
              {/* Terracotta left accent */}
              <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "3px",
                background: "linear-gradient(to bottom, var(--sunda-terra), var(--sunda-gold))",
                opacity: 0.5,
              }} />
              <div style={{ paddingLeft: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                  {/* Avatar */}
                  <div style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(176,80,32,0.1)",
                    border: "1px solid rgba(176,80,32,0.25)",
                    color: "var(--sunda-terra)",
                    fontFamily: "var(--font-sunda-display)",
                    fontSize: "13px",
                    fontWeight: 500,
                    flexShrink: 0,
                  }}>
                    {w.name.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <h4 style={{
                        fontFamily: "var(--font-sunda-display)",
                        color: "var(--sunda-text)",
                        fontSize: "13px",
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                        {w.name}
                      </h4>
                      {w.badge && BC[w.badge] && (
                        <span style={{
                          flexShrink: 0,
                          fontSize: "7px",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase" as const,
                          padding: "2px 8px",
                          borderRadius: "20px",
                          color: "#F5E8D0",
                          fontWeight: 500,
                          background: BC[w.badge],
                          fontFamily: "var(--font-sunda-body)",
                        }}>
                          {BL[w.badge]}
                        </span>
                      )}
                    </div>
                    <span style={{
                      fontFamily: "var(--font-sunda-body)",
                      color: "var(--sunda-text-muted)",
                      fontSize: "10px",
                    }}>
                      {w.date}
                    </span>
                  </div>
                </div>
                {w.msg && (
                  <p style={{
                    fontFamily: "var(--font-sunda-body)",
                    color: "var(--sunda-text-soft)",
                    fontSize: "12px",
                    lineHeight: 1.9,
                    paddingLeft: "46px",
                  }}>
                    {w.msg}
                  </p>
                )}
              </div>
            </div>
          ))}

          {totalPages > 1 && (
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginTop: "12px",
            }}>
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                style={navBtnStyle(page === 0)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <span style={{
                fontFamily: "var(--font-sunda-body)",
                fontSize: "12px",
                color: "var(--sunda-text-muted)",
                letterSpacing: "0.1em",
              }}>
                {page + 1} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                style={navBtnStyle(page === totalPages - 1)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom mega mendung */}
      <div style={{ display: "flex", justifyContent: "center", opacity: 0.3 }}>
        <MegaMendung flip />
      </div>
    </section>
  );
}
