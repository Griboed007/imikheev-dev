# components/ — atomic design

- `primitives/` (atoms): Wrap, Section, Reveal, StatusChip, Pill, Ext, Toast.
- `shell/`: Statusline, Tickbar, CmdK, Progress, Footer.
- `hero/`, `map/`, `cards/`, `case/`, `story/`, `education/`, `hackathons/`,
  `methods/`, `statusline-showcase/`, `life/`, `motto`.
- Inline SVG glyphs are components with hover states driven by parent `:hover`
  (`.card:hover .x`) — no JS hover handlers for pure visuals.
- Canvas components: mount-guarded, `IntersectionObserver`-paused, dpr ≤ 2, cleanup on
  unmount. One rAF per component.
- Color semantics from root CLAUDE.md are review-blocking. Brand-skin hexes stay inside
  their card variant files.
