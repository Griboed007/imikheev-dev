"use client";

import { copy } from "@/lib/links";
import { useToast } from "@/components/shell/ToastProvider";

/**
 * The `npx ccstatusline@latest ⧉` copy chip (mockup `.copychip`). Writes the exact install
 * command — the same string the ⌘K `copy · ccstatusline install` action uses (single source in
 * lib/links `copy.ccstatusline`) — and toasts on success. Amber because it's interactive/now.
 */
export function CopyChip() {
  const { toast } = useToast();
  const onCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(copy.ccstatusline.text)
        .then(() => toast(copy.ccstatusline.toast))
        .catch(() => toast("clipboard blocked in this preview"));
    } else {
      toast("clipboard blocked in this preview");
    }
  };
  return (
    <button type="button" className="copychip" onClick={onCopy}>
      {copy.ccstatusline.text} ⧉
    </button>
  );
}
