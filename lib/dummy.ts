import type { InvitationData } from "./types";

export const dummyData: InvitationData = {
  slug: "preview",
  theme: "emerald-gold",
  expiredAt: "2027-01-01T00:00:00Z",
  openingText: "The Wedding Of",

  groom: {
    nickname: "Reza",
    fullName: "Muhammad Reza Pratama",
    parents: "Putra dari Bapak Ahmad & Ibu Siti",
    photo: undefined,
  },
  bride: {
    nickname: "Aulia",
    fullName: "Aulia Rahma Dewi",
    parents: "Putri dari Bapak Hendra & Ibu Rina",
    photo: undefined,
  },

  events: [
    {
      title: "Akad Nikah",
      date: "Sabtu, 12 April 2025",
      time: "08.00 — 09.00 WIB",
      location: "Masjid Al-Ikhlas",
      address: "Jl. Melati No. 12, Surabaya",
      icon: "akad",
      mapsEmbedSrc: "https://www.google.com/maps?q=-7.257472,112.752090&z=17&output=embed",
      mapsUrl: "https://maps.google.com",
    },
    {
      title: "Resepsi",
      date: "Sabtu, 12 April 2025",
      time: "10.00 — 14.00 WIB",
      location: "Gedung Serbaguna Bahagia",
      address: "Jl. Melati No. 12, Surabaya",
      icon: "reception",
      mapsEmbedSrc: "https://www.google.com/maps?q=-7.257472,112.752090&z=17&output=embed",
      mapsUrl: "https://maps.google.com",
    },
  ],

  photos: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=80",
  ],

  banks: [
    { bank: "Bank BCA", number: "1234567890", accountName: "a.n. Muhammad Reza Pratama" },
    { bank: "Bank Mandiri", number: "0987654321", accountName: "a.n. Aulia Rahma Dewi" },
  ],

  musicUrl: "/music/background.mp3",
  rsvpEnabled: true,
  wishesEnabled: true,

  loveStory: [
    {
      year: "2023",
      title: "Pertemuan Pertama",
      description: "Takdir mempertemukan kami di sebuah acara kampus. Percakapan singkat yang tak terlupakan, dan senyum yang jadi awal segalanya.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80",
    },
    {
      year: "2024",
      title: "Resmi Berpacaran",
      description: "Setahun saling mengenal, kami sepakat untuk melangkah bersama. Mulai menjalani hari demi hari berdua dengan tawa dan mimpi.",
      image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=700&q=80",
    },
    {
      year: "2025",
      title: "Lamaran",
      description: "Di hadapan keluarga, ia melamar dengan sederhana namun penuh makna. Jawabannya sudah tertulis di hati sejak lama: Iya.",
      image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=700&q=80",
    },
    {
      year: "2026",
      title: "Hari Bahagia",
      description: "Hari yang kami nantikan akhirnya tiba. Menyatukan dua hati, dua keluarga, dan membangun rumah tangga yang sakinah, mawaddah, warahmah.",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=700&q=80",
    },
  ],
};

export const NORMAL_PRICE = 110000;
export const CUSTOM_PRICE = 170000;

export const themes = [
  {
    id: "emerald-gold",
    name: "Emerald Gold",
    description: "Elegan dengan nuansa hijau zamrud dan emas. Cocok untuk pernikahan mewah dan sakral.",
    tags: ["Elegan", "Mewah"],
    category: "Elegan",
    palette: ["#0A3D2E", "#D4A853", "#EAD18F"],
    available: true,
    price: NORMAL_PRICE,
  },
  {
    id: "ylang-ylang",
    name: "Ylang Ylang",
    description: "Hangat dan botanical dengan krem gading, hijau hutan, dan emas. Sentuhan alam yang elegan.",
    tags: ["Natural", "Botanical"],
    category: "Natural",
    palette: ["#FAF7F2", "#3D5A45", "#C4975A"],
    available: true,
    price: NORMAL_PRICE,
  },
  {
    id: "rose-blush",
    name: "Rose Blush",
    description: "Romantis dengan warna pink lembut dan rosegold accent. Feminin dan hangat.",
    tags: ["Romantis", "Feminin"],
    category: "Romantis",
    palette: ["#FDF6F6", "#C17A8F", "#C99070"],
    available: true,
    price: NORMAL_PRICE,
  },
  {
    id: "midnight-blue",
    name: "Midnight Blue",
    description: "Modern dan elegan dengan deep blue navy dan silver. Kesan mewah dan profesional.",
    tags: ["Modern", "Formal"],
    category: "Modern",
    palette: ["#0B1221", "#4A9EE8", "#DDE3EE"],
    available: true,
    price: NORMAL_PRICE,
  },
  {
    id: "galaxy",
    name: "Galaxy",
    description: "Romantis berbintang dengan star field 3D, nebula gradient, dan partikel orbit yang memukau.",
    tags: ["Modern", "3D Effect"],
    category: "Modern",
    palette: ["#04040E", "#8B5CF6", "#E879A0"],
    available: true,
    price: NORMAL_PRICE,
  },
  {
    id: "jawa-klasik",
    name: "Tradisional Klasik 1",
    description: "Tema tradisional dengan animasi janur, motif batik, dan gunungan wayang. Sakral dan berbudaya.",
    tags: ["Tradisional", "Klasik"],
    category: "Tradisional",
    palette: ["#0E0600", "#D4A020", "#8B1515"],
    available: true,
    price: NORMAL_PRICE,
  },
  {
    id: "sunda-klasik",
    name: "Tradisional Klasik 2",
    description: "Tema tradisional dengan motif mega mendung, ornamen kujang, dan nuansa bumi yang hangat.",
    tags: ["Tradisional", "Klasik"],
    category: "Tradisional",
    palette: ["#0A0500", "#C89020", "#B05020"],
    available: true,
    price: NORMAL_PRICE,
  },
  {
    id: "sakura-bloom",
    name: "Sakura Bloom",
    description: "Kelopak sakura jatuh dalam efek 3D nyata, estetika Jepang yang bersih dan romantis.",
    tags: ["3D Effect", "Romantis"],
    category: "Romantis",
    palette: ["#FDF8F9", "#D4708A", "#C89050"],
    available: true,
    price: NORMAL_PRICE,
  },
  {
    id: "cinematic",
    name: "Cinematic",
    description: "Layar penuh sinematik, tipografi dramatis besar, dan transisi seperti trailer film.",
    tags: ["Modern", "Sinematik"],
    category: "Modern",
    palette: ["#080808", "#F0EAE0", "#C8A878"],
    available: true,
    price: NORMAL_PRICE,
  },
];
