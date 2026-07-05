import type { ReactNode } from "react";

/** Small hairline tag (mockup `.pill`). */
export function Pill({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`mr-1 mb-1 inline-block rounded-[4px] border border-line-strong px-[7px] py-px font-mono text-[10.5px] text-ink-dim ${className}`.trim()}
    >
      {children}
    </span>
  );
}
