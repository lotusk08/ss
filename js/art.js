const still = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDark = () => {
  const mode = document.documentElement.getAttribute('data-mode');
  return mode ? mode === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
};

function plum(canvas) {
  const r180 = Math.PI;
  const r90 = Math.PI / 2;
  const r15 = Math.PI / 12;
  const { random } = Math;
  const size = { width: 0, height: 0 };
  let ctx = null;
  let steps = [];
  let frame = null;
  let last = 0;

  const fit = () => {
    const { clientWidth: w, clientHeight: h } = canvas.parentElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    size.width = w;
    size.height = h;
    canvas.width = dpr * w;
    canvas.height = dpr * h;
    ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#88888825';
  };

  const step = (x, y, rad, counter = { value: 0 }) => {
    const length = random() * 6;
    counter.value += 1;
    const nx = x + length * Math.cos(rad);
    const ny = y + length * Math.sin(rad);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(nx, ny);
    ctx.stroke();
    if (nx < -100 || nx > size.width + 100 || ny < -100 || ny > size.height + 100) return;
    const rate = counter.value <= 30 ? 0.8 : 0.5;
    const rad1 = rad + random() * r15;
    const rad2 = rad - random() * r15;
    if (random() < rate) steps.push(() => step(nx, ny, rad1, counter));
    if (random() < rate) steps.push(() => step(nx, ny, rad2, counter));
  };

  const tick = (time) => {
    frame = requestAnimationFrame(tick);
    if (time - last < 1000 / 40) return;
    last = time;
    const prev = steps;
    steps = [];
    if (!prev.length) return stop();
    prev.forEach((fn) => (random() < 0.5 ? steps.push(fn) : fn()));
  };

  const stop = () => {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
  };

  const middle = () => random() * 0.6 + 0.2;

  const start = () => {
    stop();
    fit();
    ctx.clearRect(0, 0, size.width, size.height);
    steps = [
      () => step(middle() * size.width, -5, r90),
      () => step(middle() * size.width, size.height + 5, -r90),
      () => step(-5, middle() * size.height, 0),
      () => step(size.width + 5, middle() * size.height, r180)
    ];
    if (size.width < 500) steps = steps.slice(0, 2);
    if (still()) {
      while (steps.length) {
        const prev = steps;
        steps = [];
        prev.forEach((fn) => fn());
      }
      return;
    }
    frame = requestAnimationFrame(tick);
  };

  start();
  return { stop, restart: start, theme() {} };
}

function fluid(canvas) {
  const SIZE = 4096;
  const MASK = SIZE - 1;
  const SCALE = SIZE / (Math.PI * 2);
  const COS = new Float32Array(SIZE);
  for (let i = 0; i < SIZE; i++) COS[i] = Math.cos((i / SIZE) * Math.PI * 2);
  const cos = (x) => COS[((x * SCALE) | 0) & MASK];
  const { random } = Math;
  const between = (lo, hi) => lo + random() * (hi - lo);

  const octaves = 4 + Math.floor(random() * 4);
  const recipe = {
    speed: between(0.05, 0.14),
    amplitude: between(0.35, 0.7),
    freqX: between(1.5, 4),
    freqY: between(1.5, 4),
    phaseX: Array.from({ length: octaves + 1 }, () => random() * Math.PI * 2),
    phaseY: Array.from({ length: octaves + 1 }, () => random() * Math.PI * 2),
    band: between(0.55, 0.9),
    driftX: random() < 0.5 ? 1 : -1,
    driftY: random() < 0.5 ? 1 : -1,
    timeDir: random() < 0.5 ? 1 : -1,
    offset: random() * 1000
  };

  let ctx = null;
  let image = null;
  let w = 0;
  let h = 0;
  let alpha = isDark() ? 0.22 : 0.1;
  let parity = 0;
  let frame = null;
  let last = 0;
  let inView = true;

  const fit = () => {
    const { clientWidth: width, clientHeight: height } = canvas.parentElement;
    w = width >= height ? 224 : 168;
    h = Math.max(2, Math.round((w * height) / Math.max(1, width)));
    canvas.width = w;
    canvas.height = h;
    ctx = canvas.getContext('2d');
    image = ctx.createImageData(w, h);
    for (let i = 0; i < image.data.length; i += 4) image.data[i] = image.data[i + 1] = image.data[i + 2] = 126;
  };

  const render = (time, full = false) => {
    const { amplitude, freqX, freqY, phaseX, phaseY, band, driftX, driftY, timeDir } = recipe;
    const data = image.data;
    const scale = 2 / Math.min(w, h);
    const peak = alpha * 255;
    const t = time * timeDir;
    const rowStep = full ? 1 : 2;
    for (let py = full ? 0 : parity; py < h; py += rowStep) {
      const y0 = ((2 * py - h) / 2) * scale;
      let k = py * w * 4 + 3;
      for (let px = 0; px < w; px++) {
        let ux = ((2 * px - w) / 2) * scale;
        let uy = y0;
        for (let i = 1; i <= octaves; i++) {
          const a = amplitude / i;
          ux += a * cos(i * freqX * uy + t + phaseX[i]);
          uy += a * cos(i * freqY * ux + t + phaseY[i]);
        }
        let d = Math.abs(cos(t + driftX * ux + driftY * uy - Math.PI / 2)) / band;
        d = d > 1 ? 1 : d;
        data[k] = (peak * (1 - d * d * (3 - 2 * d))) | 0;
        k += 4;
      }
    }
    parity ^= 1;
    ctx.putImageData(image, 0, 0);
  };

  const now = () => recipe.offset + performance.now() * 0.001 * recipe.speed;

  const tick = (time) => {
    frame = requestAnimationFrame(tick);
    if (time - last < 1000 / 30) return;
    last = time;
    render(recipe.offset + time * 0.001 * recipe.speed);
  };

  const stop = () => {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
  };

  const resume = () => {
    if (frame !== null || still() || document.hidden || !inView) return;
    last = 0;
    frame = requestAnimationFrame(tick);
  };

  const viewer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView) resume();
    else stop();
  });
  viewer.observe(canvas);
  const visibility = () => (document.hidden ? stop() : resume());
  document.addEventListener('visibilitychange', visibility);

  const start = () => {
    stop();
    fit();
    render(now(), true);
    requestAnimationFrame(() => (canvas.style.opacity = '1'));
    resume();
  };

  start();
  return {
    stop() {
      stop();
      viewer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
    },
    restart() {
      fit();
      render(now(), true);
    },
    theme() {
      alpha = isDark() ? 0.22 : 0.1;
      if (ctx) render(now(), true);
    }
  };
}

const kinds = { plum, fluid };

export function startArt(host, kind) {
  const forced = new URLSearchParams(location.search).get('art');
  const chosen = kinds[kind] ? kind : kinds[forced] ? forced : Math.random() < 0.5 ? 'plum' : 'fluid';
  host.replaceChildren();
  host.setAttribute('data-art', chosen);
  document.documentElement.setAttribute('data-art', chosen);
  const canvas = document.createElement('canvas');
  host.append(canvas);
  const art = kinds[chosen](canvas);
  let timer = null;
  const resizer = new ResizeObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(() => art.restart(), 150);
  });
  resizer.observe(host);
  const themer = new MutationObserver(() => art.theme());
  themer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mode'] });
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const onMedia = () => art.theme();
  media.addEventListener('change', onMedia);
  return {
    kind: chosen,
    stop() {
      art.stop();
      resizer.disconnect();
      themer.disconnect();
      media.removeEventListener('change', onMedia);
      clearTimeout(timer);
    }
  };
}
