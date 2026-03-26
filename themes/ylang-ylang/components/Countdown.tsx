"use client";
import { useEffect, useState } from "react";
import { BotanicalDivider } from "./BotanicalOrnament";
import { useInvitation } from "../context";

export default function Countdown() {
  const { events } = useInvitation();
  const firstEvent = events[0];
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const target = firstEvent ? new Date(firstEvent.date + " 08:00:00").getTime() : 0;
    const tick = () => { const d = Math.max(0, target - Date.now()); setT({ d: Math.floor(d/864e5), h: Math.floor((d/36e5)%24), m: Math.floor((d/6e4)%60), s: Math.floor((d/1e3)%60) }); };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, [firstEvent]);
  const blocks = [{ v: t.d, l: "Hari" }, { v: t.h, l: "Jam" }, { v: t.m, l: "Menit" }, { v: t.s, l: "Detik" }];

  return (
    <section className="grad-yy-alt relative overflow-hidden geo-yy">
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "140px 32px", textAlign: "center" }}>
        <div className="reveal-up" style={{ marginBottom: "56px" }}>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase" as const, color: "var(--color-yy-text-soft)", marginBottom: "20px", fontFamily: "var(--font-yy-body)" }}>Save The Date</p>
          <h2 style={{ fontFamily: "var(--font-yy-script)", fontSize: "clamp(2.2rem, 7vw, 3rem)", color: "var(--color-yy-forest)", marginBottom: "8px" }}>Menuju Hari Bahagia</h2>
          <BotanicalDivider />
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "56px" }}>
          {blocks.map((b, i) => (
            <div key={b.l} className={`reveal-scale delay-${i+2}`} style={{ textAlign: "center" }}>
              <div className="card-yy-gold" style={{ width: "76px", height: "88px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "16px" }}>
                <span className="shimmer-yy" style={{ fontFamily: "var(--font-yy-display)", fontSize: "clamp(1.7rem, 5vw, 2.3rem)", fontWeight: 300 }}>
                  {String(b.v).padStart(2, "0")}
                </span>
              </div>
              <p style={{ marginTop: "12px", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, fontWeight: 700, color: "var(--color-yy-text-soft)", fontFamily: "var(--font-yy-body)" }}>{b.l}</p>
            </div>
          ))}
        </div>
        <div className="reveal-up delay-7">
          <a href="#" className="btn-yy-outline">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Simpan ke Kalender
          </a>
        </div>
      </div>
    </section>
  );
}
