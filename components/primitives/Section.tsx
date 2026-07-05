import type { ReactNode } from "react";
import { Wrap } from "./Wrap";

/**
 * Home-section shell: `~/path` amber eyebrow + underlined heading row (mockup `.eyebrow`
 * / `.sec-head`). `scroll-mt` clears the 38px fixed statusline on anchor jumps.
 */
export function Section({
  path,
  title,
  note,
  id,
  children,
  className = "",
}: {
  path: string;
  title: string;
  note?: ReactNode;
  id?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-[38px] py-[72px] md:py-[104px] ${className}`.trim()}
    >
      <Wrap>
        <span className="mb-[14px] block font-mono text-[12.5px] tracking-[.02em] text-amber">
          ~/{path}
        </span>
        <div className="mb-9 flex items-baseline justify-between gap-4 border-b border-line pb-[14px]">
          <h2 className="font-mono text-[1.3rem] font-medium tracking-[-.01em]">
            {title}
          </h2>
          {note ? (
            <span className="font-mono text-[12px] text-ink-mute">{note}</span>
          ) : null}
        </div>
        {children}
      </Wrap>
    </section>
  );
}
