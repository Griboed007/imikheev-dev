import type { Book } from "@/lib/telemetry";

/**
 * Inline SVG glyphs for the life section — verbatim from the mockup (design "look" source
 * of truth). Hover states are driven entirely by the parent `.tile:hover` / `.book:hover`
 * rules in globals.css; no JS hover handlers (components/CLAUDE.md). Every hover animation
 * here is frozen by the reduced-motion CSS net + is listed in tokens.md §motion.
 */

/** Book spine glyph (`.bg2`): crown / bulb / loop, keyed off the shelf glyph field. */
export function BookGlyph({ glyph }: { glyph: Book["glyph"] }) {
  if (glyph === "crown") {
    return (
      <svg className="bg2" viewBox="0 0 200 40" aria-hidden="true">
        <path
          className="ln crown"
          d="M84 30 L84 16 L93 24 L100 10 L107 24 L116 16 L116 30 Z"
        />
      </svg>
    );
  }
  if (glyph === "bulb") {
    return (
      <svg className="bg2" viewBox="0 0 200 40" aria-hidden="true">
        <circle className="ln bulb" cx="100" cy="18" r="9" />
        <rect className="ln" x="96" y="27" width="8" height="6" rx="1.5" />
        <line className="ln ray" x1="100" y1="2" x2="100" y2="6" />
        <line className="ln ray" x1="86" y1="8" x2="89" y2="11" />
        <line className="ln ray" x1="114" y1="8" x2="111" y2="11" />
      </svg>
    );
  }
  return (
    <svg className="bg2" viewBox="0 0 200 40" aria-hidden="true">
      <g className="spinb">
        <path className="ln" d="M100 6 a14 14 0 1 1 -13 8" />
        <path d="M83 10 l5 5 l-8 2 z" style={{ fill: "var(--line-strong)" }} />
      </g>
    </svg>
  );
}

/** Camera + aperture glyph (`.tg2`) for the gear tile — aperture turns on hover. */
export function GearGlyph() {
  return (
    <svg className="tg2" viewBox="0 0 220 44" aria-hidden="true">
      <rect className="ln" x="78" y="10" width="64" height="28" rx="5" />
      <rect className="ln" x="94" y="5" width="18" height="6" rx="2" />
      <circle className="ln" cx="110" cy="24" r="10" />
      <polygon
        className="ln aper"
        points="110,17 116,20.5 116,27.5 110,31 104,27.5 104,20.5"
      />
    </svg>
  );
}

/** Steam wisps (`.steam`) over the coffee tile — dashes drift, amber + faster on hover. */
export function SteamGlyph() {
  return (
    <svg
      className="steam"
      viewBox="0 0 220 30"
      style={{ height: 28 }}
      aria-hidden="true"
    >
      <path d="M60 26 q4 -7 0 -12 q-4 -5 0 -10" />
      <path d="M78 26 q4 -7 0 -12 q-4 -5 0 -10" />
      <path d="M96 26 q4 -7 0 -12 q-4 -5 0 -10" />
    </svg>
  );
}

/**
 * Cross-country wheels + bike (`.tg2`). The wheel-rim hex #C89058 is a LITERAL decorative
 * tan-wall tone, not the semantic palette — it stays confined to this glyph exactly like a
 * scoped brand skin (a grep for the token won't find it). Spokes (`.bspin`) turn on hover.
 */
export function RideWheels() {
  return (
    <svg
      className="tg2"
      viewBox="0 0 220 60"
      style={{ height: 56 }}
      aria-hidden="true"
    >
      <circle cx="52" cy="40" r="16" fill="none" stroke="#C89058" strokeWidth="3" />
      <circle
        cx="52"
        cy="40"
        r="11.5"
        fill="none"
        stroke="var(--line-strong)"
        strokeWidth="1"
      />
      <g className="bspin">
        <line x1="52" y1="29.5" x2="52" y2="50.5" stroke="var(--line-strong)" strokeWidth="1" />
        <line x1="42.5" y1="34.5" x2="61.5" y2="45.5" stroke="var(--line-strong)" strokeWidth="1" />
        <line x1="42.5" y1="45.5" x2="61.5" y2="34.5" stroke="var(--line-strong)" strokeWidth="1" />
      </g>
      <circle cx="168" cy="40" r="16" fill="none" stroke="#C89058" strokeWidth="3" />
      <circle
        cx="168"
        cy="40"
        r="11.5"
        fill="none"
        stroke="var(--line-strong)"
        strokeWidth="1"
      />
      <g className="bspin">
        <line x1="168" y1="29.5" x2="168" y2="50.5" stroke="var(--line-strong)" strokeWidth="1" />
        <line x1="158.5" y1="34.5" x2="177.5" y2="45.5" stroke="var(--line-strong)" strokeWidth="1" />
        <line x1="158.5" y1="45.5" x2="177.5" y2="34.5" stroke="var(--line-strong)" strokeWidth="1" />
      </g>
      <path
        d="M52 40 L112 42 L104 16 M112 42 L148 15 M106 18 L148 15"
        fill="none"
        stroke="var(--ink-dim)"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M150 14 L154 24 L168 40 M152 19 L166 40"
        fill="none"
        stroke="var(--ink-dim)"
        strokeWidth="2.2"
      />
      <line x1="96" y1="10" x2="112" y2="10" stroke="var(--ink-dim)" strokeWidth="2.6" strokeLinecap="round" />
      <line x1="104" y1="16" x2="104" y2="11" stroke="var(--ink-dim)" strokeWidth="2" />
      <path
        d="M144 8 L152 8 L150 14"
        fill="none"
        stroke="var(--ink-dim)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="112" cy="42" r="3.6" fill="var(--panel2)" stroke="var(--ink-dim)" strokeWidth="1.6" />
    </svg>
  );
}

/**
 * The GPX ride map (`.ridemap`) — an amber-drawn route that fills in on hover. Both
 * endpoints are amber (live activity / now). The mockup painted the end dot teal
 * (#3ECFAE), but teal is reserved for verified outcomes only (root CLAUDE.md), and a bike
 * route endpoint isn't one — so we deviate from the mockup here and keep it in-semantic.
 * Flagged for the operator in the 009 report.
 */
export function RideMap() {
  return (
    <div className="ridemap">
      <svg viewBox="0 0 220 54" aria-hidden="true">
        <path
          d="M6 44 C 40 10, 70 52, 104 26 S 168 6, 214 18"
          fill="none"
          stroke="rgba(237,230,218,.25)"
          strokeWidth="1.4"
          strokeDasharray="3 4"
        />
        <path
          className="ride-draw"
          d="M6 44 C 40 10, 70 52, 104 26 S 168 6, 214 18"
          pathLength={100}
        />
        <circle cx="6" cy="44" r="3" fill="#F5A742" />
        <circle cx="214" cy="18" r="3" fill="#F5A742" />
      </svg>
    </div>
  );
}

/**
 * ChargeHyve logo — a third-party brand mark reproduced verbatim (its mono white form),
 * scoped to this tile like any brand skin; #fff here is the logo's own color, not the site
 * palette.
 */
export function ChargeHyveLogo() {
  return (
    <svg className="chlogo" viewBox="0 0 104.74 79.237" aria-label="ChargeHyve logo">
      <g transform="translate(476 -1118.161)" fill="#fff">
        <path d="M1859.516,1121.949v-2.12h.666q.795,0,.794.581a.592.592,0,0,1-.111.382.611.611,0,0,1-.364.193c.018.022.038.05.06.083s.047.072.076.12.055.09.077.129.052.09.089.157.067.117.084.151l.093.169c.043.078.071.13.084.155h-.366c-.039-.068-.128-.236-.269-.506a2.947,2.947,0,0,0-.249-.42h-.337v.926Zm.326-1.2h.266c.072,0,.134,0,.184-.007a.779.779,0,0,0,.146-.026.319.319,0,0,0,.113-.058.254.254,0,0,0,.067-.1.381.381,0,0,0,.024-.144.447.447,0,0,0-.015-.125.175.175,0,0,0-.049-.084.252.252,0,0,0-.076-.053.341.341,0,0,0-.111-.029,1.193,1.193,0,0,0-.135-.013c-.042,0-.1,0-.169,0h-.247Zm.36,1.631a1.488,1.488,0,0,0,.759-.2,1.394,1.394,0,0,0,.526-.533,1.5,1.5,0,0,0,.188-.742,1.478,1.478,0,0,0-.188-.736,1.381,1.381,0,0,0-.529-.535,1.472,1.472,0,0,0-.759-.2,1.451,1.451,0,0,0-.752.2,1.394,1.394,0,0,0-.524.533,1.487,1.487,0,0,0-.186.737,1.5,1.5,0,0,0,.186.741,1.427,1.427,0,0,0,.526.535A1.464,1.464,0,0,0,1860.2,1122.377Zm0,.222a1.791,1.791,0,0,1-1.212-.473,1.637,1.637,0,0,1-.373-.537,1.761,1.761,0,0,1,0-1.365,1.628,1.628,0,0,1,.373-.539,1.712,1.712,0,0,1,.549-.349,1.757,1.757,0,0,1,.661-.127,1.78,1.78,0,0,1,.666.127,1.737,1.737,0,0,1,.553.349,1.613,1.613,0,0,1,.375.539,1.739,1.739,0,0,1,0,1.365,1.6,1.6,0,0,1-.374.537,1.746,1.746,0,0,1-.552.346A1.776,1.776,0,0,1,1860.2,1122.6Z" transform="translate(-2233.194 57.742)" />
        <path d="M561.682,94.823l-15.445-8.861a11.271,11.271,0,0,0-10.752-.006L520.016,94.83a11.221,11.221,0,0,0-5.377,9.306v18.087a11.228,11.228,0,0,0,5.39,9.315l13.568,7.824a2.9,2.9,0,1,0,2.9-5.015l-13.578-7.828a5.482,5.482,0,0,1-2.482-4.3V104.136a5.48,5.48,0,0,1,2.482-4.3l15.456-8.867a5.5,5.5,0,0,1,4.967,0l15.456,8.867a5.482,5.482,0,0,1,2.481,4.3v18.088a5.485,5.485,0,0,1-2.481,4.3l-13.6,7.839a2.9,2.9,0,1,0,2.9,5.015l13.6-7.843a11.222,11.222,0,0,0,5.377-9.307V104.137A11.226,11.226,0,0,0,561.682,94.823Z" transform="translate(-965.714 1033.568)" />
        <path d="M1176.221,1113.082h-8.141v7.228H1166.3v-15.98h1.781v7.159h8.141v-7.159h1.757v15.98h-1.757Z" transform="translate(-1580.346 71.776)" />
        <path d="M1383.555,1182.35l2.89,10.045h.764l2.914-10.045h1.735l-4.81,16.674h-1.735l1.5-5.127H1385.1l-3.283-11.547Z" transform="translate(-1783.619 -1.81)" />
        <path d="M1565.158,1182.35l-2.8,10.045h-.856l-2.7-10.021-.935,3.24,2.34,8.283h3.468l3.262-11.547Z" transform="translate(-1949.666 -1.81)" />
        <path d="M1716.9,1183.624c0-2.863-.878-3.878-2.915-3.878-1.965,0-3.076,1.085-3.1,3.878Zm1.294,4.942.046,1.363a40.381,40.381,0,0,1-4.509.369c-3.447,0-4.579-2.009-4.579-5.935,0-4.387,1.9-6.074,4.833-6.074,3.076,0,4.648,1.617,4.648,5.4l-.092,1.316h-7.632c0,2.472.764,3.764,3.03,3.764C1715.671,1188.774,1718.192,1188.566,1718.192,1188.566Z" transform="translate(-2092.349 2.019)" />
        <path d="M86.592,1120.056a25.972,25.972,0,0,1-4.579.531c-4.857,0-6.013-2.632-6.013-8.129,0-5.957,1.341-8.128,6.013-8.128a22.4,22.4,0,0,1,4.6.623l-.093,2.539a34.882,34.882,0,0,0-4.047-.345c-2.428,0-3.192.855-3.192,5.311,0,4.226.555,5.312,3.285,5.312a35.258,35.258,0,0,0,3.954-.323Z" transform="translate(-552 71.776)" />
        <path d="M278.172,1117.245V1101.08h3.1v5.173a7.689,7.689,0,0,1,2.869-.831c3.237,0,4.07,2.032,4.07,5.566v6.258h-3.1v-6.189c0-1.731-.232-2.863-1.735-2.863a7.627,7.627,0,0,0-2.105.37v8.683Z" transform="translate(-742.684 74.842)" />
        <path d="M782.586,1192.839c-1.735,0-2.544-.323-2.544-.993a1.712,1.712,0,0,1,.624-1.317s1.434.162,2.081.162c1.712.022,2.174.115,2.174.993C784.921,1192.516,784.089,1192.839,782.586,1192.839Zm-.578-12.146c1.249,0,1.757.6,1.757,1.685s-.508,1.709-1.757,1.709-1.781-.624-1.781-1.709S780.758,1180.692,782.008,1180.692Zm.994,7.32c-1.966-.023-2.243-.162-2.243-.762a3.652,3.652,0,0,1,.232-.9,5.951,5.951,0,0,0,.948.093c3.168,0,4.879-.832,4.879-4.065a3,3,0,0,0-.509-1.57l1.156.092a5.265,5.265,0,0,1,1.8-2.458l-4.942.149a12.808,12.808,0,0,0-2.337-.3c-2.705,0-4.857,1.108-4.857,4.087a3.719,3.719,0,0,0,1.573,3.441,5.42,5.42,0,0,0-.9,1.847,2.169,2.169,0,0,0,.855,1.756,3.375,3.375,0,0,0-1.665,2.747c0,2.587,2.2,3.211,5.574,3.211,2.983,0,5.48-1.063,5.48-3.88C788.043,1188.913,786.933,1188.036,783,1188.012Z" transform="translate(-1213.156 2.019)" />
        <path d="M973.848,1182.491c0-1.87-.532-2.47-1.989-2.47-1.48,0-1.989.715-2.012,2.47Zm2.636,4.158.046,2.285a24.5,24.5,0,0,1-4.811.647c-3.491,0-4.972-1.731-4.972-5.888,0-4.111,1.734-6.213,5.111-6.213,3.4,0,5.042,1.733,5.042,5.219l-.231,2.148h-6.8c.023,1.385.671,2.009,2.335,2.009C974.1,1186.856,976.485,1186.648,976.485,1186.648Z" transform="translate(-1392.133 2.783)" />
        <path d="M476.007,1186.694a9.875,9.875,0,0,1-2.266.37c-.833,0-1.134-.554-1.134-1.362,0-.833.486-1.225,1.3-1.294l2.1-.184Zm4.031.577a1.194,1.194,0,0,1-.607-.181c-.238-.166-.293-.446-.325-.927v-4.8c0-2.7-1.2-3.88-4.209-3.88a21.09,21.09,0,0,0-4.695.67l.093,2.148s2.822-.185,4.348-.185c.925,0,1.364.255,1.364,1.247v.716l-2.475.185c-2.543.186-4.046.923-4.046,3.533,0,2.447,1.156,3.787,3.585,3.787a8.917,8.917,0,0,0,3.4-.808,4.452,4.452,0,0,0,1.675.7,10.508,10.508,0,0,0,1.892.109Z" transform="translate(-923.127 2.783)" />
        <path d="M678.5,1173.23a13.791,13.791,0,0,0-3.017.824,16.169,16.169,0,0,0-1.865.919v-1.225h-3.076v11.824h3.1v-8.013s.931-.326,2.257-.655A4.307,4.307,0,0,1,678.5,1173.23Z" transform="translate(-1112.761 6.791)" />
        <path d="M762.941,359.664c.036-.4.059-.812.059-1.226V354.31a2.607,2.607,0,0,0-2.609-2.606h-.751a1.147,1.147,0,0,1-1.147-1.146v-6.586a2.287,2.287,0,0,0-4.574,0v6.586a1.147,1.147,0,0,1-1.148,1.145h-6.85a1.146,1.146,0,0,1-1.148-1.145v-6.586a2.287,2.287,0,0,0-4.574,0v6.586a1.147,1.147,0,0,1-1.147,1.145H738.3a2.608,2.608,0,0,0-2.609,2.606v4.128c0,.413.023.821.059,1.226Z" transform="translate(-1174.206 791.082)" />
        <path d="M776.529,771.9a14.032,14.032,0,0,0,2.221,2.6h18.226a14.087,14.087,0,0,0,2.222-2.6Z" transform="translate(-1212.723 385.321)" />
        <path d="M742.334,693.331a13.814,13.814,0,0,0,.961,2.726h24.632a13.93,13.93,0,0,0,.962-2.726Z" transform="translate(-1180.471 459.421)" />
        <path d="M849.7,843.071a14.691,14.691,0,0,0,14.354,0Z" transform="translate(-1281.737 318.19)" />
      </g>
    </svg>
  );
}
