// Draws the @trinitywebco profile picture, logo files and highlight covers (see README.md).
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const REPO = path.resolve(__dirname, '../../../..');
const OUT = path.join(REPO, 'business/marketing/instagram/profile');
const FONT = 'data:font/woff2;base64,' + fs.readFileSync(path.join(REPO, 'business/marketing/instagram/brand/fonts/archivo-latin-wdth-normal.woff2')).toString('base64');
const C = { ink: '#13262B', deep: '#0E3F3C', limestone: '#ECEFE9', paper: '#FAFBF8' };

// The bridge mark, same paths as site/public/logo-mark.svg
const mark = (stroke) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 3 50 28">
  <g fill="none" stroke="${stroke}" stroke-linecap="round">
    <path d="M3 28 Q24 -6 45 28" stroke-width="3.2"/>
    <path d="M14 28 L18 11 M24 28 L24 6.5 M34 28 L30 11" stroke-width="2"/>
    <path d="M1 28 H47" stroke-width="3.2"/>
  </g></svg>`;

const head = `<style>
@font-face { font-family: Archivo; src: url('${FONT}') format('woff2'); font-weight: 100 900; font-stretch: 62% 125%; }
html,body { margin:0; padding:0; }
.word { font-family: Archivo; font-weight: 820; font-stretch: 120%; letter-spacing: -0.01em; white-space: nowrap; }
</style>`;

const S = 'stroke-linecap="round" stroke-linejoin="round" fill="none"';
const icons = {
  prices: `<text x="0" y="0" text-anchor="middle" dominant-baseline="central" fill="${C.paper}" style="font-family:Archivo;font-weight:820;font-stretch:125%;font-size:330px">$</text>`,
  demos: `<g ${S} stroke="${C.paper}" stroke-width="22"><rect x="-105" y="-175" width="210" height="350" rx="34"/><path d="M-30 -140 H30"/><path d="M-55 -60 H55 M-55 -10 H25 M-55 40 H45"/></g>`,
  'how-it-works': `<g ${S} stroke="${C.paper}" stroke-width="22"><path d="M-150 0 H150"/></g><g fill="${C.deep}" stroke="${C.paper}" stroke-width="22"><circle cx="-150" cy="0" r="42"/><circle cx="0" cy="0" r="42"/><circle cx="150" cy="0" r="42"/></g>`,
  faq: `<text x="0" y="0" text-anchor="middle" dominant-baseline="central" fill="${C.paper}" style="font-family:Archivo;font-weight:820;font-stretch:125%;font-size:330px">?</text>`,
  'free-check': `<g ${S} stroke="${C.paper}" stroke-width="22"><path d="M-160 70 A160 160 0 0 1 160 70"/><path d="M0 70 L85 -45"/></g><circle cx="0" cy="70" r="26" fill="${C.paper}"/>`,
};

(async () => {
  fs.mkdirSync(path.join(OUT, 'logo'), { recursive: true });
  fs.mkdirSync(path.join(OUT, 'highlights'), { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const shot = async (html, w, h, file, transparent = false) => {
    await page.setViewportSize({ width: w, height: h });
    await page.setContent(`<!doctype html><html><head>${head}</head><body style="width:${w}px;height:${h}px;${transparent ? '' : ''}">${html}</body></html>`);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(OUT, file), omitBackground: transparent });
  };

  // Profile picture: Paper bridge on River deep (DESIGN.md: Paper on River deep; no gold)
  await shot(`<div style="width:1080px;height:1080px;background:${C.deep};display:flex;align-items:center;justify-content:center">
    <div style="width:660px;margin-top:-10px">${mark(C.paper)}</div></div>`, 1080, 1080, 'profile-picture.png');

  // Logo mark, transparent PNGs and SVGs
  fs.writeFileSync(path.join(OUT, 'logo/trinity-logo-mark.svg'), mark(C.deep) + '\n');
  fs.writeFileSync(path.join(OUT, 'logo/trinity-logo-mark-paper.svg'), mark(C.paper) + '\n');
  await shot(`<div style="width:1200px;height:672px">${mark(C.deep)}</div>`, 1200, 672, 'logo/trinity-logo-mark.png', true);
  await shot(`<div style="width:1200px;height:672px">${mark(C.paper)}</div>`, 1200, 672, 'logo/trinity-logo-mark-paper.png', true);

  // Lockup: mark + name, as in the site header (gap 0.6em, mark 42x28 at 1.15rem type)
  const lockup = (bg, markColor, textColor, file, transparent) => shot(
    `<div style="width:2000px;height:600px;${transparent ? '' : 'background:' + bg + ';'}display:flex;align-items:center;justify-content:center;gap:56px">
      <div style="width:340px;height:190px">${mark(markColor)}</div>
      <div class="word" style="font-size:150px;color:${textColor};line-height:1">Trinity Web Co.</div></div>`,
    2000, 600, file, transparent);
  await lockup(null, C.deep, C.ink, 'logo/trinity-web-co-logo.png', true);
  await lockup(null, C.paper, C.paper, 'logo/trinity-web-co-logo-white.png', true);
  await lockup(C.limestone, C.deep, C.ink, 'logo/trinity-web-co-logo-on-limestone.png', false);
  await lockup(C.deep, C.paper, C.paper, 'logo/trinity-web-co-logo-on-river.png', false);

  // Highlight covers, 1080x1920; Instagram shows the center circle, so icons stay inside 420px
  for (const [name, icon] of Object.entries(icons)) {
    await shot(`<div style="width:1080px;height:1920px;background:${C.deep}">
      <svg width="1080" height="1920" viewBox="-540 -960 1080 1920" xmlns="http://www.w3.org/2000/svg">${icon}</svg></div>`,
      1080, 1920, `highlights/highlight-${name}.png`);
  }
  await browser.close();
})();
