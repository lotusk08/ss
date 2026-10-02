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
