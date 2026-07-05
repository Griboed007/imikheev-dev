import { describe, it, expect } from "vitest";
import { smallMapProject, depthOpacity, bgMapProject } from "@/lib/canvas/map";
import { nodes } from "@/lib/graph";

const finite = (v: number) => Number.isFinite(v);

describe("map projection math (proposal 004)", () => {
  it("depthOpacity stays clamped within [0.35, 1] for any scale", () => {
    for (let s = 0.05; s <= 2.5; s += 0.013) {
      const o = depthOpacity(s);
      expect(o).toBeGreaterThanOrEqual(0.35);
      expect(o).toBeLessThanOrEqual(1);
    }
  });

  it("small-map projection is finite for every node across the yaw sweep", () => {
    for (const yaw of [-0.3, -0.1, 0, 0.18, 0.3]) {
      for (const n of nodes) {
        const p = smallMapProject(n, yaw);
        expect(finite(p.px) && finite(p.py) && finite(p.scale)).toBe(true);
        expect(p.opacity).toBeGreaterThanOrEqual(0.35);
        expect(p.opacity).toBeLessThanOrEqual(1);
      }
    }
  });

  it("bg-map projection is finite for every node and flags system nodes", () => {
    for (const a of [0, 1, 3, 5]) {
      for (const n of nodes) {
        const q = bgMapProject(n, a, 1440, 900);
        expect(finite(q.x) && finite(q.y) && finite(q.scale)).toBe(true);
        expect(typeof q.sys).toBe("boolean");
      }
    }
  });
});
