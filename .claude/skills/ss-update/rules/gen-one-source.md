---
title: New values are written only in src/palette.js and src/icons/
impact: CRITICAL
impactDescription: one edit reaches CSS, SCSS, Tailwind, JSON and the sprites
tags: generation, palette, tokens, css
enforced: review
---

## New values are written only in src/palette.js and src/icons/

`npm run build` generates `dist/ss.css`, `dist/ss.scss`, `dist/tailwind.css`,
`dist/tokens.json` and the icon sprites from `src/`. A colour, duration or
easing that more than one rule uses, or that a product might want, is a token.
`css/` and `js/` read it as `var(--ss-*)`.

Some literals predate this rule, and none of them is a pattern to copy:
- the swap's `0.5s cubic-bezier(0.45, 0, 0.55, 1)` in `ui.css` (the
  `--ss-ease-swap` that commit 683c17d meant to remove);
- `gray` and `#86868678` in `ui.css`;
- `#000` in `ui.css`;
- `#88888825` in `js/art.js`;
- the 480ms and 100ms `ease` in `media.css`.

The blog's own fixed values also stay literal on purpose: the slide's 600ms
`ease` and the tooltip's 0.658rem. Turning a literal into a token, or recording
why it stays, is a change of its own.

**Incorrect (a new raw value in a stylesheet):**

```css
/* css/ui.css */
.ss-chip {
  border: 1px solid #e6e6e8;
}
```

`#e6e6e8` never reaches the Tailwind theme, the SCSS or `tokens.json`, and it
stays light in dark mode.

**Correct (a role and the hairline token):**

```css
.ss-chip {
  border: var(--ss-hairline) solid var(--ss-ui);
}
```

If no role fits, add one in `src/palette.js` (following `source-from-a-product`),
then build.
