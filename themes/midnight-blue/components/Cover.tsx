"use client";

import { useState, useEffect } from "react";
import { useInvitation } from "../context";
import { musicRef } from "@/lib/musicRef";

function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <div key={i} style={{ position: "absolute", top: `${(i * 11 + 5) % 95}%`, left: `${(i * 7 + 3) % 92}%`, width: `${1 + (i % 2)}px`, height: `${1 + (i % 2)}px`, borderRadius: "50%", background: i % 5 === 0 ? "var(--color-blue-accent)" : "var(--color-silver-light)", animation: `float-star ${4 + (i % 5)}s ease-in-out infinite`, animationDelay: `${i * 0.3}s`, opacity: 0.3 }} />
      ))}
    </div>
  );
}

export default function Cover({ onOpen, guestName }: { onOpen: () => void; guestName?: string }) {
  const { groom, bride, events, openingText } = useInvitation();
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    setTimeout(() => setReady(true), 200);
  }, []);

  const handleOpen = () => {
    musicRef.play();
    setExiting(true);
    document.body.classList.remove("no-scroll");
    window.dispatchEvent(new Event("invitation-opened"));
    setTimeout(onOpen, 1000);
  };

  const firstEvent = events[0];
  const lastEvent = events[events.length - 1];
  const dateLabel = firstEvent?.date === lastEvent?.date ? firstEvent?.date : `${firstEvent?.date} — ${lastEvent?.date}`;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden grad-mb-cover"
      style={{ opacity: exiting ? 0 : 1, transform: exiting ? "scale(1.05)" : "scale(1)", transition: "all 1s cubic-bezier(0.65,0,0.35,1)" }}>
      <StarField />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(74,158,232,0.06) 0%, transparent 70%)" }} />

      <div className="relative z-10 text-center px-8 max-w-sm">
        {/* Top line */}
        <div style={{ opacity: ready ? 1 : 0, transition: "all 0.6s ease 0.3s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px", justifyContent: "center" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, var(--color-silver-dark))", opacity: 0.4 }} />
            <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--color-blue-accent)", opacity: 0.6 }} />
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, var(--color-silver-dark))", opacity: 0.4 }} />
          </div>
        </div>

        <p style={{ opacity: ready ? 1 : 0, transition: "all 0.6s ease 0.5s", fontFamily: "var(--font-body-mb)", fontSize: "9px", fontWeight: 400, letterSpacing: "0.6em", color: "var(--color-silver-dark)", textTransform: "uppercase" as const, marginBottom: "32px" }}>
          {openingText ?? "The Wedding Of"}
        </p>

        <h1 className="shimmer-blue" style={{ fontFamily: "var(--font-display-mb)", fontSize: "clamp(2.8rem, 11vw, 4.5rem)", fontWeight: 700, fontStyle: "italic", lineHeight: 1.05, opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(20px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.7s" }}>
          {groom.nickname}
        </h1>
        <p style={{ fontFamily: "var(--font-body-mb)", fontSize: "11px", color: "var(--color-blue-accent)", opacity: ready ? 0.7 : 0, transition: "all 0.5s ease 0.9s", margin: "12px 0", letterSpacing: "0.3em", textTransform: "uppercase" as const }}>and</p>
        <h1 className="shimmer-blue" style={{ fontFamily: "var(--font-display-mb)", fontSize: "clamp(2.8rem, 11vw, 4.5rem)", fontWeight: 700, fontStyle: "italic", lineHeight: 1.05, opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(20px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1) 1s", marginBottom: "32px" }}>
          {bride.nickname}
        </h1>

        {/* Bottom divider */}
        <div style={{ opacity: ready ? 1 : 0, transition: "all 0.8s ease 1.2s", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", justifyContent: "center", marginBottom: "16px" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, var(--color-blue-accent))", opacity: 0.3 }} />
            <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--color-blue-accent)" opacity="0.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, var(--color-blue-accent))", opacity: 0.3 }} />
          </div>
          <p style={{ fontFamily: "var(--font-display-mb)", fontSize: "13px", color: "var(--color-text-mb)", letterSpacing: "0.2em", fontWeight: 300, marginBottom: "40px" }}>
            {dateLabel}
          </p>
        </div>

        {guestName && (
          <div style={{ opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(10px)", transition: "all 0.8s ease 1.4s", marginBottom: "32px", padding: "16px 24px", borderRadius: "12px", border: "1px solid rgba(74,158,232,0.2)", background: "rgba(74,158,232,0.04)" }}>
            <p style={{ fontFamily: "var(--font-body-mb)", fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase" as const, color: "var(--color-text-mb-muted)", marginBottom: "8px" }}>Kepada Yth.</p>
            <p style={{ fontFamily: "var(--font-display-mb)", fontSize: "18px", fontWeight: 500, color: "var(--color-white-soft)", letterSpacing: "0.02em" }}>{guestName}</p>
          </div>
        )}

        <div style={{ opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(20px)", transition: "all 0.8s ease 1.7s" }}>
          <button onClick={handleOpen} className="btn-mb" style={{ animation: "pulse-blue 2s ease-out infinite" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            Buka Undangan
          </button>
        </div>
      </div>
    </div>
  );
}
