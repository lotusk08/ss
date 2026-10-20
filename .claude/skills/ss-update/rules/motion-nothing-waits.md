---
title: Nothing starts hidden waiting for a script but .ss-move
impact: HIGH
impactDescription: content is there on the first paint, with or without JavaScript
tags: motion, reveal, scroll-timeline, progressive-enhancement
enforced: review
---

## Nothing starts hidden waiting for a script but .ss-move

Nothing in `css/motion.css` is hidden until a script shows it, except `.ss-move`.
That is for what comes and goes (menus, sheets, dialogs, toasts) and is never put
on what should be there on load (`motion-move-contract`). Scroll reveals run only
under `@supports (animation-timeline: view())`; elsewhere the element is simply
there.

CLAUDE.md says load animations finish within a second. `.ss-mask` (1000ms plus
its delays) and a long `.ss-enter` (700ms + 80ms + 60ms a child) already run past
that. Don't add another; whether to shorten those two is the owner's call.

**Incorrect (hidden until an observer adds a class):**

```css
.ss-card { opacity: 0; }
.ss-card.seen { opacity: 1; transition: opacity 0.6s; }
```

If the script is late, blocked or fails, the cards never appear.

**Correct (a scroll-driven reveal, where it exists):**

```css
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .ss-reveal {
      animation: ss-reveal linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 45%;
    }
  }
}
```
