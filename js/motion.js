const still = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const format = (value, decimals) =>
  value.toLocaleString('en', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export function countUp(el, { to, duration = 1500 } = {}) {
  const target = to ?? Number(el.dataset.count ?? el.textContent.replace(/[^\d.-]/g, ''));
  const decimals = (String(target).split('.')[1] ?? '').length;
  if (still() || !Number.isFinite(target)) {
    el.textContent = format(target, decimals);
    return;
  }
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    el.textContent = format(target * (1 - (1 - t) ** 4), decimals);
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function countWhenSeen(root = document, selector = '[data-count]') {
  const els = root.querySelectorAll(selector);
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        countUp(entry.target);
      }
    },
    { threshold: 0.6 }
  );
  els.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}


const roll = (el, value) => {
  const digits = String(value).split('').reverse();
  while (el.children.length < digits.length) {
    const place = document.createElement('span');
    const strip = document.createElement('span');
    for (let d = 0; d < 10; d++) strip.append(Object.assign(document.createElement('span'), { textContent: String(d) }));
    place.append(strip);
    el.prepend(place);
  }
  while (el.children.length > digits.length) el.firstElementChild.remove();
  [...el.children].reverse().forEach((place, i) => place.firstElementChild.style.setProperty('--d', digits[i]));
};

export function backToTop(button, { after = '.ss-topbar' } = {}) {
  const path = button.querySelector('.ring path');
  const pct = button.querySelector('.pct');
  let max = 0;
  let top = 0;
  let tick = null;
  let fade = null;
  if (pct) pct.textContent = '';
  const measure = () => {
    max = document.documentElement.scrollHeight - window.innerHeight;
    top = document.querySelector(after)?.offsetHeight ?? 0;
  };
  const update = (moving) => {
    tick = null;
    const y = window.scrollY;
    const value = max > 0 ? Math.round(Math.min(Math.max(y / max, 0), 1) * 100) : 0;
    if (path) path.style.strokeDashoffset = `${160 * (1 - value / 100)}px`;
    if (pct) roll(pct, value);
    button.classList.toggle('show', y > top);
    if (!moving) return;
    button.classList.add('counting');
    clearTimeout(fade);
    fade = setTimeout(() => button.classList.remove('counting'), 500);
  };
  const onScroll = () => {
    tick ??= setTimeout(update, 100, true);
  };
  const onResize = () => {
    measure();
    update(false);
  };
  const observer = new ResizeObserver(onResize);
  observer.observe(document.body);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: still() ? 'auto' : 'smooth' }));
  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    observer.disconnect();
    clearTimeout(tick);
    clearTimeout(fade);
  };
}

const settle = (el) => {
  const style = getComputedStyle(el);
  const times = (value) => value.split(',').map((part) => parseFloat(part) * 1000);
  const delays = times(style.transitionDelay);
  return Math.max(0, ...times(style.transitionDuration).map((time, i) => time + delays[i % delays.length]));
};

export function enter(el) {
  el.classList.remove('show');
  el.style.transition = 'none';
  void getComputedStyle(el).opacity;
  el.style.transition = '';
  el.classList.add('show');
}

export function leave(el, { remove = false } = {}) {
  el.classList.remove('show');
  return new Promise((resolve) => {
    let timer = null;
    const done = () => {
      clearTimeout(timer);
      el.removeEventListener('transitionend', end);
      if (remove) el.remove();
      resolve();
    };
    const end = (event) => {
      if (event.target === el && event.propertyName === 'opacity') done();
    };
    el.addEventListener('transitionend', end);
    timer = setTimeout(done, settle(el) + 50);
  });
}
