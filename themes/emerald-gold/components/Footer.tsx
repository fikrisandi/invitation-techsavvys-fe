"use client";

import { LeafOrnamentTop, GoldDivider } from "./FloralOrnament";
import Particles from "./Particles";
import { useInvitation } from "../context";

export default function Footer() {
  const { groom, bride } = useInvitation();
  return (
    <footer className="grad-footer relative overflow-hidden text-center">
      <Particles count={12} />
      <div className="absolute inset-0 geo-pattern opacity-50" />
      <div className="section-inner relative z-10" style={{ paddingBottom: "50px" }}>
        <div className="reveal-up" style={{ maxWidth: "480px", margin: "0 auto" }}>
          <LeafOrnamentTop className="text-[var(--color-gold-light)] mb-8" />
          <p style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 300, fontStyle: "italic", lineHeight: 2.2, marginBottom: "4px", color: "var(--color-gold-light)" }}>
            &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.&rdquo;
          </p>
          <p style={{ fontSize: "11px", marginBottom: "48px", letterSpacing: "0.15em", color: "var(--color-text-dim)", opacity: 0.7 }}>— QS. Ar-Rum: 21</p>
        </div>
        <div className="reveal-up delay-2">
          <GoldDivider />
          <p className="shimmer-gold my-6" style={{ fontFamily: "var(--font-script)", fontSize: "clamp(2rem, 6vw, 2.6rem)" }}>
            {groom.nickname} &amp; {bride.nickname}
          </p>
          <p style={{ fontSize: "11px", lineHeight: 2.2, maxWidth: "300px", margin: "0 auto 16px", opacity: 0.7, color: "var(--color-text-light)" }}>
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu.
          </p>
          <p style={{ fontSize: "11px", letterSpacing: "0.15em", marginBottom: "48px", color: "var(--color-text-muted)" }}>Wassalamu&apos;alaikum Wr. Wb.</p>
        </div>
        <div style={{ height: "1px", width: "100%", background: "linear-gradient(to right, transparent, var(--color-gold-dark), transparent)", opacity: 0.15, marginBottom: "20px" }} />
        <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, opacity: 0.4, color: "var(--color-text-dim)" }}>
          &copy; {new Date().getFullYear()} — Kami Yang Berbahagia &bull; Powered by{" "}
          <a href="https://techsavvys.com" style={{ color: "var(--color-gold-dark)", textDecoration: "none" }}>Invitation Savvys</a>
        </p>
      </div>
    </footer>
  );
}
