"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion";

/**
 * The Claude spark — clay, and the ONLY sanctioned use of clay (root CLAUDE.md). Animates in
 * three separated layers so nothing clobbers anything (the v0.7 lesson): the outer <svg> is
 * what GSAP spins; each ray's rotation is a STATIC attribute on its wrapper <g>; the breathing
 * is a CSS scale on the inner <rect class="sray">. Because they never share an element, GSAP's
 * transform on the svg leaves both the per-ray rotation and the CSS pulse intact.
 *
 * Layered fallback (008 Spec Delta): the CSS breathing is unconditional — it runs with no JS
 * at all. GSAP is additive-only and lazy (dynamic import, ~60KB only where the spark mounts);
 * if it fails to load, rays still breathe and nothing errors. Reduced motion short-circuits
 * the effect before the import, and the global CSS net freezes `.sray` — so the spark is fully
 * static. The 8 staggered delays match the mockup.
 */
const RAYS = [
  { deg: 0, delay: "0s" },
  { deg: 45, delay: ".35s" },
  { deg: 90, delay: ".7s" },
  { deg: 135, delay: ".15s" },
  { deg: 180, delay: ".55s" },
  { deg: 225, delay: ".9s" },
  { deg: 270, delay: ".25s" },
  { deg: 315, delay: ".45s" },
];

export function Spark() {
  const ref = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    let killed = false;
    let tween: { kill: () => void } | undefined;
    // Lazy + guarded: absence or any load error leaves CSS breathing untouched (Scenario 1).
    import("gsap")
      .then(({ gsap }) => {
        if (killed || !ref.current) return;
        tween = gsap.to(ref.current, {
          rotation: "+=360",
          transformOrigin: "50% 50%",
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          repeatDelay: 6.5,
          delay: 2,
        });
      })
      .catch(() => {});
    return () => {
      killed = true;
      tween?.kill();
    };
  }, [reduced]);

  return (
    <svg
      ref={ref}
      className="mascot"
      id="spark"
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <g fill="var(--clay)">
        {RAYS.map((r) => (
          <g
            key={r.deg}
            transform={r.deg ? `rotate(${r.deg} 32 32)` : undefined}
          >
            <rect
              className="sray"
              x="28.6"
              y="2"
              width="6.8"
              height="27"
              rx="3.4"
              style={{ animationDelay: r.delay }}
            />
          </g>
        ))}
        <circle cx="32" cy="32" r="5.5" />
      </g>
    </svg>
  );
}
