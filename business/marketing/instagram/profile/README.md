# @trinitywebco profile kit

Everything to set up the Instagram profile, and the Facebook page that Reels cross-post to. It comes from the "Before posting starts" list and the Profile row in the "Instagram growth plan" doc (https://claude.ai/code/artifact/70864e6b-70ca-4105-82dc-38346fe34ea6). It also follows two decisions from 2026-10-29 in the playbook's decisions log: prospects book through Cal.com, so no phone number appears here, and client texts get a reply within 1 business day.

## Profile fields (copy and paste)

| Field | What to enter |
| --- | --- |
| Profile picture | `profile-picture.png` (1080 × 1080; Instagram crops it to a circle, and the bridge stays inside) |
| Username | `trinitywebco` |
| Name | `Trinity Web Co. · Dallas websites` (33 of 64 characters; the name field is searchable, so "Dallas websites" helps people find you) |
| Category | Web designer (Edit profile → Category; turn on "Display category on profile") |
| Bio | `Websites for Dallas small businesses. Prices in writing up front. DM CHECK for a free site check. English · Español` (115 of 150 characters) |
| Link 1 | Title `Book a free call`, URL `https://cal.com/trinitywebdallas/free-call` |
| Link 2 | Title `Website`, URL `https://www.trinitywebdallas.com` |
| Contact options | Email: `hello@trinitywebdallas.com`. Leave the phone number blank |
| Pronouns, gender | Leave blank |

Put the booking link first: it's the first one people see when they tap the links.

The bio used to say "Fixed prices". That changed on 2026-10-24: prices are now starting prices, with the exact price in writing (playbook §1–3; R1 made the same change).

## Highlights

Make one highlight per row from the stories it lists, as they post. To set a cover: open the highlight → Edit highlight → Edit cover → pick the file from your camera roll.

| Highlight name | Cover file | Stories that go in it |
| --- | --- | --- |
| Prices | `highlights/highlight-prices.png` | C1, C8 |
| Demos | `highlights/highlight-demos.png` | R4, R5, C5 |
| How it works | `highlights/highlight-how-it-works.png` | R7 |
| FAQ | `highlights/highlight-faq.png` | S3 |
| Free check | `highlights/highlight-free-check.png` | S1, S4 |

The covers are 1080 × 1920 so they also work as a story. Instagram shows only the center circle, and each drawing sits inside it.

## Pinned posts

The plan pins R1, C1 and R4 (English versions). **Hold R1** until it's fixed: it still says "Text us and you hear back the same day", which no longer matches either 2026-10-29 decision. Until then, pin C1 and R4, plus the newest Reel.

## Facebook page (by 2026-11-01)

Use the same profile picture, `Trinity Web Co.` as the page name, Web designer as the category, the same bio, the website link and the email. Then link it to @trinitywebco in Accounts Center so Reels share to it (`CHECKLIST.md`).

## Logo files (`logo/`)

| File | Use it on |
| --- | --- |
| `trinity-web-co-logo.png` | Light backgrounds (transparent PNG, bridge in River deep, name in Ink) |
| `trinity-web-co-logo-white.png` | Dark backgrounds or photos (transparent PNG, all Paper white) |
| `trinity-web-co-logo-on-limestone.png` | When you need a solid background, light |
| `trinity-web-co-logo-on-river.png` | When you need a solid background, dark |
| `trinity-logo-mark.png` / `.svg` | The bridge alone, River deep, transparent |
| `trinity-logo-mark-paper.png` / `.svg` | The bridge alone, Paper white, transparent |

The bridge uses the same drawing as `site/public/logo-mark.svg`, with a little padding so its round ends aren't clipped at large sizes. The name is set in Archivo at weight 820, 120% wide, like the site header. No gold, per the kit's `DESIGN.md`: gold is for primary buttons only.

## Re-rendering

Everything here is drawn by `render-profile.cjs` from the brand colors, the bridge paths and the kit's Archivo font. From the repo root, run `node business/marketing/instagram/profile/render-profile.cjs`. It needs Playwright; on Hector's PC, see the Playwright note under "Gotchas" in `HANDOFF.md`.
