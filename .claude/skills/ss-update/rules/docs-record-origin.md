---
title: Every changed value updates the docs in the same change
impact: HIGH
impactDescription: the origin of each value stays findable, since the code carries no comments
tags: docs, origin, mapping, readme, skill
enforced: review
---

## Every changed value updates the docs in the same change

The code carries no comments (2-space indent, LF, single quotes). What a piece
is for, and where its values came from, is written in the docs. Update them in
the same change as the code:

- **CLAUDE.md**, "Where the values came from": the product and file each value
  came from, and any rule the change adds.
- **MAPPING.md**: the token beside its name in each product.
- **README.md**: the tables and the component list readers use.
- **skills/ss/SKILL.md**: when what a product designer should do changes.
- **These rules**: CLAUDE.md stays the source of the facts. A rule file that
  restates one changes with it, in the same commit.

`npm run site` publishes README, MAPPING and the skill at `/readme.md`,
`/mapping.md` and `/skill.md`, and writes `llms.txt`. They reach readers and
assistants exactly as written. When a value's origin changes, follow
`source-follow-the-product`.

**Incorrect (code changed, docs left):**

```js
// src/palette.js
selection: { light: 'transparent', dark: 'transparent' },
```

README still says "Sand is the reader's mark", and CLAUDE.md still credits the
sand to "io, why and the site".

**Correct:** change the palette, README's rule 5 and its accents table,
CLAUDE.md's Selection line and MAPPING.md's row together. Or keep the sand and
record the owner's reason.
