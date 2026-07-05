# lib/ — data, math, clients

- `graph.ts` — THE graph: nodes/edges/adjacency consumed by both maps, cards, ⌘K.
- `links.ts` — every external URL + mailto + copy string. Nothing hardcodes a URL
  elsewhere.
- `telemetry.ts` — zod schemas + typed loaders over `content/telemetry/*.json`
  (static imports, server-only). Ticker items, focus, life tiles. Editing = commit.
- `canvas/` — orb + trail + bgmap math as pure, unit-testable functions (projection,
  pools) separate from the drawing components.
- `mdx.ts` — MDX component map (Pipe, Stats, Changelog, Callout, RolesTable).
- `motion.ts` — useReducedMotion + easing constants (single source with tokens.md).
