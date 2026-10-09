# Trinity Web Co.: handoff

Last updated: 2026-10-08 (after the branch cleanup). Written for a fresh Claude Code session picking this up with no other context.
Read `CLAUDE.md` (project rules, open items, launch checklist) and `business/playbook.md` (how the business runs) before changing anything. `CHECKLIST.md` holds the current DONE / TO DO list and is shown at the start of every session.

## Where things stand

**Paused 2026-10-08 at Hector's request** (too many sessions open). Nothing is half-done: every repo below is committed and pushed, `main` is the only branch, and no local servers are running. What to do next is in `CHECKLIST.md`.

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
| This repo (business docs, template source, our site) | `C:\Users\hlmpr\projects\trinity-web-co` (the only local copy) | `hectorclawd/trinity-web-co`, `main` is the only branch | `trinity-web-co-site`, previews only until launch |
| Client template | `templates/site-template/` (source of truth) | `trinitywebco-sites/site-template`, private template repo, synced through c10974f (org commit c84dc98) | n/a |
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
- **`AGENTS.md`** in the repo root is a Codex copy of `CLAUDE.md` from 2026-10-07 and is out of date. At Hector's request it's ignored in `.gitignore` (kept on disk, never committed).
- **Hosting is settled: Vercel Pro.** On 2026-10-09 Hector reviewed switching to Cloudflare and decided to stay (playbook decisions log). Revisit at 25+ clients.

## Next up

The live to-do list is `CHECKLIST.md`. Beyond it:

1. Open items in `CLAUDE.md` that block launch: domain (`trinitywebco.com`), Formspree form ID, headshot and About story, Vercel Pro, business setup (playbook §6), and the attorney review before the first client signs.
2. Launch day, from the launch checklist in `CLAUDE.md`:
   - Move to Vercel Pro (or whichever host is decided; see the hosting question above), add the domain, deploy `site/` to production.
   - Deploy both demos to production (`npx vercel deploy --prod` in each demo repo).
   - Run PageSpeed Insights (mobile) on each production URL.
   - Fill both demo slots in `site/src/content/site.ts`: url, image, imageAlt and pageSpeed, with titles "Demo: Purple Martin Heating & Air" and "Demo: Good Oak Barbershop".
3. After launch, playbook §7 weeks 2–4: build the prospect list and start outreach (`business/sales/prospect-tracker.csv`).
