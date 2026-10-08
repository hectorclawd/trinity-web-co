# QA report: {{BUSINESS_NAME}}

The playbook's pre-launch QA checklist (section 5). `/qa` fills in what it can check automatically. Hector checks the rest by hand. **Don't launch until every box is ticked** and the playbook section 4 launch checklist is done.

**Run on:** {{date}} · **Commit:** {{hash}} · **Preview URL:** {{url}}

## Automated results

| Check | Result |
|---|---|
| `npm run check` | |
| `npm run build` | |
| Link check (`npm run qa:links`) | |
| Lighthouse mobile, median of 3 (Performance / Accessibility / Best Practices / SEO) | |
| Largest Contentful Paint (mobile) | |
| Leftover `[Sample` / `REPLACE_ME` / `{{` | |
| Screenshots (360, 390, 768, 1024, 1440) | |
| Header on one line (768, 1024, 1280) | |

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
