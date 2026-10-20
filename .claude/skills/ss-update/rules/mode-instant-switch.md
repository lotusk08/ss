---
title: A mode switch moves no transition
impact: HIGH
impactDescription: the whole page changes light in one frame
tags: modes, transitions, data-switching
enforced: review
---

## A mode switch moves no transition

`setMode()` sets `data-switching` on `<html>` for two frames. `css/base.css`
turns every transition off under it: `transition: none !important` on
`:root[data-switching] :not(path)` and on its `::before` and `::after`. Without
that, each hover transition trails the page's colour and the switch reads as a
smear.

The one exception is `path`, for the mode button's disc, whose clip slides on
purpose. That exception covers every other `path` too, so an icon path given a
colour transition trails the switch. The blog has no mode button any more, and
its switch rule has no path exception.

**Incorrect (a path transition that escapes the switch):**

```css
.ss-icon path {
  transition: fill var(--ss-dur-hover) var(--ss-ease-hover);
}
```

**Correct (transition the element; the path takes `currentcolor`):**

```css
.ss-icon {
  transition: color var(--ss-dur-hover) var(--ss-ease-hover);
}
```

Never ease the page's own colours between modes (`:root { transition:
background-color … }`). An `!important` transition at least as specific as
`:root[data-switching] :not(path)` can beat the switch rule, so don't write one.
