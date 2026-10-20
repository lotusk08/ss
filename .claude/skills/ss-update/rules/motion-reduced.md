---
title: Under reduced motion only fades are left
impact: HIGH
impactDescription: motion stops when a reader asks, in every piece
tags: motion, accessibility, reduced-motion, art, media
enforced: review
---

## Under reduced motion only fades are left

Under `prefers-reduced-motion: reduce`, nothing travels, grows or turns. Only
opacity and colour change; the gallery keeps its filter. The art draws one still
frame, a video never starts by itself, and the sheen does not run. The build also
shortens `--ss-dur-small`, `-medium`, `-large` and `-hero` to 150ms there.

SS reaches this in two ways, and a new piece may use either:

- **Opt in:** the movement sits inside `@media (prefers-reduced-motion:
  no-preference)`.
- **Narrow:** under `reduce`, the movement is taken back out, as `.ss-move` drops
  `translate` and `scale` from its transition. `.ss-video-toggle`, `.ss-swap` and
  `.ss-toast` do the same.

**Incorrect (a piece that slides for everyone):**

```css
.ss-move {
  transition-property: opacity, visibility, translate, scale;
}
```

**Correct (as `css/motion.css` does for `.ss-move`):**

```css
@media (prefers-reduced-motion: reduce) {
  .ss-move,
  .ss-move:is(.wide, .tall) {
    transition-property: opacity, visibility;
  }
}
```

In a script, read `matchMedia('(prefers-reduced-motion: reduce)')` before
starting a loop, and draw a single frame instead.
