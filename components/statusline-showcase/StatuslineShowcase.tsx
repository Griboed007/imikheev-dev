import { Section } from "@/components/primitives/Section";
import { Spark } from "@/components/spark";
import { CopyChip } from "./CopyChip";

/**
 * ccstatusline segment colors — LITERAL reproduction of the real tool's theme (design tokens
 * §"look source of truth" = the mockup). These are NOT the site's semantic palette: the teal
 * here is ccstatusline's "Opus"/"Thinking" color, not the verified-outcome teal. They live
 * inline and stay confined to `.term`, exactly like a scoped brand skin — a grep for the token
 * won't (and shouldn't) find them.
 */
const SEG = {
  cyan: "#61D3E3", // Model / Mem labels
  teal: "#3ECFAE", // model name / thinking value
  blue: "#5B8DEF", // context + bar
  purple: "#C39AC9", // cached / git branch
  gold: "#E8C176", // total / session
  green: "#8CC265", // git clean
  red: "#E36D6D", // git dirty
  faint: "rgba(237,230,218,.35)", // separators / weekly load
} as const;

/** A colored terminal segment. */
function S({ c, children }: { c: string; children: React.ReactNode }) {
  return <span style={{ color: c }}>{children}</span>;
}

/**
 * The statusline showcase (mockup `~/statusline`): a terminal frame reproducing the real
 * ccstatusline I run Claude Code with, the animated Claude <Spark> perched on top, and a
 * copy chip for the install command. Two status rows scroll horizontally on a narrow phone
 * (`.t-status` overflow-x) rather than wrapping, so the cockpit reads as one line like the
 * real thing. Server component; only the spark and the copy chip are client islands.
 */
export function StatuslineShowcase() {
  return (
    <Section
      id="statusline-sec"
      path="statusline"
      title="The statusline"
      note="the cockpit I actually fly claude code with — steal it"
    >
      <div className="term">
        <Spark />
        <div className="t-sep" style={{ marginTop: 0 }} />
        <div className="t-prompt">
          ›<span className="t-cursor" aria-hidden="true" />
        </div>
        <div className="t-sep" />
        <div className="t-status">
          <S c={SEG.cyan}>Model:</S> <S c={SEG.teal}>Opus 4.8</S>
          &nbsp;&nbsp;<S c={SEG.blue}>Context:</S> <S c={SEG.blue}>[</S>
          <span className="ctxbar" />
          <S c={SEG.blue}>] 0/1.0M (0%)</S>&nbsp; <S c={SEG.faint}>|</S> &nbsp;
          <S c={SEG.purple}>Cached: 0</S>&nbsp;&nbsp;<S c={SEG.gold}>Total: —</S>
          &nbsp;&nbsp;<S c={SEG.teal}>Thinking: high</S>
        </div>
        <div className="t-status">
          <S c={SEG.purple}>⎇ no git</S>&nbsp;&nbsp;<S c={SEG.green}>(no git)</S>
          &nbsp;&nbsp;<S c={SEG.red}>(no git)</S>&nbsp;&nbsp;
          <S c={SEG.cyan}>Mem: 23.4G/31.6G</S>&nbsp;&nbsp;
          <S c={SEG.gold}>Session: &lt;1m</S>&nbsp;&nbsp;
          <S c={SEG.faint}>Session: 19.0%&nbsp;&nbsp;Weekly: 4.0%</S>
        </div>
      </div>
      <div className="term-cap">
        <span>
          model · context bar · cache · thinking depth · git tri-state · mem ·
          session load — built with ccstatusline, themed to match this site
        </span>
        <CopyChip />
      </div>
    </Section>
  );
}
