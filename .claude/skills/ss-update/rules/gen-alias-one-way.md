---
title: An icon alias maps a line name to a solid one, never back
impact: MEDIUM
impactDescription: one name resolves the same way in every set
tags: generation, icons, aliases
enforced: npm test
---

## An icon alias maps a line name to a solid one, never back

`aliases` in `src/icons/index.js` translates a line icon's name to its solid
twin (`chevron-down` → `angle-down`), so `icon('chevron-down', { set: 'solid' })`
works. A solid name is looked up as written. `npm test` fails when an alias
names a missing line icon or points at a missing solid one.

**Incorrect (an alias from a solid name, or to an icon that is not there):**

```js
export const aliases = {
  'angle-down': 'chevron-down',
  'chevron-up': 'caret-up'
};
```

**Correct:**

```js
export const aliases = {
  'chevron-down': 'angle-down',
  'chevron-up': 'angle-up'
};
```

Adding a solid icon means adding its path to `src/icons/solid.js` first, then
the alias.
