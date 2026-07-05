import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { renderCase, getCase, listCaseSlugs } from "@/lib/mdx";
import { CaseLayout } from "@/components/case/CaseLayout";
import { StatusChip } from "@/components/primitives/StatusChip";
import { Ext } from "@/components/primitives/Ext";

/** One static route per case file — shared slug source with the sitemap (lib/mdx). */
export function generateStaticParams() {
  return listCaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = getCase(slug);
    // Bare title — the layout's `%s — Ivan Mikheev` template suffixes it. Canonical points
    // at this route (overrides the layout's `/` default so cases don't self-canonicalize home).
    return {
      title: frontmatter.title,
      description: `${frontmatter.role} · ${frontmatter.context}`,
      alternates: { canonical: `/work/${slug}` },
    };
  } catch {
    return {};
  }
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let rendered;
  try {
    rendered = await renderCase(slug);
  } catch {
    notFound();
  }
  const fm = rendered.frontmatter;
  const meta = [
    { k: "role", v: fm.role },
    { k: "context", v: fm.context },
    { k: "when", v: fm.when },
    { k: "status", v: <StatusChip status={fm.status} /> },
    ...(fm.links?.article
      ? [
          {
            k: "writing",
            v: (
              <Ext href={fm.links.article} className="text-amber">
                the article ↗
              </Ext>
            ),
          },
        ]
      : []),
  ];
  return (
    <main className="relative z-[1]">
      <CaseLayout base="work" slug={slug} title={fm.title} meta={meta} toc={rendered.toc}>
        {rendered.content}
      </CaseLayout>
    </main>
  );
}
