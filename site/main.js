import { accents, base, motion, roles, surfaces } from '../src/palette.js';
import { scale } from '../src/scale.js';
import { icon, line, solid } from '../src/icons/index.js';
import { initMode, onMode, toggleMode } from '../js/mode.js';
import { backToTop } from '../js/motion.js';
import { swap } from '../js/swap.js';

const $ = (selector) => document.querySelector(selector);
const root = document.documentElement;

const toast = (text) => {
  const el = $('#toast');
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('show'), 1600);
};

const copy = async (text, said = 'Copied') => {
  try {
    await navigator.clipboard.writeText(text);
    toast(`${said}: ${text}`);
  } catch {
    toast(text);
  }
};

const swatch = (hex, short = false) =>
  `<button type="button"${short ? ' class="short"' : ''} data-copy="${hex}" title="${hex}" aria-label="Copy ${hex}" style="--c:${hex}"></button>`;
const names = ['bg', 'bg-2', 'ui', 'ui-2', 'ui-3', 'tx-3', 'tx-2', 'tx'];
const order = { red: 're', ember: 'em', yellow: 'ye', sand: 'sa', green: 'gr', blue: 'bl', purple: 'pu' };
$('#accents').innerHTML = [
  ...Object.keys(order).map((name) => swatch(accents[name].dark, true)),
  ...Object.keys(order).map((name) => swatch(accents[name].light)),
  ...Object.values(order).map((short) => `<code>${short}</code>`)
].join('');
const live = () => {
  const style = getComputedStyle(root);
  $('#base').innerHTML = [
    ...names.map((name) => swatch(style.getPropertyValue(`--ss-${name}`).trim())),
    ...names.map((name) => `<code>${name}</code>`)
  ].join('');
  drawMap();
};
const cell = (hex) => `<td><button type="button" data-copy="${hex}" title="${hex}" aria-label="Copy ${hex}" style="--c:${hex}"></button></td>`;
const row = (hex, name, light, dark) =>
  `<tr>${cell(hex)}<td>${name}</td><td>${hex.toUpperCase()}</td><td>${light.join(' ')}</td><td>${dark.join(' ')}</td></tr>`;
const uses = (hex, mode) => names.filter((name) => roles[name][mode] === hex);
const ramp = ['black', 950, 900, 850, 800, 700, 600, 500, 400, 300, 200, 150, 100, 50, 'paper'];
$('#base-table').innerHTML = ramp
  .map((step) => row(base[step], /^\d/.test(step) ? `base-${step}` : step, uses(base[step], 'light'), uses(base[step], 'dark')))
  .join('');
$('#accent-table').innerHTML = Object.entries(order)
  .flatMap(([name, short]) => {
    const { day, night } = scale(accents[name]);
    const { light, dark } = accents[name];
    return light === dark
      ? [row(light, `${name}-${day}`, [short], [short])]
      : [row(light, `${name}-${day}`, [short], []), row(dark, `${name}-${night}`, [], [short])];
  })
  .join('');

const STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
$('#range').innerHTML = Object.keys(order)
  .flatMap((name) => {
    const { steps } = scale(accents[name]);
    return STEPS.map((step) => `<button type="button" data-copy="${steps[step]}" data-label="${name}-${step}" aria-label="Copy ${name}-${step} ${steps[step]}" style="--c:${steps[step]}"></button>`);
  })
  .join('');

const known = new Map([
  ...ramp.map((step) => [base[step], /^\d/.test(step) ? `base-${step}` : step]),
  ...Object.keys(order).flatMap((name) => {
    const { day, night } = scale(accents[name]);
    return [[accents[name].light, `${name}-${day}`], [accents[name].dark, `${name}-${night}`]];
  })
]);
const mapUse = { bg: 'page', 'bg-2': 'card', ui: 'line', 'ui-2': 'strong line', 'ui-3': 'hover', 'tx-3': 'muted', 'tx-2': 'text', tx: 'title', icon: 'icon', accent: 'accent', 'accent-2': 'link' };
const short = (color) =>
  color.replace(/^rgb\((\d+) (\d+) (\d+) \/ (\d+%)\)$/, (_, r, g, b, a) => `#${[r, g, b].map((n) => Number(n).toString(16).padStart(2, '0')).join('')} ${a}`);
const value = (hex) =>
  `<td><button type="button" data-copy="${hex}" title="${hex}" aria-label="Copy ${hex}" style="--c:${hex}"></button>${known.get(hex) ?? short(hex)}</td>`;
function drawMap() {
  const now = surfaces[root.getAttribute('data-surface') === 'desk' ? 'desk' : 'paper'];
  $('#map-table').innerHTML = Object.entries(mapUse)
    .map(([name, use]) => `<tr><td>${name}</td>${value(now[name].light)}${value(now[name].dark)}<td>${use}</td></tr>`)
    .join('');
}

for (const id of ['#base', '#accents', '#base-table', '#accent-table', '#map-table', '#range']) {
  $(id).addEventListener('click', (event) => {
    const button = event.target.closest('[data-copy]');
    if (button) copy(button.dataset.copy);
  });
}

const grid = $('#icon-grid');
let set = 'solid';
const drawIcons = () => {
  const query = $('#icon-q').value.trim().toLowerCase();
  const names = Object.keys(set === 'solid' ? solid : line).filter((name) => name.includes(query));
  grid.innerHTML = names.length
    ? names.map((name) => `<li><button type="button" data-name="${name}" title="${name}">${icon(name, { set })}<span>${name}</span></button></li>`).join('')
    : `<li class="empty">No ${set} icon is called that.</li>`;
};
grid.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-name]');
  if (button) copy(`icon('${button.dataset.name}'${set === 'solid' ? ", { set: 'solid' }" : ''})`);
});
for (const button of document.querySelectorAll('[data-set]')) {
  button.addEventListener('click', () => {
    set = button.dataset.set;
    for (const other of document.querySelectorAll('[data-set]')) other.setAttribute('aria-pressed', String(other === button));
    drawIcons();
  });
}
$('#icon-q').addEventListener('input', drawIcons);
drawIcons();

$('#curves').innerHTML = Object.entries(motion)
  .filter(([name]) => name.startsWith('ease-'))
  .map(([name, value]) => `<div class="curve${name === 'ease-out' ? ' accent' : ''}" style="--ease:${value}"><span>${name.slice(5)}<code>${value}</code></span><div class="track"><i></i></div></div>`)
  .join('');
$('#play').addEventListener('click', () => $('#curves').classList.toggle('go'));

const clean = (html) => html.replace(/\s(data-mode-button|style="[^"]*")/g, '').trim();
for (const part of document.querySelectorAll('.part')) {
  const sample = part.querySelector(':scope > div');
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'part-copy';
  button.setAttribute('aria-label', 'Copy markup');
  button.innerHTML = icon('clone', { set: 'solid' });
  button.addEventListener('click', () => copy(clean(sample.innerHTML), 'Copied markup'));
  part.append(button);
}

for (const link of document.querySelectorAll('.part .ss-pager a')) link.addEventListener('click', (event) => event.preventDefault());

for (const block of document.querySelectorAll('.ss-code')) {
  block.querySelector('button').addEventListener('click', () => copy(block.querySelector('code').textContent, 'Copied'));
}

const paintBar = () => {
  const meta = document.querySelector('meta[name="theme-color"]:not([media])');
  if (meta) meta.content = getComputedStyle(root).getPropertyValue('--ss-bg').trim();
};

const pressSurface = () => {
  const surface = root.getAttribute('data-surface') === 'desk' ? 'desk' : 'paper';
  for (const button of document.querySelectorAll('[data-surface]:not(html)')) {
    button.setAttribute('aria-pressed', String(button.dataset.surface === surface));
  }
};
for (const button of document.querySelectorAll('button[data-surface]')) {
  button.addEventListener('click', () => {
    root.setAttribute('data-surface', button.dataset.surface);
    pressSurface();
    live();
    paintBar();
    try {
      sessionStorage.setItem('surface', button.dataset.surface);
    } catch {
      return;
    }
  });
}
pressSurface();

for (const button of [$('#mode'), ...document.querySelectorAll('[data-mode-button]')]) {
  button.addEventListener('click', toggleMode);
}
onMode(() => requestAnimationFrame(live));
initMode();
live();

backToTop($('#back-to-top'));
for (const button of document.querySelectorAll('.ss-swap')) swap(button);
