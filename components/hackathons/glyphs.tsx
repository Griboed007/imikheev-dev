import type { HackGlyph } from "./hackathons";

/**
 * Hackathon card glyphs (mockup `.eg`): concentric rings (widen on hover), a lock with a
 * token flow-line (dots travel — ambient loop), an orbit with a spinning satellite (ambient
 * loop, speeds up on hover). The `fdot`/`spinme` loops are in the reduced-motion kill list
 * (tokens.md §motion); the global net stops them.
 */
export function PressGlyph({ glyph }: { glyph: HackGlyph }) {
  if (glyph === "rings") {
    return (
      <svg className="eg" viewBox="0 0 260 54" aria-hidden="true">
        <circle className="ln ring" cx="130" cy="27" r="7" />
        <circle className="ln ring r2" cx="130" cy="27" r="14" />
        <circle className="ln ring r3" cx="130" cy="27" r="21" />
      </svg>
    );
  }
  if (glyph === "lockflow") {
    return (
      <svg className="eg" viewBox="0 0 260 54" aria-hidden="true">
        <rect className="ln" x="116" y="20" width="28" height="20" rx="4" />
        <path className="ln" d="M122 20 v-5 a8 8 0 0 1 16 0 v5" />
        <line className="ln" x1="82" y1="48" x2="178" y2="48" opacity="0.5" />
        <circle className="fdot" cx="82" cy="48" r="2.4" />
        <circle className="fdot d2" cx="82" cy="48" r="2.4" />
        <circle className="fdot d3" cx="82" cy="48" r="2.4" />
      </svg>
    );
  }
  return (
    <svg className="eg" viewBox="0 0 260 54" aria-hidden="true">
      <ellipse className="ln" cx="130" cy="27" rx="34" ry="13" />
      <circle className="ln" cx="130" cy="27" r="6" />
      <g className="spinme">
        <circle cx="164" cy="27" r="3.2" fill="var(--amber)" />
      </g>
    </svg>
  );
}
