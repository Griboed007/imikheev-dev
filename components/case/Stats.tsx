/**
 * Stats grid + a single stat (mockup `.stats` / `.stat`). Numbers are teal — verified
 * outcomes (color-semantics gate). Case stats must match the counter-band / lib constants
 * where both name the same figure (content/CLAUDE.md — one value, two views).
 */
export function Stats({ children }: { children?: React.ReactNode }) {
  return <div className="stats">{children}</div>;
}

export function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="stat">
      <div className="n">{n}</div>
      <div className="l">{l}</div>
    </div>
  );
}
