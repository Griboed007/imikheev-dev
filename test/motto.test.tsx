import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { links, mailto } from "@/lib/links";
import { Motto } from "@/components/motto";

/**
 * 010 — the closing motto + contact. Spec Delta "Contact works day one": the cv CTA points
 * at the static `/cv.pdf` and the talk CTA opens a mail draft to the configured address.
 * Both CTAs pulse (mockup `.btn-amber` beatfill / `.btn-ghost` beat) and must go still under
 * reduced motion — asserted here via the `motion-reduce:animate-none` contract, since jsdom
 * can't compute the media query (the real freeze is the global CSS net + Track B).
 */
describe("links registry — contact glue (010)", () => {
  it("exposes the cv path and a mailto to the configured address", () => {
    expect(links.cv).toBe("/cv.pdf");
    expect(mailto()).toBe("mailto:ivan.mikheev.biz@gmail.com");
    expect(mailto("hello")).toContain("?subject=hello");
  });

  it("keeps the branded address on file for the eventual forwarding flip", () => {
    expect(links.emailBranded).toBe("hello@imikheev.dev");
  });
});

describe("Motto section (010)", () => {
  it("is the #contact anchor with a ~/motto eyebrow and the amber-period headline", () => {
    const { container } = render(<Motto />);
    const section = container.querySelector("#contact");
    expect(section).not.toBeNull();
    expect(container.textContent).toContain("~/motto");
    expect(container.textContent).toContain("You are the architect of yourself");
    // The period is its own amber span (semantic amber = the accent).
    expect(container.querySelector("h2 .text-amber")?.textContent).toBe(".");
  });

  it("renders the talk CTA as a mailto draft that pulses (beat-fill) and halts when still", () => {
    const { container } = render(<Motto />);
    const talk = container.querySelector<HTMLAnchorElement>('a[href^="mailto:"]');
    expect(talk).not.toBeNull();
    expect(talk!.getAttribute("href")).toBe(mailto());
    expect(talk!.classList.contains("animate-beat-fill")).toBe(true);
    expect(talk!.classList.contains("motion-reduce:animate-none")).toBe(true);
  });

  it("renders the cv CTA as a real /cv.pdf download that pulses (beat) and halts when still", () => {
    const { container } = render(<Motto />);
    const cv = container.querySelector<HTMLAnchorElement>('a[href="/cv.pdf"]');
    expect(cv).not.toBeNull();
    expect(cv!.hasAttribute("download")).toBe(true);
    // exact-token match: "animate-beat" must not be satisfied by "animate-beat-fill"
    expect(cv!.classList.contains("animate-beat")).toBe(true);
    expect(cv!.classList.contains("motion-reduce:animate-none")).toBe(true);
  });
});
