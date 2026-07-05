/**
 * System-map projection math — pure, unit-testable (lib/CLAUDE.md: canvas/ holds bgmap
 * math). Both renderers project the same `lib/graph` coordinates: the small SVG map with
 * a gentle yaw oscillation, and the full-viewport blurred background twin.
 *
 * tokens.md §motion: "small map — yaw sin(t·.00022)·0.3, depth scale/opacity .35–1,
 * drift amp 4" · "bg map — full rotation .0016/f, blur 5px, opacity .34".
 */
import type { GraphNode } from "@/lib/graph";

// --- small SVG map (viewBox 960×470, center 480,235) ---
export const SMALL_CX = 480;
export const SMALL_CY = 235;
export const SMALL_FOCAL = 760;
export const SMALL_Z_SCALE = 1.3;
export const SMALL_YAW_AMP = 0.3;
export const SMALL_YAW_FREQ = 0.00022;
export const DRIFT_AMP = 4;

export interface SmallProjection {
  px: number;
  py: number;
  scale: number;
  /** depth opacity in [0.35, 1] before any hover dim/hot multiplier. */
  opacity: number;
}

/** Depth → base opacity, clamped to [0.35, 1] (mockup layout()). */
export function depthOpacity(scale: number): number {
  return Math.max(0.35, Math.min(1, 0.45 + 0.55 * ((scale - 0.86) / 0.32)));
}

/**
 * Project one node into small-map screen space at yaw `yaw`, with optional drift offset
 * (ox,oy). Returns transform (px,py,scale) and the base depth opacity.
 */
export function smallMapProject(
  node: GraphNode,
  yaw: number,
  ox = 0,
  oy = 0,
): SmallProjection {
  const cY = Math.cos(yaw);
  const sY = Math.sin(yaw);
  const X = node.x - SMALL_CX;
  const Z = node.z * SMALL_Z_SCALE;
  const xr = X * cY + Z * sY;
  const zr = -X * sY + Z * cY;
  const scale = SMALL_FOCAL / (SMALL_FOCAL + zr);
  return {
    px: SMALL_CX + xr * scale + ox,
    py: SMALL_CY + (node.y - SMALL_CY) * scale + oy,
    scale,
    opacity: depthOpacity(scale),
  };
}

// --- full-viewport background twin ---
export const BG_FOCAL = 1400;
export const BG_Z_SCALE = 2.2;
export const BG_ROT_PER_FRAME = 0.0016;
export const BG_BASE = 620;

export interface BgProjection {
  x: number;
  y: number;
  scale: number;
  sys: boolean;
}

/** Project one node into the blurred background twin, sized to the (W,H) viewport. */
export function bgMapProject(
  node: GraphNode,
  angle: number,
  W: number,
  H: number,
): BgProjection {
  const S = Math.max(W, H) / BG_BASE;
  const cxp = W / 2;
  const cyp = H / 2;
  const cY = Math.cos(angle);
  const sY = Math.sin(angle);
  const X = (node.x - SMALL_CX) * S;
  const Y = (node.y - SMALL_CY) * S;
  const Z = node.z * BG_Z_SCALE * S;
  const xr = X * cY + Z * sY;
  const zr = -X * sY + Z * cY;
  const scale = BG_FOCAL / (BG_FOCAL + zr);
  return {
    x: cxp + xr * scale,
    y: cyp + Y * scale,
    scale,
    sys: node.kind === "sys",
  };
}
