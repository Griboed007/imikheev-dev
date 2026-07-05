# public/photos — the Instagram shuffle pipeline

Instagram has no sane public API for this. The pipeline is boring on purpose:

1. Export 6–12 frames from @ivan_von_terrible (or camera originals) as
   1280px-wide jpg into this folder.
2. Run `npm run photos:manifest` (added in 009) — writes `manifest.json` with
   filename + EXIF pulled from the file (focal length, f, shutter, iso).
3. The shuffle tile reads the manifest; EXIF strip follows each frame.

Refreshing the gallery = drop files + rerun + commit. No tokens, no scraping, no
third-party dependency that dies in a year.
