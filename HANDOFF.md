# Trinity Web Co.: handoff

Last updated: 2026-10-12 (evening: demo improvements, template call bar, and production deploys paused). Written for a fresh Claude Code session picking this up with no other context.
Read `CLAUDE.md` (project rules, open items, launch checklist) and `business/playbook.md` (how the business runs) before changing anything. `CHECKLIST.md` holds the current DONE / TO DO list; a SessionStart hook (`.claude/hooks/checklist.js`) summarizes it at the start of every session.

## Where things stand

**2026-10-12 evening.** Both demos were improved on `improve-demo` branches, waiting for Hector's review before they're merged to `main`. Both demo slots on our site are filled on the `fill-demo-slots` branch, which isn't merged until launch day. Production deploys of our site are paused (see "Production is paused" below). No local servers are running. What to do next is in `CHECKLIST.md`.

(An earlier "do 2" message was meant for a different tab. Ignore it.)

## Cleanup on 2026-10-08

- **Two copies of this repo had drifted.** A second clone, `projects/trinity-web-co updates`, held another session's work on two branches: `project-readiness-checklist` (a project-readiness checklist in a spotlight card, `c1a812d`) and `cosmetic-polish` (process timeline, plan rows and `.btn-arrow` buttons, `4b116ea`), plus two untracked docs.
- **Committed the loose files on their own branches.** The docs went on `site-design-notes` (`5cd7375`); `21st-dev-feature-suggestions.md.md` was renamed to `.md`. The ignore rule for the local Codex `AGENTS.md` went on `ignore-agents-md` (`dea1a9d`).
- **Merged all four into `main` in that order**, with merge commits `8b325c0`, `6215e4a`, `712ab00` and `0ff56f4`. There were no conflicts. `npm run check` and `npm run build` in `site/` passed before the push. The spotlight card was then checked at 360 and 1440px.
- **Deleted the four merged branches** locally and on GitHub, after confirming each was in `main`. `main` is the only branch.
- **Deleted the `trinity-web-co updates` folder** after confirming it had no unpushed commits, stashes or untracked files. An `astro dev --port 4321` server from that folder was still running; it was stopped so the folder could be deleted.
- **The repo now lives only at `C:\Users\hlmpr\projects\trinity-web-co`.** Don't make a second clone; use branches here instead.

## Repos and deploys

| What | Local path | GitHub | Vercel |
|---|---|---|---|
| This repo (business docs, template source, our site) | `C:\Users\hlmpr\projects\trinity-web-co` (the only local copy) | `hectorclawd/trinity-web-co`: `main`, plus `fill-demo-slots` (demo slots filled, merge on launch day) | `trinity-web-co-site`, Git-connected, production builds paused. `fill-demo-slots` preview (2026-10-12, b8fb054): https://trinity-web-co-site-eotvorfkp-hlm10.vercel.app |
| Client template | `templates/site-template/` (source of truth) | `trinitywebco-sites/site-template`, private template repo, synced through 89fc6d7 (org commit 55282ea) | n/a |
| Demo 1: Purple Martin Heating & Air (HVAC) | `clients/purple-martin-air-lake-highlands/site` | `trinitywebco-sites/site-purple-martin-air-lake-highlands`: `main`, plus `improve-demo` (2026-10-12, waiting for review) | Same name, not Git-connected. Preview of `improve-demo`: https://site-purple-martin-air-lake-highlands-h10ea2kti-hlm10.vercel.app |
| Demo 2: Good Oak Barbershop (barber) | `clients/good-oak-barbers-oak-cliff/site` | `trinitywebco-sites/site-good-oak-barbers-oak-cliff`: `main`, plus `improve-demo` (2026-10-12, waiting for review) | Same name, not Git-connected. Preview of `improve-demo`: https://site-good-oak-barbers-oak-cliff-8xn49iw6z-hlm10.vercel.app |

- `clients/*/site/` are separate git repos and are git-ignored here. Commit and push each one on its own.
- Every Vercel project serves previews only, behind Vercel Authentication (a Vercel login). Prospects can't open the demos yet. That's deliberate: the demos go to production on launch day (see the launch checklist in `CLAUDE.md`).
- **Only `trinity-web-co-site` is connected to GitHub.** Pushing a branch builds a preview by itself. Pushing `main` is skipped (see below). The demo projects deploy only when you run `npx vercel deploy` in the demo repo.
- Vercel account: team `hlm10` (`team_BAKR7LKO83CePY1tgdUydUiI`), still on **Hobby** (non-commercial). Moving to Pro waits for the name and domain decision.

## What happened on 2026-10-07 and 10-08

- Built both demos from the template like a real client: repo from "Use this template", `docs/intake.md`, `/new-site`, `docs/site-plan.md`, `/qa`. Both are fictional and labeled with `demo: true`. Neither has reviews, licenses, team bios or photos; images are hand-written SVG. QA results are in each demo's `docs/qa-report.md`. Mobile Lighthouse medians are 98–100 and Accessibility is 100.
- Fixed 17 template problems found along the way. Each is its own commit in `templates/site-template/`, copied into the demos and synced to the org repo. The QA reports list them. The big ones:
  - `page: false` on services and areas.
  - Demo mode.
  - Quote form wording and an optional ZIP field.
  - `locality` for shops with no published street address.
  - The new "Header on one line" check in `/qa`.
  - The `/new-site` Vercel step.
- Applied the template fixes that fit to `site/`: header button wrap, form border contrast, footer link underline, the placeholder search, and the Menu button below 1024px. The header check passes on `site/` (`site/docs/qa-report.md`).
- Screenshots for the two demo slots are in `site/src/assets/demo-purple-martin.jpg` and `demo-good-oak.jpg`. The slots in `site/src/content/site.ts` are **not** filled yet; that waits for launch day.

## What happened on 2026-10-09

- **Hosting settled: staying on Vercel Pro.** Cloudflare would save about $240/yr but loses the call/text/form event tracking that care-plan reports rely on, plus about 30 files of rework. Logged in the playbook decisions log; revisit at 25+ clients.
- **Deployed a Vercel preview of `main`** (link in the table above). It's behind Vercel login; production (`trinity-web-co-site.vercel.app`) still returns 404, as intended.
- **Pre-launch checks passed** at 360 and 1440px on a local production build (`astro build` + `astro preview`) and on the deployed preview: touch, reduced motion, JS off and forced colors. The real CSP blocks nothing. Forced colors only loses decoration: the checklist progress bar, the How it works connector line and the founding card's panel edge.
- **Vercel Web Analytics is not enabled** on `trinity-web-co-site`. The deployed preview's console says "Failed to load script… Be sure to enable Web Analytics for your project and deploy again." Per Vercel's docs, Hobby gets page views only (50,000 events/month, 1-month window); **custom events (Call click, Text click, Form submit) need Pro**. Hector will flip the switch in the dashboard; redeploy right after.

## Business name and domain: on hold (findings from 2026-10-09)

- **`trinitywebco.com` belongs to someone else.** Registered 2026-04-13 at Squarespace Domains; it shows a Squarespace "Coming Soon" page. **`trinityweb.co` was registered the same day** (Tucows), so someone may be planning a "Trinity Web" business.
- **DFW name overlap:** Advent Trinity Marketing Agency (Arlington, TX, web design, SEO and ads for DFW businesses, since 2018). Elsewhere: Trinity Web Design and Consulting, LLC (Illinois/Indiana phone numbers, churches and small businesses) and Trinity Web Consulting (no location given). No business called exactly "Trinity Web Co." turned up. Web search doesn't clear a name: Hector still needs SOSDirect (Texas entities) and the USPTO trademark search.
- **Domains checked** (RDAP for `.com`; the `.co` WHOIS server for `.co`, because RDAP via rdap.org doesn't cover `.co`):
  - Available: trinitywebcompany.com, trinitywebdallas.com, trinitywebdfw.com, trinitywebtx.com, trinityriverweb.com, trinitybridgeweb.com, trinitywebdesignco.com.
  - Taken: trinityweb.co, trinitywebstudio.com, trinitywebdesign.com, trinitywebworks.com.
- **Rename shortlist, each with an available `.com`:** Elm Fork Web (elmforkweb.com; the Elm Fork is a branch of the Trinity in Dallas, so the river story and logo survive), Riverline Sites (riverlinesites.com), Limestone Web (limestoneweb.com), Bridgeline Sites (bridgelinesites.com), Bluebonnet Sites (bluebonnetsites.com).
- **Size of each option** (mentions / files, excluding build output and lockfiles):
  - Keep "Trinity Web Co.", change the domain: `trinitywebco.com` appears 29 / 17 (8 / 6 of those are `hello@trinitywebco.com`). Mostly find-and-replace, then a template sync and both demos.
  - Rename the business: add "Trinity Web Co." 96 / 53 (site 17/12, template 13/8, business docs 23/10, root docs 7/3, clients template 1/1, demo 1 18/10, demo 2 17/9). Also `og-image.png`, probably the logo and favicon, and the demo screenshots. The GitHub org `trinitywebco-sites` (32 / 14) and Vercel project names are private and can wait.
- **Credit link removed (2026-10-12, 00b8ca1):** the "Built by Trinity Web Co." demo banner (`BaseLayout.astro`) and the "Website by" footer credit (`Footer.astro`) linked to `https://trinitywebco.com/`, the stranger's site. The text stays, the link is gone, in `templates/site-template/`, both demo repos and `site/`. Put the link back once the new domain is live. `site.url` in `site/src/content/site.ts` (canonical, `og:url`, schema) still says `trinitywebco.com` and changes with the domain decision.
- Root `CLAUDE.md` still lists "Domain. The site assumes `trinitywebco.com`" as an open item; update it once the decision is made.

## What happened on 2026-10-12

- **Credit link:** the "Built by Trinity Web Co." demo banner and footer credit no longer link to trinitywebco.com (someone else's). The text stays. Template 00b8ca1.
- **Template (synced, org commits 426326c and 55282ea):**
  - 97790b7: a Call/Text bar pinned to the bottom of the screen on phones (`CallBar.astro`, `features.callBar`). It hides while the hero buttons or the call band are on screen and while a form field has focus. The page gets bottom padding the bar's height, plus the safe area. It stays visible with JavaScript off.
  - 97790b7: homepage sections alternate backgrounds based on which ones show.
  - 06404d9: a "buttons" slot in `Hero` and `CTABand` for extra buttons like Text us.
  - 89fc6d7: `forms.replyNote` replaces the hard-coded "within one business day" line.
- **Purple Martin (`improve-demo`):** Text us buttons, a "How a visit works" section with 4 promises, and a compact "We also do" list. Its bar runs up to 1023px to match its Menu button.
- **Good Oak (`improve-demo`):** a price menu in place of the service cards, "Text to hold a chair" as the second hero button, a reply line that fits a barber, and "Open now" worked out in America/Chicago time.
- **Both demos:** they had missed some earlier template fixes (b7eafa1 no-JS menu, c10974f call band focus ring; Purple Martin also 6e6a34b and dd68bcd). Those are in now. QA results are in each demo's `docs/qa-report.md`: mobile Lighthouse 99 / 100, with the call bar checked at 360 to 1440px.
- **Demo slots:** filled on `fill-demo-slots` with the preview links and fresh 1440x900 screenshots (`site/src/assets/demo-*.jpg`). Titles are "Demo: ...". There's no PageSpeed score until launch. On launch day, swap in the production URLs and scores, then merge.
- **Screenshots:** each demo's `docs/screenshots/` has the homepage at 1440px (first screen and full page) and 360px (first screen, full page, and with the call bar), taken 2026-10-13 on `improve-demo`.

## Production is paused (2026-10-12)

- **What happened:** `trinity-web-co-site` turned out to be connected to GitHub (`hectorclawd/trinity-web-co`, production branch `main`), so every push to `main` deployed to production. trinity-web-co-site.vercel.app was public with no `noindex`. There were 9 production deployments, the oldest 3 days old.
- **The fix, with Hector's OK:** the project's Ignored Build Step (Settings → Git) is now `if [ "$VERCEL_ENV" = "production" ]; then echo "Production deploys paused until launch"; exit 0; fi; exit 1`. Pushes to `main` are skipped, and other branches still build previews. Git stays connected.
- **Cleanup:** all 9 production deployments were removed: the 6 from 2026-10-12 that day, and the 3 older ones (`pblsb5cae`, `ken7pwfyq`, `jnpfycdsq`) on 2026-10-13. trinity-web-co-site.vercel.app returns 404 again. The only production entry left is a Canceled one, from the test push that showed the Ignored Build Step works.
- **Launch day:** clear the Ignored Build Step to deploy production again (in `CHECKLIST.md`).

## Gotchas (learned the hard way)

- **Vercel's first deploy always goes to production.** A deploy to a project with *no deployments* lands on Production even with `--target=preview`; once any deployment exists, the flag works. `/new-site` step 9 handles this: deploy, deploy again, remove the production one. Never remove a project's last deployment.
- **Vercel CLI isn't installed globally.** Use `npx -y vercel@latest …`. It's logged in as `hlopez75235-4319`. To check a protected preview, use `npx vercel curl <url> -- -s -o /dev/null -w "%{http_code}"`.
- **The Vercel connector (MCP) returns 403** on these new projects, so it can't make share links. Use the CLI, or the Share button in the dashboard.
- **Pushing to `trinitywebco-sites/site-template`** was blocked once by the auto-mode permission check. It went through after Hector explicitly OK'd the sync. Follow the sync steps in `CLAUDE.md` exactly.
- **Screenshots and QA tooling on Windows:**
  - Playwright is only available inside the global `@playwright/cli` package. Import it as `file:///C:/Users/hlmpr/AppData/Roaming/npm/node_modules/@playwright/cli/node_modules/playwright-core/index.mjs` with `chromium.launch({ channel: 'chrome' })`.
  - In Git Bash, prefix commands with `MSYS_NO_PATHCONV=1` when passing URL paths like `/`.
  - Lighthouse runs as `npx -y lighthouse`.
  - Files in the client repos are checked out with CRLF line endings, so regexes over them need `\r?\n`.
- **Local Lighthouse quirks:**
  - Best Practices is 96 locally because `/_vercel/insights/script.js` 404s on `astro preview`. As of 2026-10-09 it also 404s on Vercel, because Web Analytics isn't enabled on the projects yet.
  - Demos score SEO 69 because of the intentional `noindex`.
  - The occasional outlier run (65, 79) has been machine load. Rerun, and record both sets.
- **The header check snippet** lives in `templates/site-template/.claude/commands/qa.md` and the demos' copies. `site/.claude/commands/qa.md` doesn't have it; `site/` has its own `/qa` that isn't synced from the template.
- **`AGENTS.md`** in the repo root is a Codex copy of `CLAUDE.md` from 2026-10-07 and is out of date. At Hector's request it's ignored in `.gitignore` (kept on disk, never committed).
- **Hosting is settled: Vercel Pro.** On 2026-10-09 Hector reviewed switching to Cloudflare and decided to stay (playbook decisions log). Revisit at 25+ clients.

## Next up

The live to-do list is `CHECKLIST.md`. Beyond it:

1. **Next focus: Hector reviews the demo previews** (table above). Then merge both `improve-demo` branches to `main` in the demo repos. `fill-demo-slots` waits for launch day (production URLs and PageSpeed scores). Vercel Pro and every production deploy are on hold until the name and domain are decided.
2. **On hold: the business name and domain** (above). It blocks the LLC, business email, PO box and outreach.
3. Other open items in `CLAUDE.md` that block launch: Formspree form ID, headshot and About story, business setup (playbook §6), and the attorney review before the first client signs.
4. Launch day, from `CHECKLIST.md`: add the chosen domain to Vercel, re-enable production deploys from `main` (clear the Ignored Build Step), deploy `site/` to production, test the live form and analytics.
5. After launch, playbook §7 weeks 2–4: build the prospect list and start outreach (`business/sales/prospect-tracker.csv`).
