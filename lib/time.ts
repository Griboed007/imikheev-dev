/**
 * The statusline clock reads Amsterdam wall-time (labelled CET in the mockup) regardless
 * of the visitor's timezone. Pure formatter so it is unit-testable with a fixed instant.
 */
export function formatAmsterdamTime(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Europe/Amsterdam",
  }).format(date);
}
