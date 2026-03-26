"use client";

import { useState, useEffect } from "react";
import { useInvitation } from "../context";
import StarField from "./StarField";

export default function Cover() {
  const { groom, bride, events, openingText } = useInvitation();
  const [opened, setOpened] = useState(false);
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    const t = setTimeout(() => setReady(true), 300);
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
        background: "var(--galaxy-bg)",
        overflow: "hidden",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "translateY(-100%)" : "translateY(0)",
        transition: "opacity 0.8s ease, transform 0.9s cubic-bezier(0.65,0,0.35,1)",
      }}
    >
      {/* Star field background */}
      <StarField />

      {/* Nebula center glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70vw",
          height: "70vh",
          background: "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 40px",
          maxWidth: "560px",
          width: "100%",
        }}
      >
        {/* Opening */}
        <p
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 0.8s ease 0.4s",
            fontFamily: "var(--font-galaxy-body)",
            fontSize: "9px",
            letterSpacing: "0.6em",
            textTransform: "uppercase",
            color: "var(--galaxy-text-soft)",
            marginBottom: "40px",
          }}
        >
          {openingText ?? "The Wedding Of"}
        </p>

        {/* Groom name — Great Vibes script */}
        <h1
          style={{
            fontFamily: "var(--font-galaxy-script)",
            fontSize: "clamp(3.5rem, 14vw, 7rem)",
            fontWeight: 400,
            lineHeight: 1.05,
            background: "linear-gradient(135deg, var(--galaxy-text) 30%, var(--galaxy-pink) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            opacity: ready ? 1 : 0,
            transform: ready ? "none" : "translateY(24px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.5s",
            marginBottom: "8px",
          }}
        >
          {groom.nickname}
        </h1>

        {/* Ampersand */}
        <p
          style={{
            fontFamily: "var(--font-galaxy-display)",
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            color: "var(--galaxy-purple)",
            opacity: ready ? 0.8 : 0,
            transition: "opacity 0.6s ease 0.85s",
            marginBottom: "8px",
            fontStyle: "italic",
          }}
        >
          &amp;
        </p>

        {/* Bride name */}
        <h1
          style={{
            fontFamily: "var(--font-galaxy-script)",
            fontSize: "clamp(3.5rem, 14vw, 7rem)",
            fontWeight: 400,
            lineHeight: 1.05,
            background: "linear-gradient(135deg, var(--galaxy-pink) 0%, var(--galaxy-text) 70%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            opacity: ready ? 1 : 0,
            transform: ready ? "none" : "translateY(24px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.7s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.7s",
            marginBottom: "40px",
          }}
        >
          {bride.nickname}
        </h1>

        {/* Divider */}
        <div
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 0.8s ease 1s",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              maxWidth: "280px",
              margin: "0 auto 20px",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "var(--galaxy-purple)", opacity: 0.4 }} />
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--galaxy-purple)", opacity: 0.7 }} />
            <div style={{ flex: 1, height: "1px", background: "var(--galaxy-purple)", opacity: 0.4 }} />
          </div>
          <p
            style={{
              fontFamily: "var(--font-galaxy-body)",
              fontSize: "9px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "var(--galaxy-gold)",
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
            transition: "opacity 0.8s ease 1.3s, transform 0.8s ease 1.3s",
          }}
        >
          <button
            onClick={handleOpen}
            style={{
              fontFamily: "var(--font-galaxy-body)",
              fontSize: "9px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "white",
              background: "linear-gradient(135deg, var(--galaxy-purple), #6D28D9)",
              border: "none",
              padding: "16px 40px",
              cursor: "pointer",
              transition: "opacity 0.3s, transform 0.3s",
              boxShadow: "0 4px 32px rgba(139,92,246,0.4)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "1";
              (e.currentTarget as HTMLButtonElement).style.transform = "none";
            }}
          >
            Buka Undangan
          </button>
        </div>
      </div>
    </div>
  );
}
