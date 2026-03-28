"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { MegaMendung, SundaDivider } from "./SundaOrnament";
import { useInvitation } from "../context";
import { submitRsvp } from "@/lib/api";

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

  const inputStyle: CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    background: "rgba(200,144,32,0.03)",
    border: "1px solid var(--sunda-border)",
    borderRadius: "4px",
    color: "var(--sunda-text)",
    fontFamily: "var(--font-sunda-body)",
    fontSize: "13px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.3s ease",
  };

  const labelStyle: CSSProperties = {
    display: "block",
    fontFamily: "var(--font-sunda-body)",
    fontSize: "9px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--sunda-text-muted)",
    marginBottom: "10px",
  };

  return (
    <section style={{ background: "var(--sunda-bg-t)", position: "relative", overflow: "hidden" }}>
      {/* Top mega mendung */}
      <div style={{ display: "flex", justifyContent: "center", opacity: 0.3 }}>
        <MegaMendung />
      </div>

      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "80px 32px", position: "relative", zIndex: 10 }}>
        {/* Header */}
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{
            fontFamily: "var(--font-sunda-body)",
            fontSize: "9px",
            letterSpacing: "0.45em",
            textTransform: "uppercase" as const,
            color: "var(--sunda-gold)",
            marginBottom: "16px",
          }}>
            RSVP
          </p>
          <h2 style={{
            fontFamily: "var(--font-sunda-script)",
            fontSize: "clamp(2rem, 7vw, 2.8rem)",
            color: "var(--sunda-text)",
            marginBottom: "16px",
          }}>
            Konfirmasi Kehadiran
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
            Mohon konfirmasi kehadiran dan tinggalkan ucapan serta doa untuk kedua mempelai.
          </p>
        </div>

        {/* Form card */}
        <div
          className="reveal-up delay-2"
          style={{
            background: "rgba(200,144,32,0.04)",
            border: "1px solid var(--sunda-border)",
            borderRadius: "4px",
            overflow: "hidden",
            maxWidth: "480px",
            margin: "0 auto",
          }}
        >
          {/* Terracotta top accent */}
          <div style={{
            height: "3px",
            background: "linear-gradient(to right, var(--sunda-terra), var(--sunda-gold), var(--sunda-terra))",
            opacity: 0.6,
          }} />

          <div style={{ padding: "36px 28px 40px" }}>
            {done ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{
                  width: "52px",
                  height: "52px",
                  margin: "0 auto 20px",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(176,80,32,0.1)",
                  border: "1px solid rgba(176,80,32,0.3)",
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--sunda-terra)" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p style={{
                  fontFamily: "var(--font-sunda-script)",
                  fontSize: "2rem",
                  color: "var(--sunda-gold)",
                  marginBottom: "8px",
                }}>
                  Hatur Nuhun
                </p>
                <p style={{
                  fontFamily: "var(--font-sunda-body)",
                  fontSize: "12px",
                  color: "var(--sunda-text-muted)",
                }}>
                  Konfirmasi dan ucapan Anda telah kami terima
                </p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div>
                  <label style={labelStyle}>Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    placeholder="Masukkan nama Anda"
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label style={labelStyle}>Kehadiran</label>
                    <select
                      value={form.attendance}
                      onChange={(e) => setForm({ ...form, attendance: e.target.value })}
                      style={inputStyle}
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
                      style={inputStyle}
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={String(n)}>{n} Orang</option>
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
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "14px",
                    background: "var(--sunda-terra)",
                    border: "1px solid rgba(200,144,32,0.3)",
                    color: "#F5E8D0",
                    fontFamily: "var(--font-sunda-body)",
                    fontSize: "10px",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase" as const,
                    cursor: loading ? "not-allowed" : "pointer",
                    borderRadius: "4px",
                    opacity: loading ? 0.5 : 1,
                    transition: "all 0.3s ease",
                    marginTop: "8px",
                  }}
                >
                  {loading ? "Mengirim..." : "Kirim Konfirmasi & Ucapan"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom mega mendung */}
      <div style={{ display: "flex", justifyContent: "center", opacity: 0.3 }}>
        <MegaMendung flip />
      </div>
    </section>
  );
}
