---
title: The card, head, sitemap, IndexNow and robots change with the name and the look
impact: MEDIUM
impactDescription: search, social shares and assistants see SS as it is
tags: site, og, seo, sitemap, indexnow, robots
enforced: review
---

## The card, head, sitemap, IndexNow and robots change with the name and the look

What machines read is part of the site:

- **The social card:** `site/og.png` shows the title in Domaine on paper with
  grain, the seven day colours as a line, and the copyright, at 1200×630. Redraw
  it when SS's name, the title's look or a day colour changes. The rename to
  Simple Style and the title's glyph fix both redrew it.
- **The head:** Open Graph, Twitter, `copyright` and one JSON-LD graph (the
  Person, the WebSite, the SoftwareSourceCode). A rename touches these too, and
  `llms.txt`.
- **The sitemap** names the card as the home page's image.
- **IndexNow:**
  - The key file `site/<key>.txt` must equal `INDEXNOW_KEY` in `scripts/site.js`.
  - The ping runs only on Cloudflare builds of `main`.
  - A failed ping is a warning.
- **`robots.txt`** allows every crawler, AI ones by name, with a Content-Signal
  line. Cloudflare's "Block AI bots" and managed robots.txt stay off for the
  zone, or they override it.

**Incorrect (renamed in the page only):**

```html
<title>Simple Style</title>
```

The card, the JSON-LD name and `llms.txt` still say the old name.

**Correct:** rename in `site/index.html`'s title, Open Graph, Twitter and JSON-LD,
in `scripts/site.js`'s `llms` text, and redraw `site/og.png`, together.
