import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * External link primitive: safe defaults for target/rel. URLs are passed in — nothing
 * hardcodes a URL here (lib/links.ts owns the URL registry in a later change).
 */
export function Ext({
  href,
  children,
  className = "",
  ...rest
}: { href: string; children: ReactNode; className?: string } & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "className"
>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}
