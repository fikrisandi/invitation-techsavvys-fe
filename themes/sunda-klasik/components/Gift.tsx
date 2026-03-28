"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { MegaMendung, SundaDivider } from "./SundaOrnament";
import { useInvitation } from "../context";
import { getBankInfo } from "@/lib/bank-logos";

function BankCard({ bank, number, accountName }: { bank: string; number: string; accountName: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const cardStyle: CSSProperties = {
    background: "rgba(200,144,32,0.04)",
    border: "1px solid var(--sunda-border)",
    borderRadius: "4px",
    overflow: "hidden",
    textAlign: "center",
    position: "relative",
  };

  return (
    <div style={cardStyle}>
      {/* Terracotta top accent */}
      <div style={{
        height: "3px",
        background: "linear-gradient(to right, var(--sunda-terra), var(--sunda-gold), var(--sunda-terra))",
        opacity: 0.6,
      }} />
      <div style={{ padding: "32px 24px 36px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "4px" }}>
          {(() => {
            const info = getBankInfo(bank);
            return info ? (
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: info.color, color: "#fff", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.02em", marginRight: 8, flexShrink: 0 }}>
                {info.label.slice(0, 3)}
              </span>
            ) : null;
          })()}
          <p style={{
            fontFamily: "var(--font-sunda-display)",
            fontSize: "16px",
            fontWeight: 500,
            color: "var(--sunda-text)",
            margin: 0,
          }}>
            {bank}
          </p>
        </div>
        <p style={{
          fontFamily: "var(--font-sunda-body)",
          fontSize: "11px",
          color: "var(--sunda-text-muted)",
          marginBottom: "18px",
        }}>
          {accountName}
        </p>
        <div style={{
          background: "rgba(176,80,32,0.06)",
          border: "1px solid rgba(176,80,32,0.2)",
          borderRadius: "4px",
          padding: "12px 20px",
          display: "inline-block",
          marginBottom: "18px",
        }}>
          <span style={{
            fontFamily: "var(--font-sunda-display)",
            fontSize: "18px",
            letterSpacing: "0.12em",
            fontWeight: 300,
            color: "var(--sunda-gold)",
          }}>
            {number}
          </span>
        </div>
        <div>
          <button
            onClick={copy}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 22px",
              border: "1px solid var(--sunda-border)",
              background: "transparent",
              color: "var(--sunda-gold)",
              fontFamily: "var(--font-sunda-body)",
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase" as const,
              cursor: "pointer",
              borderRadius: "4px",
              transition: "all 0.3s ease",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            {copied ? "Tersalin!" : "Salin Rekening"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Gift() {
  const { banks } = useInvitation();
  if (!banks || banks.length === 0) return null;

  return (
    <section style={{ background: "var(--sunda-bg-alt)", position: "relative", overflow: "hidden" }}>
      {/* Top mega mendung */}
      <div style={{ display: "flex", justifyContent: "center", opacity: 0.35 }}>
        <MegaMendung />
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "80px 32px" }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{
            fontFamily: "var(--font-sunda-body)",
            fontSize: "9px",
            letterSpacing: "0.45em",
            textTransform: "uppercase" as const,
            color: "var(--sunda-gold)",
            marginBottom: "16px",
          }}>
            Wedding Gift
          </p>
          <h2 style={{
            fontFamily: "var(--font-sunda-script)",
            fontSize: "clamp(2rem, 7vw, 2.8rem)",
            color: "var(--sunda-text)",
            marginBottom: "16px",
          }}>
            Kirim Hadiah
          </h2>
          <SundaDivider />
          <p style={{
            fontFamily: "var(--font-sunda-display)",
            fontSize: "13px",
            fontStyle: "italic",
            lineHeight: 2,
            color: "var(--sunda-text-soft)",
            maxWidth: "400px",
            margin: "24px auto 0",
          }}>
            Doa restu Anda merupakan karunia yang sangat berarti. Namun jika ingin memberikan hadiah, Anda dapat mengirim melalui:
          </p>
        </div>

        <div style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
          {banks.map((b, i) => (
            <div
              key={i}
              className={`reveal-${i % 2 === 0 ? "left" : "right"} delay-${i + 2}`}
              style={{ flex: "1 1 260px", maxWidth: "360px" }}
            >
              <BankCard {...b} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom mega mendung */}
      <div style={{ display: "flex", justifyContent: "center", opacity: 0.35 }}>
        <MegaMendung flip />
      </div>
    </section>
  );
}
