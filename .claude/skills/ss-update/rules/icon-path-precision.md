---
title: A traced mark is optimised at 0.1 unit; a shared path is written once
impact: MEDIUM
impactDescription: curves keep their shape, and two marks never drift apart
tags: icons, svg, svgo, precision
enforced: review
---

## A traced mark is optimised at 0.1 unit; a shared path is written once

A traced app mark, such as the tree favicon, goes through svgo at 0.1 unit
(`floatPrecision: 1`). At whole units the tree's leaves bent. Font Awesome's
icons stay as Font Awesome writes them. When two marks share a drawing (Think
Why? and Think tree share the tree), write the path once as a constant in
`src/icons/solid.js` and build both from it.

**Incorrect (rounded to whole units, pasted twice):**

```js
'why': { viewBox: '0 0 160 160', body: '<path d="M52 2c-1 4-2 6-8 11…"/>' },
'think': { viewBox: '0 0 200 200', body: '<rect …/><g …><path d="M52 2c-1 4-2 6-8 11…"/></g>' }
```

**Correct:**

```js
const tree = '<path fill-rule="evenodd" d="M52.3 2c-.8 4.1-1.9 5.6-8.3 11.3…"/>';

'why': { viewBox: '-4.3 -1.5 168.6 168.6', body: tree },
'think': { viewBox: '0 0 200 200', body: '<rect …/><g transform="translate(40.1 39.3) scale(0.75)">' + tree + '</g>' }
```
