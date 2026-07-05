import { Wrap } from "@/components/primitives/Wrap";
import { Ext } from "@/components/primitives/Ext";
import { links, mailto } from "@/lib/links";

const LINK = "text-ink-dim hover:text-amber";

/** Footer with the real link set (mockup <footer>). */
export function Footer() {
  return (
    <footer className="border-t border-line bg-bg pt-9 pb-[46px]">
      <Wrap className="flex flex-wrap items-center justify-between gap-5 font-mono text-[12px] text-ink-mute">
        <span>
          designed as a digital twin — every moving element maps to live state
        </span>
        <span className="flex gap-[18px]">
          <Ext href={links.github} className={LINK}>
            github
          </Ext>
          <Ext href={links.linkedin} className={LINK}>
            linkedin
          </Ext>
          <Ext href={links.instagram} className={LINK}>
            instagram
          </Ext>
          <a href={mailto()} className={LINK}>
            email
          </a>
        </span>
      </Wrap>
    </footer>
  );
}
