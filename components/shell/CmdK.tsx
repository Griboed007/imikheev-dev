"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { links, copy } from "@/lib/links";
import { jumpTo } from "@/lib/nav";
import { useToast } from "./ToastProvider";

type Command = { label: string; hint: string; run: () => void };

/**
 * ⌘K command palette — keyboard-complete: ⌘K/Ctrl+K toggles, type to filter, ↑/↓ move,
 * Enter runs the active item, Esc closes. Jumps use graceful hash scrolling (targets land
 * across 003–010); opens use the URL registry; copies write to the clipboard + toast.
 */
export function CmdK() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Command[]>(() => {
    const openUrl = (url: string) => () =>
      window.open(url, "_blank", "noopener,noreferrer");
    const copyText = (c: { text: string; toast: string }) => () => {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(c.text)
          .then(() => toast(c.toast))
          .catch(() => toast("clipboard blocked in this preview"));
      } else {
        toast("clipboard blocked in this preview");
      }
    };
    const jump = (id: string) => () => jumpTo(id);

    return [
      { label: "go · home", hint: "view", run: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
      { label: "open · deckgen write-up", hint: "live ↗", run: openUrl(links.deckgen) },
      { label: "open · tracker app", hint: "live ↗", run: openUrl(links.tracker) },
      { label: "open · github @Griboed007", hint: "↗", run: openUrl(links.github) },
      { label: "open · linkedin", hint: "↗", run: openUrl(links.linkedin) },
      { label: "open · instagram @ivan_von_terrible", hint: "↗", run: openUrl(links.instagram) },
      { label: "open · bachelor thesis (utwente)", hint: "pdf ↗", run: openUrl(links.thesisPdf) },
      { label: "open · press interview (verzekeraars.nl)", hint: "press ↗", run: openUrl(links.pressInterview) },
      { label: "open · sweet peach beans (fancy beans)", hint: "coffee ↗", run: openUrl(links.beans) },
      { label: "jump · system map", hint: "~/map", run: jump("map") },
      { label: "jump · selected systems", hint: "~/work", run: jump("work") },
      { label: "jump · the story", hint: "~/story", run: jump("story") },
      { label: "jump · education", hint: "~/education", run: jump("education") },
      { label: "jump · hackathons", hint: "~/hackathons", run: jump("hackathons") },
      { label: "jump · toolbox", hint: "~/methods", run: jump("methods") },
      { label: "jump · statusline", hint: "~/statusline", run: jump("statusline-sec") },
      { label: "jump · off the clock", hint: "~/life", run: jump("life") },
      { label: "jump · motto + contact", hint: "~/motto", run: jump("contact") },
      { label: "copy · ccstatusline install", hint: "dotfile", run: copyText(copy.ccstatusline) },
      { label: "copy · email", hint: "contact", run: copyText(copy.email) },
    ];
  }, [toast]);

  const filtered = useMemo(
    () =>
      commands.filter((c) =>
        c.label.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [commands, query],
  );

  useEffect(() => setActive(0), [query, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filtered[active] ?? filtered[0];
        if (cmd) {
          setOpen(false);
          cmd.run();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, filtered, active]);

  useEffect(() => {
    if (open) {
      setQuery("");
      const id = setTimeout(() => inputRef.current?.focus(), 40);
      return () => clearTimeout(id);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="command palette"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
      className="fixed inset-0 z-[100] flex items-start justify-center bg-[rgba(8,7,5,.72)] px-5 pt-[14vh]"
    >
      <div className="w-full max-w-[560px] overflow-hidden rounded-[12px] border border-line-strong bg-panel">
        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          placeholder="type a command or destination…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border-b border-line bg-transparent px-[18px] py-4 font-mono text-[14px] text-ink outline-none placeholder:text-ink-mute"
        />
        <div className="max-h-[320px] overflow-auto p-2">
          {filtered.map((c, i) => (
            <button
              key={c.label}
              type="button"
              onMouseEnter={() => setActive(i)}
              onClick={() => {
                setOpen(false);
                c.run();
              }}
              className={`flex w-full items-center justify-between gap-4 rounded-[8px] px-3 py-[11px] text-left font-mono text-[13px] ${
                i === active ? "bg-panel2 text-ink" : "text-ink-dim"
              }`}
            >
              <span>{c.label}</span>
              <span className="text-[11.5px] text-ink-mute">{c.hint}</span>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="px-3 py-[11px] font-mono text-[13px] text-ink-mute">
              no matches
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
