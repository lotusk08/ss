---
title: Icons, notes and code reach the page as real HTML
impact: MEDIUM
impactDescription: readers without JavaScript and crawlers see the same page
tags: site, build, placeholders, seo
enforced: review
---

## Icons, notes and code reach the page as real HTML

`site/index.html` holds placeholders that `npm run site` fills:
- `<!--css-->`, `<!--js-->`, `<!--preload-->`, `<!--mode-->`;
- `<!--include:signature-->`;
- `<!--icon:name:set[:class]-->`, `<!--note:type-->`, `<!--code:lang:text-->`.

So icons, notes and code blocks are in the HTML, not drawn by a script.

**Incorrect (drawn by script after load):**

```js
document.querySelector('#tip').innerHTML = noteIcon('tip');
```

**Correct:**

```html
<blockquote class="ss-note tip"><p>Tip</p><!--note:tip--></blockquote>
```
