import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { baseMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

/**
 * 011 — launch surface. Track A is the static discoverability layer: the sitemap enumerates
 * every route from the SAME source the routes use (no drift), robots points at it, and the
 * root metadata carries the canonical base + share-card fields. The OG pixel render and the
 * Lighthouse gate are Track B (a running server / throttled Chrome on preview).
 */
describe("sitemap (011)", () => {
  const urls = sitemap().map((e) => e.url);

  it("includes home, every case, and every method route", () => {
    expect(urls).toContain(`${SITE_URL}/`);
    expect(urls).toContain(`${SITE_URL}/work/geofence-twin`);
    expect(urls).toContain(`${SITE_URL}/methods/spec-driven-agents`);
  });

  it("emits absolute https URLs and no duplicates", () => {
    for (const u of urls) expect(u.startsWith("https://")).toBe(true);
    expect(new Set(urls).size).toBe(urls.length);
  });
});

describe("robots (011)", () => {
  const r = robots();
  it("allows crawling and points at the sitemap", () => {
    const rules = Array.isArray(r.rules) ? r.rules[0] : r.rules;
    expect(rules.allow).toBe("/");
    expect(r.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });
});

describe("root metadata (011)", () => {
  it("sets the canonical metadataBase from the site origin", () => {
    expect(new URL(baseMetadata.metadataBase!).origin).toBe(SITE_URL);
  });

  it("carries a title template and the share-card fields", () => {
    const title = baseMetadata.title as { default: string; template: string };
    expect(title.template).toContain("Ivan Mikheev");
    expect(title.default).toBeTruthy();
    const og = baseMetadata.openGraph as { type?: string; images?: unknown };
    expect(og.type).toBe("website");
    // OG image is auto-injected by the file-convention route — must NOT be hand-wired here.
    expect(og.images).toBeUndefined();
    expect((baseMetadata.twitter as { card: string })?.card).toBe(
      "summary_large_image",
    );
  });
});
