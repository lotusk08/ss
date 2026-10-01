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
| `--ss-bg`         | `--main-bg` ≈                    | `--bg`            | `--main-bg` ≈               | `--bg-color` ≈   | `--ux-ground` ≈           |
| `--ss-bg-2`       | —                                | `--panel`         | `--canvas-node-bg`          | —                | `--ux-surface`            |
| `--ss-ui`         | `--main-border-color`            | `--border`        | `--btn-border-color`        | `--border-color` | `--ux-line`               |
| `--ss-ui-2`       | `--input-focus-border-color`     | `--border-strong` | `--input-focus-border-color`| —                | `--ux-line-strong`        |
| `--ss-ui-3`       | `--site-hover-bg`                | `--hover`, `--sunken` | `--site-hover-bg`       | —                | `--ux-hover`, `--ux-sunken` |
| `--ss-tx-3`       | `--text-muted-color`             | `--faint`         | `--text-muted-color`        | `--icon-color`   | `--ux-ink-4`              |
| `--ss-tx-2`       | `--text-color`                   | `--muted`         | `--text-color`              | —                | `--ux-ink-2`, `--ux-ink-3` |
| `--ss-tx`         | `--heading-color`                | `--text`          | `--heading-color`           | `--text-color`   | `--ux-ink-1`              |
| `--ss-accent`     | `--primary-color`                | `--accent` ≈      | `--primary-color`           | `--bullet-color` | `--ux-accent` ≈           |
| `--ss-accent-2`   | `--secondary-color`              | —                 | `--secondary-color`         | `--link-color`   | `--ux-accent-ink` ≈       |
| `--ss-on-accent`  | —                                | `--accent-text`   | —                           | —                | `--ux-on-accent`          |
| `--ss-ring`       | —                                | `--ring`          | —                           | —                | —                         |
| `--ss-selection`  | `--selection-color`              | `::selection` mix | `--selection-color`         | —                | `--color-selection`       |
| `--ss-scrim`      | —                                | —                 | —                           | —                | `--ux-scrim`              |
| `--ss-tooltip`    | tooltip `rgb(16 16 16 / 95%)`    | —                 | `--tooltip-bg`              | —                | —                         |
| `--ss-tip`        | `--note-tip-border-color`        | —                 | —                           | —                | `--ux-positive`           |
| `--ss-info`       | `--note-info-border-color`       | —                 | —                           | —                | `--color-info`            |
| `--ss-important`  | `--note-important-border-color`  | —                 | —                           | —                | `--color-important`       |
| `--ss-warning`    | `--note-warning-border-color`    | —                 | —                           | —                | `--ux-warning`            |
| `--ss-danger`     | `--note-danger-border-color`     | `--danger`        | `--danger-color`            | —                | `--ux-critical`           |
| `--ss-*-bg`       | `--note-*-bg`                    | —                 | —                           | —                | `--ux-*-soft`             |
| `--ss-shadow-card`| `--card-shadow`                  | `--shadow-card`   | —                           | —                | —                         |
| `--ss-shadow-pop` | —                                | `--shadow-pop`    | `--menu-shadow`             | —                | `--ux-float-shadow`       |

What the `≈` rows keep:

- The site and why paint the page `#ffffff` / `#000000` under the grain, with
  soft grey ink. That is the Paper surface: set `<html data-surface="paper">`
  and every role takes the blog's own value, ink and hairlines included.
- think's paper is warmer, `#fcfcf9` / `#1a1a1a`; IO's greys lean blue (oklch
  hue 255). Both move to SS's neutral greys.
- write's accent is purple (`#6a00f5` / `#a882ff`): that is SS's `--ss-important`
  family. Keep it as write's own accent by setting `--ss-accent` in write, or
  move write to blue and ember like the rest.
- IO's accent is an oklch blue and amber close to SS's blue and ember.

## Surfaces

| SS | site | why | think | write | io |
| -- | ---- | --- | ----- | ----- | -- |
| `data-surface="paper"` | yes | yes | yes, with its warmer paper | — | — |
| Desk (no attribute) | — | — | — | yes | yes |

## Type and shape

| SS                    | site / why                    | write              | io                         |
| --------------------- | ----------------------------- | ------------------ | -------------------------- |
| `--ss-font-sans`      | `--font-sans`                 | `--font-ui`        | `--ux-font-ui`             |
| `--ss-font-ui`        | `--font-ui`                   | —                  | —                          |
| `--ss-font-serif`     | `--font-serif`                | —                  | `--ux-font-display`        |
| `--ss-font-mono`      | `$font-monospace`             | `--font-mono`      | `--ux-font-mono`           |
| `--ss-font-title`     | `$font-title`                 | —                  | `--font-title`             |
| `--ss-font-figure`    | `$font-times`                 | —                  | —                          |
| `--ss-root-size`      | why `:root` font-size         | —                  | —                          |
| `--ss-text-*`         | —                             | —                  | `--ux-text-*`, `--text-*`  |
| `--ss-display-*`      | —                             | —                  | `--ux-display-*`           |
| `--ss-label-*`        | —                             | —                  | `--ux-label-*`             |
| `--ss-space-*`        | —                             | —                  | `--space-*`                |
| `--ss-radius-xs` 2px  | —                             | —                  | `--ux-radius-s`            |
| `--ss-radius-sm` 4px  | `$radius-xs`, `--radius-xs`   | —                  | `--ux-radius-m`            |
| `--ss-radius-md` 6px  | —                             | `--radius-sm`      | `--ux-radius-l`            |
| `--ss-radius-lg` 8px  | —                             | `--radius`         | `--ux-radius-xl`           |
| `--ss-radius-xl` 10px | `$radius-lg`, `--radius-lg`   | —                  | —                          |
| `--ss-radius-2xl` 14px| —                             | `--radius-lg`      | —                          |
| `--ss-ease-out`       | —                             | —                  | `--ux-ease-out`            |
| `--ss-ease-swap`      | `$ease-swap`, `--ease-swap`   | —                  | —                          |
| `--ss-dur-*`          | —                             | —                  | `--ux-dur-*`               |
| `--ss-tap-target`     | `$tap-target-size`            | —                  | `--ux-control-h-touch`     |
| `--ss-control-h`      | —                             | `.btn` height      | `--ux-control-h`           |
| `--ss-z-*`            | —                             | —                  | `--ux-z-*`                 |

## Modes

| SS                                | site                    | write                | why                   | think                  | io                     |
| --------------------------------- | ----------------------- | -------------------- | --------------------- | ---------------------- | ---------------------- |
| `data-mode` on `<html>`           | `data-mode`             | `data-theme`         | `data-mode`           | `data-theme`           | `data-mode`            |
| `sessionStorage` `mode`           | `sessionStorage` `mode` | —                    | `sessionStorage` `mode` | `localStorage` `theme` | `localStorage` + cookie `mode` |
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
| `.ss-note`          | —                      | `.note-*` (`{: .note-tip }`) | —                 |
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

think loads Font Awesome from a CDN by class (`fa-pen`, `fa-sun` …); with SS it
takes the same icons from `ss/icons` or `ss/icons/solid.svg`.
