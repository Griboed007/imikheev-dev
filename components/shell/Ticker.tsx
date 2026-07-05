import type { TickerItem } from "@/lib/telemetry";

/**
 * Marquee of telemetry items. The track is content-doubled so the -50% keyframe loops
 * seamlessly. Amber `strong` fragments carry the "live/now" semantic. Pauses on hover;
 * stops entirely under reduced motion (sits at its natural start offset). Presentational
 * (no hooks) so it renders in both the client Statusline and the server Tickbar.
 */
export function Ticker({
  items,
  speed = "desktop",
}: {
  items: TickerItem[];
  speed?: "desktop" | "mobile";
}) {
  const track = [...items, ...items];
  return (
    <div className="marquee-mask min-w-0 overflow-hidden">
      <div
        className={`flex w-max ${
          speed === "mobile" ? "animate-marquee-mobile" : "animate-marquee"
        } hover:[animation-play-state:paused] motion-reduce:animate-none`}
      >
        {track.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap px-[22px] font-mono text-[11.5px] text-ink-mute"
          >
            {item.segments.map((seg, j) =>
              seg.strong ? (
                <b key={j} className="font-normal text-amber">
                  {seg.text}
                </b>
              ) : (
                <span key={j}>{seg.text}</span>
              ),
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
