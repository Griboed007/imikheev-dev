# 002 — Shell: statusline, ticker, ⌘K, progress, footer

## Why
The statusline IS the brand chrome; every view mounts inside it.

## What Changes
- Fixed 38px statusline: `ivan@imikheev.dev` · `~/portfolio` · `⎇ main` · focus — then
  the telemetry ticker inline (desktop ≥761px only), `cv ⇩` + `let's talk` pulsing CTAs,
  live Amsterdam clock with amber pulse dot. `overflow:hidden` on the bar (viewport-width
  bug fix from mockups).
- **Mobile ticker (settled in v0.8):** ≤760px the inline ticker hides; a static
  `.tickbar` renders below the statusline as the first element of the home flow —
  it scrolls away with the page, it does NOT follow.
- Ticker content from `lib/telemetry.ts` (static array now; 009 makes it live).
- 2px amber scroll-progress bar under the statusline.
- ⌘K command palette: jumps, opens (deckgen, tracker, github, linkedin, instagram,
  thesis, press, beans), copy actions (`npx ccstatusline@latest`, email) with toasts.
- Footer with real links.

## Impact
- Affected code: `components/shell/*` (Statusline, Tickbar, CmdK, Progress, Footer,
  Toast), `app/layout.tsx`, `lib/telemetry.ts`, `lib/links.ts`.
- NOT touched: hero, canvases, data, schema.

## Design
Links centralized in `lib/links.ts` — one source for footer, ⌘K, cards. Hard part:
the mobile bar must never widen the viewport — bar clips, segments diet at ≤760px
(hide path/branch/focus), CTAs and clock always fit at 360px.

## Spec Delta
### Requirement: Ticker placement is viewport-dependent
#### Scenario: desktop
- WHEN viewport ≥ 761px THEN the ticker renders inside the fixed statusline and the
  static tickbar does not render
#### Scenario: mobile
- WHEN viewport ≤ 760px THEN the ticker renders as a static bar directly below the
  statusline AND scrolling 200px moves it off-screen while the statusline stays fixed

### Requirement: ⌘K is keyboard-complete
#### Scenario: open, filter, execute
- WHEN the user presses ⌘K, types "map", presses Enter
- THEN the palette closes AND the viewport scrolls to `#map`

## Tasks
- [ ] tests: Tickbar visibility per viewport (component test, matchMedia); CmdK filter +
      Enter executes first item; clock formats Europe/Amsterdam
- [ ] implement shell components; wire layout
- [ ] Live DoD (human): iPhone-width — no horizontal pan anywhere; ticker sits under the
      bar and scrolls away; both CTAs + clock visible at 360px; ⌘K copy shows toast and
      clipboard holds the command
