---
title: Paper blocks come after the mode blocks, in the same three shapes
impact: HIGH
impactDescription: Paper wins over Desk at equal mode, and dark Paper wins over both
tags: modes, surfaces, paper, cascade
enforced: review
---

## Paper blocks come after the mode blocks, in the same three shapes

A surface is `:root[data-surface='paper']`, written after the mode blocks and in
the same three shapes: plain; `:not([data-mode='light'])` under
`prefers-color-scheme: dark`; and with `[data-mode='dark']`. Order and
specificity are what make Paper win over Desk in the same light, and dark Paper
win over both.

**Incorrect (one Paper block, before the modes):**

```css
:root[data-surface='paper'] { --ss-bg: #ffffff; }
:root { --ss-bg: #f7f7f8; }
@media (prefers-color-scheme: dark) { :root:not([data-mode='light']) { --ss-bg: #0d0d0d; } }
```

On a dark system the Paper page turns Desk's near-black, not the blog's black.

**Correct (as `dist/ss.css` writes it):**

```css
:root[data-surface='paper'] { --ss-bg: #ffffff; }
@media (prefers-color-scheme: dark) {
  :root[data-surface='paper']:not([data-mode='light']) { --ss-bg: #000000; }
}
:root[data-surface='paper'][data-mode='dark'] { --ss-bg: #000000; }
```

Add Paper's own values to `paper` in `src/palette.js`; the build places them.
