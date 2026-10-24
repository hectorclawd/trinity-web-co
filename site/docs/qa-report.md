# QA report: Trinity Web Co. (trinitywebdallas.com)

The playbook's pre-launch QA checklist (section 5). `/qa` fills in what it can check automatically. Hector checks the rest by hand. **Don't launch until every box is ticked** and the playbook section 4 launch checklist is done.

**Run on:** 2026-10-24 (local preview build, not yet deployed) · **Commit:** 972cd9f (main) · **Preview URL:** http://localhost:4393/

The pricing section on this build shows the outreach kit's ranges (Launch $750–$1250, Growth $1500–$2500, care $50–$99/mo). Hector changed the prices again on the evening of 2026-10-24 (Launch from $499, Growth from $999, care $49/mo), and they're now on the site (pricing section, care plan, FAQ and meta description; merged f0eac2a). Recheck those on the next `/qa` run.

## Automated results

| Check | Result |
|---|---|
| `npm run check` | Pass: 0 errors, 0 warnings |
| `npm run build` | Pass: 3 pages (home, privacy, 404) |
| Link check (`npm run qa:links`) | Pass: 27 links, 0 broken |
| Lighthouse mobile, median of 3: homepage (Performance / Accessibility / Best Practices / SEO) | 98 / 100 / 96 / 100 |
| Lighthouse mobile, median of 3: privacy page | 99 / 100 / 96 / 100 |
| Best Practices note | Loses points for one console error: `/_vercel/insights/script.js` 404s locally. It only exists on Vercel, so it goes away once deployed |
| Largest Contentful Paint (mobile) | Homepage 1.99 s, privacy 1.67 s. Layout shift 0.005 and 0.001 |
| Lighthouse's other notes (not failures) | The How it works poster (`/media/build-clip-poster.webp`) loads before it's on screen and is a bit larger than its slot: about 15 KB of savings. Total blocking time 220 ms on the homepage |
| Leftover `[Sample` / `REPLACE_ME` / `{{` / lorem ipsum | Pass. The only hit is Astro's `class:list={{ … }}` syntax in `RiverHero.astro`, which is code, not placeholder text |
| No sideways scroll (360, 390, 768, 1024, 1440; home, privacy, 404) | Pass at every width on all 3 pages |
| Main call to action on a phone | Pass: "Book a free 20-minute call" sits at 538–586 px of a 780 px screen at 360 wide |
| Phone menu | Pass: opens with all 6 links, closes with Esc, and focus goes back to the Menu button |
| Keyboard focus | Pass: all 46 links, buttons and fields on the homepage show a visible focus style |
| Titles and descriptions | Pass. Home: title 54 characters, description 140. Privacy: 25 and 74. 404: 32 and 140 (and `noindex`) |
| One `<h1>` per page, canonical URL, `og:image` | Pass on all 3 pages |
| Inline executable `<script>` in `dist/` | Pass: none (only one `application/ld+json` block), so the CSP won't block anything |
| Images | Pass: no image over 200 KB, no JPG or PNG in the built page images, every `<img>` has alt text |
| Form | Posts to Formspree `xvkzedbz`, honeypot field (`_gotcha`) in place, success message "Request sent. I'll reply within one business day." |

## Mobile

- [x] Checked at 360, 390, 768, 1024 and 1440px wide, no sideways scrolling (2026-10-24)
- [ ] Tested on a real iPhone (Safari) and a real Android phone (Chrome)
- [x] Phone number is a `tel:` link; tap targets at least 44×44px. (2026-10-24, 3219683: (214) 730-8304 added as `tel:` and `sms:` links in the contact section, 44px tall at 375 wide, plus the footer, 404 page and schema)
- [x] Main call-to-action visible without scrolling on a phone

## Speed

- [x] Lighthouse mobile Performance 90+ (run 3 times, use the median): 98 home, 99 privacy
- [x] Largest Contentful Paint under 2.5 s on mobile: 1.99 s home, 1.67 s privacy
- [ ] Every image WebP/AVIF, sized for its slot, under 200 KB; below-the-fold images lazy-loaded. All WebP and under 200 KB, but the How it works video poster loads early and is slightly oversized (about 15 KB). A video poster can't use `loading="lazy"`, so the fix would be loading the clip later. Minor; Performance is already 98
- [x] No unused third-party scripts (none; Vercel Analytics is first-party)

## SEO

- [x] Unique title (under 60 characters) and meta description (under 155) on every page
- [x] Exactly one H1 per page, includes the service and city where natural ("Websites that bring Dallas customers in.")
- [ ] LocalBusiness schema passes Google's Rich Results Test; name, address, phone match the Google Business Profile exactly. Run the test on the live URL after launch; the Google Business Profile doesn't exist yet
- [x] `sitemap-index.xml` and `robots.txt` live; canonical URLs set; Open Graph image set. The canonical and share URLs use the bare domain; on launch day `www` becomes the main address and `site.url` changes to match (checklist, launch day)
- [x] Old URLs redirected; no broken links (link checker clean). No old URLs: the site has never been live

## Accessibility

- [x] Lighthouse Accessibility 95+: 100 on both pages
- [x] Text contrast at least 4.5:1; every image has meaningful alt text (or empty alt if decorative). Lighthouse contrast audit passes; every `<img>` has an alt
- [x] Whole site usable with keyboard only, visible focus outline (46 of 46 focusable elements; menu closes with Esc)
- [x] Form fields have labels; errors are announced in text, not just color (Lighthouse label audit passes; error text is tied to each field since 4305c3f)

## Forms and integrations

- [ ] Contact and quote forms deliver to the client's inbox (check spam folder too). A test from the preview reached hello@trinitywebdallas.com on 2026-10-21; repeat it on the live site on launch day
- [x] Spam protection on (honeypot) and a thank-you message or page shows
- [x] Booking embed loads on mobile and a test booking works. Not applicable: the site has no booking embed (contact is the form)
- [x] Map shows the right location; click-to-call and directions links work. No map (service-area business); the call and text links point at +12147308304

## Content and legal

- [ ] No placeholder text; spelling checked; hours, prices and phone confirmed with the client. No placeholders, but the prices are about to change (see the note at the top), so recheck after the new prices are on the site
- [x] Every review is real and attributed as the client provided it. The site has no reviews
- [x] Privacy policy page live (the site collects form data); footer shows the current year (2026)
- [x] 404 page and favicon in place (`/favicon.svg`)

## Still open before launch

1. **Prices:** put the 2026-10-24 evening prices on the site (queued in another session), then recheck pricing, FAQ and the meta description.
2. ~~Phone number~~: done 2026-10-24 (3219683).
3. **Headshot** for the About section (blocks launch per `CLAUDE.md`).

## Hector to check by hand

- Real iPhone (Safari) and real Android phone (Chrome): scroll the whole homepage, open and close the menu, send a test form.
- On launch day: send a form from the live site and confirm it reaches hello@trinitywebdallas.com (check spam).
- After launch: run Google's Rich Results Test on https://www.trinitywebdallas.com/.
- After launch: confirm Vercel Analytics records your visit and a test form event.
