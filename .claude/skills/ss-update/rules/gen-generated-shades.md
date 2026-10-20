---
title: Shades are generated, never picked
impact: MEDIUM
impactDescription: every accent's ten steps stay one family, pinned to the real colours
tags: generation, shades, oklch, scale
enforced: review
---

## Shades are generated, never picked

`src/scale.js` draws ten OKLCH steps per accent, from lightness 0.97 down to
0.28, with chroma eased at both ends and the day colour's hue. It then pins the
day and night colours to their nearest steps. The accents are the real values;
the shades follow from them. To change a shade, change the accent (from a
product) or the generator, never one step.

**Incorrect:**

```js
// src/palette.js
'blue-300': '#8ab4ff',
```

**Correct:**

```js
// src/palette.js
blue: { light: '#0d6efd', dark: '#58a6ff' },
```

Then `npm run build` regenerates `--ss-blue-100` … `--ss-blue-1000` everywhere.
