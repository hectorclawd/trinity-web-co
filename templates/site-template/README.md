# Trinity Web Co. site template

The starter for every Trinity Web Co. client site (playbook section 5): Astro + Tailwind CSS, with every business fact in one file, `src/content/site.ts`.

The sample data is a fictional "Sample HVAC Co." so the template builds and can be previewed. Every `[Sample` string and `REPLACE_ME` value must be gone before launch.

## Start a new client site

1. **On GitHub:** in the `trinitywebco-sites` org, open `site-template` and choose **Use this template**. Name the repo `site-<client-slug>`.
2. **Clone** it to `trinity-web-co/clients/<client-slug>/site`, then run `npm install`.
3. **Paste the intake form answers** into `docs/intake.md`.
4. **In Claude Code, run `/new-site`.** It fills `site.ts`, sets the brand tokens, and removes the pages and features the package doesn't include.
5. **Write `docs/site-plan.md`** (pages, nav, the main call to action per page) and get the client's thumbs-up before designing further.
6. **Build, review rounds, then `/qa`.**
7. **Launch** with the checklist in playbook section 4. Then run `/handoff`.

## What's where

```
src/content/site.ts        all business facts (single source of truth)
src/content/types.ts       the shape of site.ts
src/content/blog/          Markdown posts (Premium only)
src/components/            Header, Footer, Hero, ServiceCard, Reviews, MapEmbed, ContactForm,
                           BookingEmbed, CTABand, FAQ, Gallery, HoursList
src/layouts/BaseLayout.astro  meta tags, Open Graph, LocalBusiness schema, analytics
src/pages/                 index, about, contact, services/[slug], areas/[slug], blog, privacy, 404,
                           robots.txt (generated from site.ts)
src/styles/tokens.css      brand colors, fonts, radius
src/assets/                photos (processed to WebP by Astro); replace the placeholders
public/                    favicon.svg, og-image.jpg (1200×630)
docs/                      intake.md, site-plan.md, qa-report.md
.claude/commands/          new-site, add-page, qa, handoff
vercel.json                security headers and CSP
```

## Package → what to keep

| | Starter | Growth | Premium |
|---|---|---|---|
| Pages | index, about, contact (up to 4) | + 2 service or area pages, gallery or FAQ (up to 7) | + up to 4 more service or area pages, and blog (up to 12) |
| Services and areas without their own page | n/a | `page: false` | `page: false` |
| `features.quoteForm` | false | true | true (multi-step: extend ContactForm) |
| `features.booking` | false (link only, in the nav or CTA) | true (embed) | true (embed, styled to match) |
| `features.blog` | false | false | true |
| Reviews | 3 | 6–8 | 6–8, plus a reviews page |

## Improve the template, not just the site

When you build something worth reusing for a client (e.g. a before/after slider), copy it back into this template the same week (playbook section 5).
