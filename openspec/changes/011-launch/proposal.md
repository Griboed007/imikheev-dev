# 011 — SEO, OG, analytics, a11y/perf pass, domain, launch

## Why
Shipping is a capability, not an afterthought.

## What Changes
- Metadata: titles/descriptions per route, canonical `https://imikheev.dev`, sitemap,
  robots, favicon set from the spark.
- OG image route (`/opengraph-image`): statusline-styled card — dark graphite, mono
  name, amber accent — per-page title for case/method routes.
- Vercel Analytics + Speed Insights.
- A11y pass: landmark roles, alt/aria on canvases, contrast check on amber text sizes,
  full keyboard walk. Perf pass: only two canvases animate concurrently, fonts subset,
  Lighthouse ≥ 95 perf / 100 a11y on `/` (mobile).
- Domain: `imikheev.dev` on the Vercel project; production deploy; launch checklist run.

## Impact
- Affected code: `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`,
  metadata exports, small a11y/perf diffs anywhere flagged.
- NOT touched: features, schema, content.

## Spec Delta
### Requirement: Every route ships a share card
#### Scenario: case page share
- WHEN `/work/geofence-twin` is shared THEN the OG image shows the site identity and
  the case title

### Requirement: Launch gate
#### Scenario: production
- WHEN `imikheev.dev` resolves THEN it serves the production deployment over HTTPS with
  Lighthouse mobile perf ≥ 95 and a11y = 100 on `/`

## Tasks
- [ ] tests: sitemap includes `/`, all `/work/*`, `/methods/*`; metadata snapshot
- [ ] implement metadata, OG, analytics; run and fix a11y/perf audits
- [ ] Live DoD (human): the full launch checklist — every ⌘K action, every external
      link, both tickers, the live DoD lists of 001–010 spot-checked on production,
      share a link in Slack/LinkedIn preview to see the OG card
