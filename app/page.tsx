"use client";
import { useState } from "react";
import Link from "next/link";
import { themes } from "@/lib/dummy";

const MAIN_URL = process.env.NEXT_PUBLIC_MAIN_URL ?? "https://techsavvys.com";

const CATEGORIES = ["Semua", "Elegan", "Modern", "Romantis", "Natural", "Tradisional"];

const FEATURES = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    title: "Undangan Personal",
    desc: "Setiap tamu mendapat link pribadi dengan namanya tercantum.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    title: "RSVP & Upload Tamu",
    desc: "Upload daftar tamu via Excel, konfirmasi kehadiran otomatis.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: "Expired Date",
    desc: "Atur masa aktif undangan, otomatis nonaktif setelah acara.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
    title: "Musik & Animasi",
    desc: "Background musik dan animasi indah untuk momen spesialmu.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    title: "Ucapan & Doa",
    desc: "Tamu bisa mengirim ucapan dan doa langsung di undangan.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
    title: "Subdomain Siap",
    desc: "Langsung tayang di invitation.techsavvys.com/nama-kamu.",
  },
];

// Palette dots preview
function PaletteDots({ colors }: { colors: string[] }) {
  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
      {colors.map((c, i) => (
        <div key={i} style={{ width: "14px", height: "14px", borderRadius: "50%", background: c, border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
      ))}
    </div>
  );
}

function ThemeCard({ theme }: { theme: (typeof themes)[0] }) {
  const isLight = theme.category === "Natural" || theme.category === "Romantis";
  const bgGrad = isLight
    ? `linear-gradient(145deg, ${theme.palette[0]}, ${theme.palette[2]}22)`
    : `linear-gradient(145deg, ${theme.palette[0]}, ${theme.palette[0]}dd)`;

  return (
    <div className="inv-card" style={{ borderRadius: "20px", overflow: "hidden", display: "flex", flexDirection: "column", background: "#fff", boxShadow: "0 2px 16px rgba(60,40,20,0.07)", border: "1px solid rgba(180,150,120,0.15)", transition: "all 0.35s ease" }}>
      {/* Thumbnail */}
      <div style={{ height: "190px", position: "relative", overflow: "hidden", background: bgGrad }}>
        {/* Decorative name preview */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px" }}>
          <div style={{ width: "36px", height: "1px", background: `linear-gradient(to right, transparent, ${theme.palette[1]}, transparent)`, opacity: 0.7 }} />
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(18px, 3vw, 22px)", fontStyle: "italic", color: isLight ? theme.palette[1] : theme.palette[2], opacity: 0.95, letterSpacing: "0.02em" }}>
            Reza &amp; Aulia
          </p>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: isLight ? theme.palette[1] : theme.palette[1], opacity: 0.6 }}>
            12 April 2025
          </p>
          <div style={{ width: "36px", height: "1px", background: `linear-gradient(to right, transparent, ${theme.palette[1]}, transparent)`, opacity: 0.5, marginTop: "2px" }} />
        </div>

        {/* Category badge */}
        <div style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "20px", padding: "3px 10px" }}>
          <span style={{ fontSize: "9px", letterSpacing: "0.1em", color: isLight ? theme.palette[1] : theme.palette[2], fontWeight: 700, textTransform: "uppercase" as const, fontFamily: "'Lato', sans-serif" }}>
            {theme.category}
          </span>
        </div>

        {!theme.available && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "10px", letterSpacing: "0.2em", color: "#fff", textTransform: "uppercase" as const, background: "rgba(0,0,0,0.5)", padding: "6px 16px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.15)" }}>
              Segera Hadir
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "20px 22px 22px", flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", fontWeight: 600, color: "#2C1F14", fontStyle: "italic" }}>{theme.name}</h3>
          <PaletteDots colors={theme.palette} />
        </div>
        <p style={{ fontSize: "12.5px", color: "#7A6A5A", lineHeight: 1.75, flex: 1, fontFamily: "'Lato', sans-serif" }}>{theme.description}</p>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" as const }}>
          {theme.tags.map((tag) => (
            <span key={tag} style={{ fontSize: "10px", color: "#9A7A5A", background: "#FAF6F0", border: "1px solid rgba(180,140,100,0.2)", padding: "3px 10px", borderRadius: "20px", fontFamily: "'Lato', sans-serif", fontWeight: 600, letterSpacing: "0.05em" }}>
              {tag}
            </span>
          ))}
        </div>
        {theme.available ? (
          <Link href={`/preview/${theme.id}`} className="inv-btn-preview">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Preview Tema
          </Link>
        ) : (
          <div style={{ textAlign: "center" as const, padding: "11px", borderRadius: "10px", background: "#F5F0EA", color: "#B0A090", fontSize: "12px", fontFamily: "'Lato', sans-serif", fontWeight: 600 }}>
            Segera Hadir
          </div>
        )}
      </div>
    </div>
  );
}

export default function CatalogPage() {
  const [activeFilter, setActiveFilter] = useState("Semua");

  const filtered = activeFilter === "Semua"
    ? themes
    : themes.filter((t) => t.category === activeFilter);

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F2", fontFamily: "'Lato', sans-serif" }}>

      {/* ── Navbar ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(250,247,242,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(180,150,120,0.15)", padding: "14px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="10" fill="#2C1F14"/>
              <text x="18" y="24" textAnchor="middle" fontFamily="Georgia, serif" fontSize="14" fontWeight="700" fill="#C4975A" fontStyle="italic">TS</text>
            </svg>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700, fontSize: "17px", color: "#2C1F14", lineHeight: 1.1, letterSpacing: "0.02em" }}>
                Invitation Savvys
              </div>
              <div style={{ fontSize: "10px", color: "#9A7A5A", letterSpacing: "0.05em" }}>
                by <a href={MAIN_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#C4975A", textDecoration: "none", fontWeight: 600 }}>Techsavvys</a>
              </div>
            </div>
          </div>
          {/* Nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            <a href="#themes" style={{ color: "#7A6A5A", fontSize: "14px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.02em" }}>Tema</a>
            <a href="#features" style={{ color: "#7A6A5A", fontSize: "14px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.02em" }}>Fitur</a>
            <a href={`${MAIN_URL}/kontak`} target="_blank" rel="noopener noreferrer"
              style={{ background: "#2C1F14", color: "#F5EDD8", padding: "10px 24px", borderRadius: "10px", fontWeight: 700, fontSize: "13px", textDecoration: "none", letterSpacing: "0.05em" }}>
              Pesan Sekarang
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ padding: "140px 28px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Subtle background ornament */}
        <div style={{ position: "absolute", top: "60px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(196,151,90,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "680px", margin: "0 auto", position: "relative" }}>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase" as const, color: "#C4975A", marginBottom: "20px" }}>
            Platform Undangan Digital
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.8rem, 6vw, 4.5rem)", fontWeight: 600, fontStyle: "italic", lineHeight: 1.1, color: "#2C1F14", marginBottom: "24px" }}>
            Undangan Digital<br/>
            <span style={{ color: "#C4975A" }}>yang Berkesan</span>
          </h1>
          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ flex: 1, maxWidth: "80px", height: "1px", background: "linear-gradient(to right, transparent, rgba(196,151,90,0.5))" }} />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#C4975A" opacity={0.6}><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
            <div style={{ flex: 1, maxWidth: "80px", height: "1px", background: "linear-gradient(to left, transparent, rgba(196,151,90,0.5))" }} />
          </div>
          <p style={{ fontSize: "16px", color: "#7A6A5A", maxWidth: "480px", margin: "0 auto 40px", lineHeight: 1.9 }}>
            Pilih tema, isi data, dan undangan siap dibagikan. Setiap tamu mendapat link personal dengan nama mereka.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" as const }}>
            <a href="#themes" style={{ background: "#2C1F14", color: "#F5EDD8", padding: "14px 36px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", textDecoration: "none", letterSpacing: "0.05em" }}>
              Lihat Tema
            </a>
            <a href={`${MAIN_URL}/kontak`} target="_blank" rel="noopener noreferrer"
              style={{ background: "transparent", color: "#2C1F14", padding: "14px 36px", borderRadius: "10px", fontWeight: 600, fontSize: "14px", textDecoration: "none", border: "1.5px solid rgba(60,40,20,0.2)" }}>
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>

      {/* ── Themes ── */}
      <section id="themes" style={{ padding: "60px 28px 100px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase" as const, color: "#C4975A", marginBottom: "12px" }}>Koleksi Tema</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 600, fontStyle: "italic", color: "#2C1F14", marginBottom: "32px" }}>
            Pilih Tema Undangan
          </h2>
          {/* Filter buttons */}
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" as const }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: "8px 20px", borderRadius: "30px", fontSize: "12px", fontWeight: 700,
                  fontFamily: "'Lato', sans-serif", letterSpacing: "0.05em", cursor: "pointer",
                  transition: "all 0.25s ease", border: "1.5px solid",
                  background: activeFilter === cat ? "#2C1F14" : "transparent",
                  color: activeFilter === cat ? "#F5EDD8" : "#7A6A5A",
                  borderColor: activeFilter === cat ? "#2C1F14" : "rgba(120,90,60,0.2)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "24px" }}>
          {filtered.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" style={{ padding: "80px 28px", background: "#F3EDE3" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase" as const, color: "#C4975A", marginBottom: "12px" }}>Kenapa Kami</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 600, fontStyle: "italic", color: "#2C1F14" }}>
              Semua yang Anda Butuhkan
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
            {FEATURES.map((f) => (
              <div key={f.title} style={{ background: "#FAF7F2", border: "1px solid rgba(180,150,120,0.15)", borderRadius: "16px", padding: "28px 24px" }}>
                <div style={{ width: "44px", height: "44px", background: "rgba(196,151,90,0.1)", border: "1px solid rgba(196,151,90,0.2)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#C4975A", marginBottom: "16px" }}>
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", fontWeight: 600, fontStyle: "italic", color: "#2C1F14", marginBottom: "8px" }}>{f.title}</h3>
                <p style={{ fontSize: "13px", color: "#7A6A5A", lineHeight: 1.75 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "100px 28px", textAlign: "center", background: "#2C1F14", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(196,151,90,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "520px", margin: "0 auto", position: "relative" }}>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase" as const, color: "#C4975A", marginBottom: "16px" }}>Mulai Sekarang</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, fontStyle: "italic", color: "#F5EDD8", marginBottom: "16px" }}>
            Siap Buat Undangan?
          </h2>
          <p style={{ color: "#9A8A7A", marginBottom: "36px", lineHeight: 1.8, fontSize: "15px" }}>
            Hubungi kami sekarang dan undangan digital Anda akan siap dalam waktu singkat.
          </p>
          <a href={`${MAIN_URL}/kontak`} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-block", background: "#C4975A", color: "#2C1F14", padding: "16px 48px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", textDecoration: "none", letterSpacing: "0.05em" }}>
            Pesan Sekarang
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "#231810", borderTop: "1px solid rgba(196,151,90,0.1)", padding: "28px 28px", textAlign: "center" }}>
        <p style={{ color: "#6A5A4A", fontSize: "13px" }}>
          &copy; 2025 Invitation Savvys &mdash; by{" "}
          <a href={MAIN_URL} style={{ color: "#C4975A", textDecoration: "none", fontWeight: 600 }} target="_blank" rel="noopener noreferrer">Techsavvys</a>
        </p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Lato:wght@400;600;700&display=swap');
        .inv-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(60,30,10,0.13) !important; border-color: rgba(196,151,90,0.3) !important; }
        .inv-btn-preview {
          margin-top: 4px; display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 11px 20px; border-radius: 10px; text-decoration: none;
          background: #FAF0E4; border: 1.5px solid rgba(196,151,90,0.35);
          color: #8C5A20; font-size: 12px; font-weight: 700; font-family: 'Lato', sans-serif;
          letter-spacing: 0.05em; transition: all 0.25s;
        }
        .inv-btn-preview:hover { background: #2C1F14; color: #F5EDD8; border-color: #2C1F14; }
      `}</style>
    </div>
  );
}
