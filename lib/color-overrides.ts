import type { CustomColors } from "./types";

// Maps customColors (primary, accent, text, secondary) to each theme's CSS variables
const THEME_COLOR_MAP: Record<string, { primary: string[]; accent: string[]; text: string[]; secondary: string[] }> = {
  "emerald-gold": {
    primary: ["--color-emerald", "--color-emerald-deep"],
    accent: ["--color-gold"],
    text: ["--color-text-light", "--color-cream"],
    secondary: ["--color-gold-light", "--color-mint"],
  },
  "midnight-blue": {
    primary: ["--color-navy", "--color-navy-deep"],
    accent: ["--color-blue-accent"],
    text: ["--color-text-mb", "--color-white-soft"],
    secondary: ["--color-silver", "--color-silver-light"],
  },
  "ylang-ylang": {
    primary: ["--color-yy-forest"],
    accent: ["--color-yy-gold"],
    text: ["--color-yy-text"],
    secondary: ["--color-yy-blush", "--color-yy-gold-light"],
  },
  "rose-blush": {
    primary: ["--color-rb-rose"],
    accent: ["--color-rb-rosegold"],
    text: ["--color-rb-text"],
    secondary: ["--color-rb-blush", "--color-rb-dusty"],
  },
  "jawa-klasik": {
    primary: ["--jawa-bg"],
    accent: ["--jawa-gold"],
    text: ["--jawa-text"],
    secondary: ["--jawa-gold-light", "--jawa-red"],
  },
  "sunda-klasik": {
    primary: ["--sunda-bg"],
    accent: ["--sunda-gold"],
    text: ["--sunda-text"],
    secondary: ["--sunda-terra", "--sunda-green"],
  },
  cinematic: {
    primary: ["--cine-bg"],
    accent: ["--cine-gold"],
    text: ["--cine-text"],
    secondary: ["--cine-gold-light"],
  },
  galaxy: {
    primary: ["--galaxy-bg"],
    accent: ["--galaxy-purple"],
    text: ["--galaxy-text"],
    secondary: ["--galaxy-pink", "--galaxy-gold"],
  },
  "sakura-bloom": {
    primary: ["--sakura-pink"],
    accent: ["--sakura-gold"],
    text: ["--sakura-text"],
    secondary: ["--sakura-pink-light", "--sakura-rose"],
  },
};

export function generateColorOverrideCSS(theme: string, colors: CustomColors): string {
  const map = THEME_COLOR_MAP[theme];
  if (!map) return "";

  const rules: string[] = [];

  for (const [key, vars] of Object.entries(map)) {
    const value = colors[key as keyof CustomColors];
    if (!value) continue;
    for (const varName of vars) {
      rules.push(`${varName}: ${value};`);
    }
  }

  if (rules.length === 0) return "";

  // Use the theme class selector for specificity
  const selector = `.theme-${theme}`;
  return `${selector} { ${rules.join(" ")} }`;
}
