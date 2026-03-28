"use client";
import { useState } from "react";
import { useInvitation } from "../context";
import { SakuraDivider } from "./SakuraEffect";
import type { BankAccount } from "@/lib/types";
import { getBankInfo } from "@/lib/bank-logos";

function BankCard({ bank }: { bank: BankAccount }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(bank.number).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      style={{
        background: "var(--sakura-bg)",
        border: "1px solid var(--sakura-border)",
        borderRadius: "4px",
        padding: "28px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Pink accent top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(to right, var(--sakura-pink), var(--sakura-gold), var(--sakura-pink-light))",
        }}
      />

      {/* Bank name */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
        {(() => {
          const info = getBankInfo(bank.bank);
          return info ? (
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: info.color, color: "#fff", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.02em", marginRight: 8, flexShrink: 0 }}>
              {info.label.slice(0, 3)}
            </span>
          ) : null;
        })()}
        <p
          style={{
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "var(--sakura-pink)",
            margin: 0,
            fontFamily: "var(--font-sakura-body)",
          }}
        >
          {bank.bank}
        </p>
      </div>

      {/* Account number */}
      <p
        style={{
          fontFamily: "var(--font-sakura-display)",
          fontSize: "clamp(1.3rem, 3.5vw, 1.8rem)",
          color: "var(--sakura-text)",
          fontWeight: 300,
          letterSpacing: "0.1em",
          marginBottom: "8px",
        }}
      >
        {bank.number}
      </p>

      {/* Account name */}
      <p
        style={{
          fontSize: "12px",
          color: "var(--sakura-text-soft)",
          fontFamily: "var(--font-sakura-body)",
          marginBottom: "20px",
        }}
      >
        a.n. {bank.accountName}
      </p>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "9px 20px",
          borderRadius: "40px",
          background: copied
            ? "linear-gradient(135deg, #3D5A45, #4A6E55)"
            : "linear-gradient(135deg, var(--sakura-pink), var(--sakura-rose))",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-sakura-body)",
          fontSize: "9px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          fontWeight: 700,
          transition: "all 0.3s ease",
        }}
      >
        {copied ? (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Tersalin
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            Salin Nomor
          </>
        )}
      </button>
    </div>
  );
}

export default function Gift() {
  const { banks } = useInvitation();
  if (!banks || banks.length === 0) return null;

  return (
    <section
      id="gift"
      style={{
        background: "var(--sakura-bg-alt)",
        padding: "120px 32px",
      }}
    >
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "56px" }}>
          <p
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "var(--sakura-text-soft)",
              marginBottom: "20px",
              fontFamily: "var(--font-sakura-body)",
            }}
          >
            Hadiah Pernikahan
          </p>
          <h2
            style={{
              fontFamily: "var(--font-sakura-script)",
              fontSize: "clamp(2.2rem, 7vw, 3.2rem)",
              color: "var(--sakura-pink)",
              marginBottom: "8px",
            }}
          >
            Amplop Digital
          </h2>
          <SakuraDivider />
          <p
            style={{
              fontSize: "12px",
              color: "var(--sakura-text-soft)",
              fontFamily: "var(--font-sakura-body)",
              lineHeight: 1.9,
              maxWidth: "400px",
              margin: "20px auto 0",
            }}
          >
            Doa dan kehadiran Anda adalah hadiah terbaik bagi kami. Namun jika Anda ingin memberikan hadiah, kami menerima melalui:
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {banks.map((bank, i) => (
            <div key={i} className="reveal-up">
              <BankCard bank={bank} />
            </div>
          ))}
        </div>

        {/* Gratitude note */}
        <div
          className="reveal-up"
          style={{
            marginTop: "40px",
            textAlign: "center",
            padding: "24px",
            border: "1px solid var(--sakura-border)",
            borderRadius: "4px",
            background: "linear-gradient(135deg, rgba(212,112,138,0.05), transparent)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sakura-script)",
              fontSize: "1.8rem",
              color: "var(--sakura-pink)",
              marginBottom: "8px",
            }}
          >
            Terima Kasih
          </p>
          <p
            style={{
              fontSize: "11px",
              color: "var(--sakura-text-muted)",
              fontFamily: "var(--font-sakura-body)",
              letterSpacing: "0.1em",
            }}
          >
            Atas perhatian dan kasih Anda
          </p>
        </div>
      </div>
    </section>
  );
}
