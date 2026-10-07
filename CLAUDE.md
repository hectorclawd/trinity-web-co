# Trinity Web Co.

Trinity Web Co. is Hector's web design business for owner-operated Dallas businesses. Hector runs it solo and part-time; clients work with him directly. It builds fast, custom-coded websites, then earns recurring revenue from monthly care plans.

**Positioning:** a local developer you can text, not an agency. Plain language, fixed prices, and the client owns their domain and accounts.

This business is separate from Focus Forward. Don't mix its checklist, brand, or files into this folder.

## Follow the playbook

**`business/playbook.md` is the source of truth for how Trinity Web Co. runs.** Read the relevant section before doing any of the following, and follow it:

| Topic | Playbook section |
|---|---|
| Ideal client, target niches, positioning | §1 Business model |
| Packages (Starter / Growth / Premium), founding-client prices, add-ons, revision rounds | §2 Service packages |
| Care plans (Care Essential / Care Standard / Care Plus) and the rules that protect Hector's time | §3 Monthly care plans |
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
- **Never mark a site ready to launch until every item in the §5 QA checklist passes** and the §4 launch checklist is done. Save the results in the client repo's `docs/qa-report.md`.
- **When Hector changes a Default,** add a row to the playbook's decisions log (date, decision, why, revisit when) and a changelog line.

## Folder map

```
/business      How the business runs
  playbook.md          The full playbook (source of truth, see above)
  sales/               Price sheet, discovery call, outreach scripts, scope template, intake form, prospect tracker
  archive/             Old pricing, contracts, outreach scripts and lead list, superseded by the playbook (see its README)
/templates     Reusable starting points for client work
  starter-site/        Plain-HTML starter, built before the playbook (see open items)
/clients       One folder per client, named with the client slug (playbook §5)
  <client-slug>/site   The client's site repo, cloned from trinitywebco-sites (git-ignored here)
  <client-slug>/admin  Contract, invoices, intake; never in the site repo
  _template/           Starting docs for a new client
/site          The Trinity Web Co. website itself
```

## Brand (our own site)

- **Type:** Archivo (Google Fonts, variable width axis). Headlines run wide (`font-stretch: 125%`), body text at normal width. One family only.
- **Colors** (tokens at the top of `site/styles.css`):
  - Ink `#13262B`
  - River `#1D6B66`
  - River deep `#0E3F3C`
  - Limestone `#ECEFE9` (page background)
  - Paper `#FAFBF8`
  - Gold `#EDB23A` (primary buttons and the founding-client offer only)
- **Signature element:** the hero's line drawing of the Trinity River with Dallas neighborhoods along it. The logo is the Margaret Hunt Hill Bridge arch with three cables (the "Trinity").
- **Voice:** plain, friendly, specific. Write like you're talking to a shop owner at their counter. No jargon, no hype, no fake urgency. Sentence case everywhere. Never promise rankings or results. Don't lead with "I use AI" (playbook §1).

## Rules

- **Never invent social proof.** No made-up testimonials, clients, reviews or portfolio pieces. Demo sites must be clearly labeled "Demo" (playbook §7).
- **Credentials live in Bitwarden,** never in files, email or texts. Reference them by item name.
- **Contracts are templates, not legal advice.** Hector should have a Texas attorney review them once before first use.

## Open items (Hector to confirm)

Files built before the playbook was added, which now conflict with it:

- [x] `site/index.html` packages, care plans, founding prices and niches now match playbook §1–3 (2026-10-07). The niche list shows only the playbook's 5 niches.
- [ ] `site/` has no demo sites or PageSpeed scores yet (§7 Week 1 asks for both).
- [ ] `templates/starter-site/` is plain HTML. §5 calls for an Astro + Tailwind GitHub template repo in `trinitywebco-sites`, with `site.ts`, `.claude/commands/` and `docs/`.
- [ ] Hosting: `site/` was set up for Cloudflare Pages (`_headers` file). §5 uses Vercel Pro for client sites. Decide whether our own site moves too.
- [x] `business/pricing.md`, `business/contracts/` and `business/outreach/` moved to `business/archive/`, replaced by the playbook and `business/sales/` (2026-10-07).
- [ ] `clients/_template/` puts docs at the folder root. §5 puts them in `<client-slug>/admin/`.

Other open items:

- [ ] Domain. The site assumes `trinitywebco.com` and `hello@trinitywebco.com`.
- [ ] Create the `trinitywebco-sites` GitHub org.
- [ ] Formspree form ID. Replace `REPLACE_WITH_FORM_ID` in `site/index.html`.
- [ ] Social share image: `site/og-image.png` (1200×630).
- [ ] Headshot and a short personal story for the About section.
- [ ] Business setup per playbook §6 (LLC, EIN, bank account, sales tax question on hosting).
