# Trinity Web Co.: handoff

Last updated: 2026-10-08. Written for a fresh Claude Code session picking this up with no other context.
Read `CLAUDE.md` (project rules, open items, launch checklist) and `business/playbook.md` (how the business runs) before changing anything.

## Where things stand

**Paused 2026-10-08 at Hector's request** (too many sessions open). Nothing is half-done: every repo below is committed and pushed, and no local servers are running.

**Unanswered question:** Hector's last message before pausing said "thn do 2". I asked what "2" meant and got no answer. My guesses were Focus Forward checklist item 2 (Instagram Week 0 setup, which belongs to the Focus Forward folder, not here) or a Trinity open item. **Ask him; don't guess.**

## Repos and deploys

| What | Local path | GitHub | Vercel |
|---|---|---|---|
| This repo (business docs, template source, our site) | `trinity-web-co/` | `hectorclawd/trinity-web-co` (last commit 8066884) | `trinity-web-co-site`, previews only until launch |
| Client template | `templates/site-template/` (source of truth) | `trinitywebco-sites/site-template`, private template repo, synced through 25dffa2 (org commit 3d6c56c) | n/a |
| Demo 1: Purple Martin Heating & Air (HVAC) | `clients/purple-martin-air-lake-highlands/site` | `trinitywebco-sites/site-purple-martin-air-lake-highlands` | Same name. Preview: https://site-purple-martin-air-lake-highlands-q0uia6ac5-hlm10.vercel.app |
| Demo 2: Good Oak Barbershop (barber) | `clients/good-oak-barbers-oak-cliff/site` | `trinitywebco-sites/site-good-oak-barbers-oak-cliff` | Same name. Preview: https://site-good-oak-barbers-oak-cliff-6x34a2xt4-hlm10.vercel.app |

- `clients/*/site/` are separate git repos and are git-ignored here. Commit and push each one on its own.
- Every Vercel project has previews only, behind Vercel Authentication (a Vercel login). Prospects can't open the demos yet. That's deliberate: the demos go to production on launch day (see the launch checklist in `CLAUDE.md`).
- Vercel account: team `hlm10` (`team_BAKR7LKO83CePY1tgdUydUiI`), still on **Hobby** (non-commercial). Moving to Pro is the first launch-checklist item.

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
  - Best Practices is 96 locally only because `/_vercel/insights/script.js` 404s on `astro preview`; it loads on Vercel.
  - Demos score SEO 69 because of the intentional `noindex`.
  - The occasional outlier run (65, 79) has been machine load. Rerun, and record both sets.
- **The header check snippet** lives in `templates/site-template/.claude/commands/qa.md` and the demos' copies. `site/.claude/commands/qa.md` doesn't have it; `site/` has its own `/qa` that isn't synced from the template.
- **`AGENTS.md`** in the repo root is untracked. It's a Codex copy of `CLAUDE.md` from 2026-10-07, so it's already out of date. I left it alone; ask Hector whether to keep, update or delete it.

## Next up

1. Get an answer on "do 2".
2. Open items in `CLAUDE.md` that block launch: domain (`trinitywebco.com`), Formspree form ID, headshot and About story, Vercel Pro, business setup (playbook §6), and the attorney review before the first client signs.
3. Launch day, from the launch checklist in `CLAUDE.md`:
   - Move to Vercel Pro, add the domain, deploy `site/` to production.
   - Deploy both demos to production (`npx vercel deploy --prod` in each demo repo).
   - Run PageSpeed Insights (mobile) on each production URL.
   - Fill both demo slots in `site/src/content/site.ts`: url, image, imageAlt and pageSpeed, with titles "Demo: Purple Martin Heating & Air" and "Demo: Good Oak Barbershop".
4. After launch, playbook §7 weeks 2–4: build the prospect list and start outreach (`business/sales/prospect-tracker.csv`).
