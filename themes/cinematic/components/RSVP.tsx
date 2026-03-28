"use client";

import { useState } from "react";
import { useInvitation } from "../context";
import { CineRule } from "./CineOrnament";
import { submitRsvp } from "@/lib/api";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid var(--cine-border)",
  padding: "12px 0",
  fontFamily: "var(--font-cine-body)",
  fontSize: "13px",
  color: "var(--cine-text)",
  outline: "none",
  transition: "border-color 0.3s",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-cine-body)",
  fontSize: "8px",
  letterSpacing: "0.4em",
  textTransform: "uppercase",
  color: "var(--cine-text-soft)",
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
        background: "var(--cine-bg-mid-t)",
        padding: "120px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top rule */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(to right, transparent, var(--cine-gold), transparent)",
          opacity: 0.25,
        }}
      />

      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
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
            RSVP
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
            Konfirmasi Kehadiran
          </h2>
          <CineRule />
        </div>

        <div
          className="reveal-up delay-2"
          style={{
            maxWidth: "480px",
            margin: "0 auto",
            background: "var(--cine-card)",
            border: "1px solid var(--cine-border)",
            padding: "48px 40px",
          }}
        >
          {done ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px 0",
                animation: "cine-fade-in 0.5s ease",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  border: "1px solid var(--cine-gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cine-gold)" strokeWidth="1.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-cine-display)",
                  fontStyle: "italic",
                  fontSize: "2rem",
                  color: "var(--cine-gold)",
                  marginBottom: "8px",
                }}
              >
                Terima Kasih
              </p>
              <p
                style={{
                  fontFamily: "var(--font-cine-body)",
                  color: "var(--cine-text-soft)",
                  fontSize: "12px",
                }}
              >
                Konfirmasi dan ucapan Anda telah kami terima
              </p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <div>
                <label style={labelStyle}>Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  placeholder="Masukkan nama Anda"
                  onFocus={(e) => ((e.target as HTMLInputElement).style.borderBottomColor = "var(--cine-gold)")}
                  onBlur={(e) => ((e.target as HTMLInputElement).style.borderBottomColor = "var(--cine-border)")}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
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
                  style={{ ...inputStyle, resize: "none", borderBottom: "1px solid var(--cine-border)" }}
                  placeholder="Tulis ucapan dan doa..."
                  onFocus={(e) => ((e.target as HTMLTextAreaElement).style.borderBottomColor = "var(--cine-gold)")}
                  onBlur={(e) => ((e.target as HTMLTextAreaElement).style.borderBottomColor = "var(--cine-border)")}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  fontFamily: "var(--font-cine-body)",
                  fontSize: "8px",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "var(--cine-bg-t)",
                  background: "var(--cine-gold)",
                  border: "none",
                  padding: "18px",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.5 : 1,
                  transition: "opacity 0.3s",
                  width: "100%",
                  marginTop: "8px",
                  fontWeight: 500,
                }}
              >
                {loading ? "Mengirim..." : "Kirim Konfirmasi & Ucapan"}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`@keyframes cine-fade-in { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </section>
  );
}
