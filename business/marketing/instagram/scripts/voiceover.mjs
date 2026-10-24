// Makes a Reel's voiceover with the narrator in config.ts (ElevenLabs), plus its word timings.
//
//   node scripts/voiceover.mjs <piece> [--lang en|es] [--force]     e.g. node scripts/voiceover.mjs r1
//
// Reads <piece>/script-<lang>.txt (lines starting with # are notes, not read aloud) and writes
// <piece>/audio/<piece>-<lang>.mp3 and <piece>/audio/<piece>-<lang>.words.json, the
// [{ text, start, end }] word timings the caption track reads (the same shape
// `hyperframes transcribe` writes). Each run costs credits, so it won't overwrite a take
// unless you pass --force.
//
// Spanish only renders once Hector has checked the script: script-es.txt must have a line
// "# Checked by Hector: YYYY-MM-DD".
//
// The API key comes from ELEVENLABS_API_KEY: the environment first, then the Windows user
// variable (set with `setx`, read from the registry so it works before a restart). It is never
// printed or written to a file. Credentials live in Bitwarden.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from '../config.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const fail = (msg) => {
  console.error(`voiceover: ${msg}`);
  process.exit(1);
};

function apiKey() {
  if (process.env.ELEVENLABS_API_KEY) return process.env.ELEVENLABS_API_KEY;
  if (process.platform === 'win32') {
    try {
      const out = execFileSync('reg', ['query', 'HKCU\\Environment', '/v', 'ELEVENLABS_API_KEY'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
      const key = out.match(/ELEVENLABS_API_KEY\s+REG_\w+\s+(\S+)/)?.[1];
      if (key) return key;
    } catch {
      // not set; fall through to the message below
    }
  }
  fail('ELEVENLABS_API_KEY is not set. Copy the key from Bitwarden and run, in your own PowerShell window: setx ELEVENLABS_API_KEY "<key>"');
}

// Character timings → word timings: a word runs from its first character's start to its last
// character's end. Punctuation stays on the word, as captions show it.
function words({ characters, character_start_times_seconds: starts, character_end_times_seconds: ends }) {
  const out = [];
  let word = null;
  characters.forEach((ch, i) => {
    if (/\s/.test(ch)) {
      if (word) out.push(word);
      word = null;
    } else if (word) {
      word.text += ch;
      word.end = ends[i];
    } else {
      word = { text: ch, start: starts[i], end: ends[i] };
    }
  });
  if (word) out.push(word);
  return out.map((w) => ({ text: w.text, start: +w.start.toFixed(3), end: +w.end.toFixed(3) }));
}

const args = process.argv.slice(2);
const lang = args.includes('--lang') ? args[args.indexOf('--lang') + 1] : 'en';
const piece = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--lang');
if (!piece) fail('usage: node scripts/voiceover.mjs <piece> [--lang en|es] [--force]');
if (!['en', 'es'].includes(lang)) fail(`unknown language "${lang}"`);

const scriptFile = join(root, piece, `script-${lang}.txt`);
if (!existsSync(scriptFile)) fail(`no script at ${piece}/script-${lang}.txt`);
const lines = readFileSync(scriptFile, 'utf8').split(/\r?\n/);
if (lang === 'es' && !lines.some((l) => /^#\s*Checked by Hector:\s*\d{4}-\d{2}-\d{2}/.test(l))) {
  fail(`${piece}/script-es.txt isn't checked yet. Hector checks every Spanish script first; then add "# Checked by Hector: YYYY-MM-DD".`);
}
const text = lines.filter((l) => !l.trim().startsWith('#')).join(' ').replace(/\s+/g, ' ').trim();
if (!text) fail(`${piece}/script-${lang}.txt has no text`);

const audioDir = join(root, piece, 'audio');
const mp3 = join(audioDir, `${piece}-${lang}.mp3`);
if (existsSync(mp3) && !args.includes('--force')) fail(`${piece}/audio/${piece}-${lang}.mp3 already exists (a new take costs credits). Pass --force to replace it.`);

const { voiceId, model, settings, name } = config.narrator;
const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/with-timestamps?output_format=mp3_44100_128`, {
  method: 'POST',
  headers: { 'xi-api-key': apiKey(), 'content-type': 'application/json' },
  body: JSON.stringify({ text, model_id: model, voice_settings: settings }),
});
if (!res.ok) fail(`ElevenLabs answered ${res.status}: ${await res.text()}`);
const { audio_base64: audio, alignment } = await res.json();

mkdirSync(audioDir, { recursive: true });
writeFileSync(mp3, Buffer.from(audio, 'base64'));
const timings = words(alignment);
writeFileSync(join(audioDir, `${piece}-${lang}.words.json`), `${JSON.stringify(timings, null, 2)}\n`);
const seconds = timings.at(-1)?.end ?? 0;
console.log(`voiceover: ${piece}/audio/${piece}-${lang}.mp3 (${name}, ${seconds.toFixed(1)} s, ${timings.length} words, ${text.length} characters) and .words.json`);
