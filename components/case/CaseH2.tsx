import type { ReactNode } from "react";
import { slugify } from "@/lib/slug";

/** Flatten heading children to text so the id matches the extracted toc entry exactly. */
function textOf(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) return children.map(textOf).join("");
  return "";
}

/**
 * The `h2` the MDX pipeline maps every `## Heading` to: injects a slugified id so the toc
 * anchors resolve. `scroll-margin-top` (article CSS) keeps the target clear of the 38px
 * fixed bar. Keep `##` lines plain text — inline markdown would desync id from toc.
 */
export function CaseH2({ children }: { children?: ReactNode }) {
  return <h2 id={slugify(textOf(children))}>{children}</h2>;
}
