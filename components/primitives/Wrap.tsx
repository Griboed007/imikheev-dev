import type { ReactNode } from "react";

/** Content column: max-w 1060px, 24px gutters (tokens.md §layout). */
export function Wrap({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1060px] px-6 ${className}`.trim()}>
      {children}
    </div>
  );
}
