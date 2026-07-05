import type { ReactNode } from "react";

/**
 * Status semantics (tokens.md + mockup `.st-*`):
 *  shipped / delivered → teal (verified outcomes)
 *  live / advising / piloted → amber (now / interactive)
 *  sunset → mute · exited → dim
 */
export type Status =
  | "shipped"
  | "delivered"
  | "live"
  | "advising"
  | "piloted"
  | "sunset"
  | "exited";

const STYLES: Record<Status, string> = {
  shipped: "text-teal bg-teal-bg",
  delivered: "text-teal bg-teal-bg",
  live: "text-amber bg-amber-bg",
  advising: "text-amber bg-amber-bg",
  piloted: "text-amber bg-amber-bg",
  sunset: "text-ink-mute bg-[rgba(237,230,218,.07)]",
  exited: "text-ink-dim bg-[rgba(237,230,218,.07)]",
};

export function StatusChip({
  status,
  children,
}: {
  status: Status;
  children?: ReactNode;
}) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-[5px] px-[9px] py-[3px] font-mono text-[11.5px] ${STYLES[status]}`}
    >
      {children ?? status}
    </span>
  );
}
