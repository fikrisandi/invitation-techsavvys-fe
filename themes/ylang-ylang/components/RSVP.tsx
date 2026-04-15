"use client";
import { useState } from "react";
import { BotanicalDivider } from "./BotanicalOrnament";
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
    <section id="rsvp" className="grad-yy-alt relative overflow-hidden geo-yy">
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "140px 32px" }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase" as const, color: "var(--color-yy-text-soft)", marginBottom: "20px", fontFamily: "var(--font-yy-body)" }}>RSVP</p>
          <h2 style={{ fontFamily: "var(--font-yy-script)", fontSize: "clamp(2.2rem, 7vw, 3rem)", color: "var(--color-yy-forest)", marginBottom: "8px" }}>Konfirmasi Kehadiran</h2>
          <BotanicalDivider />
        </div>
        <div className="card-yy reveal-up delay-2" style={{ maxWidth: "480px", margin: "0 auto", padding: "44px 36px" }}>
          {done ? (
            <div style={{ textAlign: "center", padding: "40px 0", animation: "fade-in 0.5s ease" }}>
              <div style={{ width: "60px", height: "60px", margin: "0 auto 24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, var(--color-yy-forest-light), var(--color-yy-forest))" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <p style={{ fontFamily: "var(--font-yy-script)", fontSize: "2rem", color: "var(--color-yy-forest)", marginBottom: "8px" }}>Terima Kasih</p>
              <p style={{ color: "var(--color-yy-text-soft)", fontSize: "12px", fontFamily: "var(--font-yy-body)" }}>Konfirmasi Anda telah kami terima</p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{ display: "block", color: "var(--color-yy-text-soft)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: "10px", fontWeight: 700, fontFamily: "var(--font-yy-body)" }}>Nama Lengkap</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-yy" placeholder="Masukkan nama Anda" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", color: "var(--color-yy-text-soft)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: "10px", fontWeight: 700, fontFamily: "var(--font-yy-body)" }}>Kehadiran</label>
                  <select value={form.attendance} onChange={(e) => setForm({ ...form, attendance: e.target.value })} className="input-yy">
                    <option value="hadir">Hadir</option>
                    <option value="tidak_hadir">Tidak Hadir</option>
                    <option value="mungkin">Masih Ragu</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", color: "var(--color-yy-text-soft)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: "10px", fontWeight: 700, fontFamily: "var(--font-yy-body)" }}>Jumlah</label>
                  <select value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className="input-yy">
                    {[1,2,3,4,5].map((n) => <option key={n} value={String(n)}>{n} Orang</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: "block", color: "var(--color-yy-text-soft)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: "10px", fontWeight: 700, fontFamily: "var(--font-yy-body)" }}>Ucapan &amp; Doa</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className="input-yy" style={{ resize: "none" }} placeholder="Tulis ucapan dan doa..." />
              </div>
              <button type="submit" disabled={loading} className="btn-yy" style={{ justifyContent: "center", opacity: loading ? 0.5 : 1 }}>
                {loading ? "Mengirim..." : "Kirim Konfirmasi"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
