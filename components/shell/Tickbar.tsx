import type { TickerItem } from "@/lib/telemetry";
import { Ticker } from "./Ticker";

/**
 * Mobile-only ticker (settled in v0.8): ≤760px it renders as a static bar directly below
 * the statusline, as the first element of the home flow — it scrolls away with the page,
 * it does NOT follow. `mt-[38px]` clears the fixed statusline; hidden ≥761px.
 */
export function Tickbar({ items }: { items: TickerItem[] }) {
  return (
    <div
      aria-hidden
      className="mt-[38px] block border-b border-line bg-panel py-[9px] min-[761px]:hidden"
    >
      <Ticker items={items} speed="mobile" />
    </div>
  );
}
