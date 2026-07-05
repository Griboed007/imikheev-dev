import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CmdK } from "@/components/shell/CmdK";
import { ToastProvider } from "@/components/shell/ToastProvider";

function renderPalette() {
  return render(
    <ToastProvider>
      <CmdK />
    </ToastProvider>,
  );
}

function openPalette() {
  fireEvent.keyDown(document, { key: "k", metaKey: true });
}

describe("⌘K is keyboard-complete", () => {
  beforeEach(() => {
    window.location.hash = "";
  });

  it("opens on ⌘K and closes on Escape", () => {
    renderPalette();
    expect(screen.queryByRole("dialog")).toBeNull();
    openPalette();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("filters by query then Enter executes the first match and closes", () => {
    renderPalette();
    openPalette();

    const input = screen.getByPlaceholderText("type a command or destination…");
    fireEvent.change(input, { target: { value: "map" } });

    // Only the system-map jump matches "map".
    const items = screen.getAllByRole("button");
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent("jump · system map");

    fireEvent.keyDown(document, { key: "Enter" });

    expect(window.location.hash).toBe("#map");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("copy command writes to the clipboard and shows a toast (the 002 DoD path)", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    renderPalette();
    openPalette();
    const input = screen.getByPlaceholderText("type a command or destination…");
    fireEvent.change(input, { target: { value: "email" } });

    const items = screen.getAllByRole("button");
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent("copy · email");

    fireEvent.keyDown(document, { key: "Enter" });

    expect(writeText).toHaveBeenCalledWith("cj007mikheev@gmail.com");
    // Toast fires after the clipboard promise resolves — await it.
    expect(await screen.findByText(/email copied/)).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("narrows the list as the query changes", () => {
    renderPalette();
    openPalette();
    const input = screen.getByPlaceholderText("type a command or destination…");

    fireEvent.change(input, { target: { value: "open" } });
    const opens = screen.getAllByRole("button");
    expect(opens.length).toBe(8); // the eight external opens

    fireEvent.change(input, { target: { value: "zzz-nothing" } });
    expect(screen.queryAllByRole("button")).toHaveLength(0);
    expect(screen.getByText("no matches")).toBeInTheDocument();
  });
});
