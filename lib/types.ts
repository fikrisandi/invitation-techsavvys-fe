export type EventItem = {
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  mapsUrl?: string;
  mapsEmbedSrc?: string;
  icon?: "akad" | "reception" | "reception-morning" | "reception-evening" | "home" | "heart";
};

export type BankAccount = {
  bank: string;
  number: string;
  accountName: string;
};

export type Person = {
  nickname: string;
  fullName: string;
  parents: string;
  photo?: string;
};

export type InvitationData = {
  slug: string;
  theme: "emerald-gold"; // extend later
  expiredAt: string; // ISO date string

  // Opening
  openingText?: string;

  // Couple
  groom: Person;
  bride: Person;

  // Events
  events: EventItem[];

  // Gallery (photo URLs)
  photos: string[];

  // Gift
  banks?: BankAccount[];

  // Music
  musicUrl?: string;

  // Features
  rsvpEnabled?: boolean;
  wishesEnabled?: boolean;

  // API endpoint for RSVP & wishes
  apiUrl?: string;
};

export type ThemeMeta = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  available: boolean;
};
