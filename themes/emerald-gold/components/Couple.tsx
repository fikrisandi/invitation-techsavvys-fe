"use client";

import { LeafOrnamentTop, GoldDivider } from "./FloralOrnament";
import Particles from "./Particles";
import { useInvitation } from "../context";
import type { Person } from "@/lib/types";

function PersonCard({ person, photoLabel }: { person: Person; photoLabel: string }) {
  return (
    <div className="glass rounded-3xl overflow-hidden" style={{ width: "100%" }}>
      <div className="w-full flex items-center justify-center relative" style={{ aspectRatio: "1/1", background: "linear-gradient(135deg, var(--color-emerald-light), var(--color-emerald))" }}>
        {person.photo
          ? <img src={person.photo} alt={person.nickname} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <span style={{ color: "var(--color-text-dim)", fontSize: "13px", fontFamily: "var(--font-display)" }}>{photoLabel}</span>}
        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(to right, transparent, var(--color-gold-dark), transparent)", opacity: 0.4 }} />
      </div>
      <div style={{ textAlign: "center", padding: "40px 32px" }}>
        <h3 className="shimmer-gold" style={{ fontFamily: "var(--font-script)", fontSize: "2.4rem", marginBottom: "12px" }}>{person.nickname}</h3>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 400, marginBottom: "12px", color: "var(--color-cream)" }}>{person.fullName}</p>
        <div style={{ width: "40px", height: "1px", background: "var(--color-gold-dark)", margin: "16px auto", opacity: 0.4 }} />
        <p style={{ fontSize: "12px", lineHeight: 1.8, color: "var(--color-text-muted)" }}>{person.parents}</p>
      </div>
    </div>
  );
}

export default function Couple({ guestName }: { guestName?: string }) {
  const { groom, bride } = useInvitation();
  return (
    <section id="couple" className="grad-main relative overflow-hidden geo-pattern">
      <Particles count={20} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "140px 32px", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "80px" }}>
          <LeafOrnamentTop className="text-[var(--color-gold)]" />
          <div style={{ height: "40px" }} />
          <p style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontStyle: "italic", lineHeight: 1.6, marginBottom: "40px", color: "var(--color-gold-light)" }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </p>
          <GoldDivider />
          <div style={{ height: "32px" }} />
          <p style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 300, lineHeight: 2.2, maxWidth: "440px", margin: "0 auto", textAlign: "center", color: "var(--color-text-light)" }}>
            Dengan memohon rahmat dan ridho Allah Subhanahu wa Ta&apos;ala, kami bermaksud mengundang{" "}
            {guestName ? (<><br/><span style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--color-cream)", fontSize: "17px" }}>{guestName}</span><br/></>) : "Bapak/Ibu/Saudara/i "}
            untuk menghadiri pernikahan kami:
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
          <div className="reveal-left delay-2" style={{ width: "100%", maxWidth: "340px" }}>
            <PersonCard person={groom} photoLabel={`Foto ${groom.nickname}`} />
          </div>
          <div className="reveal-scale delay-3" style={{ textAlign: "center" }}>
            <span style={{ fontFamily: "var(--font-script)", fontSize: "3rem", opacity: 0.5, color: "var(--color-gold)" }}>&amp;</span>
          </div>
          <div className="reveal-right delay-4" style={{ width: "100%", maxWidth: "340px" }}>
            <PersonCard person={bride} photoLabel={`Foto ${bride.nickname}`} />
          </div>
        </div>
      </div>
    </section>
  );
}
