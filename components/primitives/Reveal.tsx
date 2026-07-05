"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion";

/**
 * Scroll reveal: opacity + 14px rise, .6s reveal bezier, IntersectionObserver threshold
 * .12, once (tokens.md §motion).
 *
 * Progressive enhancement + reduced motion: content is visible by default (SSR / no-JS /
 * reduced motion). Only after mount, with motion allowed, does it apply the fade-from
 * state and wait for the element to enter the viewport. Under `prefers-reduced-motion`
 * it renders the final state directly and never observes.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || reduced) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted, reduced]);

  const animating = mounted && !reduced;
  const hidden = animating && !inView;

  return (
    <div
      ref={ref}
      data-shown={!hidden}
      className={[
        className,
        animating
          ? "transition-[opacity,transform] duration-[600ms] ease-reveal"
          : "",
        hidden ? "translate-y-[14px] opacity-0" : "translate-y-0 opacity-100",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
