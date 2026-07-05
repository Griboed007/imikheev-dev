"use client";

import { useEffect, useState } from "react";
import { Orb } from "./Orb";
import { WordCycle } from "./WordCycle";

const CHIP =
  "inline-flex items-center gap-2 rounded-[6px] border border-line-strong bg-[rgba(14,12,10,.5)] px-3 py-[7px] font-mono text-[12px] text-ink-dim transition-colors hover:border-amber hover:text-ink";

/**
 * Hero (proposal 003). Line 1 mask-slides in; line 2 cycles the accent word. The orb lives
 * INSIDE `.hero-inner` so it anchors to the content column. `.is-ready` (added on mount)
 * triggers the mask-slide / sub / hints reveals; reduced motion forces them visible via CSS.
 */
export function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Open ⌘K without reaching into the archived shell component: replay the shortcut.
  const openCmdK = () =>
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }),
    );

  return (
    <section id="hero" className={`hero ${ready ? "is-ready" : ""}`}>
      <div className="hero-inner">
        <Orb />
        <div className="hero-copy">
          <span className="mb-[14px] block font-mono text-[12.5px] tracking-[.02em] text-amber">
            // ai engineer · entrepreneur · enschede, nl
          </span>
          <h1 className="font-mono text-[clamp(2.5rem,7.2vw,5.2rem)] font-semibold leading-[1.06] tracking-[-.03em] text-ink">
            <span className="hl">
              <span>I engineer</span>
            </span>
            <span className="hl">
              <span>
                <WordCycle />
              </span>
            </span>
          </h1>
          <p className="hero-sub mt-7 max-w-[560px] font-sans text-[1.12rem] text-ink-dim">
            Interfaces between intelligent systems and the people who use them — protocols,
            products, and teams. This site is a digital twin of my work: every moving
            element maps to live state.
          </p>
          <div className="hero-hints mt-11 flex flex-wrap gap-3">
            <button type="button" onClick={openCmdK} className={CHIP}>
              navigate{" "}
              <kbd className="rounded-[4px] border border-line-strong bg-panel2 px-[6px] py-px text-[11px]">
                ⌘K
              </kbd>
            </button>
            <a href="#map" className={CHIP}>
              explore the system map ↓
            </a>
          </div>
        </div>
      </div>
      <span className="scrolldown absolute bottom-6 left-6 z-[1] font-mono text-[11.5px] text-ink-mute">
        scroll ▾
      </span>
    </section>
  );
}
