"use client";

import { useState } from "react";
import { useInvitation } from "../context";

function BankCard({ bank, number, accountName }: { bank: string; number: string; accountName: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(number); setCopied(true); setTimeout(() => setCopied(false), 2500); };
  return (
    <div className="glass-mb" style={{ borderRadius: "20px", padding: "36px 28px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(to right, transparent, var(--color-blue-accent), transparent)", opacity: 0.25 }} />
      <p style={{ fontFamily: "var(--font-display-mb)", fontSize: "17px", fontWeight: 500, marginBottom: "6px", color: "var(--color-white-soft)" }}>{bank}</p>
      <p style={{ fontSize: "11px", marginBottom: "20px", color: "var(--color-text-mb-dim)", fontFamily: "var(--font-body-mb)" }}>{accountName}</p>
      <div className="glass-mb-blue" style={{ padding: "12px 20px", display: "inline-block", marginBottom: "20px" }}>
        <span className="shimmer-blue" style={{ fontFamily: "var(--font-display-mb)", fontSize: "18px", letterSpacing: "0.1em", fontWeight: 400 }}>{number}</span>
      </div>
      <div>
        <button onClick={copy} className="btn-mb-outline" style={{ padding: "10px 24px", fontSize: "9px" }}>
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
    <section id="gift" className="grad-mb-main relative overflow-hidden geo-pattern-mb">
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "140px 32px" }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ letterSpacing: "0.5em", textTransform: "uppercase" as const, fontSize: "9px", fontWeight: 500, marginBottom: "24px", color: "var(--color-silver-dark)", fontFamily: "var(--font-body-mb)" }}>Wedding Gift</p>
          <h2 className="shimmer-silver" style={{ fontFamily: "var(--font-display-mb)", fontSize: "clamp(2rem, 6vw, 2.8rem)", fontStyle: "italic", marginBottom: "32px" }}>Kirim Hadiah</h2>
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(to right, transparent, var(--color-blue-accent), transparent)", margin: "0 auto 24px", opacity: 0.4 }} />
          <p style={{ maxWidth: "380px", margin: "0 auto", fontSize: "12px", lineHeight: 2, color: "var(--color-text-mb-muted)", fontFamily: "var(--font-body-mb)" }}>
            Doa restu Anda merupakan karunia yang sangat berarti. Namun jika ingin memberikan hadiah, silakan kirim melalui:
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
          {banks.map((b, i) => (
            <div key={i} className={`reveal-${i % 2 === 0 ? "left" : "right"} delay-${i + 2}`} style={{ flex: "1 1 240px", maxWidth: "340px" }}>
              <BankCard {...b} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
