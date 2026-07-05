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
      keyframes: {
        // Ticker marquee: track is duplicated content, so -50% is a seamless loop point.
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        // Clock pulse dot (tokens.md §motion: pulse 2.4s).
        "dot-pulse": {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: ".35" },
        },
        // CTA beat (tokens.md §motion: border/color beat 3.2s).
        beat: {
          "0%,100%": {
            borderColor: "var(--line-strong)",
            color: "var(--ink-dim)",
          },
          "50%": { borderColor: "var(--amber)", color: "var(--amber)" },
        },
        // Motto primary CTA — the fill-glow beat variant (tokens.md §motion, line "CTAs").
        "beat-fill": {
          "0%,100%": { boxShadow: "0 0 0 rgba(245,167,66,0)" },
          "50%": { boxShadow: "0 0 26px rgba(245,167,66,.45)" },
        },
        // Hero accent glow (tokens.md §motion: text-shadow pulse 3.2s ease-in-out).
        glow: {
          "0%,100%": { textShadow: "0 0 14px rgba(245,167,66,.30)" },
          "50%": {
            textShadow: "0 0 26px rgba(245,167,66,.75), 0 0 52px rgba(245,167,66,.28)",
          },
        },
        // Hero caret blink (tokens.md §motion: blink 1.05s steps(1)).
        blink: {
          "50%": { opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 42s linear infinite",
        "marquee-mobile": "marquee 36s linear infinite",
        "dot-pulse": "dot-pulse 2.4s ease-in-out infinite",
        beat: "beat 3.2s ease-in-out infinite",
        "beat-fill": "beat-fill 3.2s ease-in-out infinite",
        glow: "glow 3.2s ease-in-out infinite",
        blink: "blink 1.05s steps(1) infinite",
      },
    },
  },
};

export default config;
