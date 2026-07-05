import { describe, it, expect } from "vitest";
import { links } from "@/lib/links";

/**
 * Proposal (006): every EXTERNAL record the story/education/hackathon sections cite must
 * live in the registry (claims trace to sources). NOTE for the operator: the proposal says
 * "six external records", but only FIVE are external URLs — the sixth link is the Nebius
 * CASE ROUTE (/work/geofence-twin), an internal Next path, not a links.ts entry.
 */
const EXTERNAL_RECORDS = [
  "endorsement",
  "thesisPdf",
  "achmeaChallenge",
  "pressInterview",
  "geofenceArticle",
] as const;

describe("external link registry (006)", () => {
  it("contains every external record the sections cite, each an https URL", () => {
    for (const k of EXTERNAL_RECORDS) {
      expect(links[k], k).toMatch(/^https:\/\//);
    }
  });

  it("the two Achmea press links are distinct verzekeraars.nl records", () => {
    expect(links.achmeaChallenge).toContain("verzekeraars.nl");
    expect(links.pressInterview).toContain("verzekeraars.nl");
    expect(links.achmeaChallenge).not.toBe(links.pressInterview);
  });
});
