"use client";

import { useEffect, useState } from "react";
import type { TickerItem } from "@/lib/telemetry";
import { formatAmsterdamTime } from "@/lib/time";
import { jumpTo } from "@/lib/nav";
import { Ticker } from "./Ticker";
import { useToast } from "./ToastProvider";

// Mobile diet (≤760px): tighter padding + smaller CTAs so ivan@ + both CTAs + clock all
// fit at 360px without the bar clipping (mockup ≤760 rules).
const CTA =
  "shrink-0 animate-beat rounded-[5px] border border-line-strong px-[11px] py-[4px] font-mono text-[11.5px] text-ink-dim hover:animate-none hover:border-amber hover:text-amber motion-reduce:animate-none max-[760px]:px-2 max-[760px]:py-[3px] max-[760px]:text-[10.5px]";
// SEG_BASE carries no display utility — callers add `flex` or `hidden min-[761px]:flex`
// so base `flex` and base `hidden` never collide on one element.
const SEG_BASE =
  "items-center gap-[7px] border-r border-line px-3 max-[760px]:px-2";
const SEG = `flex ${SEG_BASE}`;
const SEG_DESKTOP = `hidden min-[761px]:flex ${SEG_BASE}`;

/**
 * Fixed 38px statusline — the brand chrome. `overflow-hidden` on the bar is the
 * viewport-width fix from the mockups. On ≤760px the middle segments and inline ticker
 * hide (the static Tickbar in the home flow carries the ticker there instead).
 */
export function Statusline({ ticker }: { ticker: TickerItem[] }) {
  const { toast } = useToast();
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatAmsterdamTime(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      aria-label="statusline"
      className="fixed inset-x-0 top-0 z-50 flex h-[38px] items-center overflow-hidden whitespace-nowrap border-b border-line bg-[rgba(14,12,10,.88)] px-3 font-mono text-[12px] text-ink-dim backdrop-blur-[8px] max-[760px]:px-2 max-[760px]:text-[11px]"
    >
      <span className={SEG}>
        <span>
          <span className="text-ink">ivan</span>@
          <span className="text-ink">imikheev.dev</span>
        </span>
      </span>
      <span className={SEG_DESKTOP}>~/portfolio</span>
      <span className={SEG_DESKTOP}>⎇ main</span>
      <span className={SEG_DESKTOP}>
        focus <span className="text-amber">agentic-platforms</span>
      </span>

      <div className="hidden min-w-0 flex-1 px-3 min-[761px]:block">
        <Ticker items={ticker} />
      </div>

      <button
        type="button"
        onClick={() => toast("cv — we design it next; this button will serve the pdf")}
        className={`ml-auto ${CTA} min-[761px]:ml-0`}
      >
        cv ⇩
      </button>
      <button
        type="button"
        onClick={() => jumpTo("contact")}
        className={`ml-2 ${CTA} [animation-delay:1.6s]`}
      >
        let&apos;s talk
      </button>

      <span className="ml-2 flex shrink-0 items-center gap-[7px] px-3 max-[760px]:px-2">
        <span
          aria-hidden
          className="inline-block h-[6px] w-[6px] animate-dot-pulse rounded-full bg-amber motion-reduce:animate-none"
        />
        <span suppressHydrationWarning>{time ?? "--:--:--"}</span> CET
      </span>
    </header>
  );
}
