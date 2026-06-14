# Issue Dispatch Report

## 1. Summary of review coverage

- Audited `src/pages/Home.tsx` and its associated components (`GearShelf`, `FeaturedEventGuide`, `HeroSection`).
- Audited `src/features/events/EventsFeed.tsx`.
- Reviewed `AGENTS.md` and related memory contexts regarding deprecated components (`FolioGrid`, `GearShelf`, `FeaturedEventGuide`) and terminology shifts.
- Checked existing GitHub issues using `gh issue list`.

## 2. List of new issues created

- **#2237**: `Replace FolioGrid with ContentFeedSection in EventsFeed` (agent-policy-violation)
- **#2238**: `Remove GearShelf component and references from Home page` (agent-policy-violation, jules)
- **#2239**: `Remove FeaturedEventGuide component from Home page due to Event guide deprecation` (agent-policy-violation, jules)
- **#2240**: `Update Home Page tagline terminology (Event Guides/Gear Reviews -> Insights/Tools)` (desktop-ux-review, mobile-ux-review, jules)

## 3. Existing issues updated instead of duplicated

N/A - New issues were created as they address specific files/components that needed actionable fix instructions not fully detailed in the existing, broader decommissioning issues.

## 4. Candidates skipped and why

No viable candidates were skipped in this focused pass.

## 5. Most common AGENTS.md violations found

- Retention of decommissioned components (`FolioGrid`) despite memory context clearly stating they have been deprecated and replaced (`ContentFeedSection`).
- Dead code / stale UI sections remaining after major content deletions (Gear & Event guides).

## 6. Most common desktop UX problems found

- Outdated copy/terminology in high-visibility areas (Hero section tagline) causing potential user confusion when navigating to removed sections.

## 7. Most common mobile UX problems found

- Same as desktop (outdated tagline terminology).

## 8. Content quality / AI slop risks found

None explicitly identified in this audit pass.

## 9. Recommended fix order

1. #2240 (Tagline text update - quick, high visibility win)
2. #2238 (Remove GearShelf - prevents navigation to dead sections)
3. #2239 (Remove FeaturedEventGuide - prevents navigation to dead sections)
4. #2237 (Replace FolioGrid - improves maintainability)

## 10. Recommended labels or milestones

Labels `agent-policy-violation`, `desktop-ux-review`, `mobile-ux-review`, and `jules` were applied correctly to the generated issues.

## 11. Any follow-up audits needed

- Full audit of all other features (e.g., Blog, Profile, Journal) to ensure no other deprecated layout primitives (like FolioGrid) or dead links to decommissioned gear/events exist.
