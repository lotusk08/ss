---
title: Every hover is one motion; a press is at once
impact: HIGH
impactDescription: hovers cross-fade evenly, and a tap leaves nothing lit
tags: motion, hover, press, tokens
enforced: review
---

## Every hover is one motion; a press is at once

Every hover is the blog's one motion: `--ss-dur-hover` (0.3s) on
`--ss-ease-hover`, the same in as out, so what the pointer leaves fades out while
what it reaches fades in. A new hover rule sits under `@media (hover: hover)`, so
a tap on a phone leaves nothing lit. A press (`:active`) changes at once
(`transition-duration: 0s`) and does not shrink: UI Skills' 0.96 press scale was weighed and left out by the owner.

Exceptions that stay:
- **Tooltips** keep their own quick 0.1s grow. One on plain text opens on any
  hover, on purpose (`ui.css`).
- **write's controls** (`.ss-btn` and its family) keep write's
  `--ss-dur-micro` / `--ss-ease-out`.

Known debt: 15 older hover rules sit outside `(hover: hover)`, in `base.css`,
`ui.css` and nine in `site.css`. Fixing them is a change of its own.

**Incorrect (its own timing, outside the hover query):**

```css
a:hover {
  color: var(--ss-accent);
  transition: color 0.15s ease-out;
}
```

**Correct (as `css/base.css` writes links):**

```css
a {
  transition:
    color var(--ss-dur-hover) var(--ss-ease-hover),
    text-decoration-color var(--ss-dur-hover) var(--ss-ease-hover);
}

@media (hover: hover) {
  a:hover {
    color: var(--ss-accent);
  }
}

a:active {
  color: var(--ss-accent);
  transition-duration: 0s;
}
```
