# Trinity Web Co. checklist

Summarized at the start of every Claude Code session in this repo by the SessionStart hook (`.claude/hooks/checklist.js`): the top 3 open items, then each group's done/total. Tick items in place inside their group (`- [x]`) with the date or commit when done, so the counts move; DONE holds older history. Add new to-dos to the right group under TO DO. Longer context is in `HANDOFF.md`.

Last updated: 2026-10-23

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
- [x] **Decide business name + domain (trinitywebco.com is taken) — blocks LLC, email, PO box, outreach.** Shortlist, DFW name overlap and the size of each option are in HANDOFF.md. Check the pick on SOSDirect and the USPTO trademark search before buying (2026-10-21: keep "Trinity Web Co.", domain trinitywebdallas.com, still available that day; playbook decisions log)
- [x] Register trinitywebdallas.com in your own registrar account (Cloudflare Registrar, Porkbun or Namecheap; playbook §6 ownership policy) (2026-10-21: Cloudflare Registrar, expires 2027-10-21, Cloudflare DNS; keep auto-renew on, and confirm the registrant email Cloudflare sent)
- [ ] Search "Trinity Web Co." on SOSDirect and the USPTO trademark search, since the LLC will use the name
- [x] Update the domain across this repo: `site/` (url, email), docs, the client admin template and the root `CLAUDE.md` open item. The site template and both demos never named the domain, so they need no change or sync (2026-10-21, on branch `domain-trinitywebdallas` for Hector's OK)
- [ ] Once the domain is live: put the "Built by" / "Website by" credit link back on it in the template (then sync), both demos and `site/` (removed 2026-10-12, 00b8ca1)
- [ ] Redraw og-image (white dots + final name): `site/public/og-image.png`, 1200×630, still has the old gold river dots and "Trinity Web Co." (left as is on 2026-10-19)
- [ ] Move the Vercel account from Hobby to Pro before launch (production demos are commercial use, which Hobby doesn't allow). Not needed while everything is preview-only (2026-10-12: Hector is holding Pro and production deploys until the name and domain are decided)
- [ ] Deploy both demos to production (`npx vercel deploy --prod` in each demo repo), run PageSpeed Insights (mobile) on each production URL. Needs Pro first; on hold with the name and domain (2026-10-13)

**Business and legal (before the first client signs)**
- [x] Business email `hello@trinitywebdallas.com` (Google Workspace, about $8/mo); the site and contact form already use it (2026-10-21: Google Workspace Business Starter, user `hello@`; MX, SPF, DKIM and DMARC (`p=none`) records in Cloudflare, checked through public DNS; plain-text signature in Gmail. Tighten DMARC to `p=quarantine` after a few weeks of clean reports, before outreach)
- [ ] Texas LLC (Form 205 on SOSDirect, about $300), then a free EIN, then a business checking account (playbook §6)
- [ ] Stripe for deposits, invoices and care-plan billing (playbook §6 invoicing). Step-by-step guide in `business/stripe-setup.md` (2026-10-14); it needs the name, the LLC and EIN, and the business bank account first, then about 30 minutes plus a test-mode dry run
- [ ] Ask the Texas Comptroller or a CPA whether care-plan hosting needs a sales tax permit; fill the blank in the contracts (before the first care-plan invoice)
- [ ] Attorney review of `business/sales/master-service-agreement.md` and `contract-scope-template.md`, using the 14-point list in `CLAUDE.md`
- [ ] PO box or virtual mailbox for the `[Mailing address]` in cold emails (CAN-SPAM; needed before outreach)
- [ ] Bring the sales docs up to the 2026-10-23 prices (Launch $750–$1,250, Growth $1,500–$2,500, one care plan $50–$99/mo, no Premium or founding offer): `price-sheet.html` (before any walk-in), `discovery-call.md`, `master-service-agreement.md`, `contract-scope-template.md`, `stripe-setup.md`, and the held founding-offer Instagram carousel. Then redo playbook §8 income math

**Site content**
- [x] How it works build clip: a drawn phone runs through the five steps as you scroll, from the design guide's scroll-played clip (2026-10-21, branch `build-clip`, for Hector's OK). Made with the Instagram kit (`business/marketing/instagram/site-build/`), shown by `site/src/components/site/BuildClip.astro`; re-render steps in HANDOFF.md
- [x] Install the Taste design skill (auto mode blocks Claude from installing it): in PowerShell from the repo root, `npx skills add https://github.com/Leonxlnx/taste-skill --skill design-taste-frontend -a claude-code -y`, then start a new session (playbook §5, design toolkit) (2026-10-21: installed in `.claude/skills/design-taste-frontend/`, git-ignored; `skills-lock.json` records the version)
- [x] Short personal story for the About section (2026-10-14: Hector's own copy, merged 62ce5b4)
- [ ] Headshot for the About section: save it as `site/src/assets/headshot.jpg`: JPG, not HEIC (iPhone: Settings → Camera → Formats → Most Compatible), portrait 4:5, at least 1200 × 1500 px, head and shoulders with room to crop. Don't commit it: Claude adds it, plus a photo slot in the About section, on a new branch and sends a preview for Hector's OK before merging
- [x] Review the `faq-form-process` preview, then merge it into `main` (built 2026-10-18): two optional contact form questions (what the site should get customers to do, when to go live), FAQs on revision rounds, Spanish and online stores, the sign-and-pay step under How it works, and visitor stats in Starter (2026-10-18: reviewed and merged, 55211e6; branch deleted)
- [x] Formspree: create the form with your business inbox, replace `REPLACE_ME` in `site.forms.contactEndpoint`, and send a test that arrives (check spam). (2026-10-21: form `xvkzedbz` to hello@trinitywebdallas.com, branch `formspree-id`; Hector's test from the preview arrived.) The test should tick a couple of the "What should your site get customers to do?" boxes: Formspree should join them into one comma-separated `goal` value
- [x] Optional: hero river dots in white (paper fill, ink ring) instead of gold, to match the Instagram kit and the gold-only rule in `CLAUDE.md` (`site/src/components/site/RiverHero.astro`, site-only, no template sync). On a branch with a preview for Hector's OK (2026-10-19: reviewed and merged, 3c29a12, merge a9abd3e; branch deleted. The share image keeps its gold dots until it's redrawn with the final name, see the name and domain group)
- [x] Review the `site-polish` preview, then merge it into `main` (built 2026-10-19; reviewed and merged 2026-10-19, 18b6ed2 and 195d51a, merge dfae98f; branch deleted). Type: prices without commas, set wide and heavy like the headlines (care plan prices on their own line), balanced headline breaks and no lone last words. Scroll: a "Book a free call" bar on phones and tablets, the header link for the section being read underlined, demo previews you scroll inside (each demo's whole homepage in a small window; the page itself scrolls past them as usual), and shorter pricing on phones. Also fixes the How it works line, which never drew on scroll (the CSS minifier broke it)

**Vercel**
- [x] Turn on Web Analytics for `trinity-web-co-site` (Hector, in the dashboard). On the 2026-10-09 preview the script 404'd ("Be sure to enable Web Analytics for your project"). Hobby records page views only; call/text/form events need Pro (2026-10-15: turned on; the next deploy picks it up, and the launch-day analytics check confirms it)

**Final QA (after content and demos are in)**
- [ ] Run `/qa` (playbook §5 QA checklist) into `site/docs/qa-report.md`, including a real iPhone (Safari) and a real Android phone (Chrome), and Lighthouse mobile 90+
- [x] Optional forced-colors polish: the checklist progress bar and the How it works connector line disappear, and the founding card loses its panel edge. The text still carries the meaning, so this doesn't block launch (2026-10-13: fixed with system colors in site/ and the template CTABand; checked at 360 and 1440px with high contrast on and off)

**Launch day**
- [ ] Add the chosen domain to the Vercel project, update DNS, confirm HTTPS on `www` and the bare domain with one redirecting to the other. Make `www` the main address (2026-10-23: outreach links to https://www.trinitywebdallas.com), and change `site.url` in `site/src/content/site.ts` to match
- [ ] Launch day: re-enable production deploys from main. Clear the Ignored Build Step in `trinity-web-co-site` → Settings → Git, set on 2026-10-12 to pause production builds
- [ ] Swap the demo slot links from preview URLs to production URLs (the links on `main` need a Vercel login): set each slot's `url` in `site/src/content/site.ts` to the demo's production URL and add its mobile `pageSpeed`, before deploying `site/`
- [ ] Deploy `site/` to production
- [ ] Send a test form submission on the live site and confirm it reaches your business inbox
- [ ] In Formspree, restrict form `xvkzedbz` to trinitywebdallas.com (left open until launch so tests from preview links work)
- [ ] Confirm Vercel Analytics shows your own test visit and a test call-click or form event

**Instagram (plans: the "Instagram content plan" doc, linked from `business/marketing/instagram-content-plan.md`, and the "Instagram growth plan" doc, https://claude.ai/code/artifact/70864e6b-70ca-4105-82dc-38346fe34ea6, which holds the schedule and steps)**
- [x] Create the Instagram business account and send the handle (2026-10-15: @trinitywebco)
- [x] Answer the doc's "Still open" questions (2026-10-15/16: narrator speaks for Trinity Web Co. and never names Hector; checks and calls in English or Spanish; both languages on @trinitywebco; no restaurant demo, R6 keeps its "Example" menu)
- [x] Add the Apple design skill, then build the brand kit with HyperFrames on the PC (2026-10-15: `business/marketing/instagram/`, 76f6eb7, merged into `main` as bd1b45b; samples of R1's end card in both languages and C1's cover approved; white river dots and a river-green DM bubble, no gold; Spanish labels approved)
- [x] C1 prices carousel: 7 slides from the plan, English, then Spanish once Hector checks the slide text. No audio, so it can start now. It's the kit's first multi-slide render: check that each second gives exactly one slide (2026-10-20: English approved and merged, 6cdc7f9, with the kit's DESIGN.md; slide 6 now says "Your Google Search Console" instead of visitor stats, merged with week 2. Spanish is part of the "other pieces" item below)
- [x] Weeks 1 and 2 in English: S1 speed-check story set (2026-10-20, 9eb5335, with PRODUCT.md); C2 slow-site carousel, C6 own-it carousel, and S3 ask-us story with its reusable answer frame (2026-10-20, approved, merged with this update). They're in Drive, "Trinity Web Co. Instagram posts", in weekly folders with posting notes. C6's caption must name the one-time $150 handoff fee. Posts promise Google Search Console, not analytics (playbook decisions log, 2026-10-20). R5, week 2's Reel, waits on the narrator voice
- [ ] Growth plan setup before posting starts on 2026-11-02 (the doc's "Before posting starts" list): profile, the kit's DESIGN.md (impeccable's documenter agent), weeks 1 and 2 built in both languages with captions, finish-reviewer pass, week 1 scheduled
- [ ] Approve the 24 new pieces for weeks 7 to 12 in the growth plan by 2026-10-31, then write their scripts into the content plan doc
- [ ] R1 intro Reel: move the ElevenLabs key from `C:\Users\hlmpr\projects\motion-studio\.env` into Bitwarden (2026-10-20: done), pick one multilingual narrator voice (2026-10-20: Chris, in the kit's `config.ts`), and make the voiceover in English and Spanish (Hector checks the Spanish script first). Then time the scenes and end card to the audio (2026-10-20: `scripts/voiceover.mjs` makes each take plus its word timings for the captions; English voiceovers done for R1, R3, R4 and R5; R1, R4 and R5 are being built; Spanish waits on Hector's check of each `script-es.txt`)
- [x] Decide on the untracked `motion-studio/` folder (a 24 s site showcase video side project with its own git repo and an ElevenLabs key in `.env`; details in HANDOFF.md) (2026-10-18: moved out to `C:\Users\hlmpr\projects\motion-studio`, venv paths fixed; Hector backs up the files listed in HANDOFF.md to Google Drive)
- [ ] Build the other 18 pieces in English and Spanish from the kit (`npm run piece` in `business/marketing/instagram/`; founding-offer carousel built but held). Hector checks each Spanish script before it renders
- [ ] Post on the growth plan's 12-week schedule, starting 2026-11-02, with its weekly routine (Monday review, build two weeks ahead, Spanish check, captions, 20 minutes a day of local engagement); R2 waits on the demos' production PageSpeed scores
- [ ] Reset the growth plan's starting targets after week 4 (2026-11-30)
- [ ] 12-week review in week 12 (from 2027-01-18), and draft the next 12 weeks from what worked

**Right after launch (playbook §7 Week 1)**
- [ ] Google Search Console: verify the domain and submit `sitemap.xml`
- [ ] Google Business Profile for the business, with the site as its website link
- [ ] Cal.com booking link and a one-page PDF price sheet
- [ ] Then outreach, playbook §7 weeks 2–4 (`business/sales/prospect-tracker.csv`)
