"use client";

import { useState } from "react";
import { GoldDivider } from "./FloralOrnament";
import { useInvitation } from "../context";

function BankCard({ bank, number, accountName }: { bank: string; number: string; accountName: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(number); setCopied(true); setTimeout(() => setCopied(false), 2500); };
  return (
    <div className="glass" style={{ borderRadius: "24px", padding: "40px 32px", textAlign: "center" }}>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 500, marginBottom: "8px", color: "var(--color-cream)" }}>{bank}</p>
      <p style={{ fontSize: "11px", marginBottom: "24px", color: "var(--color-text-dim)" }}>{accountName}</p>
      <div className="glass-gold" style={{ borderRadius: "16px", padding: "14px 24px", display: "inline-block", marginBottom: "24px" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "20px", letterSpacing: "0.12em", fontWeight: 300, color: "var(--color-gold-light)" }}>{number}</span>
      </div>
      <div>
        <button onClick={copy} className="btn-outline" style={{ padding: "12px 28px", fontSize: "9px" }}>
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
    <section id="gift" className="grad-gift relative overflow-hidden geo-pattern">
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "140px 32px" }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ letterSpacing: "0.5em", textTransform: "uppercase" as const, fontSize: "9px", fontWeight: 500, marginBottom: "24px", color: "var(--color-gold-dark)" }}>Wedding Gift</p>
          <h2 style={{ fontFamily: "var(--font-script)", fontSize: "clamp(2.2rem, 7vw, 3rem)", marginBottom: "16px", color: "var(--color-gold-light)" }}>Kirim Hadiah</h2>
          <GoldDivider />
          <p style={{ maxWidth: "400px", margin: "24px auto 0", fontSize: "12px", lineHeight: 2, textAlign: "center", color: "var(--color-text-muted)" }}>
            Doa restu Anda merupakan karunia yang sangat berarti. Namun jika ingin memberikan hadiah, Anda dapat mengirim melalui:
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
          {banks.map((b, i) => (
            <div key={i} className={`reveal-${i % 2 === 0 ? "left" : "right"} delay-${i + 2}`} style={{ flex: "1 1 260px", maxWidth: "360px" }}>
              <BankCard {...b} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
