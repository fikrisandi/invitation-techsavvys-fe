export type EventItem = {
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  mapsUrl?: string;
  mapsEmbedSrc?: string;
  icon?: "akad" | "reception" | "reception-morning" | "reception-evening" | "home" | "heart";
  type?: "akad" | "reception";
  code?: string;
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

export type CustomColors = {
  primary?: string;
  accent?: string;
  text?: string;
  secondary?: string;
  background?: string;
  backgroundAlt?: string;
  border?: string;
};

export type EffectName =
  | "stars"
  | "shooting-stars"
  | "glow-orbs"
  | "drift-particles"
  | "clouds"
  | "gold-particles"
  | "sakura-petals"
  | "nebula";

export type InvitationData = {
  slug: string;
  theme: "emerald-gold" | "midnight-blue" | "ylang-ylang" | "rose-blush" | "jawa-klasik" | "sunda-klasik" | "cinematic" | "sakura-bloom" | "galaxy";
  expiredAt: string; // ISO date string

  // Opening
  openingText?: string;

  // Custom colors (override theme defaults)
  customColors?: CustomColors;

  // Effect layer system — mix-and-match effects independent of theme
  effects?: EffectName[];
  effectConfig?: Record<string, Record<string, unknown>>;

  // Font override
  font?: string;

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
