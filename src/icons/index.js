import { line } from './line.js';
import { solid } from './solid.js';

export { line, solid };

export const aliases = {
  'bullet-list': 'list-ul',
  'chevron-down': 'angle-down',
  'chevron-left': 'angle-left',
  'chevron-right': 'angle-right',
  'chevron-up': 'angle-up',
  'circle-alert': 'circle-exclamation',
  close: 'xmark',
  copy: 'clone',
  edit: 'pen',
  external: 'out-link',
  home: 'house',
  'triangle-alert': 'triangle-exclamation'
};

const solidName = (name) => (solid[name] ? name : aliases[name]);

export const notes = {
  tip: 'lightbulb',
  info: 'circle-exclamation',
  important: 'circle-exclamation',
  warning: 'triangle-exclamation',
  danger: 'triangle-exclamation'
};

export function noteIcon(type) {
  return `<span class="ss-note-icon" aria-hidden="true">${icon(notes[type] ?? notes.info, { set: 'solid' })}</span>`;
}

export function has(name, set = 'line') {
  return set === 'solid' ? Boolean(solidName(name)) : Boolean(line[name]);
}

export function icon(name, { set = 'line', size = '1em', label = '', className = '' } = {}) {
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"';
  const cls = `ss-icon ${set}${className ? ` ${className}` : ''}`;
  if (set === 'solid') {
    const found = solid[solidName(name)];
    if (!found) return '';
    return `<svg class="${cls}" viewBox="${found.viewBox}" width="${size}" height="${size}" fill="currentColor" ${a11y} focusable="false">${found.body}</svg>`;
  }
  const body = line[name];
  if (!body) return '';
  return `<svg class="${cls}" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ${a11y} focusable="false">${body}</svg>`;
}
