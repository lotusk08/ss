---
title: Domaine and Helvetica Neue stay private
impact: CRITICAL
impactDescription: a licence breach in a public repository or on npm cannot be undone
tags: type, fonts, licence, cors, site
enforced: review
---

## Domaine and Helvetica Neue stay private

Domaine Display Narrow and Helvetica Neue are commercial. They are never
committed. `fonts/`, which `package.json`'s `files` ships to npm, must never hold
them. Their tokens name them first and fall back to free faces
(`--ss-font-title`: Domaine, then Newsreader).

Only style.stevehoang.com uses them:
- `npm run site` fetches them from stevehoang.com, or reads
  `SS_PRIVATE_FONTS=<stevehoang.com>/public/assets/fonts` locally. A failed fetch
  is a warning, never a failed build.
- The site serves them with no CORS header: `_headers` in `scripts/site.js`
  grants `Access-Control-Allow-Origin` to `inter-display`, `newsreader` and
  `jetbrains-mono` only. A tidier `/fonts/*` line would open the commercial
  faces to every site.
- Domaine is `font-display: block` there, as on the blog, because Safari drew a
  cached `swap` face's fallback first.

**Incorrect:**

```sh
cp ../stevehoang.com/public/assets/fonts/domaine-display-narrow/*.woff2 fonts/
```

```txt
/fonts/*
  Access-Control-Allow-Origin: *
```

**Correct:**

```js
// src/palette.js
'font-title': "'Domaine Display Narrow', 'Newsreader', Georgia, serif",
```

```txt
/fonts/newsreader/*
  Access-Control-Allow-Origin: *
```

```sh
SS_PRIVATE_FONTS=../stevehoang.com/public/assets/fonts npm run site
```

The private paths in `scripts/site.js` must name files the blog really has. A
fetch that returns the blog's 404 page must not be saved as a font: check the
response status, not just its size.
