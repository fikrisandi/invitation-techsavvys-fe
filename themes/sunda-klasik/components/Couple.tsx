"use client";

import type { CSSProperties } from "react";
import { SundaDivider, KujangIcon } from "./SundaOrnament";
import { useInvitation } from "../context";
import type { Person } from "@/lib/types";

function PersonCard({ person, photoLabel }: { person: Person; photoLabel: string }) {
  const cardStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "24px",
    background: "rgba(200,144,32,0.04)",
    border: "1px solid var(--sunda-border)",
    borderRadius: "4px",
    overflow: "hidden",
    padding: "24px",
    width: "100%",
  };

  const photoStyle: CSSProperties = {
    position: "relative",
    flexShrink: 0,
    width: "120px",
    height: "120px",
    borderRadius: "4px",
    overflow: "hidden",
    border: "1px solid var(--sunda-border)",
    background: "linear-gradient(135deg, var(--sunda-bg-mid), var(--sunda-bg))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={cardStyle}>
      {/* Left: photo */}
      <div style={photoStyle}>
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.nickname}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{
            fontFamily: "var(--font-sunda-display)",
            color: "var(--sunda-text-muted)",
            fontSize: "11px",
            textAlign: "center",
            padding: "8px",
          }}>
            {photoLabel}
          </span>
        )}
        {/* Terracotta/gold accent border */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(to right, var(--sunda-terra), var(--sunda-gold))",
          opacity: 0.6,
        }} />
      </div>

      {/* Right: text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{
          fontFamily: "var(--font-sunda-script)",
          fontSize: "2rem",
          color: "var(--sunda-gold)",
          marginBottom: "6px",
          lineHeight: 1.2,
        }}>
          {person.nickname}
        </h3>
        <p style={{
          fontFamily: "var(--font-sunda-display)",
          fontSize: "13px",
          fontStyle: "italic",
          color: "var(--sunda-text)",
          marginBottom: "12px",
          fontWeight: 400,
        }}>
          {person.fullName}
        </p>
        <div style={{
          width: "32px",
          height: "2px",
          background: "linear-gradient(to right, var(--sunda-terra), var(--sunda-gold))",
          marginBottom: "10px",
          opacity: 0.5,
        }} />
        <p style={{
          fontFamily: "var(--font-sunda-body)",
          fontSize: "11px",
          lineHeight: 1.8,
          color: "var(--sunda-text-soft)",
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
      background: "var(--sunda-bg-mid-t)",
      padding: "100px 32px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle left/right green accent lines */}
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "3px",
        background: "linear-gradient(to bottom, transparent, var(--sunda-green), transparent)",
        opacity: 0.15,
      }} />
      <div style={{
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: "3px",
        background: "linear-gradient(to bottom, transparent, var(--sunda-green), transparent)",
        opacity: 0.15,
      }} />

      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        {/* Header */}
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "56px" }}>
          <SundaDivider />
          <div style={{ height: "28px" }} />
          <p style={{
            fontFamily: "var(--font-sunda-body)",
            fontSize: "9px",
            letterSpacing: "0.45em",
            textTransform: "uppercase" as const,
            color: "var(--sunda-gold)",
            marginBottom: "16px",
          }}>
            Mempelai
          </p>
          <p style={{
            fontFamily: "var(--font-sunda-display)",
            fontSize: "14px",
            fontStyle: "italic",
            lineHeight: 2,
            color: "var(--sunda-text-soft)",
            maxWidth: "420px",
            margin: "0 auto",
          }}>
            Dengan memohon rahmat dan ridho Allah Subhanahu wa Ta&apos;ala, kami bermaksud mengundang{" "}
            {guestName ? (
              <>
                <br />
                <span style={{ fontFamily: "var(--font-sunda-display)", fontWeight: 600, color: "var(--sunda-text)", fontSize: "16px" }}>
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

        {/* Couple cards - vertical stacked layout */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="reveal-left delay-2">
            <PersonCard person={groom} photoLabel={`Foto ${groom.nickname}`} />
          </div>

          {/* Kujang divider between */}
          <div className="reveal-scale delay-3" style={{ textAlign: "center" }}>
            <KujangIcon />
          </div>

          <div className="reveal-right delay-4">
            <PersonCard person={bride} photoLabel={`Foto ${bride.nickname}`} />
          </div>
        </div>
      </div>
    </section>
  );
}
