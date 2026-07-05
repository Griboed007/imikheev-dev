import { Wrap } from "@/components/primitives/Wrap";
import { Reveal } from "@/components/primitives/Reveal";
import { StatusChip } from "@/components/primitives/StatusChip";
import { Ext } from "@/components/primitives/Ext";

/**
 * Placeholder home for change 001. The real hero/sections arrive in 003+. This exists so
 * the foundation is verifiable end-to-end: dark parity, amber focus ring (tab to the
 * link), and reveal-under-reduced-motion.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen items-center">
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
          Design system online — tokens, fonts, primitives, reduced-motion policy.
          The interface itself lands in later changes.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <StatusChip status="live">building</StatusChip>
          <Ext
            href="https://github.com/Griboed007"
            className="font-mono text-[12.5px] text-ink-dim underline-offset-4 hover:text-amber hover:underline"
          >
            source
          </Ext>
        </div>
      </Wrap>
    </main>
  );
}
