import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Invitation Savvys — Undangan Digital Elegan",
  description: "Platform undangan digital elegan untuk hari spesial Anda. Pilih tema, isi data, dan bagikan dalam hitungan menit.",
  keywords: ["undangan digital", "undangan pernikahan", "digital invitation", "techsavvys"],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Invitation Savvys",
    description: "Undangan digital elegan untuk hari spesial Anda",
    type: "website",
    images: [{ url: "/logo-savvys.png", width: 426, height: 515, alt: "Invitation Savvys" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
