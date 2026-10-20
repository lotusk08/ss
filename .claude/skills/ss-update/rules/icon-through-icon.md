---
title: Every SVG comes from icon(); sprites leave colour to CSS
impact: MEDIUM
impactDescription: one icon looks the same in the browser, the build, the sprites and the site
tags: icons, sprites, svg, css
enforced: review
---

## Every SVG comes from icon(); sprites leave colour to CSS

`icon()` builds every SVG, in the browser and in the build. The single files
under `dist/icons/` are its output with the class and aria attributes taken off.
The sprites carry no fill colour or stroke width of their own: a `<use>` takes
`--ss-icon-stroke` and the text colour from `css/icons.css`. A shape that must
be an outline inside a solid icon says so in `currentColor`, as `think`'s frame
(`fill="none" stroke="currentColor"`) does. On the site an icon is a placeholder
the build fills, never a hand-written SVG.

**Incorrect (a hand-written SVG with its own colour):**

```html
<!-- site/index.html -->
<svg viewBox="0 0 24 24"><path fill="#0d0d0d" d="…"/></svg>
```

**Correct:**

```html
<!--icon:moon:solid-->
```

```js
icon('moon', { set: 'solid' });
```
