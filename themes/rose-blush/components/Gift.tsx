"use client";
import { useState } from "react";
import { RoseDivider } from "./FloralOrnament";
import { useInvitation } from "../context";

function BankCard({ bank, number, accountName }: { bank: string; number: string; accountName: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(number); setCopied(true); setTimeout(() => setCopied(false), 2500); };
  return (
    <div className="card-rb" style={{ borderRadius: "20px", padding: "32px 28px", textAlign: "center" }}>
      <p style={{ fontFamily: "var(--font-rb-display)", fontSize: "18px", fontWeight: 400, fontStyle: "italic", marginBottom: "6px", color: "var(--color-rb-text)" }}>{bank}</p>
      <p style={{ fontSize: "11px", marginBottom: "20px", color: "var(--color-rb-text-soft)", fontFamily: "var(--font-rb-body)" }}>{accountName}</p>
      <div style={{ padding: "12px 20px", display: "inline-block", marginBottom: "20px", background: "var(--color-rb-blush)", borderRadius: "12px", border: "1px solid rgba(193,122,143,0.2)" }}>
        <span style={{ fontFamily: "var(--font-rb-display)", fontSize: "18px", letterSpacing: "0.1em", fontWeight: 400, color: "var(--color-rb-dusty)" }}>{number}</span>
      </div>
      <div>
        <button onClick={copy} className="btn-rb-outline" style={{ padding: "10px 24px", fontSize: "9px" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          {copied ? "Tersalin!" : "Salin Rekening"}
        </button>
      </div>
    </div>
  );
}

export default function Gift() {
  const { banks } = useInvitation();
  if (!banks || banks.length === 0) return null;
  return (
    <section id="gift" style={{ background: "var(--color-rb-bg-alt)", padding: "120px 32px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase" as const, color: "var(--color-rb-text-soft)", marginBottom: "20px", fontFamily: "var(--font-rb-body)" }}>Wedding Gift</p>
          <h2 style={{ fontFamily: "var(--font-rb-script)", fontSize: "clamp(2.2rem, 7vw, 3rem)", color: "var(--color-rb-dusty)", marginBottom: "8px" }}>Kirim Hadiah</h2>
          <RoseDivider />
          <p style={{ maxWidth: "380px", margin: "0 auto", fontSize: "12px", lineHeight: 2, color: "var(--color-rb-text-soft)", fontFamily: "var(--font-rb-body)" }}>
            Doa restu Anda merupakan karunia yang sangat berarti. Jika ingin memberikan hadiah, silakan kirim melalui:
          </p>
        </div>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
          {banks.map((b, i) => (
            <div key={i} className="reveal-up" style={{ flex: "1 1 240px", maxWidth: "340px" }}>
              <BankCard {...b} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
