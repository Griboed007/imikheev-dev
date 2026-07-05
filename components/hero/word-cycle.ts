/**
 * Hero word-cycle state machine — pure and testable. The component
 * (`components/hero/WordCycle.tsx`) drives it with setTimeout; this module holds the
 * decode/erase logic so the sequence can be asserted without timers.
 *
 * tokens.md §motion: "word cycle — decode 34ms/frame, pool ▖▘▝▗▚▞░▒/\_|·, hold 2.3s,
 * erase 40ms/char, pause 340ms". Reduced motion: static "adoption." (the seed state).
 */

export const WORDS = ["adoption.", "interfaces.", "digital twins.", "trust."] as const;
export const GLYPH_POOL = "▖▘▝▗▚▞░▒/\\_|·";

export const DECODE_MS = 34;
export const HOLD_MS = 2300;
export const ERASE_MS = 40;
export const PAUSE_MS = 340;

export type Phase = "decode" | "hold" | "erase" | "pause";

export interface CycleState {
  phase: Phase;
  wordIndex: number;
  /** decode frame counter (unused by other phases). */
  frame: number;
  /** the text currently displayed for this state. */
  text: string;
}

export interface CycleStep {
  /** text to render now. */
  text: string;
  /** how long to show it before applying `next`. */
  delayMs: number;
  next: CycleState;
}

/**
 * Seed state: a settled "adoption." held. This is what the server renders and what a
 * reduced-motion client keeps forever — no render-time branch, no hydration mismatch.
 */
export const INITIAL_STATE: CycleState = {
  phase: "hold",
  wordIndex: 0,
  frame: 0,
  text: WORDS[0],
};

/** Char `i` shows its real glyph once frame ≥ 6 + i*2; spaces are always settled. */
export function isSettled(word: string, frame: number, i: number): boolean {
  if (word[i] === " ") return true;
  return frame >= 6 + i * 2;
}

/** True once every non-space char of `word` has settled at `frame`. */
export function decodeComplete(word: string, frame: number): boolean {
  for (let i = 0; i < word.length; i++) {
    if (!isSettled(word, frame, i)) return false;
  }
  return true;
}

/** Render `word` at `frame`: settled chars are real, the rest are pool glyphs. */
export function decodeText(word: string, frame: number, rng: () => number): string {
  let out = "";
  for (let i = 0; i < word.length; i++) {
    out += isSettled(word, frame, i)
      ? word[i]
      : GLYPH_POOL[(rng() * GLYPH_POOL.length) | 0];
  }
  return out;
}

/**
 * One step of the machine. Given a state (and RNG for scramble), returns the text to
 * display, the delay until the next step, and the next state:
 *   decode (34ms/frame until settled) → hold (2.3s) → erase (40ms/char) → pause (340ms)
 *   → decode of the next word.
 */
export function step(state: CycleState, rng: () => number = Math.random): CycleStep {
  const word = WORDS[state.wordIndex];
  switch (state.phase) {
    case "decode": {
      const frame = state.frame + 1;
      const text = decodeText(word, frame, rng);
      if (decodeComplete(word, frame)) {
        return {
          text,
          delayMs: DECODE_MS,
          next: { phase: "hold", wordIndex: state.wordIndex, frame: 0, text: word },
        };
      }
      return {
        text,
        delayMs: DECODE_MS,
        next: { phase: "decode", wordIndex: state.wordIndex, frame, text },
      };
    }
    case "hold":
      return {
        text: word,
        delayMs: HOLD_MS,
        next: { phase: "erase", wordIndex: state.wordIndex, frame: 0, text: word },
      };
    case "erase": {
      const text = state.text.slice(0, -1);
      const phase: Phase = text.length === 0 ? "pause" : "erase";
      return {
        text,
        delayMs: ERASE_MS,
        next: { phase, wordIndex: state.wordIndex, frame: 0, text },
      };
    }
    case "pause": {
      const wordIndex = (state.wordIndex + 1) % WORDS.length;
      return {
        text: "",
        delayMs: PAUSE_MS,
        next: { phase: "decode", wordIndex, frame: 0, text: "" },
      };
    }
  }
}
