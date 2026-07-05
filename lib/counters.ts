/**
 * Counter band (mockup `.band`). Pure formatter + the four figures. The count-up component
 * calls formatCounter every frame, so it must format intermediate floats too. Grouping uses
 * a THIN SPACE (U+2009) per the Spec Delta — the mockup used a plain space; the proposal
 * (behavior) wins over the mockup (look). Values are single-sourced here so the twin case
 * stats stay in sync (content/CLAUDE.md — one value, two views).
 */
export const THIN = " ";

export interface Counter {
  n: number;
  label: string;
  dec?: number;
  group?: boolean;
  suffix?: string;
  /** amber (live now) rather than teal (verified outcome) — the color-semantics split. */
  live?: boolean;
}

export function formatCounter(
  v: number,
  c: Pick<Counter, "dec" | "group" | "suffix">,
): string {
  const body = c.group
    ? Math.round(v).toLocaleString("en-US").replace(/,/g, THIN)
    : v.toFixed(c.dec ?? 0);
  return body + (c.suffix ?? "");
}

export const COUNTERS: Counter[] = [
  { n: 0.8247, dec: 4, label: "roc-auc · geofence anomaly scoring" },
  { n: 24380, group: true, label: "rdf triples in the live twin graph" },
  { n: 194, suffix: " tests", label: "gating the deckgen accuracy core" },
  { n: 7, suffix: " nodes", live: true, label: "on the thread mesh right now" },
];
