---
title: Check every value against the world before it goes in
impact: CRITICAL
impactDescription: the owner and the agent are both sometimes wrong; a second, outside opinion catches it
tags: source, verification, standards, accessibility, design-systems
enforced: review
---

## Check every value against the world before it goes in

A value from a product (the blog included), from the owner or from an agent is a
candidate, not a fact. Before it goes into SS, check it against outside
references that are:

- **newest**: the current version, with the date you read it (this year's page,
  the latest release);
- **famous**: an authority in its field;
- **popular**: widely used, such as Baseline "widely available", or the same
  value in several leading systems.

Take at least two that agree.

Where to look, by kind:

| Kind | References |
|------|------------|
| CSS and JS behaviour, browser support | MDN Web Docs, web.dev Baseline, Can I use |
| Accessibility, contrast, motion | W3C WCAG 2.2, WAI-ARIA Authoring Practices, MDN's accessibility notes |
| Interaction, motion, spacing, radii | Apple Human Interface Guidelines, Material Design 3, GitHub Primer, Vercel Geist |
| Craft details | the sites SS already credits: paco.me, shud.in, UI Skills, claude-skill-awwwards |

Then:

1. **They agree:** take the product's value. Record the product, the references
   and the date in CLAUDE.md.
2. **They disagree on taste:** don't copy it silently. List it for the owner:
   the product's value, what the references say, their links, and a
   recommendation. Record the owner's decision and the reason.
3. **They disagree on accessibility or browser support:** the reference wins
   unless the owner decides otherwise, and that decision is recorded.

An outside reference never sets a value no product ships without the owner
agreeing. It checks the value; the products still supply it.

**Incorrect (copied because the blog did it):**

```js
// src/palette.js
selection: { light: 'transparent', dark: 'transparent' },
```

The blog made its selection transparent in October 2026. MDN's `::selection`
page advises against overriding selection styles for looks alone, and asks for
readable contrast when you do. A transparent selection shows the reader nothing.

**Correct (checked, then put to the owner):**

```md
- Selection: the blog went transparent (Oct 2026). MDN (::selection,
  Accessibility, read 2026-10-20) advises against it. SS's docs credit io and
  why with the sand; check their code before naming them.
  Recommendation: keep `rgb(212 150 90)` at 16% / 26%. Owner's call.
```
