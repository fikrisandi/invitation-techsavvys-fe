"use client";

import { useInvitation } from "../context";
import { CineRule } from "./CineOrnament";
import type { Person } from "@/lib/types";

function PersonHalf({
  person,
  side,
}: {
  person: Person;
  side: "left" | "right";
}) {
  return (
    <div
      className={side === "left" ? "reveal-left" : "reveal-right"}
      style={{
        flex: "1 1 50%",
        minWidth: "280px",
        background: side === "left" ? "var(--cine-bg)" : "var(--cine-bg-mid)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 48px",
        position: "relative",
      }}
    >
      {/* Photo circle */}
      <div
        style={{
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          border: "1px solid var(--cine-border)",
          overflow: "hidden",
          marginBottom: "32px",
          background: "var(--cine-card)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.nickname}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span
            style={{
              fontFamily: "var(--font-cine-display)",
              fontStyle: "italic",
              fontSize: "3rem",
              color: "var(--cine-text-soft)",
            }}
          >
            {person.nickname.charAt(0)}
          </span>
        )}
      </div>

      {/* Nickname in script-like display */}
      <h3
        style={{
          fontFamily: "var(--font-cine-display)",
          fontStyle: "italic",
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 700,
          color: "var(--cine-text)",
          marginBottom: "12px",
          textAlign: "center",
          lineHeight: 1.1,
        }}
      >
        {person.nickname}
      </h3>

      {/* Full name */}
      <p
        style={{
          fontFamily: "var(--font-cine-display)",
          fontStyle: "italic",
          fontSize: "14px",
          fontWeight: 400,
          color: "var(--cine-gold)",
          marginBottom: "20px",
          textAlign: "center",
          letterSpacing: "0.03em",
        }}
      >
        {person.fullName}
      </p>

      <div style={{ width: "48px", height: "1px", background: "var(--cine-border)", margin: "0 auto 20px", opacity: 0.6 }} />

      {/* Parents */}
      <p
        style={{
          fontFamily: "var(--font-cine-body)",
          fontSize: "11px",
          color: "var(--cine-text-soft)",
          textAlign: "center",
          lineHeight: 1.9,
          maxWidth: "260px",
          letterSpacing: "0.02em",
        }}
      >
        {person.parents}
      </p>
    </div>
  );
}

export default function Couple() {
  const { groom, bride } = useInvitation();

  return (
    <section
      style={{
        background: "var(--cine-bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Section header */}
      <div
        className="reveal-up"
        style={{
          textAlign: "center",
          padding: "100px 32px 64px",
          background: "var(--cine-bg)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-cine-body)",
            fontSize: "8px",
            letterSpacing: "0.6em",
            textTransform: "uppercase",
            color: "var(--cine-text-soft)",
            marginBottom: "24px",
          }}
        >
          Mempelai
        </p>
        <h2
          style={{
            fontFamily: "var(--font-cine-display)",
            fontStyle: "italic",
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            fontWeight: 700,
            color: "var(--cine-text)",
            marginBottom: "24px",
          }}
        >
          Dua Jiwa, Satu Cinta
        </h2>
        <CineRule />
      </div>

      {/* True split screen */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          position: "relative",
        }}
      >
        <PersonHalf person={groom} side="left" />

        {/* Gold vertical divider */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: "1px",
            background: "linear-gradient(to bottom, transparent, var(--cine-gold), transparent)",
            opacity: 0.5,
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
        />

        <PersonHalf person={bride} side="right" />
      </div>

      <div style={{ height: "80px", background: "var(--cine-bg)" }} />
    </section>
  );
}
