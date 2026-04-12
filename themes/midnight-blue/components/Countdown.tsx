"use client";

import { useEffect, useState } from "react";
import { useInvitation } from "../context";
import { parseEventDate } from "@/lib/parse-date";

export default function Countdown() {
  const { events } = useInvitation();
  const firstEvent = events[0];
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = firstEvent ? (parseEventDate(firstEvent.date)?.getTime() ?? 0) : 0;
    const tick = () => { const d = Math.max(0, target - Date.now()); setT({ d: Math.floor(d/864e5), h: Math.floor((d/36e5)%24), m: Math.floor((d/6e4)%60), s: Math.floor((d/1e3)%60) }); };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, [firstEvent]);

  const blocks = [{ v: t.d, l: "Days" }, { v: t.h, l: "Hours" }, { v: t.m, l: "Minutes" }, { v: t.s, l: "Seconds" }];

  return (
    <section className="grad-mb-alt relative overflow-hidden geo-pattern-mb">
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "140px 32px", textAlign: "center", position: "relative", zIndex: 10 }}>
        <div className="reveal-up" style={{ marginBottom: "64px" }}>
          <p style={{ letterSpacing: "0.5em", textTransform: "uppercase" as const, fontSize: "9px", fontWeight: 500, marginBottom: "24px", color: "var(--color-silver-dark)", fontFamily: "var(--font-body-mb)" }}>Save The Date</p>
          <h2 className="shimmer-silver" style={{ fontFamily: "var(--font-display-mb)", fontSize: "clamp(2rem, 6vw, 2.8rem)", fontStyle: "italic", marginBottom: "32px" }}>Counting Down</h2>
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(to right, transparent, var(--color-blue-accent), transparent)", margin: "0 auto", opacity: 0.4 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "64px" }}>
          {blocks.map((b, i) => (
            <div key={b.l} className={`reveal-scale delay-${i+2}`} style={{ textAlign: "center" }}>
              <div className="glass-mb-blue" style={{ width: "72px", height: "84px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "16px" }}>
                <span className="shimmer-blue" style={{ fontFamily: "var(--font-display-mb)", fontSize: "clamp(1.6rem, 5vw, 2.2rem)", fontWeight: 700 }}>
                  {String(b.v).padStart(2, "0")}
                </span>
              </div>
              <p style={{ marginTop: "12px", fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase" as const, fontWeight: 500, color: "var(--color-text-mb-muted)", fontFamily: "var(--font-body-mb)" }}>{b.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
