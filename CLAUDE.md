# CLAUDE.md

ss, Steve's Style: the design tokens, icons, components, art and motion Steve
Hoang's products (stevehoang.com, write, Think Why?, Think tree, IO) share,
gathered so a new product takes them from here. One source, every format
generated from it. The repository is public and published at
style.stevehoang.com, which is built from `site/`. The README opens with the
philosophy; MAPPING.md maps each token to its name in each product.

The style is the blog's. When a choice is open, look at how stevehoang.com
does it (its repository is `lotusk08/stevehoang.com`) and copy that, values
and timings included; the components here were lifted from its SCSS and Vue
and should keep matching it.

style.stevehoang.com shows SS; it is not a copy of the blog. It stays one
plain column: no contents panel, no signature, no tagline, no art or grain
behind it, no search. Its one piece of chrome is the blog's back-to-top
diamond, which counts how much has been read. Add a section before adding
chrome.

The code carries no comments. What a piece is for, and where its values came
from, is written here instead.

## Commands

- `npm run build` — writes `dist/ss.css`, `dist/ss.scss`, `dist/tailwind.css`
  and `dist/tokens.json` from `src/palette.js`, and the icon sprites and single
  files under `dist/icons/` from `src/icons/`.
- `npm run site` — writes `_site/` for style.stevehoang.com: `site/index.html`
  with every stylesheet and script inlined, the fonts, icons, tokens,
  `llms.txt`, `llms-full.txt`, `robots.txt`, `sitemap.xml` and `_headers`.
  `SS_PRIVATE_FONTS=<stevehoang.com>/public/assets/fonts` reads Domaine and
  Helvetica Neue from a local checkout instead of fetching them.
- `npm run dev` — serves `_site` on port 4321 and rebuilds on every reload.
- `npm test` — WCAG contrast of every text pair on both surfaces in both modes, the theme
  colours in `js/mode.js` and `js/head.html` against the palette, that every
  icon alias names a real icon on both sides, and that `dist` matches a fresh
  build. No dependencies; Node 20 or later.

## Where the values came from

Nothing here was invented; each value is one the projects already ship.

- Paper: the blog's own values from its `themes/light.scss` and `dark.scss`:
  `--main-bg`, `--heading-color`, `--text-color`, `--text-muted-color`,
  `--site-btn-color`, `--main-border-color`, `--link-underline-color`,
  `--site-hover-bg`, `--note-text-color`, `--kbd-wrap-color`,
  `--dynamic-title-gradient`, `--card-shadow`. Desk is the apps': write's and
  IO's near-black ink on near-white.
- Notes: the blog's `.note-*` exactly — rule colours, washes, icon colours,
  the 0.2rem rule, `0.75rem 1rem` padding, the solid icon at `right: 0.75rem;
  bottom: 1rem`, the info icon turned 180°, square corners, and at 576px and
  under the note bleeds to the screen's edges (`--ss-note-bleed`, the page's
  side gutter, 1rem by default).
- Components: the blog's mode button (sun and moon crossing at 0.5s with
  `rotate(70deg) scale(0.55)`), breadcrumb, underlined search, the 3px dot,
  `kbd` with its inset shadow, code block header, back-to-top diamond with its
  160-unit progress square, footer, archive timeline and `hover-fade`.
- Pager and page switch: `.ss-pager` is `PostNav.vue` and its
  `.post-navigation` rules (the gradient line growing from each edge in
  240ms, the labels, the `#efefef` and `#292929` line, `--ss-btn-line`);
  `.ss-slide` is `motion.scss`'s `slide-enter`, which runs only once
  `navigated` is on `<html>`, so the first paint never waits on it.
- Art: `ArtPlum.vue` and `ArtFluid.vue` ported to plain JavaScript in
  `js/art.js`, constants unchanged; `.ss-art` is the blog's `#art`.
- Signature: the path of the blog's `Logo.vue`, drawn with the home page's
  15-second `grow` animation. The favicons and `apple-touch-icon.png` in
  `site/` are the blog's.
- Syntax: the blog's ayu highlighting in its `themes/light.scss` and
  `dark.scss` `.highlight` rules, grouped into `--ss-syntax-*` roles by what
  they colour; `css/syntax.css` maps the Rouge classes back to them.
- Shades: `src/scale.js` draws ten OKLCH steps per accent (lightness 0.97
  to 0.28, chroma eased at both ends, the day colour's hue) and pins the day
  and night colours to their nearest steps. They are generated, not chosen;
  the accents are the real values.
- Base ramp: write's neutrals (`#f7f7f8` page, `#0d0d0d` ink, `#171717` dark
  panel), which io's oklch greys and its `theme-color` already matched.
- Accent: stevehoang.com's `--primary-color`, Bootstrap blue `#0d6efd` in light
  and `#fd7e14` in dark; think's bullet colour flips the same way. Links take
  the site's `--secondary-color`, `#0056b2` and `#c67839`.
- Selection: `rgb(212 150 90)` at 16% and 26%, the one value io, why and the
  site all wrote alike.
- Callouts: the site's `.note-*` colours, with io's dark `important` wash.
- Type: Inter Display, Newsreader and JetBrains Mono, split Latin and
  Vietnamese as every project splits them; the system-first sans stack and the
  fluid root size are why's.
- Space, radius, easing, durations, z-index: io's `ux/tokens.css`, with the site's
  10px and write's 14px radii and the site's `ease-swap`.
- Mode: `data-mode` and the `mode` key, as the site, why and io name them; a
  choice equal to the system is dropped, as why does it.
- Line icons: IO's `icons/paths.ts` (stroke 1.6), then write's `Icons.tsx`
  for the names IO lacks, camelCase turned kebab-case. write drew them at 1.7;
  they are drawn at IO's 1.6 here.
- Solid icons: the site's `icons.svg` sprite (Font Awesome Free 6.7.2), then
  why's `icons.js` for the names the site lacks. think's Font Awesome classes
  are covered except `eye` and `file-arrow-down`, which no product had as a path.
- Hero, rhythm and motion: from claude-skill-awwwards (MIT), where it did
  not contradict the products. Its easing and duration scale were already
  IO's; it added `--ss-display-0`, the hero leading and tracking, the body and
  overline tracking, `--ss-section-*`, `--ss-ease-back`, `--ss-ease-expo`,
  `--ss-dur-hero`, the stagger and the reveal. Its "never pure white or
  black" agrees with SS's roles; the site keeps its paper and black by
  choice (MAPPING.md). Its GSAP and Lenis defaults were left out: SS moves
  with CSS scroll-driven animation and View Transitions and no library.
- UI: write's `.btn`, `.input`, `.field`, `.switch`, `.toggle`, `.popover` and
  `.toast` sizes; the site's tooltip and `kbd`. `--ss-ring` is write's focus
  ring alpha (16% and 22%) on SS's accent.

## Rules

- `skills/ss` is one skill: SS's rules merged with claude-skill-awwwards
  (MIT per its README, credited in `NOTICE.md`). `references/` holds its
  seven files unchanged; update them by copying upstream again. Where they
  disagree with SS (pure white and black, GSAP, Lenis), `SKILL.md` says SS
  wins.
- No theme-switch transition: the mode button only cross-fades its sun and
  moon, as the blog's does.
- `src/palette.js` and `src/icons/` are the only places a value is written. `dist` is generated
  and committed, so a project can link a file without building.
- `css/fonts.css` points at `../fonts/` relatively, so it works from
  `node_modules` through any bundler.
- Domaine Display Narrow and Helvetica Neue are commercial and stay out of the
  repository; their tokens name them first and fall back to free faces. The
  site build fetches them from stevehoang.com (a server fetch, so the blog's
  font CORS rule does not apply) and serves them without CORS, so only
  style.stevehoang.com uses them. A failed fetch is a warning, not a stop.
- Surfaces are written as `:root[data-surface='paper']` blocks after the
  mode blocks, in the same three shapes, so Paper wins over Desk at equal
  mode and the dark Paper block wins over both.
- Mode is kept in `sessionStorage`, as the blog keeps it: a new tab follows
  the system again.
- Modes are written three times in `ss.css`: light on `:root`, dark under
  `prefers-color-scheme` unless `data-mode='light'`, and dark on
  `data-mode='dark'`. `light-dark()` would say it once but needs Safari 17.5,
  and the site still supports Safari 14.
- Every `theme-color` meta is replaced on a mode change: a meta with a `media`
  matching the system wins over one without, so setting a plain one did
  nothing.
- `icon()` builds every SVG, in the browser and in the build; the single files
  under `dist/icons/` are its output with the class and aria attributes taken
  off. The sprites leave stroke and fill to `css/icons.css`, so a `<use>` takes
  `--ss-icon-stroke` and the text colour.
- Nothing in `motion.css` starts hidden waiting for a script. Scroll reveals
  run only under `@supports (animation-timeline: view())`; elsewhere the
  element is simply there. Load animations finish within a second. A scroll
  timeline ignores `animation-delay`, so `.ss-stagger` staggers by shifting
  `animation-range` with `--i` instead.
- `.ss-mask` clips with `clip-path: inset()` and negative side insets, not
  `overflow: hidden`, which cut the overhang of Newsreader's italic.
- `site/index.html` is the source of style.stevehoang.com. It holds
  placeholders the build fills: `<!--css-->`, `<!--js-->`, `<!--preload-->`,
  `<!--include:signature-->`, `<!--icon:name:set[:class]-->`,
  `<!--note:type-->` and `<!--code:lang:text-->`, so icons, notes and code
  blocks are real HTML for crawlers and readers without JavaScript.
- The build bundles `site/main.js` with its imports by wrapping each module in
  a function that returns its exports; imports become destructuring. Module
  basenames must stay unique.
- IndexNow: `site/<key>.txt` is the key file; `npm run site` posts the
  site's addresses to api.indexnow.org only when Cloudflare builds `main`
  (`WORKERS_CI_BRANCH`, or `CF_PAGES_BRANCH` on Pages). A failed ping is a warning.
- `site/og.png` is the social card: the title in Domaine on paper with grain,
  the seven day colours as a line, and the copyright, drawn at 1200×630. The
  head carries Open Graph, Twitter, `copyright` and one JSON-LD graph (the
  Person, the WebSite and the SoftwareSourceCode); the sitemap names the card.
- `robots.txt` allows every crawler, AI ones by name, with a Content-Signal
  line allowing search, AI input and training. Cloudflare's "Block AI bots"
  and managed robots.txt must stay off for the zone, or they override it.
- An alias maps a line name to its solid twin and only that way; a solid name
  is looked up as written.
- 2-space indent, LF, single quotes.
