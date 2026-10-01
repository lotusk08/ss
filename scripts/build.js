import { mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  accents,
  base,
  breakpoints,
  motion,
  paper,
  radius,
  roles,
  size,
  space,
  themeColor,
  type
} from '../src/palette.js';
import { icon, line, solid } from '../src/icons/index.js';
import { scale } from '../src/scale.js';

const scales = Object.fromEntries(Object.entries(accents).map(([name, value]) => [name, scale(value)]));

const dist = fileURLToPath(new URL('../dist/', import.meta.url));

const decl = (entries, indent = '  ') =>
  entries.map(([name, value]) => `${indent}--ss-${name}: ${value};`).join('\n');

const paperEntries = (mode) => Object.entries(paper).map(([name, value]) => [name, value[mode]]);

const modeEntries = (mode) => [
  ...Object.keys(accents).map((name) => [name, `var(--ss-${name}-${mode})`]),
  ...Object.entries(roles).map(([name, value]) => [name, value[mode]])
];

export function css() {
  const fixed = [
    ...Object.entries(base).map(([step, hex]) => [`base-${step}`, hex]),
    ...Object.entries(accents).flatMap(([name, value]) => [
      [`${name}-light`, value.light],
      [`${name}-dark`, value.dark]
    ]),
    ...Object.entries(scales).flatMap(([name, { steps }]) => Object.entries(steps).map(([step, hex]) => [`${name}-${step}`, hex])),
    ...Object.entries(type),
    ...Object.entries(space),
    ...Object.entries(radius),
    ...Object.entries(motion),
    ...Object.entries(size),
    ['focus-ring', 'var(--ss-focus-width) solid var(--ss-accent)']
  ];
  return `:root {
${decl(fixed)}
${decl(modeEntries('light'))}
  color-scheme: light;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-mode='light']) {
${decl(modeEntries('dark'), '    ')}
    color-scheme: dark;
  }
}

:root[data-mode='dark'] {
${decl(modeEntries('dark'))}
  color-scheme: dark;
}

:root[data-surface='paper'] {
${decl(paperEntries('light'))}
}

@media (prefers-color-scheme: dark) {
  :root[data-surface='paper']:not([data-mode='light']) {
${decl(paperEntries('dark'), '    ')}
  }
}

:root[data-surface='paper'][data-mode='dark'] {
${decl(paperEntries('dark'))}
}

:root:lang(vi) {
  --ss-label-case: none;
  --ss-label-tracking: 0.01em;
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --ss-dur-small: 150ms;
    --ss-dur-medium: 150ms;
    --ss-dur-large: 150ms;
    --ss-dur-hero: 150ms;
    --ss-stagger: 0ms;
    --ss-reveal-shift: 0px;
  }
}
`;
}

const scssName = (name) => `$ss-${name}`;

export function scss() {
  const lines = [
    ...Object.entries(base).map(([step, hex]) => `${scssName(`base-${step}`)}: ${hex};`),
    ...Object.entries(accents).flatMap(([name, value]) => [
      `${scssName(`${name}-light`)}: ${value.light};`,
      `${scssName(`${name}-dark`)}: ${value.dark};`
    ]),
    ...Object.entries(scales).flatMap(([name, { steps }]) => Object.entries(steps).map(([step, hex]) => `${scssName(`${name}-${step}`)}: ${hex};`)),
    ...[type, space, radius, motion, size].flatMap((group) =>
      Object.entries(group).map(([name, value]) => `${scssName(name)}: ${value};`)
    )
  ];
  const map = (mode, set = roles, name = mode) =>
    `${scssName(name)}: (\n${Object.entries(set)
      .map(([name, value]) => `  '${name}': ${value[mode].includes(',') ? `(${value[mode]})` : value[mode]}`)
      .join(',\n')}\n);`;
  const points = `$ss-breakpoints: (\n${Object.entries(breakpoints)
    .map(([name, value]) => `  ${name}: ${value}`)
    .join(',\n')}\n);`;
  return `${lines.join('\n')}\n\n${map('light')}\n\n${map('dark')}\n\n${map('light', paper, 'paper-light')}\n\n${map('dark', paper, 'paper-dark')}\n\n${points}\n`;
}

export function tailwind() {
  const colors = [
    ...Object.keys(base).map((step) => [`color-base-${step}`, `var(--ss-base-${step})`]),
    ...Object.keys(accents).map((name) => [`color-${name}`, `var(--ss-${name})`]),
    ...Object.entries(scales).flatMap(([name, { steps }]) => Object.keys(steps).map((step) => [`color-${name}-${step}`, `var(--ss-${name}-${step})`])),
    ...Object.keys(roles)
      .filter((name) => !name.startsWith('shadow') && !name.includes('gradient'))
      .map((name) => [`color-${name}`, `var(--ss-${name})`])
  ];
  const fonts = ['sans', 'serif', 'mono', 'title', 'figure'].map((name) => [
    `font-${name}`,
    `var(--ss-font-${name})`
  ]);
  const radii = Object.keys(radius).map((name) => [name, `var(--ss-${name})`]);
  const easing = Object.keys(motion)
    .filter((name) => name.startsWith('ease-'))
    .map((name) => [name, `var(--ss-${name})`]);
  const shadows = [
    ['shadow-card', 'var(--ss-shadow-card)'],
    ['shadow-pop', 'var(--ss-shadow-pop)']
  ];
  const points = Object.entries(breakpoints).map(([name, value]) => [`breakpoint-${name}`, value]);
  const body = [...colors, ...fonts, ...radii, ...easing, ...shadows, ...points]
    .map(([name, value]) => `  --${name}: ${value};`)
    .join('\n');
  return `@import './ss.css';\n\n@theme inline {\n${body}\n}\n`;
}

export function json() {
  return `${JSON.stringify(
    { base, accents, scales, roles, paper, themeColor, type, space, radius, motion, size, breakpoints },
    null,
    2
  )}\n`;
}

const FA = `<!--
Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
License - https://fontawesome.com/license/free (Icons: CC BY 4.0)
-->`;

export function lineSprite() {
  const symbols = Object.entries(line)
    .map(([name, body]) => `<symbol id="${name}" viewBox="0 0 24 24">${body}</symbol>`)
    .join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" style="display: none">\n${symbols}\n</svg>\n`;
}

export function solidSprite() {
  const symbols = Object.entries(solid)
    .map(([name, { viewBox, body }]) => `<symbol id="${name}" viewBox="${viewBox}">${body}</symbol>`)
    .join('\n');
  return `${FA}\n<svg xmlns="http://www.w3.org/2000/svg" style="display: none">\n${symbols}\n</svg>\n`;
}

const standalone = (name, set) => () =>
  `${icon(name, { set, size: '24' })
    .replace(' class="ss-icon ' + set + '"', ' xmlns="http://www.w3.org/2000/svg"')
    .replace(' aria-hidden="true" focusable="false"', '')}\n`;

export const outputs = {
  'ss.css': css,
  'ss.scss': scss,
  'tailwind.css': tailwind,
  'tokens.json': json,
  'icons/line.svg': lineSprite,
  'icons/solid.svg': solidSprite,
  ...Object.fromEntries(Object.keys(line).map((name) => [`icons/line/${name}.svg`, standalone(name, 'line')])),
  ...Object.fromEntries(Object.keys(solid).map((name) => [`icons/solid/${name}.svg`, standalone(name, 'solid')]))
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await rm(`${dist}icons`, { recursive: true, force: true });
  await Promise.all(
    Object.entries(outputs).map(async ([file, make]) => {
      await mkdir(dirname(`${dist}${file}`), { recursive: true });
      await writeFile(`${dist}${file}`, make());
    })
  );
  console.log(`wrote ${Object.keys(outputs).length} files`);
}
