---
title: A hairline frame uses vector-effect non-scaling-stroke
impact: LOW
impactDescription: a frame stays a hairline at every icon size
tags: icons, svg, stroke
enforced: review
---

## A hairline frame uses vector-effect non-scaling-stroke

A stroke in viewBox units grows and shrinks with the icon, so a frame meant as a
hairline is heavy at 32px and gone at 12px. Think tree's rounded square is half a
pixel at any size, `stroke-width="0.5"` with
`vector-effect="non-scaling-stroke"`. That is one device pixel on a 2x screen and
a fainter line on a 1x one, inset so it stays whole at 16px.

**Incorrect:**

```html
<rect x="12" y="12" width="176" height="176" rx="40" fill="none" stroke="currentColor" stroke-width="6"/>
```

**Correct:**

```html
<rect x="12" y="12" width="176" height="176" rx="40" fill="none" stroke="currentColor"
  stroke-width="0.5" vector-effect="non-scaling-stroke"/>
```
