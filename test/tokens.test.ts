import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { tokens } from "@/tailwind.config";

/**
 * Expected color values, transcribed by hand from `design/tokens.md`.
 * This is the assertion the proposal's task-1 names: "theme exposes all colors from
 * tokens.md". If a token value drifts from the design doc, this fails.
 */
const EXPECTED_COLORS: Record<string, string> = {
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
};

describe("design tokens are the single styling source", () => {
  it("the Tailwind theme exposes every color from tokens.md with the exact value", () => {
    for (const [name, value] of Object.entries(EXPECTED_COLORS)) {
      expect(tokens.colors, `missing color token: ${name}`).toHaveProperty(name);
      expect(
        (tokens.colors as Record<string, string>)[name],
        `wrong value for --${name}`,
      ).toBe(value);
    }
  });

  it("exposes no color the design doc does not list (no invented tokens)", () => {
    for (const name of Object.keys(tokens.colors)) {
      expect(EXPECTED_COLORS, `unexpected color token: ${name}`).toHaveProperty(name);
    }
  });

  it("globals.css :root mirrors every token color (no drift between config and CSS)", () => {
    const css = readFileSync(resolve(process.cwd(), "app/globals.css"), "utf8");
    for (const value of Object.values(tokens.colors)) {
      expect(css, `globals.css :root is missing ${value}`).toContain(value);
    }
  });
});
