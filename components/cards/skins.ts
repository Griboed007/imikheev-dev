/**
 * Card variant → class token. The brand-skin HEXES (dg-blue, tk-violet) live ONLY in the
 * scoped `.card.dg` / `.card.tk` CSS in globals — this maps a variant to the class that
 * selects that scope, so the skin colors can never leak into the global theme (root
 * CLAUDE.md, review-blocking).
 */
export type CardVariant = "plain" | "dg" | "tk";

export const CARD_SKIN: Record<CardVariant, string> = {
  plain: "",
  dg: "dg",
  tk: "tk",
};

export function cardClass(variant: CardVariant, xtra = false): string {
  return ["card", CARD_SKIN[variant], xtra ? "xtra" : ""].filter(Boolean).join(" ");
}
