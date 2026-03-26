"use client";

import { useInvitation } from "../context";
import type { Person } from "@/lib/types";

function PersonCard({ person, photoLabel }: { person: Person; photoLabel: string }) {
  return (
    <div className="glass-mb rounded-3xl overflow-hidden" style={{ flex: "1 1 260px", maxWidth: "320px" }}>
      <div style={{ aspectRatio: "1/1", background: "linear-gradient(135deg, var(--color-navy-light), var(--color-navy))", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {person.photo
          ? <img src={person.photo} alt={person.nickname} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <span style={{ color: "var(--color-text-mb-dim)", fontSize: "13px", fontFamily: "var(--font-display-mb)" }}>{photoLabel}</span>}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(to right, transparent, var(--color-blue-accent), transparent)", opacity: 0.3 }} />
      </div>
      <div style={{ textAlign: "center", padding: "36px 28px" }}>
        <h3 className="shimmer-blue" style={{ fontFamily: "var(--font-display-mb)", fontSize: "1.8rem", fontStyle: "italic", marginBottom: "8px" }}>{person.nickname}</h3>
        <p style={{ fontFamily: "var(--font-display-mb)", fontSize: "13px", fontWeight: 400, marginBottom: "12px", color: "var(--color-white-soft)" }}>{person.fullName}</p>
        <div style={{ width: "32px", height: "1px", background: "var(--color-blue-accent)", margin: "12px auto", opacity: 0.3 }} />
        <p style={{ fontSize: "12px", lineHeight: 1.8, color: "var(--color-text-mb-muted)" }}>{person.parents}</p>
      </div>
    </div>
  );
}

export default function Couple({ guestName }: { guestName?: string }) {
  const { groom, bride } = useInvitation();
  return (
    <section id="couple" className="grad-mb-main relative overflow-hidden geo-pattern-mb">
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "140px 32px", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "80px" }}>
          <p style={{ fontFamily: "var(--font-display-mb)", fontSize: "20px", fontStyle: "italic", lineHeight: 1.8, marginBottom: "32px", color: "var(--color-silver-light)", opacity: 0.8 }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </p>
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(to right, transparent, var(--color-blue-accent), transparent)", margin: "0 auto 32px", opacity: 0.4 }} />
          <p style={{ fontFamily: "var(--font-display-mb)", fontSize: "15px", fontWeight: 300, lineHeight: 2.2, maxWidth: "440px", margin: "0 auto", color: "var(--color-text-mb)", fontStyle: "italic" }}>
            Dengan memohon rahmat dan ridho Allah Subhanahu wa Ta&apos;ala, kami bermaksud mengundang{" "}
            {guestName
              ? <><br /><span style={{ fontWeight: 600, color: "var(--color-white-soft)", fontSize: "17px", fontStyle: "normal" }}>{guestName}</span><br /></>
              : "Bapak/Ibu/Saudara/i "}
            untuk menghadiri pernikahan kami:
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
          <div className="reveal-left delay-2" style={{ flex: "1 1 260px", maxWidth: "320px" }}>
            <PersonCard person={groom} photoLabel={`Foto ${groom.nickname}`} />
          </div>
          <div className="reveal-scale delay-3" style={{ textAlign: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: "var(--font-body-mb)", fontSize: "11px", color: "var(--color-blue-accent)", letterSpacing: "0.4em", textTransform: "uppercase" as const, opacity: 0.6 }}>and</span>
          </div>
          <div className="reveal-right delay-4" style={{ flex: "1 1 260px", maxWidth: "320px" }}>
            <PersonCard person={bride} photoLabel={`Foto ${bride.nickname}`} />
          </div>
        </div>
      </div>
    </section>
  );
}
