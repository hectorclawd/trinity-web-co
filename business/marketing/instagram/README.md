# Trinity Web Co. Instagram kit

The brand kit and shared HyperFrames pieces for @trinitywebco's 20 Instagram pieces, each in English and Spanish. The plan (scripts, posting order, rules) is Hector's Claude Docs document "Instagram content plan", linked from `business/marketing/instagram-content-plan.md`. Brand rules come from the root `CLAUDE.md`; prices come only from `business/playbook.md` §2–3.

## What's here

| Path | What it is |
| --- | --- |
| `config.ts` | Every fact a piece shows: name, handle, DM keywords (CHECK / REVISAR), prices, the demos' PageSpeed score and load time, small labels in both languages. Edit here, then `npm run sync`. |
| `brand/kit.css` | Color tokens (from `site/src/styles/tokens.css`), type scale, spacing, safe zones, and the badge, bubble, caption and guide styles |
| `brand/kit.js` | The runtime every composition loads: language, strings, prices, springs, the bridge and river drawings, badges, bubbles, captions, safe-zone guides |
| `brand/generated.js` | Written by `npm run sync` from `config.ts`, the site's river and logo. Don't edit. |
| `brand/river.svg` | The river line drawing as a standalone file that draws itself in when opened. Generated, don't edit. |
| `brand/logo-mark.svg` | The bridge logo, copied from `site/public/` by `npm run sync` |
| `brand/fonts/` | Archivo (variable width and weight, Latin and Latin Extended) and its license |
| `compositions/end-card.html` | The Reel end card (1080×1920). Every Reel ends on it. |
| `compositions/captions.html` | The burned-in caption track for Reels |
| `compositions/carousel-slide.html` | The carousel slide frame (1080×1350) |
| `compositions/story-frame.html` | The story frame (1080×1920) |
| `samples/` | Review samples: R1's end card, C1's cover, the empty story frame |
| `index.html` | Kit preview (captions, then the end card, safe zones on). What `npm run dev` opens and `npm run check` audits. |
| `frame.md`, `BRIEF.md` | The brand spec and brief HyperFrames reads |
| `out/` | Renders. Git-ignored. |

Pieces go in their own folders as they're built (`r1/`, `c1/` …), each with `en` and `es` scripts, its entry `.html`, and `audio/` for the voiceovers.

## Commands

Run these from this folder.

```bash
npm run sync                                   # after editing config.ts; stops if a price differs from the playbook
npm run dev                                    # Studio preview of index.html
npm run check                                  # lint, layout, contrast
npm run samples                                # renders the review samples into out/samples/
npm run piece -- r1/r1.html --lang both        # a Reel: out/r1/r1-en.mp4 and r1-es.mp4, plus last-frame PNGs
npm run piece -- c1/c1.html --lang both --still   # a carousel: one PNG per slide, per language
npm run piece -- r1/r1.html --guides           # same, with Instagram's safe zones drawn on (never post these)
```

## How a piece uses the kit

A piece's entry file is a standalone HyperFrames composition at its real size. It:

1. Declares `lang` (en/es) and `guides` variables, loads GSAP, `brand/generated.js`, `brand/kit.js` and `brand/kit.css`, and declares Archivo's `@font-face` inline (copy it from `samples/r1-end-card.html`).
2. Calls `TWC.init(window.__hyperframes.getVariables(), { transcript })` before anything else. Sub-compositions can't see the entry's variables, so this is how the language (and a Reel's word timings) reach the shared pieces.
3. Mounts the shared pieces with `data-composition-src`:
   - Reel: its scenes, `compositions/captions.html` on a track marked `data-track-kind="captions"` until the end card starts, then `compositions/end-card.html` for the last 4 s or so.
   - Carousel: `compositions/carousel-slide.html` once under the whole carousel (`data-variable-values='{"tone":"light","swipe":1}'`), and one slide of content per second on top.
   - Story set: `compositions/story-frame.html` under each frame.
4. Takes every price, name and keyword from `TWC.t()`, `TWC.price()`, `TWC.monthly()` and `TWC.dm()`, never typed in.

Look at `samples/c1-cover.html` for a slide and `samples/r1-end-card.html` for a Reel's ending.

## Design rules

- **Fonts and colors are the brand's**, not the Apple skill's or HyperFrames' defaults: Archivo only, headlines wide (`font-stretch: 125%`), body at normal width; Ink, River, River deep, Limestone, Paper. Gold is only for primary buttons, so the DM keyword is a River message bubble, not gold.
- **Motion follows Apple's springs**: `TWC.motion.move` (response 0.4 s, no bounce) for anything settling into place, `snappy` (0.3 s) for small things, and `momentum` (a little bounce) only after a flick, like a phone scroll. Strokes draw with the site's own river curve. Things arrive the way they'd leave.
- **Safe zones**: on 9:16 frames, no text in the top 250 px or the bottom 350 px, and nothing important right of x 880 below y 1060 on Reels (the like, comment and share buttons). On 4:5 slides, the profile grid trims 34 px from each side, so keep text inside the 88 px margins. `--guides` draws all of this.
- **Captions** show one short phrase at a time in ink pills: a new phrase after a 0.5 s pause or a sentence end, and anything longer than 6 words or 2.5 s split evenly.
- **The "Demo" badge** (`TWC.badge("demo", lang)`) stays on screen the whole time a demo is visible; the **"Example" badge** marks made-up examples that aren't our demos (R6's menu).
- The demos' PageSpeed score and load time in `config.ts` are real: mobile PageSpeed Insights on the production demos, re-measured after the 2026-10-29 redesign. If a demo changes, re-measure, update `config.ts` and re-render the pieces that show them.

## Gotchas

- Paths in compositions are from this folder (`brand/kit.css`, `compositions/end-card.html`), even in files under `samples/` or a piece folder.
- HyperFrames only accepts `@font-face` declared in the composition file itself, so each file repeats Archivo's two `@font-face` rules. A linked stylesheet's `@font-face` renders but fails lint.
- Strokes draw from their measured length (`getTotalLength`). SVG `pathLength="1"` dashes didn't animate smoothly here.
- Archivo's Latin subset has no → arrow; use `TWC.arrow()`.
- The npm scripts pin HyperFrames 0.8.140. `scripts/render.mjs` uses the same pin, or `HYPERFRAMES_CLI` if set.
