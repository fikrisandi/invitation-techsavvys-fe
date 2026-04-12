"use client";

import { useEffect, useState } from "react";
import { useInvitation } from "../context";
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
        background: "var(--galaxy-bg-t)",
        padding: "120px 32px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Nebula glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 100%, rgba(139,92,246,0.12) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ marginBottom: "64px" }}>
          <p
            style={{
              fontFamily: "var(--font-galaxy-body)",
              fontSize: "8px",
              letterSpacing: "0.6em",
              textTransform: "uppercase",
              color: "var(--galaxy-text-soft)",
              marginBottom: "24px",
            }}
          >
            Save The Date
          </p>
          <h2
            style={{
              fontFamily: "var(--font-galaxy-script)",
              fontSize: "clamp(2.2rem, 7vw, 3.5rem)",
              fontWeight: 400,
              background: "linear-gradient(135deg, var(--galaxy-purple), var(--galaxy-pink))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "32px",
            }}
          >
            Menuju Hari Bahagia
          </h2>
        </div>

        {/* Dark glass countdown cards */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(12px, 3vw, 24px)",
            flexWrap: "wrap",
            marginBottom: "64px",
          }}
        >
          {blocks.map((b, i) => (
            <div
              key={b.l}
              className={`reveal-scale delay-${i + 2}`}
              style={{ textAlign: "center" }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid var(--galaxy-border)",
                  borderRadius: "16px",
                  width: "84px",
                  height: "96px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 24px rgba(139,92,246,0.1)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-galaxy-display)",
                    fontSize: "clamp(2rem, 5vw, 2.8rem)",
                    fontWeight: 300,
                    background: "linear-gradient(135deg, var(--galaxy-purple), var(--galaxy-pink))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1,
                  }}
                >
                  {String(b.v).padStart(2, "0")}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-galaxy-body)",
                  fontSize: "8px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--galaxy-text-soft)",
                  marginTop: "14px",
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
                fontFamily: "var(--font-galaxy-body)",
                fontSize: "9px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "var(--galaxy-gold)",
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
