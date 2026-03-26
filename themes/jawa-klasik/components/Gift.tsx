"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { BatikBorder, GununganDivider } from "./JawaOrnament";
import { useInvitation } from "../context";

function BankCard({ bank, number, accountName }: { bank: string; number: string; accountName: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const cardStyle: CSSProperties = {
    background: "var(--jawa-bg-card)",
    border: "1px solid var(--jawa-border)",
    borderRadius: "2px",
    overflow: "hidden",
    textAlign: "center",
  };

  return (
    <div style={cardStyle}>
      <BatikBorder />
      <div style={{ padding: "36px 28px 40px" }}>
        <p style={{
          fontFamily: "var(--font-jawa-display)",
          fontSize: "16px",
          fontWeight: 500,
          color: "var(--jawa-text)",
          marginBottom: "6px",
        }}>
          {bank}
        </p>
        <p style={{
          fontFamily: "var(--font-jawa-body)",
          fontSize: "11px",
          color: "var(--jawa-text-muted)",
          marginBottom: "20px",
        }}>
          {accountName}
        </p>
        <div style={{
          background: "rgba(212,160,32,0.06)",
          border: "1px solid var(--jawa-border)",
          borderRadius: "2px",
          padding: "12px 20px",
          display: "inline-block",
          marginBottom: "20px",
        }}>
          <span style={{
            fontFamily: "var(--font-jawa-display)",
            fontSize: "18px",
            letterSpacing: "0.12em",
            fontWeight: 300,
            color: "var(--jawa-gold-light)",
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
              padding: "10px 24px",
              border: "1px solid var(--jawa-border)",
              background: "transparent",
              color: "var(--jawa-gold)",
              fontFamily: "var(--font-jawa-body)",
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase" as const,
              cursor: "pointer",
              borderRadius: "2px",
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
    <section style={{ background: "var(--jawa-bg-mid)", position: "relative", overflow: "hidden" }}>
      <BatikBorder />

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "100px 32px" }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{
            fontFamily: "var(--font-jawa-body)",
            fontSize: "9px",
            letterSpacing: "0.45em",
            textTransform: "uppercase" as const,
            color: "var(--jawa-gold)",
            marginBottom: "20px",
          }}>
            Wedding Gift
          </p>
          <h2 style={{
            fontFamily: "var(--font-jawa-script)",
            fontSize: "clamp(2rem, 7vw, 2.8rem)",
            color: "var(--jawa-gold-light)",
            marginBottom: "20px",
          }}>
            Kirim Hadiah
          </h2>
          <GununganDivider />
          <p style={{
            fontFamily: "var(--font-jawa-display)",
            fontSize: "13px",
            fontStyle: "italic",
            lineHeight: 2,
            color: "var(--jawa-text-soft)",
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

      <BatikBorder />
    </section>
  );
}
