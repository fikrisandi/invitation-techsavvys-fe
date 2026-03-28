"use client";

import { useState } from "react";
import { useInvitation } from "../context";
import { CineRule } from "./CineOrnament";
import { getBankInfo } from "@/lib/bank-logos";

function BankCard({ bank, number, accountName }: { bank: string; number: string; accountName: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      style={{
        background: "var(--cine-card)",
        border: "1px solid var(--cine-border)",
        borderTop: "2px solid var(--cine-gold)",
        padding: "48px 36px",
        textAlign: "center",
        flex: "1 1 260px",
        maxWidth: "360px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
        {(() => {
          const info = getBankInfo(bank);
          return info ? (
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: info.color, color: "#fff", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.02em", marginRight: 8, flexShrink: 0 }}>
              {info.label.slice(0, 3)}
            </span>
          ) : null;
        })()}
        <p
          style={{
            fontFamily: "var(--font-cine-body)",
            fontSize: "8px",
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: "var(--cine-text-soft)",
            margin: 0,
          }}
        >
          {bank}
        </p>
      </div>
      <p
        style={{
          fontFamily: "var(--font-cine-body)",
          fontSize: "10px",
          color: "var(--cine-text-muted)",
          marginBottom: "32px",
        }}
      >
        {accountName}
      </p>

      {/* Account number in large display font */}
      <div
        style={{
          border: "1px solid var(--cine-border)",
          padding: "20px 24px",
          marginBottom: "32px",
          display: "inline-block",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-cine-display)",
            fontSize: "clamp(1.4rem, 4vw, 2rem)",
            fontWeight: 300,
            color: "var(--cine-gold-light)",
            letterSpacing: "0.12em",
          }}
        >
          {number}
        </span>
      </div>

      <div>
        <button
          onClick={copy}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-cine-body)",
            fontSize: "8px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: copied ? "var(--cine-text)" : "var(--cine-gold)",
            background: "transparent",
            border: "1px solid var(--cine-gold)",
            padding: "12px 24px",
            cursor: "pointer",
            opacity: copied ? 0.6 : 1,
            transition: "opacity 0.3s",
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
  );
}

export default function Gift() {
  const { banks } = useInvitation();
  if (!banks || banks.length === 0) return null;

  return (
    <section
      style={{
        background: "var(--cine-bg-t)",
        padding: "120px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p
            style={{
              fontFamily: "var(--font-cine-body)",
              fontSize: "8px",
              letterSpacing: "0.6em",
              textTransform: "uppercase",
              color: "var(--cine-text-soft)",
              marginBottom: "24px",
            }}
          >
            Wedding Gift
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cine-display)",
              fontStyle: "italic",
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              fontWeight: 700,
              color: "var(--cine-text)",
              marginBottom: "32px",
            }}
          >
            Kirim Hadiah
          </h2>
          <CineRule />
          <p
            style={{
              maxWidth: "400px",
              margin: "32px auto 0",
              fontFamily: "var(--font-cine-body)",
              fontSize: "12px",
              lineHeight: 2,
              color: "var(--cine-text-soft)",
              textAlign: "center",
            }}
          >
            Doa restu Anda merupakan karunia yang sangat berarti. Namun jika ingin memberikan hadiah, Anda dapat mengirim melalui:
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "24px",
            justifyContent: "center",
          }}
        >
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
    </section>
  );
}
