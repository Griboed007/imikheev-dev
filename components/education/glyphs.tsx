import type { EduGlyph } from "./chapters";

/**
 * Education card glyphs (mockup `.eg`): AR cube (lifts on hover), assembling stack (rows
 * snap into place), integration diamond (nodes wire into a diamond). All hover states are
 * CSS-driven via `.card:hover .eg …` — no JS (components/CLAUDE.md).
 */
export function ChapterGlyph({ glyph }: { glyph: EduGlyph }) {
  if (glyph === "cube") {
    return (
      <svg className="eg" viewBox="0 0 260 54" aria-hidden="true">
        <rect className="ln" x="104" y="16" width="26" height="26" rx="2" />
        <rect className="ln cubeB" x="116" y="8" width="26" height="26" rx="2" />
        <line className="ln" x1="104" y1="16" x2="116" y2="8" />
        <line className="ln" x1="130" y1="16" x2="142" y2="8" />
        <line className="ln" x1="104" y1="42" x2="116" y2="34" />
        <line className="ln" x1="130" y1="42" x2="142" y2="34" />
      </svg>
    );
  }
  if (glyph === "stack") {
    return (
      <svg className="eg" viewBox="0 0 260 54" aria-hidden="true">
        <rect className="fl2 b3" x="106" y="6" width="48" height="11" rx="3" />
        <rect className="fl2 b2" x="106" y="21" width="48" height="11" rx="3" />
        <rect className="fl2" x="106" y="36" width="48" height="11" rx="3" />
      </svg>
    );
  }
  return (
    <svg className="eg" viewBox="0 0 260 54" aria-hidden="true">
      <circle className="ln" cx="88" cy="12" r="4" />
      <circle className="ln" cx="84" cy="40" r="4" />
      <circle className="ln" cx="106" cy="27" r="4" />
      <line className="ln" x1="92" y1="14" x2="140" y2="24" />
      <line className="ln" x1="88" y1="38" x2="140" y2="30" />
      <line className="ln" x1="110" y1="27" x2="140" y2="27" />
      <rect
        className="ln dia"
        x="140"
        y="17"
        width="20"
        height="20"
        rx="3"
        transform="rotate(45 150 27)"
      />
    </svg>
  );
}
