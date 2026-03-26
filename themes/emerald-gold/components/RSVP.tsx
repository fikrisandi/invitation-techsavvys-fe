"use client";

import { useState } from "react";
import { GoldDivider } from "./FloralOrnament";
import Particles from "./Particles";
import { useInvitation } from "../context";
import { submitRsvp } from "@/lib/api";

export default function RSVP({ guestName }: { guestName?: string }) {
  const { slug, rsvpEnabled } = useInvitation();
  const [form, setForm] = useState({ name: guestName ?? "", attendance: "hadir", guests: "1", message: "" });
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
    <section id="rsvp" className="grad-rsvp relative overflow-hidden">
      <Particles count={15} />
      <div className="absolute inset-0 geo-pattern" />
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "140px 32px", position: "relative", zIndex: 10 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ letterSpacing: "0.5em", textTransform: "uppercase" as const, fontSize: "9px", fontWeight: 500, marginBottom: "24px", color: "var(--color-gold-dark)" }}>RSVP</p>
          <h2 style={{ fontFamily: "var(--font-script)", fontSize: "clamp(2.2rem, 7vw, 3rem)", marginBottom: "16px", color: "var(--color-gold-light)" }}>Konfirmasi Kehadiran</h2>
          <GoldDivider />
          <p style={{ color: "var(--color-text-muted)", maxWidth: "400px", margin: "24px auto 0", fontSize: "12px", lineHeight: 2, textAlign: "center" }}>
            Mohon konfirmasi kehadiran dan tinggalkan ucapan serta doa untuk kedua mempelai.
          </p>
        </div>
        <div className="glass rounded-3xl reveal-up delay-2" style={{ maxWidth: "480px", margin: "0 auto", padding: "48px 36px" }}>
          {done ? (
            <div style={{ textAlign: "center", padding: "40px 0", animation: "fade-in 0.5s ease" }}>
              <div style={{ width: "64px", height: "64px", margin: "0 auto 24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, var(--color-mint-dark), var(--color-mint))" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <p className="shimmer-gold" style={{ fontFamily: "var(--font-script)", fontSize: "2rem", marginBottom: "8px" }}>Terima Kasih</p>
              <p style={{ color: "var(--color-text-muted)", fontSize: "12px" }}>Konfirmasi dan ucapan Anda telah kami terima</p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <label style={{ display: "block", color: "var(--color-text-muted)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: "12px", fontWeight: 500 }}>Nama Lengkap</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Masukkan nama Anda" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", color: "var(--color-text-muted)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: "12px", fontWeight: 500 }}>Kehadiran</label>
                  <select value={form.attendance} onChange={(e) => setForm({ ...form, attendance: e.target.value })} className="input-field">
                    <option value="hadir">Hadir</option>
                    <option value="tidak_hadir">Tidak Hadir</option>
                    <option value="mungkin">Masih Ragu</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", color: "var(--color-text-muted)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: "12px", fontWeight: 500 }}>Jumlah Tamu</label>
                  <select value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className="input-field">
                    {[1,2,3,4,5].map((n) => <option key={n} value={String(n)}>{n} Orang</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: "block", color: "var(--color-text-muted)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: "12px", fontWeight: 500 }}>Ucapan &amp; Doa</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className="input-field" style={{ resize: "none" }} placeholder="Tulis ucapan dan doa..." />
              </div>
              <button type="submit" disabled={loading} className="btn-gold" style={{ width: "100%", marginTop: "8px", opacity: loading ? 0.5 : 1, justifyContent: "center" }}>
                {loading ? "Mengirim..." : "Kirim Konfirmasi & Ucapan"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
