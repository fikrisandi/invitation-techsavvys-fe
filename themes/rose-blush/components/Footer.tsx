"use client";
import { RoseDivider } from "./FloralOrnament";
import { useInvitation } from "../context";

export default function Footer() {
  const { groom, bride } = useInvitation();
  return (
    <footer style={{ background: "var(--color-rb-bg-t)", padding: "80px 32px 60px", textAlign: "center" }}>
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>
        <RoseDivider />
        <p style={{ fontFamily: "var(--font-rb-script)", fontSize: "clamp(1.6rem, 5vw, 2.2rem)", color: "var(--color-rb-dusty)", margin: "24px 0 8px" }}>
          {groom.nickname} &amp; {bride.nickname}
        </p>
        <p style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "var(--color-rb-text-soft)", fontFamily: "var(--font-rb-body)", marginBottom: "40px" }}>
          With Love &amp; Gratitude
        </p>
        <div style={{ width: "40px", height: "1px", background: "var(--color-rb-rosegold)", opacity: 0.4, margin: "0 auto 32px" }} />
        <p style={{ fontSize: "9px", color: "var(--color-rb-text-soft)", fontFamily: "var(--font-rb-body)", letterSpacing: "0.15em" }}>
          Made with ♡ by{" "}
          <a href="https://techsavvys.com" target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--color-rb-dusty)", textDecoration: "none", fontWeight: 600 }}>
            Techsavvys
          </a>
        </p>
      </div>
    </footer>
  );
}
