# 010 — Motto, CV, contact

## Why
The page needs its close: the belief, then the door.

## What Changes
- `~/motto` closing section: "You are the architect of yourself." (amber period),
  sub-line, pulsing `let's talk →` (mailto hello@imikheev.dev with gmail fallback until
  forwarding is live) + `download cv ⇩`.
- CV served at `/cv.pdf` (exported from `design/reference/cv-ivan-mikheev-v0.1.html`
  after content sign-off); statusline + motto buttons point at it.
- `hello@imikheev.dev` forwarding documented in RUNBOOK (registrar or ImprovMX).

## Impact
- Affected code: `components/motto.tsx`, `public/cv.pdf`, `lib/links.ts`.
- NOT touched: schema; CV content itself (owner-approved separately).

## Design
Static PDF over on-the-fly render — a CV must be byte-stable for recruiters. Hard part:
none; this is glue.

## Spec Delta
### Requirement: Contact works day one
#### Scenario: cv
- WHEN `cv ⇩` is activated THEN `/cv.pdf` downloads and opens as the designed A4
#### Scenario: talk
- WHEN `let's talk` is activated THEN a mail draft opens to the configured address

## Tasks
- [ ] tests: links registry exposes cv + mailto; motto renders both CTAs with pulse
      classes (and none under reduced motion)
- [ ] implement; export + commit cv.pdf after owner sign-off
- [ ] Live DoD (human): download on phone + desktop; send yourself the mailto
