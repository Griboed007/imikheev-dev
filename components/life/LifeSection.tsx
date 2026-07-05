import { Section } from "@/components/primitives/Section";
import { Ext } from "@/components/primitives/Ext";
import { links } from "@/lib/links";
import {
  getCoffee,
  getRide,
  getFieldNotes,
  getShelf,
  getPhotos,
} from "@/lib/telemetry";
import { IgShuffle } from "./IgShuffle";
import {
  BookGlyph,
  ChargeHyveLogo,
  GearGlyph,
  RideMap,
  RideWheels,
  SteamGlyph,
} from "./glyphs";

/** Pulsing amber "live" badge (mockup `.badge.b-live`). */
function LiveBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="badge b-live">
      <span className="dot" aria-hidden="true" />
      &nbsp;{children}
    </span>
  );
}

/**
 * ~/life (mockup `#life`, "Off the clock"): five tiles + the shelf, every value pulled from
 * git-versioned telemetry (coffee/ride/field-notes/shelf + the photo manifest) — editing a
 * JSON file moves the tile AND the ticker on the next deploy, no code edit. Server component;
 * only the photo shuffle and the `more` toast are client islands. The gear tile is static
 * (equipment, not commit-cadence telemetry — deliberately not one of the five files).
 */
export function LifeSection() {
  const coffee = getCoffee();
  const ride = getRide();
  const notes = getFieldNotes();
  const shelf = getShelf();
  const photos = getPhotos();

  return (
    <Section
      id="life"
      path="life"
      title="Off the clock"
      note="the human layer — also live, also reacts"
    >
      <div className="life">
        {/* photography — the shuffling IG strip */}
        <div className="tile">
          <IgShuffle frames={photos.frames} />
          <div className="body">
            <span className="k">photography · shuffling</span>
            <span className="d">
              A rotating strip from the feed — frames shuffle, the EXIF follows the lens.
            </span>
            <Ext href={links.instagram} className="ext">
              @ivan_von_terrible ↗
            </Ext>
            <span className="badge b-slot">ig feed slot</span>
          </div>
        </div>

        {/* cross-country — wheels, a drawn route, gpx badge */}
        <div className="tile">
          <div className="body">
            <span className="k">cross-country</span>
            <RideWheels />
            <span className="v">{ride.bike}</span>
            <span className="d">
              {ride.notes}{" "}
              <Ext href={links.pressInterview} className="ext">
                {ride.pressLabel}
              </Ext>
            </span>
          </div>
          <RideMap />
          <div className="body" style={{ flex: 0, paddingTop: 0 }}>
            <LiveBadge>gpx feed</LiveBadge>
          </div>
        </div>

        {/* the grinder — coffee */}
        <div className="tile">
          <div className="body">
            <span className="k">in the grinder · {coffee.roaster}</span>
            <SteamGlyph />
            <span className="v">{coffee.name}</span>
            <span className="d">
              {coffee.notes}{" "}
              <Ext href={links.beans} className="ext">
                the beans ↗
              </Ext>
            </span>
            <LiveBadge>live</LiveBadge>
          </div>
        </div>

        {/* the gear — static equipment, aperture turns on hover */}
        <div className="tile">
          <div className="body">
            <span className="k">the gear</span>
            <GearGlyph />
            <span className="v">Fujifilm X-T2</span>
            <span className="d">
              Fujinon 56mm f/1.2 · 18-55mm · 55-230mm — the prime for people, the zooms
              for the road. Hover: the aperture turns.
            </span>
            <span className="badge b-slot">gear</span>
          </div>
        </div>

        {/* field notes — ChargeHyve visit */}
        <div className="tile">
          <div className="body">
            <span className="k">field notes · ecosystem</span>
            <ChargeHyveLogo />
            <span className="v">{notes.title}</span>
            <span className="d">{notes.notes}</span>
            <Ext href={links.chargehyvePost} className="ext">
              {notes.linkLabel}
            </Ext>
            <span className="badge b-slot">field notes feed</span>
          </div>
        </div>
      </div>

      <div className="mb-9 mt-[44px] flex items-baseline justify-between gap-4 border-b border-line pb-[14px]">
        <h2 className="font-mono text-[1.05rem] font-medium tracking-[-.01em]">
          The shelf
        </h2>
        <span className="font-mono text-[12px] text-ink-mute">
          currently reading — hover the spines
        </span>
      </div>
      <div className="shelf">
        {shelf.books.map((b) => (
          <div className="book" key={b.title}>
            <BookGlyph glyph={b.glyph} />
            <div className="bt">{b.title}</div>
            <div className="bn">{b.note}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
