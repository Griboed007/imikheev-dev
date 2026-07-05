import type { ReactNode } from "react";
import { Wrap } from "@/components/primitives/Wrap";
import type { TocEntry } from "@/lib/mdx";

/**
 * The field-manual layout shared by every case study AND the framework method page
 * (app/CLAUDE.md — one layout, do not fork it). `base` drives the crumb (`~/work` vs
 * `~/methods`); `meta` is a caller-built key/value row (frontmatter for cases, fixed chrome
 * for methods) so the layout stays agnostic to either source. The MDX body renders inside
 * <article>; the toc is sticky and article `h2`s carry slug ids + scroll-margin (globals.css)
 * so anchors land clear of the 38px fixed bar.
 */
export function CaseLayout({
  base,
  slug,
  title,
  meta,
  toc,
  children,
}: {
  base: string;
  slug: string;
  title: string;
  meta: { k: string; v: ReactNode }[];
  toc: TocEntry[];
  children: ReactNode;
}) {
  return (
    <section className="case">
      <Wrap>
        <a className="backlink" href="/">
          ← ~/portfolio
        </a>
        <div className="case-grid">
          <nav className="toc">
            <div className="t">on this page</div>
            {toc.map((e) => (
              <a key={e.id} href={`#${e.id}`}>
                {e.label.toLowerCase()}
              </a>
            ))}
          </nav>
          <article>
            <div className="crumb">
              ~/{base}/<b>{slug}</b>
            </div>
            <h1>{title}</h1>
            <div className="meta-row">
              {meta.map((m) => (
                <span key={m.k}>
                  <span className="k">{m.k}</span> {m.v}
                </span>
              ))}
            </div>
            {children}
          </article>
        </div>
      </Wrap>
    </section>
  );
}
