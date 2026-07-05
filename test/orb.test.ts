import { describe, it, expect } from "vitest";
import {
  fibonacciSphere,
  ring,
  orbits,
  project,
  ORB_POINTS,
  ORBIT_STEP,
} from "@/lib/canvas/orb";

const finite = (v: number) => Number.isFinite(v);

describe("orb projection math (proposal 003)", () => {
  it("fibonacciSphere returns ORB_POINTS points, all on the unit sphere", () => {
    const pts = fibonacciSphere(ORB_POINTS, () => 1); // rng()=1 → never anomalous
    expect(pts).toHaveLength(ORB_POINTS);
    for (const p of pts) {
      expect(Math.hypot(p.x, p.y, p.z)).toBeCloseTo(1, 5);
      expect(p.anomaly).toBe(false);
    }
  });

  it("flags a point as an anomaly when the RNG falls under the rate", () => {
    const pts = fibonacciSphere(10, () => 0); // rng()=0 → always anomalous
    expect(pts.every((p) => p.anomaly)).toBe(true);
  });

  it("ring wraps a tilted unit circle", () => {
    const r = ring(0.55, 0.3, ORBIT_STEP);
    expect(r.length).toBeGreaterThan(100);
    for (const p of r) expect(Math.hypot(p.x, p.y, p.z)).toBeCloseTo(1, 5);
  });

  it("orbits() are the two mockup rings", () => {
    expect(orbits()).toHaveLength(2);
  });

  it("project yields finite screen coords and depth within [0,1] for all rotations", () => {
    const pts = fibonacciSphere(200, () => 1);
    for (const a of [0, 1, 2.5, 4, 6]) {
      const cA = Math.cos(a);
      const sA = Math.sin(a);
      const cB = Math.cos(a * 0.6 + 0.15);
      const sB = Math.sin(a * 0.6 + 0.15);
      for (const p of pts) {
        const q = project(p, cA, sA, cB, sB, 200, 300, 300);
        expect(finite(q.sx) && finite(q.sy) && finite(q.scale)).toBe(true);
        expect(q.scale).toBeGreaterThan(0);
        expect(q.depth).toBeGreaterThanOrEqual(0);
        expect(q.depth).toBeLessThanOrEqual(1);
      }
    }
  });
});
