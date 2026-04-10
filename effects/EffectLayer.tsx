"use client";

import {
  Stars,
  ShootingStars,
  GlowOrbs,
  DriftParticles,
  Clouds,
  GoldParticles,
  SakuraPetals,
  Nebula,
  THEME_DEFAULT_EFFECTS,
} from "./index";
import type { EffectName } from "./index";

interface EffectLayerProps {
  /** Which effects to render. Falls back to theme defaults if empty/undefined. */
  effects?: EffectName[];
  /** Per-effect configuration overrides */
  effectConfig?: Record<string, Record<string, unknown>>;
  /** Current theme name — used to pick defaults when effects is empty */
  theme?: string;
}

const EFFECT_COMPONENTS: Record<EffectName, React.ComponentType<Record<string, unknown>>> = {
  stars: Stars,
  "shooting-stars": ShootingStars,
  "glow-orbs": GlowOrbs,
  "drift-particles": DriftParticles,
  clouds: Clouds,
  "gold-particles": GoldParticles,
  "sakura-petals": SakuraPetals,
  nebula: Nebula,
};

export default function EffectLayer({ effects, effectConfig = {}, theme }: EffectLayerProps) {
  // Determine which effects to show
  const activeEffects: EffectName[] =
    effects && effects.length > 0
      ? effects
      : (theme && THEME_DEFAULT_EFFECTS[theme]) || [];

  if (activeEffects.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {activeEffects.map((name) => {
        const Component = EFFECT_COMPONENTS[name];
        if (!Component) return null;
        const config = effectConfig[name] || {};
        return <Component key={name} {...config} />;
      })}
    </div>
  );
}
