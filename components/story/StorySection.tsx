import { Fragment } from "react";
import { Section } from "@/components/primitives/Section";
import { StatusChip } from "@/components/primitives/StatusChip";
import { Ext } from "@/components/primitives/Ext";
import { links } from "@/lib/links";
import { LEDGER } from "./ledger";

/**
 * The story ledger (mockup `~/story`): the honest record — shipped, piloted, sunset — with
 * the lesson each chapter paid for. Statuses reuse StatusChip (advising→amber, shipped→teal).
 * The SauronEye row appends its `endorsement ↗` link, which wraps by contract (`.ext`).
 */
export function StorySection() {
  return (
    <Section
      id="story"
      path="story"
      title="The story"
      note="shipped, piloted, sunset — with the lesson each chapter paid for"
    >
      <div className="ledger">
        {LEDGER.map((row) => (
          <div className="lrow" key={row.name}>
            <span className="yr">{row.years}</span>
            <span className="nm">{row.name}</span>
            <StatusChip status={row.status}>{row.statusLabel}</StatusChip>
            <span className="ls">
              {row.lesson}
              {row.link ? (
                <Fragment>
                  {" "}
                  <Ext href={links[row.link.key]} className="ext">
                    {row.link.label}
                  </Ext>
                </Fragment>
              ) : null}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
