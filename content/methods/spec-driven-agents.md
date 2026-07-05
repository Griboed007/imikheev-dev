# Spec-Driven Agentic Development — A Reusable Framework

A method for building software with AI agents where **intent, schema, and code never drift apart**, **nothing is "done" until it runs live**, and **state is never mutated out-of-band**. Distilled from the deckgen project; written to be carried to a new one.

---

## 0. The one-paragraph version

Every capability starts as a **written change proposal** before any code. A **planning agent** turns intent into that proposal and scopes it into verifiable increments. An **implementation agent** (Claude Code) builds it test-first. A **human operator** approves anything irreversible and runs the live system. After the implementer reports "done," the planner **independently verifies** the result read-only — reading real data and real code, not trusting a green checkmark. The change isn't finished until a human has clicked through the **live seams**, and then it's folded back into the durable spec so the spec always reflects shipped reality.

The whole thing is three disciplines stacked: **spec-driven** (write the contract first), **test-driven** (lock behavior with tests first), and **verification-driven** (prove it independently, live, last).

---

## 1. Three roles, deliberately separated

| Role | Who | Owns | Never does |
| --- | --- | --- | --- |
| **Strategist** | A planning model in chat | Proposals, scoping, review, independent verification | Writes the implementation |
| **Implementer** | Claude Code | Test-first implementation, the repo, running migrations through the repo workflow | Applies schema out-of-band; skips tests |
| **Operator** | User | Approving plans, running the live system, the live Definition of Done | Rubber-stamps without the live run |

The separation is the point. Because the Strategist did not write the code, it stays **adversarial to the implementer's output** — it verifies independently and catches the class of bugs that self-review misses (a policy that passes its own test but has a logic hole; a value that's internally consistent but wrong against the source).

---

## 2. The loop

```
Intent → Proposal → Validate → Implement (TDD) → Verify (read-only) → Live DoD → Archive
```

- **Proposal** — the capability is written down before code (anatomy in §3).
- **Validate** — the proposal is checked against the spec format (`openspec validate --strict`) so the delta headers parse.
- **Implement** — the implementer reconciles the proposal into the repo's file layout and builds it test-first.
- **Verify** — the Strategist inspects the result read-only (§6).
- **Live DoD** — the operator clicks through the live seams (§7).
- **Archive** — the change folds into the durable spec, so the spec is always a true description of what shipped, not a stale plan.

Reference tooling: **OpenSpec** at the repo root, driven by `/opsx:propose` (scaffold a change), `openspec validate`, and `/opsx:archive` (retire a completed change into the spec). The principle transfers to any spec system; OpenSpec is just the instantiation we used.

---

## 3. The change-proposal anatomy (the template)

Every proposal has the same shape. Copy this structure:

- **Why** — the problem, and the thesis of the fix. One or two paragraphs.
- **What Changes** — bullets naming the deltas.
- **Impact** — *affected specs*, *affected code*, and an explicit statement of **what is NOT touched** (e.g. "no migration; no schema change; worker untouched"). Naming the blast radius — including the parts that stay still — is half the value.
- **Design** — the load-bearing decisions. State **alternatives considered and why they were rejected**, and call out **the honest hard parts** (the thing that will actually be painful) so the implementer doesn't discover it mid-build.
- **Spec Delta** — the behavioral contract:
    - `## ADDED Requirements` (or `MODIFIED` / `REMOVED`)
    - `### Requirement: <name>` — a single SHALL statement.
    - `#### Scenario: <name>` — **WHEN / THEN** (and AND) steps. Behavioral and testable; no implementation detail.
- **Tasks** — TDD-ordered checkboxes, grouped by area, **ending in a manual "Live DoD" group** the operator runs.
- **Notes for the implementer** — scope guardrails and source-of-truth pointers. The two that earn their keep:
    - A hard fence: *"This change adds no DDL. If a task seems to need schema, stop — it's out of scope."*
    - The split: *"This document is the source of truth for behavior and tests; the design reference is the source of truth for look."*

Requirements describe **what must be true**, not how. Scenarios are the acceptance tests in prose. If a requirement can't be phrased as an observable scenario, it isn't a requirement yet.

---

## 4. Test-driven, in layers

Tests are written with or before the implementation and **gate the change**. Lock the core invariant with tests *before* building anything on top of it.

Pick the layer per concern:

- **Unit** — pure logic.
- **Database / policy tests** (e.g. pgTAP) — row-level security and access rules, tested at the database, not just inferred from the app.
- **Contract tests** — the boundaries between services (the API one side promises and the other depends on).
- **Component tests** — UI *behavior*, driven by state and data rather than pixels.

A recurring design move that makes this possible: **keep logic state-driven and data-driven so it's testable headlessly.** (Example: render an interactive figure declaratively from a data array with state-based interaction, instead of imperatively mutating the DOM — now the interaction logic is unit-testable without a browser.)

---

## 5. Migrations and generated types — one discipline

**Schema changes happen only through repo migration files, applied via the repo workflow. Never out-of-band.**

The reason is mechanical: **generated types regenerate from migrations.** Apply DDL directly to the database and the schema silently desyncs from the types the code compiles against. So:

- Every schema change is a migration file in the repo.
- The agent runs it through the repo's migration workflow under **Plan Mode + explicit human approval**, which regenerates types in the same motion.
- Prefer **additive, backward-compatible contracts**: a new *nullable* column, a new *optional* parameter with a default. Additive changes don't break existing call sites, so a slice can land without a flag-day rewrite.

The Strategist may hold a **read-only** connection for verification, but **never** applies migrations or mutations. Mutation is the implementer-through-repo path, always.

---

## 6. Independent verification (trust, but verify — read-only)

After "done," the Strategist verifies independently and **read-only**:

- **Query real data** to confirm the behavior and the invariants actually hold — not that a test asserts them, but that the live rows are right. (In deckgen: every figure on a generated deck resolving to a ledger row, zero dangling — checked with SQL, repeatedly, at scale.)
- **Read the actual function and policy bodies** to confirm security properties. Tests prove the happy path; reading the code proves the hole isn't there. (In deckgen: confirming an invitation-accept RPC rejected a caller whose identity didn't match the invited address — the crux that closed an "any token = any project" hole.)
- **Run security/performance advisors after any schema change** to catch missing policies.
- **Believe the live system over the test report**, and give the **highest-risk changes the deepest read** (auth, access control, anything that leaks if wrong).

This step is non-negotiable precisely because it's done by the party that didn't write the code.

---

## 7. The live run is the real Definition of Done

Headless tests go green and still miss **the seams** — the wiring *between* components: an upload that's supposed to trigger extraction, a button that's supposed to start a job, a card that's supposed to link to a route, a render that's supposed to pick up styling, a regeneration that only runs through a real task runner.

So every change carries two tracks:

- **Track A** — headless tests. Necessary, not sufficient.
- **Track B** — the live run. **This is the gate.**

The proposal's final task group is always a human click-through of the live seams. A change with green tests and no live run is *not* done; it's untested where bugs actually live.

---

## 8. CLAUDE.md as accumulated, local memory

Per-repo and per-app `CLAUDE.md` files hold conventions **and hard-won, non-obvious lessons.** When you hit a footgun that wasn't predictable from the docs, **encode the lesson in CLAUDE.md** so it's never re-learned. (In deckgen: explicit rules about a specific model's failure modes — never put an unconstrained array or a critical nullable field in its structured-output schema, always cap output tokens. That memory lived in the worker's CLAUDE.md and stopped the bug from recurring.)

Keep them scoped: a root file for global conventions, per-app files for local specifics.

---

## 9. Claude Code setup that makes this work

- **MCP servers wired in:** a **read-only** database connection for verification, a **browser driver** (Playwright) for end-to-end checks, and a **docs/context server** (Context7) so the implementer reads real current APIs instead of guessing.
- **Plan Mode** for anything irreversible — migrations, destructive operations — so the human approves before the agent acts.
- **Sub-agent orchestration / Agent Teams** for genuinely parallel work (independent explorations or contract-isolated builds), with results composed afterward.
- **Worktrees** for parallel branches without clobbering.

---

## 10. Security defaults

**Least privilege by surface.** The privileged key (service-role / admin) is confined to the **trusted backend** (the worker). The public app uses the **anon/public key plus the user's own token**, and **row-level security enforces access** — the app physically cannot read what the user isn't entitled to. The privileged key never reaches the client, and never reaches a deploy target that doesn't need it (e.g. keep it out of the web host's env entirely).

---

## 11. How the Strategist behaves (process norms)

- **Owns mistakes** plainly, without self-abasement.
- **Is honest about its limits** — it can't see the repo, the runtime, or a rendered screen, so it gives **precise checklists** and flags **build-blind** work instead of bluffing.
- **Maintains a deferred-items ledger** across sessions, so nothing scoped-out is silently lost.
- **Never auto-applies mutations.**
- **Scopes large work into verifiable increments** with explicit guardrails (additive contracts, provenance checks, the live DoD), rather than one big unreviewable change.

---

## 12. Bootstrapping a NEW project with this framework

1. **Initialize the spec system** (OpenSpec) at the repo root.
2. **Write `CLAUDE.md`** — a root file with conventions, plus per-app stubs you'll grow as you hit lessons.
3. **Wire Claude Code MCP servers** — read-only DB (verification), Playwright (e2e), Context7 (live docs) — and turn on **Plan Mode**.
4. **Stand up the test harnesses per layer** — unit, database/policy, contract, component — before the first feature, so TDD has somewhere to land.
5. **Establish the migration workflow** (migration files → type regeneration) and the **least-privilege key split** on day one.
6. **Run every capability through the loop**: proposal → validate → TDD implement → verify (read-only) → live DoD → archive.
7. **Keep the deferred-items ledger** from the first session.

---

## 13. What to leave behind

Separate the **framework** (everything above — transferable) from the **deckgen domain** (don't carry these unless they fit):

- the evidence-ledger / citation-verifier architecture,
- the "as-printed value" numeric convention,
- the specific agent topology (orchestrator → per-source explorers → composer → verifier),
- the terminal/blueprint palette and theme tokens.

Those were the *right answers for deckgen's problem*. The framework is how you'll find the right answers for the next one.

---

### TL;DR

> Write the contract first (spec), prove the behavior first (tests), and prove it for real last (independent read-only verification + a live run). Keep schema and types welded through migration files. Split the work across a planner, an implementer, and a human who approves the irreversible. Never mutate state out-of-band. Let the durable spec always equal what shipped.
