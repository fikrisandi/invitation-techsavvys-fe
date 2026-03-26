"use client";

import { useEffect, useState } from "react";
import { GoldDivider } from "./FloralOrnament";
import { useInvitation } from "../context";

export default function Countdown() {
  const { events } = useInvitation();
  const firstEvent = events[0];
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = firstEvent ? new Date(firstEvent.date + " 08:00:00").getTime() : 0;
    const tick = () => {
      const d = Math.max(0, target - Date.now());
      setT({ d: Math.floor(d/864e5), h: Math.floor((d/36e5)%24), m: Math.floor((d/6e4)%60), s: Math.floor((d/1e3)%60) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [firstEvent]);

  const blocks = [{ v: t.d, l: "Hari" }, { v: t.h, l: "Jam" }, { v: t.m, l: "Menit" }, { v: t.s, l: "Detik" }];

  const calUrl = firstEvent
    ? `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan&dates=${firstEvent.date.replace(/[^0-9]/g, "").slice(0,8)}T010000Z/${firstEvent.date.replace(/[^0-9]/g, "").slice(0,8)}T070000Z`
    : "#";

  return (
    <section className="grad-alt relative overflow-hidden">
      <div className="absolute inset-0 geo-pattern" />
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "140px 32px", textAlign: "center", position: "relative", zIndex: 10 }}>
        <div className="reveal-up" style={{ marginBottom: "64px" }}>
          <p style={{ letterSpacing: "0.5em", textTransform: "uppercase" as const, fontSize: "9px", fontWeight: 500, marginBottom: "24px", color: "var(--color-gold-dark)" }}>Save The Date</p>
          <h2 style={{ fontFamily: "var(--font-script)", fontSize: "clamp(2.2rem, 7vw, 3rem)", marginBottom: "24px", color: "var(--color-gold-light)" }}>Menuju Hari Bahagia</h2>
          <GoldDivider />
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "64px" }}>
          {blocks.map((b, i) => (
            <div key={b.l} className={`reveal-scale delay-${i+2}`}>
              <div className="glass-gold" style={{ borderRadius: "16px", width: "80px", height: "90px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 5vw, 2.4rem)", fontWeight: 300, color: "var(--color-gold-light)" }}>
                  {String(b.v).padStart(2, "0")}
                </span>
              </div>
              <p style={{ marginTop: "16px", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, fontWeight: 500, color: "var(--color-text-muted)" }}>{b.l}</p>
            </div>
          ))}
        </div>
        <div className="reveal-up delay-7">
          <a href={calUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Simpan ke Kalender
          </a>
        </div>
      </div>
    </section>
  );
}
