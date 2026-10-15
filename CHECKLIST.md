# Trinity Web Co. checklist

Summarized at the start of every Claude Code session in this repo by the SessionStart hook (`.claude/hooks/checklist.js`): the top 3 open items, then each group's done/total. Tick items in place inside their group (`- [x]`) with the date or commit when done, so the counts move; DONE holds older history. Add new to-dos to the right group under TO DO. Longer context is in `HANDOFF.md`.

Last updated: 2026-10-15

## DONE

- [x] Readiness checklist + spotlight card merged to main (c1a812d, merge 8b325c0)
- [x] main at 0ff56f4, also includes cosmetic-polish, site-design-notes, ignore-agents-md (more commits on top since; see git log)
- [x] Nav links show on phones when JavaScript is off, in site and template (b7eafa1)
- [x] CLAUDE.md shows this checklist at the start of every session (a270146)
- [x] Spotlight card + checklist verified at 360px and 1440px after merges (2026-10-08: stacks at 360, two columns at 1440, all 7 items, no sideways scroll)
- [x] Old "trinity-web-co updates" folder deleted, nothing was unpushed
- [x] Repo now lives at C:\Users\hlmpr\projects\trinity-web-co; main is the only branch on GitHub
- [x] Delete the merged local branch project-readiness-checklist if it still exists (already deleted in both folders and on GitHub, 2026-10-08)
- [x] Check the cosmetic-polish .btn-arrow buttons (2026-10-08: 360px and 1440px, hover, keyboard focus, reduced motion; arrow hidden below 384px by design, labels stay on one line)
- [x] Fixed CTABand focus ring in site and template (2026-10-08: rings inside a band use its text color; ink on the gold founding card, 3.3:1 to 8.2:1; white on the brand band)
- [x] Sync template to trinitywebco-sites (noscript menu fix b7eafa1 + CTABand fix c10974f; org commit c84dc98, 2026-10-08)
- [x] Deploy a Vercel preview of main (2026-10-09: https://trinity-web-co-site-1zdt40gd6-hlm10.vercel.app, behind Vercel login; production still 404)
- [x] Pre-launch checks at 360px and 1440px on the production build and the deployed preview: touch, reduced motion, JS-off, forced colors (2026-10-09: all pass; real CSP blocks nothing; Vercel Analytics is not enabled on the project, see TO DO)
- [x] Checked the business name and domain (2026-10-09): trinitywebco.com and trinityweb.co are someone else's; shortlist and the size of each option are in HANDOFF.md
- [x] Session-start hook shows this checklist (top 3 + group counts) in place of the CLAUDE.md rule; the Focus Forward hook now shows only in Focus Forward folders (2026-10-12)

## TO DO

In launch order. Items in the same group can run in parallel.

**Next focus: finish the two demos for the site**
- [x] Change the "Built by Trinity Web Co." credit link in the footer and the demo banner: it pointed to `https://trinitywebco.com/`, which someone else owns. Link dropped, text kept, in the template, both demos and `site/` (2026-10-12: 00b8ca1; demos a4f85c2 and af6fd1d; template synced, org commit 2789f32)
- [x] Review the improved demos (previews in HANDOFF.md), then merge `improve-demo` into `main` in both demo repos. Built 2026-10-12: Call/Text bar on phones, alternating sections; Purple Martin Text us, "How a visit works", compact services; Good Oak price menu, text-first booking, "Open now" (2026-10-13: reviewed and merged; Purple Martin 7397e1e, Good Oak 2f48792; branches deleted)
- [x] Fill both demo slots in `site/src/content/site.ts`: url, image, imageAlt, pageSpeed (titles "Demo: Purple Martin Heating & Air" and "Demo: Good Oak Barbershop") (2026-10-13: merged into main, c836c1e, with preview links and new screenshots; production URLs and PageSpeed come with the launch-day swap below)

**On hold: business name and domain**
- [ ] **Decide business name + domain (trinitywebco.com is taken) — blocks LLC, email, PO box, outreach.** Shortlist, DFW name overlap and the size of each option are in HANDOFF.md. Check the pick on SOSDirect and the USPTO trademark search before buying
- [ ] After deciding: register the domain in your own registrar account (playbook §6 ownership policy), then update the name/domain across this repo, the template (sync it) and both demos, and the root `CLAUDE.md` open item. Put the "Built by" / "Website by" credit link back on the new domain (removed 2026-10-12, 00b8ca1)
- [ ] Move the Vercel account from Hobby to Pro before launch (production demos are commercial use, which Hobby doesn't allow). Not needed while everything is preview-only (2026-10-12: Hector is holding Pro and production deploys until the name and domain are decided)
- [ ] Deploy both demos to production (`npx vercel deploy --prod` in each demo repo), run PageSpeed Insights (mobile) on each production URL. Needs Pro first; on hold with the name and domain (2026-10-13)

**Business and legal (before the first client signs)**
- [ ] Business email `hello@` on the chosen domain (Google Workspace, about $8/mo); the site and contact form use `hello@trinitywebco.com` until it's renamed
- [ ] Texas LLC (Form 205 on SOSDirect, about $300), then a free EIN, then a business checking account (playbook §6)
- [ ] Stripe for deposits, invoices and care-plan billing (playbook §6 invoicing). Step-by-step guide in `business/stripe-setup.md` (2026-10-14); it needs the name, the LLC and EIN, and the business bank account first, then about 30 minutes plus a test-mode dry run
- [ ] Ask the Texas Comptroller or a CPA whether care-plan hosting needs a sales tax permit; fill the blank in the contracts (before the first care-plan invoice)
- [ ] Attorney review of `business/sales/master-service-agreement.md` and `contract-scope-template.md`, using the 14-point list in `CLAUDE.md`
- [ ] PO box or virtual mailbox for the `[Mailing address]` in cold emails (CAN-SPAM; needed before outreach)

**Site content**
- [x] Short personal story for the About section (2026-10-14: Hector's own copy, merged 62ce5b4)
- [ ] Headshot for the About section: save it as `site/src/assets/headshot.jpg`: JPG, not HEIC (iPhone: Settings → Camera → Formats → Most Compatible), portrait 4:5, at least 1200 × 1500 px, head and shoulders with room to crop. Don't commit it: Claude adds it, plus a photo slot in the About section, on a new branch and sends a preview for Hector's OK before merging
- [ ] Formspree: create the form with your business inbox, replace `REPLACE_ME` in `site.forms.contactEndpoint`, and send a test that arrives (check spam)

**Vercel**
- [x] Turn on Web Analytics for `trinity-web-co-site` (Hector, in the dashboard). On the 2026-10-09 preview the script 404'd ("Be sure to enable Web Analytics for your project"). Hobby records page views only; call/text/form events need Pro (2026-10-15: turned on; the next deploy picks it up, and the launch-day analytics check confirms it)

**Final QA (after content and demos are in)**
- [ ] Run `/qa` (playbook §5 QA checklist) into `site/docs/qa-report.md`, including a real iPhone (Safari) and a real Android phone (Chrome), and Lighthouse mobile 90+
- [x] Optional forced-colors polish: the checklist progress bar and the How it works connector line disappear, and the founding card loses its panel edge. The text still carries the meaning, so this doesn't block launch (2026-10-13: fixed with system colors in site/ and the template CTABand; checked at 360 and 1440px with high contrast on and off)

**Launch day**
- [ ] Add the chosen domain to the Vercel project, update DNS, confirm HTTPS on `www` and the bare domain with one redirecting to the other
- [ ] Launch day: re-enable production deploys from main. Clear the Ignored Build Step in `trinity-web-co-site` → Settings → Git, set on 2026-10-12 to pause production builds
- [ ] Swap the demo slot links from preview URLs to production URLs (the links on `main` need a Vercel login): set each slot's `url` in `site/src/content/site.ts` to the demo's production URL and add its mobile `pageSpeed`, before deploying `site/`
- [ ] Deploy `site/` to production
- [ ] Send a test form submission on the live site and confirm it reaches your business inbox
- [ ] Confirm Vercel Analytics shows your own test visit and a test call-click or form event

**Instagram (plan: "Instagram content plan" doc, linked from `business/marketing/instagram-content-plan.md`)**
- [x] Create the Instagram business account and send the handle (2026-10-15: @trinitywebco)
- [ ] Answer the doc's "Still open" questions (Spanish follow-up, one account or two, restaurant demo). Voice is settled: a narrator speaks for Trinity Web Co., and no script uses Hector's name
- [ ] Add the Apple design skill, then build the brand kit and the 20 pieces in English and Spanish with HyperFrames on the PC (founding-offer carousel built but held)
- [ ] Post on the doc's 6-week order; R2 waits on the demos' production PageSpeed scores

**Right after launch (playbook §7 Week 1)**
- [ ] Google Search Console: verify the domain and submit `sitemap.xml`
- [ ] Google Business Profile for the business, with the site as its website link
- [ ] Cal.com booking link and a one-page PDF price sheet
- [ ] Then outreach, playbook §7 weeks 2–4 (`business/sales/prospect-tracker.csv`)
