/** Toast atom (mockup #toast): fixed bottom-center pill. Purely presentational. */
export function Toast({ message, show }: { message: string; show: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-[26px] left-1/2 z-[110] -translate-x-1/2 rounded-[8px] border border-line-strong bg-panel2 px-4 py-[10px] font-mono text-[12.5px] text-ink transition duration-[250ms] ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-[12px] opacity-0"
      }`}
    >
      {message}
    </div>
  );
}
