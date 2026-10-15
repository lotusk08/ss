# CLAUDE.md

ss, Simple Style: the design tokens, icons, components, art and motion Steve
Hoang's products (stevehoang.com, write, Think Why?, Think tree, Things, IO) share,
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
behind it, no search. Its chrome is the blog's back-to-top diamond, which
counts how much has been read, and the horizon veil at the top and bottom of
the screen. Add a section before adding chrome.

The code carries no comments. What a piece is for, and where its values came
from, is written here instead.

## Commands

- `npm run build` — writes `dist/ss.css`, `dist/ss.scss`, `dist/tailwind.css`
  and `dist/tokens.json` from `src/palette.js`, and the icon sprites and single
  files under `dist/icons/` from `src/icons/`.
- `npm run site` — writes `_site/` for style.stevehoang.com: `site/index.html`
  with every stylesheet and script inlined, the fonts, icons, tokens, the
  photos and video in `site/media/`,
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

- Paper: the blog's own values from its `themes/colors.scss`: `--bg`,
  `--heading`, `--fg`, `--muted`, `--icon`, `--border`, `--link-bd`,
  `--hover`, the callouts' `--note-fg`, `kbd`'s `--border`, `--title`,
  `--shadow`. Its dark text is `#b8b8b8` and headings `#c5c5c5` (brighter
  ones glared on black), and it merged its button line into `--border`, so SS
  has no `--ss-btn-line`. The one value kept apart is the dark panel,
  `--ss-bg-2` `#242424` (why's `--kbd-bg-color`): the blog's `kbd` fill moved to
  `#262626`, where ember links fall under 4.5:1. Desk is the apps': write's
  and IO's near-black ink on near-white.
- Notes: the blog's callouts (`blockquote.tip`, `.info`, `.key`, `.warn`,
  `.risk`) exactly — rule colours, washes, icon colours, the 0.2em rule,
  `0.8em 1.2em 0.8em 0.8em` padding (half a line, three quarters on the
  icon's side), the solid icon at `right: 0.75em; bottom: 1em`, the info icon
  turned 180°, square corners. They stay in the text column on a phone; the
  blog stopped bleeding them to the screen's edges.
- Components: the blog's mode button (a disc whose clip path slides over it
  into a crescent, 0.5s on its spring `cubic-bezier(0, 0, 0.15, 1.25)`, the
  icon at half opacity until hovered; `modeIcon()` writes it, one clip id per
  button), breadcrumb (only the first link in `--ss-accent-2`), underlined
  search, the 3px dot, `kbd` with its inset shadow, code block header,
  back-to-top diamond with its 160-unit progress square (drawn by a scroll
  timeline where there is one), its odometer percentage (each digit a strip
  rolled 0.4s on `--ss-ease-quart`, read at most ten times a second) and its
  arrow that turns accent on hover, footer, archive timeline and `hover-fade`
  (the rest dim to 0.3).
- Hover: every hover is the blog's one motion, `--ss-dur-hover` (0.3s) on
  `--ss-ease-hover`, the same in as out; a press (`:active`) is at once.
  Hover rules sit under `(hover: hover)` so a tap leaves nothing lit. The
  tooltip is the blog's: 0.658rem on `--ss-tooltip`, a 0.55em arrow, growing
  from 0.9 at its arrow over 0.1s on `--ss-ease-quart` (fading only under
  reduced motion); on a link or button it opens on a mouse hover or keyboard
  focus, on plain text on any hover.
- Swap: `.ss-swap` is the mode button made general: the same round 1.75rem
  button and hover (no outline, no fill, `--ss-accent` on hover), and the
  0.5s turn (`rotate(70deg) scale(0.55)`) between faces that the blog's sun
  and moon had and why's still has. The first face carries `on` in the markup, so
  nothing turns on load. Two or three states; past that, a segment or menu.
  `dynamic()` drives the same button from context: the first feature whose
  `when()` holds wins, checked on the next frame after selection, scroll,
  resize and online changes. It stops `mousedown` so a click keeps the
  reader's selection.
- Pager and page switch: `.ss-pager` is `PostNav.vue` and its
  `.post-navigation` rules (the gradient line growing from each edge on the
  hover motion, the labels, the line in `--ss-ui`);
  `.ss-slide` is `motion.scss`'s `slide-enter` (a third of a line up, 600ms on
  `ease`, 60ms a child for twenty), which runs only once
  `navigated` is on `<html>`, so the first paint never waits on it.
- Art: `ArtPlum.vue` and `ArtFluid.vue` ported to plain JavaScript in
  `js/art.js`, constants unchanged (fluid's calmer amplitude, 0.3 to 0.45,
  and 112 cells across in portrait); where a cell is 4px or more the fluid
  canvas is blurred by three quarters of a cell, as the blog's `.soft`.
  `.ss-art` is the blog's `#art`.
- Things (thing.stevehoang.com, built on SS): the segment's sliding pill
  (`pill()`: one `::before` placed from the pressed or selected button, moving
  over `--ss-dur-small` on `--ss-ease-out` once it has been placed, so it never
  slides in on load), the "Load demo" sheen (`.ss-sheen`: a 100° accent band
  through `currentcolor`, 3.6s on `--ss-ease-hover`, resting from 55%; none
  under reduced motion or forced colours), and its fade-through
  (`through()` and `.ss-through`: the old view out over `--ss-dur-micro` on
  `ease`, the new in over `--ss-dur-enter` on `--ss-ease-quint` from halfway,
  as a View Transition). Its rule that readable text uses `--ss-tx-2` or
  stronger, `--ss-tx-3` only for placeholders and marks, is in the skill.
- Media (`css/media.css`, `js/media.js`), each value from where it ships:
  - `.ss-gallery` is the blog's `Carousel.vue` and `.carousel` (itself
    Paco Coursey's paco.me/craft/carousel): snap to the middle with
    `snap-stop: always`, half-width spacers at both ends, the others
    `grayscale(1) opacity(40%) blur(2px)` at `scale(0.95)` over 0.4s on `ease`
    (only the filter under reduced motion), cursors pointing the way to go,
    the middle one picked 70ms after the scroll stops. Tapping one scrolls the
    row only, as Things centres its tabs, never the page.
  - `.ss-develop` is the blog's `reveal`: from `blur(20px)` through a
    `brightness(2)` flash at 10% to clear, 600ms on `--ss-ease-quart`, once a
    late photo has loaded and is in view. `develop()` hides it, CSS never does.
  - `--ss-media-gradient` is the blog's `--img-bg`.
  - `.ss-veil` and `.ss-horizon` are paco.me's `.blur` and its craft pages'
    edges: `blur(5px)` at 0.95, masked from 25% to nothing, over a gradient of
    the page colour, 96px at the screen's edges (as tall as his page's top)
    and 64px on a box. The horizon fades in over the first 96px of scroll and
    out over the last, where scroll timelines exist; without them it is
    always on, and the site lifts its top bar above it. A page with a
    horizon gets `scroll-padding-block` as tall, so an anchor lands clear.
  - `.ss-zoom` is paco.me/craft/image: the photo scales from its top to fill
    the screen less 48px, centred, over 0.48s on `ease`, scrolling to 48px
    from the top; the margin under it grows so the caption follows.
  - `.ss-video` is paco.me/craft/video's control: dark glass
    (`blur(10px) brightness(0.8)` over 40% of `--ss-tooltip`), hidden 40% down
    while it plays and shown in 100ms under the pointer. Playing in view
    (half of it) and pausing off screen is UI Skills' rule for loops.
  - The 4px blur of `.ss-crossfade`, `.ss-enter.blur` and `.ss-reveal.blur`
    is shud.in's `appear` and `hide`; the crossfade's times are Things'.
  - `.ss-frame`'s hairline over the photo and the reserved aspect ratio are
    UI Skills' (`outline-images-neutrally`, `reserve-space-with-aspect-ratio`);
    `--ss-frame` is 10% of the ink. The 3% hover zoom of `.ss-frame.zoom` is
    the one value new here.
  - The photos and the video in `site/media/` are SS's own fluid and plum art,
    drawn in the accent hues; the video is one full turn of the fluid field,
    so it loops without a seam.
- Text: `text-wrap: balance` on headings is the blog's; `pretty` on
  paragraphs is UI Skills' and shud.in's.
- Move: `.ss-move` is why's way in and out (its `.sheet`, `.tips`, toast and
  `dialog`): hidden until `.show` or `[open]` (or `:popover-open`), entering
  over `--ss-dur-enter` (why's `--motion`, 240ms) on `--ss-ease-quint` (why's
  `--ease-out`) and leaving faster, over `--ss-dur-leave` (180ms) on `ease`,
  `visibility` riding along so it stays seen until the fade ends. Alone it
  fades; `.up`, `.down`, `.left` and `.right` travel that way into place over
  `--ss-move-by` (8px, why's sheet; 12px on a `dialog`, why's dialog) and back
  the way they came; `.in` grows from 0.98 (why's sheet), `.out` settles from
  1.02; `.whole` travels the element's own size and 2em, as think's editor
  panel slides from the left; `.wide` and `.tall` open in place from nothing
  and push their neighbours, as why's undo and redo slide in (grid tracks,
  with the padding, margin and border taken to 0 while hidden; the content
  is one child). A `dialog` and a popover come in through `@starting-style`
  and stay drawn while they leave (`display` and `overlay` as
  `allow-discrete`), the dialog's backdrop blurring 5px under 8% black, as
  why's. Under reduced motion only the fade is left. `enter()` and `leave()` in
  `js/motion.js` are for what a script adds and removes: `enter()` settles the
  hidden state first, so a direction changed while hidden does not glide.
- Grain: the blog's `paper-grey.png`, a 300px tile of mid-grey ink drawn at
  100px as `body.ss-grain::after` at `z-index: -1`, so it lies over the art
  and under the text and the one tile darkens white and lightens black alike.
- Signature: the path of the blog's `Logo.vue`, drawn with the home page's
  15-second `grow` animation. The favicons and `apple-touch-icon.png` in
  `site/` are the blog's.
- Syntax: the blog's ayu highlighting, its `.highlight` roles in
  `themes/colors.scss`, grouped into `--ss-syntax-*` roles by what
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
  fluid root size are why's. Newsreader italic 500 is the blog's, for a bold
  italic inside a heading, so no weight is faked. Domaine is `font-display:
  block` on the site, as on the blog: Safari drew a cached `swap` face's
  fallback first.
- Space, radius, easing, durations, z-index: io's `ux/tokens.css`, with the site's
  10px and write's 14px radii. The blog's own curves are `--ss-ease-hover`
  (`0.645, 0.045, 0.355, 1`, its in-out), `--ss-ease-quart` (`0.165, 0.84,
  0.44, 1`, its out) and `--ss-ease-spring`. The blog's radii are now shares
  of its line (⅛, ⅕, ⅓, ½); SS keeps fixed pixels, which its apps use.
- Mode: `data-mode` and the `mode` key, as the site, why and io name them; a
  choice equal to the system is dropped, and a change of the system's mode
  clears the choice, as the blog does.
- Line icons: IO's `icons/paths.ts` (stroke 1.6), then write's `Icons.tsx`
  for the names IO lacks, camelCase turned kebab-case. write drew them at 1.7;
  they are drawn at IO's 1.6 here.
- Solid icons: the site's `icons.svg` sprite (Font Awesome Free 6.7.2), then
  why's `icons.js` for the names the site lacks (`image` and `vector` among
  them; why's `share` is another glyph than the site's and is left out), then
  Font Awesome Free 6.7.2 itself for the classes think uses that no product
  had as a path: `eye`, `file-export`, `file-image` and `file-pdf` (why's `pdf`),
  and `play` and `pause` (the video's button). `io`, `things`, `why` and
  `think` are the apps' own marks, their favicons in one colour: IO's `i`
  and `o`; Things' "T." from its `static/favicon.svg`, framed as `io` is;
  and the tree Think Why? and Think tree share as their favicon, `why` the
  tree alone and `think` the tree in a rounded square drawn as one pixel at
  any size (`vector-effect: non-scaling-stroke`), set 8 units in so the line
  is not cut at 16px. The tree is written once (`tree` in `solid.js`), the
  favicon's path at 0.1 unit through svgo; at whole units its leaves bent.
  The other apps in the site's footer keep a Font Awesome icon: write's
  favicon is the blog's, Page carries tldraw's and EPUB fix has none.
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
- No theme-switch transition: `setMode()` sets `data-switching` on `<html>`
  for two frames and `base.css` turns every transition off under it, but for
  the mode button's path, as the blog does; hover transitions would otherwise
  trail the page's colour.
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
- Mode is kept in `localStorage`, as the blog keeps it now: the choice holds
  across tabs and visits until the system's mode changes.
- Modes are written three times in `ss.css`: light on `:root`, dark under
  `prefers-color-scheme` unless `data-mode='light'`, and dark on
  `data-mode='dark'`. `light-dark()` would say it once but needs Safari 17.5;
  the blog lowers it with Lightning CSS, and SS ships CSS with no build.
- Every `theme-color` meta is replaced on a mode change: a meta with a `media`
  matching the system wins over one without, so setting a plain one did
  nothing.
- `icon()` builds every SVG, in the browser and in the build; the single files
  under `dist/icons/` are its output with the class and aria attributes taken
  off. The sprites leave stroke and fill to `css/icons.css`, so a `<use>` takes
  `--ss-icon-stroke` and the text colour.
- UI Skills (MIT, credited in `skills/ss/NOTICE.md`), paco.me and shud.in
  give values and rules where the products had none; they never override a
  product. UI Skills' press scale (0.96) is left out: the blog's press is at
  once and does not shrink. Its solid modal scrim is left out: why blurs the
  page behind a dialog.
- Nothing in `motion.css` starts hidden waiting for a script, but `.ss-move`,
  which is for what comes and goes (menus, sheets, dialogs, toasts) and is
  never put on what should be there on load. Scroll reveals
  run only under `@supports (animation-timeline: view())`; elsewhere the
  element is simply there. Load animations finish within a second. A scroll
  timeline ignores `animation-delay`, so `.ss-stagger` staggers by shifting
  `animation-range` with `--i` instead.
- `.ss-gradient-title` is padded 0.25em above, 0.1em at the sides and 0.15em
  below, and pulled back by as much, so nothing moves: `background-clip: text`
  paints only inside the box, and at a 1.05 leading Domaine's descenders
  reached 0.065em below it (the `p` and `y` of the title were cut), stacked
  Vietnamese marks (`Ẩ`, `Ỷ`) 0.2em above, and the italic past its sides
  where the box is as wide as the text (the social card's last `e`).
- `.ss-mask` clips with `clip-path: inset()` and negative side insets, not
  `overflow: hidden`, which cut the overhang of Newsreader's italic.
- `site/index.html` is the source of style.stevehoang.com. It holds
  placeholders the build fills: `<!--css-->`, `<!--js-->`, `<!--preload-->`,
  `<!--include:signature-->`, `<!--icon:name:set[:class]-->`, `<!--mode-->`,
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
