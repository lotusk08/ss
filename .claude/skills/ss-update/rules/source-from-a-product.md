---
title: Every value is one a product ships
impact: CRITICAL
impactDescription: an invented value forks SS from the products it mirrors
tags: source, tokens, palette
enforced: review
---

## Every value is one a product ships

A colour, size, curve, duration or icon comes from stevehoang.com, write, Think
Why?, Think tree, Things or IO, and CLAUDE.md says which one and from which file.
Every value is then checked against outside references (`source-check-the-world`).
If no product has the value yet, it goes into a product first, or the owner agrees
to take it from an outside reference. The only exceptions are
the ones CLAUDE.md records as such: the shades `src/scale.js` generates
(`gen-generated-shades`) and the 3% hover zoom of `.ss-frame.zoom`, "the one
value new here". A new exception is the owner's call, and gets recorded there.

**Incorrect (a new value that only SS has):**

```js
// src/palette.js
'ui-4': { light: '#dcdce0', dark: '#2a2a2d' },
```

It looks harmless, but no product draws `#dcdce0`. The first product that takes
`--ss-ui-4` no longer looks like its siblings, and nobody can say where the
value came from.

**Correct (taken from a product, origin recorded):**

```js
// src/palette.js, paper
'kbd-line': { light: '#b8b8b8', dark: '#686868' },
```

```md
<!-- CLAUDE.md, Where the values came from -->
- Paper: … `kbd`'s `--border` (the blog's `themes/colors.scss`) …
```
