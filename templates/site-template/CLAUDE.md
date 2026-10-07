# {{BUSINESS_NAME}} website

Built and maintained by Trinity Web Co. (Hector). Follow the Trinity Web Co. playbook for scope, workflow and QA. This file holds what's specific to this client.

## Client

| | |
|---|---|
| Business | {{BUSINESS_NAME}} |
| Client slug | {{CLIENT_SLUG}} (repo `site-{{CLIENT_SLUG}}` in the `trinitywebco-sites` GitHub org, Vercel project of the same name) |
| Niche | {{NICHE}} |
| Package | {{Starter / Growth / Premium}} |
| Care plan | {{Care Essential / Care Standard / Care Plus}} |
| Decision-maker | {{NAME}}, prefers {{text / email / call}} |
| Main call to action | {{Call / Book / Request a quote}} |

**Tone:** {{3–5 words from the intake form, e.g. "friendly, fast, family-owned"}}. Plain English, short sentences, sentence case. Write like the owner talks to a customer.

**Brand:** colors and fonts live in `src/styles/tokens.css`. {{Note anything specific, e.g. "logo is navy on white only"}}.

## Never do

- **Never invent reviews, testimonials, customers, awards, licenses or stats.** Use only what the client provided, word for word, attributed as they gave it.
- No medical, legal or financial claims. No "guaranteed" results or rankings.
- No stock photos of fake staff or fake "our team" shots. Stock is fine for generic scenes (a house, a tool, a car).
- Don't hard-code business facts in pages or components. Every fact lives in `src/content/site.ts`.
- Don't add third-party widgets or scripts (review widgets, chat bubbles, trackers) without Hector's OK. They slow the site and break the CSP.
- Don't push to `main` without Hector reviewing the diff.

## How this site is built

- **Astro + Tailwind CSS.** Static HTML output, hosted on Vercel Pro.
- **`src/content/site.ts` is the single source of truth:** name, phone, hours, address, services, areas, reviews, social links, booking URL, form endpoint, SEO text and feature switches. Types are in `src/content/types.ts`.
- **Components** in `src/components/` take props and read from `site.ts`, so pages stay thin.
- **Brand tokens** in `src/styles/tokens.css` (`@theme`). Components only use semantic utilities (`bg-brand`, `text-muted`, `rounded-card`, `.btn-primary`).
- **Forms** post to Formspree or Web3Forms (`site.forms.contactEndpoint`), with a honeypot.
- **Analytics:** Vercel Web Analytics, plus call, text and form-submit events (`BaseLayout.astro`).
- **CSP** in `vercel.json`. If you embed a booking tool or another iframe, add its host to `frame-src`. Scripts and fonts are never inlined (`assetsInlineLimit: 0` in `astro.config.mjs`), which keeps `script-src 'self'` working.
- **Astro 7:** close every tag, and write `{' '}` where a space between inline elements matters (`compressHTML` strips it).

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run check` | Type-check (must be 0 errors) |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Serve the built site |
| `npm run qa:links` | Link check on `dist/` (run after build) |

Slash commands (in `.claude/commands/`):
- `/new-site`: fill `site.ts` and the site from `docs/intake.md`.
- `/add-page <name>`: add a page from the components.
- `/qa`: build, check, Lighthouse, links and screenshots, written into `docs/qa-report.md`.
- `/handoff`: write the client's "Your website" doc.

## Branches and commits

- `main` is live.
- `round-1` and `round-2` are revision rounds.
- `care/<yyyy-mm>` holds monthly care-plan edits.
- One task per session, one commit per task. Commit messages are verb first, in plain English, e.g. "Add Garland service-area page".
