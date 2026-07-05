/**
 * Dot-matrix monogram sampler (mockup education `.edu-dots`). Pure so it's unit-testable:
 * the caller supplies an `inked(x,y)` probe — in the browser built from an offscreen
 * canvas's `getImageData` (text rasterized to alpha), in tests a stub. Keeps text crisp at
 * any width and on-brand with the point language (proposal §Design — pre-baked images
 * rejected). The glyph strip is 80px tall (`.eg-area`); dots step every 4px, matching mockup.
 */
export const DOT_STEP = 4;
export const DOT_SIZE = 1.6;
export const ALPHA_THRESHOLD = 128;

export interface Dot {
  x: number;
  y: number;
}

/** Bold IBM Plex Mono sized to the strip (mockup: 700 · floor(h*1.15)px). */
export function monogramFont(height: number): string {
  return `700 ${Math.floor(height * 1.15)}px "IBM Plex Mono", monospace`;
}

/** Build an ink probe from RGBA image data: a pixel is inked if its alpha clears threshold. */
export function inkedFromAlpha(
  data: ArrayLike<number>,
  width: number,
  threshold = ALPHA_THRESHOLD,
): (x: number, y: number) => boolean {
  return (x, y) => data[(y * width + x) * 4 + 3] > threshold;
}

/** Walk a step-aligned grid; keep the cells the probe marks inked. */
export function sampleDots(
  width: number,
  height: number,
  inked: (x: number, y: number) => boolean,
  step = DOT_STEP,
): Dot[] {
  const dots: Dot[] = [];
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      if (inked(x, y)) dots.push({ x, y });
    }
  }
  return dots;
}
