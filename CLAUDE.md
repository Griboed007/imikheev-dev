# CLAUDE.md — imikheev.dev (root conventions)

You are the **implementer** in a spec-driven agentic workflow
(`content/methods/spec-driven-agents.md` is the constitution). A strategist wrote the
proposals; a human operator approves anything irreversible and runs the live DoD.

## Non-negotiables

1. **Work only from the active proposal** in `openspec/changes/NNN-*/proposal.md`.
   If a task seems to need something the proposal marks out of scope — STOP and report.
2. **Test-first.** Write the failing test from the proposal's scenarios before the code.
3. **There is no database and there are no secrets in this project — by decision.**
   Telemetry is git-versioned JSON under `content/telemetry/`, zod-validated at build.
   If a task appears to need a DB or a secret, STOP and report; that arrives only as a
   new owner-approved proposal.
4. **Behavior from proposals; look from `design/reference/portfolio-mockup-v0.8.html`
   and `design/tokens.md`.** Do not invent styles; extract them.
5. **Additive contracts.** New columns nullable, new params optional with defaults.
6. **Never end a change without emitting a verification report**: files changed,
   invariants held, exact commands/URLs for the human live DoD.
7. **Reduced motion is a requirement, not polish.** Every animation added must appear in
   the reduced-motion kill list (`design/tokens.md §motion`).

## Stack decisions (settled — do not relitigate)

- Next.js App Router, TypeScript strict, no `src/` dir, alias `@/*`.
- Tailwind with tokens mapped from `design/tokens.md` into `tailwind.config.ts` theme.
- Fonts via `next/font/google`: IBM Plex Mono (400/500/600), Instrument Sans (400/500/600).
- Canvas work (orb, trail, bgmap) = client components with `IntersectionObserver` pause,
  `devicePixelRatio` capped at 2, and a single rAF loop per component.
- GSAP only for the spark spin; CSS fallback must exist (spark rays breathe without JS).
- Telemetry: server-only loaders over static JSON imports; malformed data fails the
  build (that is the integrity gate).
- MDX for `content/work/*` and `content/methods/*` rendered with the field-manual layout.
- Icons/glyphs are inline SVG components — no icon libraries.

## Semantics of color (enforced in review)

- **amber `#F5A742`** = live / interactive / now
- **teal `#3ECFAE`** = verified outcomes only (metrics, shipped)
- **clay `#DA7756`** = the Claude spark only
- brand skins: deckgen blue `#6B9BFF` and tracker violet `#8B5CF6` never leak outside
  their cards.

## Definition of done (every change)

Track A: unit/component tests green. Track B: the human clicked the live seams listed in
the proposal's final task group, on a Vercel preview URL. A green Track A alone is NOT done.

## Lessons ledger (append when you hit a footgun)

- (2026-07) This environment's shell may not brace-expand; write explicit paths in scripts.
- (2026-07) Decision: no DB. Supabase free slots host Deckgen + Tracker (kept alive);
  free-tier projects also pause after 7 idle days — wrong failure mode for a portfolio.
