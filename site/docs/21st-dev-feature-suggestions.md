# 21st.dev feature suggestions for Trinity Web Co.

## Design direction from the screenshots

The site already has a clear identity: limestone backgrounds, dark ink typography, river-green rules and accents, gold calls to action, Archivo headings, and a custom Trinity River illustration. The layout feels calm and editorial, with generous whitespace and simple section dividers. New effects should support the content and stay subtle; avoid turning the site into a generic animated SaaS landing page.

The 21st.dev catalog is primarily React/Next.js oriented. Treat its examples as visual and interaction references, then adapt selected patterns to the existing Astro components and CSS. Do not add React or a new animation dependency just to copy an example.

## Recommended additions

### 1. A restrained process timeline

**Priority:** High  
**Where:** “How it works” / process section  
**Pattern:** A simple timeline or stepper with a thin river-green connector, numbered milestones, and a restrained reveal as the section enters view.

The site already explains how a project works, so a timeline could make the sequence easier to scan. Keep all steps visible without JavaScript, and avoid sticky full-screen scrolling or scroll hijacking. The site’s river motif gives the connector a natural visual tie-in.

21st.dev reference: [Timeline component collection](https://21st.dev/community/components/explore/timeline-component)

### 2. Subtle plan-card feedback

**Priority:** High  
**Where:** Pricing plans  
**Pattern:** Give the recommended Growth plan a clear river-green edge or background tint, and add a small hover/focus lift or border change to all plan rows/cards.

The screenshots already highlight Growth, which is described as the commonly recommended option. A little interactive feedback can help visitors compare plans while keeping prices, inclusions, and the current layout visible. Use the same feedback for keyboard focus; avoid animated glowing borders or a fake monthly/annual switch because these are fixed-price projects.

21st.dev references: [Card animation collection](https://21st.dev/community/components/explore/card-animation-react) · [Pricing sections](https://21st.dev/community/components/s/pricing-section)

### 3. Small CTA button motion

**Priority:** Medium  
**Where:** “Book a free call” buttons and form submit button  
**Pattern:** Add a small arrow that nudges a few pixels on hover/focus, or a brief color shift using the existing gold and ink tokens.

This gives the main action a bit more feedback without competing with the large hero headline. Keep the button label stable, retain a visible focus ring, and turn off motion under `prefers-reduced-motion`.

21st.dev references: [Button components](https://21st.dev/community/components/s/button) · [Animated components](https://21st.dev/community/components/explore/animated-components)

### 4. Optional reading-position indicator

**Priority:** Medium  
**Where:** At the top edge of the sticky header  
**Pattern:** A 2–3px river-green line that fills as visitors move through the one-page site.

The page has several long sections, so this can gently orient visitors without adding another navigation layer. Keep it decorative and hidden from assistive technology; make sure it does not shift the header or obscure its border. If it feels busy beside the existing navigation, skip it.

21st.dev reference: [Scroll progress indicator collection](https://21st.dev/community/components/explore/scroll-progress-indicator)

### 5. Demo preview cards when real demos are ready

**Priority:** Later  
**Where:** Demo slots section  
**Pattern:** Use quiet project cards with a website screenshot, business type, and a clear “View demo” link. A before/after slider could be tested if there are genuine before-and-after screenshots.

The current copy says the demo sites are in progress. Wait until there are real demo URLs and approved screenshots; don’t fill the section with stock imagery or imply client results that do not exist. Prefer a static card or image reveal over a carousel that hides content.

21st.dev references: [Feature and gallery components](https://21st.dev/community/components) · [Card animation collection](https://21st.dev/community/components/explore/card-animation-react)

### 6. Mobile navigation refinement, only if needed

**Priority:** Check on mobile before changing  
**Where:** Site header  
**Pattern:** If the current small-screen menu needs improvement, use a compact accessible drawer or disclosure with a clear close button and the existing gold booking action.

The screenshots show the desktop header, so they don’t establish that mobile navigation needs replacing. First review the current mobile menu. Any drawer should work with keyboard and touch, close with Escape, return focus to its trigger, and keep focus inside while open.

21st.dev reference: [Navbar component collection](https://21st.dev/community/components/explore/navbar-react)

## Already covered

The spotlight-card pattern has already been adapted for the project-readiness checklist in the local working copy. Do not add another spotlight card elsewhere unless there is a specific content reason.

## Avoid for this site

- Testimonial carousels, avatar walls, review stars, or numeric trust badges until genuine customer quotes or verified metrics are available. The repository’s `CLAUDE.md` says not to invent social proof.
- Large glow, glass, WebGL, cursor-trail, or 3D effects. They would compete with the river illustration and the site’s restrained style.
- Auto-scrolling marquees, autoplay carousels, sticky scroll hijacking, or effects that hide content unless someone interacts.
- Adding React, shadcn/ui, or Motion only to reproduce a catalog example. Prefer native Astro and CSS for these small enhancements.

## Suggested order

1. Review the current mobile navigation and process section at phone and desktop widths.
2. Add the process timeline if it makes the steps clearer.
3. Refine plan-card and CTA hover/focus feedback.
4. Revisit demo cards once real preview sites are available.

## Reference notes

21st.dev’s catalog describes its component library as React/Next.js-focused and includes live previews and code for community components. The links above are pattern references; component quality and dependencies vary by author. Inspect the selected implementation and its license before copying code. For this Astro site, reproduce only the useful visual behavior using the existing tokens and accessibility conventions.
