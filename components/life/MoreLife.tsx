"use client";

import { useToast } from "@/components/shell/ToastProvider";

/**
 * `more of ~/life →` — a slot for the future gallery/rides/coffee-log expansion. Toasts the
 * intent for now (mockup `#more-life`), matching the `more-btn` pattern used elsewhere.
 */
export function MoreLife() {
  const { toast } = useToast();
  return (
    <button
      type="button"
      onClick={() => toast("~/life expands with the gallery, rides, and the coffee log")}
      className="more-btn mt-[22px] font-mono text-[12.5px] text-ink-dim transition-colors hover:text-amber"
    >
      more of ~/life →
    </button>
  );
}
