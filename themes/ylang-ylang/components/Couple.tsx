"use client";
import { BotanicalTop, BotanicalDivider } from "./BotanicalOrnament";
import { useInvitation } from "../context";
import type { Person } from "@/lib/types";

function PersonCard({ person, label }: { person: Person; label: string }) {
  return (
    <div className="card-yy" style={{ flex: "1 1 260px", maxWidth: "320px", overflow: "hidden" }}>
      <div style={{ aspectRatio: "1/1", background: "linear-gradient(135deg, #E8DFD0, #F3EDE3)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {person.photo
          ? <img src={person.photo} alt={person.nickname} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <span style={{ color: "var(--color-yy-text-muted)", fontSize: "13px", fontFamily: "var(--font-yy-display)", fontStyle: "italic" }}>{label}</span>}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(to right, transparent, var(--color-yy-gold), transparent)", opacity: 0.5 }} />
      </div>
      <div style={{ textAlign: "center", padding: "32px 24px" }}>
        <h3 className="shimmer-yy" style={{ fontFamily: "var(--font-yy-script)", fontSize: "2.2rem", marginBottom: "10px" }}>{person.nickname}</h3>
        <p style={{ fontFamily: "var(--font-yy-display)", fontSize: "14px", fontWeight: 400, marginBottom: "10px", color: "var(--color-yy-text)", fontStyle: "italic" }}>{person.fullName}</p>
        <div style={{ width: "36px", height: "1px", background: "var(--color-yy-gold)", margin: "12px auto", opacity: 0.5 }} />
        <p style={{ fontSize: "12px", lineHeight: 1.9, color: "var(--color-yy-text-soft)", fontFamily: "var(--font-yy-body)" }}>{person.parents}</p>
      </div>
    </div>
  );
}

export default function Couple({ guestName }: { guestName?: string }) {
  const { groom, bride } = useInvitation();
  return (
    <section id="couple" className="grad-yy-main relative overflow-hidden geo-yy">
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "140px 32px", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "72px" }}>
          <BotanicalTop style={{ color: "var(--color-yy-gold)" }} />
          <div style={{ height: "32px" }} />
          <p style={{ fontFamily: "var(--font-yy-display)", fontSize: "20px", fontStyle: "italic", lineHeight: 1.8, marginBottom: "32px", color: "var(--color-yy-forest)" }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </p>
          <BotanicalDivider />
          <div style={{ height: "16px" }} />
          <p style={{ fontFamily: "var(--font-yy-display)", fontSize: "15px", fontWeight: 400, lineHeight: 2.2, maxWidth: "440px", margin: "0 auto", color: "var(--color-yy-text-mid)", fontStyle: "italic" }}>
            Dengan memohon rahmat dan ridho Allah Subhanahu wa Ta&apos;ala, kami bermaksud mengundang{" "}
            {guestName ? <><br/><span style={{ fontWeight: 600, color: "var(--color-yy-text)", fontStyle: "normal" }}>{guestName}</span><br /></> : "Bapak/Ibu/Saudara/i "}
            untuk menghadiri pernikahan kami:
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
          <div className="reveal-left delay-2" style={{ flex: "1 1 260px", maxWidth: "320px" }}>
            <PersonCard person={groom} label={`Foto ${groom.nickname}`} />
          </div>
          <div className="reveal-scale delay-3" style={{ textAlign: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: "var(--font-yy-display)", fontSize: "2.5rem", color: "var(--color-yy-gold)", fontStyle: "italic", opacity: 0.6 }}>&amp;</span>
          </div>
          <div className="reveal-right delay-4" style={{ flex: "1 1 260px", maxWidth: "320px" }}>
            <PersonCard person={bride} label={`Foto ${bride.nickname}`} />
          </div>
        </div>
      </div>
    </section>
  );
}
