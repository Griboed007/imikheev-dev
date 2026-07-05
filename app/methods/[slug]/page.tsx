import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { renderMethod, getMethod, listMethodSlugs } from "@/lib/mdx";
import { CaseLayout } from "@/components/case/CaseLayout";
import { StatusChip } from "@/components/primitives/StatusChip";

/** One static route per governing doc — shared slug source with the sitemap (lib/mdx). */
export function generateStaticParams() {
  return listMethodSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { title } = getMethod(slug);
    // Bare title (layout template suffixes it); canonical at this route.
    return { title, alternates: { canonical: `/methods/${slug}` } };
  } catch {
    return {};
  }
}

export default async function MethodPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let rendered;
  try {
    rendered = await renderMethod(slug);
  } catch {
    notFound();
  }
  // Meta-row is page chrome (the doc has no frontmatter), transcribed from the mockup method
  // page. "v1 · in daily use" uses the shipped (teal) chip per the mockup's `st-shipped`.
  const meta = [
    { k: "source", v: "framework.md · distilled from deckgen" },
    { k: "stack", v: "openspec · claude code · plan mode" },
    {
      k: "status",
      v: <StatusChip status="shipped">v1 · in daily use</StatusChip>,
    },
  ];
  return (
    <main className="relative z-[1]">
      <CaseLayout
        base="methods"
        slug={slug}
        title={rendered.title}
        meta={meta}
        toc={rendered.toc}
      >
        {rendered.content}
      </CaseLayout>
    </main>
  );
}
