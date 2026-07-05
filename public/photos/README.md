# public/photos — the Instagram shuffle pipeline

Instagram has no sane public API for this. The pipeline is boring on purpose:

1. Export 6–12 frames from @ivan_von_terrible (or camera originals) as
   1280px-wide jpg into this folder.
2. Regenerate `manifest.json` (filename + EXIF: focal length, f, shutter, iso).
3. The shuffle tile reads the manifest; the EXIF strip follows each frame.

Refreshing the gallery = drop files + regenerate + commit. No tokens, no scraping, no
third-party dependency that dies in a year.

## Status (009)

`manifest.json` is seeded by hand to match the design mockup: three CSS-gradient frames
with lens-matched EXIF (the mockup itself uses gradient placeholders, not image files, and
no jpgs exist yet). The loader (`getPhotos` in `lib/telemetry.ts`) zod-validates it, so a
malformed edit fails the build.

The `npm run photos:manifest` generator (step 2, EXIF extraction from real jpgs) is
**deferred** — it needs an EXIF dependency and real photos to read, neither of which exists
yet. It arrives with the first batch of real frames. Until then the manifest is edited
directly (still git-versioned, still build-gated).
