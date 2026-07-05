# 004 — System map: interactive 3D graph + blurred background twin

## Why
The queryable map is the thesis made visible: work as a typed graph.

## What Changes
- `lib/graph.ts`: single typed source of nodes/edges/adjacency (sys|dom, z-depth, live,
  url, case slug, copy) — consumed by BOTH maps, cards, and ⌘K.
- Small map: SVG, gentle 3D yaw oscillation with depth scale/opacity; hover traces typed
  edges; click fills the detail panel (status chip, `open case →`, `open live ↗`);
  keyboard: tabbable nodes, Enter selects.
- Background twin: fixed full-viewport canvas at z-0 (content lifted to z-1 — the v0.7
  layering fix), blurred, slow full rotation, fades in only while `#map` is near viewport.
- Solid "window" styling on the map panel (backdrop blur, heavy border, shadow).

## Impact
- Affected code: `components/map/*`, `lib/graph.ts`, `app/page.tsx` section.
- NOT touched: card content (005 consumes graph data), schema.

## Design
One data module, two renderers — alternative (duplicate data per renderer) rejected: it
is exactly the drift this framework exists to kill. Hard part: depth-opacity must
multiply with hover dim/hot states, not fight them (inline style vs class lesson from
v0.3).

## Spec Delta
### Requirement: Both maps render one dataset
#### Scenario: node added
- WHEN a node is added to `lib/graph.ts`
- THEN it appears in the small map AND the background twin without further edits

### Requirement: Background twin is presence-gated
#### Scenario: away from the map
- WHEN `#map` is far outside the viewport THEN the background canvas is fully
  transparent AND draws no frames

## Tasks
- [ ] tests: graph module integrity (edges reference existing ids, adjacency symmetric);
      projection depth-opacity clamped [0.35,1]; detail-panel copy for a live node
- [ ] implement both renderers + panel
- [ ] Live DoD (human): hover traces amber edges; click tracker → `open live ↗` opens
      the app; scroll to map — giant blurred twin fades in behind the whole page
