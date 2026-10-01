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


export function backToTop(button) {
  const path = button.querySelector('.ring path');
  const pct = button.querySelector('.pct');
  let raf = null;
  let timer = null;
  const update = (count = true) => {
    raf = null;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const fraction = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    if (path) path.style.strokeDashoffset = `${160 * (1 - fraction)}px`;
    if (pct) pct.textContent = String(Math.round(fraction * 100));
    button.classList.toggle('show', window.scrollY > 50);
    if (!count) return;
    button.classList.add('counting');
    clearTimeout(timer);
    timer = setTimeout(() => button.classList.remove('counting'), 500);
  };
  const onScroll = () => {
    raf ??= requestAnimationFrame(() => update());
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: still() ? 'auto' : 'smooth' }));
  update(false);
  return () => window.removeEventListener('scroll', onScroll);
}
