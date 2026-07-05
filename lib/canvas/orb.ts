/**
 * Point-cloud orb math — pure, unit-testable functions extracted from the mockup's
 * `#orb` sketch (design/reference/portfolio-mockup-v0.8.html). The drawing lives in
 * `components/hero/Orb.tsx`; the geometry lives here so it can be tested without a canvas.
 *
 * tokens.md §motion: "orb — 1700 pts, rot .0022/f + scroll spin (decay ×.9),
 * parallax lerp .05, dpr≤2, IO-paused".
 */

export interface Point3 {
  x: number;
  y: number;
  z: number;
  /** anomaly points render amber and larger (~5.5% of the cloud). */
  anomaly: boolean;
}

export interface Projected {
  /** screen x/y after perspective. */
  sx: number;
  sy: number;
  /** perspective scale (near > far). */
  scale: number;
  /** normalized depth in [0,1] — 0 = far side, 1 = near side. Drives alpha/size. */
  depth: number;
}

export const ORB_POINTS = 1700;
export const ORBIT_STEP = 0.045;
export const ROT_PER_FRAME = 0.0022;
export const SPIN_DECAY = 0.9;
export const PARALLAX_LERP = 0.05;
export const PERSPECTIVE = 2.3;
export const ANOMALY_RATE = 0.055;
/** scroll delta → spin, clamped per event (mockup: min(|dy|,60)*0.00006). */
export const SPIN_PER_SCROLL = 0.00006;
export const SCROLL_DELTA_CAP = 60;

const GOLDEN_ANGLE = 2.399963229;

/**
 * Fibonacci sphere: N points spread evenly over a unit sphere. Anomaly flag is decided
 * by `rng() < ANOMALY_RATE` — inject a deterministic RNG in tests.
 */
export function fibonacciSphere(
  n: number = ORB_POINTS,
  rng: () => number = Math.random,
): Point3[] {
  const pts: Point3[] = [];
  for (let i = 0; i < n; i++) {
    const y = 1 - (2 * (i + 0.5)) / n;
    const r = Math.sqrt(1 - y * y);
    const th = i * GOLDEN_ANGLE;
    pts.push({
      x: Math.cos(th) * r,
      y,
      z: Math.sin(th) * r,
      anomaly: rng() < ANOMALY_RATE,
    });
  }
  return pts;
}

/** One orbit ring: a unit circle tilted by `tilt` and rotated by `rot`. */
export function ring(tilt: number, rot: number, step: number = ORBIT_STEP): Point3[] {
  const arr: Point3[] = [];
  const u = { x: Math.cos(rot), y: 0, z: Math.sin(rot) };
  const v = {
    x: -Math.sin(rot) * Math.sin(tilt),
    y: Math.cos(tilt),
    z: Math.cos(rot) * Math.sin(tilt),
  };
  for (let t = 0; t < Math.PI * 2; t += step) {
    arr.push({
      x: u.x * Math.cos(t) + v.x * Math.sin(t),
      y: u.y * Math.cos(t) + v.y * Math.sin(t),
      z: u.z * Math.cos(t) + v.z * Math.sin(t),
      anomaly: false,
    });
  }
  return arr;
}

/** The two orbit rings the mockup pushes: ring(.55,.3) and ring(1.15,1.9). */
export function orbits(): Point3[][] {
  return [ring(0.55, 0.3), ring(1.15, 1.9)];
}

/**
 * Perspective projection. (cA,sA) = cos/sin of the Y-spin angle; (cB,sB) = the X-tilt
 * angle. `radius` is the sphere radius in px; (cx,cy) the canvas center. Depth is
 * remapped from the rotated z (∈[-1,1]) to [0,1].
 */
export function project(
  p: Point3,
  cA: number,
  sA: number,
  cB: number,
  sB: number,
  radius: number,
  cx: number,
  cy: number,
): Projected {
  const x = p.x * cA + p.z * sA;
  const z = -p.x * sA + p.z * cA;
  const y = p.y;
  const y2 = y * cB - z * sB;
  const z2 = y * sB + z * cB;
  const scale = PERSPECTIVE / (PERSPECTIVE + z2);
  return {
    sx: cx + x * radius * scale,
    sy: cy + y2 * radius * scale,
    scale,
    depth: (z2 + 1) / 2,
  };
}
