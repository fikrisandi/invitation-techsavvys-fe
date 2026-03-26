import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "#060608", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ textAlign: "center", maxWidth: "400px" }}>
        <p style={{ fontFamily: "Syne, sans-serif", fontSize: "5rem", fontWeight: 800, color: "#1E1E28", marginBottom: "8px", lineHeight: 1 }}>404</p>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "1.4rem", fontWeight: 700, color: "#EEEEF2", marginBottom: "12px" }}>Halaman Tidak Ditemukan</h1>
        <p style={{ color: "#666672", fontSize: "14px", lineHeight: 1.8, marginBottom: "32px" }}>
          Undangan yang Anda cari tidak ditemukan atau sudah tidak tersedia.
        </p>
        <Link href="/" style={{ display: "inline-block", background: "rgba(0,191,165,0.1)", border: "1px solid rgba(0,191,165,0.25)", color: "#00BFA5", padding: "12px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: 500, textDecoration: "none" }}>
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
