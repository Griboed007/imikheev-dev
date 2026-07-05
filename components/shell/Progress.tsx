"use client";

import { useEffect, useState } from "react";

/** 2px amber scroll-progress bar under the statusline (mockup #prog). */
export function Progress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed left-0 top-[38px] z-[49] h-[2px] bg-amber"
      style={{ width: `${pct}%` }}
    />
  );
}
