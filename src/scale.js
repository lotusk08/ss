const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGamma = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

export function hexToOklch(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => toLinear(parseInt(hex.slice(i, i + 2), 16) / 255));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { l: L, c: Math.hypot(A, B), h: (Math.atan2(B, A) * 180) / Math.PI };
}

const oklchToRgb = (L, C, H) => {
  const a = C * Math.cos((H * Math.PI) / 180);
  const b = C * Math.sin((H * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
  ];
};

export function oklchToHex(L, C, H) {
  let c = C;
  let rgb = oklchToRgb(L, c, H);
  while (rgb.some((v) => v < -0.0001 || v > 1.0001) && c > 0) {
    c -= 0.002;
    rgb = oklchToRgb(L, c, H);
  }
  return `#${rgb
    .map((v) => Math.round(Math.min(1, Math.max(0, toGamma(Math.min(1, Math.max(0, v))))) * 255).toString(16).padStart(2, '0'))
    .join('')}`;
}

export const STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const LIGHTNESS = [0.97, 0.93, 0.87, 0.8, 0.72, 0.64, 0.56, 0.47, 0.38, 0.28];
const CHROMA = [0.12, 0.25, 0.45, 0.65, 0.85, 1, 1, 0.95, 0.85, 0.7];

export function scale({ light, dark }) {
  const base = hexToOklch(light);
  const peak = Math.max(base.c, hexToOklch(dark).c);
  const steps = Object.fromEntries(STEPS.map((step, i) => [step, oklchToHex(LIGHTNESS[i], peak * CHROMA[i], base.h)]));
  const nearest = (hex) => {
    const { l } = hexToOklch(hex);
    return STEPS.reduce((best, step, i) => (Math.abs(LIGHTNESS[i] - l) < Math.abs(LIGHTNESS[STEPS.indexOf(best)] - l) ? step : best), STEPS[0]);
  };
  const day = nearest(light);
  let night = nearest(dark);
  if (night === day && light !== dark) night = STEPS[Math.max(0, STEPS.indexOf(day) - 1)];
  steps[day] = light;
  steps[night] = dark;
  return { steps, day, night };
}
