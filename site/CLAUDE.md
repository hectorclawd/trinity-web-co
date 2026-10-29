# Trinity Web Co. website (trinitywebdallas.com)

Hector's own site: home, services and pricing, demo sites, contact and privacy pages. First built from `templates/site-template/`; redesigned 2026-10-27 from a website-rebuilder run (Hector's call), so it no longer shares the template's components or Tailwind styles. Follow the root `CLAUDE.md` and `business/playbook.md`. This file covers only what's specific to this site.

## Rules

- **Prices, packages and the care plan must match `business/playbook.md` §2–3.** Change the playbook first, then `offer` in `src/content/site.ts`. Never hard-code a price in a component.
- **Never invent social proof.** There are no reviews or client logos on this site until real ones exist, with permission. Demo sites are for made-up businesses and are always labeled "Demo" (playbook §7).
- Voice: first person ("I"), plain and friendly, sentence case. No hype, no fake urgency, no ranking promises. Don't lead with "I use AI."

## Where things are

- `src/content/site.ts`:
  - `site`: business facts, nav, FAQ, SEO, form endpoint (template shape).
  - `offer`: what the studio sells: features, niches, packages, care plan, demo slots, process, promises, contact copy.
- `src/content/types.ts`: the template types, plus the Trinity-only types at the bottom (`Package`, `CarePlan`, `DemoSlot`, `StudioOffer`).
- `src/pages/`: `index`, `services`, `demos`, `contact` (the Formspree form and its script), `privacy`, `404`. Each reads its copy and prices from `site.ts`.
- `src/components/site/`: `SiteHeader`, `SiteFooter` (with the bar at the bottom of phone screens: "Book a free call", since the site has no phone number by Hector's choice, 2026-10-29), `Icon`, and `RiverHero`. RiverHero keeps its scoped CSS and scroll animation; `site.css` recolors it for the dark hero through the old `--color-*` names. **Don't change the shape of its `path` and `stops`**: the Instagram kit's `npm run sync` reads them.
- `src/layouts/BaseLayout.astro`: meta tags, schema, analytics and the call/text/form tracking, plus the menu, scroll reveal and counter script.
- `src/styles/site.css`: all styles, with the brand colors as variables at the top and Archivo's width axis via `@fontsource-variable/archivo/wdth.css` (self-hosted: the CSP blocks Google Fonts).
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
