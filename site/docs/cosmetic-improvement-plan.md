# Cosmetic improvement plan

**Review date:** October 7, 2026  
**Project:** Trinity Web Co. one-page website  
**Review scope:** Visual polish only. Preserve the existing brand, business facts, offer and prices, site copy, and plain-language voice.

## Review status and what was inspected

- Read the repository `CLAUDE.md` and `site/CLAUDE.md` before reviewing.
- Confirmed the current branch is `main` and the working tree was clean at the start of review. No existing changes needed preservation.
- Confirmed `http://localhost:4321/` responds with HTTP 200.
- Inspected the page composition, site-specific sections, shared header and contact form, design tokens, and content source in `site/src/pages/index.astro`, `site/src/components/`, `site/src/components/site/`, `site/src/styles/tokens.css`, and `site/src/content/site.ts`.
- **Rendered visual review was unavailable.** The computer-use browser helper and a second browser runtime both exited during startup. I could not view screenshots at 360, 390, 768, 1024, or 1440px. Findings below are based on code inspection only; they are hypotheses to confirm in a browser before implementation.
- No website source, styles, images, copy, or deployment settings were changed during this review.

## Visual direction to preserve

- Keep the warm limestone page background, paper surfaces, ink text, river green, and restrained gold accents. Gold remains for primary buttons and the founding offer.
- Keep Archivo as the single type family, with wide headlines and normally proportioned body text.
- Retain the Trinity River and Dallas-neighborhood line drawing as the memorable hero element.
- Keep the page direct and readable, with generous section spacing, clear pricing rows, and the existing plain, friendly first-person voice.
- Keep demo work explicitly labeled as demos and pending work honestly described. Do not add testimonials, client results, invented details, or unapproved images.
- Treat this as visual refinement. Business facts and all prices remain sourced from the playbook and `site/src/content/site.ts`.

## Prioritized recommendations

Effort estimates are implementation estimates: **S** = under half a day, **M** = about half to one day. All findings need visual confirmation because browser screenshots were unavailable during this review.

| Priority | Issue found in source (code-only finding) | Proposed visual change | Expected benefit | Effort | Likely files | Assets or decisions | Acceptance criterion |
|---|---|---|---|---|---|---|---|
| P1 | The “Current website” input in `site/src/pages/index.astro` uses a one-off `#9AA8A3` 1.5px border, while the other fields use the shared `border-muted` treatment in `site/src/components/ContactForm.astro`. This makes one field visually inconsistent; the shared component comment also documents its contrast intent. | Align the input’s border, radius, padding, focus appearance, and invalid state with the other contact fields. Reuse a shared field style if practical, without changing its label or behavior. | Makes the form feel cohesive and keeps all field boundaries equally clear. | S | `site/src/pages/index.astro`; possibly `site/src/components/ContactForm.astro` if a shared class is introduced. Any shared-component change must also be applied to `templates/site-template/src/components/ContactForm.astro`. | No new asset or content decision. Preserve the current field and label. | At all requested widths, the current-website field matches the other fields in height, border, radius, and focus treatment; invalid-state styling remains clear and no horizontal overflow is introduced. |
| P2 | `site/src/components/site/Process.astro` uses five equal columns until `max-width: 60rem` (960px). At 1024px the page wrap is capped at 72rem and retains side padding, leaving roughly 940px for five columns and four gaps. This may produce narrow, unevenly tall step columns immediately above the breakpoint. | Introduce an intermediate layout for the tablet/small-laptop range (for example, a balanced two-row grid), keeping the existing five-step sequence and switching to the current vertical timeline at a wider, visually validated breakpoint. Keep the connector and number markers aligned with each layout. | Gives the five steps more readable line lengths and a more even rhythm between tablet and desktop. | M | `site/src/components/site/Process.astro` | No new asset or content decision. Choose the intermediate breakpoint after inspecting 768, 1024, and nearby widths. | At 768, 1024, and 1440px, each step has a clear reading order, no cramped columns or clipped connector lines, and the layout changes without a sudden awkward wrap. |
| P3 | Each unfilled demo slot renders a 16:10 frame (`site/src/components/site/DemoSlots.astro`) containing only “Screenshot coming soon.” With both slots pending in `site/src/content/site.ts`, the section reserves substantial space for empty frames. | Refine the pending state into a smaller, intentional preview tile or a compact pair of status panels, retaining clear “Demo” and “In progress” wording. Keep the full screenshot treatment for slots that actually have approved demo imagery. | Reduces blank visual weight and helps the page move through the portfolio section while remaining transparent about demo status. | S | `site/src/components/site/DemoSlots.astro` | No new asset is required. Keep image and URL requirements unchanged; do not imply a demo is live. | Pending slots remain visibly identified as demos and in progress, use less empty vertical space than the current 16:10 blank frames, and live image slots retain their existing image crop and responsive behavior. |
| P4 | The process and demo layouts have independent responsive rules (`Process.astro` at 60rem; `DemoSlots.astro` uses auto-fit with 22rem minimum columns). Their transitions may feel inconsistent at intermediate widths, but this cannot be confirmed without rendered views. | During implementation, tune the section transitions together so multi-column layouts appear only when their content has enough room; preserve the existing one-column mobile behavior. | Makes the page’s responsive rhythm feel deliberate across section boundaries. | S–M | `site/src/components/site/Process.astro`, `site/src/components/site/DemoSlots.astro`, and only if needed `site/src/styles/tokens.css` | Requires browser inspection at the stated widths; no new asset or content decision. | At 360, 390, 768, 1024, and 1440px, adjacent sections change column count without crowding, unexpected whitespace, or horizontal scrolling. |

## Phased implementation

### Phase 0 — Rendered confirmation

1. Start or use the local site at `http://localhost:4321/`.
2. Capture the page at 360, 390, 768, 1024, and 1440 CSS pixels wide. Inspect the header, hero, pricing, demo, process, and contact sections at each width; scroll the full page.
3. Compare the screenshots with the source-based findings above. Drop or revise any recommendation that is not visible in the rendered site. Check for clipping, overflow, awkward line breaks, and unintended layout shifts.

**Acceptance:** findings have been confirmed against rendered screenshots at all five widths before edits begin. Record any screenshot-confirmed issues that materially change priority.

### Phase 1 — Small cohesive fixes

1. Normalize the “Current website” field to the shared contact-field treatment.
2. Refine the empty demo-slot presentation while preserving pending status and the “Demo” label.
3. Review button, card, and form alignment at 360 and 390px; adjust only if a specific mismatch is visible.

**Acceptance:** fields align consistently, pending demos remain honest and take up intentional space, controls remain easy to use, and the page has no horizontal overflow at 360 or 390px.

### Phase 2 — Process and responsive rhythm

1. Prototype an intermediate process layout between the five-column desktop timeline and the existing narrow-screen vertical timeline.
2. Tune breakpoints based on actual content fit at 768 and 1024px, then recheck 1440px and both phone widths.
3. Review transitions with the demo grid and adjacent sections so the page keeps a consistent rhythm.

**Acceptance:** all five steps read in their intended order; text and connectors fit without crowding or clipping at each checked size; section transitions feel deliberate.

### Phase 3 — Final visual pass

1. Recheck typography, section spacing, alignment, color use, button states, cards, and form states against the visual direction above.
2. Confirm the hero river drawing remains legible and intentionally cropped on phone widths, and that its animation respects reduced-motion preferences.
3. Capture final screenshots at 360, 390, 768, 1024, and 1440px and compare them side by side.

**Acceptance:** no unintended horizontal scrolling, clipped content, inconsistent form control styling, or visibly cramped grids at the five target widths; existing brand and content are preserved.

## Dependencies and items Hector may need to provide

- No new asset or business decision is needed for the three source-based recommendations.
- Browser access is needed to confirm them and to set breakpoints based on visual results.
- The About section currently has no headshot or short personal story listed as open items in the repository instructions. Neither is needed for these cosmetic changes; if Hector later wants an About-section photo treatment, he must provide or approve the headshot and story first.
- Keep the demo URLs, screenshots, PageSpeed scores, offers, and prices in their current content workflow. This plan does not authorize changing them.

## Scope guardrails for implementation

- Edit only the visual treatment needed for an accepted recommendation; do not rewrite site copy or change business facts, package or care-plan prices, demo claims, or launch/deployment settings.
- Keep any fix to a shared component synchronized with its counterpart under `templates/site-template/`, following the repository instructions.
- Do not commit, push, deploy, or change branches as part of this plan.
