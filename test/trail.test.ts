import { describe, it, expect } from "vitest";
import {
  createPool,
  movedEnough,
  spawnParticles,
  spawnRipple,
  stepParticles,
  stepRipples,
  TRAIL_CAP,
  MOVE_THRESHOLD_SQ,
  SPAWN_PER_MOVE,
} from "@/lib/canvas/trail";

describe("star-trail pool (proposal 003)", () => {
  it("spawns only after ~13px of pointer movement", () => {
    expect(Math.sqrt(MOVE_THRESHOLD_SQ)).toBeGreaterThan(12);
    expect(Math.sqrt(MOVE_THRESHOLD_SQ)).toBeLessThan(14);
    expect(movedEnough(9, 9)).toBe(false); // 162 < 170
    expect(movedEnough(10, 10)).toBe(true); // 200 >= 170
  });

  it("keeps the particle pool bounded no matter how fast the pointer moves", () => {
    const pool = createPool();
    for (let i = 0; i < 1000; i++) spawnParticles(pool, i, i, () => 0.5);
    expect(pool.particles.length).toBeLessThanOrEqual(TRAIL_CAP + SPAWN_PER_MOVE);
    expect(pool.particles.length).toBeGreaterThan(0);
  });

  it("integrates and culls dead particles", () => {
    const pool = createPool();
    spawnParticles(pool, 0, 0, () => 0.5);
    expect(pool.particles).toHaveLength(SPAWN_PER_MOVE);
    for (const p of pool.particles) {
      p.life = 0.01;
      p.dec = 0.02;
    }
    stepParticles(pool);
    expect(pool.particles).toHaveLength(0);
  });

  it("ripples grow then expire", () => {
    const pool = createPool();
    spawnRipple(pool, 5, 5);
    expect(pool.ripples).toHaveLength(1);
    const r0 = pool.ripples[0].r;
    stepRipples(pool);
    expect(pool.ripples[0]?.r).toBeGreaterThan(r0);
    for (let i = 0; i < 100; i++) stepRipples(pool);
    expect(pool.ripples).toHaveLength(0);
  });
});
