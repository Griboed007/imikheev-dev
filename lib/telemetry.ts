import "server-only";
import { z } from "zod";
import coffeeData from "@/content/telemetry/coffee.json";
import rideData from "@/content/telemetry/ride.json";
import fieldNotesData from "@/content/telemetry/field-notes.json";
import shelfData from "@/content/telemetry/shelf.json";
import statusData from "@/content/telemetry/status.json";
import photosData from "@/public/photos/manifest.json";

/**
 * Telemetry is git-versioned JSON under content/telemetry/ (+ the photo manifest under
 * public/photos/), zod-validated at load — malformed data throws and fails the build
 * (the integrity gate; root CLAUDE.md #3). There is no database and no secret here by
 * decision: editing a value = editing a file = a commit; Vercel rebuilds on push.
 *
 * 002 seeded the ticker; 009 splits telemetry into per-surface files (coffee/ride/
 * field-notes/shelf/status) and derives the coffee + ride ticker lines from their source
 * files so a `coffee.json` edit updates the tile AND both ticker variants with no code
 * edit (Spec Delta "editing is a commit"). No source-backed value is hardcoded twice.
 */
const TickerSegmentSchema = z.object({
  text: z.string().min(1),
  strong: z.boolean().default(false),
});
const TickerItemSchema = z.object({
  segments: z.array(TickerSegmentSchema).min(1),
});
export const TickerFileSchema = z.object({
  items: z.array(TickerItemSchema).min(1),
});

export type TickerSegment = z.infer<typeof TickerSegmentSchema>;
export type TickerItem = z.infer<typeof TickerItemSchema>;

/** Standalone {items:[…]} validator — still exercised by the integrity-gate test. */
export function parseTicker(data: unknown): TickerItem[] {
  return TickerFileSchema.parse(data).items;
}

/**
 * Run a parser and, on a zod failure, rethrow with the FILE named — zod knows the field
 * path but not the source file, and the Spec Delta requires the build error to name both.
 * Every loader below funnels through this so a malformed edit fails the build loudly with
 * `telemetry integrity gate: <file> — <field>: <message>`.
 */
function validated<T>(
  file: string,
  parser: (d: unknown) => T,
  data: unknown,
): T {
  try {
    return parser(data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const where = err.issues
        .map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`)
        .join("; ");
      throw new Error(`telemetry integrity gate: ${file} — ${where}`);
    }
    throw err;
  }
}

// ---- coffee (the grinder tile) --------------------------------------------
const CoffeeSchema = z.object({
  name: z.string().min(1),
  bean: z.string().min(1),
  roaster: z.string().min(1),
  notes: z.string().min(1),
});
export type Coffee = z.infer<typeof CoffeeSchema>;
export function parseCoffee(data: unknown): Coffee {
  return CoffeeSchema.parse(data);
}
export function getCoffee(): Coffee {
  return validated("content/telemetry/coffee.json", parseCoffee, coffeeData);
}

// ---- ride (cross-country tile) --------------------------------------------
const RideSchema = z.object({
  bike: z.string().min(1),
  shortName: z.string().min(1),
  notes: z.string().min(1),
  pressLabel: z.string().min(1),
});
export type Ride = z.infer<typeof RideSchema>;
export function parseRide(data: unknown): Ride {
  return RideSchema.parse(data);
}
export function getRide(): Ride {
  return validated("content/telemetry/ride.json", parseRide, rideData);
}

// ---- field notes (ChargeHyve tile) ----------------------------------------
const FieldNotesSchema = z.object({
  title: z.string().min(1),
  notes: z.string().min(1),
  linkLabel: z.string().min(1),
});
export type FieldNotes = z.infer<typeof FieldNotesSchema>;
export function parseFieldNotes(data: unknown): FieldNotes {
  return FieldNotesSchema.parse(data);
}
export function getFieldNotes(): FieldNotes {
  return validated("content/telemetry/field-notes.json", parseFieldNotes, fieldNotesData);
}

// ---- shelf (currently reading) --------------------------------------------
const BookSchema = z.object({
  title: z.string().min(1),
  note: z.string().min(1),
  glyph: z.enum(["crown", "bulb", "loop"]),
});
const ShelfSchema = z.object({ books: z.array(BookSchema).min(1) });
export type Book = z.infer<typeof BookSchema>;
export type Shelf = z.infer<typeof ShelfSchema>;
export function parseShelf(data: unknown): Shelf {
  return ShelfSchema.parse(data);
}
export function getShelf(): Shelf {
  return validated("content/telemetry/shelf.json", parseShelf, shelfData);
}

// ---- status (focus string + static ticker extras) -------------------------
const StatusSchema = z.object({
  focus: z.string().min(1),
  ticker: z.array(TickerItemSchema).min(1),
});
export type Status = z.infer<typeof StatusSchema>;
export function parseStatus(data: unknown): Status {
  return StatusSchema.parse(data);
}
export function getStatus(): Status {
  return validated("content/telemetry/status.json", parseStatus, statusData);
}
/** The statusline focus token — data-driven so editing status.json moves the bar. */
export function getFocus(): string {
  return getStatus().focus;
}

// ---- photo manifest (IG shuffle) ------------------------------------------
// Frames are CSS backgrounds + lens-matched EXIF (the mockup uses gradients, not files;
// public/photos/README documents the refresh pipeline for when real jpgs land).
const PhotoFrameSchema = z.object({
  bg: z.string().min(1),
  exif: z.string().min(1),
});
const PhotoManifestSchema = z.object({
  frames: z.array(PhotoFrameSchema).min(1),
});
export type PhotoFrame = z.infer<typeof PhotoFrameSchema>;
export type PhotoManifest = z.infer<typeof PhotoManifestSchema>;
export function parsePhotos(data: unknown): PhotoManifest {
  return PhotoManifestSchema.parse(data);
}
export function getPhotos(): PhotoManifest {
  return validated("public/photos/manifest.json", parsePhotos, photosData);
}

// ---- composed ticker -------------------------------------------------------
function coffeeTicker(c: Coffee): TickerItem {
  return {
    segments: [
      { text: "in the grinder ", strong: false },
      { text: c.bean, strong: true },
      { text: ` · ${c.roaster}`, strong: false },
    ],
  };
}
function rideTicker(r: Ride): TickerItem {
  return {
    segments: [
      { text: "cross-country on the ", strong: false },
      { text: r.shortName, strong: true },
    ],
  };
}

/**
 * The marquee feed (both variants read this): the static extras from status.json with the
 * coffee + ride lines DERIVED from their source files and spliced into the curated mockup
 * position (after the three system lines). Splice index is structure; the values are data,
 * so editing coffee.json/ride.json moves the ticker with no code edit.
 */
export function getTicker(): TickerItem[] {
  const items = [...getStatus().ticker];
  items.splice(3, 0, coffeeTicker(getCoffee()), rideTicker(getRide()));
  return items;
}
