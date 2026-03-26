"use client";
import { useState, useEffect } from "react";
import { useInvitation } from "../context";
import { SakuraDivider } from "./SakuraEffect";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Countdown() {
  const { events } = useInvitation();
  const mainEvent = events[0];
  const [diff, setDiff] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    if (!mainEvent) return;
    const target = new Date(mainEvent.date + " " + (mainEvent.time ?? "00:00")).getTime();
    const calc = () => {
      const now = Date.now();
      const rem = Math.max(0, target - now);
      setDiff({
        d: Math.floor(rem / 86400000),
        h: Math.floor((rem % 86400000) / 3600000),
        m: Math.floor((rem % 3600000) / 60000),
        s: Math.floor((rem % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [mainEvent]);

  if (!mainEvent) return null;

  const units = [
    { v: diff.d, label: "Hari" },
    { v: diff.h, label: "Jam" },
    { v: diff.m, label: "Menit" },
    { v: diff.s, label: "Detik" },
  ];

  return (
    <section
      style={{
        background: "var(--sakura-bg)",
        padding: "120px 32px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <div className="reveal-up" style={{ marginBottom: "56px" }}>
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
            Menuju Hari Bahagia
          </p>
          <h2
            style={{
              fontFamily: "var(--font-sakura-script)",
              fontSize: "clamp(2.2rem, 7vw, 3.2rem)",
              color: "var(--sakura-pink)",
              marginBottom: "8px",
            }}
          >
            Hitung Mundur
          </h2>
          <SakuraDivider />
        </div>

        <div
          className="reveal-up"
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {units.map(({ v, label }) => (
            <div
              key={label}
              style={{
                position: "relative",
                padding: "32px 20px",
                minWidth: "110px",
                textAlign: "center",
                background: "var(--sakura-bg)",
                border: "1px solid var(--sakura-border)",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              {/* Top accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "20%",
                  right: "20%",
                  height: "2px",
                  background: "linear-gradient(to right, transparent, var(--sakura-pink), transparent)",
                }}
              />
              {/* Corner dots */}
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  left: "8px",
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "var(--sakura-pink)",
                  opacity: 0.4,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "var(--sakura-pink)",
                  opacity: 0.4,
                }}
              />

              <p
                style={{
                  fontFamily: "var(--font-sakura-display)",
                  fontSize: "clamp(2.5rem, 8vw, 3.5rem)",
                  color: "var(--sakura-pink)",
                  lineHeight: 1,
                  marginBottom: "10px",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                }}
              >
                {pad(v)}
              </p>
              <p
                style={{
                  fontSize: "8px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--sakura-text-soft)",
                  fontFamily: "var(--font-sakura-body)",
                  fontWeight: 600,
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Event date reminder */}
        <div className="reveal-up" style={{ marginTop: "40px" }}>
          <p
            style={{
              fontFamily: "var(--font-sakura-display)",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              color: "var(--sakura-text-muted)",
              fontStyle: "italic",
            }}
          >
            {mainEvent.date} &mdash; {mainEvent.location}
          </p>
        </div>
      </div>
    </section>
  );
}
