# 005 — Work cards, brand skins, counter band, case pages

## Why
Outcomes first: the front row is the live proof (twin, deckgen, tracker).

## What Changes
- Card system with cursor-spotlight; front row: geofence-twin, deckgen (blueprint-blue
  skin: 9 hover-filling pipeline cells, tagline h3 with citation sup, verify strip,
  real stats), tracker (violet skin: mini 4-column board, chip slides To-Do→Done and
  turns green on hover, ✦ ai pill). `show all (+4)` reveals voltstream, matter-home,
  trendata, find-vendor.
- Counter band: 0.8247 / 24 380 / 194 tests / 7 nodes (amber=live), ease-out count-up
  on first intersection.
- Case pages: MDX at `content/work/*.mdx` rendered in the field-manual layout (sticky
  toc, crumb, meta row, pipe diagram component, stats grid, changelog, callout).
  Ship `geofence-twin.mdx` with the article link in meta + changelog.

## Impact
- Affected code: `components/cards/*`, `components/case/*`, `app/work/[slug]/page.tsx`,
  `content/work/geofence-twin.mdx`, `lib/mdx.ts`.
- NOT touched: schema; other sections.

## Design
Brand skins are scoped card variants — their hexes never leak into the global theme
(enforced in root CLAUDE.md). Case pages are real routes (not view-toggles like the
mockup) so they get URLs, OG cards, and analytics. Hard part: MDX components mapping
(pipe/stats/changelog) — define once in `lib/mdx.ts`.

## Spec Delta
### Requirement: Live products link out; the twin links in
#### Scenario: routing
- WHEN the deckgen card is activated THEN deckforge-web.vercel.app opens in a new tab
- WHEN the twin card is activated THEN the client navigates to `/work/geofence-twin`

### Requirement: Counters animate once, accurately
#### Scenario: intersection
- WHEN the band first enters the viewport THEN each number eases to its exact final
  value (0.8247 keeps 4 decimals; 24 380 uses thin-space grouping) and never re-runs

## Tasks
- [ ] tests: counter formatter (decimals, spacing, suffix); card variant class mapping;
      MDX pipeline renders the changelog component from the twin file
- [ ] implement cards, band, case route + geofence content
- [ ] Live DoD (human): hover deckgen — cells fill left→right; hover tracker — chip
      crosses the board and lands green; open `/work/geofence-twin` directly by URL —
      toc anchors scroll under the fixed bar correctly
