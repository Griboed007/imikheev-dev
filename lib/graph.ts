/**
 * THE graph (lib/CLAUDE.md): the single typed source of nodes/edges/adjacency, consumed
 * by both map renderers (004), the project cards (005), and ⌘K. Transcribed 1:1 from the
 * mockup's NODES/EDGES (design/reference/portfolio-mockup-v0.8.html). URLs come from
 * `lib/links` — nothing hardcodes a URL here.
 *
 * Coordinates are in the small map's 960×470 viewBox space (center 480,235); the bg-map
 * scales the same coordinates. `z` is depth. Adding a node here makes it appear in BOTH
 * renderers with no further edits (the anti-drift invariant this framework exists for).
 */
import { links } from "@/lib/links";

export type NodeKind = "sys" | "dom";

/** Matches StatusChip's Status union — the panel passes node.status straight through. */
export type NodeStatus =
  | "shipped"
  | "delivered"
  | "live"
  | "advising"
  | "piloted"
  | "sunset"
  | "exited";

export interface GraphNode {
  id: string;
  label: string;
  kind: NodeKind;
  x: number;
  y: number;
  z: number;
  live?: boolean;
  url?: string;
  /** slug into /work/[slug] — the case study lands in change 005. */
  caseSlug?: string;
  title?: string;
  meta?: string;
  status?: NodeStatus;
  line?: string;
}

export interface GraphEdge {
  a: string;
  b: string;
}

export const nodes: GraphNode[] = [
  {
    id: "twin",
    label: "geofence-twin",
    kind: "sys",
    x: 300,
    y: 120,
    z: 40,
    caseSlug: "geofence-twin",
    title: "Geofence anomaly twin",
    meta: "2026 · nebius serverless challenge · shipped",
    status: "shipped",
    line: "Semantic digital twin over GPS telemetry — hybrid anomaly scoring plus a SPARQL-queryable SAREF/RDF graph. ROC-AUC 0.8247 on the live run.",
  },
  {
    id: "volt",
    label: "voltstream",
    kind: "sys",
    x: 150,
    y: 250,
    z: -60,
    title: "VoltStream",
    meta: "2026 · msc systems track",
    status: "shipped",
    line: "Multi-service EV charging platform: per-service databases, sync + async messaging, graceful degradation under partial failure.",
  },
  {
    id: "deck",
    label: "deckgen",
    kind: "sys",
    x: 520,
    y: 88,
    z: 90,
    live: true,
    url: links.deckgen,
    title: "Deckgen",
    meta: "2025 → now · live product · write-up online",
    status: "live",
    line: "Every number on the slide traces to its source: evidence ledger, fan-out cite-only agents, and a verifier as a hard gate. 194 tests, 0 dangling citations.",
  },
  {
    id: "kanban",
    label: "tracker",
    kind: "sys",
    x: 668,
    y: 150,
    z: -30,
    live: true,
    url: links.tracker,
    title: "Tracker",
    meta: "live app · kanban + ai copilot",
    status: "live",
    line: "Multi-project kanban with AI summaries and suggestions. Opens to the login — the boards themselves stay private.",
  },
  {
    id: "home",
    label: "matter-home",
    kind: "sys",
    x: 790,
    y: 280,
    z: 60,
    live: true,
    title: "Matter over Thread home",
    meta: "2025 → now · running network",
    status: "live",
    line: "RPi5 border router, Nordic RCP radio, ESP32-C6/S3 nodes bridged so custom devices behave like factory Matter hardware.",
  },
  {
    id: "tren",
    label: "trendata-mcp",
    kind: "sys",
    x: 452,
    y: 300,
    z: -90,
    title: "TrenData agentic marketplace",
    meta: "2026 · msc enterprise track",
    status: "delivered",
    line: "Extended a market-intelligence platform with a custom agentic marketplace and MCP layer — the platform made agent-native.",
  },
  {
    id: "fv",
    label: "find-vendor",
    kind: "sys",
    x: 118,
    y: 126,
    z: 20,
    title: "find-vendor",
    meta: "2024 → 2025 · sunset",
    status: "sunset",
    line: "Agentic sourcing for industrial procurement. Researched with truck, food, and solar manufacturers; killed by trust, not capability.",
  },
  {
    id: "gv",
    label: "glideview",
    kind: "sys",
    x: 96,
    y: 392,
    z: -40,
    title: "GlideView",
    meta: "2022 → 2024 · sunset",
    status: "sunset",
    line: "AR product presentation and 3D web-optimization pipeline, with early reality-capture and gaussian-splatting experiments.",
  },
  {
    id: "jul",
    label: "julius-ecosystem",
    kind: "sys",
    x: 560,
    y: 414,
    z: 70,
    title: "The Julius Ecosystem",
    meta: "2023 → 2024 · julius meinl living · innovation manager · piloted",
    status: "piloted",
    line: 'Wallet-pass guest ecosystem with geo-anchored partner perks: "if you stay at the Julius, every high-end door is open."',
  },
  {
    id: "earth",
    label: "sauroneye → earthian",
    kind: "sys",
    x: 262,
    y: 410,
    z: -70,
    title: "SauronEye → Earthian",
    meta: "2024 · commercial lead · exited",
    status: "exited",
    line: "AI green-investment assessment. Ran B2B with Swiss investment firms and Dutch insurers; learned that enterprise AI sells on auditability.",
  },
  { id: "agents", label: "agents · mcp", kind: "dom", x: 330, y: 212, z: 0 },
  { id: "twins", label: "digital twins", kind: "dom", x: 560, y: 210, z: 30 },
  { id: "rag", label: "llm · rag", kind: "dom", x: 430, y: 32, z: -20 },
  { id: "ar3d", label: "ar · 3d", kind: "dom", x: 60, y: 300, z: 50 },
  { id: "iot", label: "iot · matter", kind: "dom", x: 852, y: 150, z: -50 },
  { id: "ux", label: "ux research", kind: "dom", x: 706, y: 400, z: 10 },
  { id: "sye", label: "systems eng", kind: "dom", x: 262, y: 316, z: -10 },
];

export const edges: GraphEdge[] = [
  { a: "twin", b: "twins" },
  { a: "twin", b: "sye" },
  { a: "twin", b: "rag" },
  { a: "volt", b: "sye" },
  { a: "deck", b: "rag" },
  { a: "deck", b: "sye" },
  { a: "kanban", b: "agents" },
  { a: "home", b: "iot" },
  { a: "home", b: "sye" },
  { a: "tren", b: "agents" },
  { a: "tren", b: "rag" },
  { a: "fv", b: "agents" },
  { a: "fv", b: "ux" },
  { a: "gv", b: "ar3d" },
  { a: "gv", b: "ux" },
  { a: "jul", b: "ux" },
  { a: "earth", b: "rag" },
  { a: "twins", b: "iot" },
];

/** Index nodes by id. */
export function nodeMap(): Map<string, GraphNode> {
  return new Map(nodes.map((n) => [n.id, n]));
}

/** Undirected adjacency: id → set of connected ids. */
export function adjacency(): Map<string, Set<string>> {
  const adj = new Map<string, Set<string>>();
  for (const n of nodes) adj.set(n.id, new Set());
  for (const e of edges) {
    adj.get(e.a)?.add(e.b);
    adj.get(e.b)?.add(e.a);
  }
  return adj;
}

/** Connected node ids for `id`. */
export function neighbors(id: string): string[] {
  return [...(adjacency().get(id) ?? [])];
}

export interface NodeDetail {
  title: string;
  meta: string;
  line: string;
  status?: NodeStatus;
  url?: string;
  caseSlug?: string;
}

/**
 * The inspector copy for a node (mockup select()). System nodes return their own
 * title/meta/line/status/url; domain nodes synthesize meta + a line from the labels of
 * the systems that exercise them.
 */
export function nodeDetail(id: string): NodeDetail {
  const map = nodeMap();
  const n = map.get(id);
  if (!n) {
    return { title: "select a node", meta: "", line: "" };
  }
  if (n.kind === "sys") {
    return {
      title: n.title ?? n.label,
      meta: n.meta ?? "",
      line: n.line ?? "",
      status: n.status,
      url: n.url,
      caseSlug: n.caseSlug,
    };
  }
  const labels = neighbors(id).map((nb) => map.get(nb)!.label);
  return {
    title: n.title ?? n.label,
    meta: "domain — connected systems light up on hover",
    line: `Systems exercising this domain: ${labels.join(", ")}.`,
  };
}
