/**
 * The MDX pipeline (proposal §Design "hard part" — define once). Case studies live as
 * `content/work/*.mdx`: gray-matter splits frontmatter from body; `@mdx-js/mdx` `evaluate`
 * compiles the body against a fixed component map. No next.config MDX loader is used — that
 * would drag in the Turbopack-on-Cyrillic footgun (root CLAUDE.md), and keeping compile in
 * one function is what lets vitest exercise the whole pipeline. Static prerender runs this
 * at build time in Node (evaluate's `new Function` is fine there — no edge, no CSP).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement, type ReactElement } from "react";
import matter from "gray-matter";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import type { Status } from "@/components/primitives/StatusChip";
import { CaseH2 } from "@/components/case/CaseH2";
import { Pipe } from "@/components/case/Pipe";
import { Stats, Stat } from "@/components/case/Stats";
import { Changelog } from "@/components/case/Changelog";
import { Callout } from "@/components/case/Callout";
import { slugify } from "@/lib/slug";

export { slugify };

/** Names available to every case's MDX body (mockup field-manual blocks). */
export const mdxComponents = {
  h2: CaseH2,
  Pipe,
  Stats,
  Stat,
  Changelog,
  Callout,
} as const;

export interface CaseFrontmatter {
  title: string;
  role: string;
  context: string;
  when: string;
  status: Status;
  /** Named external links (e.g. `article`) — URLs mirror lib/links; rendered in the meta row. */
  links: Record<string, string>;
}

export interface TocEntry {
  id: string;
  label: string;
}

const WORK_DIR = join(process.cwd(), "content", "work");

/** Read + split a case file. Throws if missing — a broken slug must fail the build. */
export function getCase(slug: string): {
  frontmatter: CaseFrontmatter;
  content: string;
} {
  const raw = readFileSync(join(WORK_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data as CaseFrontmatter, content };
}

/**
 * Build the on-this-page toc from the body's `## ` headings, using the SAME slugify the
 * `h2` injector uses so anchors never drift (lib/slug). `###` and deeper are ignored.
 */
export function extractToc(content: string): TocEntry[] {
  const out: TocEntry[] = [];
  for (const line of content.split("\n")) {
    const m = /^##[ \t]+(.+?)[ \t]*$/.exec(line);
    if (m) out.push({ label: m[1], id: slugify(m[1]) });
  }
  return out;
}

/** Compile a case: returns its frontmatter, toc, and the rendered MDX element. */
export async function renderCase(slug: string): Promise<{
  frontmatter: CaseFrontmatter;
  toc: TocEntry[];
  content: ReactElement;
}> {
  const { frontmatter, content } = getCase(slug);
  const { default: MDXContent } = await evaluate(content, {
    ...runtime,
    baseUrl: import.meta.url,
  });
  return {
    frontmatter,
    toc: extractToc(content),
    content: createElement(MDXContent, { components: mdxComponents }),
  };
}
