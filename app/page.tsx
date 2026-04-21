"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { themes, NORMAL_PRICE, CUSTOM_PRICE } from "@/lib/dummy";
import { getActiveDiscount, type ActiveDiscount } from "@/lib/api";

type Discount = ActiveDiscount;

function useActiveDiscount(): Discount | null {
  const [discount, setDiscount] = useState<Discount | null>(null);
  useEffect(() => {
    getActiveDiscount().then((d) => { if (d) setDiscount(d); });
  }, []);
  return discount;
}

function useCountdown(endAt: string | undefined) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!endAt) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [endAt]);
  if (!endAt) return null;
  const ms = new Date(endAt).getTime() - now;
  if (ms <= 0) return null;
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

const MAIN_URL = process.env.NEXT_PUBLIC_MAIN_URL ?? "https://techsavvys.com";
const CATEGORIES = ["Semua", "Natural", "Romantis", "Modern", "Tradisional", "Elegan"];

const WA_NUMBER = "628993781044";
function waLink(msg: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

const FEATURES = [
  { icon: "👥", title: "Link Personal Tamu", desc: "Setiap tamu mendapat link dengan namanya tercantum otomatis." },
  { icon: "📋", title: "Upload Daftar Tamu", desc: "Import Excel/Sheet ratusan tamu sekaligus, langsung jadi link." },
  { icon: "✅", title: "RSVP Otomatis", desc: "Tamu konfirmasi hadir langsung di undangan, data masuk admin." },
  { icon: "⏰", title: "Masa Aktif & Expired", desc: "Atur tanggal kadaluarsa, undangan nonaktif otomatis setelah acara." },
  { icon: "🎵", title: "Musik & Animasi", desc: "Background music dan animasi sesuai tema untuk kesan mendalam." },
  { icon: "💬", title: "Ucapan & Doa", desc: "Tamu kirim ucapan langsung, tampil di undangan secara realtime." },
  { icon: "🗺️", title: "Google Maps Embed", desc: "Lokasi acara langsung tampil di undangan, bisa buka navigasi." },
  { icon: "💳", title: "Info Rekening Hadiah", desc: "Tampilkan info rekening dengan tombol salin nomor rekening." },
  { icon: "💞", title: "Perjalanan Cinta", desc: "Timeline kisah pertemuan sampai hari bahagia dengan foto & narasi per tahun." },
  { icon: "🎨", title: "Efek & Animasi Custom", desc: "Bintang, kelopak sakura, partikel emas, awan — sesuaikan efek per tema." },
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

type DiscountInfo = { percentage: number; endAt: string; label?: string | null } | null;

function ThemeCard({ theme, discount }: { theme: (typeof themes)[0]; discount?: DiscountInfo }) {
  const isLight = ["Natural", "Romantis"].includes(theme.category);
  const basePrice = theme.price ?? NORMAL_PRICE;
  const discountedPrice = discount ? Math.round(basePrice * (1 - discount.percentage / 100)) : null;
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
        {discount && (
          <div style={{ position: "absolute", top: "10px", right: "10px", background: "#E63946", borderRadius: "20px", padding: "3px 10px", boxShadow: "0 2px 8px rgba(230,57,70,0.35)" }}>
            <span style={{ fontSize: "10px", fontWeight: 700, color: "#fff", letterSpacing: "0.08em", fontFamily: "'Lato', sans-serif" }}>-{discount.percentage}%</span>
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
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" as const }}>
          {discountedPrice !== null ? (
            <>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", fontWeight: 700, color: "#E63946", fontStyle: "italic" }}>{fmt(discountedPrice)}</span>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "14px", color: "#A09080", textDecoration: "line-through", fontStyle: "italic" }}>{fmt(basePrice)}</span>
            </>
          ) : (
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "17px", fontWeight: 600, color: "#C4975A", fontStyle: "italic" }}>{fmt(basePrice)}</span>
          )}
        </div>
        {theme.available ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" }}>
            <Link href={`/preview/${theme.id}`} className="inv-btn-preview">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              Preview Tema
            </Link>
            <a href={waLink(`Halo min, saya ingin pesan undangan digital tema *${theme.name}* (${fmt(discountedPrice ?? basePrice)}${discountedPrice !== null ? ` — promo -${discount?.percentage}%` : ""}). Bisa diproses?`)} target="_blank" rel="noopener noreferrer" className="inv-btn-order">
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

function DiscountBanner({ discount }: { discount: Discount }) {
  const t = useCountdown(discount.endAt);
  if (!t) return null;
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div style={{ background: "linear-gradient(135deg, #E63946 0%, #C4975A 100%)", color: "#fff", padding: "12px 20px", textAlign: "center", fontSize: "13px", fontWeight: 600, fontFamily: "'Lato', sans-serif", letterSpacing: "0.02em", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" as const }}>
      <span>🎉 <strong>Promo {discount.percentage}%</strong>{discount.label ? ` — ${discount.label}` : ""}</span>
      <span style={{ opacity: 0.85 }}>berakhir dalam</span>
      <span style={{ fontFamily: "'Lato', monospace", fontWeight: 800, background: "rgba(0,0,0,0.2)", padding: "4px 10px", borderRadius: "6px", letterSpacing: "0.05em" }}>
        {t.days > 0 && `${t.days}h `}{pad(t.hours)}:{pad(t.minutes)}:{pad(t.seconds)}
      </span>
    </div>
  );
}

function CustomPriceDisplay({ discount }: { discount: Discount | null }) {
  const discounted = discount ? Math.round(CUSTOM_PRICE * (1 - discount.percentage / 100)) : null;
  if (discounted !== null) {
    return (
      <div style={{ marginBottom: "4px", display: "flex", alignItems: "baseline", justifyContent: "center", gap: "12px", flexWrap: "wrap" as const }}>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", fontWeight: 700, color: "#E63946", margin: 0 }}>{fmt(discounted)}</p>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", color: "#A09080", textDecoration: "line-through", margin: 0 }}>{fmt(CUSTOM_PRICE)}</p>
      </div>
    );
  }
  return <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", fontWeight: 600, color: "#C4975A", marginBottom: "4px" }}>{fmt(CUSTOM_PRICE)}</p>;
}

export default function CatalogPage() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [menuOpen, setMenuOpen] = useState(false);
  const discount = useActiveDiscount();
  const visible = themes.filter((t) => !t.hidden);
  const filtered = activeFilter === "Semua" ? visible : visible.filter((t) => t.category === activeFilter);

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F2", fontFamily: "'Lato', sans-serif" }}>

      {/* ── Navbar ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(250,247,242,0.97)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(180,150,120,0.15)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          {/* Brand */}
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <Image src="/logo-invitation.svg" alt="Invitation Savvys" width={180} height={46} style={{ objectFit: "contain" }} />
          </a>

          {/* Desktop links */}
          <div className="nav-desktop">
            <a href="#themes" className="nav-link">Tema</a>
            <a href="#pricing" className="nav-link">Benefit</a>
            <a href="#flow" className="nav-link">Cara Pesan</a>
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
            <a href="#pricing" className="nav-dd-link" onClick={() => setMenuOpen(false)}>Benefit</a>
            <a href="#flow" className="nav-dd-link" onClick={() => setMenuOpen(false)}>Cara Pesan</a>
            <a href="#features" className="nav-dd-link" onClick={() => setMenuOpen(false)}>Fitur</a>
            <a href={waLink("Halo min, saya tertarik membuat undangan digital di Invitation Savvys. Bisa info lebih lanjut?")} target="_blank" rel="noopener noreferrer" className="nav-dd-cta" onClick={() => setMenuOpen(false)}>Pesan Sekarang →</a>
          </div>
        )}
      </nav>

      {discount && <div style={{ marginTop: "64px" }}><DiscountBanner discount={discount} /></div>}

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
          <p style={{ fontSize: "16px", color: "#7A6A5A", maxWidth: "520px", margin: "0 auto 36px", lineHeight: 1.9 }}>
            Pilih tema, bayar, dan undangan siap dibagikan. Harga <strong style={{ color: "#2C1F14" }}>Rp 110.000</strong> flat semua tema — dan kini Anda bisa <strong style={{ color: "#2C1F14" }}>kelola daftar tamu sendiri</strong> lewat akun pribadi.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" as const }}>
            <a href="#themes" style={{ background: "#2C1F14", color: "#F5EDD8", padding: "14px 34px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>Lihat Tema</a>
            <a href="#pricing" style={{ background: "transparent", color: "#2C1F14", padding: "14px 34px", borderRadius: "10px", fontWeight: 600, fontSize: "14px", textDecoration: "none", border: "1.5px solid rgba(60,40,20,0.2)" }}>Lihat Benefit</a>
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
          {filtered.map((theme) => <ThemeCard key={theme.id} theme={theme} discount={discount} />)}
        </div>
      </section>

      {/* ── Paket & Value ── */}
      <section id="pricing" style={{ padding: "80px 28px", background: "#F3EDE3" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase" as const, color: "#C4975A", marginBottom: "10px" }}>Apa yang Anda Dapat</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 600, fontStyle: "italic", color: "#2C1F14", marginBottom: "12px" }}>Paket yang Jelas &amp; Transparan</h2>
            <p style={{ color: "#7A6A5A", fontSize: "14px", maxWidth: "560px", margin: "0 auto" }}>
              Semua paket sudah termasuk setup, akses dashboard, dan support admin. Bayar sekali, pakai sampai acara selesai.
            </p>
          </div>

          {/* 2-card comparison: Standard vs Custom */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", marginBottom: "36px" }}>
            {/* Paket Standard */}
            <div style={{ background: "#FAF7F2", border: "1.5px solid rgba(180,150,120,0.25)", borderRadius: "18px", padding: "28px 26px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", fontWeight: 700, fontStyle: "italic", color: "#2C1F14" }}>Paket Standard</h3>
                <span style={{ fontSize: "11px", color: "#7A6A5A", fontWeight: 600 }}>Tema Siap Pakai</span>
              </div>
              <p style={{ color: "#7A6A5A", fontSize: "13px", marginBottom: 18, lineHeight: 1.7 }}>
                Pilih salah satu dari 9 tema yang tersedia. Cocok untuk Anda yang butuh undangan cantik siap launch.
              </p>
              <div style={{ borderTop: "1px solid rgba(180,150,120,0.2)", paddingTop: 16 }}>
                {[
                  "Setup undangan dalam 1–2 hari kerja",
                  "Akun dashboard untuk kelola undangan",
                  "Upload daftar tamu via Excel/CSV",
                  "Kirim undangan via WhatsApp Web",
                  "Support admin setiap hari kerja",
                  "Masa aktif 3 bulan",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10, fontSize: "13px", color: "#2C1F14", padding: "6px 0", lineHeight: 1.6 }}>
                    <span style={{ color: "#C4975A", fontWeight: 700 }}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Paket Custom */}
            <div style={{ background: "linear-gradient(135deg, #FAF7F2 0%, #F0E6D6 100%)", border: "1.5px solid #C4975A", borderRadius: "18px", padding: "28px 26px", position: "relative" }}>
              <div style={{ position: "absolute", top: -12, right: 20, background: "#C4975A", color: "#FFF", fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", padding: "4px 12px", borderRadius: "20px" }}>PREMIUM</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", fontWeight: 700, fontStyle: "italic", color: "#2C1F14" }}>Paket Custom</h3>
                <span style={{ fontSize: "11px", color: "#7A6A5A", fontWeight: 600 }}>Desain Dari Nol</span>
              </div>
              <p style={{ color: "#7A6A5A", fontSize: "13px", marginBottom: 18, lineHeight: 1.7 }}>
                Desain undangan sesuai mood & tema pernikahan Anda. Warna, layout, dan elemen custom eksklusif.
              </p>
              <div style={{ borderTop: "1px solid rgba(180,150,120,0.2)", paddingTop: 16 }}>
                {[
                  "Semua benefit Paket Standard",
                  "Desain custom sesuai brief Anda",
                  "Revisi desain 2x sebelum launch",
                  "Konsultasi langsung dengan tim desainer",
                  "Warna & elemen eksklusif",
                  "Setup 3–5 hari kerja",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10, fontSize: "13px", color: "#2C1F14", padding: "6px 0", lineHeight: 1.6 }}>
                    <span style={{ color: "#C4975A", fontWeight: 700 }}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Garansi strip */}
          <div style={{ background: "#FAF7F2", border: "1px solid rgba(180,150,120,0.2)", borderRadius: "14px", padding: "20px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px", marginBottom: "32px" }}>
            {[
              { icon: "💰", title: "Bayar Sekali", desc: "Tidak ada biaya tersembunyi atau langganan bulanan" },
              { icon: "🔄", title: "Admin Responsif", desc: "Chat WA di jam kerja, respon < 1 jam" },
              { icon: "🔒", title: "Data Aman", desc: "Akun pribadi, tamu tidak bisa saling lihat" },
            ].map((g) => (
              <div key={g.title} style={{ display: "flex", gap: 12, alignItems: "start" }}>
                <span style={{ fontSize: "26px", flexShrink: 0 }}>{g.icon}</span>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#2C1F14", marginBottom: 3 }}>{g.title}</div>
                  <div style={{ fontSize: "12px", color: "#7A6A5A", lineHeight: 1.6 }}>{g.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Custom */}
          <div style={{ textAlign: "center", background: "#2C1F14", borderRadius: "16px", padding: "28px" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", fontStyle: "italic", color: "#F5EDD8", marginBottom: "4px" }}>Butuh tema custom sepenuhnya?</p>
            <p style={{ fontSize: "13px", color: "#9A8A7A", marginBottom: "20px" }}>Konsultasi gratis dengan tim desainer kami</p>
            <a href={waLink(`Halo min, saya tertarik *Paket Custom* untuk undangan digital dengan desain khusus. Bisa konsultasi?`)} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#C4975A", color: "#2C1F14", padding: "12px 32px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>
              💬 Konsultasi Custom via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Cara Pemesanan ── */}
      <section id="flow" style={{ padding: "80px 28px", background: "#FAF7F2" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase" as const, color: "#C4975A", marginBottom: "10px" }}>Cara Pemesanan</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 600, fontStyle: "italic", color: "#2C1F14", marginBottom: "12px" }}>Mudah, Cepat, & Fleksibel</h2>
            <p style={{ color: "#7A6A5A", fontSize: "14px", maxWidth: "560px", margin: "0 auto" }}>
              Bayar dulu, lalu pilih: undangan <strong style={{ color: "#2C1F14" }}>dibuatkan admin</strong> atau <strong style={{ color: "#2C1F14" }}>Anda buat & kelola tamu sendiri</strong> lewat akun pribadi.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px", marginBottom: "36px" }}>
            {[
              { num: "1", title: "Chat Admin via WA", desc: "Pilih tema & konsultasi dengan admin kami untuk konfirmasi detail acara." },
              { num: "2", title: "Lakukan Pembayaran", desc: "Transfer atau QRIS sesuai paket yang Anda pilih. Nominal akan dikonfirmasi oleh admin saat chat." },
              { num: "3", title: "Isi Data Undangan", desc: "Admin kirim form. Isi data pasangan, tanggal, lokasi, galeri foto, dll." },
              { num: "4", title: "Admin Setup Undangan", desc: "Tim kami setup undangan sesuai data Anda, siap dalam 1–2 hari kerja." },
              { num: "5", title: "Anda Dapat Akun", desc: "Email & password dikirim ke Anda — login ke dashboard untuk kelola tamu." },
              { num: "6", title: "Kelola & Sebar Undangan", desc: "Upload daftar tamu (CSV/Excel) & kirim ke tamu langsung via WhatsApp Web." },
            ].map((step) => (
              <div key={step.num} style={{ background: "#FFF", border: "1px solid rgba(180,150,120,0.2)", borderRadius: "16px", padding: "22px 20px", position: "relative" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#C4975A", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, marginBottom: "12px" }}>{step.num}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "17px", fontWeight: 600, fontStyle: "italic", color: "#2C1F14", marginBottom: "6px" }}>{step.title}</h3>
                <p style={{ fontSize: "13px", color: "#7A6A5A", lineHeight: 1.75 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ background: "linear-gradient(135deg, #2C1F14, #3A2819)", borderRadius: "18px", padding: "32px 28px", textAlign: "center", color: "#F5EDD8" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "#C4975A", marginBottom: "10px" }}>✨ Paling Populer</p>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontStyle: "italic", marginBottom: "10px", fontWeight: 600 }}>Kelola Undangan Sendiri Lewat Akun Pribadi</h3>
            <p style={{ color: "#9A8A7A", fontSize: "14px", lineHeight: 1.8, maxWidth: "620px", margin: "0 auto 24px" }}>
              Setelah admin setup undangan, Anda dapat akun pribadi untuk <strong style={{ color: "#F5EDD8" }}>cek informasi undangan kapan saja, upload daftar tamu, dan kirim undangan langsung via WhatsApp Web</strong>. Termasuk <strong style={{ color: "#F5EDD8" }}>revisi desain 2x</strong> & sync terus dengan admin via WA.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px", maxWidth: "720px", margin: "0 auto" }}>
              {[
                { icon: "📋", label: "Cek Info Undangan" },
                { icon: "📊", label: "Upload Excel/CSV" },
                { icon: "📱", label: "Kirim via WA Web" },
                { icon: "🎨", label: "Revisi Desain 2x" },
                { icon: "💬", label: "Sync Admin via WA" },
                { icon: "🔗", label: "Link Personal Otomatis" },
              ].map((b) => (
                <div key={b.label} style={{ background: "rgba(196,151,90,0.15)", borderRadius: "10px", padding: "10px 12px", display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                  <span style={{ fontSize: "18px" }}>{b.icon}</span>
                  <span style={{ fontSize: "12px", fontWeight: 600 }}>{b.label}</span>
                </div>
              ))}
            </div>
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
        <div style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase" as const, color: "#C4975A", marginBottom: "16px" }}>Mulai Sekarang</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, fontStyle: "italic", color: "#F5EDD8", marginBottom: "16px" }}>Siap Buat Undangan?</h2>
          <p style={{ color: "#9A8A7A", marginBottom: "32px", lineHeight: 1.8, fontSize: "15px" }}>Chat admin via WhatsApp untuk konsultasi & pembayaran. Undangan siap dalam 1–2 hari kerja, dan Anda langsung dapat akun untuk kelola tamu sendiri.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" as const, marginBottom: "16px" }}>
            <a href={waLink("Halo min, saya ingin buat undangan digital (Rp 110.000). Bisa bantu?")} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", background: "#C4975A", color: "#2C1F14", padding: "16px 36px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
              💬 Pesan via WhatsApp
            </a>
            <a href="#flow"
              style={{ display: "inline-block", background: "transparent", color: "#F5EDD8", padding: "16px 32px", borderRadius: "10px", fontWeight: 600, fontSize: "14px", textDecoration: "none", border: "1.5px solid rgba(245,237,216,0.25)" }}>
              Lihat Cara Pemesanan
            </a>
          </div>
          <p style={{ color: "#6A5A4A", fontSize: "12px", marginTop: "8px" }}>Sudah punya akun? <a href="/admin/login" style={{ color: "#C4975A", textDecoration: "underline" }}>Login di sini</a></p>
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
