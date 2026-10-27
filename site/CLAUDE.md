# Trinity Web Co. website (trinitywebdallas.com)

Hector's own one-page site, built from `templates/site-template/`. Follow the root `CLAUDE.md` and `business/playbook.md`. This file covers only what's specific to this site.

## Rules

- **Prices, packages and the care plan must match `business/playbook.md` §2–3.** Change the playbook first, then `offer` in `src/content/site.ts`. Never hard-code a price in a component.
- **Never invent social proof.** There are no reviews or client logos on this site until real ones exist, with permission. Demo sites are for made-up businesses and are always labeled "Demo" (playbook §7).
- Voice: first person ("I"), plain and friendly, sentence case. No hype, no fake urgency, no ranking promises. Don't lead with "I use AI."

## Where things are

- `src/content/site.ts`:
  - `site`: business facts, nav, FAQ, SEO, form endpoint (template shape).
  - `offer`: what the studio sells: features, niches, packages, care plan, demo slots, process, promises, contact copy.
- `src/content/types.ts`: the template types, plus the Trinity-only types at the bottom (`Package`, `CarePlan`, `DemoSlot`, `StudioOffer`).
- `src/components/`: template components used here (Header, Footer, CTABand, FAQ, ContactForm). **Fix bugs in these in `templates/site-template/` too**, so client sites get the fix.
- `src/components/site/`: site-only components (RiverHero, Features, Niches, Packages, CarePlans, DemoSlots, Process, About, PageRiver). They use scoped CSS ported from the original design.
- `PageRiver.astro`: the river that flows on down the page after the hero, behind the content: it runs off screen and back, slips behind cards, screenshots and the How it works phone, and names a nearby city in the open space by each heading it lists. Section content sits above it because it sets `#main .wrap` to `position: relative; z-index: 1`. To change a city or where it shows, edit the `stops` list at its top.
- `src/styles/tokens.css`: brand tokens (see the root CLAUDE.md) and Archivo's width axis via `@fontsource-variable/archivo/wdth.css`.
- `public/og-image.png`: 1200×630 share image. Regenerate it if the headline changes.

## Demo slots

Two slots in `offer.demos.slots`. While a slot has no `url`, the site says the demo is in progress. When a demo goes live, add:
- `url`
- `image` (import a screenshot from `src/assets/`) and `imageAlt`
- `pageSpeed` (mobile PageSpeed performance score)

## Commands

`npm run dev` · `npm run check` · `npm run build` · `npm run preview` · `npm run qa:links`. `/qa` runs the full pre-launch checks into `docs/qa-report.md`.

Hosting: Vercel (playbook §5). Security headers and CSP are in `vercel.json`; the form posts to Formspree, so `connect-src` and `form-action` allow `formspree.io`.

## Before launch

- [x] Formspree form ID: replace `REPLACE_ME` in `site.forms.contactEndpoint` (2026-10-21: `xvkzedbz`).
- [x] Domain `trinitywebdallas.com` (chosen 2026-10-21) registered in Hector's own registrar account and pointed at Vercel (live 2026-10-26; www is the main address).
- [x] The 2 demo sites built, then the slots filled in (2026-10-26: production urls and mobile PageSpeed scores).
- [ ] Headshot and your own story for the About section.
