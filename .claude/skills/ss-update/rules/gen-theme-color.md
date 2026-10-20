---
title: The theme colour agrees everywhere it is written
impact: HIGH
impactDescription: the browser bar matches the page before and after scripts run
tags: generation, theme-color, mode, surfaces
enforced: npm test (Desk only)
---

## The theme colour agrees everywhere it is written

The browser bar's colour is written in five places:

- **Desk** (checked by `npm test`):
  - `themeColor` in `src/palette.js`;
  - `THEME_COLOR` in `js/mode.js`, used before the page's CSS is read;
  - the two `<meta name="theme-color" media="…">` tags in `js/head.html`.
- **Paper** (unchecked):
  - `paperThemeColor` in `src/palette.js`;
  - the two metas hard-coded in `site/index.html` (`#ffffff` and `#000000`).

Change a surface's colour in all of its places at once.

On a mode change, `paint()` in `js/mode.js` removes every theme-color meta and
writes one from `--ss-bg`. A meta whose `media` matches the system wins over a
plain one, so setting just one did nothing.

**Incorrect (Paper's colour changed in the palette only):**

```js
// src/palette.js
export const paperThemeColor = { light: base.paper, dark: base[950] };
```

`site/index.html` still says `#000000`, and nothing fails.

**Correct (both of Paper's places together):**

```js
// src/palette.js
export const paperThemeColor = { light: base.paper, dark: base[950] };
```

```html
<!-- site/index.html -->
<meta name="theme-color" content="#0d0d0d" media="(prefers-color-scheme: dark)">
```

Nothing reads `paperThemeColor` yet. A check that ties it to `site/index.html`,
as `check.js` ties Desk's, is a change for the owner to approve.
