---
description: Fill site.ts and set up the site from docs/intake.md
---

Set up this client site from the intake answers. Follow the Trinity Web Co. playbook (sections 2 and 5).

1. Read `docs/intake.md` and `CLAUDE.md`. If the package, business name, phone, email, hours or services are missing, stop and list what's missing. Don't guess.
2. Fill `CLAUDE.md`: replace every `{{...}}` placeholder from the intake.
3. Rewrite `src/content/site.ts` from the intake:
   - Copy facts exactly. Name, address and phone must match the Google Business Profile character for character.
   - `phone.e164` is `+1` followed by 10 digits. `phone.textable` only if the intake says texts are OK.
   - Pick the most specific schema.org `schemaType` for the niche (HVACBusiness, Plumber, Electrician, HousePainter, HairSalon, BarberShop, NailSalon, BeautySalon, AutoRepair, AutoWash, ExerciseGym, SportsActivityLocation, ...).
   - Reviews: only the ones the client listed, word for word, with the name and source as given. Starter shows 3; Growth and Premium show 6–8. Never write or improve a review.
   - Services and areas: write body copy from the intake in the client's tone. Area pages must say something specific to that area, not the same text with the city name swapped.
   - Quote form (Growth and Premium): the default wording and ZIP field suit trades. For a shop customers visit (barber, salon), set `forms.quoteHeading` and `forms.quoteSubmitLabel` (e.g. "Request a time") and `forms.quoteZip: false`.
   - Set `features` for the package (see the README table) and set `seo.title` (under 60 characters) and `seo.description` (under 155).
4. Remove what the package doesn't include:
   - Starter: delete `src/pages/services/`, `src/pages/areas/`, `src/pages/blog/`, `src/content/blog/` and the collection in `src/content.config.ts`; point service cards at `/#services` or omit `href`.
   - Growth: delete the blog pages and content; keep at most 2 service or area pages. List every service and area the client offers, and set `page: false` on the ones without their own page: they still show on the homepage, just without a link.
   - Premium: keep everything; delete the sample post once real posts exist.
   - Keep the page count within the package limit (4 / 7 / 12).
5. Brand: update `src/styles/tokens.css` (colors, fonts) from the intake's brand answers. Swap the `@fontsource-variable` package if the font changes (`npm install`, update the import). Check every text and button color pair for 4.5:1 contrast.
6. Images: put the client's photos in `src/assets/` (keep each under ~2,000px; Astro outputs WebP), update the imports in `site.ts`, and write real alt text. Replace `public/favicon.svg` and `public/og-image.jpg` (1200×630).
7. If there's a booking embed or another iframe, add its host to `frame-src` in `vercel.json`. If the form uses Web3Forms, it's already allowed.
8. Run `npm run check` and `npm run build`. Fix every error.
9. Vercel, previews only until launch day. A new project's first plain `vercel deploy` goes to **production** (it happened on our own site and on the first demo), so never run it without a target:
   - `npx vercel link --yes --project site-<client-slug>` (creates the project if it doesn't exist).
   - `npx vercel deploy --target=preview`, every time until launch.
   - `npx vercel ls site-<client-slug>`: the Environment column must say Preview. If a Production deployment is listed, remove it with `npx vercel remove <its URL> --yes` and tell Hector.
10. Search the repo for `[Sample`, `REPLACE_ME` and `{{` (skip `node_modules/`, `README.md`, `docs/qa-report.md`, which `/qa` fills, and `src/lib/format.ts`, which checks for `REPLACE_ME` on purpose), and list anything left with the reason (e.g. "waiting on Formspree ID").
11. Report what you filled, what you removed, and what's still missing from the client. One commit: "Set up site from intake".
