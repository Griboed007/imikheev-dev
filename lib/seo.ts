import type { Metadata } from "next";
import { SITE_URL } from "./site";

/**
 * Root metadata (011). `metadataBase` is what makes the file-convention OG image and every
 * canonical/relative URL resolve to absolute `https://imikheev.dev/...`. The `title.template`
 * suffixes child-route titles (case/method pages return a bare title). The OG `images` field
 * is deliberately absent — the `app/opengraph-image.tsx` route auto-injects it; setting it
 * here too would double-wire the card.
 */
const TITLE = "Ivan Mikheev — I engineer adoption";
const DESCRIPTION =
  "Interfaces between intelligent systems and the people who use them: protocols, products, teams.";

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s — Ivan Mikheev" },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "imikheev.dev",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};
