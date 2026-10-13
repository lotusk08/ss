# Mapping

Each SS token next to the name it has today in each product. Moving a product
onto SS is a find-and-replace down its column. A dash means the product has no
such token. `≈` means the product's value is close to SS but not the same; the
note under the table says what to keep.

Products: **site** is stevehoang.com, **write** is write, **why** is Think Why?,
**think** is Think tree, **io** is IO.

## Colors

| SS                | site                             | write             | why                         | think            | io                        |
| ----------------- | -------------------------------- | ----------------- | --------------------------- | ---------------- | ------------------------- |
| `--ss-bg`         | `--bg` ≈                         | `--bg`            | `--main-bg` ≈               | `--bg-color` ≈   | `--ux-ground` ≈           |
| `--ss-bg-2`       | `kbd` `--bg` ≈                   | `--panel`         | `--kbd-bg-color`, `--canvas-node-bg` ≈ | —     | `--ux-surface`            |
| `--ss-ui`         | `--border`                       | `--border`        | `--main-border-color`, `--btn-border-color` ≈ | `--border-color` ≈ | `--ux-line` |
| `--ss-ui-2`       | `--link-bd`                      | `--border-strong` | `--input-focus-border-color` ≈ | —             | `--ux-line-strong`        |
| `--ss-ui-3`       | `--hover`                        | `--hover`, `--sunken` | `--site-hover-bg`       | —                | `--ux-hover`, `--ux-sunken` |
| `--ss-tx-3`       | `--muted`                        | `--faint`         | `--text-muted-color`        | `--icon-color` ≈ | `--ux-ink-4`              |
| `--ss-tx-2`       | `--fg`                           | `--muted`         | `--text-color` ≈            | —                | `--ux-ink-2`, `--ux-ink-3` |
| `--ss-tx`         | `--heading`                      | `--text`          | `--heading-color` ≈         | `--text-color` ≈ | `--ux-ink-1`              |
| `--ss-icon`       | `--icon`                         | —                 | `--site-btn-color` ≈        | —                | —                         |
| `--ss-accent`     | `--accent`                       | `--accent` ≈      | `--primary-color`           | `--bullet-color` ≈ | `--ux-accent` ≈         |
| `--ss-accent-2`   | `--accent2`                      | —                 | `--secondary-color`         | `--link-color`   | `--ux-accent-ink` ≈       |
| `--ss-on-accent`  | —                                | `--accent-text`   | —                           | —                | `--ux-on-accent`          |
| `--ss-ring`       | —                                | `--ring`          | —                           | —                | —                         |
| `--ss-selection`  | `--select`                       | `::selection` mix | `--selection-color`         | —                | `--color-selection`       |
| `--ss-scrim`      | —                                | —                 | —                           | —                | `--ux-scrim`              |
| `--ss-tooltip`    | `--tip-bg`                       | —                 | `--tooltip-bg`              | —                | —                         |
| `--ss-tip`        | `blockquote.tip` `--note-bd`     | —                 | —                           | —                | `--ux-positive`           |
| `--ss-info`       | `blockquote.info` `--note-bd`    | —                 | —                           | —                | `--color-info`            |
| `--ss-important`  | `blockquote.key` `--note-bd`     | —                 | —                           | —                | `--color-important`       |
| `--ss-warning`    | `blockquote.warn` `--note-bd`    | —                 | —                           | —                | `--ux-warning`            |
| `--ss-danger`     | `blockquote.risk` `--note-bd`    | `--danger`        | `--danger-color` ≈          | —                | `--ux-critical`           |
| `--ss-*-bg`, `--ss-*-icon` | `--note-bg`, `--note-icon` | —            | —                           | —                | `--ux-*-soft`             |
| `--ss-shadow-card`| `--shadow`                       | `--shadow-card`   | —                           | —                | —                         |
| `--ss-shadow-pop` | —                                | `--shadow-pop`    | `--menu-shadow` ≈           | —                | `--ux-float-shadow`       |

What the `≈` rows keep:

- The site and why paint the page `#ffffff` / `#000000` under the grain, with
  soft grey ink. That is the Paper surface: set `<html data-surface="paper">`
  and every role takes the blog's own value, ink and hairlines included.
- The site's dark text and headings are now `#b8b8b8` / `#c5c5c5` and its
  light text `#6d6c6c`; why still draws the older `#cecdcd`, `#d7d5d3` and
  `#6f6f6f`, its button line the older `#efefef` / `#292929` (the site merged
  it into `--border`), its icons `#787878` in dark (the site's `#757575`) and
  its danger `#e5484d` in dark. Moving why onto Paper takes the site's.
- The site's `kbd` fill is `#262626` in dark; `--ss-bg-2` keeps why's
  `#242424`, where ember links still pass 4.5:1. why's canvas nodes are darker,
  `#141414`.
- why's pop-up shadow is `0 2px 10px` at 15% and 50% black; SS's is write's.
- think's ink is `#494949` / `#e8e8e8`, its lines `#e0e0e0` / `#404040`, its
  icons `#757575` / `#9e9e9e` and its bullet `#026be6` / `#ff6800`.
- think's paper is warmer, `#fcfcf9` / `#1a1a1a`; IO's greys lean blue (oklch
  hue 255). Both move to SS's neutral greys.
- write's accent is purple (`#6a00f5` / `#a882ff`): that is SS's `--ss-important`
  family. Keep it as write's own accent by setting `--ss-accent` in write, or
  move write to blue and ember like the rest.
- IO's accent is an oklch blue and amber close to SS's blue and ember.

## Surfaces

| SS | site | why | think | write | io |
| -- | ---- | --- | ----- | ----- | -- |
| `data-surface="paper"` | yes | yes, with its older ink | yes, with its warmer paper | — | — |
| Desk (no attribute) | — | — | — | yes | yes |

## Type and shape

| SS                    | site                          | why                | write              | io                         |
| --------------------- | ----------------------------- | ------------------ | ------------------ | -------------------------- |
| `--ss-font-sans`      | `--f-sans`                    | `--font-sans`      | `--font-ui`        | `--ux-font-ui`             |
| `--ss-font-ui`        | `--f-ui`                      | `--font-ui`        | —                  | —                          |
| `--ss-font-serif`     | `--f-serif`                   | `--font-serif`     | —                  | `--ux-font-display`        |
| `--ss-font-mono`      | `--f-mono`                    | —                  | `--font-mono`      | `--ux-font-mono`           |
| `--ss-font-title`     | `--f-title`                   | —                  | —                  | `--font-title`             |
| `--ss-font-figure`    | `--f-date`                    | —                  | —                  | —                          |
| `--ss-root-size`      | `t.$root`                     | `:root` font-size  | —                  | —                          |
| `--ss-text-*`         | —                             | —                  | —                  | `--ux-text-*`, `--text-*`  |
| `--ss-display-*`      | —                             | —                  | —                  | `--ux-display-*`           |
| `--ss-label-*`        | —                             | —                  | —                  | `--ux-label-*`             |
| `--ss-space-*`        | —                             | —                  | —                  | `--space-*`                |
| `--ss-radius-xs` 2px  | `t.radius(tiny)`              | —                  | —                  | `--ux-radius-s`            |
| `--ss-radius-sm` 4px  | `t.radius(sm)` ≈              | `--radius-xs`      | —                  | `--ux-radius-m`            |
| `--ss-radius-md` 6px  | `t.radius(md)` ≈              | —                  | `--radius-sm`      | `--ux-radius-l`            |
| `--ss-radius-lg` 8px  | —                             | —                  | `--radius`         | `--ux-radius-xl`           |
| `--ss-radius-xl` 10px | `t.radius(lg)` ≈              | `--radius-lg`      | —                  | —                          |
| `--ss-radius-2xl` 14px| `t.radius(xl)` ≈              | —                  | `--radius-lg`      | —                          |
| `--ss-ease-out`       | —                             | —                  | —                  | `--ux-ease-out`            |
| `--ss-ease-hover`     | `t.ease(in-out)`              | —                  | —                  | —                          |
| `--ss-ease-quart`     | `t.ease(out)`                 | —                  | —                  | —                          |
| `--ss-ease-spring`    | `t.$spring`                   | —                  | —                  | —                          |
| `--ss-dur-hover`      | `t.time(slow)`, `t.$answer`   | —                  | —                  | —                          |
| `--ss-dur-*`          | `t.time()`                    | `--motion` ≈       | —                  | `--ux-dur-*`               |
| `--ss-tap-target`     | `$-tap`                       | —                  | —                  | `--ux-control-h-touch`     |
| `--ss-control-h`      | —                             | —                  | `.btn` height      | `--ux-control-h`           |
| `--ss-z-*`            | `t.z()`                       | —                  | —                  | `--ux-z-*`                 |

The site's radii are shares of its line (⅛, ⅕, ⅓ and ½ of it, 3.7, 6, 9.9
and 14.9px at 1440 wide), so they grow with its fluid text; SS keeps fixed
pixels, the nearest to them, which the apps use.

## Modes

| SS                                | site                    | write                | why                   | think                  | io                     |
| --------------------------------- | ----------------------- | -------------------- | --------------------- | ---------------------- | ---------------------- |
| `data-mode` on `<html>`           | `data-mode`             | `data-theme`         | `data-mode`           | `data-theme`           | `data-mode`            |
| `localStorage` `mode`             | `localStorage` `mode`   | —                    | `sessionStorage` `mode` ≈ | `localStorage` `theme` | `localStorage` + cookie `mode` |
| system change clears the choice   | yes                     | —                    | only when it matches  | only while none is saved | —                  |
| `data-switching` for two frames   | yes                     | —                    | —                     | —                      | —                      |
| `theme-color` `#f7f7f8` / `#0d0d0d` | `#ffffff` / `#000000` | —                    | `#ffffff` / `#000000` | `#fcfcf9` / `#1a1a1a`  | `#f7f7f8` / `#0d0d0d`  |

## UI classes

| SS                  | write                  | site                    | io                     |
| ------------------- | ---------------------- | ----------------------- | ---------------------- |
| `.ss-btn`           | `.btn`                 | —                       | `Button` primitive     |
| `.ss-btn.primary`   | `.btn.primary`         | —                       | —                      |
| `.ss-btn.ghost`     | `.btn.ghost`           | —                       | —                      |
| `.ss-btn.icon`      | `.btn.icon`            | —                       | —                      |
| `.ss-btn.small`     | `.btn.tiny`            | —                       | —                      |
| `.ss-input`         | `.input`               | —                       | —                      |
| `.ss-field`         | `.field`               | —                       | —                      |
| `.ss-hint`          | `.hint`                | —                       | —                      |
| `.ss-check`         | `.switch`              | —                       | —                      |
| `.ss-segment`       | `.toggle`              | —                       | `ToggleButton`         |
| `.ss-pop`           | `.popover`             | —                       | —                      |
| `.ss-toast`         | `.toast`               | —                       | —                      |
| `.ss-tip`           | —                      | `.tooltip-container`    | —                      |
| `.ss-note`          | —                      | `blockquote.tip` … (`{: .tip }`, `.info`, `.key`, `.warn`, `.risk`) | — |
| `.ss-mode`          | —                      | `#mode-toggle`          | —                      |
| `.ss-top`           | —                      | `#back-to-top`          | —                      |
| `.ss-pager`         | —                      | `.post-navigation`      | —                      |
| `kbd`               | —                      | `kbd`                   | —                      |

## Icons

The line set is IO's and write's (24px grid, 1.6 stroke). The solid set is
Font Awesome Free, as the site, why and think use it. A line name passed to the
solid set is translated:

| Line (`set: 'line'`) | Solid (`set: 'solid'`) |
| -------------------- | ---------------------- |
| `close`              | `xmark`                |
| `chevron-up`         | `angle-up`             |
| `chevron-down`       | `angle-down`           |
| `chevron-left`       | `angle-left`           |
| `chevron-right`      | `angle-right`          |
| `circle-alert`       | `circle-exclamation`   |
| `triangle-alert`     | `triangle-exclamation` |
| `external`           | `out-link`             |
| `copy`               | `clone`                |
| `edit`               | `pen`                  |
| `bullet-list`        | `list-ul`              |

Names both sets share as they are: `calendar`, `check`, `circle-check`,
`code`, `download`, `lightbulb`, `link`, `minus`, `moon`, `plus`, `search`,
`sun`, `trash`.

think loads Font Awesome 6.7.2 from a CDN by class (`fa-pen`, `fa-eye`,
`fa-file-export`, `fa-file-pdf`, `fa-file-image`, `fa-sun` …); with SS it takes
the same icons, under the same names, from `ss/icons` or `ss/icons/solid.svg`.
why's `pdf` is SS's `file-pdf`; why's `share` (Font Awesome's
`arrow-up-from-bracket`) is not SS's `share`, which is the site's.
