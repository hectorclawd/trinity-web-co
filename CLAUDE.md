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
  sales/               Price sheet, discovery call, outreach scripts, master service agreement + scope template, intake form, prospect tracker
  archive/             Old pricing, contracts, outreach scripts and lead list, superseded by the playbook (see its README)
/templates     Reusable starting points for client work
  site-template/       Astro + Tailwind client starter (playbook §5); push to trinitywebco-sites/site-template
/clients       One folder per client, named with the client slug (playbook §5)
  <client-slug>/site   The client's site repo, cloned from trinitywebco-sites (git-ignored here)
  <client-slug>/admin  Contract, invoices, intake; never in the site repo
  _template/admin/     Starting docs for a new client (copy to <client-slug>/)
/site          The Trinity Web Co. website (Astro, built from site-template; see site/CLAUDE.md)
```

## Brand (our own site)

- **Type:** Archivo, self-hosted via `@fontsource-variable/archivo` (width axis). Headlines run wide (`font-stretch: 125%`), body text at normal width. One family only.
- **Colors** (tokens in `site/src/styles/tokens.css`):
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

- [x] Site packages, care plans, founding terms and niches match playbook §1–3, including the 2026-10-07 decisions (Care Essential/Standard/Plus names, no Google review in the founding trade). They now live in `offer` in `site/src/content/site.ts`.
- [ ] `site/` has two demo slots showing "in progress". Build the 2 demo sites (§7 Week 1), then add each one's URL, screenshot and mobile PageSpeed score in `site/src/content/site.ts`.
- [x] Astro + Tailwind template built at `templates/site-template/` and matches §5: `CLAUDE.md`, `src/content/site.ts`, `.claude/commands/` (new-site, add-page, qa, handoff), `docs/` (intake, site-plan, qa-report), all 11 components, every page in the §5 tree, and a blog (2026-10-07). `robots.txt` is generated by `src/pages/robots.txt.ts` rather than kept in `public/`. The plain-HTML starter was removed (it's in commit 881d083).
- [x] Hosting: `/site` now deploys to **Vercel** like client sites, not Cloudflare Pages. The Cloudflare `_headers` file is gone; `site/vercel.json` holds the security headers, CSP, trailing-slash setting and long-term caching for `/_astro/` (2026-10-07). The Vercel project isn't created yet (see below).
- [x] `business/pricing.md`, `business/contracts/` and `business/outreach/` moved to `business/archive/`, replaced by the playbook and `business/sales/` (2026-10-07).
- [x] `clients/_template/` docs moved into `clients/_template/admin/`, and `clients/README.md` now explains cloning the site from `trinitywebco-sites` into `<client-slug>/site/` (§5, 2026-10-07).

Other open items:

- [ ] Domain. The site assumes `trinitywebco.com` and `hello@trinitywebco.com`.
- [ ] Create the `trinitywebco-sites` GitHub org, push `templates/site-template/` to it as `site-template`, and mark it a template repository.
- [ ] Vercel: create the project for `/site` (root directory `site`, Astro preset) and add the domain.
- [ ] Formspree form ID. Replace `REPLACE_ME` in `site.forms.contactEndpoint` in `site/src/content/site.ts`.
- [x] Social share image: `site/public/og-image.png` (1200×630).
- [ ] Headshot and a short personal story for the About section.
- [ ] Business setup per playbook §6 (LLC, EIN, bank account, sales tax question on hosting).
- [ ] Attorney review (playbook §6, about $300–$600) of `business/sales/master-service-agreement.md` and `business/sales/contract-scope-template.md` before the first client signs. Bring the "Attorney review list" at the end of the agreement. It covers:
  1. Order of precedence between the agreement and a scope page.
  2. Deposit refund rule: fully refundable until the kickoff call, non-refundable after; founding Starter: 50% of the upfront payment counts as the deposit (§3.2, §11.2; playbook §4, contract essentials #3 and #11).
  3. Late fee of 1.5%/month and Texas usury limits (§3.5).
  4. Sales tax on care-plan hosting (§3.7; also a CPA or Comptroller question).
  5. Privacy policy and industry disclaimers are the client's responsibility (§5.6).
  6. Ownership: the client owns the site once the build fees are paid, and unpaid care-plan fees don't affect ownership; Designer keeps and licenses its template and components (§6.1–6.2).
  7. Care plan auto-renewal after the 3 included months (§7.3); ending a plan unpaid for 60 days by written notice, handoff with fees still owed (§7.6a, §7.8); the 30-day hosting window after any care plan ends (§7.8).
  8. Abandonment: invoicing the full remaining balance (§8.2).
  9. Warranty disclaimer, accessibility, and a possible Texas DTPA waiver (§9.3–9.4).
  10. Liability cap, indirect-damages exclusion, client indemnity, fit with E&O insurance (§10).
  11. Disputes: venue, attorney's fees, mediation (§12).
  12. Confidentiality, customer data and breach duties (§13.2–13.3).
  13. Signing before the LLC exists, and assigning to the LLC later (§13.9).
  14. FTC endorsement disclosure for founding-client testimonials (scope page).
