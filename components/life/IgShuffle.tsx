"use client";

import { useEffect, useState } from "react";
import type { PhotoFrame } from "@/lib/telemetry";
import { useReducedMotion } from "@/lib/motion";

/**
 * The Instagram shuffle tile (mockup `#igshuffle`): a rotating strip of CSS-gradient frames
 * whose EXIF strip follows the active frame's lens. The frames come from the git-versioned
 * `public/photos/manifest.json` (refresh = drop files + rerun the manifest + commit).
 *
 * Reduced motion (requirement, not polish): the shuffle interval short-circuits — the lead
 * frame stays put and its EXIF holds (mirrors the mockup's `if(reduce)return`). Mount-guarded
 * via the effect + cleared on unmount; the amber focus-corner (`.af`) fades are hover-only CSS.
 */
export function IgShuffle({ frames }: { frames: PhotoFrame[] }) {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || frames.length < 2) return;
    const id = setInterval(
      () => setI((n) => (n + 1) % frames.length),
      3800,
    );
    return () => clearInterval(id);
  }, [reduced, frames.length]);

  return (
    <div className="photo">
      {frames.map((f, n) => (
        <div
          key={n}
          className={`fr${n === i ? " show" : ""}`}
          style={{ background: f.bg }}
        />
      ))}
      <i className="af tl" />
      <i className="af tr" />
      <i className="af bl" />
      <i className="af br" />
      <span className="exif">{frames[i].exif}</span>
    </div>
  );
}
