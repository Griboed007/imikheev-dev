import "server-only";
import { z } from "zod";
import tickerData from "@/content/telemetry/ticker.json";

/**
 * Telemetry is git-versioned JSON under content/telemetry/, zod-validated at load —
 * malformed data throws and fails the build (the integrity gate; root CLAUDE.md #3).
 * 002 seeds the ticker as static JSON; 009 expands this into live tiles/focus.
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

/** Pure validator — throws on malformed input. Separated so tests can exercise the gate. */
export function parseTicker(data: unknown): TickerItem[] {
  return TickerFileSchema.parse(data).items;
}

/** Server-only loader over the static JSON. */
export function getTicker(): TickerItem[] {
  return parseTicker(tickerData);
}
