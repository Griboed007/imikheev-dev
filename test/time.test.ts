import { describe, it, expect } from "vitest";
import { formatAmsterdamTime } from "@/lib/time";

describe("statusline clock", () => {
  it("formats an instant as HH:MM:SS in Europe/Amsterdam", () => {
    // 2026-07-05T10:00:00Z → Amsterdam is UTC+2 (CEST) in July → 12:00:00
    const summer = new Date("2026-07-05T10:00:00Z");
    expect(formatAmsterdamTime(summer)).toBe("12:00:00");
  });

  it("honours the winter offset (UTC+1)", () => {
    // 2026-01-05T10:00:00Z → Amsterdam is UTC+1 (CET) in January → 11:00:00
    const winter = new Date("2026-01-05T10:00:00Z");
    expect(formatAmsterdamTime(winter)).toBe("11:00:00");
  });

  it("always produces a zero-padded HH:MM:SS shape", () => {
    expect(formatAmsterdamTime(new Date("2026-07-05T05:03:07Z"))).toMatch(
      /^\d{2}:\d{2}:\d{2}$/,
    );
  });
});
