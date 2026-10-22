# Trinity Web Co.: handoff

Last updated: 2026-10-20 (Instagram weeks 1 and 2 built in English and merged: C1, S1, C2, C6, S3; posts and contracts now promise Google Search Console, not analytics; the ElevenLabs key is in Bitwarden; next is week 3 and the narrator voice. Earlier: site polish, white hero river dots, site FAQ and form additions, and the Instagram brand kit merged; `motion-studio` moved out of this repo; production deploys paused). Written for a fresh Claude Code session picking this up with no other context.
Read `CLAUDE.md` (project rules, open items, launch checklist) and `business/playbook.md` (how the business runs) before changing anything. `CHECKLIST.md` holds the current DONE / TO DO list; a SessionStart hook (`.claude/hooks/checklist.js`) summarizes it at the start of every session.

## Where things stand

**2026-10-18 and 10-19.** The Instagram brand kit is built, approved and merged into `main` (merge bd1b45b, see "Instagram" below), and its branch is deleted. Later the same day, a few additions to our site (contact form questions, three FAQs, the sign-and-pay step, Starter visitor stats) were merged too (merge 55211e6, see "Site additions" below), and that branch is deleted as well. On 2026-10-19 the hero river dots turned white, paper with an ink ring, to match the Instagram kit (merge a9abd3e), and that branch is deleted too. The share image `site/public/og-image.png` still has gold dots; it gets redrawn with the final name (`CHECKLIST.md`, name and domain group). Later on 2026-10-19 a polish pass was merged (merge dfae98f, see "Site additions" below): prices without commas in a new wide style, a "Book a free call" bar on phones and tablets, the header link for the section being read underlined, scrollable demo previews, shorter pricing on phones, and a fix for the How it works line; its branch is deleted too. Every repo has only `main`, in sync with GitHub, with nothing untracked. The `motion-studio` side project now lives outside this repo at `C:\Users\hlmpr\projects\motion-studio` (see "`motion-studio`" below). Production deploys of our site stay paused until launch (see "Production is paused" below), so the demo-slot links on `main` point to previews that need a Vercel login. No local servers are running. What to do next is in `CHECKLIST.md`.

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
| This repo (business docs, template source, our site) | `C:\Users\hlmpr\projects\trinity-web-co` (the only local copy) | `hectorclawd/trinity-web-co`, `main` is the only branch | `trinity-web-co-site`, Git-connected, production builds paused (pushes to `main` show as Canceled). Latest preview (2026-10-19, branch `site-polish`, same content as `main`): https://trinity-web-co-site-ih4l1y5ou-hlm10.vercel.app |
| Client template | `templates/site-template/` (source of truth) | `trinitywebco-sites/site-template`, private template repo, synced through c974c2c (org commit 47a11dc, 2026-10-21: the AI photo rule in "Never do"; before that 8663172: schema, share tags and accessibility polish, plus the plugin-rules wording) | n/a |
| Demo 1: Purple Martin Heating & Air (HVAC) | `clients/purple-martin-air-lake-highlands/site` | `trinitywebco-sites/site-purple-martin-air-lake-highlands`, `main` is the only branch | Same name, not Git-connected. Preview (2026-10-13, `main` at 7397e1e): https://site-purple-martin-air-lake-highlands-9qqg0rano-hlm10.vercel.app |
| Demo 2: Good Oak Barbershop (barber) | `clients/good-oak-barbers-oak-cliff/site` | `trinitywebco-sites/site-good-oak-barbers-oak-cliff`, `main` is the only branch | Same name, not Git-connected. Preview (2026-10-13, `main` at 2f48792): https://site-good-oak-barbers-oak-cliff-aj3do2wcx-hlm10.vercel.app |

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
- **Pre-launch checks passed** at 360 and 1440px on a local production build (`astro build` + `astro preview`) and on the deployed preview: touch, reduced motion, JS off and forced colors. The real CSP blocks nothing. Forced colors only loses decoration: the checklist progress bar, the How it works connector line and the founding card's panel edge. Fixed on 2026-10-13: all three stay visible in high contrast mode.
- **Vercel Web Analytics is not enabled** on `trinity-web-co-site`. The deployed preview's console says "Failed to load script… Be sure to enable Web Analytics for your project and deploy again." Per Vercel's docs, Hobby gets page views only (50,000 events/month, 1-month window); **custom events (Call click, Text click, Form submit) need Pro**. Hector will flip the switch in the dashboard; redeploy right after.

## Business name and domain: decided 2026-10-21 (findings from 2026-10-09)

- **Decision (Hector, 2026-10-21):** keep the name Trinity Web Co.; the domain is `trinitywebdallas.com` and the email `hello@trinitywebdallas.com` (playbook decisions log). All 12 shortlisted `.com`s were still free on 2026-10-21 (Verisign RDAP). `site/` and the docs switched on branch `domain-trinitywebdallas`; the template and demos never named the domain. Registered the same day in Hector's own Cloudflare Registrar account (expires 2027-10-21; DNS on Cloudflare, nameservers apollo and margot; no records added yet). Email is set up the same day: Google Workspace Business Starter, user `hello@trinitywebdallas.com`, with MX (`smtp.google.com`), SPF, one DKIM key (`google._domainkey`; a duplicate was removed) and DMARC `p=none` reporting to hello@, all in Cloudflare DNS. Still to do: Hector searches the name on SOSDirect and USPTO; the DNS records for Vercel on launch day (DNS only, not proxied); DMARC to `p=quarantine` before outreach; the credit link comes back once the domain is live. The findings below are kept for the record.

- **`trinitywebco.com` belongs to someone else.** Registered 2026-04-13 at Squarespace Domains; it shows a Squarespace "Coming Soon" page. **`trinityweb.co` was registered the same day** (Tucows), so someone may be planning a "Trinity Web" business.
- **DFW name overlap:** Advent Trinity Marketing Agency (Arlington, TX, web design, SEO and ads for DFW businesses, since 2018). Elsewhere: Trinity Web Design and Consulting, LLC (Illinois/Indiana phone numbers, churches and small businesses) and Trinity Web Consulting (no location given). No business called exactly "Trinity Web Co." turned up. Web search doesn't clear a name: Hector still needs SOSDirect (Texas entities) and the USPTO trademark search.
- **Domains checked** (RDAP for `.com`; the `.co` WHOIS server for `.co`, because RDAP via rdap.org doesn't cover `.co`):
  - Available: trinitywebcompany.com, trinitywebdallas.com, trinitywebdfw.com, trinitywebtx.com, trinityriverweb.com, trinitybridgeweb.com, trinitywebdesignco.com.
  - Taken: trinityweb.co, trinitywebstudio.com, trinitywebdesign.com, trinitywebworks.com.
- **Rename shortlist, each with an available `.com`:** Elm Fork Web (elmforkweb.com; the Elm Fork is a branch of the Trinity in Dallas, so the river story and logo survive), Riverline Sites (riverlinesites.com), Limestone Web (limestoneweb.com), Bridgeline Sites (bridgelinesites.com), Bluebonnet Sites (bluebonnetsites.com).
- **Size of each option** (mentions / files, excluding build output and lockfiles):
  - Keep "Trinity Web Co.", change the domain: `trinitywebco.com` appears 29 / 17 (8 / 6 of those are `hello@trinitywebco.com`). Mostly find-and-replace, then a template sync and both demos.
  - Rename the business: add "Trinity Web Co." 96 / 53 (site 17/12, template 13/8, business docs 23/10, root docs 7/3, clients template 1/1, demo 1 18/10, demo 2 17/9). Also `og-image.png` (redraw it with the white river dots at the same time), probably the logo and favicon, and the demo screenshots. The GitHub org `trinitywebco-sites` (32 / 14) and Vercel project names are private and can wait.
- **Credit link removed (2026-10-12, 00b8ca1):** the "Built by Trinity Web Co." demo banner (`BaseLayout.astro`) and the "Website by" footer credit (`Footer.astro`) linked to `https://trinitywebco.com/`, the stranger's site. The text stays, the link is gone, in `templates/site-template/`, both demo repos and `site/`. Put the link back once the new domain is live. `site.url` in `site/src/content/site.ts` (canonical, `og:url`, schema) still says `trinitywebco.com` and changes with the domain decision.
- Root `CLAUDE.md` still lists "Domain. The site assumes `trinitywebco.com`" as an open item; update it once the decision is made.

## What happened on 2026-10-12

- **Credit link:** the "Built by Trinity Web Co." demo banner and footer credit no longer link to trinitywebco.com (someone else's). The text stays. Template 00b8ca1.
- **Template (synced, org commits 426326c and 55282ea):**
  - 97790b7: a Call/Text bar pinned to the bottom of the screen on phones (`CallBar.astro`, `features.callBar`). It hides while the hero buttons or the call band are on screen and while a form field has focus. The page gets bottom padding the bar's height, plus the safe area. It stays visible with JavaScript off.
  - 97790b7: homepage sections alternate backgrounds based on which ones show.
  - 06404d9: a "buttons" slot in `Hero` and `CTABand` for extra buttons like Text us.
  - 89fc6d7: `forms.replyNote` replaces the hard-coded "within one business day" line.
  - b987cd0 (2026-10-13, org f2aa882): the bar's text button reads "Text us". Both bar buttons fit side by side on one line at 360 and 320px. Tabbing through 4 pages of each demo at 360px never left a focused item hidden behind the bar once scrolling settled; during the smooth scroll it passes under the bar for a moment.
- **Purple Martin (merged 2026-10-13):** Text us buttons, a "How a visit works" section with 4 promises, and a compact "We also do" list. Its bar runs up to 1023px to match its Menu button.
- **Good Oak (merged 2026-10-13):** a price menu in place of the service cards, "Text to hold a chair" as the second hero button, a reply line that fits a barber, and "Open now" worked out in America/Chicago time.
- **Both demos:** they had missed some earlier template fixes (b7eafa1 no-JS menu, c10974f call band focus ring; Purple Martin also 6e6a34b and dd68bcd). Those are in now. QA results are in each demo's `docs/qa-report.md`: mobile Lighthouse 99 / 100, with the call bar checked at 360 to 1440px.
- **Demo slots:** filled with the preview links and fresh 1440x900 screenshots (`site/src/assets/demo-*.jpg`), merged into `main` on 2026-10-13 (c836c1e). Titles are "Demo: ...". There's no PageSpeed score yet. On launch day, swap in the production URLs and the scores (in `CHECKLIST.md`).
- **Screenshots:** each demo's `docs/screenshots/` has the homepage at 1440px (first screen and full page) and 360px (first screen, full page, and with the call bar), taken 2026-10-13.

## What happened on 2026-10-13 and 10-14

- **iPhone check:** Hector reviewed both demos and our site on an iPhone, and everything looked good. Both demo QA reports have it ticked; the Android (Chrome) line is still open.
- **High contrast mode:** the checklist progress bar, the How it works connector and the founding card stay visible with forced colors on (site 3b27ca5). The founding card fix is in the template's `CTABand` (ff9eef7, org a9772d0).
- **About copy:** Hector's own story replaces the placeholder (62ce5b4). It came from Hector's draft, checked against the playbook: salons in place of restaurants (§1 says skip restaurants for now), the founding terms as in §2 (first three clients, testimonial and case study), and "answer your texts, usually the same day" in place of "pick up when you call". No neighborhood or bilingual line for now; either can be added later.
- **Headshot, still to come:** save it as `site/src/assets/headshot.jpg`: JPG, not HEIC (iPhone: Settings → Camera → Formats → Most Compatible), portrait 4:5, at least 1200 × 1500 px, head and shoulders with room to crop. Don't commit it: Claude adds it, plus a photo slot in the About section, on a new branch and sends a preview for Hector's OK before merging.

## Instagram (2026-10-15 to 10-20)

- **The plan** is Hector's Claude Docs document "Instagram content plan" (https://claude.ai/code/artifact/fe017b40-4a71-4b18-b05c-3a262a2285b6, linked from `business/marketing/instagram-content-plan.md`). It holds 20 pieces (7 Reels, 9 carousels, 4 story sets, plus the held founding-offer carousel H1), each in English and Spanish, with scripts, rules and the 6-week posting order. Settled: account @trinitywebco for both languages; a neutral ElevenLabs narrator speaks for Trinity Web Co. and never names Hector; nobody on camera; free checks and calls in English or Spanish; no restaurant demo (R6 uses an "Example" badge). Instagram content also covers small restaurants (playbook decisions log, 2026-10-15); outreach niches are unchanged.
- **The brand kit** is in `business/marketing/instagram/`: a HyperFrames project. Its `README.md` maps everything. In short:
  - `config.ts` holds every fact a piece shows (name, handle, CHECK / REVISAR, prices, `[score]` / `[load time]`). `npm run sync` writes `brand/generated.js`, pulls the river and bridge logo straight from the site, and stops if a price differs from playbook §2–3.
  - `brand/` holds Archivo, the color tokens, type scale, Apple-style springs, the self-drawing river and logo, the Demo and Example badges, and safe-zone guides.
  - `compositions/` holds the shared pieces: Reel end card, caption track, carousel slide frame (1080×1350), story frame (1080×1920).
  - `npm run piece -- <entry.html> --lang both [--still] [--guides]` renders into the git-ignored `out/`.
- **Approved on 2026-10-15:** R1's end card in English and Spanish and C1's cover (samples in `samples/`). Hector chose white river dots (paper fill, ink ring) and a river-green DM keyword bubble: no gold anywhere except primary buttons and the founding offer. The Spanish labels are approved: "Ejemplo", "Desliza", "al mes", and "Demo" unchanged.
- **Commits (2026-10-15):** kit 76f6eb7, checklist 3b7532c, merged into `main` as bd1b45b and pushed; branch `instagram-brand-kit` deleted.
- **How it was built:** the Apple design skill (layout, spacing, type scale, springs) and the HyperFrames skills, with the brand's fonts and colors winning over both. HyperFrames is installed as a Claude Code plugin (0.8.140): run it through the plugin's launcher, not a bare `npx hyperframes` (the kit's npm scripts pin `hyperframes@0.8.140`; `scripts/render.mjs` takes `HYPERFRAMES_CLI` to use the launcher).
- **Safe zones used:** 9:16 frames keep text out of the top 250 px and bottom 350 px (the plan's rule), and Reels keep clear of x > 880 below y 1060 (the like/comment/share buttons). 4:5 slides keep text inside 88 px margins, since the profile grid trims 34 px from each side. Published guides disagree and none are official from Meta, so check the first real post on a phone.
- **Gotchas (also in the kit's README):** paths in compositions are from the kit folder, even in `samples/`; each composition repeats Archivo's `@font-face` (lint only reads it from the file itself); sub-compositions can't see the entry's variables, so entry files call `TWC.init()` to pass the language and transcript; strokes draw from `getTotalLength()` (SVG `pathLength="1"` didn't animate smoothly); Archivo's Latin subset has no → glyph (`TWC.arrow()`). **Untested so far:** a multi-slide carousel render (one slide per second, one PNG each) and captions from a real transcript; C1 and R1 are the first real tests.
- **The schedule** is the Claude Docs document "Instagram growth plan" (https://claude.ai/code/artifact/70864e6b-70ca-4105-82dc-38346fe34ea6): 12 weeks from Mon 2026-11-02, a status per piece (Idea, Script draft, Built, Approved, Posted, Held), and the weekly routine. Scripts stay in the content plan.
- **Built and approved in English (2026-10-19 and 10-20):** C1 prices carousel (6cdc7f9, with the kit's `DESIGN.md` and `.impeccable/design.json`), S1 speed-check story set (9eb5335, with the repo's `PRODUCT.md`), then week 2: C2 slow-site carousel, C6 own-it carousel, and S3 ask-us story plus `s3/s3-answer.html`, a reusable answer frame for week 5 (question, answer and `example` variables; the made-up default shows the Example badge). Each was built by a builder agent in a workflow, then checked by impeccable's finish reviewer. Spanish versions wait on Hector's check of the slide text.
- **Where the files go:** Google Drive (synced on this PC at `G:\My Drive`), folder "Trinity Web Co. Instagram posts", one subfolder per week ("Week 01 (Nov 2–8)" and on), one folder per piece with the PNGs or MP4s and a posting-notes file (stickers, captions to include).
- **Ownership wording (Hector, 2026-10-20):** posts, the playbook (§6, decisions log), the agreement (6.6) and the scope template say the client owns the domain, Google Business Profile and Google Search Console. Visitor stats live in Vercel Web Analytics on Trinity's team and reach the client in the monthly report. C6's caption must name the one-time $150 handoff fee.
- **Render notes:** `scripts/render.mjs` takes `--split N` (story sets: one MP4 and PNG per frame) and `--no-sync` (run `npm run sync` once, then several renders at once). The kit's `check` only audits a folder's `index.html`, so copy the kit's `brand`, `compositions`, `hyperframes.json`, `meta.json`, `package.json` and `frame.md` into a scratch folder with the piece as `index.html`. Opening a composition's HTML file straight in a browser shows a blank page; look at the renders.

## Site build clip and the design guide (2026-10-21)

- **The guide:** "Cooked or Cracked: 5 free repos that make Claude design" (Google Drive, `extra/`). What we took from it is in playbook §5 ("Design toolkit and build recipe") and §7 ("Private preview for a shop with no website"), with two decisions-log rows: private previews are allowed, and AI images only for general scenes with the owner's OK. Its prices and Cloudflare hosting weren't adopted. Taste is the one tool not installed yet (auto mode blocked it; Hector runs the line in `CHECKLIST.md`), and it's git-ignored once installed.
- **The clip:** How it works shows a drawn phone running through the five steps (a text thread, the proposal, the demo page filling in over its sketch, launch, a care text). It's scrubbed by scroll and never plays on its own. Screen readers skip it. With reduced motion or no JavaScript it shows its poster, and the video loads only when the section is close.
- **Re-rendering it** (after changing `site-build/site-build.html` or the How it works steps, which it mirrors): from `business/marketing/instagram/`, `HYPERFRAMES_CLI="<plugin launcher>" node scripts/render.mjs site-build/site-build.html --lang en`. Then, from the repo root, encode it cropped to the phone:
  - `ffmpeg -i business/marketing/instagram/out/site-build/site-build-en.mp4 -vf "crop=628:1166:226:92" -c:v libx264 -preset slow -crf 32 -g 2 -keyint_min 2 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart -an site/public/media/build-clip.mp4`
  - and the poster: `ffmpeg -sseof -0.05 -i <same input> -vf "crop=628:1166:226:92" -frames:v 1 -c:v libwebp -quality 82 site/public/media/build-clip-poster.webp`
  - That gives about 1.25 MB of video and a 15 KB poster. The keyframe every 2 frames is what keeps scrubbing smooth.

## `motion-studio` (moved out of this repo on 2026-10-18)

- **Where:** `C:\Users\hlmpr\projects\motion-studio`. Until 2026-10-18 it sat untracked inside this repo as `motion-studio/`; Hector chose to move it out.
- **What it is:** a separate side project from 2026-10-15: a 24-second "Trinity Web Co. site showcase" video, built by following its `TRINITY_VIDEO_GUIDE.md` (written for the MacBook, adapted for Windows). It's its own git repo (branch `master`, 5 commits, no remote). It has a custom Playwright renderer, an ElevenLabs voiceover, synthesized music, and Instagram and LinkedIn captions. The finished video is `out/final.mp4`, with a smaller email copy at `out/email/trinity-showcase.mp4`. It takes 585 MB, mostly `.venv` (415 MB) and renders in `out/` (120 MB). Its tooling overlaps the HyperFrames kit; use the kit for Instagram pieces.
- **The move:** nothing in its own files depended on the old path; they all use relative paths. Its Python `.venv` did. The activate scripts, `pyvenv.cfg` and the `numba` script were rewritten to the new path. The `.exe` tools were regenerated by reinstalling pip, numpy, cffi, idna and charset-normalizer at their same versions, with `--no-deps`. Git, the Python audio libraries and the Node modules were all checked from the new path. Its Claude Code history moved with it: `~/.claude/projects/C--Users-hlmpr-projects-motion-studio` (the memory folder was empty). Compiled Python caches still name the old path, which only shows up in error tracebacks.
- **A live ElevenLabs API key** is in its `.env`, untouched by the move. Its `.gitignore` excludes `.env`, and the key was never committed. On 2026-10-20 Hector put the key in Bitwarden, but the `.env` copy is still there (credentials live in Bitwarden, never in files). Never upload `.env` anywhere.
- **Back up to Google Drive** (its git repo has no remote, so this disk holds the only copy):
  - `out/final.mp4` (25 MB) and `out/email/trinity-showcase.mp4` (8.9 MB): the finished video and its email copy.
  - `audio/voiceover.mp3` and `audio/voiceover.timing.json`: the ElevenLabs take and its word timings. A new take costs credits and reads differently.
  - `docs/caption.txt` (Instagram and LinkedIn captions) and `docs/voiceover.txt` (the script).
  - Everything else git tracks (code, the guide, the site screenshots it was built from, about 7 MB) is easiest as one file: `git bundle create motion-studio.bundle --all` in the folder.
  - Skip `.venv`, `node_modules`, `out/silent.mp4`, `out/stills/`, `out/review/` and `audio/*.wav`: all reinstallable or regenerated by its scripts.

## Site additions (2026-10-18 and 10-19)

- **Site polish (2026-10-19, 18b6ed2 and 195d51a, merge dfae98f).** Hector asked to make the site look better. He chose to keep Archivo and refine it (over Overpass, Zilla Slab or Bricolage Grotesque), to drop the commas from prices, and to add all four scroll features suggested from the UX and UI design skills:
  - **Prices:** no commas anywhere on the site ($1500, $2800, $4800, founding $900 and $1800, and "from $1500" in the meta description). Package prices are wide and heavy like the headlines (`font-stretch: 125%`, weight 820, proportional figures). Care plan prices sit on their own line in the same style, smaller.
  - **Line breaks:** headlines use `text-wrap: balance`, and paragraphs and list items use `text-wrap: pretty` (`tokens.css`). Demo titles use `pretty`, since balance split "Purple / Martin" on phones, and "Heating & Air" has non-breaking spaces.
  - **Booking bar:** `site/src/components/site/BookBar.astro`, adapted from the template's `CallBar`, with one "Book a free call" button. It shows below 1024px, where the header button is inside the menu. It hides while any `[data-book-cta]` block is on screen (the hero buttons, `#contact`) and while a form field has focus. The footer gets extra bottom padding for it.
  - **Section highlight:** `site/src/components/site/CurrentSection.astro` sets `aria-current="location"` on the header link for the section crossing a band 40–45% down the screen. Its style goes through `#site-nav` to outrank the header's scoped styles.
  - **Demo previews:** each demo frame (`.demo-window` in `DemoSlots.astro`) is a scrollable window, with `tabindex="0"` and `role="region"`, onto the demo's whole homepage. Hector first got a version where the screenshots panned as the page scrolled, and asked for this instead: scrolling the page must not move the demos, and scrolling on a demo scrolls it. The images (`site/src/assets/demo-*-scroll.jpg`) are copies of each demo's `docs/screenshots/home-1440-full.jpg` from 2026-10-13, and the generated WebP files are 190 KB at most. Copy them again if a demo changes.
  - **Shorter pricing on phones:** tighter rows and 16px lists, 3731 → 3394px at 390px wide.
  - **Fix:** the How it works connector never drew on scroll (see the Lightning CSS gotcha below).
  - **Commas only come off on the website** (Hector, 2026-10-19). The price sheet (`business/sales/price-sheet.html`) and the Instagram kit keep them; the kit writes `$1,500` from plain numbers in `config.ts` (`brand/kit.js`).
  - **Checked:**
    - `npm run check` and `npm run build` passed.
    - In Chrome at 360, 390, 768 and 1440px there was no sideways scroll.
    - The bar shows and hides as intended, each linked section underlines its header link, and the "How it works" line now draws in.
    - Mouse wheel and keyboard scroll a demo without moving the page, and scrolling the page doesn't move the demos.
- **Hero river dots (2026-10-19, 3c29a12, merge a9abd3e):**
  - The neighborhood dots in `site/src/components/site/RiverHero.astro` are now paper (`--color-surface`) with the same 2.5px ink ring. That matches the Instagram kit (`brand/kit.js`, and the hero copy in `scripts/sync-config.mjs`), and gold is back to primary buttons and the founding offer only.
  - Checked at 360 and 1440px, with motion off, after the fade-in with motion on, and with forced colors on.
  - The kit's `npm run sync` reads only the river path and the stops from that file, not the colors, so it's unaffected.
  - `og-image.png` still has gold dots. Hector chose to redraw it after the name decision (`CHECKLIST.md`).

- **Where they came from:** another AI wrote a prompt to add pricing, pages, a new hero, a trust strip, a process, a work section, FAQs and intake questions to our site. Hector had it compared with the site, the playbook and the service agreement first, and it wasn't applied as written. Most of it was already on the site. Its prices conflict with playbook §2–3: a "Launch" package at $750–$1,250, Growth at $1,500–$2,500, and one optional care plan at $50–$99. So do its e-commerce add-on, the "local small businesses" niche, sending the intake form at the intro call, and "this site as case study #1" with empty client slots. If that prompt turns up again, don't apply it.
- **What was built and merged** (76c64f1, merge 55211e6):
  - Contact form: two optional questions, "What should your site get customers to do?" (checkboxes: Call or text, Book online, Ask for a quote, Visit in person) and "When would you like it live?". They're in `site/src/pages/index.astro`, in the `ContactForm` slot, so the template component is unchanged.
  - FAQ in `site/src/content/site.ts`: what a revision round is, whether the site can be in Spanish, and online stores.
  - How it works, step 2 (Proposal): "If it looks right, you sign online, pay to hold your spot and fill in a form about your business."
  - Starter: "Simple visitor stats, so you can see how many people visit" (playbook §2 gives Starter Vercel Web Analytics).
- **Hector's calls:**
  - The site can say the free call can be in English or Spanish.
  - The Spanish add-on price (+40%) stays off the site. The answer says it's "an add-on I'll quote with your package", since §2 sells add-ons once the package is agreed.
  - The online-store answer can say "your site can link to your store".
- **The revision FAQ matches the service agreement §4.1–4.4 and the scope page §4:** 5 business days for one list of changes, about 2–3 business days to make them, new pages, features or design direction are change orders quoted in writing first, and $150 for an extra round. Change it whenever those change.
- **Formspree:** its docs say checkboxes that share a name arrive as one comma-separated value, so `goal` comes through as, for example, "Call or text, Book online". This is untested until the form ID replaces `REPLACE_ME`; the Formspree item in `CHECKLIST.md` covers it.
- **Checked:**
  - `npm run check` (0 errors, 0 warnings) and `npm run build` passed.
  - At 360 and 1440px: no sideways scroll; the checkboxes stack at 360 and sit in two columns from 640px; each checkbox row is 44px tall; Tab reaches them and Space ticks them, with a visible focus ring.
  - The new copy is on the deployed preview (link in the table above).

## Production is paused (2026-10-12)

- **What happened:** `trinity-web-co-site` turned out to be connected to GitHub (`hectorclawd/trinity-web-co`, production branch `main`), so every push to `main` deployed to production. trinity-web-co-site.vercel.app was public with no `noindex`. There were 9 production deployments, the oldest 3 days old.
- **The fix, with Hector's OK:** the project's Ignored Build Step (Settings → Git) is now `if [ "$VERCEL_ENV" = "production" ]; then echo "Production deploys paused until launch"; exit 0; fi; exit 1`. Pushes to `main` are skipped, and other branches still build previews. Git stays connected.
- **Cleanup:** all 9 production deployments were removed: the 6 from 2026-10-12 that day, and the 3 older ones (`pblsb5cae`, `ken7pwfyq`, `jnpfycdsq`) on 2026-10-13. trinity-web-co-site.vercel.app returns 404 again. The only production entry left is a Canceled one, from the test push that showed the Ignored Build Step works.
- **Launch day:** clear the Ignored Build Step to deploy production again (in `CHECKLIST.md`).
- **To look at `main` before launch:** `main` builds nothing while this is on. Push a branch (it builds a preview by itself) or run `npx -y vercel@latest deploy --target=preview` from the repo root.

## Gotchas (learned the hard way)

- **Vercel's first deploy always goes to production.** A deploy to a project with *no deployments* lands on Production even with `--target=preview`; once any deployment exists, the flag works. `/new-site` step 9 handles this: deploy, deploy again, remove the production one. Never remove a project's last deployment.
- **Vercel CLI isn't installed globally.** Use `npx -y vercel@latest …`. It's logged in as `hlopez75235-4319`. To check a protected preview, use `npx vercel curl <url> -- -s -o /dev/null -w "%{http_code}"`.
- **The Vercel connector (MCP) returns 403** on these new projects, so it can't make share links. Use the CLI, or the Share button in the dashboard.
- **Pushing to `trinitywebco-sites/site-template`** was blocked once by the auto-mode permission check. It went through after Hector explicitly OK'd the sync. Follow the sync steps in `CLAUDE.md` exactly.
- **Screenshots and QA tooling on Windows:**
  - Playwright is only available inside the global `@playwright/cli` package. Import it as `file:///C:/Users/hlmpr/AppData/Roaming/npm/node_modules/@playwright/cli/node_modules/playwright-core/index.mjs` with `chromium.launch({ channel: 'chrome' })`.
  - In Git Bash, prefix commands with `MSYS_NO_PATHCONV=1` when passing URL paths like `/`.
  - Lighthouse runs as `npx -y lighthouse`.
  - `astro preview` listened on IPv6 only (`[::1]`) on 2026-10-18, so `curl http://localhost:<port>/` failed with exit code 7. Use `http://[::1]:<port>/` for curl and Playwright.
  - Playwright element screenshots stop at the bottom of the window. The hero is 957px tall at 1440px wide, so a 900px-tall window cut off the labels under the river. Use a window taller than the element before judging what's clipped.
- **Lightning CSS (the minifier in the Tailwind/Vite build) breaks scroll-driven animations written in one rule.** It folds `animation-timeline` into the `animation` shorthand, which browsers reject, so the animation silently never runs. Put `animation-timeline` and `animation-range` in a separate rule (see `Process.astro`), then check the built CSS in `site/dist/_astro/`.
- **Other Claude sessions open in this folder hold back `git add`, `commit` and `checkout`** ("Sync light"). Hector types `/sync allow` to let git run alongside them.
  - Files in the client repos are checked out with CRLF line endings, so regexes over them need `\r?\n`.
- **Local Lighthouse quirks:**
  - Best Practices is 96 locally because `/_vercel/insights/script.js` 404s on `astro preview`. As of 2026-10-09 it also 404s on Vercel, because Web Analytics isn't enabled on the projects yet.
  - Demos score SEO 69 because of the intentional `noindex`.
  - The occasional outlier run (65, 79) has been machine load. Rerun, and record both sets.
- **The header check snippet** lives in `templates/site-template/.claude/commands/qa.md` and the demos' copies. `site/.claude/commands/qa.md` doesn't have it; `site/` has its own `/qa` that isn't synced from the template.
- **`AGENTS.md`** in the repo root is Codex's standing prompt (2026-10-21): Codex fixes, Claude builds. It points at `CLAUDE.md` and the playbook instead of copying them, so it doesn't go stale, and it's tracked in git now. It replaced the old ignored local copy of `CLAUDE.md`; that copy's still-correct notes were folded in.
- **Hosting is settled: Vercel Pro.** On 2026-10-09 Hector reviewed switching to Cloudflare and decided to stay (playbook decisions log). Revisit at 25+ clients.

## Next up

The live to-do list is `CHECKLIST.md`. Beyond it:

1. **Next options, any order** (none waits on the name and domain):
   - **Instagram week 3** (C3, C8, S2 without audio; R3 needs the voice): build two weeks ahead of the growth plan's schedule, English first.
   - **The Reels** (R1, R3, R4, R5): each needs an ElevenLabs voiceover in English and Spanish, with one multilingual voice (not chosen yet). Hector checks the Spanish script before it renders. Then run `hyperframes transcribe` on each voiceover for the caption timings, and time the scenes to the audio.
   - **Captions, hashtags and alt text** for weeks 1 and 2 by 2026-10-30, and the Spanish versions once Hector checks each script.
2. **What's left that doesn't wait on the name and domain:** the headshot (see above), Web Analytics on `trinity-web-co-site`, the tax question on care-plan hosting, and the Android check of both demos. The Formspree form needs the business inbox; Stripe and the attorney review are better after the name is settled. The Stripe setup is written up and ready in `business/stripe-setup.md` (2026-10-14); it waits on the name, the LLC and EIN, and the bank account. Vercel Pro and every production deploy are on hold until the name and domain are decided.
3. **The domain, `trinitywebdallas.com`** (decided and registered 2026-10-21, above): next the business email, then the LLC, PO box and outreach can go ahead.
4. Other open items in `CLAUDE.md` that block launch: Formspree form ID, the headshot, business setup (playbook §6), and the attorney review before the first client signs.
5. Launch day, from `CHECKLIST.md`: add the chosen domain to Vercel, re-enable production deploys from `main` (clear the Ignored Build Step), deploy `site/` to production, test the live form and analytics. After launch, put the demos' real PageSpeed score and load time into the Instagram kit's `config.ts` in place of `[score]` and `[load time]`, and re-render (R2 waits on this).
6. After launch, playbook §7 weeks 2–4: build the prospect list and start outreach (`business/sales/prospect-tracker.csv`).
