"use client";

import { useEffect, useState } from "react";

/**
 * Easing constants — single source alongside `design/tokens.md` §motion and the
 * `--ease-reveal` custom property in globals.css. GSAP/CSS consumers import from here.
 */
export const EASE_REVEAL = "cubic-bezier(.16,1,.3,1)";

/**
 * Reduced-motion kill list (tokens.md §motion). Every animated element must honour it.
 * 001 introduces only the reveal; later changes append their loops here as they add them:
 *  - reveals            → render final state instantly (no fade/rise)
 *  - word cycle         → static "adoption."
 *  - orb                → one frame, no rotation/parallax
 *  - trail / bg map     → off
 *  - ticker             → off (no marquee)
 *  - CTA/accent beats   → off
 *  - spark loop         → off
 * The global CSS rule in globals.css enforces the blanket kill; components additionally
 * short-circuit their own logic via useReducedMotion().
 */
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * True when the user prefers reduced motion. Reads matchMedia synchronously on the
 * client (avoids a first-paint flash) and subscribes to changes. Returns false during
 * SSR and until mounted, so callers should treat `false` as "motion allowed / not yet
 * determined" and gate initial animation behind their own mount flag if a flash matters.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia(REDUCED_MOTION_QUERY).matches;
  });

  useEffect(() => {
    if (!window.matchMedia) return;
    const mql = window.matchMedia(REDUCED_MOTION_QUERY);
    const onChange = () => setReduced(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
