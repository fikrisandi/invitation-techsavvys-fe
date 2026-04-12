"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { MegaMendung, KujangIcon } from "./SundaOrnament";
import { useInvitation } from "../context";
import { parseEventDate } from "@/lib/parse-date";

export default function Countdown() {
  const { events } = useInvitation();
  const firstEvent = events[0];
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = firstEvent ? (parseEventDate(firstEvent.date)?.getTime() ?? 0) : 0;
    const tick = () => {
      const d = Math.max(0, target - Date.now());
      setT({
        d: Math.floor(d / 864e5),
        h: Math.floor((d / 36e5) % 24),
        m: Math.floor((d / 6e4) % 60),
        s: Math.floor((d / 1e3) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [firstEvent]);

  const blocks = [
    { v: t.d, l: "Hari" },
    { v: t.h, l: "Jam" },
    { v: t.m, l: "Menit" },
    { v: t.s, l: "Detik" },
  ];

  const calUrl = firstEvent
    ? `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan&dates=${firstEvent.date.replace(/[^0-9]/g, "").slice(0, 8)}T010000Z/${firstEvent.date.replace(/[^0-9]/g, "").slice(0, 8)}T070000Z`
    : "#";

  const blockStyle: CSSProperties = {
    background: "rgba(200,144,32,0.04)",
    border: "1px solid var(--sunda-border)",
    borderRadius: "4px",
    width: "76px",
    height: "86px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  };

  return (
    <section style={{
      background: "var(--sunda-bg-alt)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Top mega mendung */}
      <div style={{ display: "flex", justifyContent: "center", opacity: 0.4 }}>
        <MegaMendung />
      </div>

      {/* Terracotta accent side */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        width: "3px",
        background: "linear-gradient(to bottom, transparent, var(--sunda-terra), transparent)",
        opacity: 0.2,
      }} />

      <div style={{
        maxWidth: "640px",
        margin: "0 auto",
        padding: "80px 32px 100px",
        textAlign: "center",
        position: "relative",
        zIndex: 2,
      }}>
        <div className="reveal-up" style={{ marginBottom: "56px" }}>
          <p style={{
            fontFamily: "var(--font-sunda-body)",
            fontSize: "9px",
            letterSpacing: "0.45em",
            textTransform: "uppercase" as const,
            color: "var(--sunda-gold)",
            marginBottom: "16px",
          }}>
            Save The Date
          </p>
          <h2 style={{
            fontFamily: "var(--font-sunda-script)",
            fontSize: "clamp(2rem, 7vw, 2.8rem)",
            color: "var(--sunda-text)",
            marginBottom: "16px",
          }}>
            Menuju Hari Bahagia
          </h2>
          <KujangIcon />
        </div>

        {/* Countdown blocks */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "14px",
          marginBottom: "56px",
          flexWrap: "wrap",
        }}>
          {blocks.map((b, i) => (
            <div key={b.l} className={`reveal-scale delay-${i + 2}`}>
              <div style={blockStyle}>
                {/* Terracotta bottom accent */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(to right, var(--sunda-terra), var(--sunda-gold))",
                  opacity: 0.5,
                }} />
                <span style={{
                  fontFamily: "var(--font-sunda-display)",
                  fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
                  fontWeight: 300,
                  color: "var(--sunda-gold)",
                }}>
                  {String(b.v).padStart(2, "0")}
                </span>
              </div>
              <p style={{
                marginTop: "12px",
                fontFamily: "var(--font-sunda-body)",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "var(--sunda-text-muted)",
              }}>
                {b.l}
              </p>
            </div>
          ))}
        </div>

        {/* Calendar link */}
        <div className="reveal-up delay-7">
          <a
            href={calUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 28px",
              border: "1px solid var(--sunda-border)",
              color: "var(--sunda-gold)",
              fontFamily: "var(--font-sunda-body)",
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase" as const,
              textDecoration: "none",
              borderRadius: "4px",
              transition: "all 0.3s ease",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Simpan ke Kalender
          </a>
        </div>
      </div>

      {/* Bottom mega mendung */}
      <div style={{ display: "flex", justifyContent: "center", opacity: 0.4 }}>
        <MegaMendung flip />
      </div>
    </section>
  );
}
