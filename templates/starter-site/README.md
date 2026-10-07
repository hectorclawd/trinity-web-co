# Starter site

A plain HTML/CSS starting point for a local-business client site. No build step: deploy the folder as-is to Cloudflare Pages.

**Sections:** header with tap-to-call, hero, services, about, reviews, hours and location, contact form, footer, and a sticky call bar on phones. `LocalBusiness` JSON-LD, Open Graph tags, security headers, `robots.txt`, `sitemap.xml` and a 404 page are included.

## Start a client site

1. Copy this folder to `clients/<client>/site/`.
2. **Find every placeholder:** `grep -rn "{{" .`. The site isn't ready to launch while any are left.
3. **Make it theirs.** Change the tokens at the top of `styles.css`: brand and accent colors, fonts (update the Google Fonts link in `index.html` too) and radius. A client site shouldn't look like the starter with new colors. Pick type and color from their business: their signage, their space, their trade.
4. Add photos to `images/`: `hero.jpg`, `about.jpg` and `og-image.jpg` (1200×630). Export as WebP or compressed JPG, ideally under 200 KB each, and update the `width`/`height` attributes to match.
5. Set the hours in two places: the visible table and the JSON-LD `openingHoursSpecification`.
6. Create a Formspree form in the client's name (or ours, forwarding to them), and paste the ID into the form `action`.
7. Delete any section the client doesn't need. **Delete the reviews section if there are no real reviews yet. Never write placeholder reviews.**
8. Go through the pre-launch checklist in `business/playbook.md`.

## Placeholders

| Placeholder | Example |
|---|---|
| `{{BUSINESS_NAME}}` | Lopez Family Plumbing |
| `{{DOMAIN}}` | lopezplumbingdallas.com |
| `{{PHONE_E164}}` | +12145550123 (used in `tel:` links and schema) |
| `{{PHONE_DISPLAY}}` | (214) 555-0123 |
| `{{SCHEMA_TYPE}}` | Plumber, Restaurant, HairSalon, Dentist, Store... (see schema.org/LocalBusiness) |
| `{{URL_ENCODED_ADDRESS}}` | 123+Main+St+Dallas+TX+75201 |
| `{{LAT}}`, `{{LNG}}` | From Google Maps: right-click the pin |
| `{{FORMSPREE_ID}}` | The ID from the form's Formspree endpoint |

## Adding pages

For Storefront and Growth packages, copy `index.html` to `services.html`, `about.html` and so on. Keep the header and footer identical, give each page its own `<title>`, description and canonical URL, and add each page to `sitemap.xml`.

## If the client wants an embedded map

Add the Google Maps embed `<iframe>` with `loading="lazy"`, then add `frame-src https://www.google.com` to the Content-Security-Policy in `_headers`.
