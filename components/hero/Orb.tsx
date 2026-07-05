"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion";
import {
  fibonacciSphere,
  orbits,
  project,
  PARALLAX_LERP,
  ROT_PER_FRAME,
  SCROLL_DELTA_CAP,
  SPIN_DECAY,
  SPIN_PER_SCROLL,
} from "@/lib/canvas/orb";

/**
 * Point-cloud orb (proposal 003). Anchored inside `.hero-inner` (the content column), so
 * `.orb-wrap`'s `right:-56px` hugs the column edge, not the viewport — the 4k Live DoD.
 * Single rAF, IntersectionObserver-paused, dpr≤2, listeners + observer cleaned on unmount
 * (components/CLAUDE.md). Reduced motion draws one static frame and wires nothing else.
 */
export function Orb() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pts = fibonacciSphere();
    const rings = orbits();

    let W = 0;
    let H = 0;
    let R = 0;
    let cx = 0;
    let cy = 0;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(W, H) * 0.37;
      cx = W / 2;
      cy = H / 2;
    };
    size();

    const draw = (
      cA: number,
      sA: number,
      cB: number,
      sB: number,
      anomPhase?: number,
    ) => {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        const q = project(p, cA, sA, cB, sB, R, cx, cy);
        ctx.fillStyle = p.anomaly
          ? `rgba(245,167,66,${0.25 + 0.6 * q.depth})`
          : `rgba(237,230,218,${0.08 + 0.5 * q.depth})`;
        const r = (p.anomaly ? 1.5 : 1.05) * q.scale;
        ctx.fillRect(q.sx - r / 2, q.sy - r / 2, r, r);
      }
      for (const o of rings) {
        for (const p of o) {
          const q = project(p, cA, sA, cB, sB, R, cx, cy);
          ctx.fillStyle = `rgba(245,167,66,${0.1 + 0.38 * q.depth})`;
          ctx.fillRect(q.sx - 0.7, q.sy - 0.7, 1.4, 1.4);
        }
      }
      // One pulsing anomaly point riding the first ring (the "telemetry, not decoration").
      if (anomPhase !== undefined) {
        const o = rings[0];
        const ap = o[Math.floor((anomPhase % (Math.PI * 2)) / 0.045) % o.length];
        if (ap) {
          const q = project(ap, cA, sA, cB, sB, R, cx, cy);
          const pulse = 2.6 + Math.sin(anomPhase * 4) * 1.1;
          ctx.fillStyle = "rgba(245,167,66,.95)";
          ctx.beginPath();
          ctx.arc(q.sx, q.sy, pulse * q.scale, 0, 7);
          ctx.fill();
          ctx.strokeStyle = "rgba(245,167,66,.4)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(q.sx, q.sy, (pulse + 5) * q.scale, 0, 7);
          ctx.stroke();
        }
      }
    };

    // Reduced motion: one static frame, no rAF, no pointer/scroll parallax.
    if (reduced) {
      const a = 0.7;
      const render = () =>
        draw(Math.cos(a), Math.sin(a), Math.cos(0.15), Math.sin(0.15));
      render();
      const onResize = () => {
        size();
        render();
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    let aY = 0;
    let rxT = 0;
    let ryT = 0;
    let rx = 0;
    let ry = 0;
    let anom = 0;
    let spin = 0;
    let running = true;
    let raf = 0;
    let lastY = window.scrollY;

    const onPointerMove = (e: PointerEvent) => {
      rxT = (e.clientY / window.innerHeight - 0.5) * 0.35;
      ryT = (e.clientX / window.innerWidth - 0.5) * 0.4;
    };
    const onScroll = () => {
      const y = window.scrollY;
      spin += Math.min(Math.abs(y - lastY), SCROLL_DELTA_CAP) * SPIN_PER_SCROLL;
      lastY = y;
      // CSS owns the base translate; JS only writes --py + opacity (proposal §Design).
      wrap.style.setProperty("--py", `${y * 0.16}px`);
      wrap.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.85)));
    };
    const onResize = () => size();

    const io = new IntersectionObserver(
      (entries) => {
        running = entries[0].isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll(); // seed --py / opacity

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!running) return; // offscreen: keep scheduling, do no drawing work (Spec Delta)
      aY += ROT_PER_FRAME + spin;
      spin *= SPIN_DECAY;
      rx += (rxT - rx) * PARALLAX_LERP;
      ry += (ryT - ry) * PARALLAX_LERP;
      const cA = Math.cos(aY + ry);
      const sA = Math.sin(aY + ry);
      const cB = Math.cos(rx * 0.6 + 0.15);
      const sB = Math.sin(rx * 0.6 + 0.15);
      anom += 0.012;
      draw(cA, sA, cB, sB, anom);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return (
    <div ref={wrapRef} className="orb-wrap" aria-hidden>
      <div className="orb-glow" />
      <canvas ref={canvasRef} className="orb-canvas" />
    </div>
  );
}
