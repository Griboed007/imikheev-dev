# 009 — Life section on git-versioned telemetry

## Why
"Every moving element maps to live state" — and the state (coffee, shelf, rides, notes,
focus) changes at commit cadence, not request cadence. A database is complexity without
payoff at this workload; the repo IS the store. Decision record: no DB in this project
(2026-07 — Supabase free slots are occupied by Deckgen + Tracker, both worth keeping
alive; and a low-traffic free-tier DB would auto-pause anyway).

## What Changes
- `content/telemetry/`: `coffee.json`, `shelf.json`, `ride.json`, `field-notes.json`,
  `status.json` (focus string + extra ticker items). Seeded with current content
  (Sweet Peach; 48 Laws / Genius Inc / Lean Startup; Grand Canyon 8; ChargeHyve note;
  focus `agentic-platforms`).
- `lib/telemetry.ts`: zod schemas + typed loaders (static imports — malformed data
  fails the BUILD, which is this design's integrity gate). Ticker (002) and statusline
  focus consume it; editing = commit; Vercel rebuilds on push.
- Tiles: IG shuffle from `public/photos/manifest.json` with lens-matched EXIF; gear
  (X-T2, aperture turns); Canyon line-art, spokes spin; Sweet Peach with product link;
  ChargeHyve with the provided logo SVG + post link; the shelf (crown / bulb / loop).
- Optional: one ticker item from GitHub's public API (`last push`) at ISR ~1h with
  graceful fallback — the only runtime-fetched datum, no token needed.
- Optional ops: `.github/workflows/tracker-heartbeat.yml` — weekly read-ping so the
  live Tracker link never hits a free-tier pause.

## Impact
- Affected code: `content/telemetry/*`, `lib/telemetry.ts`, `components/life/*`,
  `public/photos/*`, optional workflow file.
- NOT touched: no database, no keys, no API routes, no schema anywhere. `.env` stays
  secret-free.

## Design
Git-as-database: version history for free (telemetry history becomes a ledger — on
brand), zero services, zero pausing, zero security surface. Alternatives rejected:
Supabase/Neon (real Postgres for five tiny read-only lists — operational cost, pause
risk, key management, all for nothing); Vercel Edge Config (no-deploy edits are a real
feature, but a dependency we don't need yet — revisit via proposal if edit-without-push
ever matters). Hard part: keep loaders server-only so JSON never ships twice.

## Spec Delta
### Requirement: Telemetry is typed and build-gated
#### Scenario: malformed edit
- WHEN a telemetry JSON file violates its zod schema
- THEN the production build fails with a message naming file and field

### Requirement: Editing is a commit
#### Scenario: coffee update
- WHEN `coffee.json` changes on main
- THEN the next deployment shows the new value in the tile AND both ticker variants,
  with no code edits

## Tasks
- [ ] tests: schema round-trips for all five files; loader rejects a fixture with a
      missing field; manifest → shuffle frames mapping
- [ ] implement telemetry module + tiles; seed real content
- [ ] optional: GitHub last-push ticker item with fallback; tracker heartbeat workflow
- [ ] Live DoD (human): edit coffee.json in a branch, open the preview — tile + both
      tickers updated; break a field on purpose — build fails loudly; photos shuffle
      with EXIF following

## Notes for the implementer
**There is no database in this project.** If any task in any change appears to need
one — stop; that is an owner decision that arrives as a new proposal. `.env` must
contain no secrets; if you find yourself adding one, same rule.
