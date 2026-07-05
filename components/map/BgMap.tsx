"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion";
import { edges, nodes } from "@/lib/graph";
import { BG_ROT_PER_FRAME, bgMapProject, type BgProjection } from "@/lib/canvas/map";

/**
 * Background twin (proposal 004): the same graph, full-viewport, blurred, at z-0 behind
 * everything (content is z-1). Presence-gated on `#map` via IntersectionObserver — when
 * the map is far off-screen the canvas is transparent AND draws no frames. Blurred, so it
 * renders at dpr 1 (the blur discards subpixel detail anyway). One frame under reduced
 * motion; the `.on` fade still gates presence.
 */
export function BgMap() {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let angle = 0;
    let on = false;
    let raf = 0;

    const size = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    size();

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const P = new Map<string, BgProjection>();
      for (const n of nodes) P.set(n.id, bgMapProject(n, angle, W, H));
      ctx.lineWidth = 1;
      for (const e of edges) {
        const a = P.get(e.a)!;
        const b = P.get(e.b)!;
        ctx.strokeStyle = `rgba(237,230,218,${0.05 + 0.06 * (((a.scale + b.scale) / 2 - 0.8) * 5)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      for (const n of nodes) {
        const q = P.get(n.id)!;
        const r = (q.sys ? 4.5 : 3) * q.scale;
        ctx.fillStyle = q.sys
          ? `rgba(245,167,66,${0.3 + 0.3 * ((q.scale - 0.8) * 5)})`
          : `rgba(237,230,218,${0.18 + 0.2 * ((q.scale - 0.8) * 5)})`;
        ctx.beginPath();
        ctx.arc(q.x, q.y, Math.max(1, r), 0, 7);
        ctx.fill();
      }
    };

    const target = document.querySelector("#map");
    const io = target
      ? new IntersectionObserver(
          (entries) => {
            on = entries[0].isIntersecting;
            canvas.classList.toggle("on", on);
          },
          { rootMargin: "20% 0px 20% 0px" },
        )
      : null;
    io?.observe(target!);

    const onResize = () => {
      size();
      if (reduced) draw();
    };
    window.addEventListener("resize", onResize);

    if (reduced) {
      angle = 0.6;
      draw();
      return () => {
        io?.disconnect();
        window.removeEventListener("resize", onResize);
      };
    }

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!on) return; // away from #map: no frames drawn (Spec Delta)
      angle += BG_ROT_PER_FRAME;
      draw();
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="bgmap" aria-hidden />;
}
