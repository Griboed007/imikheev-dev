import { describe, it, expect } from "vitest";
import { cardClass, CARD_SKIN } from "@/components/cards/skins";

/**
 * Proposal task: "card variant class mapping". The brand-skin HEXES live only in scoped
 * CSS (globals `.card.dg` / `.card.tk`); this function only emits the class token that
 * selects them, so the skin colors can never leak into other components.
 */
describe("card variant class mapping", () => {
  it("maps each variant to its scoped skin class", () => {
    expect(cardClass("plain")).toBe("card");
    expect(cardClass("dg")).toBe("card dg");
    expect(cardClass("tk")).toBe("card tk");
  });

  it("marks extra (show-all) cards with the xtra class", () => {
    expect(cardClass("plain", true)).toBe("card xtra");
  });

  it("only deckgen and tracker carry a brand skin", () => {
    expect(CARD_SKIN.dg).toContain("dg");
    expect(CARD_SKIN.tk).toContain("tk");
    expect(CARD_SKIN.plain).toBe("");
  });
});
