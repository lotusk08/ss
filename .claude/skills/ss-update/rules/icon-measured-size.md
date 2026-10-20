---
title: Size marks by Font Awesome's measured rule, centred in the em
impact: MEDIUM
impactDescription: icons from different sources sit at one size in a row
tags: icons, marks, viewbox, sizing
enforced: review
---

## Size marks by Font Awesome's measured rule, centred in the em

Icons from Font Awesome, the apps' favicons and other sources must read as one
set beside text. Size a new mark by Font Awesome's own rule, measured on its
icons: a rounded square is 88% of the em (as the `square-*` icons are), a disc
fills it, and an open disc such as the tree is 95%. Centre every mark in its em.
Measure the ink; don't judge it by eye. IO's mark sat 5% high until it was
measured.

**Incorrect (a viewBox cut tight to the ink):**

```js
'things': { viewBox: '0 -700 780 700', body: '<path d="M200-700C182-700 …"/>' }
```

The ink fills its box edge to edge, so in the footer the mark stands larger and
sits off-centre beside its neighbours.

**Correct (a square viewBox round the ink, the size Font Awesome's rule gives,
centred), as `src/icons/solid.js` has it:**

```js
'things': { viewBox: '-34 -770 840 840', body: '<path d="M200-700C182-700 …"/>' }
```

Compare the new mark beside `io`, `why` and `think` on the site's footer at
16px and 2x.
