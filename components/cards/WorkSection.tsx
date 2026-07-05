"use client";

import { useState } from "react";
import { Section } from "@/components/primitives/Section";
import { links } from "@/lib/links";
import { Card } from "./Card";

/** Metric chips row (mockup `.metrics`). Skin CSS recolors it for dg/tk cards. */
function Metrics({ items }: { items: string[] }) {
  return (
    <div className="metrics">
      {items.map((m) => (
        <span key={m}>{m}</span>
      ))}
    </div>
  );
}

/** The show-all systems, plain-skin cards (mockup `.card.xtra`). */
const XTRA = [
  {
    slug: "voltstream · msc systems track",
    h3: "Multi-service EV charging platform",
    p: "Service-oriented architecture where every service owns its database, speaks sync and async, and degrades gracefully when neighbours fail. Built with a contract-first, three-phase agentic workflow.",
    metrics: ["6 services", "per-service db", "graceful degradation"],
    go: "case study — in writing",
  },
  {
    slug: "matter-home · ongoing",
    h3: "Matter over Thread, custom devices as first-class citizens",
    p: "Raspberry Pi 5 border router with a Nordic RCP radio, ESP32-C6/S3 nodes bridged into the Matter standard so home-built hardware behaves exactly like factory devices — same commissioning, same controls.",
    metrics: ["thread mesh", "custom ↔ factory bridge", "live network"],
    go: "build log — in writing",
  },
  {
    slug: "trendata · msc enterprise track",
    h3: "Agentic marketplace + MCP for market intelligence",
    p: "Extended a market-intelligence platform with a custom agentic marketplace and an MCP layer — turning a dashboard product into something agents can operate natively.",
    metrics: ["agent marketplace", "mcp layer", "delivered"],
    go: "case study — in writing",
  },
  {
    slug: "find-vendor · founder",
    h3: "Agentic sourcing for industrial procurement",
    p: "Agent-driven vendor discovery and outreach, researched hands-on with truck, food, and solar manufacturers. Sunset in 2025 — the full post-mortem lives in the story below.",
    metrics: ["3 industries researched", "b2b architecture", "sunset 2025"],
    go: "post-mortem — in writing",
  },
];

/**
 * Selected systems (mockup `#work`). Front row is the live proof: the twin links INTO its
 * case study (/work/geofence-twin — closing the 004 map case-button 404); deckgen and
 * tracker link OUT to the live products in new tabs (Spec Delta: routing). Brand skins wear
 * their own colors — the hexes stay in scoped `.card.dg` / `.card.tk` CSS.
 */
export function WorkSection() {
  const [open, setOpen] = useState(false);

  return (
    <Section
      id="work"
      path="work"
      title="Selected systems"
      note="the live ones wear their own colors — full case studies behind each"
    >
      <div className={`cards ${open ? "open" : ""}`.trim()}>
        {/* geofence-twin — links into the case study */}
        <Card as="link" href="/work/geofence-twin">
          <span className="slug">geofence-twin · nebius serverless challenge</span>
          <h3>Semantic digital twin for vehicle telemetry</h3>
          <p>
            Hybrid trajectory prediction and anomaly scoring over GPS streams, backed by a
            SPARQL-queryable SAREF/RDF knowledge graph. Batch enrichment job plus a FastAPI
            inference endpoint, fully containerized on Nebius.
          </p>
          <Metrics items={["roc-auc 0.8247", "24 380 triples", "1.9 s batch"]} />
          <span className="go">read the case →</span>
        </Card>

        {/* deckgen — blueprint-blue skin, live product */}
        <Card as="ext" href={links.deckgen} variant="dg">
          <span className="slug">deckgen · live product · write-up</span>
          <div className="dg-cells" aria-hidden="true">
            {Array.from({ length: 9 }, (_, i) => (
              <i key={i} />
            ))}
          </div>
          <h3>
            Every number on the slide traces to its source.<sup>1</sup>
          </h3>
          <p>
            Internal PDFs become presentations where each figure resolves to an evidence
            ledger — an orchestrator fans out cite-only explorer agents per report, and a
            verifier gates the deck before it ships.
          </p>
          <div className="dg-verify">verify · 56/56 figures → ledger · 0 dangling</div>
          <Metrics items={["194 unit tests", "100% figures cited", "9 stages"]} />
          <span className="fn">
            <sup>1</sup> deckforge-web.vercel.app — visual language: industrial blueprint ×
            terminal
          </span>
          <span className="go">read the write-up ↗</span>
        </Card>

        {/* tracker — violet skin, live app */}
        <Card as="ext" href={links.tracker} variant="tk">
          <span className="slug">tracker · live app</span>
          <div className="tk-board" aria-hidden="true">
            <div className="tk-col c1">
              <div className="tk-mover" />
              <div className="tk-chip" style={{ marginTop: 13, opacity: 0.45 }} />
            </div>
            <div className="tk-col c2" />
            <div className="tk-col c3" />
            <div className="tk-col c4" />
          </div>
          <h3>Kanban with an AI copilot</h3>
          <p>
            Multi-project boards with priorities, members, and an AI layer that summarizes
            columns and suggests next moves — the operations twin of how I actually run
            projects.
          </p>
          <span className="tk-ai">✦ summarize with ai</span>
          <Metrics items={["live", "ai summaries", "multi-project"]} />
          <span className="go">open the app ↗ (login)</span>
        </Card>

        {XTRA.map((c) => (
          <Card as="div" xtra key={c.slug}>
            <span className="slug">{c.slug}</span>
            <h3>{c.h3}</h3>
            <p>{c.p}</p>
            <Metrics items={c.metrics} />
            <span className="go">{c.go}</span>
          </Card>
        ))}
      </div>

      <button
        className="more-btn mt-6 font-mono text-[12.5px] text-ink-dim transition-colors hover:text-amber"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "show fewer ▴" : "show all systems (+4) ▾"}
      </button>
    </Section>
  );
}
