---
title: .ss-move comes and goes by one contract
impact: HIGH
impactDescription: menus, sheets, dialogs and toasts enter and leave alike
tags: motion, move, dialog, popover, enter, leave
enforced: review
---

## .ss-move comes and goes by one contract

`.ss-move` is why's way in and out:

- It is hidden until `.show`, `[open]` or `:popover-open`.
- It enters over `--ss-dur-enter` (240ms) on `--ss-ease-quint` and leaves faster,
  over `--ss-dur-leave` (180ms) on `ease`. `visibility` rides along, so the
  element stays seen until the fade ends.
- A `dialog` or popover comes in through `@starting-style` and stays drawn while
  it leaves (`display` and `overlay` as `allow-discrete`).
- `.up` `.down` `.left` `.right` `.in` `.out` `.whole` `.wide` `.tall` choose
  the way. Under reduced motion only the fade is left.

For what a script adds or removes, use `enter()` and `leave()` from
`js/motion.js`. `enter()` settles the hidden state first, so a direction changed
while hidden does not glide. `leave()` resolves on the element's own `opacity`
`transitionend`, with a timeout as a fallback.

**Incorrect (shown in the same frame it is added):**

```js
document.body.append(toast);
toast.classList.add('show');
```

The browser never saw the hidden state, so the toast appears with no motion.

**Correct:**

```js
import { enter, leave } from 'ss/motion';

document.body.append(toast);
enter(toast);
// later
await leave(toast, { remove: true });
```
