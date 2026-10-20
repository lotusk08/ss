---
title: The reader's mode choice is kept, dropped and painted one way
impact: HIGH
impactDescription: the right light from the first frame, and no stale choice
tags: modes, localStorage, head, theme-color
enforced: review
---

## The reader's mode choice is kept, dropped and painted one way

`js/mode.js` owns the choice:

- It is `data-mode` on `<html>`, kept in `localStorage` under `mode`.
- A choice equal to the system's is dropped (`setMode` stores `null`).
- A change of the system's mode clears it (`initMode` listens and calls
  `setMode(null)`).
- `js/head.html` repeats the read as one inline script, so a saved mode paints
  before the first frame. Its key and attribute must stay `mode` and
  `data-mode`, as `MODE_KEY` and `MODE_ATTR` say.

Products that use SS rely on this behaviour, so changing it is an owner's
decision recorded in CLAUDE.md, README and MAPPING.md.

**Incorrect (renamed in the module, not in the head):**

```js
// js/mode.js
export const MODE_KEY = 'ss-mode';
```

The head script still reads `mode`, so a saved choice paints the wrong light
first and then jumps.

**Correct (one name, in both places):**

```js
// js/mode.js
export const MODE_KEY = 'mode';
```

```html
<!-- js/head.html -->
<script>try{var m=localStorage.getItem('mode');if(m==='light'||m==='dark')document.documentElement.setAttribute('data-mode',m)}catch(e){}</script>
```

The blog no longer stores a choice (it follows the system only). See
`source-follow-the-product` for how this rule's origin should be written.
