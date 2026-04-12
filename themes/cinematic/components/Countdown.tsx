"use client";

import { useEffect, useState } from "react";
import { useInvitation } from "../context";
import { CineRule } from "./CineOrnament";
import { parseEventDate } from "@/lib/parse-date";

export default function Countdown() {
  const { events } = useInvitation();
  const firstEvent = events[0];
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const raw = firstEvent?.date ?? "";
    const target = raw ? (parseEventDate(raw)?.getTime() ?? 0) : 0;
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setT({
        d: Math.floor(diff / 864e5),
        h: Math.floor((diff / 36e5) % 24),
        m: Math.floor((diff / 6e4) % 60),
        s: Math.floor((diff / 1e3) % 60),
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

  return (
    <section
      style={{
        background: "var(--cine-bg-mid-t)",
        padding: "120px 32px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top rule */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(to right, transparent, var(--cine-gold), transparent)",
          opacity: 0.3,
        }}
      />
      {/* Bottom rule */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(to right, transparent, var(--cine-gold), transparent)",
          opacity: 0.3,
        }}
      />

      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div className="reveal-up" style={{ marginBottom: "64px" }}>
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
            Save The Date
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
            Menuju Hari Bahagia
          </h2>
          <CineRule />
        </div>

        {/* Countdown numbers — very large */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(16px, 4vw, 48px)",
            flexWrap: "wrap",
            marginBottom: "64px",
          }}
        >
          {blocks.map((b, i) => (
            <div
              key={b.l}
              className={`reveal-scale delay-${i + 2}`}
              style={{ textAlign: "center", minWidth: "64px" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-cine-display)",
                  fontSize: "clamp(3rem, 10vw, 5.5rem)",
                  fontWeight: 300,
                  color: "var(--cine-text)",
                  lineHeight: 1,
                  marginBottom: "16px",
                  letterSpacing: "-0.02em",
                }}
              >
                {String(b.v).padStart(2, "0")}
              </div>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  background: "linear-gradient(to right, transparent, var(--cine-gold), transparent)",
                  marginBottom: "12px",
                  opacity: 0.5,
                }}
              />
              <p
                style={{
                  fontFamily: "var(--font-cine-body)",
                  fontSize: "7px",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "var(--cine-text-soft)",
                  fontWeight: 500,
                }}
              >
                {b.l}
              </p>
            </div>
          ))}
        </div>

        {firstEvent && (
          <div className="reveal-up delay-7">
            <p
              style={{
                fontFamily: "var(--font-cine-body)",
                fontSize: "9px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "var(--cine-gold)",
                fontWeight: 500,
              }}
            >
              {firstEvent.date}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
