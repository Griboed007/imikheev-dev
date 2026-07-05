import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { renderCase, getCase, slugify, extractToc } from "@/lib/mdx";

/**
 * Proposal task: "MDX pipeline renders the changelog component from the twin file."
 * This proves the LOGIC (evaluate + gray-matter + component map). The Next webpack build
 * proves the BUNDLING — vitest's environment can't stand in for that.
 */
describe("mdx pipeline", () => {
  it("parses the twin frontmatter", () => {
    const { frontmatter } = getCase("geofence-twin");
    expect(frontmatter.title).toMatch(/semantic digital twin/i);
    expect(frontmatter.status).toBe("shipped");
    expect(frontmatter.links.article).toMatch(/^https?:\/\//);
  });

  it("extracts a toc from the ## headings, id-matching slugify", () => {
    const { content } = getCase("geofence-twin");
    const toc = extractToc(content);
    expect(toc.length).toBeGreaterThanOrEqual(5);
    expect(toc.map((t) => t.label)).toContain("Changelog");
    // every toc id is exactly what slugify would produce for its label (no drift)
    for (const t of toc) expect(t.id).toBe(slugify(t.label));
  });

  it("renders the Changelog COMPONENT (not raw markdown) from the twin file", async () => {
    const { content } = await renderCase("geofence-twin");
    const { container } = render(content);
    // The mapped <Changelog> emits a .chlog container — proof the component ran.
    const log = container.querySelector(".chlog");
    expect(log).not.toBeNull();
    expect(log!.textContent).toMatch(/public write-up published/i);
  });
});
