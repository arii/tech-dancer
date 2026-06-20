# PR #2657 Review Feedback Summary

## 1. Code Review Bot Findings
- **File**: `src/components/ui/AffiliateCard.tsx`
  - **Issue**: Passing 'clamp' and 'display' props to Text component, which likely does not support them. This will cause runtime or type errors.
  - **Status**: new
  - **Recommended Action**: Replace 'clamp' and 'display' with appropriate CSS classes in 'className'.

- **File**: `src/components/ui/AffiliateCard.tsx`
  - **Issue**: Switched from `<Box as="img">` to `<img>`. If Box is required for styling or layout, this is a regression and will break appearance.
  - **Status**: new
  - **Recommended Action**: Restore `<Box as="img">` unless there is a documented reason to switch.

- **File**: `src/components/ui/AffiliateCard.tsx`
  - **Issue**: The value 'between' for the 'justify' prop is invalid. Should be 'space-between'.
  - **Status**: new
  - **Recommended Action**: Change 'justify="between"' to 'justify="space-between"'.

## 2. Visual Review Bot Findings
- **Route**: `/blog/2026-06-01-theme-wear-costumes-accessories (mobile)`
  - **Issue**: Reduced vertical spacing between 'Shop Selected Items' cards, impacting readability and touch accessibility.
  - **Recommended Action**: Recommend increasing spacing by 4px for improved usability. (Consider increasing the contrast of card backgrounds slightly).

- **Route**: `/blog/2026-06-14-the-story-behind-the-merch-page (mobile)`
  - **Issue**: Major visual regression detected with no accompanying DOM Text Diff. Widespread pixel changes across text, images, and cards.
  - **Recommended Action**: DOM Text Diff must be provided for all visual changes. Review layout, spacing, and contrast for potential regressions.

## 3. Immediate Action Plan
- [ ] Address Code Review findings in `src/components/ui/AffiliateCard.tsx` (remove clamp/display props on Text, restore Box for img, fix justify value).
- [ ] Address Visual Review findings for layout shifts (increase vertical spacing between Shop Selected Items cards by 4px on mobile).
- [ ] Investigate the visual regression and missing DOM diff on the merch page route, ensuring DOM diffs are generated for visual changes.
