# app/ — routes and layouts

- App Router, RSC by default; `"use client"` only where interaction/canvas demands it.
- Routes: `/` (all home sections, in proposal order), `/work/[slug]`, `/methods/[slug]`,
  `sitemap.ts`, `robots.ts`,
  `opengraph-image.tsx` (011).
- The fixed statusline + tickbar + footer live in `app/layout.tsx` via shell components.
- Anchors must respect the 38px fixed bar: use `scroll-margin-top` on section headings.
- Case/method pages share one field-manual layout component — do not fork it.
