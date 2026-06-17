# Issue Dispatch Report

## 1. Summary of review coverage
- Checked `AGENTS.md`, design system constraints, and general repo structure via `cli-schema.json`.
- Explored all core component configurations in `src/components/ui/` and layout primitive references.
- Captured and manually reviewed actual desktop (1440px) and mobile (375px) screenshots for the main route (`/`).
- Reviewed `content/posts/` and found specific examples of AI-generated content lacking value.

## 2. List of new issues created
1. `issues/agent-policy-violation.md` - `Fix hardcoded image dimensions in FeaturedGuidePanel`
2. `issues/desktop-ux-review.md` - `Reduce HeroSection vertical height to improve above-the-fold content visibility`
3. `issues/mobile-ux-review.md` - `Increase and standardize CTA tap target area in DevLabCallout`
4. `issues/ai-slop-content-review.md` - `Move power-charging.md to draft due to generic AI filler content`

## 3. Existing issues updated instead of duplicated
None (no relevant pre-existing issues were found tracking these specific UX or content anomalies).

## 4. Candidates skipped and why
- Did not create issues for minor padding differences in footer as they adhere to the standard token system anyway and lack user impact.
- Skipped creating an issue for about page text line-height as it seems generally bounded and follows `prose` defaults reasonably well.

## 5. Most common AGENTS.md violations found
The most common violation in new or unrefactored components appears to be **bypassing tokenized primitives in favor of specific inline values** (e.g. `width={420}`) on elements that should be fully responsive via utilities or wrapped in `Box`/`Stack` components.

## 6. Most common desktop UX problems found
Excessive vertical spacing and massive hero visual sections that push useful content below the fold.

## 7. Most common mobile UX problems found
Responsive configurations using conflicting padding logic across breakpoints (e.g., stripping vertical padding on `sm`) resulting in overly dense areas or inconsistent tap targets.

## 8. Content quality / AI slop risks found
Blog posts generated with repetitive, generic copy without real-world utility or specifics. Missing concrete recommendations in hardware/gear reviews.

## 9. Recommended fix order
1. P1: `desktop-ux-review` (`HeroSection` pushes critical content below the fold).
2. P1: `mobile-ux-review` (`DevLabCallout` has poor/inconsistent mobile tap targets).
3. P2: `agent-policy-violation` (`FeaturedGuidePanel` image dimensions).
4. P2: `ai-slop-content-review` (`power-charging.md` generic content).

## 10. Recommended labels or milestones
- `agent-policy-violation`: `tech-debt`, `UI`
- `desktop-ux-review`: `ux`, `desktop`
- `mobile-ux-review`: `ux`, `mobile`
- `ai-slop-content-review`: `content`, `cleanup`

## 11. Any follow-up audits needed
- Needs an audit of the remaining `content/posts/` to ensure no other draft-quality generic AI posts are published.
- Needs a full sweep of custom `<img>` tags to ensure they aren't hardcoding specific pixel widths instead of using tokens.
