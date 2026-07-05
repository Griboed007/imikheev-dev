# 008 — Statusline showcase + the animated spark

## Why
The cockpit section is the Claude-Code identity moment — and the mascot's home.

## What Changes
- Terminal frame recreating the real ccstatusline: prompt row with blinking block
  cursor, hatched context bar, exact segment colors (Model/Context/Cached/Total/Thinking;
  git tri-state, Mem, Session), horizontal-scroll rows on narrow screens.
- `<Spark>`: the Claude spark, rays breathing via CSS (staggered scale, survives without
  JS), GSAP elastic 360° spin every ~8s when available; reduced-motion static.
- Caption + copy chip `npx ccstatusline@latest ⧉` with toast; ⌘K copy action shared.

## Impact
- Affected code: `components/statusline-showcase/*`, `components/spark.tsx`.
- NOT touched: the fixed site statusline (002), schema.

## Design
GSAP loaded lazily only where the spark mounts (dynamic import) — alternative (global
script) rejected: 60KB for one section. Hard part: ray transforms — rotation lives on
wrapper `<g>`s, pulse on inner rects, or CSS transform clobbers the attribute rotation
(v0.7 lesson).

## Spec Delta
### Requirement: Spark animates in layers
#### Scenario: no JS / no GSAP
- WHEN GSAP fails to load THEN rays still breathe via CSS AND nothing errors
#### Scenario: reduced motion
- WHEN reduced motion is set THEN the spark is fully static

## Tasks
- [ ] tests: copy action writes the exact command; spark renders 8 rays + core; dynamic
      GSAP guard tolerates absence
- [ ] implement section
- [ ] Live DoD (human): watch two spin cycles on desktop; block gsap in devtools —
      breathing continues; copy chip → paste in a real terminal runs ccstatusline
