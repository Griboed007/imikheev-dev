import { describe, it, expect } from "vitest";
import { parseTicker, getTicker } from "@/lib/telemetry";

describe("telemetry integrity gate", () => {
  it("loads and validates the ticker JSON", () => {
    const items = getTicker();
    expect(items.length).toBeGreaterThan(0);
    expect(items[0].segments[0]).toHaveProperty("text");
    expect(typeof items[0].segments[0].strong).toBe("boolean");
  });

  it("throws on malformed telemetry (the build integrity gate)", () => {
    expect(() => parseTicker({ items: [] })).toThrow(); // min(1) items
    expect(() => parseTicker({ items: [{ segments: [] }] })).toThrow(); // min(1) segments
    expect(() => parseTicker({ items: [{ segments: [{ text: "" }] }] })).toThrow(); // empty text
    expect(() => parseTicker({ nope: true })).toThrow();
    expect(() => parseTicker(null)).toThrow();
  });

  it("defaults strong to false when omitted", () => {
    const [item] = parseTicker({ items: [{ segments: [{ text: "hi" }] }] });
    expect(item.segments[0].strong).toBe(false);
  });
});
