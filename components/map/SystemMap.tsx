"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";
import { adjacency, edges, nodes } from "@/lib/graph";
import {
  DRIFT_AMP,
  SMALL_YAW_AMP,
  SMALL_YAW_FREQ,
  smallMapProject,
  type SmallProjection,
} from "@/lib/canvas/map";

const adj = adjacency();

/** Static seed layout (yaw 0.18, no drift) — deterministic, so SSR and reduced motion
 * render a laid-out graph rather than a collapsed origin, with no hydration mismatch. */
const SEED = new Map<string, SmallProjection>(
  nodes.map((n) => [n.id, smallMapProject(n, 0.18)]),
);
const seedTransform = (id: string) => {
  const p = SEED.get(id)!;
  return `translate(${p.px},${p.py}) scale(${p.scale})`;
};

/** Depth opacity multiplied by the hover/select state (mockup order: dim first). */
function stateOpacity(
  base: number,
  id: string,
  focus: string | null,
  selected: string | null,
): number {
  const hot = !!focus && (id === focus || adj.get(focus)!.has(id));
  const dim = !!focus && !hot;
  if (dim) return base * 0.3;
  if (hot || id === selected) return 1;
  return base;
}

export function SystemMap({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const reduced = useReducedMotion();
  // Focus (hover/keyboard trace) is purely visual and local to the map.
  const [focusId, setFocusId] = useState<string | null>(null);
  const gRefs = useRef(new Map<string, SVGGElement | null>());
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);

  // Refs mirror state so the rAF closure always reads the live focus/selection.
  const focusRef = useRef<string | null>(null);
  const selRef = useRef<string | null>(null);
  focusRef.current = focusId;
  selRef.current = selectedId;

  useEffect(() => {
    if (reduced) return; // static SVG scales via viewBox; no rAF, no resize work
    const phases = nodes.map((_, i) => (i * 2.399963229) % (Math.PI * 2));
    let raf = 0;

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      const yaw = Math.sin(t * SMALL_YAW_FREQ) * SMALL_YAW_AMP;
      const focus = focusRef.current;
      const sel = selRef.current;
      const proj = new Map<string, SmallProjection>();
      nodes.forEach((n, i) => {
        const ox = Math.sin(t / 1600 + phases[i]) * DRIFT_AMP;
        const oy = Math.cos(t / 1900 + phases[i] * 1.3) * DRIFT_AMP;
        const p = smallMapProject(n, yaw, ox, oy);
        proj.set(n.id, p);
        const g = gRefs.current.get(n.id);
        if (!g) return;
        g.setAttribute("transform", `translate(${p.px},${p.py}) scale(${p.scale})`);
        g.style.opacity = String(stateOpacity(p.opacity, n.id, focus, sel));
      });
      edges.forEach((e, i) => {
        const a = proj.get(e.a)!;
        const b = proj.get(e.b)!;
        const l = lineRefs.current[i];
        if (!l) return;
        l.setAttribute("x1", String(a.px));
        l.setAttribute("y1", String(a.py));
        l.setAttribute("x2", String(b.px));
        l.setAttribute("y2", String(b.py));
      });
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  // Reduced motion: no rAF, so repaint node opacity imperatively whenever the
  // hover/selection state changes (the static seed transform stays from the JSX attr).
  useEffect(() => {
    if (!reduced) return;
    for (const n of nodes) {
      const g = gRefs.current.get(n.id);
      if (g) {
        g.style.opacity = String(
          stateOpacity(SEED.get(n.id)!.opacity, n.id, focusId, selectedId),
        );
      }
    }
  }, [reduced, focusId, selectedId]);

  const nodeClass = (id: string, kind: string) => {
    const hot = !!focusId && (id === focusId || adj.get(focusId)!.has(id));
    const dim = !!focusId && !hot;
    return [
      "node",
      kind,
      hot ? "hot" : "",
      dim ? "dim" : "",
      id === selectedId ? "sel" : "",
    ]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <svg
      className={`system-graph ${focusId ? "focus" : ""}`.trim()}
      viewBox="0 0 960 470"
      role="img"
      aria-label="Interactive graph of projects and domains"
    >
      {edges.map((e, i) => {
        const a = SEED.get(e.a)!;
        const b = SEED.get(e.b)!;
        const hot = !!focusId && (e.a === focusId || e.b === focusId);
        return (
          <line
            key={`${e.a}-${e.b}`}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            className={`edge ${hot ? "hot" : ""}`.trim()}
            x1={a.px}
            y1={a.py}
            x2={b.px}
            y2={b.py}
          />
        );
      })}
      {nodes.map((n) => (
        <g
          key={n.id}
          ref={(el) => {
            gRefs.current.set(n.id, el);
          }}
          className={nodeClass(n.id, n.kind)}
          // Constant string across renders → React never rewrites it, so the rAF's
          // imperative transform survives re-renders (and SSR gets a laid-out map).
          transform={seedTransform(n.id)}
          tabIndex={0}
          role="button"
          aria-label={n.label}
          onMouseEnter={() => setFocusId(n.id)}
          onMouseLeave={() => setFocusId(null)}
          onFocus={() => setFocusId(n.id)}
          onBlur={() => setFocusId(null)}
          onClick={() => onSelect(n.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(n.id);
            }
          }}
        >
          {n.kind === "sys" ? (
            <circle
              className="core"
              r={7}
              fill="var(--panel2)"
              stroke="var(--amber)"
              strokeWidth={1.4}
            />
          ) : (
            <circle className="core" r={5} fill="var(--line-strong)" />
          )}
          {n.live ? <circle r={2.6} cx={8} cy={-8} fill="var(--amber)" /> : null}
          <text y={22} textAnchor="middle">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
