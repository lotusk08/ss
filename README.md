# SS — Steve's Style

The look of Steve Hoang's products in one place:
[stevehoang.com](https://stevehoang.com), [write](https://github.com/lotusk08/write),
[Think Why?](https://github.com/lotusk08/why), [Think tree](https://think.stevehoang.com)
and IO. It covers the colours, type, icons, notes, controls, art and motion they
share, as a package the next product starts from.

See it at **[style.stevehoang.com](https://style.stevehoang.com)**.

```sh
npm i github:lotusk08/ss
```

## Philosophy

The products are tools for reading, writing and thinking. They stay quiet so the
work can be loud.

1. **Less is more.** Every colour, word, line and animation earns its place or
   goes. What is left is quieter, and it is enough.
2. **Simple is the best.** The plain way that works beats the clever one. One
   way to do a thing, said in plain words.
3. **Time is priceless.** Pages load fast, say it once, and let the reader go.

## Rules

How the philosophy looks on a screen.

1. **Ink on paper.** Soft grey ink on paper by day, light grey on black by
   night. The page steps back so the words come forward.
2. **One bright thing.** A screen has one accent, and it marks what you can act
   on: a link, the main button, the focus ring. Everything else is grey.
3. **Day and night are two lights.** Blue like a pen on paper by day, ember like
   a lamp left on by night. Dark mode is warmer, not only darker.
4. **Sand is the reader's mark.** Selected words turn a faint warm sand, like a
   pencil highlight. It belongs to the reader, so it is never the accent.
5. **Titles are written by hand.** Domaine Display Narrow italic for titles,
   Newsreader for emphasis. The interface stays plain: the system face, then
   Inter Display.
6. **Vietnamese first.** Every face ships a Vietnamese subset, and labels are
   never uppercased in Vietnamese, where capitals crowd the diacritics.
7. **Fast before fancy.** System fonts first, fonts split by script, motion in
   CSS, no runtime dependencies.
8. **Everyone can read it.** Text passes WCAG contrast (`npm test` checks it),
   focus shows for the keyboard and not the mouse, touch targets are 44px, and
   motion stops for readers who ask it to.
9. **Rhythm, not repetition.** Small radii, hairlines, low shadows and paper
   grain instead of gradients. One memorable moment per page, never five.
10. **Motion says what happened.** Every animation answers what changed or where
    to look. If it answers neither, it goes.

## Surfaces

Reading and working want different grounds, so SS has two. Everything else is
shared.

| Surface | Ground | Ink | Products | Set with |
| ------- | ------ | --- | -------- | -------- |
| **Paper** | `#ffffff` / `#000000` under grain | `#6f6f6f` / `#cecdcd`, titles `#4f4f4f` / `#d7d5d3` | stevehoang.com | `<html data-surface="paper">` |
| **Desk** | `#f7f7f8` / `#0d0d0d` | `#5c5c5e` / `#a3a3a6`, titles `#0d0d0d` / `#f1f1f2` | write, IO | the default |

Paper's values are the blog's own, so a reading product looks like
stevehoang.com without a single override.

## Colour

### Base

| Step  | Hex       | Step  | Hex       |
| ----- | --------- | ----- | --------- |
| paper | `#ffffff` | 500   | `#77777b` |
| 50    | `#f7f7f8` | 600   | `#5c5c5e` |
| 100   | `#f1f1f2` | 700   | `#3a3a3a` |
| 150   | `#e6e6e8` | 800   | `#272727` |
| 200   | `#d5d5d9` | 850   | `#1f1f1f` |
| 300   | `#a3a3a6` | 900   | `#171717` |
| 400   | `#8a8a8e` | 950   | `#0d0d0d` |
|       |           | black | `#000000` |

### Accents

| Name   | Day       | Night     | Used for                              |
| ------ | --------- | --------- | ------------------------------------- |
| blue   | `#0d6efd` | `#58a6ff` | the day accent: links, buttons, focus |
| ember  | `#c67839` | `#fd7e14` | the night accent                      |
| sand   | `#d4965a` | `#d4965a` | what the reader selects               |
| purple | `#8957e5` | `#a882ff` | important notes                       |
| green  | `#238636` | `#2bcc2b` | tips, success                         |
| yellow | `#ef9c03` | `#ffa500` | warnings                              |
| red    | `#da3633` | `#e5484d` | danger, errors                        |

### Code

The blog's ayu highlighting, as roles named by what they colour. Load
`ss/syntax.css` and any Rouge or Pygments `.highlight` block takes them.

| Role | Day | Night |
| ---- | --- | ----- |
| `--ss-syntax-text` | `#5c6773` | `#e6e1cf` |
| `--ss-syntax-comment` | `#828c99` | `#5c6773` |
| `--ss-syntax-keyword` | `#ff7733` | `#ff7733` |
| `--ss-syntax-operator` | `#ff7733` | `#e6e1cf` |
| `--ss-syntax-function` | `#f29718` | `#f29718` |
| `--ss-syntax-string` | `#86b300` | `#b8cc52` |
| `--ss-syntax-number` | `#36a3d9` | `#b8cc52` |
| `--ss-syntax-constant` | `#36a3d9` | `#e6b450` |
| `--ss-syntax-type` | `#e6b450` | `#e6b450` |
| `--ss-syntax-variable` | `#36a3d9` | `#36a3d9` |
| `--ss-syntax-attribute` | `#86b300` | `#36a3d9` |
| `--ss-syntax-tag` | `#86b300` | `#e6b450` |
| `--ss-syntax-decorator` | `#a37acc` | `#a37acc` |
| `--ss-syntax-escape` | `#f07178` | `#f07178` |
| `--ss-syntax-regex` | `#86b300` | `#95e6cb` |
| `--ss-syntax-inserted` | `#86b300` | `#b8cc52` |
| `--ss-syntax-deleted` | `#f51818` | `#ff3333` |
| `--ss-syntax-heading` | `#36a3d9` | `#36a3d9` |

### Shades

Each accent also comes as ten shades, `--ss-<name>-100` (lightest) to
`--ss-<name>-1000` (darkest), drawn in OKLCH around its hue. The shades
nearest the day and night colours are those colours exactly. They are in
`ss.css`, `ss.scss`, the Tailwind theme (`bg-blue-300`) and `tokens.json`
(`scales`).

### Roles

Components use roles, never raw colours. Each role changes with the light and
the surface.

| Role | For |
| ---- | --- |
| `--ss-bg`, `--ss-bg-2` | the page; cards, popovers, keys |
| `--ss-ui`, `--ss-ui-2`, `--ss-ui-3` | hairlines; underlines and strong borders; hover fills |
| `--ss-tx`, `--ss-tx-2`, `--ss-tx-3` | titles; reading text; dates, labels, placeholders |
| `--ss-icon` | icons and quiet buttons |
| `--ss-accent`, `--ss-accent-2`, `--ss-on-accent` | the one bright thing; links; text on the accent |
| `--ss-selection`, `--ss-ring` | the sand mark; the soft ring around a focused field |
| `--ss-tip`, `--ss-info`, `--ss-important`, `--ss-warning`, `--ss-danger` | note rules, each with `-bg` and `-icon` |
| `--ss-note-text`, `--ss-code-bg`, `--ss-kbd-line`, `--ss-btn-line`, `--ss-stripe` | note text; inline code; keys; post navigation; table and timeline stripes |
| `--ss-title-gradient`, `--ss-outline-fill`, `--ss-outline-stroke` | the gradient title; the outlined card title |
| `--ss-shadow-card`, `--ss-shadow-pop`, `--ss-tooltip` | depth; the dark tooltip |

`npm test` checks every text pair on both surfaces in both lights: titles 7:1,
reading text and links 4.5:1, faint text and the accent 3:1.

## Type

| Voice | Token | Face |
| ----- | ----- | ---- |
| Titles | `--ss-font-title` | Domaine Display Narrow italic, then Newsreader |
| Emphasis | `--ss-font-serif` | Newsreader italic |
| Interface and prose | `--ss-font-sans` | the system face, then Inter Display |
| Code | `--ss-font-mono` | JetBrains Mono |
| Figures | `--ss-font-figure` | Helvetica Neue, tabular |

The root size runs from 16 to 18px with the window. Sizes are fluid:
`--ss-display-0` (the hero) to `-3`, then `--ss-text-2xs` to `--ss-text-3xl`.
Classes: `.ss-gradient-title` (the blog's post title), `.ss-outline` (its
outlined card title), `.ss-subtitle` (its tagline, with gradient links),
`.ss-big-number` (its stroked archive year), `.ss-figure`, `.ss-label`.

## Notes

The blog's callouts: a thin rule, a faint wash, the icon in the corner.

```js
import { noteIcon } from 'ss/icons';

`<blockquote class="ss-note tip"><p>Hold ⌥ to copy.</p>${noteIcon('tip')}</blockquote>`;
```

Types: `tip`, `info` (the default), `important`, `warning`, `danger`.

## Components

From the blog: the round mode button (`.ss-mode`, with `.day` and `.night`
icons inside), the top bar (`.ss-topbar`, `.ss-crumbs`, `.ss-topbar-end`), the
underlined search (`.ss-search`), the dot between them (`.ss-dot`), keys
(`kbd`), code blocks (`.ss-code`, `.ss-code-head`), the back-to-top diamond
that counts what you have read (`.ss-top`), previous and next post
(`.ss-pager`), the footer (`.ss-footer`), the
archive timeline (`.ss-timeline`) and hover fading (`.ss-fade`).

Fields (`.ss-input`) are a single line with the field name as placeholder,
like the search. From the apps: `.ss-btn` (`.primary`, `.ghost`, `.danger`,
`.icon`, `.small`), `.ss-field`, `.ss-check`, `.ss-segment`, `.ss-chip`, `.ss-card`,
`.ss-pop`, `.ss-menu`, `.ss-toast`, `.ss-tip` (tooltip).

Markup for each is on [style.stevehoang.com](https://style.stevehoang.com),
whose source is `site/index.html`.

## Icons

- **solid** — 50 Font Awesome Free icons, as the blog, why and think use them.
  For icons beside text.
- **line** — 67 icons on a 24px grid at 1.6 stroke, from IO and write. For a
  workspace full of controls.

```js
import { icon } from 'ss/icons';

icon('moon', { set: 'solid' });
icon('external', { label: 'Opens in a new tab' });
```

`icon()` returns an SVG string that takes the text colour. A line name passed
to the solid set is translated (`close` is `xmark`). Sprites are
`dist/icons/solid.svg` and `dist/icons/line.svg`, single files sit beside them.

## Art and motion

```js
import { startArt } from 'ss/art';
import { backToTop, countWhenSeen } from 'ss/motion';

startArt(document.querySelector('.ss-art'));
```

`startArt` draws one of the blog's two backdrops, picked at random or named:
**plum** branches that grow and stop, or a slow **fluid** field. Both stop when
the tab is hidden and draw one still frame under reduced motion. `?art=plum`
or `?art=fluid` forces one. The signature (`img/signature.svg`,
`.ss-signature`) writes itself every fifteen seconds.

`backToTop(button)` drives the diamond. `css/motion.css` adds
load and scroll reveals, and the blog's page switch: put `ss-navigated` on
`<html>` after a client-side route change, and `.ss-slide` and the children of
`.ss-slide-content` rise 10px and fade in over 1s, 60ms apart; curves and times are tokens (`--ss-ease-*`,
`--ss-dur-*`), and everything stops under reduced motion. `css/layout.css` has
a page grid with full-bleed rooms, a bento grid and section rhythm.

## Use it

```css
@import 'ss/css';
@import 'ss/fonts.css';
@import 'ss/base.css';
@import 'ss/icons.css';
@import 'ss/ui.css';
```

Put `js/head.html` in the `<head>` so a saved mode paints before the first
frame, then:

```js
import { initMode, toggleMode } from 'ss/mode';

initMode();
modeButton.addEventListener('click', toggleMode);
```

The page follows the system until the reader picks the other light. The
choice is `data-mode` on `<html>`, kept for the tab in `sessionStorage` as the
blog keeps it, and dropped when it matches the system again.

Also: `ss/tailwind.css` (a Tailwind v4 theme), `ss/scss` (variables and maps,
including `$ss-paper-light` and `$ss-paper-dark`), `ss` (the palette as
JavaScript), `ss/tokens.json`. [MAPPING.md](MAPPING.md) lists every SS token
beside its name in each product, so moving one over is a find-and-replace.

## With Claude

`skills/ss` is one Claude skill: SS's rules merged with
[claude-skill-awwwards](https://github.com/tponscr-debug/claude-skill-awwwards)
(MIT): principles, a decide-first framework, type, colour, layout, motion,
what to avoid and a checklist, with seven craft references in
`skills/ss/references/`.

```sh
cp -r node_modules/ss/skills/ss ~/.claude/skills/ss
```

## For machines

style.stevehoang.com welcomes crawlers and assistants. Each Cloudflare build
of `main` pings IndexNow (Bing, Yandex and others), `robots.txt` allows them, and the guide is plain text at stable addresses: `/llms.txt`,
`/llms-full.txt`, `/readme.md`, `/mapping.md`, `/skill.md`, `/tokens.json`,
`/ss.css`, `/icons/solid.svg`, `/icons/line.svg`.

## The site

`npm run site` writes `_site/`: the page with its CSS and scripts inlined, the
fonts, icons, tokens and the text files above. `npm run dev` serves it on
port 4321 and rebuilds on every reload.

On Cloudflare (Workers & Pages → import `lotusk08/ss`): build command
`npm run site`, deploy command `npx wrangler deploy`. `wrangler.jsonc` serves
`_site` as static assets; add `style.stevehoang.com` under the Worker's
Domains & Routes. The build fetches Domaine Display
Narrow and Helvetica Neue from stevehoang.com, so the commercial faces are
served by Steve's own sites and never committed here. Without them the title
falls back to Newsreader.

## Change it

Edit `src/palette.js` (colours, type, space, motion) or `src/icons/`, then
`npm run build` and `npm test`. `dist/` is generated; the test fails when it is
out of date.

## Licence

MIT for the code. Inter Display, Newsreader and JetBrains Mono keep their SIL
Open Font Licence (in each folder). The solid icons are Font Awesome Free,
CC BY 4.0. The signature, favicons and social card are Steve Hoang's own marks.
The skill's references come from
[claude-skill-awwwards](https://github.com/tponscr-debug/claude-skill-awwwards)
(MIT).

Made by [Steve Hoang](https://stevehoang.com).
