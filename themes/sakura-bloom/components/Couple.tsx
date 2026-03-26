"use client";
import { useInvitation } from "../context";
import { SakuraDivider } from "./SakuraEffect";
import type { Person } from "@/lib/types";

function PersonCard({ person, role }: { person: Person; role: string }) {
  return (
    <div
      className="reveal-scale"
      style={{
        flex: "1 1 280px",
        maxWidth: "340px",
        background: "var(--sakura-bg)",
        border: "1px solid var(--sakura-border)",
        borderRadius: "4px",
        padding: "40px 28px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Pink top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(to right, var(--sakura-pink-dark), var(--sakura-pink-light), var(--sakura-pink-dark))",
        }}
      />

      {/* Gradient border glow effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "4px",
          background:
            "linear-gradient(135deg, rgba(212,112,138,0.08) 0%, transparent 50%, rgba(212,112,138,0.05) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Photo */}
      <div
        style={{
          width: "120px",
          height: "120px",
          margin: "0 auto 24px",
          borderRadius: "50%",
          padding: "4px",
          background: "linear-gradient(135deg, var(--sakura-pink) 0%, var(--sakura-gold) 50%, var(--sakura-pink-light) 100%)",
          boxShadow: "0 8px 32px rgba(212,112,138,0.3)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            overflow: "hidden",
            background: "var(--sakura-bg-deep)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid rgba(253,248,249,0.8)",
          }}
        >
          {person.photo ? (
            <img
              src={person.photo}
              alt={person.fullName}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" fill="var(--sakura-pink-light)" />
              <path
                d="M4 20c0-4 3.582-7 8-7s8 3 8 7"
                stroke="var(--sakura-pink)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Role label */}
      <p
        style={{
          fontSize: "8px",
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color: "var(--sakura-pink)",
          fontFamily: "var(--font-sakura-body)",
          fontWeight: 700,
          marginBottom: "10px",
        }}
      >
        {role}
      </p>

      {/* Full name */}
      <h3
        style={{
          fontFamily: "var(--font-sakura-display)",
          fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
          color: "var(--sakura-text)",
          fontWeight: 600,
          marginBottom: "6px",
          letterSpacing: "0.02em",
        }}
      >
        {person.fullName}
      </h3>

      {/* Nickname in script */}
      <p
        style={{
          fontFamily: "var(--font-sakura-script)",
          fontSize: "clamp(1.4rem, 4vw, 1.8rem)",
          color: "var(--sakura-pink)",
          marginBottom: "16px",
          lineHeight: 1.2,
        }}
      >
        {person.nickname}
      </p>

      {/* Thin line */}
      <div
        style={{
          width: "40px",
          height: "1px",
          background: "var(--sakura-pink)",
          margin: "0 auto 14px",
          opacity: 0.4,
        }}
      />

      {/* Parents */}
      <p
        style={{
          fontSize: "11px",
          color: "var(--sakura-text-soft)",
          fontFamily: "var(--font-sakura-body)",
          lineHeight: 1.8,
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
      id="couple"
      style={{
        background: "var(--sakura-bg-alt)",
        padding: "120px 32px",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "var(--sakura-text-soft)",
              marginBottom: "20px",
              fontFamily: "var(--font-sakura-body)",
            }}
          >
            Mempelai
          </p>
          <h2
            style={{
              fontFamily: "var(--font-sakura-script)",
              fontSize: "clamp(2.2rem, 7vw, 3.2rem)",
              color: "var(--sakura-pink)",
              marginBottom: "8px",
            }}
          >
            Sepasang Jiwa
          </h2>
          <SakuraDivider />
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "32px",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          <PersonCard person={groom} role="Mempelai Pria" />

          {/* Center ornament */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "60px",
              padding: "20px 0",
            }}
          >
            <div
              style={{
                width: "1px",
                flex: 1,
                background: "linear-gradient(to bottom, transparent, var(--sakura-border), transparent)",
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-sakura-script)",
                fontSize: "2.5rem",
                color: "var(--sakura-gold)",
                padding: "16px 0",
                lineHeight: 1,
              }}
            >
              &amp;
            </p>
            <div
              style={{
                width: "1px",
                flex: 1,
                background: "linear-gradient(to bottom, transparent, var(--sakura-border), transparent)",
              }}
            />
          </div>

          <PersonCard person={bride} role="Mempelai Wanita" />
        </div>
      </div>
    </section>
  );
}
