/**
 * Pressure tests (mockup `~/hackathons`). Dates come from the press record: both Insurance
 * Challenges are 2023, not 2022 (proposal Spec Delta). `glyph` selects the SVG; `links`
 * carry the case route (internal) and/or external records from lib/links.
 */
export type HackGlyph = "rings" | "lockflow" | "orbit";

export interface HackLink {
  /** internal case route, or an external record key from lib/links. */
  kind: "case" | "external";
  key?: "achmeaChallenge" | "pressInterview" | "geofenceArticle";
  href?: string;
  label: string;
}

export interface Hackathon {
  slug: string;
  glyph: HackGlyph;
  title: string;
  body: string;
  skills: string[];
  links?: HackLink[];
}

export const HACKATHONS: Hackathon[] = [
  {
    slug: "2023 · insurance challenge @ achmea, leiden",
    glyph: "rings",
    title: "Age-aware digital risk education",
    body: "One insurance story, retold per generation: identity theft and impersonation phishing explained in each age group's own mental language — the rings widen, the message adapts.",
    skills: ["rapid prototyping", "behavioral design", "insurance domain"],
    links: [
      { kind: "external", key: "achmeaChallenge", label: "press · the challenge ↗" },
      { kind: "external", key: "pressInterview", label: "press · interview with me ↗" },
    ],
  },
  {
    slug: "2023 · insurance challenge @ allianz, rotterdam",
    glyph: "lockflow",
    title: "On-premise LLM for medical claim review",
    body: "A secure, on-prem inference platform assisting medical reviewers on complex claims — retrieval-augmented with prose detection, built in the season when most enterprises were still deciding whether to trust LLMs at all. The lock stays closed; the tokens still flow.",
    skills: ["on-prem llm", "early rag", "claim workflows"],
  },
  {
    slug: "2026 · nebius serverless ai challenge",
    glyph: "orbit",
    title: "The geofence twin, under deadline",
    body: "Built solo with the spec-driven agent framework and shipped ahead of the deadline — the same system that opens this portfolio, forged as a pressure test.",
    skills: ["digital twins", "sparql", "serverless"],
    links: [
      { kind: "case", href: "/work/geofence-twin", label: "read the case →" },
      { kind: "external", key: "geofenceArticle", label: "the article ↗" },
    ],
  },
];
