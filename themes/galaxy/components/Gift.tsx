"use client";

import { useState } from "react";
import { useInvitation } from "../context";

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
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid var(--galaxy-border)",
        borderTop: "2px solid var(--galaxy-purple)",
        borderRadius: "20px",
        padding: "44px 32px",
        textAlign: "center",
        flex: "1 1 260px",
        maxWidth: "360px",
        boxShadow: "0 8px 32px rgba(139,92,246,0.1)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-galaxy-body)",
          fontSize: "8px",
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color: "var(--galaxy-purple)",
          marginBottom: "10px",
        }}
      >
        {bank}
      </p>
      <p
        style={{
          fontFamily: "var(--font-galaxy-body)",
          fontSize: "10px",
          color: "var(--galaxy-text-soft)",
          marginBottom: "32px",
        }}
      >
        {accountName}
      </p>

      <div
        style={{
          background: "rgba(139,92,246,0.08)",
          border: "1px solid var(--galaxy-border)",
          borderRadius: "12px",
          padding: "18px 24px",
          display: "inline-block",
          marginBottom: "28px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-galaxy-display)",
            fontSize: "clamp(1.3rem, 3.5vw, 1.8rem)",
            fontWeight: 300,
            color: "var(--galaxy-text)",
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
            fontFamily: "var(--font-galaxy-body)",
            fontSize: "8px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: copied ? "var(--galaxy-text)" : "var(--galaxy-purple)",
            background: copied ? "rgba(139,92,246,0.15)" : "transparent",
            border: "1px solid var(--galaxy-border)",
            padding: "12px 24px",
            borderRadius: "100px",
            cursor: "pointer",
            transition: "all 0.3s",
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
        background: "var(--galaxy-bg-mid)",
        padding: "120px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 70% 50%, rgba(139,92,246,0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p
            style={{
              fontFamily: "var(--font-galaxy-body)",
              fontSize: "8px",
              letterSpacing: "0.6em",
              textTransform: "uppercase",
              color: "var(--galaxy-text-soft)",
              marginBottom: "24px",
            }}
          >
            Wedding Gift
          </p>
          <h2
            style={{
              fontFamily: "var(--font-galaxy-script)",
              fontSize: "clamp(2.2rem, 7vw, 3.5rem)",
              fontWeight: 400,
              background: "linear-gradient(135deg, var(--galaxy-purple), var(--galaxy-pink))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "24px",
            }}
          >
            Kirim Hadiah
          </h2>
          <p
            style={{
              maxWidth: "400px",
              margin: "0 auto",
              fontFamily: "var(--font-galaxy-body)",
              fontSize: "12px",
              lineHeight: 2,
              color: "var(--galaxy-text-soft)",
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
