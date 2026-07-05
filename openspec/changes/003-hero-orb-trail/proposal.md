# 003 — Hero: word cycle, glow, point-cloud orb, star trail

## Why
The first screen carries the thesis: telemetry, not decoration.

## What Changes
- H1 line 1 mask-slides in; line 2 cycles `adoption. → interfaces. → digital twins. →
  trust.` — decode-in (box-glyph pool), hold ~2.3s, caret-erase, next. Amber word carries
  a breathing glow.
- `<Orb>`: 1700-point fibonacci sphere + two orbit rings + one pulsing anomaly point;
  mouse parallax; scroll adds spin velocity; anchored to the content column
  (never the viewport edge); ≤860px centered behind copy at reduced opacity/glow.
- `<StarTrail>`: full-page canvas (z above content, pointer-events none); works for mouse
  AND touch; tap/click ripple ring; capped pool.
- Scroll parallax/fade of the orb; `scroll ▾` cue; hero dot-grid dimmer on mobile.

## Impact
- Affected code: `components/hero/*`, `lib/canvas/orb.ts`, `lib/canvas/trail.ts`.
- NOT touched: map canvases (004), schema, content.

## Design
Plain canvas 2D, no three.js — 1700 points at 60fps is trivial and keeps bundle lean
(alternative three.js rejected: weight without benefit). Hard part: transform ownership —
CSS owns base translate via `--py` var so JS parallax composes with the mobile centering.

## Spec Delta
### Requirement: Hero motion degrades gracefully
#### Scenario: reduced motion
- WHEN reduced motion is set THEN the word is static "adoption.", the orb renders one
  static frame, the trail never mounts
#### Scenario: offscreen pause
- WHEN the orb is scrolled out of view THEN its rAF loop does no drawing work

### Requirement: Trail is input-agnostic
#### Scenario: touch
- WHEN a touch pointer moves ≥ ~13px THEN star particles spawn along the path

## Tasks
- [ ] tests: word-cycle state machine (decode→hold→erase→next) as a pure function;
      orb projection math (depth ∈ (0,1), screen coords finite); trail pool cap
- [ ] implement components; wire hero
- [ ] Live DoD (human): 4k display — orb hugs the content column, not the screen edge;
      phone — background stays dark, finger leaves stars; scroll-flick spins the orb
