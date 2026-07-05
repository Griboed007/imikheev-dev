/**
 * Star-trail pool math — pure, unit-testable. Drawing lives in
 * `components/hero/StarTrail.tsx`; the bounded pool + integration live here.
 *
 * tokens.md §motion: "trail — ≤140 particles, spawn ≥13px move, mouse+touch, tap ripple".
 * Extracted from the mockup's `#trail` sketch.
 */

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** 1 → 0; particle dies at ≤0. */
  life: number;
  /** per-frame life decay. */
  dec: number;
  /** square size in px. */
  r: number;
  /** amber star (~30%) vs warm-paper star. */
  amber: boolean;
}

export interface Ripple {
  x: number;
  y: number;
  r: number;
  life: number;
}

export interface TrailPool {
  particles: Particle[];
  ripples: Ripple[];
}

/** Hard cap on live particles (tokens.md §motion). */
export const TRAIL_CAP = 140;
/** Movement gate: (dx²+dy²) ≥ this spawns. 170 ≈ (13.04px)². */
export const MOVE_THRESHOLD_SQ = 170;
export const SPAWN_PER_MOVE = 2;

export function createPool(): TrailPool {
  return { particles: [], ripples: [] };
}

/** True once the pointer has moved ~13px since the last spawn. */
export function movedEnough(dx: number, dy: number): boolean {
  return dx * dx + dy * dy >= MOVE_THRESHOLD_SQ;
}

/**
 * Spawn SPAWN_PER_MOVE particles near (x,y). Trims the oldest when the pool is over cap,
 * so the array stays bounded no matter how fast the pointer moves. Inject `rng` in tests.
 */
export function spawnParticles(
  pool: TrailPool,
  x: number,
  y: number,
  rng: () => number = Math.random,
): void {
  if (pool.particles.length > TRAIL_CAP) pool.particles.splice(0, SPAWN_PER_MOVE);
  for (let i = 0; i < SPAWN_PER_MOVE; i++) {
    pool.particles.push({
      x: x + (rng() - 0.5) * 8,
      y: y + (rng() - 0.5) * 8,
      vx: (rng() - 0.5) * 0.35,
      vy: (rng() - 0.5) * 0.35 - 0.12,
      life: 1,
      dec: 0.014 + rng() * 0.012,
      r: 0.8 + rng() * 1.5,
      amber: rng() < 0.3,
    });
  }
}

/** Tap/click ripple ring. */
export function spawnRipple(pool: TrailPool, x: number, y: number): void {
  pool.ripples.push({ x, y, r: 3, life: 0.55 });
}

/** Advance particles one frame; cull the dead. */
export function stepParticles(pool: TrailPool): void {
  for (let i = pool.particles.length - 1; i >= 0; i--) {
    const p = pool.particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life -= p.dec;
    if (p.life <= 0) pool.particles.splice(i, 1);
  }
}

/** Advance ripples one frame; cull the dead. */
export function stepRipples(pool: TrailPool): void {
  for (let i = pool.ripples.length - 1; i >= 0; i--) {
    const r = pool.ripples[i];
    r.r += 1.9;
    r.life -= 0.016;
    if (r.life <= 0) pool.ripples.splice(i, 1);
  }
}
