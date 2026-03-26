"use client";
import { useState, useEffect } from "react";
import { RoseDivider } from "./FloralOrnament";
import { useInvitation } from "../context";

function pad(n: number) { return String(n).padStart(2, "0"); }

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
      setDiff({ d: Math.floor(rem / 86400000), h: Math.floor((rem % 86400000) / 3600000), m: Math.floor((rem % 3600000) / 60000), s: Math.floor((rem % 60000) / 1000) });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [mainEvent]);

  if (!mainEvent) return null;
  const units = [{ v: diff.d, label: "Hari" }, { v: diff.h, label: "Jam" }, { v: diff.m, label: "Menit" }, { v: diff.s, label: "Detik" }];

  return (
    <section style={{ background: "var(--color-rb-bg)", padding: "120px 32px" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
        <div className="reveal-up" style={{ marginBottom: "56px" }}>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase" as const, color: "var(--color-rb-text-soft)", marginBottom: "20px", fontFamily: "var(--font-rb-body)" }}>Menuju Hari Bahagia</p>
          <h2 style={{ fontFamily: "var(--font-rb-script)", fontSize: "clamp(2.2rem, 7vw, 3rem)", color: "var(--color-rb-dusty)", marginBottom: "8px" }}>Hitung Mundur</h2>
          <RoseDivider />
        </div>
        <div className="reveal-up delay-2" style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          {units.map(({ v, label }) => (
            <div key={label} className="card-rb" style={{ padding: "28px 20px", minWidth: "100px", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-rb-script)", fontSize: "clamp(2.5rem, 8vw, 3.5rem)", color: "var(--color-rb-dusty)", lineHeight: 1, marginBottom: "8px" }}>{pad(v)}</p>
              <p style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "var(--color-rb-text-soft)", fontFamily: "var(--font-rb-body)" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
