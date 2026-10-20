---
title: Run npm run build and commit dist/
impact: CRITICAL
impactDescription: products link dist/ directly, without building
tags: generation, dist, build, tailwind
enforced: npm test
---

## Run npm run build and commit dist/

`dist/` is generated and committed, so a product can link a file without
building. `npm test` fails when any output differs from a fresh build
("dist/… is stale, run npm run build"). Never edit a file under `dist/` by hand;
the next build overwrites it.

The Tailwind theme (`scripts/build.js`) turns every role into a `color-*` entry
except those whose name starts with `shadow` or contains `gradient`, and lists
its fonts by hand. Name a new role that is not a colour that way, or extend the
filter in the same change. Do the same for the font list.

**Incorrect:**

```sh
# edit src/palette.js
git commit -am "feat: softer rule colour"
```

**Correct:**

```sh
npm run build
npm test
git add src dist
git commit -m "feat: softer rule colour"
```
