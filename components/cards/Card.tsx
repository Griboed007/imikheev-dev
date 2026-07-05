"use client";

import type { ReactNode, PointerEvent } from "react";
import Link from "next/link";
import { cardClass, type CardVariant } from "./skins";

/**
 * Card shell (mockup `.card` + cursor spotlight). The radial highlight follows the pointer
 * via `--mx/--my` written on the card element — direct manipulation, not an animation, so
 * it stays under reduced motion (the hover transitions in CSS are what the global net
 * kills). Polymorphic tag: internal `link`, external `ext` (new tab), `button`, or `div`.
 */
type Common = {
  variant?: CardVariant;
  xtra?: boolean;
  children: ReactNode;
};
type Poly =
  | { as: "link"; href: string }
  | { as: "ext"; href: string }
  | { as: "button"; onClick?: () => void }
  | { as: "div" };

export function Card(props: Common & Poly) {
  const { variant = "plain", xtra = false, children } = props;
  const cls = cardClass(variant, xtra);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  if (props.as === "link") {
    return (
      <Link className={cls} href={props.href} onPointerMove={onPointerMove}>
        {children}
      </Link>
    );
  }
  if (props.as === "ext") {
    return (
      <a
        className={cls}
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        onPointerMove={onPointerMove}
      >
        {children}
      </a>
    );
  }
  if (props.as === "button") {
    return (
      <button className={cls} onClick={props.onClick} onPointerMove={onPointerMove}>
        {children}
      </button>
    );
  }
  return (
    <div className={cls} onPointerMove={onPointerMove}>
      {children}
    </div>
  );
}
