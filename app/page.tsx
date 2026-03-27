"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { themes } from "@/lib/dummy";

const MAIN_URL = process.env.NEXT_PUBLIC_MAIN_URL ?? "https://techsavvys.com";
const CATEGORIES = ["Semua", "Natural", "Romantis", "Modern", "Tradisional"];

const WA_NUMBER = "628993781044";
function waLink(msg: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

const PRICING = [
  {
    tier: "Basic",
    price: "60.000",
    color: "#3D5A45",
    bg: "#F2F7F4",
    desc: "Tema simpel & elegan dengan desain bersih dan berkesan.",
    includes: [
      "Unlimited tamu",
      "Link personal per tamu",
      "RSVP & ucapan doa",
      "Background music",
      "Galeri foto",
      "Google Maps & rekening",
      "Masa aktif 3 bulan",
    ],
    themes: ["Ylang Ylang", "Rose Blush"],
    highlight: false,
    waMsg: "Halo min, saya tertarik paket *Basic* (Rp 60.000) untuk undangan digital. Bisa info lebih lanjut?",
  },
  {
    tier: "Elegant",
    price: "95.000",
    color: "#5B1A7A",
    bg: "#F8F2FA",
    desc: "Visual modern dengan efek 3D, parallax, dan animasi memukau.",
    includes: [
      "Unlimited tamu",
      "Link personal per tamu",
      "RSVP & ucapan doa",
      "Background music",
      "Galeri foto",
      "Google Maps & rekening",
      "Masa aktif 3 bulan",
    ],
    themes: ["Midnight Blue", "Galaxy", "Sakura Bloom"],
    highlight: true,
    badge: "Terpopuler",
    waMsg: "Halo min, saya tertarik paket *Elegant* (Rp 95.000) untuk undangan digital. Bisa info lebih lanjut?",
  },
  {
    tier: "Premium",
    price: "130.000",
    color: "#7A3A00",
    bg: "#FAF4EE",
    desc: "Tema adat & sinematik dengan ornamen budaya eksklusif.",
    includes: [
      "Unlimited tamu",
      "Link personal per tamu",
      "RSVP & ucapan doa",
      "Background music",
      "Galeri foto",
      "Google Maps & rekening",
      "Masa aktif 3 bulan",
    ],
    themes: ["Jawa Klasik", "Sunda Klasik", "Cinematic", "Emerald Gold"],
    highlight: false,
    waMsg: "Halo min, saya tertarik paket *Premium* (Rp 130.000) untuk undangan digital. Bisa info lebih lanjut?",
  },
];

const FEATURES = [
  { icon: "👥", title: "Link Personal Tamu", desc: "Setiap tamu mendapat link dengan namanya tercantum otomatis." },
  { icon: "📋", title: "Upload Daftar Tamu", desc: "Import Excel/Sheet ratusan tamu sekaligus, langsung jadi link." },
  { icon: "✅", title: "RSVP Otomatis", desc: "Tamu konfirmasi hadir langsung di undangan, data masuk admin." },
  { icon: "⏰", title: "Masa Aktif & Expired", desc: "Atur tanggal kadaluarsa, undangan nonaktif otomatis setelah acara." },
  { icon: "🎵", title: "Musik & Animasi", desc: "Background music dan animasi sesuai tema untuk kesan mendalam." },
  { icon: "💬", title: "Ucapan & Doa", desc: "Tamu kirim ucapan langsung, tampil di undangan secara realtime." },
  { icon: "🗺️", title: "Google Maps Embed", desc: "Lokasi acara langsung tampil di undangan, bisa buka navigasi." },
  { icon: "💳", title: "Info Rekening Hadiah", desc: "Tampilkan info rekening dengan tombol salin nomor rekening." },
];

function fmt(price: number) {
  return "Rp " + price.toLocaleString("id-ID");
}

function PaletteDots({ colors }: { colors: string[] }) {
  return (
    <div style={{ display: "flex", gap: "5px" }}>
      {colors.map((c, i) => (
        <div key={i} style={{ width: "13px", height: "13px", borderRadius: "50%", background: c, border: "1px solid rgba(0,0,0,0.08)" }} />
      ))}
    </div>
  );
}

const TIER_COLOR: Record<string, { bg: string; text: string }> = {
  Basic:   { bg: "rgba(61,90,69,0.1)",   text: "#3D5A45" },
  Elegant: { bg: "rgba(91,26,122,0.12)", text: "#5B1A7A" },
  Premium: { bg: "rgba(122,58,0,0.1)",   text: "#7A3A00" },
};

function ThemeCard({ theme }: { theme: (typeof themes)[0] }) {
  const isLight = ["Natural", "Romantis"].includes(theme.category);
  const tc = TIER_COLOR[theme.tier ?? "Basic"];
  return (
    <div className="inv-card" style={{ borderRadius: "20px", overflow: "hidden", display: "flex", flexDirection: "column", background: "#fff", boxShadow: "0 2px 16px rgba(60,40,20,0.07)", border: "1px solid rgba(180,150,120,0.15)", transition: "all 0.35s ease" }}>
      {/* Thumbnail */}
      <div style={{ height: "185px", position: "relative", overflow: "hidden", background: isLight ? `linear-gradient(145deg, ${theme.palette[0]}, ${theme.palette[2]}33)` : `linear-gradient(145deg, ${theme.palette[0]}, ${theme.palette[0]}ee)` }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px" }}>
          <div style={{ width: "32px", height: "1px", background: `linear-gradient(to right, transparent, ${theme.palette[1]}, transparent)`, opacity: 0.7 }} />
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", fontStyle: "italic", color: isLight ? theme.palette[1] : theme.palette[2], opacity: 0.95 }}>Reza &amp; Aulia</p>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: isLight ? theme.palette[1] : theme.palette[1], opacity: 0.55 }}>12 April 2025</p>
          <div style={{ width: "32px", height: "1px", background: `linear-gradient(to right, transparent, ${theme.palette[1]}, transparent)`, opacity: 0.45, marginTop: "2px" }} />
        </div>
        {/* Tier badge */}
        {theme.tier && (
          <div style={{ position: "absolute", top: "10px", right: "10px", background: tc.bg, borderRadius: "20px", padding: "3px 10px" }}>
            <span style={{ fontSize: "9px", fontWeight: 700, color: tc.text, letterSpacing: "0.08em", fontFamily: "'Lato', sans-serif" }}>{theme.tier}</span>
          </div>
        )}
        {!theme.available && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "10px", letterSpacing: "0.2em", color: "#fff", textTransform: "uppercase" as const, background: "rgba(0,0,0,0.5)", padding: "5px 14px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.15)" }}>Segera Hadir</span>
          </div>
        )}
      </div>
      {/* Body */}
      <div style={{ padding: "18px 20px 20px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", fontWeight: 600, color: "#2C1F14", fontStyle: "italic" }}>{theme.name}</h3>
          <PaletteDots colors={theme.palette} />
        </div>
        <p style={{ fontSize: "12px", color: "#7A6A5A", lineHeight: 1.7, flex: 1, fontFamily: "'Lato', sans-serif" }}>{theme.description}</p>
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" as const }}>
          {theme.tags.map((tag) => (
            <span key={tag} style={{ fontSize: "9px", color: "#9A7A5A", background: "#FAF6F0", border: "1px solid rgba(180,140,100,0.2)", padding: "2px 9px", borderRadius: "20px", fontFamily: "'Lato', sans-serif", fontWeight: 600, letterSpacing: "0.05em" }}>{tag}</span>
          ))}
        </div>
        {/* Price */}
        {theme.price && (
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "17px", fontWeight: 600, color: tc.text, fontStyle: "italic" }}>
            {fmt(theme.price)}
          </p>
        )}
        {theme.available ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" }}>
            <Link href={`/preview/${theme.id}`} className="inv-btn-preview">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              Preview Tema
            </Link>
            <a href={waLink(`Halo min, saya ingin pesan undangan digital tema *${theme.name}* (${fmt(theme.price ?? 0)}). Bisa diproses?`)} target="_blank" rel="noopener noreferrer" className="inv-btn-order">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.613.613l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.336 0-4.512-.767-6.262-2.064l-.438-.333-3.156 1.058 1.058-3.156-.333-.438A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              Pesan via WhatsApp
            </a>
          </div>
        ) : (
          <div style={{ textAlign: "center" as const, padding: "10px", borderRadius: "10px", background: "#F5F0EA", color: "#B0A090", fontSize: "11px", fontFamily: "'Lato', sans-serif", fontWeight: 600 }}>Segera Hadir</div>
        )}
      </div>
    </div>
  );
}

export default function CatalogPage() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [menuOpen, setMenuOpen] = useState(false);
  const visible = themes.filter((t) => !t.hidden);
  const filtered = activeFilter === "Semua" ? visible : visible.filter((t) => t.category === activeFilter);

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F2", fontFamily: "'Lato', sans-serif" }}>

      {/* ── Navbar ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(250,247,242,0.97)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(180,150,120,0.15)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          {/* Brand */}
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <Image src="/logo-savvys.png" alt="Techsavvys" width={30} height={37} style={{ objectFit: "contain", filter: "brightness(0) sepia(1) saturate(4) brightness(0.72)" }} />
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700, fontSize: "16px", color: "#2C1F14", lineHeight: 1.1 }}>Invitation Savvys</div>
              <div style={{ fontSize: "9px", color: "#9A7A5A" }}>by <span style={{ color: "#C4975A", fontWeight: 600 }}>Techsavvys</span></div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="nav-desktop">
            <a href="#themes" className="nav-link">Tema</a>
            <a href="#pricing" className="nav-link">Harga</a>
            <a href="#features" className="nav-link">Fitur</a>
            <a href={waLink("Halo min, saya tertarik membuat undangan digital di Invitation Savvys. Bisa info lebih lanjut?")} target="_blank" rel="noopener noreferrer" className="nav-cta">Pesan Sekarang</a>
          </div>

          {/* Mobile: CTA + hamburger */}
          <div className="nav-mobile">
            <a href={waLink("Halo min, saya tertarik membuat undangan digital di Invitation Savvys. Bisa info lebih lanjut?")} target="_blank" rel="noopener noreferrer" className="nav-cta-sm">Pesan</a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="nav-burger" aria-label="Menu">
              <span className={`burger-line ${menuOpen ? "open-1" : ""}`} />
              <span className={`burger-line ${menuOpen ? "open-2" : ""}`} />
              <span className={`burger-line ${menuOpen ? "open-3" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="nav-dropdown">
            <a href="#themes"  className="nav-dd-link" onClick={() => setMenuOpen(false)}>Tema</a>
            <a href="#pricing" className="nav-dd-link" onClick={() => setMenuOpen(false)}>Harga</a>
            <a href="#features" className="nav-dd-link" onClick={() => setMenuOpen(false)}>Fitur</a>
            <a href={waLink("Halo min, saya tertarik membuat undangan digital di Invitation Savvys. Bisa info lebih lanjut?")} target="_blank" rel="noopener noreferrer" className="nav-dd-cta" onClick={() => setMenuOpen(false)}>Pesan Sekarang →</a>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section style={{ padding: "148px 28px 72px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "60px", left: "50%", transform: "translateX(-50%)", width: "700px", height: "500px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(196,151,90,0.09) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "680px", margin: "0 auto", position: "relative" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase" as const, color: "#C4975A", marginBottom: "18px" }}>Platform Undangan Digital</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.8rem, 6vw, 4.5rem)", fontWeight: 600, fontStyle: "italic", lineHeight: 1.1, color: "#2C1F14", marginBottom: "20px" }}>
            Undangan Digital<br/><span style={{ color: "#C4975A" }}>yang Berkesan</span>
          </h1>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ flex: 1, maxWidth: "80px", height: "1px", background: "linear-gradient(to right, transparent, rgba(196,151,90,0.5))" }} />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#C4975A" opacity={0.6}><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
            <div style={{ flex: 1, maxWidth: "80px", height: "1px", background: "linear-gradient(to left, transparent, rgba(196,151,90,0.5))" }} />
          </div>
          <p style={{ fontSize: "16px", color: "#7A6A5A", maxWidth: "480px", margin: "0 auto 36px", lineHeight: 1.9 }}>
            Pilih tema, isi data, dan undangan siap dibagikan. Mulai dari <strong style={{ color: "#2C1F14" }}>Rp 60.000</strong> — tamu mendapat link personal dengan nama mereka.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" as const }}>
            <a href="#themes" style={{ background: "#2C1F14", color: "#F5EDD8", padding: "14px 34px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>Lihat Tema</a>
            <a href="#pricing" style={{ background: "transparent", color: "#2C1F14", padding: "14px 34px", borderRadius: "10px", fontWeight: 600, fontSize: "14px", textDecoration: "none", border: "1.5px solid rgba(60,40,20,0.2)" }}>Lihat Harga</a>
          </div>
        </div>
      </section>

      {/* ── Themes ── */}
      <section id="themes" style={{ padding: "48px 28px 80px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase" as const, color: "#C4975A", marginBottom: "10px" }}>Koleksi Tema</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 600, fontStyle: "italic", color: "#2C1F14", marginBottom: "28px" }}>Pilih Tema Undanganmu</h2>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" as const }}>
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveFilter(cat)} style={{ padding: "8px 20px", borderRadius: "30px", fontSize: "12px", fontWeight: 700, fontFamily: "'Lato', sans-serif", letterSpacing: "0.04em", cursor: "pointer", transition: "all 0.25s ease", border: "1.5px solid", background: activeFilter === cat ? "#2C1F14" : "transparent", color: activeFilter === cat ? "#F5EDD8" : "#7A6A5A", borderColor: activeFilter === cat ? "#2C1F14" : "rgba(120,90,60,0.2)" }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "22px" }}>
          {filtered.map((theme) => <ThemeCard key={theme.id} theme={theme} />)}
        </div>
      </section>

      {/* ── Benefits ── */}
      <section id="pricing" style={{ padding: "80px 28px", background: "#F3EDE3" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase" as const, color: "#C4975A", marginBottom: "10px" }}>Semua Paket Dapat</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 600, fontStyle: "italic", color: "#2C1F14", marginBottom: "12px" }}>Fitur Lengkap, Tanpa Batasan</h2>
            <p style={{ color: "#7A6A5A", fontSize: "14px" }}>Mulai dari <strong style={{ color: "#2C1F14" }}>Rp 60.000</strong> — semua fitur sudah termasuk, yang berbeda hanya desain tema</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px", marginBottom: "40px" }}>
            {[
              { icon: "👥", label: "Unlimited Tamu" },
              { icon: "🔗", label: "Link Personal per Tamu" },
              { icon: "✅", label: "RSVP & Konfirmasi Hadir" },
              { icon: "💬", label: "Ucapan & Doa Realtime" },
              { icon: "🎵", label: "Background Music" },
              { icon: "📸", label: "Galeri Foto" },
              { icon: "🗺️", label: "Google Maps Embed" },
              { icon: "💳", label: "Info Rekening Hadiah" },
              { icon: "📋", label: "Upload Daftar Tamu (Excel)" },
              { icon: "⏰", label: "Masa Aktif 3 Bulan" },
              { icon: "✨", label: "Animasi & Efek Visual" },
              { icon: "📱", label: "Responsive di Semua Device" },
            ].map((b) => (
              <div key={b.label} style={{ display: "flex", alignItems: "center", gap: "12px", background: "#FAF7F2", border: "1px solid rgba(180,150,120,0.15)", borderRadius: "12px", padding: "16px 18px" }}>
                <span style={{ fontSize: "22px", flexShrink: 0 }}>{b.icon}</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#2C1F14" }}>{b.label}</span>
              </div>
            ))}
          </div>
          {/* Custom note */}
          <div style={{ textAlign: "center", background: "#FAF7F2", border: "1px solid rgba(180,150,120,0.2)", borderRadius: "16px", padding: "28px" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", fontStyle: "italic", color: "#2C1F14", marginBottom: "4px" }}>Butuh tema custom sepenuhnya?</p>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", fontWeight: 600, color: "#C4975A", marginBottom: "4px" }}>Rp 185.000</p>
            <p style={{ fontSize: "13px", color: "#7A6A5A", marginBottom: "20px" }}>Warna, layout, dan elemen sesuai keinginan — didesain dari nol khusus untuk Anda</p>
            <a href={waLink("Halo min, saya tertarik paket *Custom* (Rp 185.000) untuk undangan digital dengan desain khusus. Bisa konsultasi?")} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", border: "1.5px solid rgba(60,40,20,0.25)", color: "#2C1F14", padding: "12px 32px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>
              Konsultasi via WhatsApp →
            </a>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" style={{ padding: "80px 28px", background: "#FAF7F2" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase" as const, color: "#C4975A", marginBottom: "10px" }}>Kenapa Kami</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 600, fontStyle: "italic", color: "#2C1F14" }}>Semua yang Anda Butuhkan</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
            {FEATURES.map((f) => (
              <div key={f.title} style={{ background: "#F3EDE3", border: "1px solid rgba(180,150,120,0.15)", borderRadius: "16px", padding: "24px" }}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "17px", fontWeight: 600, fontStyle: "italic", color: "#2C1F14", marginBottom: "6px" }}>{f.title}</h3>
                <p style={{ fontSize: "13px", color: "#7A6A5A", lineHeight: 1.75 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "100px 28px", textAlign: "center", background: "#2C1F14", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "400px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(196,151,90,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "520px", margin: "0 auto", position: "relative" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase" as const, color: "#C4975A", marginBottom: "16px" }}>Mulai Sekarang</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, fontStyle: "italic", color: "#F5EDD8", marginBottom: "16px" }}>Siap Buat Undangan?</h2>
          <p style={{ color: "#9A8A7A", marginBottom: "36px", lineHeight: 1.8, fontSize: "15px" }}>Hubungi kami dan undangan digital Anda akan siap dalam waktu singkat.</p>
          <a href={waLink("Halo min, saya ingin buat undangan digital. Bisa bantu?")} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-block", background: "#C4975A", color: "#2C1F14", padding: "16px 48px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
            Pesan via WhatsApp
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "#231810", borderTop: "1px solid rgba(196,151,90,0.1)", padding: "28px", textAlign: "center" }}>
        <p style={{ color: "#6A5A4A", fontSize: "13px" }}>
          &copy; 2025 Invitation Savvys &mdash; by{" "}
          <a href={MAIN_URL} style={{ color: "#C4975A", textDecoration: "none", fontWeight: 600 }} target="_blank" rel="noopener noreferrer">Techsavvys</a>
        </p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Lato:wght@400;600;700&display=swap');

        /* ── Navbar ── */
        .nav-desktop { display: flex; align-items: center; gap: 24px; }
        .nav-link { color: #7A6A5A; font-size: 14px; font-weight: 600; text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: #2C1F14; }
        .nav-cta { background: #2C1F14; color: #F5EDD8; padding: 10px 22px; border-radius: 10px; font-weight: 700; font-size: 13px; text-decoration: none; letter-spacing: 0.04em; white-space: nowrap; transition: background 0.2s; }
        .nav-cta:hover { background: #3D2A1A; }
        .nav-mobile { display: none; align-items: center; gap: 10px; }
        .nav-cta-sm { background: #2C1F14; color: #F5EDD8; padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 12px; text-decoration: none; white-space: nowrap; }
        .nav-burger { display: flex; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 6px; }
        .burger-line { display: block; width: 22px; height: 2px; background: #2C1F14; border-radius: 2px; transition: transform 0.25s, opacity 0.25s; }
        .open-1 { transform: translateY(7px) rotate(45deg); }
        .open-2 { opacity: 0; }
        .open-3 { transform: translateY(-7px) rotate(-45deg); }
        .nav-dropdown { background: rgba(250,247,242,0.98); border-top: 1px solid rgba(180,150,120,0.15); padding: 12px 20px 16px; display: flex; flex-direction: column; gap: 4px; }
        .nav-dd-link { color: #5A4A3A; font-size: 15px; font-weight: 600; text-decoration: none; padding: 10px 0; border-bottom: 1px solid rgba(180,150,120,0.1); }
        .nav-dd-cta { display: block; margin-top: 10px; background: #2C1F14; color: #F5EDD8; padding: 13px 20px; border-radius: 10px; font-weight: 700; font-size: 14px; text-decoration: none; text-align: center; }

        @media (max-width: 680px) {
          .nav-desktop { display: none; }
          .nav-mobile { display: flex; }
        }

        /* ── Cards & Buttons ── */
        .inv-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(60,30,10,0.13) !important; border-color: rgba(196,151,90,0.3) !important; }
        .inv-btn-preview { margin-top: 4px; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 18px; border-radius: 10px; text-decoration: none; background: #FAF0E4; border: 1.5px solid rgba(196,151,90,0.35); color: #8C5A20; font-size: 12px; font-weight: 700; font-family: 'Lato', sans-serif; letter-spacing: 0.04em; transition: all 0.25s; }
        .inv-btn-preview:hover { background: #2C1F14; color: #F5EDD8; border-color: #2C1F14; }
        .inv-btn-order { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 18px; border-radius: 10px; text-decoration: none; background: #25D366; color: #fff; font-size: 12px; font-weight: 700; font-family: 'Lato', sans-serif; letter-spacing: 0.04em; transition: all 0.25s; border: 1.5px solid #25D366; }
        .inv-btn-order:hover { background: #1EBE57; border-color: #1EBE57; }
      `}</style>
    </div>
  );
}
