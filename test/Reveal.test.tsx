import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "@/components/primitives/Reveal";

function setReducedMotion(reduced: boolean): void {
  window.matchMedia = ((query: string) => ({
    matches: reduced && query.includes("reduce"),
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;
}

describe("motion respects user preference", () => {
  it("renders children immediately under reduced motion with no animation", () => {
    setReducedMotion(true);
    render(<Reveal>disclosure</Reveal>);

    const el = screen.getByText("disclosure");
    expect(el).toBeVisible();
    // No fade-from state and no transition when motion is reduced.
    expect(el.className).not.toContain("opacity-0");
    expect(el.className).not.toContain("transition");
  });

  it("starts hidden and transitions when motion is allowed", () => {
    setReducedMotion(false);
    render(<Reveal>disclosure</Reveal>);

    const el = screen.getByText("disclosure");
    // Once mounted with motion allowed, it applies the reveal transition.
    expect(el.className).toContain("transition");
  });
});
