/**
 * The toolbox (mockup `~/methods` section): six method cards + the stack. Text transcribed
 * verbatim from `portfolio-mockup-v0.8.html`. Only `spec-driven-agents` links anywhere — to
 * its real page (`/methods/spec-driven-agents`); the other five are concepts, no route yet.
 */
export type GlyphKey =
  | "pipeline"
  | "waves"
  | "fan"
  | "strata"
  | "pulse"
  | "scribble";

export interface MethodCard {
  slug: string;
  title: string;
  body: string;
  glyph: GlyphKey;
  href?: string;
  linkLabel?: string;
}

export const METHODS: MethodCard[] = [
  {
    slug: "spec-driven-agents",
    title: "Spec-driven agentic development",
    body: "Strategist / implementer / operator roles, per-module guardrails, adversarial read-only verification, and a live run as the definition of done. How I ship with Claude Code without losing the plot.",
    glyph: "pipeline",
    href: "/methods/spec-driven-agents",
    linkLabel: "read the framework →",
  },
  {
    slug: "pcm-rapport",
    title: "Mental languages",
    body: "Process Communication Model applied to teams: find the baseline each person thinks in, then explain in their language. Hover — two signals phase-locking is the whole method.",
    glyph: "waves",
  },
  {
    slug: "talent-cards",
    title: "The card catalogue",
    body: "Every teammate as a card: how they think, what energizes them, what language lands. Team formation becomes deck-building — and burnout becomes visible before it happens.",
    glyph: "fan",
  },
  {
    slug: "founder-tracking",
    title: "Motivation archaeology",
    body: "From the business tracking school: founders rarely know what actually drives them. Dig past the strata of stated goals, find the real fuel — and lean iteration starts powering itself.",
    glyph: "strata",
  },
  {
    slug: "state-engineering",
    title: "Energy before mood",
    body: "Your state is secondary: no mood arrives on its own. Act with energy and relentlessness first — the effort changes the state, and the state follows the work.",
    glyph: "pulse",
  },
  {
    slug: "permission-to-be-bad",
    title: "Let yourself be bad",
    body: "Detach the skill from the self and iteration becomes cheap. Being bad in public is the entry fee to being good — the scribble is how the clean line gets drawn.",
    glyph: "scribble",
  },
];

export interface StackCard {
  nm: string;
  tg: string;
}

export const STACK: StackCard[] = [
  { nm: "langchain · langgraph", tg: "agent orchestration" },
  { nm: "rag pipelines", tg: "retrieval since 2022" },
  { nm: "knowledge graphs", tg: "rdf · sparql · saref" },
  { nm: "react · next · ts", tg: "atomic design" },
  { nm: "supabase", tg: "pgvector · rls · edge" },
  { nm: "claude code cli", tg: "daily driver" },
];
