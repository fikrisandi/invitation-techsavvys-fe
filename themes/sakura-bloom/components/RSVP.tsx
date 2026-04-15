"use client";
import { useState } from "react";
import { useInvitation } from "../context";
import { SakuraDivider } from "./SakuraEffect";
import { submitRsvp } from "@/lib/api";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "4px",
  border: "1px solid var(--sakura-border)",
  background: "var(--sakura-bg-t)",
  color: "var(--sakura-text)",
  fontFamily: "var(--font-sakura-body)",
  fontSize: "13px",
  outline: "none",
  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
  boxSizing: "border-box",
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
  const [focused, setFocused] = useState<string | null>(null);

  if (!rsvpEnabled) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitRsvp(slug, form);
      setDone(true);
    } catch {
      alert("Gagal mengirim RSVP. Periksa koneksi Anda lalu coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const getFocusStyle = (field: string): React.CSSProperties =>
    focused === field
      ? {
          ...inputStyle,
          borderColor: "var(--sakura-pink)",
          boxShadow: "0 0 0 3px rgba(212,112,138,0.12)",
        }
      : inputStyle;

  return (
    <section
      id="rsvp"
      style={{
        background: "var(--sakura-bg-t)",
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
            RSVP
          </p>
          <h2
            style={{
              fontFamily: "var(--font-sakura-script)",
              fontSize: "clamp(2.2rem, 7vw, 3.2rem)",
              color: "var(--sakura-pink)",
              marginBottom: "8px",
            }}
          >
            Konfirmasi Kehadiran
          </h2>
          <SakuraDivider />
        </div>

        <div
          className="reveal-up"
          style={{
            maxWidth: "480px",
            margin: "0 auto",
            background: "var(--sakura-bg-t)",
            border: "1px solid var(--sakura-border)",
            borderRadius: "4px",
            padding: "44px 36px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(to right, var(--sakura-pink-dark), var(--sakura-pink-light), var(--sakura-pink-dark))",
            }}
          />

          {done ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  margin: "0 auto 24px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, var(--sakura-pink), var(--sakura-rose))",
                  boxShadow: "0 8px 24px rgba(212,112,138,0.35)",
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-sakura-script)",
                  fontSize: "2.2rem",
                  color: "var(--sakura-pink)",
                  marginBottom: "10px",
                }}
              >
                Terima Kasih
              </p>
              <p
                style={{
                  color: "var(--sakura-text-soft)",
                  fontSize: "12px",
                  fontFamily: "var(--font-sakura-body)",
                  lineHeight: 1.8,
                }}
              >
                Konfirmasi Anda telah kami terima. Sampai jumpa di hari bahagia kami!
              </p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Name */}
              <div>
                <label
                  style={{
                    display: "block",
                    color: "var(--sakura-text-soft)",
                    fontSize: "9px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                    fontWeight: 700,
                    fontFamily: "var(--font-sakura-body)",
                  }}
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  placeholder="Masukkan nama Anda"
                  style={getFocusStyle("name")}
                />
              </div>

              {/* Attendance + Guests */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "var(--sakura-text-soft)",
                      fontSize: "9px",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      marginBottom: "10px",
                      fontWeight: 700,
                      fontFamily: "var(--font-sakura-body)",
                    }}
                  >
                    Kehadiran
                  </label>
                  <select
                    value={form.attendance}
                    onChange={(e) => setForm({ ...form, attendance: e.target.value })}
                    onFocus={() => setFocused("attendance")}
                    onBlur={() => setFocused(null)}
                    style={getFocusStyle("attendance")}
                  >
                    <option value="hadir">Hadir</option>
                    <option value="tidak_hadir">Tidak Hadir</option>
                    <option value="mungkin">Masih Ragu</option>
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "var(--sakura-text-soft)",
                      fontSize: "9px",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      marginBottom: "10px",
                      fontWeight: 700,
                      fontFamily: "var(--font-sakura-body)",
                    }}
                  >
                    Jumlah Tamu
                  </label>
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    onFocus={() => setFocused("guests")}
                    onBlur={() => setFocused(null)}
                    style={getFocusStyle("guests")}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={String(n)}>
                        {n} Orang
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  style={{
                    display: "block",
                    color: "var(--sakura-text-soft)",
                    fontSize: "9px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                    fontWeight: 700,
                    fontFamily: "var(--font-sakura-body)",
                  }}
                >
                  Ucapan &amp; Doa
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  rows={4}
                  placeholder="Tulis ucapan dan doa untuk mempelai..."
                  style={{ ...getFocusStyle("message"), resize: "none" }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "14px",
                  borderRadius: "40px",
                  background: loading
                    ? "var(--sakura-text-muted)"
                    : "linear-gradient(135deg, var(--sakura-pink), var(--sakura-rose))",
                  color: "#fff",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "var(--font-sakura-body)",
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  transition: "all 0.3s ease",
                  boxShadow: loading ? "none" : "0 6px 24px rgba(212,112,138,0.35)",
                }}
              >
                {loading ? "Mengirim..." : "Kirim Konfirmasi"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
