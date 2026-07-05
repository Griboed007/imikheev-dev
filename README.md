# imikheev.dev — the digital twin

Personal portfolio of Ivan Mikheev. The site is a digital twin of my work: every moving
element maps to live state. Built with the spec-driven agentic framework it documents.

**Visual source of truth:** `design/reference/portfolio-mockup-v0.8.html` — open it in a
browser. Behavior and tests come from proposals; look comes from the reference. When they
conflict on behavior, the proposal wins; on look, the reference wins.

## Stack

Next.js (App Router, TypeScript) · Tailwind (tokens from `design/tokens.md`) · git-versioned
JSON telemetry (`content/telemetry/`, zod-gated) · MDX (`content/`) · GSAP (spark only) ·
Vercel · domain `imikheev.dev`. **No database, no secrets — by decision (see 009).**

## How this repo is built

Nothing is implemented ad hoc. Every capability is an OpenSpec change under
`openspec/changes/NNN-*/proposal.md`, executed in order by an implementer agent
(Claude Code), independently verified read-only by a strategist, and gated by a human
live run. The full method: `content/methods/spec-driven-agents.md`. The step-by-step
execution script: `RUNBOOK.md`.

## Bootstrap (once)

1. `npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"`
   (run in an empty dir first, then overlay this scaffold — see RUNBOOK step 1).
2. `cp .env.example .env.local` (no secrets — it stays that way by design).
3. `claude` in the repo root; paste the session prompt from RUNBOOK.md.
4. Implement changes 001 → 011 in order. Never skip the live DoD.

## Directory map

| path | what lives here | agent guide |
| --- | --- | --- |
| `app/` | routes, layouts, route handlers | `app/CLAUDE.md` |
| `components/` | atomic-design UI | `components/CLAUDE.md` |
| `lib/` | data access, graph data, telemetry | `lib/CLAUDE.md` |
| `content/` | MDX case studies + methods | `content/CLAUDE.md` |
| `public/photos/` | Instagram export pipeline | `public/photos/README.md` |
| `design/` | tokens + reference mockups | `design/tokens.md` |
| `openspec/` | proposals, durable specs | `openspec/project.md` |
