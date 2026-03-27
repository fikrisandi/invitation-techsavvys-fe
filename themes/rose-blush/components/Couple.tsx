"use client";
import type { Person } from "@/lib/types";
import { RoseDivider } from "./FloralOrnament";
import { useInvitation } from "../context";

function PersonCard({ person, role }: { person: Person; role: string }) {
  return (
    <div className="card-rb reveal-up" style={{ padding: "36px 28px", textAlign: "center", flex: "1 1 260px", maxWidth: "320px" }}>
      {person.photo ? (
        <div style={{ width: "110px", height: "110px", borderRadius: "50%", overflow: "hidden", margin: "0 auto 20px", border: "3px solid var(--color-rb-blush)", boxShadow: "0 0 0 6px rgba(220,176,186,0.2)" }}>
          <img src={person.photo} alt={person.nickname} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      ) : (
        <div style={{ width: "110px", height: "110px", borderRadius: "50%", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, var(--color-rb-blush), var(--color-rb-dusty))", color: "#fff", fontSize: "28px", fontFamily: "var(--font-rb-script)", boxShadow: "0 0 0 6px rgba(220,176,186,0.2)" }}>
          {person.nickname.charAt(0)}
        </div>
      )}
      <p style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "var(--color-rb-rosegold)", fontFamily: "var(--font-rb-body)", fontWeight: 700, marginBottom: "8px" }}>{role}</p>
      <h3 style={{ fontFamily: "var(--font-rb-script)", fontSize: "2rem", color: "var(--color-rb-dusty)", marginBottom: "6px" }}>{person.nickname}</h3>
      <p style={{ fontFamily: "var(--font-rb-display)", fontSize: "13px", color: "var(--color-rb-text)", fontStyle: "italic", marginBottom: "12px" }}>{person.fullName}</p>
      {person.parents && (
        <p style={{ fontSize: "11px", lineHeight: 1.8, color: "var(--color-rb-text-soft)", fontFamily: "var(--font-rb-body)" }}>{person.parents}</p>
      )}
    </div>
  );
}

export default function Couple() {
  const { groom, bride } = useInvitation();
  return (
    <section id="couple" style={{ background: "var(--color-rb-bg-alt)", padding: "120px 32px" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase" as const, color: "var(--color-rb-text-soft)", marginBottom: "20px", fontFamily: "var(--font-rb-body)" }}>The Couple</p>
          <h2 style={{ fontFamily: "var(--font-rb-script)", fontSize: "clamp(2.2rem, 7vw, 3rem)", color: "var(--color-rb-dusty)", marginBottom: "8px" }}>Mempelai</h2>
          <RoseDivider />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
          <PersonCard person={groom} role="Mempelai Pria" />
          <div style={{ textAlign: "center" }}>
            <span style={{ fontFamily: "var(--font-rb-script)", fontSize: "2.5rem", color: "var(--color-rb-rosegold)", opacity: 0.6 }}>&amp;</span>
          </div>
          <PersonCard person={bride} role="Mempelai Wanita" />
        </div>
      </div>
    </section>
  );
}
