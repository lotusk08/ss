---
title: When a product changes what SS took, update SS in the same pass
impact: CRITICAL
impactDescription: keeps SS a mirror instead of a snapshot
tags: source, sync, drift, docs
enforced: review
---

## When a product changes what SS took, update SS in the same pass

Products move on. When stevehoang.com (or the product an origin line names)
changes or drops something SS took from it, pick one of three outcomes and record
it in the same change:

1. **Change the value**, if the product still has the thing with a new value.
2. **Keep it with a new origin**, if another product still ships it. Name that
   product, and check how it really does it (MAPPING.md, or its code) before
   writing it down.
3. **Drop it** from SS, its docs and the site, if no product ships it any more.

Never leave an origin line that is no longer true: it misleads the next change.
When keep or drop is a design choice, list it for the owner instead of guessing.

To find drift, compare each "Where the values came from" line in CLAUDE.md, and
each product column in MAPPING.md, with the file it names in that product today.
For the blog, that means `src/styles/themes/colors.scss`, `src/styles/**`,
`src/components/**` and its CLAUDE.md.

**Incorrect (the blog made its selection transparent; SS still says it shares the sand):**

```md
- Selection: `rgb(212 150 90)` at 16% and 26%, the one value io, why and the
  site all wrote alike.
```

**Correct (the value kept, the origin made true, the change named):**

```md
- Selection: `rgb(212 150 90)` at 16% and 26%, as io and why write it. The blog
  made its selection transparent in October 2026; SS keeps the sand, as README's
  rule 5 says.
```

Before writing "as io and why write it", check io's and why's own code. An origin
line copied from another stale line is the same mistake twice.
