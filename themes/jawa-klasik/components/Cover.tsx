"use client";

import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { JanurLeft, JanurRight, BatikBorder } from "./JawaOrnament";
import { useInvitation } from "../context";

export default function Cover({ guestName }: { guestName?: string }) {
  const { groom, bride, events, openingText } = useInvitation();
  const [opened, setOpened] = useState(false);
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    setTimeout(() => setReady(true), 200);
  }, []);

  const handleOpen = () => {
    setExiting(true);
    document.body.classList.remove("no-scroll");
    window.dispatchEvent(new Event("invitation-opened"));
    setTimeout(() => setOpened(true), 900);
  };

  if (opened) return null;

  const firstEvent = events[0];
  const lastEvent = events[events.length - 1];
  const dateLabel =
    firstEvent?.date === lastEvent?.date
      ? firstEvent?.date
      : `${firstEvent?.date} — ${lastEvent?.date}`;

  const coverStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    background: "var(--jawa-bg)",
    opacity: exiting ? 0 : 1,
    transform: exiting ? "translateY(-100%)" : "translateY(0)",
    transition: "all 0.9s cubic-bezier(0.65,0,0.35,1)",
  };

  const shimmerKeyframes = `
    @keyframes jawa-shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes jawa-fade-up {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;

  const nameStyle: CSSProperties = {
    fontFamily: "var(--font-jawa-script)",
    fontSize: "clamp(3rem, 11vw, 5rem)",
    lineHeight: 1.1,
    background: "linear-gradient(90deg, var(--jawa-gold) 0%, var(--jawa-gold-light) 40%, var(--jawa-gold) 60%, var(--jawa-gold-light) 100%)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: ready ? "jawa-shimmer 4s linear infinite" : "none",
    opacity: ready ? 1 : 0,
    transition: "opacity 1s ease 0.8s",
  };

  return (
    <div style={coverStyle}>
      <style>{shimmerKeyframes}</style>

      {/* Radial glow */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,160,32,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Janur Left */}
      <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", opacity: 0.85, pointerEvents: "none" }}>
        <JanurLeft />
      </div>

      {/* Janur Right */}
      <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", opacity: 0.85, pointerEvents: "none" }}>
        <JanurRight />
      </div>

      {/* Center content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 100px", maxWidth: "480px" }}>
        {/* Bismillah */}
        <p style={{
          fontFamily: "var(--font-jawa-display)",
          fontSize: "18px",
          color: "var(--jawa-gold)",
          opacity: ready ? 0.8 : 0,
          transition: "opacity 0.8s ease 0.3s",
          marginBottom: "8px",
          letterSpacing: "0.05em",
        }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </p>

        <p style={{
          fontFamily: "var(--font-jawa-body)",
          fontSize: "9px",
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          color: "var(--jawa-text-soft)",
          opacity: ready ? 1 : 0,
          transition: "opacity 0.7s ease 0.5s",
          marginBottom: "28px",
        }}>
          {openingText ?? "Undangan Pernikahan"}
        </p>

        {/* Groom name */}
        <h1 style={nameStyle}>{groom.nickname}</h1>

        <p style={{
          fontFamily: "var(--font-jawa-script)",
          fontSize: "2rem",
          color: "var(--jawa-gold)",
          opacity: ready ? 0.5 : 0,
          transition: "opacity 0.5s ease 1s",
          margin: "4px 0",
        }}>&amp;</p>

        {/* Bride name */}
        <h1 style={{ ...nameStyle, transition: "opacity 1s ease 1.1s" }}>{bride.nickname}</h1>

        {/* Date */}
        <div style={{
          marginTop: "20px",
          marginBottom: "8px",
          opacity: ready ? 1 : 0,
          transition: "opacity 0.8s ease 1.3s",
        }}>
          <div style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--jawa-gold), transparent)",
            marginBottom: "14px",
            opacity: 0.4,
          }} />
          <p style={{
            fontFamily: "var(--font-jawa-display)",
            fontSize: "13px",
            color: "var(--jawa-text-soft)",
            letterSpacing: "0.2em",
            fontWeight: 300,
          }}>
            {dateLabel}
          </p>
          <div style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--jawa-gold), transparent)",
            marginTop: "14px",
            opacity: 0.4,
          }} />
        </div>

        {/* Guest name */}
        {guestName && (
          <div style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 0.8s ease 1.5s",
            marginBottom: "24px",
            marginTop: "16px",
          }}>
            <p style={{
              fontFamily: "var(--font-jawa-body)",
              fontSize: "9px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "var(--jawa-text-muted)",
              marginBottom: "6px",
            }}>Kepada Yth.</p>
            <p style={{
              fontFamily: "var(--font-jawa-display)",
              fontSize: "16px",
              fontWeight: 500,
              color: "var(--jawa-text)",
              letterSpacing: "0.05em",
            }}>{guestName}</p>
          </div>
        )}

        {/* Button */}
        <div style={{
          opacity: ready ? 1 : 0,
          transform: ready ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.8s ease 1.8s",
          marginTop: "28px",
        }}>
          <button
            onClick={handleOpen}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 36px",
              background: "var(--jawa-red)",
              color: "var(--jawa-gold-light)",
              border: "1px solid rgba(212,160,32,0.3)",
              borderRadius: "2px",
              fontFamily: "var(--font-jawa-body)",
              fontSize: "10px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--jawa-red-light)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,160,32,0.6)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--jawa-red)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,160,32,0.3)";
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Buka Undangan
          </button>
        </div>
      </div>

      {/* Batik border at bottom */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <BatikBorder />
      </div>
    </div>
  );
}
