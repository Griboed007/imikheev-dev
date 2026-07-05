# Design tokens — phosphor & espresso (v0.8)

Source of visual truth alongside `design/reference/portfolio-mockup-v0.8.html`.
Map these 1:1 into `tailwind.config.ts`. Do not invent values.

## Color

| token | value | use |
| --- | --- | --- |
| bg | `#0E0C0A` | page (also set on `html` — mobile webview parity) |
| panel | `#151210` | cards, bands |
| panel2 | `#1C1814` | nested surfaces, kbd |
| line | `rgba(237,230,218,.10)` | hairlines |
| line-strong | `rgba(237,230,218,.20)` | emphasized borders |
| ink | `#EDE6DA` | primary text (warm paper) |
| ink-dim | `rgba(237,230,218,.64)` | body |
| ink-mute | `rgba(237,230,218,.38)` | meta |
| amber | `#F5A742` | LIVE / interactive / now — semantic, not decorative |
| amber-bg | `rgba(245,167,66,.12)` | amber chip fills |
| teal | `#3ECFAE` | VERIFIED outcomes only (metrics, shipped) |
| teal-bg | `rgba(62,207,174,.12)` | shipped chips |
| clay | `#DA7756` | the Claude spark, nothing else |
| dg-blue | `#6B9BFF` on `#10141C` | deckgen card skin only |
| tk-violet | `#8B5CF6` on `#100E16` | tracker card skin only (cols: `#5B8DEF`, `#E8A33D`, `#34D399`) |
| tanwall | `#C89058` | bike tires only |

Selection: amber bg, `#1A130A` text. Focus-visible: 2px amber, offset 3.

Status chips: shipped/delivered=teal · live/advising/piloted=amber · sunset/exited=mute.

## Type

- Mono: IBM Plex Mono 400/500/600 — display, headings, all meta/data, eyebrows.
- Sans: Instrument Sans 400/500/600 — body and card copy only.
- Hero h1: mono 600, `clamp(2.5rem, 7.2vw, 5.2rem)`, lh 1.06, ls −.03em.
- Section h2: mono 500 1.3rem. Case h1: mono 600 `clamp(1.7rem,3.6vw,2.5rem)`.
- Body 16.5px/1.7. Meta mono 11–13px. Eyebrows: mono 12.5px amber, `~/path` form.

## Layout

wrap 1060px / 24px gutters · section pad 104px (72 mobile) · radius 12 (cards) 10 (sub)
6 (chips) · fixed statusline 38px + 2px progress · `scroll-margin-top` on anchors.

## Motion (complete inventory — every item is in the reduced-motion kill list)

| element | spec |
| --- | --- |
| reveal | opacity+14px rise, .6s `cubic-bezier(.16,1,.3,1)`, IO .12, once |
| hero lines | mask slide-up .9s same bezier, line2 +.12s |
| word cycle | decode 34ms/frame, pool `▖▘▝▗▚▞░▒/\_|·`, hold 2.3s, erase 40ms/char, pause 340ms |
| accent glow | text-shadow pulse 3.2s ease-in-out |
| caret / dots | blink 1.05s steps(1) · pulse 2.4s |
| orb | 1700 pts, rot .0022/f + scroll spin (decay ×.9), parallax lerp .05, dpr≤2, IO-paused |
| trail | ≤140 particles, spawn ≥13px move, mouse+touch, tap ripple |
| ticker | 42s linear loop desktop / 36s mobile bar, pause on hover |
| CTAs | border/color beat 3.2s (fill-glow variant on motto primary), halt on hover |
| spotlight | 320px radial amber .09 at cursor |
| small map | yaw `sin(t·.00022)·0.3`, depth scale/opacity .35–1, drift amp 4 |
| bg map | full rotation .0016/f, blur 5px, opacity .34, gated to `#map` proximity |
| counters | 1.5s ease-out-cubic, once (JS — reduced jumps to final value) |
| show-all | xtra cards fade+rise .5s on grid open |
| glyph hovers | .45–.5s same bezier (drill, waves, fan, cells, board chip, spokes 1.2s/180°, aperture .6s/60°) |
| edu glyphs | hover .5s same bezier: AR cube lift, stack assemble (b2/b3), integration diamond fill |
| hack glyphs | rings scale on hover; flow-dot travel 2.8s loop; orbit spin 7s loop (both speed up on hover) |
| toolbox glyphs | token travels the rail 3s linear loop (→1.1s on hover); waves/fan/drill/pulse/scribble hovers .3–.9s same bezier |
| monogram | static dot-matrix canvas (no motion); redraws on fonts.ready + resize |
| spark | rays scale-breathe 2.6s staggered (CSS); GSAP `+=360` 1.5s power2.inOut every ~8s |

Reduced motion: reveals instant; word static "adoption."; orb one frame; trail/bg map/
ticker/beats/spark loops off; counters show final values immediately; card hover fills
(dgfill/tk-mover) and show-all fadeup off; edu/hack/toolbox glyph hovers and the fdot/spinme/
tok loops off (monograms are static, unaffected).

## Never

Pure black, pure white, gradients as decoration, brand hexes outside their cards,
motion without a data meaning, `nowrap` on wrapping-length links.
