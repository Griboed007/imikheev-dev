/**
 * The URL registry. Every external URL, mailto, and copy string lives here — nothing
 * hardcodes a URL elsewhere (lib/CLAUDE.md). Footer, ⌘K, and cards all read from this.
 */
export const links = {
  github: "https://github.com/Griboed007",
  linkedin: "https://www.linkedin.com/in/ivan-mikheev-313b53234/",
  instagram: "https://www.instagram.com/ivan_von_terrible",
  email: "cj007mikheev@gmail.com",
  deckgen: "https://deckforge-web.vercel.app/",
  tracker: "https://project-tracker-mauve-omega.vercel.app/",
  geofenceArticle:
    "https://www.linkedin.com/pulse/building-queryable-semantic-digital-twin-vehicle-nebius-ivan-mikheev-achme/",
  thesisPdf:
    "https://essay.utwente.nl/fileshare/file/107619/Mikheev_BA_CreativeTechnology.pdf",
  pressInterview:
    "https://www.verzekeraars.nl/publicaties/actueel/verzekeraars-doen-meer-dan-ik-in-eerste-instantie-dacht",
  beans: "https://fancybeans.nl/products/sweet-peach",
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
