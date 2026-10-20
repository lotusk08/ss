---
title: style.stevehoang.com is one plain column; add a section before chrome
impact: MEDIUM
impactDescription: the site shows SS instead of turning into a copy of the blog
tags: site, chrome, layout
enforced: review
---

## style.stevehoang.com is one plain column; add a section before chrome

The site shows SS; it is not the blog. CLAUDE.md keeps it to one plain column,
with no contents panel, signature, tagline, art behind it or search. Its chrome
is the top bar with the mark and mode button, the footer, the blog's back-to-top
diamond (which counts how much has been read) and the horizon at the screen's
edges. Show a new piece of SS as a section in `site/index.html`, not as a new
fixed element.

One conflict for the owner: CLAUDE.md says "no … grain behind it", but
`site/index.html` has had `<body class="ss-grain">` since the first commit, and
README and the public skill present Paper as "under grain". Decide which is
true, then fix the other.

**Incorrect:**

```html
<nav class="ss-toc">…</nav>
```

**Correct (the site's section pattern):**

```html
<section id="media">
  <h2 class="ss-heading">Media<a class="anchor" href="#media" aria-label="Link to this section"><!--icon:hashtag:solid--></a></h2>
  …
</section>
```
