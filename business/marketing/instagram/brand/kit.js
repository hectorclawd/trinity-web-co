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
      One short phrase at a time: a new phrase after a 0.5 s pause or a sentence end, and a phrase
      longer than 6 words or 2.5 s is cut into even parts (5 + 4, not 6 + 3). */
  const ABBREVIATIONS = /^(Co|St|Dr|Mr|Mrs|Ms|Jr|Inc|Ave|Sra|Sr|Dra)\.$/;
  const endsSentence = (text) => /[.?!]$/.test(text) && !ABBREVIATIONS.test(text);
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
    const groups = runs.flatMap((run) => {
      const seconds = run[run.length - 1].end - run[0].start;
      const parts = Math.max(Math.ceil(run.length / maxWords), Math.ceil(seconds / maxSeconds));
      const size = Math.ceil(run.length / parts);
      return Array.from({ length: Math.ceil(run.length / size) }, (_, i) => run.slice(i * size, (i + 1) * size));
    });
    // A lone word joins the phrase before it, unless it ends a sentence.
    for (let i = groups.length - 1; i > 0; i--) {
      if (groups[i].length === 1 && !endsSentence(groups[i][0].text)) groups.splice(i - 1, 2, groups[i - 1].concat(groups[i]));
    }
    const box = html("div", "twc-captions");
    container.appendChild(box);
    groups.forEach((g, i) => {
      const line = html("p", "twc-caption");
      line.appendChild(html("span", "", g.map((w) => w.text).join(" ")));
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
    init, vars, transcript, t, price, monthly, dm,
    spring, bezier, motion, rise,
    logo, drawLogo, showLogo, river, drawRiver, showRiver,
    fit, arrow, badge, bubble, captions, endsSentence, guides,
  };
})();
