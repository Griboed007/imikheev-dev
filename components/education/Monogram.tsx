"use client";

import { useEffect, useRef } from "react";
import {
  DOT_SIZE,
  inkedFromAlpha,
  monogramFont,
  sampleDots,
} from "@/lib/canvas/monogram";

/**
 * Dot-matrix university monogram (mockup `.edu-dots`). Rasterizes the mark to an offscreen
 * canvas, then stamps a dot everywhere the text inks — so it stays crisp at any width and
 * spans the full 80px strip (proposal §Monograms). Redraws on fonts.ready (the mono face
 * may load after mount) and on resize. Static — no rAF, no motion — so reduced motion is a
 * non-issue; CSS blurs it (2px) and dims it (.45) behind the glyph.
 */
export function Monogram({ mark }: { mark: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const w = canvas.clientWidth || 260;
      const h = canvas.clientHeight || 80;
      canvas.width = w;
      canvas.height = h;

      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const o = off.getContext("2d");
      if (!o) return;
      o.font = monogramFont(h);
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.fillStyle = "#fff";
      o.fillText(mark, w / 2, h / 2 + 2);

      const inked = inkedFromAlpha(o.getImageData(0, 0, w, h).data, w);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(237,230,218,.6)";
      for (const d of sampleDots(w, h, inked)) {
        ctx.fillRect(d.x, d.y, DOT_SIZE, DOT_SIZE);
      }
    };

    draw();
    document.fonts?.ready.then(draw).catch(() => {});
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [mark]);

  return <canvas ref={ref} className="edu-dots" aria-hidden="true" />;
}
