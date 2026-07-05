import Link from "next/link";
import { Section } from "@/components/primitives/Section";
import { Ext } from "@/components/primitives/Ext";
import { Card } from "@/components/cards/Card";
import { links } from "@/lib/links";
import { HACKATHONS, type HackLink } from "./hackathons";
import { PressGlyph } from "./glyphs";

/** Amber skill pill (mockup `.hackskills .pill`). Written with explicit amber classes — no
 * ink-dim base — so there's no Tailwind class-order conflict to recolor around. */
function HackPill({ children }: { children: string }) {
  return (
    <span className="mr-1 mb-1 inline-block rounded-[4px] border border-[rgba(245,167,66,0.3)] px-[7px] py-px font-mono text-[10.5px] text-amber">
      {children}
    </span>
  );
}

/** A press/case link (mockup `.plinks`): case route stays internal, records open in a new tab. */
function PressLink({ link }: { link: HackLink }) {
  if (link.kind === "case") {
    return <Link href={link.href!}>{link.label}</Link>;
  }
  return <Ext href={links[link.key!]}>{link.label}</Ext>;
}

/**
 * Pressure tests (mockup `~/hackathons`): rapid builds, each with the skills it burned in.
 * Both Insurance Challenges read 2023 per the press record (Spec Delta). Press links live
 * in `.plinks` and wrap by contract so nothing overflows on a narrow phone.
 */
export function HackathonsSection() {
  return (
    <Section
      id="hackathons"
      path="hackathons"
      title="Pressure tests"
      note="rapid builds — each one a story and the skills it burned in"
    >
      <div className="cards">
        {HACKATHONS.map((h) => (
          <Card as="div" key={h.slug}>
            <PressGlyph glyph={h.glyph} />
            <span className="slug">{h.slug}</span>
            <h3>{h.title}</h3>
            <p>{h.body}</p>
            <div className="flex flex-wrap border-t border-line pt-3">
              {h.skills.map((s) => (
                <HackPill key={s}>{s}</HackPill>
              ))}
            </div>
            {h.links ? (
              <div className="plinks">
                {h.links.map((l) => (
                  <PressLink key={l.label} link={l} />
                ))}
              </div>
            ) : null}
          </Card>
        ))}
      </div>
    </Section>
  );
}
