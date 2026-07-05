import { describe, it, expect } from "vitest";
import { formatCounter, COUNTERS, THIN } from "@/lib/counters";

/** Spec Delta: 0.8247 keeps 4 decimals; 24 380 uses thin-space grouping; suffixes append. */
describe("counter formatter", () => {
  it("keeps the exact decimal count", () => {
    expect(formatCounter(0.8247, { dec: 4 })).toBe("0.8247");
    // mid-animation value still fixed to 4 decimals
    expect(formatCounter(0.5, { dec: 4 })).toBe("0.5000");
  });

  it("groups with a THIN SPACE (U+2009), not a normal space", () => {
    const out = formatCounter(24380, { group: true });
    expect(out).toBe(`24${THIN}380`);
    expect(THIN).toBe(" ");
    expect(THIN.charCodeAt(0)).toBe(0x2009); // exactly THIN SPACE (U+2009)
    expect(out).not.toContain(" "); // no ASCII space
  });

  it("appends suffixes and rounds group/int values", () => {
    expect(formatCounter(194, { suffix: " tests" })).toBe("194 tests");
    expect(formatCounter(6.7, { suffix: " nodes" })).toBe("7 nodes");
  });

  it("band data carries the four exact final values and the live flag on nodes", () => {
    expect(COUNTERS.map((c) => c.n)).toEqual([0.8247, 24380, 194, 7]);
    const live = COUNTERS.filter((c) => c.live).map((c) => c.n);
    expect(live).toEqual([7]); // amber = live now; the other three are teal outcomes
  });
});
