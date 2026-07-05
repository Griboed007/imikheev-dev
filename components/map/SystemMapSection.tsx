"use client";

import { useState } from "react";
import { Section } from "@/components/primitives/Section";
import { StatusChip } from "@/components/primitives/StatusChip";
import { Ext } from "@/components/primitives/Ext";
import { nodeDetail } from "@/lib/graph";
import { SystemMap } from "./SystemMap";

const BTN =
  "whitespace-nowrap rounded-[6px] border border-amber px-[14px] py-2 font-mono text-[12.5px] text-amber transition-colors hover:bg-amber-bg";

/**
 * The `#map` section: the "window"-styled panel (backdrop blur, heavy border, shadow), the
 * interactive small map, and the inspector panel. Selection lifts to here so the panel and
 * the map's `.sel` highlight stay in sync; hover-trace stays local to the map.
 */
export function SystemMapSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const detail = selectedId ? nodeDetail(selectedId) : null;

  return (
    <Section
      id="map"
      path="map"
      title="System map"
      note="projects and domains as a typed graph — hover to trace, click to inspect"
    >
      <div className="map-panel">
        <div className="legend">
          <span className="l-sys">
            <i />
            system
          </span>
          <span className="l-dom">
            <i />
            domain
          </span>
          <span className="l-live">
            <i />
            live now
          </span>
        </div>

        <SystemMap selectedId={selectedId} onSelect={setSelectedId} />

        <div className="node-detail">
          <div>
            <div className="font-mono text-[1.05rem] font-medium">
              {detail ? detail.title : "select a node"}
            </div>
            <div className="mt-1 font-mono text-[12px] text-ink-mute">
              {detail ? detail.meta : "click any system on the map to inspect it"}
            </div>
            <p className="mt-2 max-w-[640px] text-[.95rem] text-ink-dim">
              {detail
                ? detail.line
                : "Systems connect to the domains they exercise. The real site renders this from the same RDF graph that powers my digital-twin work — the map is queryable, not decorative."}
            </p>
          </div>
          <div className="flex flex-col items-end gap-[10px]">
            {detail?.status ? <StatusChip status={detail.status} /> : null}
            {detail?.caseSlug ? (
              <a href={`/work/${detail.caseSlug}`} className={BTN}>
                open case study →
              </a>
            ) : null}
            {detail?.url ? (
              <Ext href={detail.url} className={BTN}>
                open live ↗
              </Ext>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  );
}
