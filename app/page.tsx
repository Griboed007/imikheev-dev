import { getTicker } from "@/lib/telemetry";
import { Tickbar } from "@/components/shell/Tickbar";
import { Hero } from "@/components/hero/Hero";
import { StarTrail } from "@/components/hero/StarTrail";
import { BgMap } from "@/components/map/BgMap";
import { SystemMapSection } from "@/components/map/SystemMapSection";

/**
 * Home. Layering (the v0.7 fix): BgMap is a fixed canvas at z-0, StarTrail a fixed canvas
 * at z-3, and the page content sits between them at z-1 (`relative z-[1]`) so the blurred
 * twin reads *behind* everything. Sections land in proposal order; 005+ add the rest.
 */
export default function Home() {
  const ticker = getTicker();
  return (
    <>
      <BgMap />
      <StarTrail />
      <main className="relative z-[1]">
        <Tickbar items={ticker} />
        <Hero />
        <SystemMapSection />
      </main>
    </>
  );
}
