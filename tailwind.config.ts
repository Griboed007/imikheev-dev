import type { Config } from "tailwindcss";

/**
 * Single source of token *values* for the whole project.
 * Extracted 1:1 from `design/tokens.md` (+ `design/reference/portfolio-mockup-v0.8.html`).
 * Do not invent values. Colors here generate Tailwind utilities (bg-amber, text-ink, …);
 * `app/globals.css` mirrors these same values into `:root` custom properties for raw
 * CSS (keyframes/gradients) — a parity test guards the two against drift.
 */
export const tokens = {
  colors: {
    bg: "#0E0C0A",
    panel: "#151210",
    panel2: "#1C1814",
    line: "rgba(237,230,218,.10)",
    "line-strong": "rgba(237,230,218,.20)",
    ink: "#EDE6DA",
    "ink-dim": "rgba(237,230,218,.64)",
    "ink-mute": "rgba(237,230,218,.38)",
    amber: "#F5A742",
    "amber-bg": "rgba(245,167,66,.12)",
    teal: "#3ECFAE",
    "teal-bg": "rgba(62,207,174,.12)",
    clay: "#DA7756",
    "dg-blue": "#6B9BFF",
    "tk-violet": "#8B5CF6",
    tanwall: "#C89058",
  },
  radii: { card: "12px", sub: "10px", chip: "6px" },
  easing: { reveal: "cubic-bezier(.16,1,.3,1)" },
  fonts: {
    mono: "var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
    sans: "var(--font-sans), system-ui, -apple-system, 'Segoe UI', sans-serif",
  },
} as const;

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: { ...tokens.colors },
      fontFamily: {
        mono: [tokens.fonts.mono],
        sans: [tokens.fonts.sans],
      },
      borderRadius: { ...tokens.radii },
      transitionTimingFunction: { ...tokens.easing },
    },
  },
};

export default config;
