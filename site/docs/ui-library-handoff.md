# UI library review and handoff

**Review date:** October 7, 2026  
**Project:** Trinity Web Co. website  
**Scope:** Review the four requested UI references, adapt one suitable pattern in the existing Astro site, and preserve the current brand and business content.

## Reference review and licensing

### Selected pattern: checklist progress feedback

- **Exact component:** [Welcome Checklist Card by Oliver](https://21st.dev/@olewandowski1/components/onboarding-1)
- **Reference collection:** [21st.dev checkbox components](https://21st.dev/community/components/s/checkbox)
- **Pattern adapted:** a concise checklist paired with a visual completion bar and checked-item count. The reference describes an onboarding checklist card with a progress bar and checkbox steps.
- **Framework and dependencies:** the component is listed in 21st.dev's React component library and lists `lucide-react` as a dependency. It is not drop-in compatible with this Astro site.
- **License:** the component page lists **MIT-0**. No source code, icons, or assets were copied; only the broad interaction pattern was adapted with original Astro markup and CSS.
- **Implementation choice:** native HTML checkboxes and `<progress>`, a small vanilla script, and existing Trinity color tokens. No React runtime, third-party icon, or animation dependency was added.

### Other references reviewed

- [21st.dev](https://21st.dev/) describes a community catalog of React components, templates, and shadcn themes. Components are authored by different contributors; the chosen component's specific license was checked on its component page rather than assuming a site-wide license.
- [OpenSource UI](https://opensourceui.in/) describes its components as React/Next.js, TypeScript, Tailwind CSS v4, and Lucide based. Its [official repository license](https://github.com/bidyut10/opensourceui/blob/main/LICENSE) is MIT. Those components are not directly compatible with this Astro site without porting; no component code or assets were used.
- [SSGOI](https://ssgoi.dev/) describes router-agnostic transitions powered by the Web Animations API. Its [GitHub project](https://github.com/meursyphus/ssgoi) is MIT licensed and lists React, Svelte, Vue, Solid, Angular, and Qwik integrations, but no Astro integration. Page transitions add little value to this one-page site, so SSGOI was not added.
- [Iconly Pro licensing guide](https://iconly.pro/pages/licensing-guide) says its Personal and Team plans are not for commercial use; commercial use of assets requires a Lifetime License, and broader resale rights require an Extended Commercial License. No Iconly icons or animations were used.

## Pattern adapted

The readiness checklist now shows a small progress bar and an item count while a visitor checks items. The count says how many boxes are checked, not whether someone is ready to hire. The section continues to say that visitors can contact Hector without having everything prepared.

The progress display is revealed only after its script initializes. Checkboxes remain native and keyboard-operable if JavaScript is unavailable. State exists only in the current page; no form submission, storage, upload, or backend was introduced. The progress bar uses the existing river-green token and does not animate, so no motion preference handling is needed for this pattern.

## Files changed in this task

- `site/src/components/site/ProjectReadiness.astro` — added transient progress feedback to the existing checklist.
- `site/docs/ui-library-handoff.md` — this source, compatibility, licensing, and review handoff.

The existing change in `site/src/pages/index.astro` and the untracked `site/docs/cosmetic-improvement-plan.md` were present before this task and were preserved. No process, demo, pricing, claim, or deployment files were changed.

## Manual review still needed

1. Open the local site and review the checklist at 360, 390, 768, 1024, and 1440px widths. Confirm the count and progress bar fit without horizontal scrolling or squeezed labels.
2. Tab to each checkbox and use Space to toggle it. Confirm the count and native progress value update once per change and the browser's focus indicator remains visible.
3. Confirm unchecked/checked contrast against the paper surface and that the progress count feels informative rather than like a readiness score.
4. Turn off JavaScript or block scripts and confirm the static checklist remains usable while the progress display stays hidden.

## Follow-up review (October 7, 2026)

- **Completed by source inspection:** Confirmed the checklist uses native keyboard-operable checkboxes, updates a native `<progress>` element and an `aria-live="polite"` count, and keeps the progress display hidden until its script initializes. The global `:focus-visible` rule in `src/styles/tokens.css` already supplies a visible river-green outline, so no duplicate component-specific focus styling was added.
- **Not verified:** The browser-control helper failed during initialization (`trusted Node process exited unexpectedly; kernel reset`). No rendered viewport, keyboard interaction, contrast, or JavaScript-off check was performed. Do not treat these as passed.
- **Website source changes in this follow-up:** None; source inspection did not reveal a concrete defect that warrants overriding the existing shared focus pattern.
- **Next manual checks:** Perform items 1–4 above in a browser. In particular, use Tab and Space to verify focus visibility and progress announcements, check all five viewport widths for overflow, and disable JavaScript to confirm the static checklist still works.

## Spotlight card integration (October 7, 2026)

- **Placement:** The project-readiness checklist, after the FAQ and before the contact form. The existing checklist is the right single featured card; no extra demo cards or new business copy were added.
- **Reference:** The user supplied `GlowCard` source and CSS effect in the task prompt. The 21st.dev [community component catalog](https://21st.dev/community/components) describes its components as React/Next.js components, so the supplied React component is not directly compatible with this Astro site. The exact originating component page and its license were not included in the prompt and could not be verified from the supplied filename alone. No upstream code or assets were copied; the broad pointer spotlight pattern was reimplemented in Astro/CSS using this site's existing tokens.
- **Adaptation:** Added `src/components/site/SpotlightCard.astro`, a slotted Astro wrapper with a subtle river-green radial surface glow and a progressively enhanced border highlight. A local `pointermove` handler updates CSS variables on that card only; there is no document-level pointer listener, React runtime, inline stylesheet injection, icon, or new dependency. The effect is disabled for coarse/non-hover pointers and `prefers-reduced-motion: reduce`. Without JavaScript, the card keeps its normal surface, border, and content.
- **Accessibility and content:** The wrapper is decorative and does not change the checklist's native fieldset, checkboxes, focus behavior, or progress announcements. Existing checklist copy, pricing, claims, and contact behavior are unchanged.
- **Files changed:** `src/components/site/SpotlightCard.astro` (new) and `src/components/site/ProjectReadiness.astro` (wraps the existing fieldset and transfers its card surface to the wrapper). No runtime dependencies were added.
- **Manual review still needed:** Check the card at 360, 390, 768, 1024, and 1440px; confirm the glow stays subtle and does not obscure text or checkbox focus; move a mouse across the card and away; test touch/coarse pointer, keyboard-only operation, reduced-motion preference, and JavaScript disabled. The browser-control helper was unavailable in this session, so none of these visual or interactive checks are claimed as passed.

## Browser review of the spotlight card and checklist (October 7, 2026)

Run against `npm run dev` at `http://localhost:4321/` in Playwright Chromium (desktop context, plus emulated touch, reduced-motion and JavaScript-off contexts). `npm run check` (0 errors, 0 warnings) and `npm run build` pass after the fix below.

- **Widths 360, 390, 768, 1024, 1440px:** passed. `scrollWidth` equals the viewport width at every size, so there is no horizontal scroll. The card stays inside the page gutter, the progress heading stays on one line, and checklist labels aren't squeezed (narrowest label 270px, at 1440px in the two-column layout). Only the existing hero river SVG reaches past the viewport, and it is clipped.
- **Pointer spotlight:** passed after one fix. `--spotlight-x/y` follow the pointer and the border highlight fades in on enter and out on leave. **Fixed:** the soft surface glow was always painted. It showed at the card's center before any hover and stayed at the last pointer position after the pointer left. It now lives on a `::after` layer behind the content and fades with the same `data-spotlight-active` state as the border. Text stays crisp under the glow.
- **Touch:** passed in an emulated touch device (`hasTouch`, `isMobile`, 390px), where `(hover: hover) and (pointer: fine)` doesn't match. The card stays static (no tracking, no glow layer), and tapping a label toggles its checkbox and updates the count. Not checked on a physical touch device.
- **Keyboard:** passed. Tab moves through `readiness-0` to `readiness-6` in order, each showing the global 3px river-green `:focus-visible` outline with a 3px offset. Space toggles each one. The count (`role="status"`, `aria-live="polite"`) and the native `<progress>` update once per change. Not checked with a real screen reader.
- **Reduced motion (`prefers-reduced-motion: reduce`):** passed. Both glow layers compute to `content: none`, and moving the mouse over the card doesn't change its state.
- **JavaScript disabled:** passed. The card shows its normal paper surface and border, the progress block stays `hidden`, and all 7 native checkboxes can be focused and toggled by keyboard and by clicking a label.
- **Contrast against paper `#FAFBF8`** (and under the peak 10% river glow): body text 15.1:1 (13.1:1), muted note 7.7:1 (6.7:1), count in river deep 11.3:1 (9.8:1), focus ring and checked boxes 6.0:1 (5.3:1), Chromium's default unchecked checkbox border (assumed `#767676`, not measured) 4.4:1 (3.8:1), and progress fill against its track 3.9:1. The card border and empty progress track (1.5:1) are decorative; the text count carries the same information.

Attribution caveat unchanged: the spotlight pattern is inspired by a 21st.dev example whose exact source page and license were not verified, and no upstream code or assets were copied.
