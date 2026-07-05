import type { GlyphKey } from "./toolbox";

/**
 * Method-card glyphs (mockup `.mg`), transcribed verbatim. Pure inline SVG — every hover and
 * the one ambient loop (the token travelling the rail) is driven by the parent `.m-card:hover`
 * in globals.css, no JS. All motion sits in the reduced-motion kill list (tokens.md §motion);
 * the global CSS net stops the token loop and freezes the hovers.
 */
export function MethodGlyph({ glyph }: { glyph: GlyphKey }) {
  switch (glyph) {
    case "pipeline": // token pipeline — token rides the rail between stations
      return (
        <svg className="mg" viewBox="0 0 260 58" aria-hidden="true">
          <line className="rail" x1="26" y1="30" x2="234" y2="30" />
          <rect className="st" x="12" y="18" width="28" height="24" rx="5" />
          <rect className="st" x="116" y="18" width="28" height="24" rx="5" />
          <rect className="st" x="220" y="18" width="28" height="24" rx="5" />
          <circle className="tok" cx="26" cy="30" r="4" />
        </svg>
      );
    case "waves": // phase-locking waves — the amber wave rises to meet the grey on hover
      return (
        <svg className="mg" viewBox="0 0 260 58" aria-hidden="true">
          <path
            className="w1"
            d="M10 24 q16 -14 32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0"
          />
          <path
            className="w2"
            d="M10 24 q16 -14 32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0"
          />
        </svg>
      );
    case "fan": // card fan — three cards spread on hover
      return (
        <svg className="mg" viewBox="0 0 260 58" aria-hidden="true">
          <g className="fan f1">
            <rect className="cardr" x="108" y="12" width="26" height="38" rx="4" />
          </g>
          <g className="fan f3">
            <rect className="cardr" x="126" y="12" width="26" height="38" rx="4" />
          </g>
          <g className="fan f2">
            <rect
              className="cardr"
              x="117"
              y="10"
              width="26"
              height="38"
              rx="4"
              style={{ stroke: "var(--amber)" }}
            />
          </g>
        </svg>
      );
    case "strata": // motivation archaeology — the drill sinks past the strata on hover
      return (
        <svg className="mg" viewBox="0 0 260 58" aria-hidden="true">
          <line className="strata" x1="40" y1="18" x2="220" y2="18" />
          <line className="strata" x1="40" y1="30" x2="220" y2="30" opacity=".7" />
          <line className="strata" x1="40" y1="42" x2="220" y2="42" opacity=".45" />
          <circle className="drill" cx="130" cy="12" r="4" />
        </svg>
      );
    case "pulse": // energy before mood — the flatline gives way to a spike on hover
      return (
        <svg className="mg" viewBox="0 0 260 58" aria-hidden="true">
          <path className="flat" d="M14 30 H246" />
          <path
            className="spike"
            d="M14 30 H90 l8 -16 l10 26 l8 -18 l8 8 H246"
          />
        </svg>
      );
    case "scribble": // permission to be bad — the mess resolves into a clean line on hover
      return (
        <svg className="mg" viewBox="0 0 260 58" aria-hidden="true">
          <path
            className="mess"
            d="M20 34 q18 -22 34 -4 t30 6 q14 10 26 -8 t28 -2 q16 14 32 2 t34 0"
          />
          <path className="clean" d="M20 40 C 90 40, 170 22, 244 20" />
        </svg>
      );
  }
}
