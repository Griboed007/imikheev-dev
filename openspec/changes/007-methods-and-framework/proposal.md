# 007 — Toolbox + the framework as a public page

## Why
The framework is the strongest hiring artifact on the site; it must be a real document,
not a card.

## What Changes
- Toolbox grid: six method cards with hover graphics (token pipeline, phase-locking
  waves, card fan, strata drill, flatline→pulse, scribble→clean line) + stack cards.
- `/methods/spec-driven-agents`: renders `content/methods/spec-driven-agents.md`
  IN FULL through the field-manual MDX layout (toc from headings, roles table styled,
  loop as the pipe component, callouts for TL;DR and the deckgen verification story).
- Entry points: method card, geofence case callout, ⌘K.

## Impact
- Affected code: `app/methods/[slug]/page.tsx`, `components/methods/*`, reuse of
  `components/case/*` + `lib/mdx.ts` from 005.
- NOT touched: the framework document itself — render it, never fork it.

## Design
The doc is the source; the page is a projection. Alternative (hand-curated page like the
mockup) rejected for the build: it creates a second truth. Hard part: mapping his
markdown table + code block into the styled components without altering text.

## Spec Delta
### Requirement: The page equals the document
#### Scenario: doc edit
- WHEN `content/methods/spec-driven-agents.md` changes
- THEN `/methods/spec-driven-agents` reflects it on next build with no component edits

## Tasks
- [ ] tests: MDX renders the roles table and the TL;DR blockquote from the real file;
      toc generated from h2s in document order
- [ ] implement toolbox + route
- [ ] Live DoD (human): read the full page top to bottom on the preview — every section
      of the .md present, loop diagram matches §2, links from card/case/⌘K all land here
