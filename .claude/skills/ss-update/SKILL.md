---
name: ss-update
description: Rules for changing Simple Style itself — this repository. Use before adding or changing a token, colour, font, icon, component, motion, media piece, a build script or the site, and whenever stevehoang.com or another product changes something SS took from it. Each rule says what to do, why, and shows the wrong and the right way. Not the public `skills/ss`, which is for products that use SS.
---

# Updating Simple Style

SS gathers the look Steve Hoang's products already ship. It goes wrong in the
same few ways each time:
- a value is invented instead of taken from a product;
- a product moves on, and SS keeps the old value and an origin line that is no
  longer true;
- a value is written outside `src/`;
- a fix made once is undone by the next change that never heard of it.

These rules are those fixes, written down so every change gets them. CLAUDE.md
stays the source of the facts; a rule that restates one changes with it.

## When to apply

- Before any change in `src/`, `css/`, `js/`, `scripts/`, `site/` or the docs.
- When stevehoang.com (or write, Think Why?, Think tree, Things, IO) changes or
  drops something SS lists as coming from it.
- When reviewing a diff to this repository: check it against every rule below.

## Rule categories by priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Source of truth | CRITICAL | `source-` |
| 2 | One source, generated | CRITICAL | `gen-` |
| 3 | Contrast and modes | HIGH | `mode-` |
| 4 | Motion | HIGH | `motion-` |
| 5 | Type and glyphs | MEDIUM | `type-` |
| 6 | Icons | MEDIUM | `icon-` |
| 7 | The site | MEDIUM | `site-` |
| 8 | Docs | HIGH | `docs-` |

A rule's own impact is in brackets where it differs from its category's. `npm
test` enforces the rules marked ✓, within the limits each rule names; the rest
are for whoever writes or reviews the change.

## Quick reference

### 1. Source of truth (CRITICAL)

- `source-from-a-product` — Every value is one a product ships; the exceptions are recorded
- `source-blog-first` — When a choice is open, copy stevehoang.com, unless CLAUDE.md names an app
- `source-follow-the-product` — When a product changes or drops what SS took, update SS in the same pass
- `source-check-the-world` — Check every value, the owner's and the agent's included, against newest, famous, popular references; flag disagreements

### 2. One source, generated (CRITICAL)

- `gen-one-source` — New values are written only in `src/palette.js` and `src/icons/`
- `gen-build-dist` ✓ — Run `npm run build` and commit `dist/`; name roles so Tailwind reads them
- `gen-theme-color` ✓ (HIGH) — The theme colour agrees in all five places (`npm test` checks Desk's three)
- `gen-alias-one-way` ✓ (MEDIUM) — An icon alias maps a line name to a solid one, never back
- `gen-generated-shades` (MEDIUM) — Shades come from `src/scale.js`, never picked

### 3. Contrast and modes (HIGH)

- `mode-contrast-pairs` ✓ — Add every new text pair to `scripts/check.js` (hex values only)
- `mode-three-blocks` — Write each mode three times; no `light-dark()`
- `mode-surface-after-mode` — Paper blocks come after the mode blocks, in the same three shapes
- `mode-instant-switch` — A mode switch moves no transition
- `mode-stored-choice` — The reader's choice is kept, dropped and painted one way

### 4. Motion (HIGH)

- `motion-one-hover` — Every hover is `--ss-dur-hover` on `--ss-ease-hover`; a press is at once
- `motion-nothing-waits` — Nothing starts hidden waiting for a script but `.ss-move`
- `motion-move-contract` — `.ss-move` comes and goes by one contract; `enter()` and `leave()` for scripts
- `motion-still-on-load` (MEDIUM) — Nothing moves on the first paint that was not asked to
- `motion-stagger-by-range` (MEDIUM) — On a scroll timeline, stagger with `animation-range`, not delay
- `motion-reduced` — Under reduced motion only fades are left; art draws one still frame

### 5. Type and glyphs (MEDIUM)

- `type-commercial-fonts` (CRITICAL) — Domaine and Helvetica Neue stay private: not committed, not shared by CORS
- `type-glyph-room` — Text painted by its box gets room for descenders, stacked marks and italic overhang
- `type-real-weights` — Ship the weight that is drawn; never let the browser fake one

### 6. Icons (MEDIUM)

- `icon-measured-size` — Size marks by Font Awesome's measured rule, centred in the em
- `icon-path-precision` — A traced mark at 0.1 unit; a shared path written once
- `icon-hairline` (LOW) — A hairline frame uses `vector-effect: non-scaling-stroke`
- `icon-through-icon` — Every SVG comes from `icon()`; sprites leave colour to CSS

### 7. The site (MEDIUM)

- `site-one-column` — style.stevehoang.com is one plain column; add a section before chrome
- `site-real-html` — Icons, notes and code reach the page as real HTML through placeholders
- `site-build-limits` — Write modules, asset URLs and README headings the site build can read
- `site-for-machines` — The social card, head, sitemap, IndexNow and robots change with the name and the look

### 8. Docs (HIGH)

- `docs-record-origin` — Every changed value updates CLAUDE.md, MAPPING.md, README, the public skill and these rules
- `docs-references-as-upstream` (LOW) — `skills/ss/references/` stay exact upstream copies

## How to use

Read the rule files in `rules/` for the reasons and the wrong and right
examples. A change goes in this order:

1. Find the value in the product it comes from (stevehoang.com first), with its file,
   and check it against outside references (`source-check-the-world`).
2. Change `src/palette.js` or `src/icons/`, then the CSS or JS that uses it.
3. `npm run build`, then `npm test`.
4. `npm run dev` and look at the section on the local site (port 4321): light and
   dark, at 320px and on a wide screen, and with JavaScript off.
5. Update the docs (`docs-record-origin`).
6. In the report, name the rules the change touched and anything left for the owner.

A reviewer reads the diff against every rule. For each break, it names the rule
and its fix, the way the rule file explains it.

## A new rule

When a change breaks something, or a review finds a mistake that could come
back, add a rule:
1. Write `rules/<prefix>-<name>.md` with what to do, why (what broke), the
   wrong way and the right one.
2. List it here.
3. If a script can catch it, propose that check to the owner.
