"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/motion";
import { INITIAL_STATE, WORDS, step, type CycleState } from "./word-cycle";

/**
 * H1 line 2: cycles adoption. → interfaces. → digital twins. → trust. with a decode-in,
 * a hold, then a caret-erase. The server and a reduced-motion client both render a settled
 * "adoption." (the FSM's seed state) — so there is no hydration flash and reduced motion
 * needs no render-time branch, just a short-circuited effect.
 */
export function WordCycle() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [text, setText] = useState<string>(WORDS[0]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || reduced) return;
    let state: CycleState = INITIAL_STATE;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const frame = step(state, Math.random);
      setText(frame.text);
      state = frame.next;
      timer = setTimeout(tick, frame.delayMs);
    };
    tick();
    return () => clearTimeout(timer);
  }, [mounted, reduced]);

  return (
    <>
      <span className="animate-glow text-amber [text-shadow:0_0_16px_rgba(245,167,66,.35)] motion-reduce:animate-none">
        {text}
      </span>
      <span
        aria-hidden
        className="ml-[.1em] inline-block h-[.95em] w-[.5em] animate-blink bg-amber align-[-.1em] motion-reduce:animate-none"
      />
    </>
  );
}
