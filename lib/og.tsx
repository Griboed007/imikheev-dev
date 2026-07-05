import { ImageResponse } from "next/og";

/** Shared OG geometry/type — re-exported by every opengraph-image route. */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

// Literal palette (design tokens). Inlined because Satori has no :root / CSS vars — the OG
// runtime resolves nothing from globals.css. Clay is intentionally absent (spark-only).
const BG = "#0E0C0A";
const INK = "#EDE6DA";
const INK_DIM = "rgba(237,230,218,.64)";
const AMBER = "#F5A742";
const LINE = "rgba(237,230,218,.14)";

/**
 * The share card (011): a statusline-styled graphite frame — a faux status strip, an
 * amber-accented `~/path` kicker, the page title, and the name/domain footer. One card for
 * every route; the kicker/title/sub differ per route so a shared case/method link previews
 * with its own title (Spec Delta "every route ships a share card"). Default font — matching
 * the exact site mono is Track-B polish and doesn't change the card's identity.
 */
export function renderOg({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: BG,
          color: INK,
          padding: 64,
        }}
      >
        {/* faux statusline strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${LINE}`,
            paddingBottom: 22,
            fontSize: 26,
            color: INK_DIM,
          }}
        >
          <div style={{ display: "flex" }}>ivan@imikheev.dev</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: AMBER,
                marginRight: 12,
              }}
            />
            <div style={{ display: "flex" }}>live</div>
          </div>
        </div>

        {/* body */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <div style={{ display: "flex", fontSize: 30, color: AMBER, marginBottom: 24 }}>
            {kicker}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 34, color: INK_DIM, marginTop: 28 }}>
            {sub}
          </div>
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            color: INK_DIM,
          }}
        >
          <div style={{ display: "flex" }}>Ivan Mikheev</div>
          <div style={{ display: "flex" }}>imikheev.dev</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
