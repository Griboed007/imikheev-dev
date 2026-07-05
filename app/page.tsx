import { getTicker } from "@/lib/telemetry";
import { Tickbar } from "@/components/shell/Tickbar";
import { Wrap } from "@/components/primitives/Wrap";
import { Reveal } from "@/components/primitives/Reveal";
import { StatusChip } from "@/components/primitives/StatusChip";
import { Ext } from "@/components/primitives/Ext";
import { links } from "@/lib/links";

/**
 * Placeholder home for changes 001–002. The Tickbar is the first element of the home flow
 * (mobile). The real hero/sections arrive in 003+.
 */
export default function Home() {
  const ticker = getTicker();
  return (
    <>
      <Tickbar items={ticker} />
      <main className="flex min-h-screen items-center min-[761px]:pt-[38px]">
        <Wrap>
          <span className="mb-3 block font-mono text-[12.5px] tracking-[.02em] text-amber">
            ~/foundation
          </span>
          <Reveal>
            <h1 className="font-mono text-[clamp(2rem,6vw,3.5rem)] font-semibold leading-tight tracking-[-.02em] text-ink">
              I engineer adoption<span className="text-amber">.</span>
            </h1>
          </Reveal>
          <p className="mt-6 max-w-[560px] font-sans text-ink-dim">
            Shell online — statusline, ticker, ⌘K, scroll progress, footer. Press{" "}
            <kbd className="rounded-[4px] border border-line-strong bg-panel2 px-[6px] py-px font-mono text-[11px]">
              ⌘K
            </kbd>{" "}
            to navigate. The interface itself lands in later changes.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <StatusChip status="live">building</StatusChip>
            <Ext
              href={links.github}
              className="font-mono text-[12.5px] text-ink-dim underline-offset-4 hover:text-amber hover:underline"
            >
              source
            </Ext>
          </div>
        </Wrap>
      </main>
    </>
  );
}
