---
name: Trinity Web Co. Instagram
description: The look of every @trinitywebco post: a Dallas web developer you can text, in plain words on calm ground.
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
  hero:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "192px"
    fontWeight: 820
    lineHeight: 0.9
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 125"
  display:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "144px"
    fontWeight: 820
    lineHeight: 0.93
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "104px"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "72px"
    fontWeight: 760
    lineHeight: 1.06
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 116"
  lead:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "54px"
    fontWeight: 620
    lineHeight: 1.2
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 108"
  body:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "42px"
    fontWeight: 450
    lineHeight: 1.32
    letterSpacing: "0"
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "30px"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "0.01em"
    fontVariation: "'wdth' 108"
rounded:
  button: "16px"
  card: "28px"
  pill: "999px"
spacing:
  s1: "8px"
  s2: "16px"
  s3: "24px"
  s4: "32px"
  s5: "48px"
  s6: "64px"
  s7: "88px"
  s8: "120px"
  s9: "160px"
  frame-margin: "88px"
components:
  dm-bubble:
    backgroundColor: "{colors.river}"
    textColor: "{colors.paper}"
    padding: "0.16em 0.42em 0.2em"
  message-in:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "0.16em 0.42em 0.2em"
  badge:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "14px 28px 16px"
  caption:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "0.06em 0.36em 0.1em"
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "0.5em 1em"
---

# Design System: Trinity Web Co. Instagram

The values above mirror `brand/kit.css`, which wins if the two ever disagree. `frame.md` is the shorter summary HyperFrames reads; this file is the fuller version for design work.

## Overview

**Creative North Star: "The Neighbor's Text"**

Every post should feel like a message from someone down the street who builds websites: plain words, one clear point, and one easy thing to do next. The look borrows from a phone's message thread without copying its chrome. The ask ("DM CHECK") sits in a River message bubble, and everything around it stays quiet so the bubble is what the eye lands on.

The ground is calm and light: Limestone or Paper, with River deep for the occasional dark frame. Type does the work. Headlines run wide and heavy in Archivo, body text sits at normal width, and there is one family only. The Trinity River line drawing and the bridge logo recur as the brand's two drawings; they draw themselves in on Reels and sit still on slides. Mood: calm, plain, specific.

Density is low. A frame carries one idea, at sizes readable on a phone held at arm's length, inside Instagram's safe zones.

**Key Characteristics:**
- Archivo only: wide (125%) heavy headlines, normal-width body.
- Light, flat ground: Limestone, Paper, or River deep. No shadows.
- One River message bubble per frame for the DM keyword.
- The river drawing and the bridge logo as recurring signatures.
- Gold appears only on a primary button.

## Colors

A cool, quiet palette from the website: green-black ink on pale limestone, with the river's teal as the one living color and gold held in reserve.

### Primary
- **River** (#1D6B66): the brand's one active color. The DM keyword bubble, the river line, list markers, rules beside a highlighted line, and the page shapes on price slides.
- **River deep** (#0E3F3C): prices, big numbers, the bridge logo on light frames, and the background of a dark frame.

### Secondary
- **Gold** (#EDB23A): primary buttons only. Nowhere else, not even as an accent.

### Neutral
- **Ink** (#13262B): all headline and body text on light frames; the fill of badges and caption pills.
- **Muted** (#3E5458): supporting lines, the handle, the languages line, and detail text under a headline.
- **Limestone** (#ECEFE9): the default frame background.
- **Paper** (#FAFBF8): text on River and Ink fills, the river's stop dots, the incoming-message bubble, and an alternate light background.
- **Line** (#C6CFC9): hairline rings and dividers where Ink would be too strong.

### Named Rules
**The Gold Rule.** Gold is a promise of action. It appears on a primary button and nowhere else; the DM bubble is River, not Gold.

**The One Bubble Rule.** A frame has at most one River message bubble, and it holds the keyword the viewer should send.

## Typography

**Display Font:** Archivo Variable (with system-ui, sans-serif), self-hosted from `brand/fonts/`
**Body Font:** Archivo Variable at normal width

**Character:** one family stretched two ways: wide and heavy for anything read first, normal width for anything read through. The width axis is the hierarchy, as much as the size.

### Hierarchy
- **Hero** (820, 192px, 0.9): one number or one word that is the whole point of a frame, such as a price or "3 months".
- **Display** (820, 144px, 0.93): cover hooks and the CTA headline.
- **Headline** (800, 104px, 0.98): a statement slide's headline; the "DM CHECK" line.
- **Title** (760, 72px, 1.06): package names and secondary headlines, at 116% width.
- **Lead** (620, 54px, 1.2): page counts, highlighted lines, short lists that carry the slide.
- **Body** (450, 42px, 1.32): detail text and list items; keep lines under about 32 characters at this size.
- **Label** (650, 30px, 0.01em): the handle, the swipe cue, the languages line. Sentence case, never all caps.

### Named Rules
**The Wide Headline Rule.** Anything read first runs at 125% width; anything read through stays at 100%. Never set body text wide.

**The Sentence Case Rule.** Every line is sentence case, including labels and the swipe cue. The DM keyword is the only word in capitals, because it's what people type.

## Layout

Frames are fixed: 1080×1350 for carousel slides (4:5) and 1080×1920 for Reels and stories (9:16). Everything sits on an 8px grid, with an 88px side margin on every frame.

On slides, content starts about 236px down, under the brand header (bridge logo and name at 76px from the top), and stays above the footer (handle and swipe cue, 72px from the bottom). The profile grid crops 34px from each side of a 4:5 slide, which the 88px margin already clears.

On 9:16 frames, keep text out of the top 250px and the bottom 350px. On Reels, keep anything important left of x 880 below y 1060, where the like, comment and share buttons sit. Render with `--guides` to check.

Content is left-aligned. One idea per frame; when a slide runs long, cut words before shrinking type below Body.

## Elevation & Depth

Flat. Nothing casts a shadow. Depth comes from tone: a Paper area on Limestone, a River deep frame between light ones, the river drawn on its pale bank (the bank is the same River at 14% opacity). The only rings are functional: a 4px Paper halo around badges, so they stay readable over a screenshot, and a 3px Line ring around an incoming-message bubble.

### Named Rules
**The Flat Ground Rule.** No drop shadows, glows or gradients. If something needs to stand apart, change its tone or give it space.

## Shapes

Corners are generous and few. Badges and the river's stop dots are full pills and circles (999px). Message bubbles round three corners and keep the fourth tight, like a real text: the tight corner sits bottom right on the outgoing River bubble and bottom left on an incoming Paper bubble. Cards round at 28px and buttons at 16px. Rules are 3px Ink lines. List markers are short River bars (30×7px, rounded ends) rather than bullets.

## Components

Plain and sturdy throughout: solid fills, generous padding, no outlines or effects, like good shop signage.

### Buttons
- **Shape:** gently rounded (16px).
- **Primary:** Gold fill, Ink text, weight 700 at 108% width, padding 0.5em × 1em. Only for a real primary action.
- **Other buttons:** none. A secondary action is a text line, not a second button.

### Chips
- **Demo / Example badge:** an Ink pill with Paper text (34px, weight 720, 112% width) and a 4px Paper halo. It stays on screen the whole time a demo or a made-up example is visible.

### Cards / Containers
- **Carousel slide frame** (`compositions/carousel-slide.html`): the background (Limestone, Paper or River deep), the bridge logo and name at the top, the handle bottom left, and the swipe cue bottom right on the cover only.
- **Story frame** and **Reel end card** follow the same header, footer and margins at 9:16.

### Message bubble (signature)
- **Outgoing** (the DM keyword): River fill, Paper text, the keyword in capitals, sized with the line it sits in.
- **Incoming** (R1's texts): Paper fill, Ink text, a 3px Line ring.

### Captions (Reels)
- One short phrase at a time in Ink pills with Paper text (54px, weight 680), centered above the bottom 350px and clear of the Reel buttons.

### River drawing (signature)
- The site's Trinity River curve: an 8px River line on a 44px bank at 14% opacity, with Paper stop dots ringed in Ink and Dallas neighborhood labels (19px-equivalent, weight 650). It draws itself in on Reels and sits still on slides.

### Bridge logo (signature)
- The Margaret Hunt Hill Bridge arch with three cables, in River deep on light frames and Paper on River deep. Its strokes draw in on Reels.

## Do's and Don'ts

### Do:
- **Do** set headlines in Archivo at 125% width and weight 800–820, and body at 100%.
- **Do** keep frames on Limestone, Paper or River deep, and keep them flat.
- **Do** put the DM keyword in the River bubble, once per frame.
- **Do** keep text inside the safe zones and check every render with `--guides`.
- **Do** keep the Demo or Example badge on screen for as long as a demo or made-up example is visible.
- **Do** read every price, name and keyword from `config.ts` through the kit, never typed in.

### Don't:
- **Don't** use Gold anywhere except a primary button.
- **Don't** add drop shadows, glows, gradients or outlines for decoration.
- **Don't** use a second typeface, all-caps labels, or wide body text.
- **Don't** put two message bubbles or two buttons on one frame.
- **Don't** show a demo or made-up example without its badge.
