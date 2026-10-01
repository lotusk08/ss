export const base = {
  paper: '#ffffff',
  50: '#f7f7f8',
  100: '#f1f1f2',
  150: '#e6e6e8',
  200: '#d5d5d9',
  300: '#a3a3a6',
  400: '#8a8a8e',
  500: '#77777b',
  600: '#5c5c5e',
  700: '#3a3a3a',
  800: '#272727',
  850: '#1f1f1f',
  900: '#171717',
  950: '#0d0d0d',
  black: '#000000'
};

export const accents = {
  blue: { light: '#0d6efd', dark: '#58a6ff' },
  ember: { light: '#c67839', dark: '#fd7e14' },
  sand: { light: '#d4965a', dark: '#d4965a' },
  purple: { light: '#8957e5', dark: '#a882ff' },
  green: { light: '#238636', dark: '#2bcc2b' },
  yellow: { light: '#ef9c03', dark: '#ffa500' },
  red: { light: '#da3633', dark: '#e5484d' }
};

const b = (light, dark) => ({ light: base[light], dark: base[dark] });

export const roles = {
  bg: b(50, 950),
  'bg-2': b('paper', 900),
  ui: b(150, 800),
  'ui-2': b(200, 700),
  'ui-3': b(100, 850),
  'tx-3': b(400, 500),
  'tx-2': b(600, 300),
  tx: b(950, 100),
  accent: { light: accents.blue.light, dark: accents.ember.dark },
  'accent-2': { light: '#0056b2', dark: accents.ember.light },
  'on-accent': { light: base.paper, dark: base[950] },
  selection: { light: 'rgb(212 150 90 / 16%)', dark: 'rgb(212 150 90 / 26%)' },
  scrim: { light: 'rgb(13 13 13 / 24%)', dark: 'rgb(0 0 0 / 55%)' },
  ring: { light: 'rgb(13 110 253 / 16%)', dark: 'rgb(253 126 20 / 22%)' },
  tooltip: { light: 'rgb(16 16 16 / 95%)', dark: 'rgb(16 16 16 / 95%)' },
  'on-tooltip': { light: base.paper, dark: base.paper },
  tip: { light: '#238636', dark: '#238636' },
  'tip-bg': { light: 'rgb(123 247 144 / 10%)', dark: 'rgb(22 60 36 / 30%)' },
  'tip-icon': { light: '#03b303', dark: 'rgb(15 164 15 / 95%)' },
  info: { light: '#1f6feb', dark: '#1f6feb' },
  'info-bg': { light: 'rgb(225 245 254 / 30%)', dark: 'rgb(7 59 104 / 35%)' },
  'info-icon': { light: '#0070cb', dark: '#0075d1' },
  important: { light: '#8957e5', dark: '#8957e5' },
  'important-bg': { light: 'rgb(233 231 255 / 30%)', dark: 'rgb(233 231 255 / 20%)' },
  'important-icon': { light: '#8957e5', dark: '#8957e5' },
  warning: { light: '#ef9c03', dark: '#ffa500' },
  'warning-bg': { light: 'rgb(255 243 205 / 30%)', dark: 'rgb(90 69 3 / 30%)' },
  'warning-icon': { light: '#ffa500', dark: 'rgb(255 165 0 / 80%)' },
  danger: { light: '#da3633', dark: '#da3633' },
  'danger-bg': { light: 'rgb(248 215 218 / 30%)', dark: 'rgb(86 28 8 / 35%)' },
  'danger-icon': { light: '#df3c30', dark: '#cd0202' },
  'note-text': b(600, 300),
  'outline-fill': { light: 'rgb(234 227 220 / 39%)', dark: 'rgb(255 255 255 / 29%)' },
  'outline-stroke': { light: '#757575', dark: '#cccccc' },
  stripe: { light: 'rgb(213 205 192 / 10%)', dark: 'rgb(213 205 192 / 10%)' },
  'code-bg': { light: 'rgb(25 25 28 / 5%)', dark: 'rgb(255 255 255 / 5%)' },
  icon: b(400, 500),
  'kbd-line': b(200, 700),
  'btn-line': b(100, 850),
  'title-gradient': {
    light: 'linear-gradient(to bottom right, #0d0d0d 30%, rgb(13 13 13 / 30%))',
    dark: 'linear-gradient(to bottom right, #f1f1f2 30%, rgb(241 241 242 / 30%))'
  },
  'syntax-text': { light: '#5c6773', dark: '#e6e1cf' },
  'syntax-comment': { light: '#828c99', dark: '#5c6773' },
  'syntax-keyword': { light: '#ff7733', dark: '#ff7733' },
  'syntax-operator': { light: '#ff7733', dark: '#e6e1cf' },
  'syntax-function': { light: '#f29718', dark: '#f29718' },
  'syntax-string': { light: '#86b300', dark: '#b8cc52' },
  'syntax-number': { light: '#36a3d9', dark: '#b8cc52' },
  'syntax-constant': { light: '#36a3d9', dark: '#e6b450' },
  'syntax-type': { light: '#e6b450', dark: '#e6b450' },
  'syntax-variable': { light: '#36a3d9', dark: '#36a3d9' },
  'syntax-attribute': { light: '#86b300', dark: '#36a3d9' },
  'syntax-tag': { light: '#86b300', dark: '#e6b450' },
  'syntax-decorator': { light: '#a37acc', dark: '#a37acc' },
  'syntax-escape': { light: '#f07178', dark: '#f07178' },
  'syntax-regex': { light: '#86b300', dark: '#95e6cb' },
  'syntax-inserted': { light: '#86b300', dark: '#b8cc52' },
  'syntax-deleted': { light: '#f51818', dark: '#ff3333' },
  'syntax-heading': { light: '#36a3d9', dark: '#36a3d9' },
  'shadow-card': {
    light: '0 1px 2px rgb(13 13 13 / 4%), 0 1px 3px rgb(13 13 13 / 4%)',
    dark: '0 1px 2px rgb(0 0 0 / 40%)'
  },
  'shadow-pop': {
    light: '0 4px 12px rgb(13 13 13 / 8%), 0 12px 32px rgb(13 13 13 / 10%)',
    dark: '0 8px 24px rgb(0 0 0 / 45%), 0 2px 6px rgb(0 0 0 / 35%)'
  }
};

export const paper = {
  bg: { light: base.paper, dark: base.black },
  'bg-2': { light: base.paper, dark: '#242424' },
  ui: { light: '#f3f3f3', dark: '#2c2d2d' },
  'ui-2': { light: '#dee2e6', dark: '#3c3c3c' },
  'ui-3': { light: 'rgb(223 233 241 / 64%)', dark: '#262626' },
  'tx-3': { light: '#757575', dark: '#868686' },
  'tx-2': { light: '#6f6f6f', dark: '#cecdcd' },
  tx: { light: '#4f4f4f', dark: '#d7d5d3' },
  'note-text': { light: 'rgb(46 46 46 / 77%)', dark: 'rgb(216 212 212 / 75%)' },
  icon: { light: '#8e8e8e', dark: '#787878' },
  'kbd-line': { light: 'rgb(189 189 189)', dark: '#6a6a6a' },
  'btn-line': { light: '#efefef', dark: '#292929' },
  'title-gradient': {
    light: 'linear-gradient(to bottom right, #4f4f4f 30%, #4f4f4f4c)',
    dark: 'linear-gradient(to bottom right, #d7d5d3 30%, #d7d5d34d)'
  },
  'shadow-card': { light: 'rgb(211 209 209 / 15%) 0 0 0 1px', dark: 'rgb(137 135 135 / 24%) 0 0 0 1px' }
};

export const surfaces = { desk: roles, paper: { ...roles, ...paper } };

export const themeColor = { light: base[50], dark: base[950] };
export const paperThemeColor = { light: base.paper, dark: base.black };

export const type = {
  'font-sans': "-apple-system, BlinkMacSystemFont, 'Inter Display', 'Segoe UI', sans-serif",
  'font-ui': 'ui-sans-serif, system-ui, sans-serif',
  'font-serif': "'Newsreader', 'Iowan Old Style', Georgia, serif",
  'font-mono': "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  'font-title': "'Domaine Display Narrow', 'Newsreader', Georgia, serif",
  'font-figure': "'Helvetica Neue', 'Inter Display', sans-serif",
  'root-size': 'clamp(16px, calc(13.2px + 0.48vw), 18px)',
  'text-2xs': '0.6875rem',
  'text-xs': '0.75rem',
  'text-sm': '0.8125rem',
  'text-md': '0.875rem',
  'text-base': '1rem',
  'text-lg': '1.125rem',
  'text-xl': '1.25rem',
  'text-2xl': '1.5rem',
  'text-3xl': '1.875rem',
  'display-0': 'clamp(3rem, 8vw + 1rem, 10rem)',
  'display-1': 'clamp(2rem, 1.1rem + 2.8vw, 3.5rem)',
  'display-2': 'clamp(1.625rem, 1.15rem + 1.6vw, 2.5rem)',
  'display-3': 'clamp(1.25rem, 1.05rem + 0.8vw, 1.625rem)',
  leading: '1.6',
  'leading-ui': '1.5',
  'leading-tight': '1.25',
  'leading-display': '1.05',
  'leading-hero': '0.92',
  'tracking-hero': '-0.03em',
  'tracking-display': '-0.02em',
  'tracking-body': '-0.011em',
  'tracking-overline': '0.12em',
  measure: '65ch',
  'label-size': '0.6875rem',
  'label-weight': '600',
  'label-case': 'uppercase',
  'label-tracking': '0.08em',
  numerals: 'tabular-nums lining-nums'
};

export const space = {
  'space-1': '4px',
  'space-2': '8px',
  'space-3': '12px',
  'space-4': '16px',
  'space-5': '20px',
  'space-6': '24px',
  'space-8': '32px',
  'space-12': '48px',
  'space-18': '72px',
  'section-s': 'clamp(40px, 5vw, 64px)',
  'section-m': 'clamp(64px, 8vw, 120px)',
  'section-l': 'clamp(96px, 12vw, 200px)',
  gutter: 'clamp(16px, 5vw, 80px)',
  container: '1200px'
};

export const radius = {
  'radius-xs': '2px',
  'radius-sm': '4px',
  'radius-md': '6px',
  'radius-lg': '8px',
  'radius-xl': '10px',
  'radius-2xl': '14px',
  'radius-full': '9999px'
};

export const motion = {
  'ease-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
  'ease-in-out': 'cubic-bezier(0.76, 0, 0.24, 1)',
  'ease-in': 'cubic-bezier(0.55, 0, 1, 0.45)',
  'ease-swap': 'cubic-bezier(0.25, 0.4, 0.75, 0.6)',
  'ease-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  'ease-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
  'dur-micro': '150ms',
  'dur-small': '250ms',
  'dur-medium': '400ms',
  'dur-large': '600ms',
  'dur-hero': '1000ms',
  stagger: '60ms',
  'reveal-shift': '30px',
  'reveal-dur': '700ms'
};

export const size = {
  hairline: '1px',
  'tap-target': '44px',
  'control-h': '32px',
  'field-h': '36px',
  'row-h': '44px',
  'focus-width': '2px',
  'focus-offset': '2px',
  'icon-size': '1em',
  'icon-stroke': '1.6',
  'z-bar': '30',
  'z-popover': '50',
  'z-sheet': '60',
  'z-palette': '70',
  'z-toast': '80'
};

export const breakpoints = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px'
};
