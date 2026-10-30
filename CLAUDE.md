# Trinity Web Co.

Trinity Web Co. is Hector's web design business for owner-operated Dallas businesses. Hector runs it solo and part-time; clients work with him directly. It builds fast, custom-coded websites, then earns recurring revenue from monthly care plans.

**Positioning:** a local developer you can text, not an agency. Plain language, starting prices posted openly with the exact price in writing, and the client owns their domain and accounts.

This business is separate from Focus Forward. Don't mix its checklist, brand, or files into this folder.

## The checklist

A SessionStart hook (`.claude/settings.json`, script `.claude/hooks/checklist.js`) shows Hector a summary of `CHECKLIST.md` when a session starts, so don't show it again. When an item gets done, tick it in place inside its group (`- [x]`) with the date or commit, so the group's done count moves; don't move it to DONE, which holds older history. Add new to-dos to the right group under TO DO, and update its "Last updated" date. Longer context for a fresh session is in `HANDOFF.md`.

## Follow the playbook

**`business/playbook.md` is the source of truth for how Trinity Web Co. runs.** Read the relevant section before doing any of the following, and follow it:

| Topic | Playbook section |
|---|---|
| Ideal client, target niches, positioning | §1 Business model |
| Packages (Launch / Growth, starting prices), add-ons, revision rounds | §2 Service packages |
| The care plan ($49/mo, edits billed hourly) and the rules that protect Hector's time | §3 Monthly care plan |
| Client workflow: discovery call, proposal, contract, deposit, intake, content, build, review rounds, launch checklist, handoff | §4 Client workflow |
| Stack, Claude Code workflow, starter template structure, naming conventions | §5 Technical build process |
| Pre-launch QA checklist | §5 Pre-launch QA checklist |
| LLC, contract essentials, admin tools, domain and hosting ownership | §6 Business setup checklist |
| Outreach plan and scripts | §7 Client acquisition |
| Income math, when to raise prices | §8 Pricing and income math |

Rules for using it:

- **When anything in this repo conflicts with the playbook, the playbook wins.** Point out the conflict to Hector instead of silently picking one.
- **Quote prices only from the playbook.** Don't use numbers from older files or from memory.
- **Build client sites with the playbook's stack and template structure** (§5): Astro + Tailwind, every business fact in `src/content/site.ts`, GitHub org `trinitywebco-sites`, Vercel Pro, and the repo, branch and commit naming in the naming conventions table.
- **`templates/site-template/` in this repo is the source of truth for the client template.** Make template fixes here first and commit them, then push them to `trinitywebco-sites/site-template` afterward. To update it, clone the org repo, delete its tracked files (`git rm -rq .`), extract `git archive HEAD:templates/site-template` into it, then commit and push. Never edit the org repo directly, and never push this repo's history or anything outside `templates/site-template/` to it.
- **Never mark a site ready to launch until every item in the §5 QA checklist passes** and the §4 launch checklist is done. Save the results in the client repo's `docs/qa-report.md`.
- **When Hector changes a Default,** add a row to the playbook's decisions log (date, decision, why, revisit when) and a changelog line.

## Folder map

```
/business      How the business runs
  playbook.md          The full playbook (source of truth, see above)
  stripe-setup.md      Stripe setup guide: fees, account settings, product catalog, invoicing and care-plan billing
  grok-bots.md         Instructions to paste into the main Grok bot and 9 helpers (prospecting, outreach, Instagram, posting plans, setup research)
  sales/               Price sheet, discovery call, outreach scripts, master service agreement + scope template, intake form, prospect tracker
  archive/             Old pricing, contracts, outreach scripts and lead list, superseded by the playbook (see its README)
/templates     Reusable starting points for client work
  site-template/       Astro + Tailwind client starter (playbook §5); source of truth for trinitywebco-sites/site-template
/clients       One folder per client, named with the client slug (playbook §5)
  <client-slug>/site   The client's site repo, cloned from trinitywebco-sites (git-ignored here)
  <client-slug>/admin  Contract, invoices, intake; never in the site repo
  _template/admin/     Starting docs for a new client (copy to <client-slug>/)
/site          The Trinity Web Co. website (Astro, built from site-template; see site/CLAUDE.md)
AGENTS.md      Codex's instructions: it fixes, Claude builds (see "Codex fixes, Claude builds")
HANDOFF.md     Where things stand, for a fresh session: repos, deploys, gotchas, next up
CHECKLIST.md   DONE / TO DO list, summarized by the SessionStart hook in .claude/
```

## Brand (our own site)

- **Type:** Archivo, self-hosted via `@fontsource-variable/archivo` (width axis). Headlines run wide (`font-stretch: 125%`), body text at normal width. One family only.
- **Colors** (variables at the top of `site/src/styles/site.css`):
  - Ink `#13262B`
  - River `#1D6B66`
  - River deep `#0E3F3C`
  - Limestone `#ECEFE9` (page background)
  - Paper `#FAFBF8`
  - Gold `#EDB23A` (primary buttons only)
- **Signature element:** the hero's line drawing of the Trinity River with Dallas neighborhoods along it. The logo is the Margaret Hunt Hill Bridge arch with three cables (the "Trinity").
- **Voice:** plain, friendly, specific. Write like you're talking to a shop owner at their counter. No jargon, no hype, no fake urgency. Sentence case everywhere. Never promise rankings or results. Don't lead with "I use AI" (playbook §1).
- **Design skills:** for marketing (Instagram, outreach pages, our site's copy and layout reviews) load the user-level `landing-page-design` skill (elayadesign/ai-design-skills) for page structure, conversion copy and its checklist; the Instagram kit's `CLAUDE.md` says how it fits with the Apple design skill there. Its description says to use it on all web UI and that it wins over defaults; in this repo the brand above, the playbook and the client template's `CLAUDE.md` win. Where they clash: Archivo, not its font list; our colors and no gradient heading text; never its invented testimonials, names or logos; no guarantee, trial or price that isn't in the playbook. Its "mandatory" scroll tagline section is optional here.

## Rules

- **Never invent social proof.** No made-up testimonials, clients, reviews or portfolio pieces. Demo sites must be clearly labeled "Demo" (playbook §7).
- **Credentials live in Bitwarden,** never in files, email or texts. Reference them by item name.
- **Contracts are templates, not legal advice.** Hector should have a Texas attorney review them once before first use.

## ECC and other plugin rules

The ECC plugin loads general coding rules from `~/.claude/rules/ecc/`, and other plugins (such as agent-skills) bring their own process skills. In this repo, the playbook and this file win over all of them where they disagree:

- **Commits:** verb first, plain English, e.g. `Add Garland service-area page` (playbook §5 naming conventions). No `feat:` or `fix:` prefixes.
- **Tests:** no test-first rule and no coverage target. Sites are checked with `/qa` and the §5 pre-launch QA checklist. Don't add unit, integration or end-to-end test suites unless Hector asks.
- **Planning:** build from the template and `site.ts`, with plan mode for anything bigger than one component (playbook §5). Skip ECC's research step (GitHub and package searches) and its planning documents.
- **Agents:** don’t start plugin agents (ECC’s planner, code reviewer and TDD guide, or any other plugin’s) on your own. Use one only when Hector asks for it. The one exception is Codex, for the fix work below.

The rest of those rules still apply.

## Codex fixes, Claude builds

Codex (OpenAI's coding agent, through the Codex plugin) takes the fix work so Claude can keep building (playbook §5). Its instructions are in `AGENTS.md`, which Codex loads on every run.

- **Hand these to Codex on your own,** through the `codex:codex-rescue` agent: security fixes, a failing build or `npm run check`, `npm audit` findings, broken links, QA or `/impeccable audit` findings that are code defects, and bugs you notice outside your current task. One fix per run: say what's wrong, where, and what done looks like.
- **Keep for yourself:** new pages, components, copy, design, `site.ts` content and business docs.
- Run Codex in the background only when it won't touch the files you're editing; otherwise wait for it.
- Read Codex's diff before you commit it, as you would your own, and tell Hector in one line what it fixed.
- Second opinions are Hector's to start (Claude can't run them): `/codex:review` on a finished change, `/codex:adversarial-review` for forms, headers and anything touching customer data.

## Launch checklist (our own site)

Do these on launch day, in order, after the open items below that block launch (domain, Formspree ID; on 2026-10-26 Hector chose to launch without the headshot and add it after):

- [x] Vercel: move the account from Hobby (non-commercial only) to Pro before launch (playbook §5), then add the `trinitywebdallas.com` domain and deploy to production. Clear the project's Ignored Build Step first, so `main` deploys to production again. (2026-10-26: live at https://www.trinitywebdallas.com, the bare domain redirects to www; every push to `main` now deploys production.)
- [x] Deploy the demos to production on Pro, run PageSpeed Insights (mobile) on each production URL, then swap the demo slots in `site/src/content/site.ts` from their preview URLs to the production URLs and add `pageSpeed` (titles, images and alt text are already in). (2026-10-26: Pro is on; both demos are in production, mobile Performance 100 and 100; the slots are filled on branch `launch-day`.)

## Open items (Hector to confirm)

Files built before the playbook was added, which now conflict with it:

- [x] Site packages, care plans, founding terms and niches match playbook §1–3, including the 2026-10-07 decisions (Care Essential/Standard/Plus names, no Google review in the founding trade). They now live in `offer` in `site/src/content/site.ts`.
- [x] `site/` has two demo slots showing "in progress". Build the 2 demo sites (§7 Week 1), then add each one's URL, screenshot and mobile PageSpeed score in `site/src/content/site.ts`. Both built; the slots were filled with preview links on 2026-10-13 (c836c1e), and get production URLs and PageSpeed scores on launch day (see the launch checklist).
  - Demo 1 built (2026-10-07): Purple Martin Heating & Air, `clients/purple-martin-air-lake-highlands/site` (repo `trinitywebco-sites/site-purple-martin-air-lake-highlands`, Vercel project of the same name, preview only, behind Vercel Authentication). QA in its `docs/qa-report.md`. Screenshot (whole homepage, in a scrollable window) at `site/src/assets/demo-purple-martin-scroll.jpg`; its URL and PageSpeed score wait for launch day (see the launch checklist).
  - Demo 2 built (2026-10-08): Good Oak Barbershop, `clients/good-oak-barbers-oak-cliff/site` (repo `trinitywebco-sites/site-good-oak-barbers-oak-cliff`, Vercel project of the same name, preview only, behind Vercel Authentication). QA in its `docs/qa-report.md`. Screenshot (whole homepage, in a scrollable window) at `site/src/assets/demo-good-oak-scroll.jpg`.
- [x] Synced `templates/site-template/` to `trinitywebco-sites/site-template`: 13 template fixes from 2026-10-07 (63a4eaa to bd0a7c8), org commit 0650cab; 4 more from demo 2 on 2026-10-08 (e86dc84, 6e6a34b, dd68bcd, 25dffa2), org commits 6b43788 and 3d6c56c; the noscript menu fix (b7eafa1) and CTABand focus ring fix (c10974f) on 2026-10-08, org commit c84dc98. The `site/` fixes that apply (header button wrap, form border contrast, footer link underline, placeholder search) are in too. On 2026-10-12: the credit link fix (00b8ca1, org 2789f32), the call bar and section backgrounds (97790b7, org 426326c), and the button slots and `forms.replyNote` (06404d9, 89fc6d7, org 55282ea). On 2026-10-13: the call bar's "Text us" label (b987cd0, org f2aa882) and the accent band's high-contrast border (ff9eef7, org a9772d0). On 2026-10-21: the "ECC rules" section in the template's `CLAUDE.md` (dea4af9, org 5671bad); link underlines and form errors tied to their fields (4305c3f, org ae40fc9); the schema, share tags and accessibility polish (d0e32a7, b0ac78e) and the plugin-rules wording in the template's `CLAUDE.md` (a97a1a6), org 8663172; the AI photo rule in the template's "Never do" list (99be578), org 47a11dc. On 2026-10-24: Codex's JSON-LD escaping and dependency updates (cc84636, merged as 606f64d), org d179939; the 2026-10-24 package and care plan wording (084f2bd), org 6e2cd57. On 2026-10-27: the credit link back to https://www.trinitywebdallas.com/ (5928540), org cdfd08e.
- [x] Astro + Tailwind template built at `templates/site-template/` and matches §5: `CLAUDE.md`, `src/content/site.ts`, `.claude/commands/` (new-site, add-page, qa, handoff), `docs/` (intake, site-plan, qa-report), all 11 components, every page in the §5 tree, and a blog (2026-10-07). `robots.txt` is generated by `src/pages/robots.txt.ts` rather than kept in `public/`. The plain-HTML starter was removed (it's in commit 881d083).
- [x] Hosting: `/site` now deploys to **Vercel** like client sites, not Cloudflare Pages. The Cloudflare `_headers` file is gone; `site/vercel.json` holds the security headers, CSP, trailing-slash setting and long-term caching for `/_astro/` (2026-10-07). The Vercel project exists (see below).
- [x] `business/pricing.md`, `business/contracts/` and `business/outreach/` moved to `business/archive/`, replaced by the playbook and `business/sales/` (2026-10-07).
- [x] `clients/_template/` docs moved into `clients/_template/admin/`, and `clients/README.md` now explains cloning the site from `trinitywebco-sites` into `<client-slug>/site/` (§5, 2026-10-07).

Other open items:

- [x] Domain (live 2026-10-26: Vercel DNS records added in Cloudflare, "DNS only"). Decided 2026-10-21: keep the name Trinity Web Co. and use `trinitywebdallas.com` (`trinitywebco.com` belongs to someone else). The site now uses `trinitywebdallas.com` and `hello@trinitywebdallas.com`. Registered 2026-10-21 in Hector's own Cloudflare Registrar account (expires 2027-10-21, Cloudflare DNS). The `hello@` mailbox is on Google Workspace with its DNS records (2026-10-21). Still to do: the DNS records for Vercel on launch day.
- [x] `trinitywebco-sites` GitHub org created; `templates/site-template/` pushed to `trinitywebco-sites/site-template` as a private template repository with fresh history (52 files, exported from commit 24bdeed; 2026-10-07).
- [x] Vercel project `trinity-web-co-site` created (root directory `site`, Astro preset, Node 24) and linked with the CLI from the repo root; `.vercelignore` uploads only `site/` (2026-10-07). Preview deployments only for now: the first deploy went to production by default and was removed, so `trinity-web-co-site.vercel.app` returns 404 until launch. Since then the project has been connected to GitHub (production branch `main`). Since 2026-10-12 its Ignored Build Step skips production builds, so pushes to `main` don't deploy and other branches still build previews. Clear it on launch day.
- [x] Formspree form ID. Replace `REPLACE_ME` in `site.forms.contactEndpoint` in `site/src/content/site.ts` (2026-10-21: form `xvkzedbz`, sends to hello@trinitywebdallas.com; a test from the preview arrived).
- [x] Social share image: `site/public/og-image.png` (1200×630).
- [x] Short personal story for the About section (2026-10-14, 62ce5b4).
- [ ] Headshot for the About section (`site/src/assets/headshot.jpg`, JPG, 4:5, at least 1200 × 1500 px). Add it on a new branch with a preview for Hector's OK.
- [ ] Business setup per playbook §6 (LLC, EIN, bank account, sales tax question on hosting).
- [ ] Attorney review (playbook §6, about $300–$600) of `business/sales/master-service-agreement.md` and `business/sales/contract-scope-template.md` before the first client signs. Bring the "Attorney review list" at the end of the agreement. It covers:
  1. Order of precedence between the agreement and a scope page.
  2. Deposit refund rule: fully refundable until the kickoff call, non-refundable after (§3.2, §11.2; playbook §4, contract essentials #3 and #11).
  3. Late fee of 1.5%/month and Texas usury limits (§3.5).
  4. Sales tax on care-plan hosting (§3.7; also a CPA or Comptroller question).
  5. Privacy policy and industry disclaimers are the client's responsibility (§5.6).
  6. Ownership: the client owns the site once the build fees are paid, and unpaid care-plan fees don't affect ownership; Designer keeps and licenses its template and components (§6.1–6.2).
  7. Care plan monthly renewal from launch day (§7.3); ending a plan unpaid for 60 days by written notice, handoff with fees still owed (§7.6a, §7.8); the 30-day hosting window after any care plan ends (§7.8).
  8. Abandonment: invoicing the full remaining balance (§8.2).
  9. Warranty disclaimer, accessibility, and a possible Texas DTPA waiver (§9.3–9.4).
  10. Liability cap, indirect-damages exclusion, client indemnity, fit with E&O insurance (§10).
  11. Disputes: venue, attorney's fees, mediation (§12).
  12. Confidentiality, customer data and breach duties (§13.2–13.3).
  13. Signing before the LLC exists, and assigning to the LLC later (§13.9).
