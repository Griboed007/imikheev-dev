import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { listCaseSlugs, listMethodSlugs } from "@/lib/mdx";

/**
 * The sitemap (011). Enumerates `/` plus every case and method route from the SAME slug
 * source `generateStaticParams` uses (`lib/mdx`), so a new content file appears here the
 * moment it ships — the list can't drift from what's actually built.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...listCaseSlugs().map((s) => `/work/${s}`),
    ...listMethodSlugs().map((s) => `/methods/${s}`),
  ];
  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
