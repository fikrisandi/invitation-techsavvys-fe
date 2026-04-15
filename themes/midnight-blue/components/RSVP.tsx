"use client";

import { useState } from "react";
import { useInvitation } from "../context";
import { submitRsvp } from "@/lib/api";

export default function RSVP({ guestName }: { guestName?: string }) {
  const { slug, rsvpEnabled } = useInvitation();
  const [form, setForm] = useState({ name: guestName ?? "", attendance: "hadir", guests: "1", message: "" });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!rsvpEnabled) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try { await submitRsvp(slug, form); setDone(true); } catch { alert("Gagal mengirim RSVP. Periksa koneksi Anda lalu coba lagi."); } finally { setLoading(false); }
  };

  return (
    <section id="rsvp" className="grad-mb-alt relative overflow-hidden geo-pattern-mb">
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "140px 32px", position: "relative", zIndex: 10 }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ letterSpacing: "0.5em", textTransform: "uppercase" as const, fontSize: "9px", fontWeight: 500, marginBottom: "24px", color: "var(--color-silver-dark)", fontFamily: "var(--font-body-mb)" }}>RSVP</p>
          <h2 className="shimmer-silver" style={{ fontFamily: "var(--font-display-mb)", fontSize: "clamp(2rem, 6vw, 2.8rem)", fontStyle: "italic", marginBottom: "32px" }}>Konfirmasi Kehadiran</h2>
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(to right, transparent, var(--color-blue-accent), transparent)", margin: "0 auto 24px", opacity: 0.4 }} />
          <p style={{ color: "var(--color-text-mb-muted)", maxWidth: "380px", margin: "0 auto", fontSize: "12px", lineHeight: 2, fontFamily: "var(--font-body-mb)" }}>
            Mohon konfirmasi kehadiran dan tinggalkan ucapan untuk kedua mempelai.
          </p>
        </div>
        <div className="glass-mb rounded-3xl reveal-up delay-2" style={{ maxWidth: "480px", margin: "0 auto", padding: "44px 36px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(to right, transparent, var(--color-blue-accent), transparent)", opacity: 0.25 }} />
          {done ? (
            <div style={{ textAlign: "center", padding: "40px 0", animation: "fade-in 0.5s ease" }}>
              <div style={{ width: "60px", height: "60px", margin: "0 auto 24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, var(--color-blue-accent), #2B7FD4)" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <p className="shimmer-blue" style={{ fontFamily: "var(--font-display-mb)", fontSize: "1.8rem", fontStyle: "italic", marginBottom: "8px" }}>Terima Kasih</p>
              <p style={{ color: "var(--color-text-mb-muted)", fontSize: "12px", fontFamily: "var(--font-body-mb)" }}>Konfirmasi Anda telah kami terima</p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{ display: "block", color: "var(--color-text-mb-muted)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: "10px", fontWeight: 500, fontFamily: "var(--font-body-mb)" }}>Nama Lengkap</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-mb" placeholder="Masukkan nama Anda" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", color: "var(--color-text-mb-muted)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: "10px", fontWeight: 500, fontFamily: "var(--font-body-mb)" }}>Kehadiran</label>
                  <select value={form.attendance} onChange={(e) => setForm({ ...form, attendance: e.target.value })} className="input-mb">
                    <option value="hadir">Hadir</option>
                    <option value="tidak_hadir">Tidak Hadir</option>
                    <option value="mungkin">Masih Ragu</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", color: "var(--color-text-mb-muted)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: "10px", fontWeight: 500, fontFamily: "var(--font-body-mb)" }}>Jumlah Tamu</label>
                  <select value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className="input-mb">
                    {[1,2,3,4,5].map((n) => <option key={n} value={String(n)}>{n} Orang</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: "block", color: "var(--color-text-mb-muted)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: "10px", fontWeight: 500, fontFamily: "var(--font-body-mb)" }}>Ucapan &amp; Doa</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className="input-mb" style={{ resize: "none" }} placeholder="Tulis ucapan dan doa..." />
              </div>
              <button type="submit" disabled={loading} className="btn-mb" style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.5 : 1 }}>
                {loading ? "Mengirim..." : "Kirim Konfirmasi"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
