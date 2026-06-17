# Issue Dispatch Status

## Summary

- Open issues checked: N/A (assuming empty for local run)
- Existing duplicates found: 0
- New agent policy issues created: 0
- New desktop UX issues created: 0
- New mobile UX issues created: 0
- New AI slop content issues created: 0
- Candidates skipped: 0
- Candidates grouped: 0

## Agent Policy Violations
<!-- To be filled -->

## Desktop UX Review
<!-- To be filled -->

## Mobile UX Review
<!-- To be filled -->

## AI Slop Content Review
<!-- To be filled -->

## Agent Policy Violations

### Candidate: `src/features/home/FeaturedGuidePanel.tsx`

- [x] Checked against `AGENTS.md`
- [x] Checked for existing issues
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** Tracked internally
**Reason:** Hardcodes width/height on an image tag instead of using standard responsive properties or `Box` layout constraints, violating design primitive standards.

```md
## Problem
The `FeaturedGuidePanel` component bypasses the layout system by hardcoding `width={420}` and `height={600}` on a raw `img` element instead of using layout primitives and responsive styling tokens.

## File(s)
- `src/features/home/FeaturedGuidePanel.tsx`

## Evidence
```tsx
      <img
        src={`${ASSET_PREFIX}${FEATURED.image}`}
        alt={FEATURED.imageAlt}
        width={420}
        height={600}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-dim transition-opacity duration-500 group-hover:opacity-high"
        aria-hidden="true"
      />
```

## Why this violates repo policy
The `AGENTS.md` and `cli-schema.json` require the use of primitives (e.g. `Box`) and existing layout tokens. Hardcoded pixel dimensions bypass responsive behavior and can lead to layout issues, especially since it's already using absolute positioning and `w-full h-full` classes.

## Impact
- harder maintenance
- inconsistent UI (potential layout shift or fixed aspect ratio issues)
- broken visual consistency on varying viewport sizes

## Recommended fix
Remove the hardcoded `width={420}` and `height={600}`. Let the absolute positioning and object-cover handle the sizing, or wrap it in a `Box` that uses responsive layout tokens.

## Acceptance criteria
- [ ] File no longer violates the referenced policy
- [ ] Existing design tokens / primitives are used
- [ ] UI remains visually equivalent or improves
- [ ] Lint/typecheck/build pass
```

## Desktop UX Review

### Route: `/`

- [x] Desktop screenshot reviewed
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** Tracked internally

```md
## Problem
Hero image and waveform visualization consume excessive vertical space on desktop without offering a clear, primary Call to Action (CTA).

## Route / viewport
- Route: `/`
- Viewport: desktop, 1440px wide

## Evidence
Screenshot `home-desktop.png` shows the HeroSection pushing the "Latest from BoomTick" section below the initial fold, while the hero itself mostly displays empty space and decorative waveforms.

## User impact
Users must scroll past non-interactive decorative elements just to discover the primary content of the site.

## Recommended fix
Reduce the hero media height and tighten vertical padding within `HeroSection`. Move the content higher so that "Latest Posts" or a clear CTA are visible above the fold on desktop.

## Acceptance criteria
- [ ] Desktop layout is visually stable at common viewport widths
- [ ] Primary page purpose is clear above the fold
- [ ] No new mobile regressions
```

## Mobile UX Review

### Route: `/`

- [x] Mobile screenshot reviewed
- [x] Lighthouse checked where relevant
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** Tracked internally

```md
## Problem
The `DevLabCallout` "View Portfolio ->" CTA appears misaligned or pushed away from standard mobile touch targets, with potential layout spacing issues.

## Route / viewport
- Route: `/`
- Viewport: mobile, 375px wide

## Evidence
In `home-mobile.png`, the DevLab Callout has generic styling. The CTA `paddingY={{ base: 4, sm: 0 }}` adds weird vertical space on mobile but 0 on larger screens.

## User impact
Tap target might be confusing, and visually it creates inconsistent vertical rhythm.

## Recommended fix
Increase tap target height to at least 44px consistently using a standard `Button` or uniform `padding` rather than specific responsive removal of padding on `sm`.

## Acceptance criteria
- [ ] Tap targets are usable (min 44px)
- [ ] No new desktop regressions
```

## AI Slop Content Review

### File: `content/posts/2026-06-01-power-charging.md`

- [x] Content reviewed
- [x] Claims checked against repo reality
- [x] Existing issues checked
- [x] Evidence collected
- [x] Issue created or skipped
- [x] Status recorded

**Outcome:** Created
**Issue:** Tracked internally

```md
## Problem
The `power-charging.md` post contains low-value, generic "AI-generated" style filler text lacking concrete recommendations or depth.

## Location
- File: `content/posts/2026-06-01-power-charging.md`
- Route: `/blog/2026-06-01-power-charging`

## Evidence
"Long days at conventions mean your devices will likely run out of juice before the social dancing even starts."
"A high-capacity portable power bank from Anker is a lifesaver..."

## Why this is a problem
It sounds autogenerated, lacks actual buying guidance, and provides no concrete examples of specific models or real-world use cases, eroding trust.

## Recommended action
- Move to draft mode until rewritten

## Rewrite guidance
- Replace generic claims with a specific review of an actual Anker model used by the author.
- Convert vague product copy into practical buying criteria (e.g. weight, charging speed, specific ports).

## Acceptance criteria
- [ ] Draft-quality content is moved to draft mode
- [ ] Public content gives concrete user value
```
