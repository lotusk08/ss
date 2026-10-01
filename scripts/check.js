import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { THEME_COLOR } from '../js/mode.js';
import { aliases, line, solid } from '../src/icons/index.js';
import { surfaces, themeColor } from '../src/palette.js';
import { outputs } from './build.js';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));

const channel = (value) => {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => channel(parseInt(hex.slice(i, i + 2), 16)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const contrast = (one, two) => {
  const [hi, lo] = [luminance(one), luminance(two)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const pairs = [
  ['tx', 'bg', 7],
  ['tx', 'bg-2', 7],
  ['tx-2', 'bg', 4.5],
  ['tx-2', 'bg-2', 4.5],
  ['tx-3', 'bg', 3],
  ['tx-3', 'bg-2', 3],
  ['accent-2', 'bg', 4.5],
  ['accent-2', 'bg-2', 4.5],
  ['accent', 'bg-2', 3],
  ['on-accent', 'accent', 4.5]
];

const failures = [];

for (const [surface, roles] of Object.entries(surfaces)) for (const mode of ['light', 'dark']) {
  for (const [fore, back, min] of pairs) {
    const ratio = contrast(roles[fore][mode], roles[back][mode]);
    const report = `${surface.padEnd(5)} ${mode.padEnd(5)} ${fore} on ${back}: ${ratio.toFixed(2)} (needs ${min})`;
    if (ratio < min) failures.push(report);
    else console.log(`ok    ${report}`);
  }
}

for (const [from, to] of Object.entries(aliases)) {
  if (!line[from]) failures.push(`icon alias ${from} names no line icon`);
  if (!solid[to]) failures.push(`icon alias ${from} points at ${to}, which is no solid icon`);
}

const head = await readFile(new URL('../js/head.html', import.meta.url), 'utf8');
for (const mode of ['light', 'dark']) {
  if (THEME_COLOR[mode] !== themeColor[mode]) failures.push(`js/mode.js ${mode} theme colour differs from the palette`);
  if (!head.includes(`content="${themeColor[mode]}" media="(prefers-color-scheme: ${mode})"`)) {
    failures.push(`js/head.html ${mode} theme colour differs from the palette`);
  }
}

for (const [file, make] of Object.entries(outputs)) {
  const written = await readFile(`${dist}${file}`, 'utf8').catch(() => '');
  if (written !== make()) failures.push(`dist/${file} is stale, run npm run build`);
}

if (failures.length) {
  for (const line of failures) console.error(`fail  ${line}`);
  process.exit(1);
}
