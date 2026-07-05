import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * robots (011): a portfolio wants to be found — allow every crawler, point them at the
 * sitemap, and declare the canonical host.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
