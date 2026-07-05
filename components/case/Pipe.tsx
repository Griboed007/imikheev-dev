/**
 * Pipe — the pipeline diagram (mockup `.pipe`). Defined ONCE, laid out from `steps` so
 * every case study draws its flow the same way (proposal §Design "hard part"). Boxes are
 * spaced evenly across a 900×120 viewBox with amber arrows between them.
 */
export interface PipeStep {
  label: string;
  sub?: string;
}

const VW = 900;
const MARGIN = 10;
const GAP = 24; // arrow run between boxes
const BOX_Y = 38;
const BOX_H = 44;

export function Pipe({ steps }: { steps: PipeStep[] }) {
  const n = steps.length;
  const boxW = (VW - MARGIN * 2 - GAP * (n - 1)) / n;
  const xOf = (i: number) => MARGIN + i * (boxW + GAP);

  return (
    <div className="pipe">
      <svg viewBox={`0 0 ${VW} 120`} role="img" aria-label="Pipeline diagram">
        <defs>
          <marker
            id="pipe-arr"
            viewBox="0 0 8 8"
            refX={7}
            refY={4}
            markerWidth={7}
            markerHeight={7}
            orient="auto"
          >
            <path d="M0 0 L8 4 L0 8 z" fill="var(--amber)" />
          </marker>
        </defs>
        {steps.map((s, i) => {
          const x = xOf(i);
          const cx = x + boxW / 2;
          return (
            <g key={s.label}>
              <rect
                className="bx"
                x={x}
                y={BOX_Y}
                width={boxW}
                height={BOX_H}
                rx={7}
              />
              <text x={cx} y={s.sub ? 58 : 64} textAnchor="middle">
                {s.label}
              </text>
              {s.sub ? (
                <text x={cx} y={72} textAnchor="middle" fillOpacity={0.6}>
                  {s.sub}
                </text>
              ) : null}
              {i < n - 1 ? (
                <line
                  className="fl"
                  x1={x + boxW}
                  y1={60}
                  x2={xOf(i + 1) - 5}
                  y2={60}
                />
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
