---
description: Add a page built from the existing components
argument-hint: <page name, e.g. "gallery" or "service: duct cleaning">
---

Add a page: $ARGUMENTS

1. Check the package's page limit in `CLAUDE.md` (Starter 4, Growth 7, Premium 12) and count the current pages in `src/pages/`. If this page would go over the limit, stop and say so: it's a change order or an extra page add-on ($150), not free work.
2. If it's a service or area page, add an entry to `services` or `areas` in `src/content/site.ts` (or remove `page: false` from an existing one). The dynamic routes build the page, so don't create a new `.astro` file.
3. Otherwise, create `src/pages/<slug>.astro` using `BaseLayout` and the existing components (Hero, ServiceCard, Reviews, Gallery, FAQ, CTABand, ContactForm, MapEmbed, BookingEmbed, HoursList). Take every fact from `site.ts`; add new fields to `site.ts` and `types.ts` rather than hard-coding text that's really data.
4. Give the page a unique `title` (under 60 characters with the business name) and `description` (under 155), and exactly one `<h1>`.
5. Add it to `site.nav` in `site.ts` if it belongs in the menu. The footer and sitemap update automatically; confirm it appears in `dist/sitemap-0.xml` after building.
6. Run `npm run check` and `npm run build`, then screenshot the page at 390px and 1440px with Playwright and fix anything that looks off.
7. One commit: "Add <page name> page".
