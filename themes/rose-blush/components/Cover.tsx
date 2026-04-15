"use client";
import { useState, useEffect } from "react";
import { FloralCorner } from "./FloralOrnament";
import { useInvitation } from "../context";
import { musicRef } from "@/lib/musicRef";

export default function Cover({ guestName }: { guestName?: string }) {
  const { groom, bride, events } = useInvitation();
  const [opened, setOpened] = useState(false);
  const mainEvent = events[0];

  useEffect(() => {
    document.body.classList.add("no-scroll");
  }, []);

  const handleOpen = () => {
    musicRef.play();
    document.body.classList.remove("no-scroll");
    window.dispatchEvent(new Event("invitation-opened"));
    setOpened(true);
  };

  if (opened) return null;

  return (
    <div className="theme-rb-cover" style={{
      position: "fixed", inset: 0, zIndex: 500,
      background: "var(--color-rb-bg)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 24px", textAlign: "center",
      overflow: "hidden",
    }}>
      <FloralCorner position="tl" />
      <FloralCorner position="tr" />
      <FloralCorner position="bl" />
      <FloralCorner position="br" />

      {/* Top label */}
      <p style={{ fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase" as const, color: "var(--color-rb-text-soft)", fontFamily: "var(--font-rb-body)", marginBottom: "32px" }}>
        The Wedding Of
      </p>

      {/* Names */}
      <h1 style={{ fontFamily: "var(--font-rb-script)", fontSize: "clamp(3rem, 10vw, 5rem)", color: "var(--color-rb-dusty)", lineHeight: 1.05, marginBottom: "4px" }}>
        {groom.nickname}
      </h1>
      <p style={{ fontFamily: "var(--font-rb-display)", fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)", color: "var(--color-rb-text-soft)", letterSpacing: "0.35em", textTransform: "uppercase" as const, marginBottom: "4px" }}>&amp;</p>
      <h1 style={{ fontFamily: "var(--font-rb-script)", fontSize: "clamp(3rem, 10vw, 5rem)", color: "var(--color-rb-dusty)", lineHeight: 1.05, marginBottom: "32px" }}>
        {bride.nickname}
      </h1>

      {/* Date */}
      {mainEvent && (
        <p style={{ fontFamily: "var(--font-rb-display)", fontSize: "11px", letterSpacing: "0.25em", color: "var(--color-rb-text-mid)", marginBottom: "40px", textTransform: "uppercase" as const }}>
          {mainEvent.date}
        </p>
      )}

      {/* Guest */}
      {guestName && (
        <div style={{ marginBottom: "32px" }}>
          <p style={{ fontSize: "9px", letterSpacing: "0.3em", color: "var(--color-rb-text-soft)", fontFamily: "var(--font-rb-body)", marginBottom: "6px" }}>Kepada Yth.</p>
          <p style={{ fontFamily: "var(--font-rb-display)", fontSize: "clamp(1rem, 3vw, 1.2rem)", color: "var(--color-rb-dusty)", fontStyle: "italic" }}>{guestName}</p>
        </div>
      )}

      {/* Open button */}
      <button
        onClick={handleOpen}
        style={{
          padding: "14px 40px", borderRadius: "40px",
          background: "var(--color-rb-dusty)",
          color: "#fff", border: "none", cursor: "pointer",
          fontFamily: "var(--font-rb-body)", fontSize: "10px",
          letterSpacing: "0.3em", textTransform: "uppercase" as const,
          fontWeight: 600, transition: "all 0.3s ease",
          boxShadow: "0 4px 20px rgba(193,122,143,0.35)",
        }}
      >
        Buka Undangan
      </button>
    </div>
  );
}
