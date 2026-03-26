import Link from "next/link";
import { themes } from "@/lib/dummy";

const MAIN_URL = process.env.NEXT_PUBLIC_MAIN_URL ?? "https://techsavvys.com";

const featureList = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: "Tema Elegan",
    desc: "Desain premium yang bisa di-preview sebelum dipilih.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Undangan Personal",
    desc: "Setiap tamu mendapat link dengan nama pribadi.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "RSVP & Upload Tamu",
    desc: "Upload daftar tamu via Excel, konfirmasi hadir otomatis.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Expired Date",
    desc: "Atur tanggal kadaluarsa undangan secara otomatis.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    title: "Musik & Animasi",
    desc: "Background music dan animasi indah untuk momen spesial.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    ),
    title: "Subdomain Ready",
    desc: "Langsung tayang di invitation.techsavvys.com/[nama]",
  },
];

function ThemeCard({ theme }: { theme: (typeof themes)[0] }) {
  return (
    <div
      style={{
        background: "var(--color-card, #16161E)",
        border: "1px solid var(--color-border, #1E1E28)",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
      }}
      className="theme-card"
    >
      {/* Thumbnail */}
      <div
        style={{
          height: "200px",
          position: "relative",
          overflow: "hidden",
          background:
            theme.id === "emerald-gold"
              ? "linear-gradient(135deg, #031510 0%, #062A1F 40%, #0A3D2E 100%)"
              : theme.id === "midnight-blue"
              ? "linear-gradient(135deg, #020810 0%, #070D18 40%, #0B1221 100%)"
              : "linear-gradient(135deg, #111118 0%, #1E1E28 100%)",
        }}
      >
        {/* Decorative preview elements */}
        {theme.id === "emerald-gold" && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <div style={{ width: "48px", height: "1px", background: "linear-gradient(to right, transparent, #D4A853, transparent)", opacity: 0.6 }} />
            <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "32px", color: "#EAD18F", opacity: 0.9 }}>Reza &amp; Aulia</p>
            <div style={{ width: "48px", height: "1px", background: "linear-gradient(to right, transparent, #D4A853, transparent)", opacity: 0.6 }} />
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", color: "#7A9488", letterSpacing: "0.3em", textTransform: "uppercase", marginTop: "4px" }}>12 April 2025</p>
            {/* Floating dots */}
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{ position: "absolute", top: `${20 + i * 14}%`, left: `${10 + i * 18}%`, width: "3px", height: "3px", borderRadius: "50%", background: "#D4A853", opacity: 0.3 }} />
            ))}
          </div>
        )}
        {theme.id === "midnight-blue" && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <div style={{ width: "32px", height: "1px", background: "linear-gradient(to right, transparent, #4A9EE8, transparent)", opacity: 0.6 }} />
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#DDE3EE", opacity: 0.9, fontStyle: "italic" }}>Ahmad &amp; Sari</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", color: "#5A6A80", letterSpacing: "0.35em", textTransform: "uppercase" }}>15 Maret 2025</p>
            <div style={{ width: "32px", height: "1px", background: "linear-gradient(to right, transparent, #4A9EE8, transparent)", opacity: 0.4 }} />
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ position: "absolute", top: `${15 + i * 13}%`, left: `${8 + i * 15}%`, width: "2px", height: "2px", borderRadius: "50%", background: "#4A9EE8", opacity: 0.25 }} />
            ))}
          </div>
        )}
        {!theme.available && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--font-outfit, Outfit)", fontSize: "11px", letterSpacing: "0.2em", color: "#666672", textTransform: "uppercase", background: "rgba(6,6,8,0.8)", padding: "6px 16px", borderRadius: "20px", border: "1px solid #1E1E28" }}>
              Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ fontFamily: "var(--font-syne, Syne)", fontSize: "16px", fontWeight: 700, color: "#EEEEF2" }}>{theme.name}</h3>
          {theme.available && (
            <span style={{ fontSize: "10px", background: "rgba(0,191,165,0.12)", color: "#00BFA5", border: "1px solid rgba(0,191,165,0.25)", padding: "3px 10px", borderRadius: "20px", fontWeight: 500, letterSpacing: "0.05em" }}>
              Tersedia
            </span>
          )}
        </div>
        <p style={{ fontSize: "13px", color: "#666672", lineHeight: 1.7, flex: 1 }}>{theme.description}</p>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {theme.tags.map((tag) => (
            <span key={tag} style={{ fontSize: "10px", color: "#666672", background: "#111118", border: "1px solid #1E1E28", padding: "3px 8px", borderRadius: "6px" }}>
              {tag}
            </span>
          ))}
        </div>
        {theme.available ? (
          <Link
            href={`/preview/${theme.id}`}
            style={{
              marginTop: "4px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              padding: "11px 20px", borderRadius: "10px",
              background: "rgba(0,191,165,0.1)", border: "1px solid rgba(0,191,165,0.25)",
              color: "#00BFA5", fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em",
              transition: "all 0.3s",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Preview Tema
          </Link>
        ) : (
          <div style={{ marginTop: "4px", padding: "11px 20px", borderRadius: "10px", background: "#111118", border: "1px solid #1E1E28", color: "#666672", fontSize: "12px", fontWeight: 500, textAlign: "center" }}>
            Segera Hadir
          </div>
        )}
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#060608" }}>
      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(6,6,8,0.88)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid #1E1E28", padding: "16px 0",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", background: "#00BFA5", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 800, color: "#060608", fontFamily: "Syne, sans-serif" }}>
              IS
            </div>
            <div>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1rem", color: "#EEEEF2", lineHeight: 1.1 }}>
                INVITATION SAVVYS
              </div>
              <div style={{ fontSize: "0.6rem", color: "#666672", fontWeight: 400 }}>
                by{" "}
                <a href={MAIN_URL} style={{ color: "#00BFA5" }} target="_blank" rel="noopener noreferrer">
                  Techsavvys
                </a>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <a href="#themes" style={{ color: "#666672", fontSize: "0.9rem", fontWeight: 500, textDecoration: "none" }}>Tema</a>
            <a href="#features" style={{ color: "#666672", fontSize: "0.9rem", fontWeight: 500, textDecoration: "none" }}>Fitur</a>
            <a href={`${MAIN_URL}/kontak`} target="_blank" rel="noopener noreferrer"
              style={{ background: "#00BFA5", color: "#060608", padding: "10px 24px", borderRadius: "8px", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", transition: "0.3s" }}>
              Pesan Sekarang
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        padding: "160px 24px 100px",
        textAlign: "center",
        background: "radial-gradient(ellipse at 50% 0%, rgba(0,191,165,0.07) 0%, transparent 65%)",
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0,191,165,0.08)", border: "1px solid rgba(0,191,165,0.2)", borderRadius: "20px", padding: "6px 16px", marginBottom: "32px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00BFA5", animation: "pulse-ring 2s infinite" }} />
            <span style={{ fontSize: "12px", color: "#00BFA5", fontWeight: 500, letterSpacing: "0.05em" }}>Platform Undangan Digital</span>
          </div>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "24px", color: "#EEEEF2" }}>
            Undangan Digital{" "}
            <span style={{ color: "#00BFA5" }}>Elegan</span>
            <br />untuk Hari Spesial Anda
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#666672", maxWidth: "500px", margin: "0 auto 40px", lineHeight: 1.8 }}>
            Pilih tema, isi data, dan undangan siap dibagikan. Setiap tamu mendapat link personal dengan nama mereka.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#themes"
              style={{ background: "#00BFA5", color: "#060608", padding: "14px 32px", borderRadius: "10px", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", transition: "0.3s" }}>
              Lihat Tema
            </a>
            <a href={`${MAIN_URL}/kontak`} target="_blank" rel="noopener noreferrer"
              style={{ border: "1px solid #1E1E28", color: "#EEEEF2", padding: "14px 32px", borderRadius: "10px", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none", transition: "0.3s" }}>
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>

      {/* Themes */}
      <section id="themes" style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "2rem", fontWeight: 800, color: "#EEEEF2", marginBottom: "12px" }}>
            Pilih Tema Undangan
          </h2>
          <p style={{ color: "#666672", fontSize: "1rem" }}>
            Preview langsung sebelum memilih — desain premium yang bisa disesuaikan
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
          {themes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "80px 24px", background: "#0C0C12" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "2rem", fontWeight: 800, color: "#EEEEF2", marginBottom: "12px" }}>
              Semua yang Anda Butuhkan
            </h2>
            <p style={{ color: "#666672", fontSize: "1rem" }}>Fitur lengkap untuk undangan digital yang berkesan</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {featureList.map((f) => (
              <div key={f.title} style={{ background: "#16161E", border: "1px solid #1E1E28", borderRadius: "14px", padding: "28px 24px" }}>
                <div style={{ width: "44px", height: "44px", background: "rgba(0,191,165,0.08)", border: "1px solid rgba(0,191,165,0.15)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#00BFA5", marginBottom: "16px" }}>
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: "15px", fontWeight: 700, color: "#EEEEF2", marginBottom: "8px" }}>{f.title}</h3>
                <p style={{ fontSize: "13px", color: "#666672", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 24px", textAlign: "center", background: "radial-gradient(ellipse at 50% 100%, rgba(0,191,165,0.06) 0%, transparent 60%)" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "2rem", fontWeight: 800, color: "#EEEEF2", marginBottom: "16px" }}>
            Siap Buat Undangan?
          </h2>
          <p style={{ color: "#666672", marginBottom: "36px", lineHeight: 1.8 }}>
            Hubungi kami sekarang dan undangan digital Anda akan siap dalam waktu singkat.
          </p>
          <a href={`${MAIN_URL}/kontak`} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-block", background: "#00BFA5", color: "#060608", padding: "16px 48px", borderRadius: "10px", fontWeight: 700, fontSize: "1rem", textDecoration: "none" }}>
            Pesan Sekarang
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1E1E28", padding: "32px 24px", textAlign: "center" }}>
        <p style={{ color: "#666672", fontSize: "13px" }}>
          &copy; 2025 Invitation Savvys &mdash; by{" "}
          <a href={MAIN_URL} style={{ color: "#00BFA5" }} target="_blank" rel="noopener noreferrer">Techsavvys</a>
        </p>
      </footer>

      <style>{`
        .theme-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); border-color: #2A2A38 !important; }
      `}</style>
    </div>
  );
}
