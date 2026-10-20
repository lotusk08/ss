---
title: skills/ss/references stay exact upstream copies
impact: LOW
impactDescription: an upstream update is a copy, not a merge
tags: docs, skill, references, licence
enforced: review
---

## skills/ss/references stay exact upstream copies

The seven files in `skills/ss/references/` are claude-skill-awwwards' own (MIT,
credited in `skills/ss/NOTICE.md`), unchanged. Update them by copying upstream
again. Where they disagree with SS (pure white and black, GSAP, Lenis), say so
in `skills/ss/SKILL.md`, where SS wins; never edit the reference itself.

**Incorrect:**

```md
<!-- skills/ss/references/motion-design.md -->
- Use CSS scroll-driven animation instead of GSAP.
```

**Correct (as `skills/ss/SKILL.md` says it):**

```md
- Native first: CSS scroll-driven animation and View Transitions. GSAP only
  for a timeline CSS cannot express. No smooth-scroll library.
```
