import { Section } from "@/components/primitives/Section";
import { StatusChip } from "@/components/primitives/StatusChip";
import { Pill } from "@/components/primitives/Pill";
import { Ext } from "@/components/primitives/Ext";
import { Card } from "@/components/cards/Card";
import { links } from "@/lib/links";
import { CHAPTERS, type Mini } from "./chapters";
import { Monogram } from "./Monogram";
import { ChapterGlyph } from "./glyphs";

/** One `modules / learned / skills / thesis` row (mockup `.mini`). */
function MiniRow({ mini }: { mini: Mini }) {
  return (
    <div className="mini">
      <span className="mk">{mini.k}</span>
      {mini.pills ? (
        <span>
          {mini.pills.map((p) => (
            <Pill key={p}>{p}</Pill>
          ))}
        </span>
      ) : mini.link ? (
        <span className="lv">
          <Ext href={links[mini.link.key]} className="ext">
            {mini.link.label}
          </Ext>
          {mini.link.after}
        </span>
      ) : (
        <span className="lv">{mini.text}</span>
      )}
    </div>
  );
}

/**
 * Education (mockup `~/education`): three chapter cards. Each wears a dot-matrix monogram
 * (<Monogram>) behind an SVG glyph, then a `sub3` of module/skill pills and the CreaTe
 * thesis link. A dotted amber roadmap closes with the thesis + graduation ghosts.
 */
export function EducationSection() {
  return (
    <Section
      id="education"
      path="education"
      title="The education"
      note="three chapters, one question — dotted where the story continues"
    >
      <div className="cards">
        {CHAPTERS.map((ch) => (
          <Card as="div" key={ch.slug}>
            <div className="eg-area">
              <Monogram mark={ch.mark} />
              <span className="unibadge" title="official mark drops in here">
                {ch.mark}
              </span>
              <ChapterGlyph glyph={ch.glyph} />
            </div>
            <span className="slug">
              {ch.slug}
              {ch.inProgress ? (
                <span className="ml-[6px]">
                  <StatusChip status="live">in progress</StatusChip>
                </span>
              ) : null}
            </span>
            <h3>{ch.title}</h3>
            <p>{ch.body}</p>
            <div className="sub3">
              {ch.minis.map((mini) => (
                <MiniRow key={mini.k} mini={mini} />
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="roadmap" aria-label="graduation roadmap">
        <div className="dotline" />
        <div className="ghost">
          <b>msc thesis</b>topic forming — roadmap slot
        </div>
        <div className="dotline" />
        <div className="ghost">
          <b>graduation</b>the story continues ⇢
        </div>
        <div className="dotline fade" />
      </div>
    </Section>
  );
}
