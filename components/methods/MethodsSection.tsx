import Link from "next/link";
import { Section } from "@/components/primitives/Section";
import { METHODS, STACK } from "./toolbox";
import { MethodGlyph } from "./glyphs";

/**
 * The toolbox (mockup `~/methods`): six method cards, each with a hover glyph, over the stack
 * strip. Only spec-driven-agents links out — to its real framework page. Server component;
 * the glyph motion is pure CSS driven by `.m-card:hover` (no JS hover handlers).
 */
export function MethodsSection() {
  return (
    <Section
      id="methods"
      path="methods"
      title="The toolbox"
      note="methods and stack — what I actually run teams, agents, and systems on"
    >
      <div className="m-cards">
        {METHODS.map((m) => (
          <div className="m-card" key={m.slug}>
            <MethodGlyph glyph={m.glyph} />
            <span className="slug">{m.slug}</span>
            <h3>{m.title}</h3>
            <p>{m.body}</p>
            {m.href ? (
              <div className="plinks">
                <Link href={m.href}>{m.linkLabel}</Link>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <div className="stack">
        {STACK.map((s) => (
          <div className="s-card" key={s.nm}>
            <div className="nm">{s.nm}</div>
            <div className="tg">{s.tg}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
