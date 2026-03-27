"use client";
import { useState, useEffect } from "react";
import { BotanicalTop, BotanicalDivider, FloatingPetals } from "./BotanicalOrnament";
import { useInvitation } from "../context";

export default function Cover({ onOpen, guestName }: { onOpen: () => void; guestName?: string }) {
  const { groom, bride, events, openingText } = useInvitation();
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);
  useEffect(() => {
    document.body.classList.add("no-scroll");
    setTimeout(() => setReady(true), 250);
  }, []);

  const handleOpen = () => { setExiting(true); document.body.classList.remove("no-scroll"); setTimeout(onOpen, 900); };
  const firstEvent = events[0];
  const lastEvent = events[events.length - 1];
  const dateLabel = firstEvent?.date === lastEvent?.date ? firstEvent?.date : `${firstEvent?.date} — ${lastEvent?.date}`;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden grad-yy-cover geo-yy"
      style={{ opacity: exiting ? 0 : 1, transform: exiting ? "translateY(-100%)" : "none", transition: "all 0.9s cubic-bezier(0.65,0,0.35,1)" }}>
      <FloatingPetals />

      {/* Corner botanical ornaments */}
      <div style={{ position: "absolute", top: "16px", left: "16px", opacity: 0.3, color: "var(--color-yy-forest)" }}>
        <svg viewBox="0 0 60 60" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M5 55 Q15 35 30 20 Q20 40 5 55" /><path d="M5 55 Q25 40 40 20 Q30 45 5 55" />
          <ellipse cx="22" cy="32" rx="5" ry="2.5" transform="rotate(45 22 32)" strokeWidth="0.6" />
        </svg>
      </div>
      <div style={{ position: "absolute", top: "16px", right: "16px", opacity: 0.3, color: "var(--color-yy-forest)", transform: "scaleX(-1)" }}>
        <svg viewBox="0 0 60 60" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M5 55 Q15 35 30 20 Q20 40 5 55" /><path d="M5 55 Q25 40 40 20 Q30 45 5 55" />
          <ellipse cx="22" cy="32" rx="5" ry="2.5" transform="rotate(45 22 32)" strokeWidth="0.6" />
        </svg>
      </div>
      <div style={{ position: "absolute", bottom: "16px", left: "16px", opacity: 0.3, color: "var(--color-yy-forest)", transform: "scaleY(-1)" }}>
        <svg viewBox="0 0 60 60" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M5 55 Q15 35 30 20 Q20 40 5 55" /><path d="M5 55 Q25 40 40 20 Q30 45 5 55" />
        </svg>
      </div>
      <div style={{ position: "absolute", bottom: "16px", right: "16px", opacity: 0.3, color: "var(--color-yy-forest)", transform: "scale(-1,-1)" }}>
        <svg viewBox="0 0 60 60" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M5 55 Q15 35 30 20 Q20 40 5 55" /><path d="M5 55 Q25 40 40 20 Q30 45 5 55" />
        </svg>
      </div>

      <div className="relative z-10 text-center px-8 max-w-sm">
        <div style={{ opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(15px)", transition: "all 0.8s ease 0.2s" }}>
          <BotanicalTop className="mb-4" style={{ color: "var(--color-yy-forest)" }} />
        </div>

        <p style={{ opacity: ready ? 1 : 0, transition: "all 0.6s ease 0.4s", fontFamily: "var(--font-yy-body)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.5em", color: "var(--color-yy-text-soft)", textTransform: "uppercase" as const, marginBottom: "20px" }}>
          {openingText ?? "The Wedding Of"}
        </p>

        <h1 className="shimmer-yy" style={{ fontFamily: "var(--font-yy-script)", fontSize: "clamp(3rem, 11vw, 5rem)", lineHeight: 1.1, opacity: ready ? 1 : 0, transform: ready ? "none" : "scale(0.9)", transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.6s" }}>
          {groom.nickname}
        </h1>
        <p style={{ fontFamily: "var(--font-yy-display)", fontSize: "16px", color: "var(--color-yy-forest)", opacity: ready ? 0.7 : 0, transition: "all 0.5s ease 0.85s", margin: "6px 0", fontStyle: "italic" }}>&amp;</p>
        <h1 className="shimmer-yy" style={{ fontFamily: "var(--font-yy-script)", fontSize: "clamp(3rem, 11vw, 5rem)", lineHeight: 1.1, opacity: ready ? 1 : 0, transform: ready ? "none" : "scale(0.9)", transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.95s", marginBottom: "20px" }}>
          {bride.nickname}
        </h1>

        <div style={{ opacity: ready ? 1 : 0, transition: "all 0.8s ease 1.2s" }}>
          <BotanicalDivider />
          <p style={{ fontFamily: "var(--font-yy-display)", fontSize: "14px", fontWeight: 400, letterSpacing: "0.15em", color: "var(--color-yy-text-mid)", marginBottom: "32px", fontStyle: "italic" }}>
            {dateLabel}
          </p>
        </div>

        {guestName && (
          <div style={{ opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(10px)", transition: "all 0.8s ease 1.4s", marginBottom: "28px", padding: "14px 20px", borderRadius: "12px", background: "rgba(255,255,255,0.6)", border: "1px solid rgba(196,151,90,0.2)" }}>
            <p style={{ fontFamily: "var(--font-yy-body)", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "var(--color-yy-text-muted)", marginBottom: "6px" }}>Kepada Yth.</p>
            <p style={{ fontFamily: "var(--font-yy-display)", fontSize: "17px", fontWeight: 500, color: "var(--color-yy-text)", fontStyle: "italic" }}>{guestName}</p>
          </div>
        )}

        <div style={{ opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(20px)", transition: "all 0.8s ease 1.7s" }}>
          <button onClick={handleOpen} className="btn-yy" style={{ animation: "pulse-yy 2s ease-out infinite" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            Buka Undangan
          </button>
        </div>
      </div>
    </div>
  );
}
