import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Ivan Mikheev — I engineer adoption";

/** Home share card. */
export default function Image() {
  return renderOg({
    kicker: "~/portfolio",
    title: "Ivan Mikheev",
    sub: "I engineer adoption",
  });
}
