import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getCase, listCaseSlugs } from "@/lib/mdx";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Case study — Ivan Mikheev";

/** Prebuild one card per case (same slug source as the page route). */
export function generateStaticParams() {
  return listCaseSlugs().map((slug) => ({ slug }));
}

/** Per-case share card — the case title over the site identity. */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { frontmatter } = getCase(slug);
  return renderOg({
    kicker: `~/work/${slug}`,
    title: frontmatter.title,
    sub: "Ivan Mikheev",
  });
}
