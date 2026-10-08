---
description: Run the pre-launch QA checklist and write docs/qa-report.md
---

Run the playbook's pre-launch QA (section 5) and record the results in `docs/qa-report.md`. Report honestly: a failing check is written down as failing, with the numbers.

1. `npm run check`: must be 0 errors.
2. `npm run build`: must succeed.
3. `npm run qa:links`: no broken internal links.
4. Search `src/` and `dist/` for `[Sample`, `REPLACE_ME`, `{{` and lorem ipsum, skipping `src/lib/format.ts` (its `isPlaceholder()` checks for `REPLACE_ME` on purpose). Each other hit fails "No placeholder text".
5. Start `npm run preview` in the background. Then:
   - Lighthouse mobile, 3 runs on the homepage and one inner page: `npx lighthouse <url> --quiet --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=<scratch file>`. Record the median of each score and the LCP. Targets: Performance 90+, Accessibility 95+, LCP under 2.5 s.
   - Playwright screenshots of every page at 360, 390, 768, 1024 and 1440px. Check each width for sideways scrolling (`document.documentElement.scrollWidth > innerWidth`), and look at the screenshots for anything broken.
   - Header on one line: at 768, 1024 and 1280px wide, the business name, every visible nav link and the header button must each sit on a single line. Run this in the page and expect `[]`:
     ```js
     [...document.querySelectorAll('header .brand-name, header nav a, header button')]
       .filter((el) => el.offsetParent) // skip the nav while it's folded into the Menu button
       .filter((el) => {
         const range = document.createRange();
         range.selectNodeContents(el);
         const tops = [...range.getClientRects()].map((r) => r.top).sort((a, b) => a - b);
         return tops.some((top, i) => i > 0 && top - tops[i - 1] > 4); // a second line of text
       })
       .map((el) => el.textContent.trim());
     ```
     Anything it returns fails "Header on one line". The usual fix is to show the Menu button up to 1023px: in `src/components/Header.astro`, change `md:hidden` to `lg:hidden` and `max-width: 47.99rem` to `max-width: 63.99rem`, then check again. Don't shorten the business name to make it fit.
   - On a phone width: the main call to action is visible without scrolling, the menu opens and closes, and `tel:` links are present.
   - Keyboard: tab through the homepage and confirm focus is always visible.
6. Check every page's built HTML for: one `<h1>`, a title under 60 characters, a description under 155, a canonical URL, and an `og:image`.
7. Check that `dist/` has no inline executable `<script>` (only `application/ld+json` may be inline), so the CSP in `vercel.json` won't block anything.
8. Fill the "Automated results" table and tick every checklist box you verified. Leave unticked the items only Hector can do (real iPhone and Android, form delivery to the client's inbox, Rich Results Test, test booking), and list them at the end as "Hector to check by hand".
9. Stop the preview server. Summarize: passed, failed (with numbers and the fix you suggest), and the hand-check list.
