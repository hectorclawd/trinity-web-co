# Design suggestions (landing-page-design skill)

**Reviewed:** 2026-10-30, live site https://www.trinitywebdallas.com at main 902b143, desktop (1440 × 900) and phone (390 × 844), plus the source in `site/`.
**Skill:** `landing-page-design` from elayadesign/ai-design-skills (installed 2026-10-29).
**Status:** suggestions only. Nothing on the site was changed. Hector picks what gets built; each pick goes on a branch with a preview first.

The root `CLAUDE.md`, `site/CLAUDE.md` and the playbook win over the skill. Skill rules that clash with them are listed at the end, with the reason each one was left out.

## Build these first

| # | What | Where | Why (skill rule) |
|---|---|---|---|
| 1 | **Put one proof line in the hero.** On a phone the first screen ends at the hero buttons. The trust bar (PageSpeed 100, from $499) starts at 887 px, below the first screen. Add one short line under the hero buttons, for example "Both demo sites score 100 on mobile PageSpeed. See them", linking to `/demos/`. Take the number from `offer.demos.slots`, as the trust bar does. | `src/components/site/RiverHero.astro` (the `hero-note` line already has a style). Don't touch `path` or `stops`. | A2: every first screen needs one proof signal. The demo scores are real proof, so this follows the "no invented social proof" rule. |
| 2 | **Show the bottom booking bar only after the hero buttons scroll away.** On a phone's first screen there are two gold "Book" buttons, the hero's and the bar's, and the bar covers the river drawing. Hide the bar until the hero buttons leave the screen, using the IntersectionObserver that `BaseLayout.astro` already has. | `src/layouts/BaseLayout.astro` script, `.float-bar` in `src/styles/site.css`. | A4: one primary button per screen, no competing buttons. It also keeps the signature river visible on the first screen. |
| 3 | **Put the terms that lower the risk next to the booking buttons.** For example, one line under the final call-to-action band and under each price card: "Your price in writing before any work starts. The care plan is optional; cancel with 30 days' notice." Both come from the playbook and are already on the site, just not beside the buttons. | `site.cta` in `src/content/site.ts`, the CTA band in `index.astro` and `services.astro`, price cards in `services.astro`. | A4: show at least one risk reducer, next to the decision. Leave out "deposit refundable until kickoff" until the attorney confirms that wording (playbook §4). No guarantees or trials that aren't in the playbook. |

## Worth doing

| # | What | Where | Why |
|---|---|---|---|
| 4 | **Put the proof next to the claim on the home page.** The "Load fast" card says hand-built pages load fast but gives no number. Add "Both demos score 100 on mobile PageSpeed", as `/services/` already does in "Fast on a weak signal". | `offer.features.items` in `site.ts` (or the card in `index.astro`). | A4: proof sits beside the claim it supports. |
| 5 | **Cut the home page's "What your new site will do" from 6 cards to 4.** On a phone the section is about 2,160 px tall, roughly 2.5 screens. "Stay yours" repeats the trust bar's "Yours", and "Get looked after" repeats the care plan. Keep "Show up when people search nearby", "Work on every phone", "Turn a visit into a call" and "Load fast". | `offer.features.items` in `site.ts`, `featureIcons` in `index.astro`. | A2 and A8: three to five benefits, no long feature lists. |
| 6 | **Answer the top 3 questions on the home page.** Right now the FAQ is only on `/services/`. Add "Do I own the website?", "How long does it take?" and "Do I have to sign up for a care plan?" above the final call-to-action band, with a link to all questions (`/services/#faq`). | `index.astro`, reusing `.faq` styles and `site.faqs`. | A2: the bottom of the page handles objections (FAQ, then the final button). |
| 7 | **Add FAQ schema to `/services/`.** The FAQ is already plain questions and answers. Adding `FAQPage` JSON-LD from `site.faqs` helps AI answers and search read it. The site only has LocalBusiness schema now. | `services.astro` (one extra JSON-LD block, escaped the way `BaseLayout.astro` escapes its own). | A7: SEO and AEO for evergreen pages. |
| 8 | **Fix the "All five steps" link.** The home page button goes to the top of `/contact/`, but the five steps sit further down that page. Give the contact page's steps section `id="process"` and link to `/contact/#process`. | `index.astro`, `contact.astro`. | B9: links go where their label says. |
| 9 | **Use one name for the main button.** Right now: "Book a free 20-minute call" (hero, contact heading), "Book a free call" (header, bottom bar, final band), "Pick a time for your call" (contact). Use "Book a free 20-minute call" wherever it fits and "Book a free call" in the header and bottom bar. Keep "Book a call about Growth/Launch" on the price cards, since that label says which package. | `site.ts` (`hero`, `cta`, `headerCta`), `contact.astro`. | A2: the final button matches the top one, so the action reads as one clear step. |

## Small polish

| # | What | Where | Why |
|---|---|---|---|
| 10 | **Use one easing curve.** Scroll reveals fade with the browser's default `ease`, the demo image hover uses `.8s ease`, and buttons and cards use the default curve. Add one `--ease: cubic-bezier(0.22, 1, 0.36, 1)` and use it everywhere. Hover times are already 200 ms or more. | `src/styles/site.css` | B7: motion decelerates into place, no default curves. |
| 11 | **Add a press state to buttons:** `.btn:active { transform: translateY(1px); }`. | `site.css` | B9: every button gives physical feedback when tapped. |
| 12 | **Show the hero headline sooner.** Its words fade in one by one over about 1.2 s. It's the biggest text on the page, so on a slow phone the first look is a mostly empty hero. Start the words partly visible, or shorten the stagger from 70 ms to about 40 ms. | `site.css` (`word-up`, `.hero h1 .w`) | B7: motion supports the content and never hides it. Lighthouse is still 100, so this is a feel issue, not a score issue. |
| 13 | **Animate the phone menu.** The menu icon swaps instantly and the menu drops down as a small panel. The skill suggests the icon turning into an X, and links that fade up one after another (60 ms apart, 400 ms max). Reduced motion keeps it instant. | `SiteHeader.astro`, `BaseLayout.astro` script, `site.css` | B7 navigation. Optional; your call. |
| 14 | **Optional "tagline" moment.** One large-type line between the demos and the About section, for example "A neighbor, not an agency. You deal with me directly." Each word goes from faded to full color as it scrolls into view. Plain text when reduced motion is on. | `index.astro`, a few lines in the `BaseLayout.astro` script | B11 calls this mandatory; our `CLAUDE.md` makes it optional. It adds motion and JS, so only if you like it. |
| 15 | **Shorter About text on the home page.** On a phone the About section is about 1,850 px tall (5 paragraphs plus the promise list and niche pills). Keep 2 paragraphs and the signature there, and the full story where you want it. Pairs well with adding the headshot. | `site.about` in `site.ts`, `index.astro` | A8: mobile layouts must stay easy to read. It's your story, so only with your wording. |

## Already passing

One offer, one audience and one main action (book a free call). Specific numbers instead of vague claims. Sentence case. None of the skill's banned filler words or "Learn more" buttons. Current page marked in the nav. Visible focus rings. Inline form errors and a "Sending…" state. Branded 404, privacy page, skip link, favicon, share tags and alt text. Scroll reveals use IntersectionObserver, run once, and respect reduced motion. No sideways scroll on a phone.

## Skill rules left out on purpose

| Skill rule | Why we don't follow it |
|---|---|
| Fonts: Geist, Manrope, Geist Mono or Poppins only | Brand is Archivo only (root `CLAUDE.md`). |
| Hero heading in a black-to-grey or white-to-grey gradient | Not in the brand colors. Plain text stays. |
| Testimonials, a customer logo strip, invented names and logos (A2, B8) | Never invent social proof. Add real reviews only after real clients agree (`site/CLAUDE.md`). The demo scores are the proof for now. |
| Free trial, money-back guarantee | Only terms that are in the playbook (see #3). |
| Ultra-bold cap (700 max) | The heavy, wide Archivo headlines (820 weight, 125% width) are the brand look. Keep them. |
| No hyphens in copy ("20-minute", "tap-to-call") | These are correct English for words used together as one modifier, and the voice is plain. Rewriting them adds nothing. |
| Snap every size and gap to Tailwind's scale | The site stopped using Tailwind in the 2026-10-27 redesign. Snapping 17 px body text and similar sizes would be churn with no visible gain. |
| Flat backgrounds only (no gradients) | The hero, inner page heads and final call-to-action band have soft radial glows. The brand rules don't mention them. **Your call:** keep them (my pick, they're subtle) or flatten them. |
| Floating pill-shaped nav bar | The header is already sticky, see-through and blurred. A floating pill is a style choice with no gain for a 3-link nav. |
| Icons from Phosphor, Solar or Iconamoon | The site's own inline icons (`Icon.astro`) are light and consistent. Not worth a swap. |
| Terms link in the footer | There's no terms page. The terms are in the written proposal and contract. |
