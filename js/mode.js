export const MODE_KEY = 'mode';
export const MODE_ATTR = 'data-mode';
export const SWITCH_ATTR = 'data-switching';
export const THEME_COLOR = { light: '#f7f7f8', dark: '#0d0d0d' };

const isMode = (value) => value === 'light' || value === 'dark';
const media = () => window.matchMedia('(prefers-color-scheme: dark)');
const listeners = new Set();

const store = {
  get() {
    try {
      const value = localStorage.getItem(MODE_KEY);
      return isMode(value) ? value : null;
    } catch {
      return null;
    }
  },
  set(value) {
    try {
      if (value === null) localStorage.removeItem(MODE_KEY);
      else localStorage.setItem(MODE_KEY, value);
    } catch {
      return;
    }
  }
};

export function systemMode() {
  return media().matches ? 'dark' : 'light';
}

export function pinnedMode() {
  const value = document.documentElement.getAttribute(MODE_ATTR);
  return isMode(value) ? value : null;
}

export function currentMode() {
  return pinnedMode() ?? systemMode();
}

function paint() {
  const mode = currentMode();
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => meta.remove());
  const meta = document.createElement('meta');
  meta.name = 'theme-color';
  meta.content = getComputedStyle(document.documentElement).getPropertyValue('--ss-bg').trim() || THEME_COLOR[mode];
  document.head.append(meta);
  for (const listener of listeners) listener(mode);
}

export function setMode(mode) {
  const root = document.documentElement;
  const next = isMode(mode) && mode !== systemMode() ? mode : null;
  root.setAttribute(SWITCH_ATTR, '');
  if (next === null) root.removeAttribute(MODE_ATTR);
  else root.setAttribute(MODE_ATTR, next);
  store.set(next);
  paint();
  requestAnimationFrame(() => requestAnimationFrame(() => root.removeAttribute(SWITCH_ATTR)));
  return currentMode();
}

export function toggleMode() {
  return setMode(currentMode() === 'dark' ? 'light' : 'dark');
}

export function onMode(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function initMode() {
  setMode(store.get());
  media().addEventListener('change', () => setMode(null));
  return currentMode();
}
