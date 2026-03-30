import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://invitation.techsavvys-official.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Invitation Savvys — Undangan Digital Elegan & Modern",
    template: "%s | Invitation Savvys",
  },
  description:
    "Buat undangan digital pernikahan, ulang tahun, dan acara spesial yang elegan dan modern. Pilih tema, isi data, dan bagikan dalam hitungan menit. Melayani Gresik, Surabaya, dan seluruh Indonesia.",
  keywords: [
    "undangan digital",
    "undangan pernikahan digital",
    "undangan digital Gresik",
    "undangan digital Surabaya",
    "undangan digital Jawa Timur",
    "undangan nikah online",
    "undangan digital modern",
    "undangan digital elegan",
    "undangan digital murah",
    "undangan digital Indonesia",
    "invitation digital pernikahan",
    "undangan online Gresik",
    "undangan online Surabaya",
    "undangan walimahan digital",
    "Tech Savvys undangan",
    "Invitation Savvys",
  ],
  authors: [{ name: "Tech Savvys", url: "https://techsavvys-official.com" }],
  creator: "Tech Savvys",
  publisher: "Tech Savvys",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    siteName: "Invitation Savvys",
    title: "Invitation Savvys — Undangan Digital Elegan & Modern",
    description:
      "Buat undangan digital pernikahan, ulang tahun, dan acara spesial yang elegan dan modern. Melayani Gresik, Surabaya, dan seluruh Indonesia.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Invitation Savvys — Undangan Digital Elegan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invitation Savvys — Undangan Digital Elegan & Modern",
    description:
      "Buat undangan digital pernikahan, ulang tahun, dan acara spesial yang elegan dan modern. Melayani Gresik, Surabaya, dan seluruh Indonesia.",
    images: ["/opengraph-image"],
  },
  verification: {
    google: ["BeWnegs_ayyt_LY1v7Wipreuuq8U57Np8pE0c9k74f0", "OmWMB3ZkNgL4xMVg3T7m_e7k5kQOr95XJdJqI7RrdSg"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Invitation Savvys",
  url: BASE_URL,
  description:
    "Platform undangan digital elegan untuk pernikahan, ulang tahun, dan acara spesial. Pilih tema, isi data, dan bagikan dalam hitungan menit.",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "0",
    highPrice: "150000",
    priceCurrency: "IDR",
    offerCount: "3",
  },
  creator: {
    "@type": "Organization",
    name: "Tech Savvys",
    url: "https://techsavvys-official.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gresik",
      addressRegion: "Jawa Timur",
      addressCountry: "ID",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+628993781044",
      contactType: "customer support",
    },
  },
  areaServed: [
    { "@type": "City", name: "Gresik" },
    { "@type": "City", name: "Surabaya" },
    { "@type": "State", name: "Jawa Timur" },
    { "@type": "Country", name: "Indonesia" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
