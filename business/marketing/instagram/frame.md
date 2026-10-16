---
name: Trinity Web Co.
colors:
  ink: "#13262B"
  river: "#1D6B66"
  river-deep: "#0E3F3C"
  limestone: "#ECEFE9"
  paper: "#FAFBF8"
  gold: "#EDB23A"
  muted: "#3E5458"
  line: "#C6CFC9"
typography:
  family: "Archivo Variable (brand/fonts, self-hosted)"
  headline: { weight: 800-820, stretch: "125%", tracking: "-0.025em to -0.035em", leading: "0.9-0.98" }
  title: { weight: 760, stretch: "116%", tracking: "-0.015em" }
  body: { weight: 450-680, stretch: "100%", tracking: "0" }
  scale-px: [192, 144, 104, 72, 54, 42, 30]
spacing:
  grid: 8
  frame-margin: 88
  safe-9x16: { top: 250, bottom: 350, reel-buttons: "x > 880 below y 1060" }
  safe-4x5: { grid-crop-each-side: 34 }
components:
  dm-keyword: "River message bubble, Paper text"
  badge: "Ink pill, Paper text: Demo / Example"
  caption: "Ink pills, Paper text, 54px, centered above the bottom 350px"
---

# Trinity Web Co. frame spec

Values live in `brand/kit.css` and `brand/kit.js`; this file is the summary HyperFrames reads. When the two disagree, `brand/kit.css` wins.

## Overview

A local developer you can text, not an agency. Frames look like the website: Limestone ground, Ink type, the River line drawing of the Trinity with Dallas neighborhoods, and the bridge logo. Calm, plain, specific.

## Do

- Archivo only. Headlines wide (125%), body at normal width. Sentence case everywhere.
- Light frames on Limestone or Paper; River deep for a dark frame.
- The river drawing and the bridge logo recur; strokes draw themselves in.
- Motion: critically damped springs (no bounce) for anything settling; bounce only after a flick.
- Keep text inside the safe zones; check with `--guides`.

## Don't

- Gold anywhere except a primary button or the founding offer (H1).
- Invented social proof, result promises, fake urgency, or a piece about AI.
- A demo or made-up example on screen without its "Demo" or "Example" badge.
- A price typed into a composition instead of read from `config.ts`.
