/**
 * Scroll to a same-page section by id and reflect it in the URL hash. Graceful when the
 * target doesn't exist yet (sections land across changes 003–010) — it just sets the
 * hash. Client-only; no-op during SSR.
 */
export function jumpTo(id: string): void {
  if (typeof document === "undefined") return;
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  history.replaceState(null, "", `#${id}`);
}
