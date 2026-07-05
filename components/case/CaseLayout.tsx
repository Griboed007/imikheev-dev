import type { ReactNode } from "react";
import { Wrap } from "@/components/primitives/Wrap";
import { StatusChip } from "@/components/primitives/StatusChip";
import { Ext } from "@/components/primitives/Ext";
import type { CaseFrontmatter, TocEntry } from "@/lib/mdx";

/**
 * The field-manual layout shared by every case study (app/CLAUDE.md — do not fork it).
 * Frontmatter drives the crumb, h1, and meta row; the MDX body renders inside <article>.
 * The toc is sticky; article `h2`s carry slug ids + scroll-margin (globals.css) so anchors
 * land clear of the 38px fixed bar.
 */
export function CaseLayout({
  slug,
  frontmatter: fm,
  toc,
  children,
}: {
  slug: string;
  frontmatter: CaseFrontmatter;
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
              ~/work/<b>{slug}</b>
            </div>
            <h1>{fm.title}</h1>
            <div className="meta-row">
              <span>
                <span className="k">role</span> {fm.role}
              </span>
              <span>
                <span className="k">context</span> {fm.context}
              </span>
              <span>
                <span className="k">when</span> {fm.when}
              </span>
              <span>
                <span className="k">status</span> <StatusChip status={fm.status} />
              </span>
              {fm.links?.article ? (
                <span>
                  <span className="k">writing</span>{" "}
                  <Ext href={fm.links.article} className="text-amber">
                    the article ↗
                  </Ext>
                </span>
              ) : null}
            </div>
            {children}
          </article>
        </div>
      </Wrap>
    </section>
  );
}
