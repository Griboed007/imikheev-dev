import { Children, isValidElement, type ReactNode } from "react";
import { Pipe, type PipeStep } from "@/components/case/Pipe";

/**
 * The generic element map for the framework document (007). The `.md` is a governing doc —
 * RENDERED, never edited (content/CLAUDE.md) — so its styled look comes from mapping plain
 * markdown blocks to the mockup's components, NOT from hand-inserted JSX. That is what makes
 * the Spec Delta hold: a doc edit reflects on the next build with zero component changes.
 */

/** GFM roles table → mockup `.rtab`. MDX hands us the thead/tbody/tr/th/td tree as children. */
export function RolesTable({ children }: { children?: ReactNode }) {
  return <table className="rtab">{children}</table>;
}

/** A markdown blockquote → mockup `.callout` (amber-ruled aside). The doc's only blockquote
 *  is the TL;DR; no title eyebrow, since the generic mapping has no text to invent. */
export function MethodCallout({ children }: { children?: ReactNode }) {
  return <div className="callout">{children}</div>;
}

/** Flatten a `<pre><code>…</code></pre>` subtree to its raw text. */
function codeText(node: ReactNode): string {
  let text = "";
  Children.forEach(node, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      text += String(child);
    } else if (isValidElement(child)) {
      text += codeText((child.props as { children?: ReactNode }).children);
    }
  });
  return text;
}

/**
 * A fenced code block → the `.pipe` diagram when it's an arrow-chain (the framework's §2
 * loop: `Intent → … → Archive`). Parsed live from the text so the diagram tracks doc edits
 * (proposal "hard part"): split on the arrow, and a trailing `(TDD)` / `(read-only)` becomes
 * the box subtitle. Any other fenced block falls back to a plain styled `<pre>`.
 */
export function LoopBlock({ children }: { children?: ReactNode }) {
  const text = codeText(children).replace(/\s+$/, "").trim();
  if (text.includes("→")) {
    const steps: PipeStep[] = text.split("→").map((raw) => {
      const s = raw.trim();
      const m = /^(.*?)\s*\(([^)]+)\)\s*$/.exec(s);
      return m ? { label: m[1].trim(), sub: m[2].trim() } : { label: s };
    });
    return <Pipe steps={steps} />;
  }
  return <pre className="mcode">{children}</pre>;
}
