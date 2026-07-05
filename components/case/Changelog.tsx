/**
 * Changelog (mockup `.chlog`): dated rows, newest first. `entries` is `[date, text]`
 * pairs so the MDX author writes a plain array — the ".chlog" container is the marker the
 * pipeline test asserts on (proof the component ran, not raw markdown).
 */
export function Changelog({ entries }: { entries: [string, string][] }) {
  return (
    <div className="chlog">
      {entries.map(([date, text]) => (
        <div key={date + text}>
          <span>{date}</span>
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
}
