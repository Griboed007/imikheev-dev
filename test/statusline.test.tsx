import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Spark } from "@/components/spark";
import { CopyChip } from "@/components/statusline-showcase/CopyChip";
import { ToastProvider } from "@/components/shell/ToastProvider";

/**
 * 008 Spec Delta — "the spark animates in layers". The rays breathe via CSS unconditionally;
 * GSAP is additive-only. These prove the two scenarios headlessly: (1) the layered structure
 * exists so rays breathe with no GSAP, and mounting tolerates GSAP's absence with no error;
 * and the copy seam writes the EXACT install command. The live spin/breathing is Track B.
 */
describe("the Claude spark animates in layers", () => {
  it("renders 8 breathing rays and the core — synchronously, independent of GSAP", () => {
    const { container } = render(<Spark />);
    // rays carry .sray (the CSS raypulse target); the core is the single <circle>.
    expect(container.querySelectorAll(".sray")).toHaveLength(8);
    expect(container.querySelectorAll("circle")).toHaveLength(1);
  });

  it("mounts and unmounts without error when GSAP rejects (no-GSAP scenario)", async () => {
    vi.resetModules();
    vi.doMock("gsap", () => {
      throw new Error("gsap unavailable");
    });
    const { Spark: FreshSpark } = await import("@/components/spark");
    const { container, unmount } = render(<FreshSpark />);
    // rays are present regardless — breathing is pure CSS.
    expect(container.querySelectorAll(".sray")).toHaveLength(8);
    // let the rejected dynamic import settle; the .catch guard must swallow it.
    await Promise.resolve();
    expect(() => unmount()).not.toThrow();
    vi.doUnmock("gsap");
    vi.resetModules();
  });
});

describe("the ccstatusline copy chip", () => {
  beforeEach(() => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
  });

  it("writes the exact install command and toasts on success", async () => {
    render(
      <ToastProvider>
        <CopyChip />
      </ToastProvider>,
    );
    const chip = screen.getByRole("button", { name: /ccstatusline/i });
    fireEvent.click(chip);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "npx ccstatusline@latest",
    );
    expect(await screen.findByText(/run it in your terminal/i)).toBeInTheDocument();
  });
});
