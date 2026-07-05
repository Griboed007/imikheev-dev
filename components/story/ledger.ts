import type { Status } from "@/components/primitives/StatusChip";

/**
 * The honest ledger (mockup `~/story`): every chapter with the lesson it paid for. The
 * Julius row names Julius Meinl Living + Innovation Manager by contract (proposal). The
 * SauronEye row's `endorsement` link is rendered inline after its lesson. Statuses reuse
 * the StatusChip semantics — advising = amber (the mockup's st-live), shipped = teal.
 */
export interface LedgerRow {
  years: string;
  name: string;
  status: Status;
  /** Displayed chip label when it differs from the status key (mockup labels). */
  statusLabel?: string;
  lesson: string;
  /** Optional inline "endorsement ↗" external link appended to the lesson. */
  link?: { key: "endorsement"; label: string };
}

export const LEDGER: LedgerRow[] = [
  {
    years: "2022 → 2024",
    name: "glideview",
    status: "sunset",
    lesson:
      "AR product presentation and a 3D-to-web optimization pipeline. Pilots ran; the market wasn't ready. Lesson: technology readiness ≠ market readiness — time the buyer, not the demo.",
  },
  {
    years: "2023 → 2024",
    name: "julius-ecosystem",
    status: "piloted",
    lesson:
      'At Julius Meinl Living, as Innovation Manager: a wallet-pass guest ecosystem with geo-anchored perks across a partner network — "if you stay at The Julius, every high-end door is open." Lesson: in hospitality, the product is the feeling of access — engineer for prestige, not features.',
  },
  {
    years: "2024",
    name: "sauroneye → earthian",
    status: "exited",
    lesson:
      "Commercial lead for AI-driven green investment assessment; negotiated with Swiss investment firms and Dutch insurers. Lesson: enterprise AI sells on auditability before accuracy.",
    link: { key: "endorsement", label: "endorsement ↗" },
  },
  {
    years: "2024 → 2025",
    name: "find-vendor",
    status: "sunset",
    lesson:
      "Agentic sourcing for industrial procurement, researched with truck, food, and solar manufacturers. Lesson: agents fail on trust, not capability — sell the audit trail first.",
  },
  {
    years: "2025 → now",
    name: "deckgen · tracker",
    status: "shipped",
    lesson:
      "Citation-backed decks and an AI-copiloted tracker — both live, both wired into this site's telemetry.",
  },
  {
    years: "2025 → now",
    name: "nullspace · easyletters",
    status: "advising",
    lesson:
      "Strategic consulting: agentic-first product transformation, sales architecture, and product-market-fit work for two NL startups.",
  },
];
