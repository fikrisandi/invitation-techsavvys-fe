"use client";

import type { CSSProperties } from "react";
import { GununganDivider, BatikBorder } from "./JawaOrnament";
import { useInvitation } from "../context";
import type { Person } from "@/lib/types";

function PersonCard({ person, photoLabel }: { person: Person; photoLabel: string }) {
  const cardStyle: CSSProperties = {
    background: "var(--jawa-bg-card)",
    border: "1px solid var(--jawa-border)",
    borderRadius: "2px",
    overflow: "hidden",
    width: "100%",
  };

  const photoFrameStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    aspectRatio: "1/1",
    background: "linear-gradient(135deg, var(--jawa-bg-mid), var(--jawa-bg))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={cardStyle}>
      {/* Photo frame with batik border */}
      <div style={{ padding: "8px" }}>
        <BatikBorder />
        <div style={photoFrameStyle}>
          {person.photo ? (
            <img
              src={person.photo}
              alt={person.nickname}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{
              fontFamily: "var(--font-jawa-display)",
              color: "var(--jawa-text-muted)",
              fontSize: "12px",
            }}>
              {photoLabel}
            </span>
          )}
          {/* Gold corners */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "16px", height: "16px", borderTop: "1.5px solid var(--jawa-gold)", borderLeft: "1.5px solid var(--jawa-gold)", opacity: 0.6 }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: "16px", height: "16px", borderTop: "1.5px solid var(--jawa-gold)", borderRight: "1.5px solid var(--jawa-gold)", opacity: 0.6 }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: "16px", height: "16px", borderBottom: "1.5px solid var(--jawa-gold)", borderLeft: "1.5px solid var(--jawa-gold)", opacity: 0.6 }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "16px", height: "16px", borderBottom: "1.5px solid var(--jawa-gold)", borderRight: "1.5px solid var(--jawa-gold)", opacity: 0.6 }} />
        </div>
        <BatikBorder />
      </div>

      {/* Card content */}
      <div style={{ textAlign: "center", padding: "32px 24px 40px" }}>
        <h3 style={{
          fontFamily: "var(--font-jawa-script)",
          fontSize: "2.2rem",
          color: "var(--jawa-gold-light)",
          marginBottom: "10px",
        }}>
          {person.nickname}
        </h3>
        <p style={{
          fontFamily: "var(--font-jawa-display)",
          fontSize: "13px",
          fontStyle: "italic",
          color: "var(--jawa-text)",
          marginBottom: "16px",
          fontWeight: 400,
        }}>
          {person.fullName}
        </p>
        <div style={{
          width: "40px",
          height: "1px",
          background: "var(--jawa-gold)",
          margin: "0 auto 16px",
          opacity: 0.3,
        }} />
        <p style={{
          fontFamily: "var(--font-jawa-body)",
          fontSize: "11px",
          lineHeight: 1.9,
          color: "var(--jawa-text-soft)",
        }}>
          {person.parents}
        </p>
      </div>
    </div>
  );
}

export default function Couple({ guestName }: { guestName?: string }) {
  const { groom, bride } = useInvitation();

  return (
    <section style={{
      background: "var(--jawa-bg-mid-t)",
      padding: "100px 32px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle side accents */}
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "2px",
        background: "linear-gradient(to bottom, transparent, var(--jawa-gold), transparent)",
        opacity: 0.15,
      }} />
      <div style={{
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: "2px",
        background: "linear-gradient(to bottom, transparent, var(--jawa-gold), transparent)",
        opacity: 0.15,
      }} />

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <GununganDivider />
          <div style={{ height: "32px" }} />
          <p style={{
            fontFamily: "var(--font-jawa-body)",
            fontSize: "9px",
            letterSpacing: "0.45em",
            textTransform: "uppercase" as const,
            color: "var(--jawa-gold)",
            marginBottom: "20px",
          }}>
            Mempelai
          </p>
          <p style={{
            fontFamily: "var(--font-jawa-display)",
            fontSize: "14px",
            fontStyle: "italic",
            lineHeight: 2,
            color: "var(--jawa-text-soft)",
            maxWidth: "420px",
            margin: "0 auto",
          }}>
            Dengan memohon rahmat dan ridho Allah Subhanahu wa Ta&apos;ala, kami bermaksud mengundang{" "}
            {guestName ? (
              <>
                <br />
                <span style={{ fontFamily: "var(--font-jawa-display)", fontWeight: 600, color: "var(--jawa-text)", fontSize: "16px" }}>
                  {guestName}
                </span>
                <br />
              </>
            ) : (
              "Bapak/Ibu/Saudara/i "
            )}
            untuk menghadiri pernikahan kami.
          </p>
        </div>

        {/* Couple cards */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}>
          <div className="reveal-left delay-2" style={{ width: "100%", maxWidth: "340px" }}>
            <PersonCard person={groom} photoLabel={`Foto ${groom.nickname}`} />
          </div>

          {/* Gunungan divider */}
          <div className="reveal-scale delay-3" style={{ textAlign: "center" }}>
            <GununganDivider />
          </div>

          <div className="reveal-right delay-4" style={{ width: "100%", maxWidth: "340px" }}>
            <PersonCard person={bride} photoLabel={`Foto ${bride.nickname}`} />
          </div>
        </div>
      </div>
    </section>
  );
}
