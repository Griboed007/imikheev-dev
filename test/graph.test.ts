import { describe, it, expect } from "vitest";
import {
  nodes,
  edges,
  adjacency,
  neighbors,
  nodeMap,
  nodeDetail,
} from "@/lib/graph";
import { links } from "@/lib/links";

describe("graph module integrity (proposal 004: one dataset, two renderers)", () => {
  const ids = new Set(nodes.map((n) => n.id));

  it("has no duplicate node ids", () => {
    expect(ids.size).toBe(nodes.length);
  });

  it("every edge references two existing node ids", () => {
    for (const e of edges) {
      expect(ids.has(e.a), `edge endpoint ${e.a}`).toBe(true);
      expect(ids.has(e.b), `edge endpoint ${e.b}`).toBe(true);
    }
  });

  it("has no self-edges", () => {
    for (const e of edges) expect(e.a).not.toBe(e.b);
  });

  it("builds a symmetric adjacency", () => {
    const adj = adjacency();
    for (const [id, set] of adj) {
      for (const other of set) {
        expect(adj.get(other)?.has(id), `${other} should link back to ${id}`).toBe(
          true,
        );
      }
    }
  });

  it("indexes every node by id", () => {
    const map = nodeMap();
    expect(map.size).toBe(nodes.length);
    for (const n of nodes) expect(map.get(n.id)).toBe(n);
  });
});

describe("detail-panel copy", () => {
  it("a live system node returns its own title / meta / status / url", () => {
    const d = nodeDetail("deck");
    expect(d.title).toBe("Deckgen");
    expect(d.status).toBe("live");
    expect(d.url).toBe(links.deckgen);
    expect(d.line).toContain("evidence ledger");
    expect(d.caseSlug).toBeUndefined();
  });

  it("the shipped case node carries its case slug", () => {
    const d = nodeDetail("twin");
    expect(d.status).toBe("shipped");
    expect(d.caseSlug).toBe("geofence-twin");
  });

  it("a domain node synthesizes copy from its neighbor labels", () => {
    const d = nodeDetail("sye");
    expect(d.status).toBeUndefined();
    expect(d.url).toBeUndefined();
    expect(d.line.startsWith("Systems exercising this domain:")).toBe(true);
    const map = nodeMap();
    for (const nb of neighbors("sye")) {
      expect(d.line).toContain(map.get(nb)!.label);
    }
  });
});
