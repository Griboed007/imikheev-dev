import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { renderMethod, getMethod, extractToc, slugify } from "@/lib/mdx";

/**
 * 007 Spec Delta — "the page equals the document". These assertions read the REAL governing
 * file (`content/methods/spec-driven-agents.md`, rendered never edited) and prove the styled
 * components come from generic element-mapping, not hand-inserted JSX: so a doc edit reflects
 * on the next build with no component change. The webpack build proves the bundling/SSG;
 * vitest proves the pipeline (evaluate + remark-gfm + the method component map).
 */
describe("methods page renders the framework document", () => {
  it("reads the document title from its own h1", () => {
    const { title } = getMethod("spec-driven-agents");
    expect(title).toMatch(/spec-driven agentic development/i);
  });

  it("builds the toc from the ## headings in document order, ids matching slugify", () => {
    const { content } = getMethod("spec-driven-agents");
    const toc = extractToc(content);
    expect(toc.length).toBeGreaterThanOrEqual(8);
    const labels = toc.map((t) => t.label);
    // document order: §0 precedes §1 precedes §2 …
    expect(labels[0]).toMatch(/one-paragraph version/i);
    expect(labels.join(" | ")).toMatch(/three roles.*the loop/i);
    for (const t of toc) expect(t.id).toBe(slugify(t.label));
  });

  it("maps the markdown roles table to the styled .rtab (strategist/implementer/operator)", async () => {
    const { content } = await renderMethod("spec-driven-agents");
    const { container } = render(content);
    const table = container.querySelector("table.rtab");
    expect(table).not.toBeNull();
    const text = table!.textContent!.toLowerCase();
    expect(text).toContain("strategist");
    expect(text).toContain("implementer");
    expect(text).toContain("operator");
  });

  it("maps the TL;DR blockquote to a .callout", async () => {
    const { content } = await renderMethod("spec-driven-agents");
    const { container } = render(content);
    const callouts = Array.from(container.querySelectorAll(".callout"));
    expect(callouts.length).toBeGreaterThanOrEqual(1);
    const joined = callouts.map((c) => c.textContent).join(" ");
    expect(joined).toMatch(/write the contract first/i);
  });

  it("maps the fenced loop code block to the .pipe diagram (intent → … → archive)", async () => {
    const { content } = await renderMethod("spec-driven-agents");
    const { container } = render(content);
    const pipe = container.querySelector(".pipe");
    expect(pipe).not.toBeNull();
    const text = pipe!.textContent!.toLowerCase();
    expect(text).toContain("intent");
    expect(text).toContain("archive");
    // the parenthetical stages became box subtitles
    expect(text).toContain("tdd");
    expect(text).toContain("read-only");
  });

  it("suppresses the document h1 inside the article (the layout owns the title)", async () => {
    const { content } = await renderMethod("spec-driven-agents");
    const { container } = render(content);
    expect(container.querySelector("h1")).toBeNull();
  });
});
