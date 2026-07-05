import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import {
  parseCoffee,
  parseRide,
  parseFieldNotes,
  parseShelf,
  parseStatus,
  parsePhotos,
  getCoffee,
  getRide,
  getFieldNotes,
  getShelf,
  getStatus,
  getFocus,
  getPhotos,
  getTicker,
} from "@/lib/telemetry";
import { LifeSection } from "@/components/life/LifeSection";
import { IgShuffle } from "@/components/life/IgShuffle";
import { ToastProvider } from "@/components/shell/ToastProvider";

/**
 * 009 — the life section over git-versioned telemetry. Two invariants the proposal's
 * Spec Delta pins: (1) every telemetry file is zod-validated so a malformed edit fails
 * the build (the integrity gate), and (2) editing a source file (coffee.json) changes
 * BOTH the tile and the ticker with no code edit — so the ticker must DERIVE those lines
 * from the source, never duplicate the value as a hardcoded string.
 */
describe("life telemetry — schema round-trips (the five files)", () => {
  it("loads and validates every telemetry file", () => {
    expect(getCoffee().bean.length).toBeGreaterThan(0);
    expect(getRide().shortName.length).toBeGreaterThan(0);
    expect(getFieldNotes().title.length).toBeGreaterThan(0);
    expect(getShelf().books.length).toBeGreaterThan(0);
    expect(getStatus().focus.length).toBeGreaterThan(0);
    expect(getPhotos().frames.length).toBeGreaterThan(0);
  });

  it("seeds the current real content", () => {
    expect(getCoffee().bean).toBe("sweet peach");
    expect(getRide().shortName).toBe("grand canyon 8");
    expect(getShelf().books.map((b) => b.title)).toContain("The Lean Startup");
    expect(getFocus()).toBe("agentic-platforms");
  });
});

describe("life telemetry — the build integrity gate", () => {
  it("rejects a fixture with a missing field", () => {
    expect(() => parseCoffee({ bean: "x" })).toThrow(); // missing name/roaster/notes
    expect(() => parseRide({ bike: "x" })).toThrow();
    expect(() => parseFieldNotes({ title: "x" })).toThrow();
    expect(() => parseShelf({ books: [{ title: "x" }] })).toThrow(); // missing note/glyph
    expect(() => parseStatus({ ticker: [] })).toThrow(); // missing focus
  });

  it("rejects an empty string (min(1)) and an unknown glyph", () => {
    expect(() =>
      parseCoffee({ name: "", bean: "b", roaster: "r", notes: "n" }),
    ).toThrow();
    expect(() =>
      parseShelf({ books: [{ title: "t", note: "n", glyph: "nope" }] }),
    ).toThrow();
  });

  it("rejects a manifest frame missing its exif", () => {
    expect(() => parsePhotos({ frames: [{ bg: "#000" }] })).toThrow();
  });
});

describe("life telemetry — editing is a commit (derived ticker)", () => {
  it("derives the coffee and ride ticker lines from their source files", () => {
    const ticker = getTicker();
    const flat = ticker.map((i) => i.segments.map((s) => s.text).join(""));
    // The coffee bean/roaster and ride model appear because they are DERIVED, not
    // hardcoded — the essence of the "coffee update" scenario.
    expect(flat).toContain(`in the grinder ${getCoffee().bean} · ${getCoffee().roaster}`);
    expect(flat).toContain(`cross-country on the ${getRide().shortName}`);
  });

  it("marks the derived source values as strong (amber = live/now)", () => {
    const ticker = getTicker();
    const strongTexts = ticker.flatMap((i) =>
      i.segments.filter((s) => s.strong).map((s) => s.text),
    );
    expect(strongTexts).toContain(getCoffee().bean);
    expect(strongTexts).toContain(getRide().shortName);
  });

  it("keeps the static extras (thread-mesh) so both ticker variants stay populated", () => {
    const flat = getTicker()
      .map((i) => i.segments.map((s) => s.text).join(""))
      .join(" | ");
    expect(flat).toContain("thread-mesh 7 nodes nominal");
  });
});

describe("life section — render", () => {
  it("renders the tiles and the shelf from telemetry", () => {
    const { container } = render(
      <ToastProvider>
        <LifeSection />
      </ToastProvider>,
    );
    const text = container.textContent ?? "";
    expect(container.querySelector("#life")).not.toBeNull();
    expect(text).toContain(getCoffee().name);
    expect(text).toContain(getRide().bike);
    expect(text).toContain(getFieldNotes().title);
    for (const b of getShelf().books) expect(text).toContain(b.title);
  });

  it("IgShuffle renders one frame per manifest entry and the lead frame's exif", () => {
    const frames = getPhotos().frames;
    const { container } = render(<IgShuffle frames={frames} />);
    expect(container.querySelectorAll(".fr").length).toBe(frames.length);
    expect(container.querySelector(".exif")?.textContent).toBe(frames[0].exif);
  });

  it("IgShuffle mounts under reduced motion without starting the shuffle interval", () => {
    const spy = vi.spyOn(window, "setInterval");
    const mm = window.matchMedia;
    window.matchMedia = ((q: string) => ({
      matches: true,
      media: q,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      onchange: null,
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
    try {
      const { container } = render(<IgShuffle frames={getPhotos().frames} />);
      expect(container.querySelectorAll(".fr.show").length).toBe(1);
      expect(spy).not.toHaveBeenCalled();
    } finally {
      window.matchMedia = mm;
      spy.mockRestore();
    }
  });
});
