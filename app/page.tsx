import { getTicker } from "@/lib/telemetry";
import { Tickbar } from "@/components/shell/Tickbar";
import { Hero } from "@/components/hero/Hero";
import { StarTrail } from "@/components/hero/StarTrail";

/**
 * Home. StarTrail is a fixed full-page canvas (sits outside the flow). The Tickbar is the
 * first element of the mobile flow; the Hero (word cycle · orb · glow) is the first screen.
 * Map and the remaining sections arrive in 004+.
 */
export default function Home() {
  const ticker = getTicker();
  return (
    <>
      <StarTrail />
      <main>
        <Tickbar items={ticker} />
        <Hero />
      </main>
    </>
  );
}
