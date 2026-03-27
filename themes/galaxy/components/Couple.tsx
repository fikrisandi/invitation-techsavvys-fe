"use client";

import { useInvitation } from "../context";
import type { Person } from "@/lib/types";

function PersonCard({ person }: { person: Person }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid var(--galaxy-border)",
        borderRadius: "24px",
        overflow: "hidden",
        flex: "1 1 280px",
        maxWidth: "340px",
        boxShadow: "0 8px 40px rgba(139,92,246,0.15)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Photo circle */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "40px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            width: "130px",
            height: "130px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid var(--galaxy-purple)",
            boxShadow: "0 0 24px rgba(139,92,246,0.4), 0 0 48px rgba(139,92,246,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(139,92,246,0.1)",
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
                fontFamily: "var(--font-galaxy-script)",
                fontSize: "3rem",
                color: "var(--galaxy-purple)",
              }}
            >
              {person.nickname.charAt(0)}
            </span>
          )}
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "0 32px 40px" }}>
        <h3
          style={{
            fontFamily: "var(--font-galaxy-script)",
            fontSize: "2.6rem",
            fontWeight: 400,
            color: "var(--galaxy-text)",
            marginBottom: "10px",
            lineHeight: 1.1,
          }}
        >
          {person.nickname}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-galaxy-display)",
            fontStyle: "italic",
            fontSize: "14px",
            color: "var(--galaxy-purple)",
            marginBottom: "16px",
            letterSpacing: "0.03em",
          }}
        >
          {person.fullName}
        </p>
        <div
          style={{
            width: "40px",
            height: "1px",
            background: "var(--galaxy-purple)",
            margin: "0 auto 16px",
            opacity: 0.5,
          }}
        />
        <p
          style={{
            fontFamily: "var(--font-galaxy-body)",
            fontSize: "11px",
            color: "var(--galaxy-text-soft)",
            lineHeight: 1.9,
          }}
        >
          {person.parents}
        </p>
      </div>
    </div>
  );
}

export default function Couple() {
  const { groom, bride } = useInvitation();

  return (
    <section
      style={{
        background: "var(--galaxy-bg-mid)",
        padding: "120px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Nebula accent */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "72px" }}>
          <p
            style={{
              fontFamily: "var(--font-galaxy-body)",
              fontSize: "9px",
              letterSpacing: "0.6em",
              textTransform: "uppercase",
              color: "var(--galaxy-text-soft)",
              marginBottom: "24px",
            }}
          >
            Mempelai
          </p>
          <h2
            style={{
              fontFamily: "var(--font-galaxy-script)",
              fontSize: "clamp(2.5rem, 7vw, 4rem)",
              fontWeight: 400,
              background: "linear-gradient(135deg, var(--galaxy-text), var(--galaxy-purple))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "32px",
            }}
          >
            Dua Jiwa Satu Cinta
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              maxWidth: "280px",
              margin: "0 auto",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "var(--galaxy-purple)", opacity: 0.4 }} />
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--galaxy-purple)", opacity: 0.7 }} />
            <div style={{ flex: 1, height: "1px", background: "var(--galaxy-purple)", opacity: 0.4 }} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px",
          }}
        >
          <div className="reveal-left delay-2">
            <PersonCard person={groom} />
          </div>

          <div
            className="reveal-scale delay-3"
            style={{ textAlign: "center" }}
          >
            <span
              style={{
                fontFamily: "var(--font-galaxy-script)",
                fontSize: "3rem",
                color: "var(--galaxy-pink)",
                opacity: 0.6,
              }}
            >
              &amp;
            </span>
          </div>

          <div className="reveal-right delay-4">
            <PersonCard person={bride} />
          </div>
        </div>
      </div>
    </section>
  );
}
