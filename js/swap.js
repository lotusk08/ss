export function swap(button, { onChange } = {}) {
  const faces = [...button.querySelectorAll('[data-state]')];
  const name = button.dataset.name ?? '';
  const set = (state, notify = true) => {
    const face = faces.find((f) => f.dataset.state === state) ?? faces[0];
    for (const f of faces) f.classList.toggle('on', f === face);
    button.dataset.value = face.dataset.state;
    const label = face.dataset.label ?? face.dataset.state;
    button.setAttribute('aria-label', name ? `${name}: ${label}` : label);
    button.title = label;
    if (notify) onChange?.(face.dataset.state);
  };
  button.addEventListener('click', () => {
    const at = faces.findIndex((f) => f.dataset.state === button.dataset.value);
    set(faces[(at + 1) % faces.length].dataset.state);
  });
  set(button.dataset.value ?? faces[0].dataset.state, false);
  return { set, get: () => button.dataset.value };
}

export function dynamic(button, features) {
  button.replaceChildren(
    ...features.map((feature) => {
      const face = document.createElement('span');
      face.dataset.state = feature.id;
      face.innerHTML = feature.icon;
      return face;
    })
  );
  let current = null;
  let raf = null;
  const update = () => {
    raf = null;
    const feature = features.find((f) => !f.when || f.when()) ?? features[features.length - 1];
    if (feature === current) return;
    current = feature;
    for (const face of button.children) face.classList.toggle('on', face.dataset.state === feature.id);
    button.dataset.value = feature.id;
    button.setAttribute('aria-label', feature.label);
    button.title = feature.label;
    button.classList.toggle('status', !feature.run);
  };
  const soon = () => {
    raf ??= requestAnimationFrame(update);
  };
  document.addEventListener('selectionchange', soon);
  for (const type of ['scroll', 'resize', 'online', 'offline']) window.addEventListener(type, soon, { passive: true });
  button.addEventListener('mousedown', (event) => event.preventDefault());
  button.addEventListener('click', () => {
    current?.run?.();
    soon();
  });
  update();
  return { update: soon, get: () => current?.id };
}
