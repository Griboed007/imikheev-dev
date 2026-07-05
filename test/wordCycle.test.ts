import { describe, it, expect } from "vitest";
import {
  WORDS,
  GLYPH_POOL,
  INITIAL_STATE,
  isSettled,
  decodeComplete,
  decodeText,
  step,
  type CycleState,
  type Phase,
} from "@/components/hero/word-cycle";

// Deterministic RNG → always selects GLYPH_POOL[0], so scramble output is assertable.
const ZERO = () => 0;

describe("word-cycle FSM (proposal 003: decode→hold→erase→next)", () => {
  it("seeds on a static 'adoption.' hold — the SSR / reduced-motion state", () => {
    expect(WORDS[0]).toBe("adoption.");
    expect(INITIAL_STATE).toMatchObject({
      phase: "hold",
      wordIndex: 0,
      text: "adoption.",
    });
  });

  it("reveals characters left-to-right (settle rule: frame >= 6 + i*2)", () => {
    expect(isSettled("adoption.", 0, 0)).toBe(false);
    expect(isSettled("adoption.", 6, 0)).toBe(true);
    expect(isSettled("adoption.", 21, 8)).toBe(false); // last char settles at frame 22
    expect(isSettled("adoption.", 22, 8)).toBe(true);
    // spaces are always settled (index 7 of "digital twins.")
    expect(isSettled("digital twins.", 0, 7)).toBe(true);
  });

  it("scrambles unsettled chars from the pool and locks in settled ones", () => {
    expect(decodeText("trust.", 1, ZERO)).toBe(GLYPH_POOL[0].repeat("trust.".length));
    expect(decodeText("trust.", 999, ZERO)).toBe("trust.");
    expect(decodeComplete("trust.", 999)).toBe(true);
    expect(decodeComplete("trust.", 0)).toBe(false);
  });

  it("runs decode → hold → erase → pause → next word, in that order", () => {
    let s: CycleState = { phase: "decode", wordIndex: 0, frame: 0, text: "" };
    const phases: Phase[] = [];
    for (let n = 0; n < 500; n++) {
      const r = step(s, ZERO);
      phases.push(s.phase);
      s = r.next;
      if (s.phase === "decode" && s.wordIndex === 1) break;
    }
    const firstHold = phases.indexOf("hold");
    const firstErase = phases.indexOf("erase");
    const firstPause = phases.indexOf("pause");
    expect(phases[0]).toBe("decode");
    expect(firstHold).toBeGreaterThan(0);
    expect(firstErase).toBeGreaterThan(firstHold);
    expect(firstPause).toBeGreaterThan(firstErase);
    expect(s.wordIndex).toBe(1);
    expect(WORDS[s.wordIndex]).toBe("interfaces.");
  });

  it("wraps from the last word back to the first", () => {
    const last = WORDS.length - 1;
    const r = step({ phase: "pause", wordIndex: last, frame: 0, text: "" }, ZERO);
    expect(r.next.phase).toBe("decode");
    expect(r.next.wordIndex).toBe(0);
  });
});
