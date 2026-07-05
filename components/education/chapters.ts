/**
 * Education chapters (mockup `~/education`). Each card wears a dot-matrix monogram (mark)
 * behind an SVG glyph. CreaTe links the published thesis. `mark` drives the Monogram
 * canvas; `glyph` selects the SVG. Official university marks are drop-in assets later —
 * the `unibadge` corner is the placeholder.
 */
export type EduMark = "UT" | "IIT";
export type EduGlyph = "cube" | "stack" | "diamond";

export interface Mini {
  k: string;
  pills?: string[];
  text?: string;
  link?: { key: "thesisPdf"; label: string; after?: string };
}

export interface Chapter {
  slug: string;
  /** e.g. chapter 03 "in progress" chip (status=live). */
  inProgress?: boolean;
  mark: EduMark;
  glyph: EduGlyph;
  title: string;
  body: string;
  minis: Mini[];
}

export const CHAPTERS: Chapter[] = [
  {
    slug: "chapter 01 · university of twente",
    mark: "UT",
    glyph: "cube",
    title: "BSc Creative Technology",
    body: "Came in a maker, left an experience researcher. AR classifiers, a gamified workout copilot, an installation that made the weight of child labour tangible — and a closing thesis that mapped process-mining visualizations to the information needs of each corporate tier. Mental languages, formalized.",
    minis: [
      { k: "modules", pills: ["research-through-design", "ai & ml", "ux research"] },
      { k: "learned", text: "design the adoption path before the product" },
      { k: "skills", pills: ["ar prototyping", "user trajectories", "roadmapping"] },
      {
        k: "thesis",
        link: {
          key: "thesisPdf",
          label: "mapping stakeholder needs to process-model artefacts ↗",
          after: " — published, utwente",
        },
      },
    ],
  },
  {
    slug: "chapter 02 · illinois institute of technology",
    mark: "IIT",
    glyph: "stack",
    title: "Cloud Computing minor",
    body: "A semester of treating infrastructure as code: provisioning AWS through Terraform until the cloud stopped being a place and became a material. Hover — the stack assembles the way a plan should.",
    minis: [
      { k: "modules", pills: ["cloud architecture", "distributed systems"] },
      { k: "learned", text: "if it isn't reproducible, it doesn't exist" },
      { k: "skills", pills: ["aws", "terraform", "iac"] },
    ],
  },
  {
    slug: "chapter 03 · university of twente",
    inProgress: true,
    mark: "UT",
    glyph: "diamond",
    title: "MSc Business & IT — enterprise track",
    body: "The integration layer: where AI systems meet business cases. TrenData's agentic marketplace, the decentralized digital twin, and VoltStream were all built here — around the question this whole site asks: what makes an organization actually adopt?",
    minis: [
      {
        k: "modules",
        pills: ["enterprise architecture", "ai in business", "digital twins"],
      },
      { k: "learned", text: "adoption is an organizational property, not a feature" },
      { k: "skills", pills: ["agentic platforms", "mcp", "it–org integration"] },
    ],
  },
];
