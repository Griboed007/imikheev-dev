import { Wrap } from "@/components/primitives/Wrap";
import { links, mailto } from "@/lib/links";

/**
 * The closing motto + contact (mockup `.motto`, `id="contact"`). Bespoke centered layout —
 * NOT the left-aligned `Section` shell: a centered `~/motto` eyebrow, the belief headline
 * with its amber period, the sub-line, then the two CTAs. `id="contact"` is the anchor the
 * statusline "let's talk" and the ⌘K "motto + contact" command already jump to (so the id
 * is `contact` while the eyebrow path reads `~/motto`).
 *
 * Contact works day one (010 Spec Delta): `let's talk →` opens a real mail draft to the
 * configured address; `download cv ⇩` is a real `/cv.pdf` download (the static, byte-stable
 * CV the operator signs off and commits). Both CTAs beat (primary = fill-glow, ghost =
 * border/color) and halt on hover; `motion-reduce:animate-none` stills them under reduced
 * motion (with the global CSS net) — the beats are already in tokens.md §motion's kill list.
 */
export function Motto() {
  return (
    <section id="contact" className="motto scroll-mt-[38px]">
      <Wrap>
        <span className="mb-[14px] block text-center font-mono text-[12.5px] tracking-[.02em] text-amber">
          ~/motto
        </span>
        <h2>
          You are the architect of yourself<span className="text-amber">.</span>
        </h2>
        <p className="sub">
          Anything within the laws of nature is buildable — most people just never
          start. I&apos;d rather build. If you&apos;re building too, let&apos;s find out
          what our systems can do together.
        </p>
        <div className="row">
          <a
            href={mailto()}
            className="btn-amber animate-beat-fill hover:animate-none motion-reduce:animate-none"
          >
            let&apos;s talk →
          </a>
          <a
            href={links.cv}
            download
            className="btn-ghost animate-beat hover:animate-none motion-reduce:animate-none"
          >
            download cv ⇩
          </a>
        </div>
      </Wrap>
    </section>
  );
}
