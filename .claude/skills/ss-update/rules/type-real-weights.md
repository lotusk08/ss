---
title: Ship the weight that is drawn; never let the browser fake one
impact: MEDIUM
impactDescription: a bold or italic is the face's own, not a smeared synthetic
tags: type, fonts, weights, newsreader
enforced: review
---

## Ship the weight that is drawn; never let the browser fake one

When CSS asks for a weight or style the fonts do not have, the browser fakes it,
wider and heavier. On the blog, a bold italic in a heading was faked until its
own face shipped, and read a size larger than the words beside it (the blog's
CLAUDE.md before the October 2026 trim). Before writing a weight, look up the
faces `css/fonts.css` ships. Add a face only from a product, as Newsreader italic
500 is the blog's, "for a bold italic inside a heading, so no weight is faked".

A new face points at `../fonts/` relatively, so `css/fonts.css` works from
`node_modules` through any bundler. It comes as a Latin and a Vietnamese file,
each with its `unicode-range`.

**Incorrect (Inter Display ships its italic at 400 only):**

```css
.ss-label em strong {
  font-weight: 700;
}
```

The browser synthesises a 700 italic.

**Correct (a face SS ships, for a bold italic in a heading):**

```css
/* css/fonts.css: the Latin file, beside its Vietnamese twin */
@font-face {
  font-family: 'Newsreader';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: url('../fonts/newsreader/newsreader-latin-500-italic.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

```css
h2 em strong {
  font-weight: 500;
}
```
