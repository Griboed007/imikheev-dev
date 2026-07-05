import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getMethod, listMethodSlugs } from "@/lib/mdx";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Method — Ivan Mikheev";

/** Prebuild one card per governing method doc (same slug source as the page route). */
export function generateStaticParams() {
  return listMethodSlugs().map((slug) => ({ slug }));
}

/** Per-method share card — the method's own title over the site identity. */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { title } = getMethod(slug);
  return renderOg({ kicker: `~/methods/${slug}`, title, sub: "Ivan Mikheev" });
}
