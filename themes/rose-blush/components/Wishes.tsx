"use client";
import { useState, useEffect } from "react";
import { RoseDivider } from "./FloralOrnament";
import { useInvitation } from "../context";
import { getWishes } from "@/lib/api";

interface Wish { name: string; msg: string; date: string; badge: string; }
const BC: Record<string, string> = { hadir: "#3D5A45", tidak_hadir: "#C17A8F", mungkin: "#C4975A" };
const BL: Record<string, string> = { hadir: "Hadir", tidak_hadir: "Tidak Hadir", mungkin: "Ragu" };
const PER_PAGE = 5;

export default function Wishes() {
  const { slug, wishesEnabled } = useInvitation();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (!wishesEnabled) { setLoading(false); return; }
    getWishes(slug).then((d) => { setWishes(d); setLoading(false); });
  }, [slug, wishesEnabled]);
  if (!wishesEnabled) return null;
  const totalPages = Math.max(1, Math.ceil(wishes.length / PER_PAGE));
  const visible = wishes.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <section id="wishes" style={{ background: "var(--color-rb-bg-alt-t)", padding: "120px 32px" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase" as const, color: "var(--color-rb-text-soft)", marginBottom: "20px", fontFamily: "var(--font-rb-body)" }}>Wishes</p>
          <h2 style={{ fontFamily: "var(--font-rb-script)", fontSize: "clamp(2.2rem, 7vw, 3rem)", color: "var(--color-rb-dusty)", marginBottom: "8px" }}>Ucapan &amp; Doa</h2>
          <RoseDivider />
        </div>
        <div style={{ maxWidth: "480px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "14px" }}>
          {loading && <p style={{ textAlign: "center", color: "var(--color-rb-text-soft)", fontSize: "12px" }}>Memuat ucapan...</p>}
          {!loading && wishes.length === 0 && <p style={{ textAlign: "center", color: "var(--color-rb-text-soft)", fontSize: "12px", lineHeight: 2 }}>Belum ada ucapan.</p>}
          {visible.map((w, i) => (
            <div key={`${w.name}-${i}`} className="card-rb" style={{ padding: "20px 24px", animation: "fade-in 0.4s ease" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                <div style={{ width: "34px", height: "34px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, var(--color-rb-blush), var(--color-rb-dusty))", color: "#fff", fontSize: "12px", fontWeight: 700, flexShrink: 0 }}>
                  {w.name.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <h4 style={{ color: "var(--color-rb-text)", fontSize: "13px", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "var(--font-rb-body)" }}>{w.name}</h4>
                    {w.badge && BC[w.badge] && <span style={{ flexShrink: 0, fontSize: "7px", letterSpacing: "0.1em", textTransform: "uppercase" as const, padding: "2px 8px", borderRadius: "20px", color: "white", fontWeight: 600, background: BC[w.badge] }}>{BL[w.badge]}</span>}
                  </div>
                  <span style={{ color: "var(--color-rb-text-soft)", fontSize: "10px", fontFamily: "var(--font-rb-body)" }}>{w.date}</span>
                </div>
              </div>
              {w.msg && <p style={{ color: "var(--color-rb-text)", fontSize: "12px", lineHeight: 1.9, paddingLeft: "46px", fontFamily: "var(--font-rb-body)" }}>{w.msg}</p>}
            </div>
          ))}
          {totalPages > 1 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "16px" }}>
              <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}
                style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid rgba(193,122,143,0.3)", background: "transparent", color: page === 0 ? "var(--color-rb-text-soft)" : "var(--color-rb-dusty)", cursor: page === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span style={{ fontSize: "12px", color: "var(--color-rb-text-soft)" }}>{page + 1} / {totalPages}</span>
              <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
                style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid rgba(193,122,143,0.3)", background: "transparent", color: page === totalPages - 1 ? "var(--color-rb-text-soft)" : "var(--color-rb-dusty)", cursor: page === totalPages - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
