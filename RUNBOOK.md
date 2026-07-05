# RUNBOOK — imikheev.dev, start to published

You are the **operator**. Claude Code is the **implementer**. This chat (the strategist)
verifies. Steps 0–2 once; step 3 repeats eleven times; steps 4–6 close it out.

---

## 0 — Prerequisites (once, ~15 min)

- Node 20+, git, GitHub repo `imikheev-dev` created empty.
- Vercel account + CLI: `npm i -g vercel` → `vercel login`.
- Claude Code installed and authenticated.
- `hello@imikheev.dev` forwarding: at your registrar's email-forwarding panel or
  ImprovMX free tier → forward to your gmail. (Do before change 010.)
- No database, no service keys — by design (see 009). Nothing to provision.

## 1 — Bootstrap the repo (once)

```bash
npx create-next-app@latest imikheev-dev --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
cd imikheev-dev
# overlay this scaffold: unzip imikheev-dev-scaffold-v1.1.zip here, overwriting README.md
npx openspec init        # accept defaults; keep our openspec/ content
cp .env.example .env.local
git add -A && git commit -m "scaffold: spec layer, docs, reference designs"
git remote add origin <your-github-url> && git push -u origin main
vercel link              # link to a new Vercel project
vercel env add NEXT_PUBLIC_SITE_URL   # https://imikheev.dev (all environments)
```

## 2 — Session kickoff prompt (paste at the start of EVERY Claude Code session)

```
You are the implementer for imikheev.dev. Before anything else, read:
CLAUDE.md, openspec/project.md, design/tokens.md, and the CLAUDE.md of every
directory you touch. Rules: work only from the active proposal; tests first;
there is no database and no secrets in this project — if a task seems to need
either, stop and report; behavior from the proposal, look from
design/reference/portfolio-mockup-v0.8.html; end with a verification report
(files changed, invariants, exact live-DoD steps for me).
Confirm you've read these, then wait for the change assignment.
```

## 3 — Per-change loop (repeat for 001 → 011, strictly in order)

**3a. Assign (paste, replacing NNN):**
```
Implement openspec/changes/NNN-*/proposal.md. Restate the scope and the NOT-touched
list in two sentences, then execute the Tasks top to bottom, test-first. Stop
immediately if anything appears out of scope. When Track A is green, give me the
verification report and the live-DoD checklist. Do not start the next change.
```

**3b. Verify (strategist).** Bring the verification report back to the planning chat
for an adversarial read-only pass before you accept.

**3c. Live DoD (you).** `git push` → open the Vercel **preview URL** → run the
proposal's Live DoD list on desktop + your iPhone. Only a full pass counts.

**3d. Archive (paste):**
```
The live DoD for change NNN passed. Archive it: fold the spec delta into
openspec/specs/, mark tasks complete, append any hard-won lesson to the relevant
CLAUDE.md, and commit as "NNN: <name> — shipped".
```

**Change-specific notes**
- **001–002:** after 002's live DoD you already have a respectable skeleton online.
- **003–004:** DevTools performance tab open during the live DoD; orb + trail together
  must stay smooth on your phone.
- **005:** paste the final geofence-twin MDX copy back to the strategist for a
  fact-check against the press/article record before archiving.
- **009:** the integrity gate is the build — intentionally break a telemetry field and
  watch it fail before you pass the DoD. Consider the optional tracker-heartbeat
  workflow (weekly read-ping) so the live Tracker link never cold-starts on a recruiter.
- **010:** export the CV to PDF (open design/reference/cv-ivan-mikheev-v0.1.html →
  print → save as PDF → `public/cv.pdf`) only after you've confirmed every date on it.

## 4 — Domain (any time after 002)

Vercel → Project → Settings → Domains → add `imikheev.dev` (+ `www` redirect).
At your registrar's DNS: `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com`
(or move nameservers to Vercel). Wait for the certificate to issue.

## 5 — Launch (change 011)

Run 011 through the same loop. Its live DoD is the launch checklist: every ⌘K action,
every external link, both ticker variants, OG preview via a real share, Lighthouse
mobile ≥95/100 on `/`. Then promote to production.

## 6 — Day-2 operations

- Telemetry: edit `content/telemetry/*.json` (a one-line ask to Claude Code from your
  phone works) → commit → Vercel rebuilds. History = `git log content/telemetry`.
- Photos: drop files in `public/photos`, `npm run photos:manifest`, commit.
- New case study: `content/work/<slug>.mdx` — via a new proposal, obviously.
- Anything bigger: write the proposal first. The site keeps eating its own dog food.
