"use client";

import { useState, useEffect } from "react";
import { GoldDivider } from "./FloralOrnament";
import Particles from "./Particles";
import { useInvitation } from "../context";
import { getWishes } from "@/lib/api";

interface Wish { name: string; msg: string; date: string; badge: string; }
const BC: Record<string, string> = { hadir: "#4A9E6B", tidak_hadir: "#D44444", mungkin: "#D4A853" };
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
    <section id="wishes" className="grad-wishes relative overflow-hidden geo-pattern">
      <Particles count={15} />
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "140px 32px", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ letterSpacing: "0.5em", textTransform: "uppercase" as const, fontSize: "9px", fontWeight: 500, marginBottom: "24px", color: "var(--color-gold-dark)" }}>Wishes</p>
          <h2 style={{ fontFamily: "var(--font-script)", fontSize: "clamp(2.2rem, 7vw, 3rem)", marginBottom: "16px", color: "var(--color-gold-light)" }}>Ucapan &amp; Doa</h2>
          <GoldDivider />
        </div>
        <div style={{ maxWidth: "480px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
          {loading && <p style={{ textAlign: "center", color: "var(--color-text-muted)", fontSize: "12px" }}>Memuat ucapan...</p>}
          {!loading && wishes.length === 0 && (
            <p style={{ textAlign: "center", color: "var(--color-text-muted)", fontSize: "12px", lineHeight: 2 }}>Belum ada ucapan. Jadilah yang pertama!</p>
          )}
          {visible.map((w, i) => (
            <div key={`${w.name}-${i}`} className="glass rounded-2xl" style={{ padding: "24px 28px", animation: "fade-in 0.4s ease" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))", color: "var(--color-emerald-deep)", fontSize: "13px", fontWeight: 500, flexShrink: 0 }}>
                  {w.name.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <h4 style={{ color: "var(--color-cream)", fontSize: "13px", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{w.name}</h4>
                    {w.badge && BC[w.badge] && (
                      <span style={{ flexShrink: 0, fontSize: "7px", letterSpacing: "0.1em", textTransform: "uppercase" as const, padding: "2px 8px", borderRadius: "20px", color: "white", fontWeight: 500, background: BC[w.badge] }}>{BL[w.badge]}</span>
                    )}
                  </div>
                  <span style={{ color: "var(--color-text-dim)", fontSize: "10px" }}>{w.date}</span>
                </div>
              </div>
              {w.msg && <p style={{ color: "var(--color-text-light)", fontSize: "12px", lineHeight: 1.9, paddingLeft: "48px" }}>{w.msg}</p>}
            </div>
          ))}
          {totalPages > 1 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "16px" }}>
              <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}
                style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid rgba(212,168,83,0.3)", background: "transparent", color: page === 0 ? "var(--color-text-dim)" : "var(--color-gold-light)", cursor: page === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span style={{ fontSize: "12px", color: "var(--color-text-muted)", letterSpacing: "0.1em" }}>{page + 1} / {totalPages}</span>
              <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
                style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid rgba(212,168,83,0.3)", background: "transparent", color: page === totalPages - 1 ? "var(--color-text-dim)" : "var(--color-gold-light)", cursor: page === totalPages - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
