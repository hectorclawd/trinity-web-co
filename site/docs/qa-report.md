# QA report: Trinity Web Co. (trinitywebco.com)

The playbook's pre-launch QA checklist (section 5). `/qa` fills in what it can check automatically. Hector checks the rest by hand. **Don't launch until every box is ticked** and the playbook section 4 launch checklist is done.

**Run on:** 2026-10-07 (local preview build, not yet deployed) · **Commit:** not committed yet · **Preview URL:** http://127.0.0.1:4392/

## Automated results

| Check | Result |
|---|---|
| `npm run check` | Pass: 0 errors, 0 warnings |
| `npm run build` | Pass: 3 pages (home, privacy, 404) |
| Link check (`npm run qa:links`) | Pass: 11 links, 0 broken |
| Lighthouse mobile, median of 3 (Performance / Accessibility / Best Practices / SEO) | 99 / 100 / 96 / 100. Best Practices loses points for one console error: `/_vercel/insights/script.js` 404s locally and only exists on Vercel |
| Largest Contentful Paint (mobile) | 1.7–1.8 s |
| Leftover `[Sample` / `REPLACE_ME` / `{{` | 1 left: Formspree ID (`REPLACE_ME`) in `site.ts`; the form says "not connected yet" until it is set |
| Screenshots (360, 390, 768, 1024, 1440) | Checked at 360, 390 and 1440: no sideways scroll; mobile menu opens and closes (Esc too); form validation and the not-connected message work |
| Header on one line (768, 1024, 1280) | Pass (2026-10-08, commit 259d7ff): the business name, nav links and header button each sit on one line at all three widths. The Menu button shows up to 1023px (337ad90), so 768 checks the name and the Menu button; 1024 and 1280 check the full nav |

## Mobile

- [ ] Checked at 360, 390, 768, 1024 and 1440px wide, no sideways scrolling
- [ ] Tested on a real iPhone (Safari) and a real Android phone (Chrome)
- [ ] Phone number is a `tel:` link; tap targets at least 44×44px
- [ ] Main call-to-action visible without scrolling on a phone

## Speed

- [ ] Lighthouse mobile Performance 90+ (run 3 times, use the median)
- [ ] Largest Contentful Paint under 2.5 s on mobile
- [ ] Every image WebP/AVIF, sized for its slot, under 200 KB; below-the-fold images lazy-loaded
- [ ] No unused third-party scripts

## SEO

- [ ] Unique title (under 60 characters) and meta description (under 155) on every page
- [ ] Exactly one H1 per page, includes the service and city where natural
- [ ] LocalBusiness schema passes Google's Rich Results Test; name, address, phone match the Google Business Profile exactly
- [ ] `sitemap-index.xml` and `robots.txt` live; canonical URLs set; Open Graph image set
- [ ] Old URLs redirected; no broken links (link checker clean)

## Accessibility

- [ ] Lighthouse Accessibility 95+
- [ ] Text contrast at least 4.5:1; every image has meaningful alt text (or empty alt if decorative)
- [ ] Whole site usable with keyboard only, visible focus outline
- [ ] Form fields have labels; errors are announced in text, not just color

## Forms and integrations

- [ ] Contact and quote forms deliver to the client's inbox (check spam folder too)
- [ ] Spam protection on (honeypot) and a thank-you message or page shows
- [ ] Booking embed loads on mobile and a test booking works
- [ ] Map shows the right location; click-to-call and directions links work

## Content and legal

- [ ] No placeholder text; spelling checked; hours, prices and phone confirmed with the client
- [ ] Every review is real and attributed as the client provided it
- [ ] Privacy policy page live (the site collects form data); footer shows the current year
- [ ] 404 page and favicon in place
