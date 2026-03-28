"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { BatikBorder, GununganDivider } from "./JawaOrnament";
import { useInvitation } from "../context";

export default function Countdown() {
  const { events } = useInvitation();
  const firstEvent = events[0];
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = firstEvent ? new Date(firstEvent.date + " 08:00:00").getTime() : 0;
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
    background: "var(--jawa-bg-card)",
    border: "1px solid var(--jawa-border)",
    borderRadius: "2px",
    width: "76px",
    height: "86px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };

  return (
    <section style={{
      background: "var(--jawa-bg-t)",
      position: "relative",
      overflow: "hidden",
    }}>
      <BatikBorder />

      {/* Glow */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,160,32,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: "640px",
        margin: "0 auto",
        padding: "100px 32px",
        textAlign: "center",
        position: "relative",
        zIndex: 2,
      }}>
        <div className="reveal-up" style={{ marginBottom: "56px" }}>
          <p style={{
            fontFamily: "var(--font-jawa-body)",
            fontSize: "9px",
            letterSpacing: "0.45em",
            textTransform: "uppercase" as const,
            color: "var(--jawa-gold)",
            marginBottom: "20px",
          }}>
            Save The Date
          </p>
          <h2 style={{
            fontFamily: "var(--font-jawa-script)",
            fontSize: "clamp(2rem, 7vw, 2.8rem)",
            color: "var(--jawa-gold-light)",
            marginBottom: "24px",
          }}>
            Menuju Hari Bahagia
          </h2>
          <GununganDivider />
        </div>

        {/* Countdown blocks */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          marginBottom: "56px",
          flexWrap: "wrap",
        }}>
          {blocks.map((b, i) => (
            <div key={b.l} className={`reveal-scale delay-${i + 2}`}>
              <div style={blockStyle}>
                {/* Corner accents */}
                <div style={{ position: "absolute", top: 4, left: 4, width: "10px", height: "10px", borderTop: "1px solid var(--jawa-gold)", borderLeft: "1px solid var(--jawa-gold)", opacity: 0.5 }} />
                <div style={{ position: "absolute", top: 4, right: 4, width: "10px", height: "10px", borderTop: "1px solid var(--jawa-gold)", borderRight: "1px solid var(--jawa-gold)", opacity: 0.5 }} />
                <div style={{ position: "absolute", bottom: 4, left: 4, width: "10px", height: "10px", borderBottom: "1px solid var(--jawa-gold)", borderLeft: "1px solid var(--jawa-gold)", opacity: 0.5 }} />
                <div style={{ position: "absolute", bottom: 4, right: 4, width: "10px", height: "10px", borderBottom: "1px solid var(--jawa-gold)", borderRight: "1px solid var(--jawa-gold)", opacity: 0.5 }} />
                <span style={{
                  fontFamily: "var(--font-jawa-display)",
                  fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
                  fontWeight: 300,
                  color: "var(--jawa-gold-light)",
                }}>
                  {String(b.v).padStart(2, "0")}
                </span>
              </div>
              <p style={{
                marginTop: "12px",
                fontFamily: "var(--font-jawa-body)",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "var(--jawa-text-muted)",
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
              border: "1px solid var(--jawa-border)",
              color: "var(--jawa-gold)",
              fontFamily: "var(--font-jawa-body)",
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase" as const,
              textDecoration: "none",
              borderRadius: "2px",
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

      <BatikBorder />
    </section>
  );
}
