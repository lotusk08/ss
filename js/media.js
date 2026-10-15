const still = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scrolling = () => (still() ? 'auto' : 'smooth');

export function develop(root = document, selector = 'img.ss-develop') {
  if (still() || !('IntersectionObserver' in window)) return;
  const sight = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      sight.unobserve(target);
      target.removeAttribute('data-develop');
      target.classList.add('ss-developed');
    }
  });
  for (const img of root.querySelectorAll(selector)) {
    if (img.complete && img.naturalWidth) continue;
    img.setAttribute('data-develop', '');
    const done = (event) => {
      img.removeEventListener('load', done);
      img.removeEventListener('error', done);
      if (event.type === 'error') img.removeAttribute('data-develop');
      else sight.observe(img);
    };
    img.addEventListener('load', done);
    img.addEventListener('error', done);
  }
  return () => sight.disconnect();
}

export function crossfade(el, to) {
  const faces = [...el.children];
  const next = typeof to === 'number' ? faces[to] : to;
  if (!next) return;
  for (const face of faces) {
    face.classList.toggle('on', face === next);
    if (face === next) face.removeAttribute('aria-hidden');
    else face.setAttribute('aria-hidden', 'true');
  }
}

export function gallery(track) {
  const items = () => [...track.children];
  let active = Math.max(0, items().findIndex((item) => item.classList.contains('on')));
  let heading = -1;
  let timer = null;

  const mark = (i) => {
    active = i;
    items().forEach((item, j) => {
      item.classList.toggle('on', j === i);
      const button = item.querySelector('button');
      if (j === i) button?.setAttribute('aria-current', 'true');
      else button?.removeAttribute('aria-current');
    });
  };

  const centre = (item, behavior) =>
    track.scrollTo({ left: item.offsetLeft + item.offsetWidth / 2 - track.clientWidth / 2, behavior });

  const pick = () => {
    const middle = track.scrollLeft + track.clientWidth / 2;
    const gaps = items().map((item) => Math.abs(item.offsetLeft + item.offsetWidth / 2 - middle));
    const i = gaps.indexOf(Math.min(...gaps));
    if (heading >= 0 && i !== heading) return;
    heading = -1;
    if (i !== active) mark(i);
  };

  const onScroll = () => {
    clearTimeout(timer);
    timer = setTimeout(pick, 70);
  };
  const steer = () => (heading = -1);
  const onClick = (event) => {
    const item = items().find((one) => one.contains(event.target));
    if (!item) return;
    const i = items().indexOf(item);
    if (i === active) return;
    heading = i;
    mark(i);
    centre(item, scrolling());
  };
  const onFocus = (event) => {
    const item = items().find((one) => one.contains(event.target));
    if (item && event.target.matches(':focus-visible')) requestAnimationFrame(() => centre(item, scrolling()));
  };
  const settle = () => items()[active] && centre(items()[active], 'instant');

  mark(active);
  requestAnimationFrame(settle);
  const observer = new ResizeObserver(settle);
  observer.observe(track);
  track.addEventListener('scroll', onScroll, { passive: true });
  track.addEventListener('pointerdown', steer);
  track.addEventListener('wheel', steer, { passive: true });
  track.addEventListener('click', onClick);
  track.addEventListener('focusin', onFocus);
  return () => {
    clearTimeout(timer);
    observer.disconnect();
    track.removeEventListener('scroll', onScroll);
    track.removeEventListener('pointerdown', steer);
    track.removeEventListener('wheel', steer);
    track.removeEventListener('click', onClick);
    track.removeEventListener('focusin', onFocus);
  };
}

export function zoom(figure, { margin = 48 } = {}) {
  const button = figure.querySelector(':scope > button');
  if (!button) return;
  let open = false;
  figure.dataset.state = 'closed';
  button.setAttribute('aria-expanded', 'false');

  const shut = () => {
    if (!open) return;
    open = false;
    figure.dataset.state = 'closed';
    button.setAttribute('aria-expanded', 'false');
    button.style.transform = '';
    button.style.marginBottom = '';
  };

  const grow = () => {
    const box = button.getBoundingClientRect();
    const width = document.documentElement.clientWidth;
    const height = window.innerHeight;
    const by = Math.min((width - margin * 2) / box.width, (height - margin * 2) / box.height);
    if (by <= 1) return;
    open = true;
    figure.dataset.state = 'open';
    button.setAttribute('aria-expanded', 'true');
    const shift = width / 2 - (box.left + box.width / 2);
    button.style.transform = `translateX(${shift}px) scale(${by})`;
    button.style.marginBottom = `${box.height * (by - 1)}px`;
    window.scrollTo({ top: box.top + window.scrollY - margin, behavior: scrolling() });
  };

  const onClick = () => (open ? shut() : grow());
  const onKey = (event) => {
    if (event.key === 'Escape') shut();
  };
  button.addEventListener('click', onClick);
  document.addEventListener('keydown', onKey);
  window.addEventListener('resize', shut, { passive: true });
  return () => {
    shut();
    button.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onKey);
    window.removeEventListener('resize', shut);
  };
}

export function playInView(video, { threshold = 0.5 } = {}) {
  const figure = video.closest('.ss-video');
  const toggle = figure?.querySelector('.ss-video-toggle');
  let seen = false;
  let held = still();

  const sync = () => {
    if (seen && !held && !document.hidden) video.play().catch(() => {});
    else video.pause();
  };
  const show = () => {
    const playing = !video.paused;
    if (figure) figure.dataset.state = playing ? 'playing' : 'paused';
    toggle?.setAttribute('aria-label', playing ? 'Pause' : 'Play');
  };
  const onToggle = () => {
    held = !video.paused;
    if (held) video.pause();
    else video.play().catch(() => {});
  };
  const observer = new IntersectionObserver(
    ([entry]) => {
      seen = entry.isIntersecting;
      sync();
    },
    { threshold }
  );

  show();
  observer.observe(video);
  video.addEventListener('play', show);
  video.addEventListener('pause', show);
  toggle?.addEventListener('click', onToggle);
  document.addEventListener('visibilitychange', sync);
  return () => {
    observer.disconnect();
    video.removeEventListener('play', show);
    video.removeEventListener('pause', show);
    toggle?.removeEventListener('click', onToggle);
    document.removeEventListener('visibilitychange', sync);
  };
}
