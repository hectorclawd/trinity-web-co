// Renders a piece into out/ in one or both languages.
//
//   node scripts/render.mjs <entry.html> [--lang en|es|both] [--still] [--split <seconds>] [--guides] [--quality draft|looks|delivery]
//   node scripts/render.mjs --samples        (the kit's review samples)
//
// Videos become <name>-<lang>.mp4 plus a <name>-<lang>.png of the last frame.
// --still renders one PNG per second of the timeline (carousels: one slide per second).
// --split N cuts the video into N-second parts, <name>-<lang>-1.mp4 and up, each with a PNG of its
// last frame (story sets: one frame per part).
// --guides draws Instagram's safe zones on top; those files get a -guides suffix and never post.
// Runs `npm run sync` first, so config.ts changes are always in. --no-sync skips it, for several
// renders running at once (run `npm run sync` once before them).
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const pinned = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).scripts.render.match(/hyperframes@[\d.]+/)[0];
const cli = process.env.HYPERFRAMES_CLI || `npx --yes ${pinned}`;

function run(cmd, args) {
  // One command string (paths here have no spaces), so npx resolves on Windows too.
  const result = spawnSync([cmd, ...args].join(' '), { cwd: root, stdio: 'inherit', shell: true });
  if (result.status !== 0) {
    console.error(`render: ${cmd} ${args.join(' ')} failed`);
    process.exit(result.status || 1);
  }
}

function render(entry, { lang = 'en', still = false, split = 0, guides = false, quality = 'looks' } = {}) {
  const name = `${basename(entry, '.html')}-${lang}${guides ? '-guides' : ''}`;
  const outDir = join(root, 'out', dirname(entry) === '.' ? '' : dirname(entry));
  mkdirSync(join(root, 'out', '.vars'), { recursive: true });
  mkdirSync(outDir, { recursive: true });
  const varsFile = join('out', '.vars', `${name}.json`);
  writeFileSync(join(root, varsFile), JSON.stringify({ lang, guides }));
  const common = ['render', '--composition', entry, '--variables-file', varsFile, '--quality', quality, '--quiet'];

  if (still) {
    const frames = join(outDir, `.${name}-frames`);
    rmSync(frames, { recursive: true, force: true });
    run(cli, [...common, '--format', 'png-sequence', '--fps', '1', '--output', frames]);
    const files = readdirSync(frames).filter((f) => f.endsWith('.png')).sort();
    files.forEach((f, i) => {
      const target = files.length === 1 ? `${name}.png` : `${name}-${String(i + 1).padStart(2, '0')}.png`;
      renameSync(join(frames, f), join(outDir, target));
    });
    rmSync(frames, { recursive: true, force: true });
    console.log(`render: ${files.length} PNG(s) → out/${dirname(entry)}/${name}${files.length === 1 ? '.png' : '-NN.png'}`);
  } else {
    const video = join(outDir, `${name}.mp4`);
    run(cli, [...common, '--output', video]);
    run('ffmpeg', ['-y', '-loglevel', 'error', '-sseof', '-0.1', '-i', `"${video}"`, '-frames:v', '1', '-update', '1', `"${join(outDir, `${name}.png`)}"`]);
    console.log(`render: out/${dirname(entry)}/${name}.mp4 and .png (last frame)`);
    if (split > 0) {
      // Re-encode each part so it starts on its own first frame, not on the nearest keyframe
      const total = Number(readFileSync(join(root, entry), 'utf8').match(/data-duration="([\d.]+)"/)[1]);
      const parts = Math.round(total / split);
      for (let i = 0; i < parts; i++) {
        const part = join(outDir, `${name}-${i + 1}`);
        run('ffmpeg', ['-y', '-loglevel', 'error', '-ss', String(i * split), '-t', String(split), '-i', `"${video}"`, '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p', '-an', `"${part}.mp4"`]);
        run('ffmpeg', ['-y', '-loglevel', 'error', '-ss', String(i * split + split - 0.1), '-i', `"${video}"`, '-frames:v', '1', '-update', '1', `"${part}.png"`]);
      }
      console.log(`render: split into ${parts} parts of ${split} s → out/${dirname(entry)}/${name}-N.mp4 and .png`);
    }
  }
}

const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const value = (f, fallback) => (args.includes(f) ? args[args.indexOf(f) + 1] : fallback);

if (!flag('--no-sync')) run('node', ['scripts/sync-config.mjs']);

if (flag('--samples')) {
  render('samples/r1-end-card.html', { lang: 'en' });
  render('samples/r1-end-card.html', { lang: 'es' });
  render('samples/c1-cover.html', { lang: 'en', still: true });
  render('samples/r1-end-card.html', { lang: 'en', guides: true });
  render('samples/c1-cover.html', { lang: 'en', still: true, guides: true });
} else {
  const entry = args.find((a) => a.endsWith('.html'));
  if (!entry) {
    console.error('usage: node scripts/render.mjs <entry.html> [--lang en|es|both] [--still] [--guides] [--quality draft|looks|delivery]');
    process.exit(1);
  }
  const lang = value('--lang', 'en');
  for (const l of lang === 'both' ? ['en', 'es'] : [lang]) {
    render(entry, { lang: l, still: flag('--still'), split: Number(value('--split', 0)), guides: flag('--guides'), quality: value('--quality', 'looks') });
  }
}
