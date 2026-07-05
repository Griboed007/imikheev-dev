import { describe, it, expect } from "vitest";
import {
  sampleDots,
  inkedFromAlpha,
  monogramFont,
  DOT_STEP,
} from "@/lib/canvas/monogram";

/**
 * Proves the grid + probe plumbing of the sampler. It does NOT prove that "UT" rasterizes
 * to dots — real text→ink needs a canvas 2D context (absent in jsdom), so that path is
 * browser-only and verified in Track B ("monograms clearly visible behind glyphs").
 */
describe("monogram sampler (006)", () => {
  it("keeps step-aligned grid cells the probe marks inked", () => {
    // emulate a 'UT'-shaped ink block in the centre of a 260×54 strip
    const inked = (x: number, y: number) => x > 100 && x < 160 && y > 12 && y < 44;
    const dots = sampleDots(260, 54, inked);
    expect(dots.length).toBeGreaterThan(0);
    expect(dots.every((d) => d.x % DOT_STEP === 0 && d.y % DOT_STEP === 0)).toBe(true);
  });

  it("returns no dots when nothing is inked", () => {
    expect(sampleDots(260, 54, () => false)).toEqual([]);
  });

  it("thresholds the alpha channel (mockup: alpha > 128)", () => {
    // two pixels: first alpha 200 (inked), second alpha 10 (blank)
    const data = [0, 0, 0, 200, 0, 0, 0, 10];
    const inked = inkedFromAlpha(data, 2);
    expect(inked(0, 0)).toBe(true);
    expect(inked(1, 0)).toBe(false);
  });

  it("scales the font with strip height and names IBM Plex Mono", () => {
    expect(monogramFont(54)).toContain("IBM Plex Mono");
    expect(monogramFont(54)).toContain("62px"); // floor(54 * 1.15)
  });
});
