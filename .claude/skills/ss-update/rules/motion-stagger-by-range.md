---
title: On a scroll timeline, stagger with animation-range, not delay
impact: MEDIUM
impactDescription: a stagger that silently does nothing is avoided
tags: motion, stagger, scroll-timeline
enforced: review
---

## On a scroll timeline, stagger with animation-range, not delay

A scroll timeline ignores `animation-delay`, so a staggered scroll reveal written
with delays plays every child at once. `.ss-stagger` shifts each child's
`animation-range` by its index `--i` instead. Delays are right only for
time-based animations (`.ss-enter`, `.ss-mask`, the page switch).

**Incorrect:**

```css
.ss-stagger > * {
  animation: ss-reveal linear both;
  animation-timeline: view();
  animation-delay: calc(var(--i, 0) * 60ms);
}
```

**Correct (as `css/motion.css` does):**

```css
.ss-stagger > * {
  animation: ss-reveal linear both;
  animation-timeline: view();
  animation-range: entry calc(var(--i, 0) * 4%) entry calc(45% + var(--i, 0) * 4%);
}
```
