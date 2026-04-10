export { default as Stars } from "./Stars";
export { default as ShootingStars } from "./ShootingStars";
export { default as GlowOrbs } from "./GlowOrbs";
export { default as DriftParticles } from "./DriftParticles";
export { default as Clouds } from "./Clouds";
export { default as GoldParticles } from "./GoldParticles";
export { default as SakuraPetals } from "./SakuraPetals";
export { default as Nebula } from "./Nebula";

export type EffectName =
  | "stars"
  | "shooting-stars"
  | "glow-orbs"
  | "drift-particles"
  | "clouds"
  | "gold-particles"
  | "sakura-petals"
  | "nebula";

/** Default effects per theme — used when invitation has no explicit effects field */
export const THEME_DEFAULT_EFFECTS: Record<string, EffectName[]> = {
  "midnight-blue": ["stars", "shooting-stars", "glow-orbs", "drift-particles"],
  "sunda-klasik": ["clouds"],
  "emerald-gold": ["gold-particles"],
  "galaxy": ["nebula"],
  "sakura-bloom": ["sakura-petals"],
  "jawa-klasik": ["gold-particles", "glow-orbs"],
  "cinematic": ["gold-particles"],
  "rose-blush": ["gold-particles"],
  "ylang-ylang": ["gold-particles"],
};
