# 001 — Foundation & design system

## Why
Every later change consumes tokens, fonts, layout primitives, and the reduced-motion
policy. Locking them first prevents drift between eleven changes.

## What Changes
- Tailwind theme mapped 1:1 from `design/tokens.md` (colors, radii, fonts, easings).
- `next/font/google` setup: IBM Plex Mono + Instrument Sans with system fallbacks.
- Base layout: `<Wrap>` (max-w 1060, px-24), `<Section>` with `~/path` eyebrow +
  underlined heading row, `<Reveal>` (IntersectionObserver fade/rise).
- Global CSS: warm-graphite body, amber selection, amber focus-visible, html-level
  `overflow-x:hidden` and background (mobile webview parity).
- `useReducedMotion()` util + documented kill list.
- Utility primitives: `<StatusChip>` (shipped/live/piloted/sunset/exited), `<Pill>`, `<Ext>`.

## Impact
- Affected code: `tailwind.config.ts`, `app/layout.tsx`, `app/globals.css`,
  `components/primitives/*`, `lib/motion.ts`.
- NOT touched: no routes beyond `/`, no data, no schema, no canvas work.

## Design
Tokens live in config, not scattered classes — alternatives (CSS vars only, styled
components) rejected: Tailwind theme keeps agent output consistent and reviewable.
Honest hard part: exact translation of the mockup's rgba hairlines into theme values —
extract, don't eyeball.

## Spec Delta
### Requirement: Design tokens are the single styling source
#### Scenario: token change propagates
- WHEN `--amber` changes in the Tailwind theme
- THEN no component needs edits for the new value to apply everywhere

### Requirement: Motion respects user preference
#### Scenario: reduced motion
- WHEN `prefers-reduced-motion: reduce` is set
- THEN `<Reveal>` renders content immediately AND no looping animation plays

## Tasks
- [ ] tests: token snapshot (theme exposes all colors from tokens.md); Reveal renders
      children instantly under reduced motion (jsdom matchMedia mock)
- [ ] implement theme, fonts, globals, primitives
- [ ] Live DoD (human): open `/` on desktop + iPhone width — dark parity with the
      reference hero background; tab through: focus rings amber; toggle OS reduced
      motion: nothing loops
