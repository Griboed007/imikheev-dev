"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";
import {
  createPool,
  movedEnough,
  spawnParticles,
  spawnRipple,
  stepParticles,
  stepRipples,
} from "@/lib/canvas/trail";

/**
 * Full-page star trail (proposal 003). Pointer events cover mouse AND touch, so a finger
 * drag leaves stars; pointerdown drops a ripple ring. Input-agnostic and capped
 * (lib/canvas/trail). Never mounts under reduced motion — hence the mounted-gate, which
 * also keeps SSR and the first client render as `null` (no hydration mismatch).
 */
export function StarTrail() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pool = createPool();
    let W = 0;
    let H = 0;
    let lx = -99;
    let ly = -99;
    let raf = 0;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();

    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - lx;
      const dy = e.clientY - ly;
      if (!movedEnough(dx, dy)) return;
      lx = e.clientX;
      ly = e.clientY;
      spawnParticles(pool, e.clientX, e.clientY);
    };
    const onDown = (e: PointerEvent) => spawnRipple(pool, e.clientX, e.clientY);
    const onResize = () => size();

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("resize", onResize);

    const frame = () => {
      raf = requestAnimationFrame(frame);
      ctx.clearRect(0, 0, W, H);
      for (const p of pool.particles) {
        ctx.fillStyle = p.amber
          ? `rgba(245,167,66,${p.life * 0.8})`
          : `rgba(237,230,218,${p.life * 0.6})`;
        ctx.fillRect(p.x - p.r / 2, p.y - p.r / 2, p.r, p.r);
      }
      stepParticles(pool);
      for (const r of pool.ripples) {
        ctx.strokeStyle = `rgba(245,167,66,${r.life * 0.7})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, 7);
        ctx.stroke();
      }
      stepRipples(pool);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", onResize);
    };
  }, [mounted, reduced]);

  if (!mounted || reduced) return null;

  return <canvas ref={canvasRef} className="star-trail" aria-hidden />;
}
