---
title: When a choice is open, copy stevehoang.com
impact: CRITICAL
impactDescription: one tie-breaker instead of a new opinion each time
tags: source, blog, components, timing
enforced: review
---

## When a choice is open, copy stevehoang.com

The style is the blog's. When the products disagree, or SS needs something no
rule settles, look at how `lotusk08/stevehoang.com` does it (`src/styles/`,
`src/components/`, its CLAUDE.md) and copy that, values and timings included,
unless SS's CLAUDE.md names an app as the origin. Then check it
(`source-check-the-world`): the blog is the first source, not the last word. The apps own: the Desk surface
(write's and IO's ground); IO's space, radius, easing, duration and z-index
scales; write's control sizes and focus ring; why's `.ss-move` and swap turn;
Things' pill, sheen and fade-through.

**Incorrect (a fresh choice where the blog already has one):**

```css
.ss-tip > [role='tooltip'] {
  transition: opacity 150ms ease-out, transform 150ms ease-out;
}
```

**Correct (the blog's tooltip: 0.1s on its out curve, growing from 0.9 at its arrow):**

```css
.ss-tip > [role='tooltip'] {
  transform: translateX(-50%) scale(var(--s, 1));
  transform-origin: 50% 100%;
  transition:
    opacity 0.1s var(--ss-ease-quart),
    transform 0.1s var(--ss-ease-quart),
    visibility 0.1s;
}
```

Read the blog's `src/styles/components/tooltip.scss` before writing it, and name
it in SS's CLAUDE.md.
