"use client";

import { useState, useEffect } from "react";
import { useInvitation } from "../context";
import { CineRule } from "./CineOrnament";

export default function Cover() {
  const { groom, bride, events, openingText } = useInvitation();
  const [opened, setOpened] = useState(false);
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  const handleOpen = () => {
    setExiting(true);
    document.body.classList.remove("no-scroll");
    setTimeout(() => setOpened(true), 900);
  };

  if (opened) return null;

  const firstEvent = events[0];
  const lastEvent = events[events.length - 1];
  const dateLabel =
    firstEvent?.date === lastEvent?.date
      ? firstEvent?.date
      : `${firstEvent?.date} — ${lastEvent?.date}`;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--cine-bg)",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.05)" : "scale(1)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
        overflow: "hidden",
      }}
    >
      {/* Film grain overlay via layered radial gradients */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.035,
          backgroundImage: `
            radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.8) 1px, transparent 1px),
            radial-gradient(ellipse at 70% 10%, rgba(255,255,255,0.6) 1px, transparent 1px),
            radial-gradient(ellipse at 40% 80%, rgba(255,255,255,0.7) 1px, transparent 1px),
            radial-gradient(ellipse at 85% 60%, rgba(255,255,255,0.5) 1px, transparent 1px),
            radial-gradient(ellipse at 10% 60%, rgba(255,255,255,0.9) 1px, transparent 1px),
            radial-gradient(ellipse at 55% 45%, rgba(255,255,255,0.4) 1px, transparent 1px),
            radial-gradient(ellipse at 90% 90%, rgba(255,255,255,0.6) 1px, transparent 1px),
            radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "4px 4px, 6px 6px, 5px 5px, 3px 3px, 7px 7px, 4px 4px, 5px 5px, 6px 6px",
          pointerEvents: "none",
        }}
      />

      {/* Top gold line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(to right, transparent, var(--cine-gold), transparent)",
        }}
      />
      {/* Bottom gold line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(to right, transparent, var(--cine-gold), transparent)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 48px",
          maxWidth: "560px",
          width: "100%",
        }}
      >
        {/* Opening label */}
        <p
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 0.8s ease 0.3s",
            fontFamily: "var(--font-cine-body)",
            fontSize: "9px",
            letterSpacing: "0.6em",
            textTransform: "uppercase",
            color: "var(--cine-text-soft)",
            marginBottom: "48px",
          }}
        >
          {openingText ?? "The Wedding Of"}
        </p>

        {/* Groom name */}
        <h1
          style={{
            fontFamily: "var(--font-cine-display)",
            fontStyle: "italic",
            fontSize: "clamp(3.5rem, 13vw, 6.5rem)",
            fontWeight: 700,
            lineHeight: 1,
            color: "var(--cine-text)",
            opacity: ready ? 1 : 0,
            transform: ready ? "none" : "translateY(20px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.5s",
            marginBottom: "16px",
            letterSpacing: "-0.01em",
          }}
        >
          {groom.nickname}
        </h1>

        {/* Gold horizontal rule between names */}
        <div
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 0.8s ease 0.9s",
            margin: "0 auto 16px",
            width: "clamp(160px, 40vw, 260px)",
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--cine-gold), transparent)",
          }}
        />

        {/* Bride name */}
        <h1
          style={{
            fontFamily: "var(--font-cine-display)",
            fontStyle: "italic",
            fontSize: "clamp(3.5rem, 13vw, 6.5rem)",
            fontWeight: 700,
            lineHeight: 1,
            color: "var(--cine-text)",
            opacity: ready ? 1 : 0,
            transform: ready ? "none" : "translateY(20px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.7s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.7s",
            marginBottom: "40px",
            letterSpacing: "-0.01em",
          }}
        >
          {bride.nickname}
        </h1>

        {/* Date */}
        <div
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 0.8s ease 1.1s",
            marginBottom: "56px",
          }}
        >
          <CineRule />
          <p
            style={{
              fontFamily: "var(--font-cine-body)",
              fontSize: "9px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "var(--cine-gold)",
              marginTop: "20px",
              fontWeight: 500,
            }}
          >
            {dateLabel}
          </p>
        </div>

        {/* Button */}
        <div
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? "none" : "translateY(16px)",
            transition: "opacity 0.8s ease 1.4s, transform 0.8s ease 1.4s",
          }}
        >
          <button
            onClick={handleOpen}
            style={{
              fontFamily: "var(--font-cine-body)",
              fontSize: "9px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "var(--cine-text)",
              background: "transparent",
              border: "1px solid rgba(240,234,224,0.4)",
              padding: "16px 40px",
              cursor: "pointer",
              transition: "border-color 0.3s, color 0.3s, background 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--cine-gold)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--cine-gold)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(240,234,224,0.4)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--cine-text)";
            }}
          >
            Buka Undangan
          </button>
        </div>
      </div>
    </div>
  );
}
