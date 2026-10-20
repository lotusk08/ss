# Sections

The section ID (in parentheses) is the filename prefix of its rules.

## 1. Source of truth (source)

**Impact:** CRITICAL
**Description:** SS is the products' look gathered in one place. A value that no product ships, or one a product has since changed, makes SS a fork instead of a mirror, and every product that takes it drifts too. The owner and the agent are both sometimes wrong, so every value is also checked against current, well-known outside references.

## 2. One source, generated (gen)

**Impact:** CRITICAL
**Description:** Every format (CSS, SCSS, Tailwind, JSON, sprites) is generated from `src/`. A value written anywhere else is missing from every other format.

## 3. Contrast and modes (mode)

**Impact:** HIGH
**Description:** Both surfaces in both lights must stay readable, and a switch of light must be instant and correct in every browser SS supports without a build step.

## 4. Motion (motion)

**Impact:** HIGH
**Description:** SS moves with CSS and no library: one hover motion, nothing hidden waiting for a script, and nothing but fades under reduced motion.

## 5. Type and glyphs (type)

**Impact:** MEDIUM
**Description:** Domaine's descenders, Vietnamese stacked marks and Newsreader's italic overhang reach outside the box; commercial faces stay out of the repository.

## 6. Icons (icon)

**Impact:** MEDIUM
**Description:** Icons from different sources must read as one set: one sizing rule, one precision, one builder.

## 7. The site (site)

**Impact:** MEDIUM
**Description:** style.stevehoang.com shows SS; it is not a copy of the blog, and it must read without JavaScript.

## 8. Docs (docs)

**Impact:** HIGH
**Description:** The code carries no comments, so the docs are the only place the origin of a value lives. A stale origin line is how the next change goes wrong.
