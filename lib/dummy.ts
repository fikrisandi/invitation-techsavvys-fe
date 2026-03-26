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

  photos: [],

  banks: [
    { bank: "Bank BCA", number: "1234567890", accountName: "a.n. Muhammad Reza Pratama" },
    { bank: "Bank Mandiri", number: "0987654321", accountName: "a.n. Aulia Rahma Dewi" },
  ],

  musicUrl: "/music/background.mp3",
  rsvpEnabled: true,
  wishesEnabled: true,
};

export const themes = [
  {
    id: "emerald-gold",
    name: "Emerald Gold",
    description: "Elegan dengan nuansa hijau zamrud dan emas. Cocok untuk pernikahan mewah dan sakral.",
    tags: ["Pernikahan", "Elegan", "Mewah"],
    available: true,
  },
  {
    id: "midnight-blue",
    name: "Midnight Blue",
    description: "Modern dan elegan dengan deep blue navy dan silver. Kesan mewah dan profesional.",
    tags: ["Pernikahan", "Modern", "Formal"],
    available: true,
  },
  {
    id: "ylang-ylang",
    name: "Ylang Ylang",
    description: "Hangat dan botanical dengan krem gading, hijau hutan, dan emas. Sentuhan alam yang elegan.",
    tags: ["Pernikahan", "Botanical", "Natural"],
    available: true,
  },
  {
    id: "rose-blush",
    name: "Rose Blush",
    description: "Romantis dengan warna pink lembut dan rosegold accent. Feminin dan hangat.",
    tags: ["Pernikahan", "Romantis", "Feminin"],
    available: true,
  },
];
