"use client";

import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { MegaMendung, KujangIcon } from "./SundaOrnament";
import { useInvitation } from "../context";
import { musicRef } from "@/lib/musicRef";

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
    musicRef.play();
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    background: "var(--sunda-bg)",
    opacity: exiting ? 0 : 1,
    transform: exiting ? "translateY(-100%)" : "translateY(0)",
    transition: "all 0.9s cubic-bezier(0.65,0,0.35,1)",
  };

  const shimmerKeyframes = `
    @keyframes sunda-shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
  `;

  const nameStyle: CSSProperties = {
    fontFamily: "var(--font-sunda-script)",
    fontSize: "clamp(3rem, 11vw, 5rem)",
    lineHeight: 1.1,
    background: "linear-gradient(90deg, var(--sunda-gold) 0%, #E8B840 40%, var(--sunda-gold) 60%, #E8B840 100%)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: ready ? "sunda-shimmer 4s linear infinite" : "none",
    opacity: ready ? 1 : 0,
    transition: "opacity 1s ease 0.8s",
  };

  return (
    <div style={coverStyle}>
      <style>{shimmerKeyframes}</style>

      {/* Subtle glow */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(176,80,32,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* MegaMendung top */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: 0.7,
        pointerEvents: "none",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}>
        <MegaMendung />
      </div>

      {/* MegaMendung bottom (flipped) */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: 0.7,
        pointerEvents: "none",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}>
        <MegaMendung flip />
      </div>

      {/* Center content */}
      <div style={{
        position: "relative",
        zIndex: 10,
        textAlign: "center",
        padding: "20px 48px",
        maxWidth: "480px",
      }}>
        {/* Bismillah */}
        <p style={{
          fontFamily: "var(--font-sunda-display)",
          fontSize: "18px",
          color: "var(--sunda-gold)",
          opacity: ready ? 0.85 : 0,
          transition: "opacity 0.8s ease 0.3s",
          marginBottom: "6px",
          letterSpacing: "0.04em",
        }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </p>

        {/* Kujang divider */}
        <div style={{ opacity: ready ? 1 : 0, transition: "opacity 0.6s ease 0.55s", marginBottom: "16px" }}>
          <KujangIcon />
        </div>

        {/* Opening */}
        <p style={{
          fontFamily: "var(--font-sunda-body)",
          fontSize: "9px",
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          color: "var(--sunda-text-soft)",
          opacity: ready ? 1 : 0,
          transition: "opacity 0.7s ease 0.6s",
          marginBottom: "20px",
        }}>
          {openingText ?? "Babagi Kabingahan"}
        </p>

        {/* Groom name */}
        <h1 style={nameStyle}>{groom.nickname}</h1>

        <p style={{
          fontFamily: "var(--font-sunda-script)",
          fontSize: "2rem",
          color: "var(--sunda-gold)",
          opacity: ready ? 0.5 : 0,
          transition: "opacity 0.5s ease 1s",
          margin: "4px 0",
        }}>&amp;</p>

        {/* Bride name */}
        <h1 style={{ ...nameStyle, transition: "opacity 1s ease 1.1s" }}>{bride.nickname}</h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: "var(--font-sunda-display)",
          fontSize: "11px",
          fontStyle: "italic",
          color: "var(--sunda-terra)",
          opacity: ready ? 0.8 : 0,
          transition: "opacity 0.7s ease 1.2s",
          letterSpacing: "0.1em",
          marginTop: "8px",
          marginBottom: "4px",
        }}>
          Babagi Kabingahan
        </p>

        {/* Date */}
        <div style={{
          marginTop: "16px",
          marginBottom: "8px",
          opacity: ready ? 1 : 0,
          transition: "opacity 0.8s ease 1.3s",
        }}>
          <div style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--sunda-gold), transparent)",
            marginBottom: "12px",
            opacity: 0.35,
          }} />
          <p style={{
            fontFamily: "var(--font-sunda-display)",
            fontSize: "13px",
            color: "var(--sunda-text-soft)",
            letterSpacing: "0.2em",
            fontWeight: 300,
          }}>
            {dateLabel}
          </p>
          <div style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--sunda-gold), transparent)",
            marginTop: "12px",
            opacity: 0.35,
          }} />
        </div>

        {/* Guest name */}
        {guestName && (
          <div style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 0.8s ease 1.5s",
            marginBottom: "20px",
            marginTop: "14px",
          }}>
            <p style={{
              fontFamily: "var(--font-sunda-body)",
              fontSize: "9px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "var(--sunda-text-muted)",
              marginBottom: "6px",
            }}>Kepada Yth.</p>
            <p style={{
              fontFamily: "var(--font-sunda-display)",
              fontSize: "16px",
              fontWeight: 500,
              color: "var(--sunda-text)",
              letterSpacing: "0.05em",
            }}>{guestName}</p>
          </div>
        )}

        {/* Button */}
        <div style={{
          opacity: ready ? 1 : 0,
          transform: ready ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.8s ease 1.8s",
          marginTop: "24px",
        }}>
          <button
            onClick={handleOpen}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 36px",
              background: "var(--sunda-terra)",
              color: "#F5E8D0",
              border: "1px solid rgba(200,144,32,0.3)",
              borderRadius: "4px",
              fontFamily: "var(--font-sunda-body)",
              fontSize: "10px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = "#C06030";
              btn.style.borderColor = "rgba(200,144,32,0.6)";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = "var(--sunda-terra)";
              btn.style.borderColor = "rgba(200,144,32,0.3)";
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Buka Undangan
          </button>
        </div>
      </div>
    </div>
  );
}
