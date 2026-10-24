/* Trinity Web Co. Instagram kit runtime. Every composition loads, in this order:
     <script src="brand/generated.js"></script>   (from config.ts, via npm run sync)
     <script src="brand/kit.js"></script>
   Paths are from the project root, which is how HyperFrames resolves them.
   Deterministic by design: no clocks, no randomness, no fetches. */
(function () {
  if (window.TWC) return;
  const DATA = window.TWC_DATA;
  if (!DATA) throw new Error("TWC: load brand/generated.js before brand/kit.js");
  const SVG = "http://www.w3.org/2000/svg";

  /* ---------- Language and guides ----------
     A piece's entry file (the one you render) calls TWC.init(window.__hyperframes.getVariables()).
     Sub-compositions can't see the entry's variables, so they call TWC.vars(ownVars), which
     prefers the entry's values and falls back to their own when previewed on their own. */
  const state = {};
  /** extra.transcript: the voiceover's word timings for the caption track, in this render's language. */
  function init(vars, extra = {}) {
    state.lang = vars && vars.lang;
    state.guides = vars && vars.guides;
    state.transcript = extra.transcript;
    return vars;
  }
  function transcript() {
    return state.transcript;
  }
  function vars(own) {
    own = own || {};
    return {
      lang: state.lang || own.lang || "en",
      guides: state.guides !== undefined ? !!state.guides : !!own.guides,
    };
  }

  /* ---------- Words and prices (all from config.ts) ---------- */
  function t(key, lang) {
    const value = key.split(".").reduce((o, k) => (o == null ? o : o[k]), DATA.config);
    if (value == null) throw new Error(`TWC: config has no "${key}"`);
    return typeof value === "object" && "en" in value ? value[lang] : value;
  }
  function price(n) {
    return "$" + n.toLocaleString("en-US");
  }
  function monthly(n, lang) {
    return price(n) + t("labels.perMonth", lang);
  }
  /** A starting price: "From $499" / "Desde $499". */
  function priceFrom(n, lang) {
    return t("labels.from", lang) + " " + price(n);
  }
  /** Splits a DM line like "DM {keyword} for a free site check" around the keyword. */
  function dm(kind, lang) {
    const [before, after] = t(`dm.${kind}`, lang).split("{keyword}");
    return { before: before.trim(), keyword: t("dm.keyword", lang), after: after.trim() };
  }

  /* ---------- Motion ----------
     Apple's springs (WWDC 2018, "Designing Fluid Interfaces"): described by a damping ratio
     and a response time, not a duration. damping 1 = settles with no bounce (the default);
     about 0.8 = a little overshoot, only for things that were flicked or thrown.
     spring() turns one into a GSAP ease plus the duration it takes to settle. */
  function spring({ response = 0.4, damping = 1 } = {}) {
    const w = (2 * Math.PI) / response;
    const x =
      damping >= 1
        ? (t) => 1 - (1 + w * t) * Math.exp(-w * t)
        : (t) => {
            const wd = w * Math.sqrt(1 - damping * damping);
            return 1 - Math.exp(-damping * w * t) * (Math.cos(wd * t) + ((damping * w) / wd) * Math.sin(wd * t));
          };
    let settle = 0;
    for (let s = 0; s < 4; s += 0.005) if (Math.abs(1 - x(s)) > 0.002) settle = s + 0.005;
    const end = x(settle);
    return { ease: (p) => (p >= 1 ? 1 : x(p * settle) / end), duration: +settle.toFixed(3) };
  }

  /** CSS cubic-bezier() as a GSAP ease. */
  function bezier(x1, y1, x2, y2) {
    const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
    const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    const sx = (u) => ((ax * u + bx) * u + cx) * u;
    const sy = (u) => ((ay * u + by) * u + cy) * u;
    return (p) => {
      if (p <= 0) return 0;
      if (p >= 1) return 1;
      let lo = 0, hi = 1, u = p;
      for (let i = 0; i < 40; i++) {
        if (sx(u) < p) lo = u;
        else hi = u;
        u = (lo + hi) / 2;
      }
      return sy(u);
    };
  }

  const motion = {
    move: spring({ response: 0.4 }), // things settling into place
    snappy: spring({ response: 0.3 }), // small things: labels, badges, bubbles, dots
    momentum: spring({ response: 0.4, damping: 0.8 }), // only after a flick, like a phone scroll
    fade: { duration: 0.3, ease: "power1.out" },
    stagger: 0.08, // between related items; keep a whole group under 0.5 s
    draw: bezier(0.45, 0.05, 0.25, 1), // the site's river-draw curve
    pen: "power2.out", // strokes: a hand lifting at the end of the line
  };

  /** Rise into place: fades in and moves up on a spring. Same path out if a piece needs an exit. */
  function rise(tl, target, at, { y = 28, spring: s = motion.move } = {}) {
    tl.fromTo(target, { opacity: 0 }, { opacity: 1, ...motion.fade }, at);
    tl.fromTo(target, { y }, { y: 0, duration: s.duration, ease: s.ease }, at);
    return at + s.duration;
  }

  /* ---------- Shared drawings ---------- */
  function el(tag, attrs, parent) {
    const node = document.createElementNS(SVG, tag);
    for (const [k, v] of Object.entries(attrs || {})) node.setAttribute(k, v);
    if (parent) parent.appendChild(node);
    return node;
  }
  // Strokes draw with one dash as long as the measured path. The undrawn offset adds one
  // stroke width, so a round cap never shows as a dot before the pen starts.
  function prepStroke(path) {
    const len = path.getTotalLength();
    const hidden = len + +path.getAttribute("stroke-width");
    path.dataset.len = len;
    path.dataset.hidden = hidden;
    path.style.strokeDasharray = `${len} ${hidden + len}`;
    path.style.strokeDashoffset = hidden;
  }
  function drawStroke(tl, path, at, duration, ease) {
    tl.fromTo(path, { strokeDashoffset: +path.dataset.hidden }, { strokeDashoffset: 0, duration, ease }, at);
    return at + duration;
  }

  /** The bridge logo (Margaret Hunt Hill Bridge arch, three cables). Returns the <svg>. */
  function logo(container, { width = 240, color = "var(--river-deep)" } = {}) {
    const svg = el("svg", {
      viewBox: DATA.logo.viewBox,
      width,
      height: Math.round((width * 32) / 48),
      overflow: "visible",
      role: "img",
      "aria-label": t("business.name"),
    }, container);
    for (const part of DATA.logo.parts) {
      const p = el("path", {
        d: part.d,
        fill: "none",
        stroke: color,
        "stroke-width": part.width,
        "stroke-linecap": "round",
        "data-role": part.role,
      }, svg);
      prepStroke(p);
    }
    return svg;
  }
  /** Builds the bridge the way it stands: deck, then arch, then the cables up to it. Returns the end time. */
  function drawLogo(tl, svg, at = 0) {
    const part = (role) => [...svg.querySelectorAll(`[data-role="${role}"]`)];
    drawStroke(tl, part("deck")[0], at, 0.34, motion.pen);
    let end = drawStroke(tl, part("arch")[0], at + 0.24, 0.5, motion.pen);
    part("cable").forEach((c, i) => (end = drawStroke(tl, c, at + 0.62 + i * motion.stagger, 0.26, motion.pen)));
    return end;
  }
  /** Shows the logo fully drawn (stills). */
  function showLogo(svg) {
    svg.querySelectorAll("path").forEach((p) => (p.style.strokeDashoffset = 0));
  }

  /** The river line drawing (from the site's hero). stops: "none", "phone" (4) or "all" (6). */
  function river(container, { width = 1080, stops = "none", labels = true, line = 8, bank = 44 } = {}) {
    const [, , vbW, vbH] = DATA.river.viewBox.split(" ").map(Number);
    const svg = el("svg", {
      viewBox: DATA.river.viewBox,
      width,
      height: Math.round((width * vbH) / vbW),
      overflow: "visible",
      "aria-hidden": "true",
      class: "twc-river",
    }, container);
    const common = { d: DATA.river.path, fill: "none", stroke: "var(--river)", "stroke-linecap": "round" };
    el("path", { ...common, "stroke-width": bank, opacity: 0.14, "data-role": "bank" }, svg);
    prepStroke(el("path", { ...common, "stroke-width": line, "data-role": "line" }, svg));
    const list = stops === "none" ? [] : DATA.river.stops.filter((s) => stops === "all" || s.phone);
    for (const s of list) {
      const g = el("g", { "data-role": "stop", "data-x": s.x }, svg);
      el("circle", { cx: s.x, cy: s.y, r: 11, fill: "var(--paper)", stroke: "var(--ink)", "stroke-width": 4 }, g);
      if (labels) {
        const above = s.labelY < s.y;
        const text = el("text", {
          x: s.x,
          y: above ? s.y - 28 : s.y + 52,
          "text-anchor": "middle",
          fill: "var(--ink)",
          style: "font: 650 32px var(--font); font-stretch: 110%",
        }, g);
        text.textContent = s.name;
      }
    }
    return svg;
  }
  /** Draws the river left to right; each neighborhood appears as the line reaches it. Returns the end time. */
  function drawRiver(tl, svg, at = 0, { duration = 1.6 } = {}) {
    const lineEl = svg.querySelector('[data-role="line"]');
    tl.fromTo(svg.querySelector('[data-role="bank"]'), { opacity: 0 }, { opacity: 0.14, duration: 0.6, ease: "power1.out" }, at);
    drawStroke(tl, lineEl, at, duration, motion.draw);
    // Where along the line each stop sits, then when the eased draw front gets there.
    // The front is at len - offset, and the offset eases from `hidden` to 0.
    const len = +lineEl.dataset.len;
    const hidden = +lineEl.dataset.hidden;
    const lengthAtX = (x) => {
      let lo = 0, hi = len;
      for (let i = 0; i < 30; i++) {
        const mid = (lo + hi) / 2;
        if (lineEl.getPointAtLength(mid).x < x) lo = mid;
        else hi = mid;
      }
      return lo;
    };
    const progressAt = (eased) => {
      let lo = 0, hi = 1;
      for (let i = 0; i < 30; i++) {
        const mid = (lo + hi) / 2;
        if (motion.draw(mid) < eased) lo = mid;
        else hi = mid;
      }
      return hi;
    };
    svg.querySelectorAll('[data-role="stop"]').forEach((g) => {
      const when = at + progressAt(1 - (len - lengthAtX(+g.dataset.x)) / hidden) * duration;
      const dot = g.querySelector("circle");
      tl.fromTo(dot, { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: motion.snappy.duration, ease: motion.snappy.ease }, when);
      const label = g.querySelector("text");
      if (label) rise(tl, label, when + 0.06, { y: 10, spring: motion.snappy });
    });
    return at + duration;
  }
  /** Shows the river fully drawn (stills). */
  function showRiver(svg) {
    svg.querySelector('[data-role="line"]').style.strokeDashoffset = 0;
  }

  /** Steps a headline's size down until it fits maxHeight (Spanish runs 10–20% longer).
      Call after document.fonts.ready, so it measures Archivo and not a fallback font. */
  function fit(node, { max, min, maxHeight }) {
    let size = max;
    node.style.fontSize = `${size}px`;
    while (size > min && node.scrollHeight > maxHeight) {
      size -= 2;
      node.style.fontSize = `${size}px`;
    }
    return size;
  }

  /** The site's button arrow, as an inline SVG (Archivo's Latin subset has no → glyph). */
  function arrow(size = "1em") {
    const svg = el("svg", { viewBox: "0 0 20 20", width: size, height: size, fill: "none", stroke: "currentColor", "stroke-width": 2.2, "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" });
    el("path", { d: "M4 10h11M11 5.5 15.5 10 11 14.5" }, svg);
    return svg;
  }

  /* ---------- Components ---------- */
  function html(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }
  /** "Demo" (made-up business built by us) or "Example" (made-up, not one of our demos). */
  function badge(kind, lang) {
    if (kind !== "demo" && kind !== "example") throw new Error(`TWC: unknown badge "${kind}"`);
    return html("span", `twc-badge twc-badge--${kind}`, t(`labels.${kind}`, lang));
  }
  function bubble(text, side = "out") {
    return html("span", `twc-bubble${side === "in" ? " twc-bubble--in" : ""}`, text);
  }

  /** Burned-in captions from word timings ([{text, start, end}], as `hyperframes transcribe` writes).
      One short phrase at a time: a new phrase after a 0.5 s pause or a sentence end. A phrase
      longer than 6 words or 2.5 s is cut where the speaker would breathe: after a comma, colon or
      dash near the middle, otherwise into even parts (5 + 4, not 6 + 3) that never end on a little
      word ("the bottom of / the screen" becomes "the bottom / of the screen"). */
  const ABBREVIATIONS = /^(Co|St|Dr|Mr|Mrs|Ms|Jr|Inc|Ave|Sra|Sr|Dra)\.$/;
  const endsSentence = (text) => /[.?!]$/.test(text) && !ABBREVIATIONS.test(text);
  const endsClause = (text) => /[,;:–—]$/.test(text);
  // Little words, plus the words that open a clause ("answers what / people ask")
  const LITTLE = new Set("a an the of to at in on for and or but your our my its with from by what that which who when where how than as de del la el los las y o en por para tu su sus que con al cuando donde como".split(" "));
  // Little words, and a word that opens a quote without closing it, shouldn't end a line
  const isLittle = (text) => LITTLE.has(text.toLowerCase().replace(/[^\p{L}]/gu, "")) || (/^["“]/.test(text) && !/["”][,.?!]*$/.test(text));
  // A cut before word i splits a name: two capitalized words, or one on each side of "and" / "&"
  const joins = (text) => /^(and|&|y)$/i.test(text);
  const cutsName = (run, i) =>
    i > 0 && i < run.length &&
    ((isCapital(run[i - 1].text) && !endsClause(run[i - 1].text) && !endsSentence(run[i - 1].text) &&
      (isCapital(run[i].text) || (joins(run[i].text) && run[i + 1] && isCapital(run[i + 1].text)))) ||
      (joins(run[i - 1].text) && run[i - 2] && isCapital(run[i - 2].text) && isCapital(run[i].text)));
  const spoken = (g) => g[g.length - 1].end - g[0].start;
  // A phrase on screen for under 0.8 s can't be read: it joins its neighbor
  function foldShort(groups, maxWords) {
    for (let i = 0; i < groups.length && groups.length > 1; i++) {
      if (spoken(groups[i]) >= 0.8) continue;
      const j = i + 1 < groups.length ? i + 1 : i - 1;
      if (groups[i].length + groups[j].length > maxWords + 3) continue;
      const [a, b] = j > i ? [i, j] : [j, i];
      groups.splice(a, 2, groups[a].concat(groups[b]));
      i = -1;
    }
    return groups;
  }
  function splitRun(run, maxWords, maxSeconds) {
    const seconds = spoken(run);
    if (run.length <= maxWords && seconds <= maxSeconds) return [run];
    // Said in one breath: keep it one phrase and let captionLines set it on two lines
    if (seconds <= 1.6 && run.length <= maxWords + 3) return [run];
    // A clause break closest to the middle, keeping two words or more on each side
    let cut = -1;
    for (let i = 2; i <= run.length - 2; i++) {
      if (endsClause(run[i - 1].text) && (cut < 0 || Math.abs(i - run.length / 2) < Math.abs(cut - run.length / 2))) cut = i;
    }
    if (cut > 0) return foldShort([...splitRun(run.slice(0, cut), maxWords, maxSeconds), ...splitRun(run.slice(cut), maxWords, maxSeconds)], maxWords);
    const parts = Math.max(Math.ceil(run.length / maxWords), Math.ceil(seconds / maxSeconds));
    const groups = [];
    for (let start = 0, left = parts; start < run.length; left = Math.max(1, left - 1)) {
      // Share what's left evenly, so a moved word never strands one word on the last line
      let end = left === 1 ? run.length : start + Math.ceil((run.length - start) / left);
      // Don't end a line on a little word or inside a name: move the cut back
      while (end < run.length && end - start > 2 && (isLittle(run[end - 1].text) || cutsName(run, end))) end -= 1;
      // A name that starts the phrase: move the cut past it instead
      while (end < run.length && cutsName(run, end)) end += 1;
      groups.push(run.slice(start, end));
      start = end;
    }
    return foldShort(groups, maxWords);
  }
  /* A caption pill is 700 px wide at 54 px type, about 20 characters a line. A longer phrase is
     set as two lines, broken after punctuation if it has some, never after a little word or an
     opening quote, never inside a name ("Good Oak / Barbershop"), and otherwise as evenly as it
     goes. Counting characters instead of measuring keeps it deterministic before fonts load. */
  const CAPTION_LINE = 22;
  const quoteOpen = (text) => ((text.match(/["“”]/g) || []).length % 2) === 1;
  const isCapital = (text) => /^["“]?\p{Lu}/u.test(text);
  // Curly quotes and apostrophes, to match the type in the scenes ("can't" becomes "can’t")
  const curly = (text) => text.replace(/(^|[\s(])"/g, "$1“").replace(/"/g, "”").replace(/'/g, "’");
  function captionLines(raw) {
    const words = raw.map(curly);
    const text = words.join(" ");
    if (text.length <= CAPTION_LINE || words.length < 2) return [text];
    let best = null;
    for (let i = 1; i < words.length; i++) {
      const left = words.slice(0, i).join(" ");
      const right = words.slice(i).join(" ");
      const before = words[i - 1];
      let cost = Math.abs(left.length - right.length);
      if (endsClause(before) || endsSentence(before)) cost -= 12;
      if (isLittle(before)) cost += 40;
      if (isCapital(before) && isCapital(words[i]) && !endsClause(before)) cost += 30;
      if (quoteOpen(left)) cost += 40;
      if (Math.max(left.length, right.length) > CAPTION_LINE + 6) cost += 25;
      if (!best || cost < best.cost) best = { cost, lines: [left, right] };
    }
    return best.lines;
  }
  function captions(tl, container, transcript, { offset = 0, maxWords = 6, maxSeconds = 2.5 } = {}) {
    const words = (Array.isArray(transcript) ? transcript : transcript.words)
      .filter((w) => w.type !== "spacing" && String(w.text).trim())
      .map((w) => ({ text: String(w.text).trim(), start: +w.start, end: +w.end }));
    const runs = [];
    let current = [];
    words.forEach((w, i) => {
      current.push(w);
      const next = words[i + 1];
      if (!next || next.start - w.end >= 0.5 || endsSentence(w.text)) {
        runs.push(current);
        current = [];
      }
    });
    const groups = runs.flatMap((run) => splitRun(run, maxWords, maxSeconds));
    // A lone word joins the phrase before it, unless it ends a sentence.
    for (let i = groups.length - 1; i > 0; i--) {
      if (groups[i].length === 1 && !endsSentence(groups[i][0].text)) groups.splice(i - 1, 2, groups[i - 1].concat(groups[i]));
    }
    const box = html("div", "twc-captions");
    container.appendChild(box);
    groups.forEach((g, i) => {
      const line = html("p", "twc-caption");
      // The kit picks the line break, not the browser: each line stays whole (see kit.css)
      const pill = html("span", "");
      captionLines(g.map((w) => w.text)).forEach((text, i) => {
        if (i) pill.appendChild(document.createElement("br"));
        pill.appendChild(document.createTextNode(text));
      });
      line.appendChild(pill);
      box.appendChild(line);
      const start = offset + Math.max(0, g[0].start - 0.08);
      const nextStart = groups[i + 1] ? offset + groups[i + 1][0].start - 0.08 : Infinity;
      const end = Math.min(nextStart - 0.05, offset + g[g.length - 1].end + 0.6);
      tl.fromTo(line, { opacity: 0 }, { opacity: 1, duration: 0.12, ease: "none" }, start);
      tl.fromTo(line, { y: 14 }, { y: 0, duration: motion.snappy.duration, ease: motion.snappy.ease }, start);
      tl.to(line, { opacity: 0, duration: 0.1, ease: "none" }, end - 0.1);
    });
    return groups;
  }

  /** Safe-zone guides for previews. format: "reel", "story" or "carousel". */
  function guides(container, format) {
    const layer = html("div", "twc-guides");
    const zone = (box, label, kind) => {
      const z = html("div", `twc-guide${kind ? ` twc-guide--${kind}` : ""}`);
      Object.assign(z.style, box);
      if (label) z.appendChild(html("b", "", label));
      layer.appendChild(z);
    };
    const pad = "88px";
    if (format === "carousel") {
      zone({ left: 0, top: 0, bottom: 0, width: "34px" }, null);
      zone({ right: 0, top: 0, bottom: 0, width: "34px" }, null);
      zone({ left: "34px", top: "12px", width: "0" }, "Profile grid crops 34 px each side (shows 3:4)", "line");
    } else {
      zone({ left: 0, right: 0, top: 0, height: "250px" }, format === "reel" ? "No text: profile row (top 250 px)" : "No text: progress bar and profile (top 250 px)");
      zone({ left: 0, right: 0, bottom: 0, height: "350px" }, format === "reel" ? "No text: caption, audio, buttons (bottom 350 px)" : "No text: reply bar (bottom 350 px)");
      if (format === "reel") zone({ left: "880px", right: 0, top: "1060px", bottom: "350px" }, "Buttons", "soft");
    }
    zone({ left: pad, top: 0, bottom: 0, width: "0" }, null, "line");
    zone({ right: pad, top: 0, bottom: 0, width: "0" }, null, "line");
    container.appendChild(layer);
    return layer;
  }

  window.TWC = {
    data: DATA,
    init, vars, transcript, t, price, monthly, priceFrom, dm,
    spring, bezier, motion, rise,
    logo, drawLogo, showLogo, river, drawRiver, showRiver,
    fit, arrow, badge, bubble, captions, endsSentence, guides,
  };
})();
