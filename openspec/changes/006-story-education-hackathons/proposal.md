# 006 — Story ledger, education track, hackathons

## Why
The honest ledger and the press-verified record are the trust engine of the site.

## What Changes
- `~/story` ledger table: 2022→now rows with status chips; Julius row names Julius Meinl
  Living + Innovation Manager; SauronEye row carries `endorsement ↗`; deckgen·tracker
  row marked shipped.
- `~/education`: three chapter cards with hover glyphs (AR cube / assembling stack /
  integration diamond), dot-matrix UT/IIT monogram canvases filling the 80px glyph strip
  (blur 2px, opacity .45) + corner badges (official marks are drop-in assets); CreaTe
  chapter links the published thesis; dotted amber roadmap → thesis + graduation ghosts.
- `~/hackathons`: Achmea 2023 (press ×2 links), Allianz 2023 (honest earliness copy),
  Nebius 2026 (dual links: case route + LinkedIn article). Dates match the press record.

## Impact
- Affected code: `components/story/*`, `components/education/*`,
  `components/hackathons/*`, `lib/links.ts` additions.
- NOT touched: schema, case content.

## Design
Dot-monograms render client-side from text sampling (canvas), re-run on fonts.ready and
resize — alternative (pre-baked images) rejected: text stays crisp at any width and
on-brand with the point language. Hard part: none of the press links may nowrap
(the v0.6 overflow lesson) — `.ext` wraps by contract.

## Spec Delta
### Requirement: Claims trace to sources
#### Scenario: press links
- WHEN the Achmea card renders THEN both verzekeraars.nl links are present and open in
  new tabs
#### Scenario: dates
- WHEN hackathon cards render THEN both Insurance Challenges read 2023 (per the press
  record), not 2022

### Requirement: Monograms fill the strip
#### Scenario: glyph background
- WHEN an education card renders at any width ≥ 280px THEN the monogram canvas spans the
  full 80px strip behind the glyph

## Tasks
- [ ] tests: link registry contains all six external records; ledger row copy for Julius
      includes company + role; monogram sampler returns >0 dots for "UT"
- [ ] implement sections
- [ ] Live DoD (human): narrow phone — nothing overflows; monograms clearly visible
      behind glyphs; every ↗ opens the right page
