"use client";

import { useState } from "react";
import { useInvitation } from "../context";
import { submitRsvp } from "@/lib/api";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid var(--galaxy-border)",
  borderRadius: "12px",
  padding: "14px 16px",
  fontFamily: "var(--font-galaxy-body)",
  fontSize: "13px",
  color: "var(--galaxy-text)",
  outline: "none",
  transition: "border-color 0.3s, box-shadow 0.3s",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-galaxy-body)",
  fontSize: "8px",
  letterSpacing: "0.4em",
  textTransform: "uppercase",
  color: "var(--galaxy-text-soft)",
  marginBottom: "12px",
  fontWeight: 500,
};

export default function RSVP({ guestName }: { guestName?: string }) {
  const { slug, rsvpEnabled } = useInvitation();
  const [form, setForm] = useState({
    name: guestName ?? "",
    attendance: "hadir",
    guests: "1",
    message: "",
  });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!rsvpEnabled) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitRsvp(slug, form);
      setDone(true);
    } catch {
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{
        background: "var(--galaxy-bg)",
        padding: "120px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.1) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative", zIndex: 2 }}>
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
            RSVP
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
            Konfirmasi Kehadiran
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
            Mohon konfirmasi kehadiran dan tinggalkan ucapan serta doa untuk kedua mempelai.
          </p>
        </div>

        <div
          className="reveal-up delay-2"
          style={{
            maxWidth: "480px",
            margin: "0 auto",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid var(--galaxy-border)",
            borderRadius: "24px",
            padding: "48px 40px",
            boxShadow: "0 8px 40px rgba(139,92,246,0.1)",
          }}
        >
          {done ? (
            <div style={{ textAlign: "center", padding: "40px 0", animation: "galaxy-fade-in 0.5s ease" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--galaxy-purple), var(--galaxy-pink))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                  boxShadow: "0 0 24px rgba(139,92,246,0.4)",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-galaxy-script)",
                  fontSize: "2.2rem",
                  background: "linear-gradient(135deg, var(--galaxy-purple), var(--galaxy-pink))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "8px",
                }}
              >
                Terima Kasih
              </p>
              <p style={{ fontFamily: "var(--font-galaxy-body)", color: "var(--galaxy-text-soft)", fontSize: "12px" }}>
                Konfirmasi dan ucapan Anda telah kami terima
              </p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              <div>
                <label style={labelStyle}>Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  placeholder="Masukkan nama Anda"
                  onFocus={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = "var(--galaxy-purple)";
                    (e.target as HTMLInputElement).style.boxShadow = "0 0 12px rgba(139,92,246,0.2)";
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = "var(--galaxy-border)";
                    (e.target as HTMLInputElement).style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Kehadiran</label>
                  <select
                    value={form.attendance}
                    onChange={(e) => setForm({ ...form, attendance: e.target.value })}
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option value="hadir">Hadir</option>
                    <option value="tidak_hadir">Tidak Hadir</option>
                    <option value="mungkin">Masih Ragu</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Jumlah Tamu</label>
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={String(n)}>
                        {n} Orang
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Ucapan &amp; Doa</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  style={{ ...inputStyle, resize: "none" }}
                  placeholder="Tulis ucapan dan doa..."
                  onFocus={(e) => {
                    (e.target as HTMLTextAreaElement).style.borderColor = "var(--galaxy-purple)";
                    (e.target as HTMLTextAreaElement).style.boxShadow = "0 0 12px rgba(139,92,246,0.2)";
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLTextAreaElement).style.borderColor = "var(--galaxy-border)";
                    (e.target as HTMLTextAreaElement).style.boxShadow = "none";
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  fontFamily: "var(--font-galaxy-body)",
                  fontSize: "9px",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "white",
                  background: "linear-gradient(135deg, var(--galaxy-purple), #6D28D9)",
                  border: "none",
                  borderRadius: "12px",
                  padding: "18px",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.5 : 1,
                  transition: "opacity 0.3s",
                  width: "100%",
                  marginTop: "8px",
                  boxShadow: "0 4px 20px rgba(139,92,246,0.3)",
                }}
              >
                {loading ? "Mengirim..." : "Kirim Konfirmasi & Ucapan"}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`@keyframes galaxy-fade-in { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </section>
  );
}
