/**
 * Heading slug — the single source shared by the MDX `h2` id-injector (components/case)
 * and the toc extractor (lib/mdx). Kept as a leaf module so those two can both import it
 * without a cycle. If these ever diverge, in-page toc anchors stop matching their targets.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
