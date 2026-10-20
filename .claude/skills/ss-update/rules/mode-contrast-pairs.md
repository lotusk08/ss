---
title: Add every new text pair to scripts/check.js
impact: HIGH
impactDescription: contrast is proved on both surfaces in both lights, not eyeballed
tags: contrast, wcag, roles, check
enforced: npm test (listed hex pairs only)
---

## Add every new text pair to scripts/check.js

`npm test` measures each pair in `pairs` (`scripts/check.js`) on Desk and Paper,
light and dark: titles 7:1, reading text and links 4.5:1, faint text and the
accent 3:1. It only knows the pairs listed. A new text role, or an old role on a
new ground, needs its own line, or nothing checks it.

Two gaps to know:
- `check.js` reads only six-digit hex. A role written as `rgb(… / a%)` measures
  as `NaN`, and `NaN < min` is false, so it prints "ok … NaN" and passes. Measure
  such a role by hand against the colour it sits on. Making `check.js` fail on
  `NaN` is a change for the owner to approve.
- `note-text` is not in `pairs` today.

Readable text uses `--ss-tx-2` or stronger. `--ss-tx-3` is for dates, labels,
placeholders and marks, and still needs its 3:1.

**Incorrect (a new note text role, never measured):**

```js
// src/palette.js
'note-text-2': b(500, 400),
```

**Correct (the role and its pairs together):**

```js
// src/palette.js
'note-text-2': b(600, 300),
// scripts/check.js
['note-text-2', 'bg', 4.5],
['note-text-2', 'bg-2', 4.5],
```

A value that fails is not lowered to pass. Take the product's own value, or ask
the owner.
