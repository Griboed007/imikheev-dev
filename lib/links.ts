/**
 * The URL registry. Every external URL, mailto, and copy string lives here — nothing
 * hardcodes a URL elsewhere (lib/CLAUDE.md). Footer, ⌘K, and cards all read from this.
 */
export const links = {
  github: "https://github.com/Griboed007",
  linkedin: "https://www.linkedin.com/in/ivan-mikheev-313b53234/",
  instagram: "https://www.instagram.com/ivan_von_terrible",
  // Published contact address (010): a dedicated business gmail, chosen by the operator.
  // `emailBranded` is the eventual hello@imikheev.dev target — a one-line flip once the
  // registrar/ImprovMX forwarding is live (RUNBOOK step 0).
  email: "ivan.mikheev.biz@gmail.com",
  emailBranded: "hello@imikheev.dev",
  // The CV is a static, byte-stable PDF (010) — served from /public after owner sign-off.
  cv: "/cv.pdf",
  deckgen: "https://deckforge-web.vercel.app/",
  tracker: "https://project-tracker-mauve-omega.vercel.app/",
  geofenceArticle:
    "https://www.linkedin.com/pulse/building-queryable-semantic-digital-twin-vehicle-nebius-ivan-mikheev-achme/",
  thesisPdf:
    "https://essay.utwente.nl/fileshare/file/107619/Mikheev_BA_CreativeTechnology.pdf",
  // Achmea Insurance Challenge 2023 — the two verzekeraars.nl press records (challenge +
  // the interview with me); the SauronEye/Earthian endorsement post (story ledger).
  achmeaChallenge:
    "https://www.verzekeraars.nl/publicaties/actueel/studenten-denken-mee-over-hoe-verzekeringsklant-geen-cyberslachtoffer-wordt",
  pressInterview:
    "https://www.verzekeraars.nl/publicaties/actueel/verzekeraars-doen-meer-dan-ik-in-eerste-instantie-dacht",
  endorsement:
    "https://www.linkedin.com/posts/david-swells_ai-greenfinancing-creditintelligence-activity-7188625999629070336-89Og",
  beans: "https://fancybeans.nl/products/sweet-peach",
  // ChargeHyve field-notes tile — the "six founders" LinkedIn post (NullSpace visit).
  chargehyvePost:
    "https://www.linkedin.com/posts/ivan-mikheev-313b53234_ja-het-is-gelukt-zes-founders-vonden-vandaag-activity-7476633546309427200-YZ4t",
} as const;

export const mailto = (subject?: string): string =>
  `mailto:${links.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

/** Strings the ⌘K palette copies to the clipboard, with the toast shown on success. */
export const copy = {
  ccstatusline: {
    text: "npx ccstatusline@latest",
    toast: "copied — run it in your terminal and pick your segments",
  },
  email: {
    text: links.email,
    toast: "email copied — interim gmail until the domain lands",
  },
} as const;
