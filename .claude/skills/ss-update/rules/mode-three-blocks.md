---
title: Write each mode three times; no light-dark()
impact: HIGH
impactDescription: dark mode works in every browser SS ships to, with no build
tags: modes, dark, css, compatibility
enforced: review
---

## Write each mode three times; no light-dark()

SS ships plain CSS that products link without a build, so it cannot lower
`light-dark()` (which needs Safari 17.5) the way the blog's Lightning CSS does.
`ss.css` writes every mode three times:

1. light on `:root`;
2. dark under `@media (prefers-color-scheme: dark)` on `:root:not([data-mode='light'])`;
3. dark again on `:root[data-mode='dark']`.

`scripts/build.js` writes all three from the palette, so a new role needs only
its `{ light, dark }` pair.

**Incorrect:**

```css
:root {
  --ss-ui: light-dark(#e6e6e8, #272727);
}
```

**Correct (`src/palette.js`, and the build writes the three blocks):**

```js
ui: b(150, 800),
```

The same holds in a stylesheet in `css/`. Never write a dark value only under
`prefers-color-scheme`; repeat it on `[data-mode='dark']`, or a reader who picked
dark on a light system never sees it.
