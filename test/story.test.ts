import { describe, it, expect } from "vitest";
import { LEDGER } from "@/components/story/ledger";
import { HACKATHONS } from "@/components/hackathons/hackathons";

describe("story ledger (006)", () => {
  it("the Julius row names both the company and the role", () => {
    const jul = LEDGER.find((r) => r.name.includes("julius"));
    expect(jul).toBeDefined();
    expect(jul!.lesson).toContain("Julius Meinl Living");
    expect(jul!.lesson).toContain("Innovation Manager");
  });
});

describe("hackathon dates (006)", () => {
  it("both Insurance Challenges read 2023, not 2022 (per the press record)", () => {
    const insurance = HACKATHONS.filter((h) => /insurance challenge/i.test(h.slug));
    expect(insurance).toHaveLength(2);
    expect(insurance.every((h) => h.slug.startsWith("2023"))).toBe(true);
  });
});
