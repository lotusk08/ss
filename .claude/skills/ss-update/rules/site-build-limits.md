---
title: Write code and docs the site build can read
impact: MEDIUM
impactDescription: the site build has no parser; it reads exact shapes
tags: site, build, bundler, llms
enforced: review
---

## Write code and docs the site build can read

`scripts/site.js` bundles and rewrites with regular expressions, not a parser.
It depends on these exact shapes:

- **Modules:**
  - Each is listed in `MODULES`, in dependency order, with a unique basename.
  - Imports are one line each, single-quoted, with a plain list of names:
    `import { a, b } from './file.js';`. They become destructuring, so
    `{ a as b }` breaks.
  - Exports are only `export function`, `export async function`,
    `export const`, `export let`, or a one-line `export { … };`.
- **Asset URLs:** it rewrites `url('../fonts/` and `url('../img/paper-grey.png')`
  as written, single quotes included.
- **`llms.txt`:** it takes README from `## Philosophy` up to `## Surfaces`. Keep
  both headings, in that order.

**Incorrect:**

```js
// js/media.js
import {
  develop,
  gallery
} from './media-core.js';
export default function zoom() { … }
```

**Correct:**

```js
import { develop, gallery } from './media-core.js';
export function zoom() { … }
```

Add a new module to `MODULES` after the modules it imports. After any of these
changes, run `npm run site` and open the result.
