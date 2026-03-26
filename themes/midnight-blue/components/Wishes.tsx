"use client";

import { useState, useEffect } from "react";
import { useInvitation } from "../context";
import { getWishes } from "@/lib/api";

interface Wish { name: string; msg: string; date: string; badge: string; }
const BC: Record<string, string> = { hadir: "#4A9E6B", tidak_hadir: "#D44444", mungkin: "#4A9EE8" };
const BL: Record<string, string> = { hadir: "Hadir", tidak_hadir: "Tidak Hadir", mungkin: "Ragu" };
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
    <section id="wishes" className="grad-mb-main relative overflow-hidden geo-pattern-mb">
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "140px 32px", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ letterSpacing: "0.5em", textTransform: "uppercase" as const, fontSize: "9px", fontWeight: 500, marginBottom: "24px", color: "var(--color-silver-dark)", fontFamily: "var(--font-body-mb)" }}>Wishes</p>
          <h2 className="shimmer-silver" style={{ fontFamily: "var(--font-display-mb)", fontSize: "clamp(2rem, 6vw, 2.8rem)", fontStyle: "italic", marginBottom: "32px" }}>Ucapan &amp; Doa</h2>
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(to right, transparent, var(--color-blue-accent), transparent)", margin: "0 auto", opacity: 0.4 }} />
        </div>
        <div style={{ maxWidth: "480px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "14px" }}>
          {loading && <p style={{ textAlign: "center", color: "var(--color-text-mb-muted)", fontSize: "12px", fontFamily: "var(--font-body-mb)" }}>Memuat ucapan...</p>}
          {!loading && wishes.length === 0 && <p style={{ textAlign: "center", color: "var(--color-text-mb-muted)", fontSize: "12px", lineHeight: 2, fontFamily: "var(--font-body-mb)" }}>Belum ada ucapan. Jadilah yang pertama!</p>}
          {visible.map((w, i) => (
            <div key={`${w.name}-${i}`} className="glass-mb rounded-2xl" style={{ padding: "20px 24px", animation: "fade-in 0.4s ease", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "2px", background: "linear-gradient(to bottom, transparent, var(--color-blue-accent), transparent)", opacity: 0.3 }} />
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                <div style={{ width: "34px", height: "34px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, var(--color-blue-accent), #2B7FD4)", color: "#fff", fontSize: "12px", fontWeight: 600, flexShrink: 0, fontFamily: "var(--font-body-mb)" }}>
                  {w.name.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <h4 style={{ color: "var(--color-white-soft)", fontSize: "13px", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "var(--font-body-mb)" }}>{w.name}</h4>
                    {w.badge && BC[w.badge] && (
                      <span style={{ flexShrink: 0, fontSize: "7px", letterSpacing: "0.1em", textTransform: "uppercase" as const, padding: "2px 8px", borderRadius: "20px", color: "white", fontWeight: 600, background: BC[w.badge] }}>{BL[w.badge]}</span>
                    )}
                  </div>
                  <span style={{ color: "var(--color-text-mb-dim)", fontSize: "10px", fontFamily: "var(--font-body-mb)" }}>{w.date}</span>
                </div>
              </div>
              {w.msg && <p style={{ color: "var(--color-text-mb)", fontSize: "12px", lineHeight: 1.9, paddingLeft: "46px", fontFamily: "var(--font-body-mb)" }}>{w.msg}</p>}
            </div>
          ))}
          {totalPages > 1 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "16px" }}>
              <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}
                style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid rgba(74,158,232,0.25)", background: "transparent", color: page === 0 ? "var(--color-text-mb-dim)" : "var(--color-silver-light)", cursor: page === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span style={{ fontSize: "12px", color: "var(--color-text-mb-muted)", fontFamily: "var(--font-body-mb)" }}>{page + 1} / {totalPages}</span>
              <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
                style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid rgba(74,158,232,0.25)", background: "transparent", color: page === totalPages - 1 ? "var(--color-text-mb-dim)" : "var(--color-silver-light)", cursor: page === totalPages - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
