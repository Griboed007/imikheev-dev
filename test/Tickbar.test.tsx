import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Tickbar } from "@/components/shell/Tickbar";
import { Statusline } from "@/components/shell/Statusline";
import { ToastProvider } from "@/components/shell/ToastProvider";
import { getTicker } from "@/lib/telemetry";

const items = getTicker();

/**
 * jsdom can't compute CSS media-query visibility, so the real viewport check is Track B
 * (iPhone width). Here we assert the responsive-class contract and that both ticker
 * instances render populated from the loader.
 */
describe("ticker placement is viewport-dependent", () => {
  it("mobile Tickbar is visible by default and hidden ≥761px, and carries content", () => {
    const { container } = render(<Tickbar items={items} />);
    const bar = container.firstElementChild as HTMLElement;
    expect(bar.className).toContain("block");
    expect(bar.className).toContain("min-[761px]:hidden");
    // Content-doubled marquee: 2 × 11 items.
    expect(bar.textContent).toContain("thread-mesh 7 nodes nominal");
  });

  it("inline statusline ticker is hidden on mobile and shown ≥761px", () => {
    const { container } = render(
      <ToastProvider>
        <Statusline ticker={items} />
      </ToastProvider>,
    );
    const inline = container.querySelector(".min-\\[761px\\]\\:block");
    expect(inline).not.toBeNull();
    expect(inline!.className).toContain("hidden");
    expect(inline!.textContent).toContain("thread-mesh 7 nodes nominal");
  });
});
