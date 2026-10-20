---
title: Text painted by its box gets room for every glyph
impact: MEDIUM
impactDescription: descenders, stacked Vietnamese marks and italic overhang are drawn whole
tags: type, gradient-title, clip, vietnamese
enforced: review
---

## Text painted by its box gets room for every glyph

`background-clip: text` paints only inside the box. At a 1.05 leading:
- Domaine's descenders reach 0.065em below the box;
- stacked Vietnamese marks (`Ẩ`, `Ỷ`) reach 0.2em above it;
- the italic runs past its sides where the box is as wide as the text.

The `p` and `y` of the title were cut, and so was the social card's last `e`.
Give the box room and pull it back by as much, so the layout does not move.

A mask clips with `clip-path: inset()` and negative insets, never
`overflow: hidden`, which cut Newsreader's italic overhang.

**Incorrect:**

```css
.ss-gradient-title {
  background: var(--ss-title-gradient);
  background-clip: text;
  color: transparent;
}

.ss-mask {
  overflow: hidden;
}
```

**Correct (as `css/base.css` and `css/motion.css` write them):**

```css
.ss-gradient-title {
  padding: 0.25em 0.1em 0.15em;
  margin: -0.25em -0.1em -0.15em;
  background: var(--ss-title-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: unset;
  -webkit-text-fill-color: transparent;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}

.ss-mask {
  clip-path: inset(-0.1em -1em -0.3em -1em);
}
```

Check a title containing `Ẩ`, `Ỷ`, `p` and `y`, in Domaine and in its Newsreader
fallback.
