/**
 * Canonical site origin (011). Sourced from `NEXT_PUBLIC_SITE_URL` (public, no secret —
 * see `.env.example`) with the production domain as the fallback so metadataBase, the
 * sitemap, robots, and absolute OG URLs all resolve even if the env var is absent at build.
 * No trailing slash — callers append paths.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://imikheev.dev"
).replace(/\/$/, "");

/** Absolute URL for a site-relative path (e.g. `abs("/work/x")`). */
export function abs(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
