/**
 * Callout (mockup `.callout`): amber-ruled aside with a mono eyebrow. The mockup's inline
 * "Read the framework →" CTA is intentionally omitted here — `/methods/*` routes don't
 * exist until change 007, and shipping a dead link would fail the no-404 rule. The MDX can
 * add the link once that route lands.
 */
export function Callout({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="callout">
      <div className="t">{title}</div>
      {children}
    </div>
  );
}
