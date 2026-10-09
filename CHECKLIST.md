# Trinity Web Co. checklist

Shown at the start of every Claude Code session in this repo (see `CLAUDE.md`). Tick items off with the date or commit when done, and add new to-dos under TO DO. Longer context is in `HANDOFF.md`.

Last updated: 2026-10-09

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

## TO DO

In launch order. Items in the same group can run in parallel.

**Business and legal (before the first client signs)**
- [ ] Confirm and register `trinitywebco.com` in your own registrar account (playbook §6 ownership policy)
- [ ] Business email `hello@trinitywebco.com` (Google Workspace, about $8/mo); the site and contact form already use this address
- [ ] Texas LLC (Form 205 on SOSDirect, about $300), then a free EIN, then a business checking account (playbook §6)
- [ ] Stripe for deposits, invoices and care-plan billing (playbook §6 invoicing)
- [ ] Ask the Texas Comptroller or a CPA whether care-plan hosting needs a sales tax permit; fill the blank in the contracts (before the first care-plan invoice)
- [ ] Attorney review of `business/sales/master-service-agreement.md` and `contract-scope-template.md`, using the 14-point list in `CLAUDE.md`
- [ ] PO box or virtual mailbox for the `[Mailing address]` in cold emails (CAN-SPAM; needed before outreach)

**Site content**
- [ ] Headshot and a short personal story for the About section
- [ ] Formspree: create the form with `hello@trinitywebco.com` as the inbox, replace `REPLACE_ME` in `site.forms.contactEndpoint`, and send a test that arrives (check spam)

**Vercel**
- [ ] Move the Vercel account from Hobby to Pro (Hobby doesn't allow commercial sites)
- [ ] Turn on Web Analytics for `trinity-web-co-site` and redeploy. On the 2026-10-09 preview the script 404'd ("Be sure to enable Web Analytics for your project"), so no visits or call/text/form events are recorded yet
- [ ] Deploy both demos to production (`npx vercel deploy --prod` in each demo repo), run PageSpeed Insights (mobile) on each production URL
- [ ] Fill both demo slots in `site/src/content/site.ts`: url, image, imageAlt, pageSpeed (titles "Demo: Purple Martin Heating & Air" and "Demo: Good Oak Barbershop")

**Final QA (after content and demos are in)**
- [ ] Run `/qa` (playbook §5 QA checklist) into `site/docs/qa-report.md`, including a real iPhone (Safari) and a real Android phone (Chrome), and Lighthouse mobile 90+
- [ ] Optional forced-colors polish: the checklist progress bar and the How it works connector line disappear, and the founding card loses its panel edge. The text still carries the meaning, so this doesn't block launch

**Launch day**
- [ ] Add `trinitywebco.com` to the Vercel project, update DNS, confirm HTTPS on `www` and the bare domain with one redirecting to the other
- [ ] Deploy `site/` to production
- [ ] Send a test form submission on the live site and confirm it reaches `hello@trinitywebco.com`
- [ ] Confirm Vercel Analytics shows your own test visit and a test call-click or form event

**Right after launch (playbook §7 Week 1)**
- [ ] Google Search Console: verify the domain and submit `sitemap.xml`
- [ ] Google Business Profile for Trinity Web Co., with the site as its website link
- [ ] Cal.com booking link and a one-page PDF price sheet
- [ ] Then outreach, playbook §7 weeks 2–4 (`business/sales/prospect-tracker.csv`)
