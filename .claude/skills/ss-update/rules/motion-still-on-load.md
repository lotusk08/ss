---
title: Nothing moves on the first paint that was not asked to
impact: MEDIUM
impactDescription: a page loads still; motion means something changed
tags: motion, load, swap, pill, slide
enforced: review
---

## Nothing moves on the first paint that was not asked to

Motion says what happened. On load, nothing has happened yet:

- The swap's first face carries `on` in the markup, so nothing turns on load.
- `pill()` places the segment's highlight first and moves it only once placed,
  so it never slides in.
- `.ss-slide` runs only once `ss-navigated` is on `<html>`, after a client-side
  route change, so the first paint never waits on it.

The only load motions are the reveals a page asks for (`.ss-enter`, `.ss-mask`).

**Incorrect (the face chosen by script after load):**

```html
<button class="ss-swap" data-name="Language" data-value="vi">
  <span data-state="vi" data-label="Tiếng Việt">vi</span>
  <span data-state="en" data-label="English">en</span>
</button>
```

The script then adds `on` to `vi`, and the button turns on its own.

**Correct:**

```html
<button class="ss-swap" type="button" data-name="Language" data-value="vi">
  <span class="on" data-state="vi" data-label="Tiếng Việt">vi</span>
  <span data-state="en" data-label="English">en</span>
</button>
```
