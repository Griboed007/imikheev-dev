"use client";

import { useEffect, useRef } from "react";
import { Wrap } from "@/components/primitives/Wrap";
import { useReducedMotion } from "@/lib/motion";
import { COUNTERS, formatCounter } from "@/lib/counters";

/**
 * Counter band (mockup `.band`). Each number eases to its exact final value on the band's
 * FIRST intersection, then never re-runs (Spec Delta) — the observer disconnects. The
 * count-up is JS-driven, so the global reduced-motion CSS net does NOT cover it: under
 * reduced motion we jump straight to the final values (kill list, tokens.md §motion).
 * Live count (7 nodes) is amber; the three verified outcomes are teal (color-semantics).
 */
export function CounterBand() {
  const reduced = useReducedMotion();
  const bandRef = useRef<HTMLDivElement>(null);
  const numRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const set = (i: number, v: number) => {
      const el = numRefs.current[i];
      if (el) el.textContent = formatCounter(v, COUNTERS[i]);
    };

    if (reduced) {
      COUNTERS.forEach((c, i) => set(i, c.n));
      return;
    }

    const band = bandRef.current;
    if (!band) return;
    let raf = 0;
    let started = false;

    const run = () => {
      const dur = 1500;
      const st = performance.now();
      const frame = (now: number) => {
        const p = Math.min(1, (now - st) / dur);
        const e = 1 - Math.pow(1 - p, 3); // ease-out cubic (mockup)
        COUNTERS.forEach((c, i) => set(i, c.n * e));
        if (p < 1) raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          run();
          io.disconnect(); // fires once, never re-runs
        }
      },
      { threshold: 0.4 },
    );
    io.observe(band);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div className="band" ref={bandRef}>
      <Wrap>
        <div className="band-wrap">
          {COUNTERS.map((c, i) => (
            <div className={`big ${c.live ? "live" : ""}`.trim()} key={c.label}>
              <div
                className="num"
                ref={(el) => {
                  numRefs.current[i] = el;
                }}
              >
                0
              </div>
              <div className="lbl">{c.label}</div>
            </div>
          ))}
        </div>
      </Wrap>
    </div>
  );
}
