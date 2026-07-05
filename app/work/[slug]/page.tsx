import { readdirSync } from "node:fs";
import { join } from "node:path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { renderCase, getCase } from "@/lib/mdx";
import { CaseLayout } from "@/components/case/CaseLayout";

/** Enumerate the content dir → one static route per case file. Only geofence-twin in 005. */
export function generateStaticParams() {
  return readdirSync(join(process.cwd(), "content", "work"))
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = getCase(slug);
    return { title: `${frontmatter.title} — Ivan Mikheev` };
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
  return (
    <main className="relative z-[1]">
      <CaseLayout slug={slug} frontmatter={rendered.frontmatter} toc={rendered.toc}>
        {rendered.content}
      </CaseLayout>
    </main>
  );
}
