# GitHub Issue Audit Status

## Summary

- Total open issues reviewed: 22 / 22
- Issues recommended to keep open: 12
- Issues recommended for clarification: 0
- Issues recommended to merge: 10
- Issues recommended to close: 0
- Issues blocked by PRs or other work: 0

## Issue Checklist

### Issue #1985 — Empty "ultimate guide" style language without substance that acts as a placeholder for a future guide.

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current codebase checked
- [x] Labels / milestone / priority reviewed
- [x] Recommended action recorded
- [x] Final audit note written

**Recommendation:** Keep open
**Reason:** Content issue with placeholder 'coming soon' text in financial literacy post. Needs to be moved to draft mode or rewritten. No open PR addresses this yet.

### Issue #1984 — Content makes unsupported claims about unreleased tools and acts as a generic placeholder.

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current codebase checked
- [x] Labels / milestone / priority reviewed
- [x] Recommended action recorded
- [x] Final audit note written

**Recommendation:** Keep open
**Reason:** Content issue with unsupported claims about unreleased tools in competition metrics post. Needs to be moved to draft mode or rewritten. No open PR addresses this yet.

### Issue #1983 — Violating DRY by reimplementing grid layout with raw Tailwind classes instead of using primitive components.

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current codebase checked
- [x] Labels / milestone / priority reviewed
- [x] Recommended action recorded
- [x] Final audit note written

**Recommendation:** Keep open
**Reason:** Technical debt: raw Tailwind classes used instead of primitive components in `src/pages/Home.tsx`. Needs refactoring to comply with design system rules. No open PR addresses this yet.

### Issue #1979 — Oversized Images on `/` (desktop-1440) increases page load time and consumes excessive bandwidth. This negatively impacts our Lighthouse performance scores and core web vitals.

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current codebase checked
- [x] Labels / milestone / priority reviewed
- [x] Recommended action recorded
- [x] Final audit note written

**Recommendation:** Keep open
**Reason:** This issue tracks the need to optimize oversized images on the homepage to improve Lighthouse scores. Other viewport-specific image sizing issues (1977, 1976, 1974, 1973) will be merged into this one. No open PR addresses this yet.

### Issue #1977 — Oversized Images on `/` (mobile-375) increases page load time and consumes excessive bandwidth. This negatively impacts our Lighthouse performance scores and core web vitals.

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current codebase checked
- [x] Labels / milestone / priority reviewed
- [x] Recommended action recorded
- [x] Final audit note written

**Recommendation:** Merge into another issue
**Reason:** This issue is a duplicate of #1979 for a different viewport. It should be closed and merged into #1979 to centralize image optimization work.

### Issue #1976 — Oversized Images on `/` (mobile-390) increases page load time and consumes excessive bandwidth. This negatively impacts our Lighthouse performance scores and core web vitals.

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current codebase checked
- [x] Labels / milestone / priority reviewed
- [x] Recommended action recorded
- [x] Final audit note written

**Recommendation:** Merge into another issue
**Reason:** This issue is a duplicate of #1979 for a different viewport. It should be closed and merged into #1979 to centralize image optimization work.

### Issue #1975 — Small Tap Targets on `/` (mobile-430) makes interactive elements difficult to tap on a phone, leading to user frustration. This violates standard mobile accessibility guidelines which require a minimum of 44x44px for touch targets.

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current codebase checked
- [x] Labels / milestone / priority reviewed
- [x] Recommended action recorded
- [x] Final audit note written

**Recommendation:** Keep open
**Reason:** Tracks accessibility fixes for small tap targets on mobile viewports. Merging other viewport duplicates (1970, 1968) into this one.

### Issue #1974 — Oversized Images on `/` (mobile-430) increases page load time and consumes excessive bandwidth. This negatively impacts our Lighthouse performance scores and core web vitals.

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current codebase checked
- [x] Labels / milestone / priority reviewed
- [x] Recommended action recorded
- [x] Final audit note written

**Recommendation:** Merge into another issue
**Reason:** This issue is a duplicate of #1979 for a different viewport. It should be closed and merged into #1979 to centralize image optimization work.

### Issue #1973 — Oversized Images on `/` (desktop-1280) increases page load time and consumes excessive bandwidth. This negatively impacts our Lighthouse performance scores and core web vitals.

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current codebase checked
- [x] Labels / milestone / priority reviewed
- [x] Recommended action recorded
- [x] Final audit note written

**Recommendation:** Merge into another issue
**Reason:** This issue is a duplicate of #1979 for a different viewport. It should be closed and merged into #1979 to centralize image optimization work.

### Issue #1970 — Small Tap Targets on `/` (mobile-390) makes interactive elements difficult to tap on a phone, leading to user frustration. This violates standard mobile accessibility guidelines which require a minimum of 44x44px for touch targets.

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current codebase checked
- [x] Labels / milestone / priority reviewed
- [x] Recommended action recorded
- [x] Final audit note written

**Recommendation:** Merge into another issue
**Reason:** Duplicate of #1975 for a different mobile viewport. Merging to centralize tap target accessibility fixes.

### Issue #1968 — Small Tap Targets on `/` (mobile-375) makes interactive elements difficult to tap on a phone, leading to user frustration. This violates standard mobile accessibility guidelines which require a minimum of 44x44px for touch targets.

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current codebase checked
- [x] Labels / milestone / priority reviewed
- [x] Recommended action recorded
- [x] Final audit note written

**Recommendation:** Merge into another issue
**Reason:** Duplicate of #1975 for a different mobile viewport. Merging to centralize tap target accessibility fixes.

### Issue #1966 — Horizontal Overflow on `/` (mobile-390) causes janky scrolling and potential content cut-off. This disrupts the visual flow and creates a poor user experience, particularly on constrained devices.

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current codebase checked
- [x] Labels / milestone / priority reviewed
- [x] Recommended action recorded
- [x] Final audit note written

**Recommendation:** Keep open
**Reason:** Tracks horizontal overflow issues on the homepage. Other viewport specific issues (1965, 1963, 1962, 1960) will be merged into this one.

### Issue #1965 — Horizontal Overflow on `/` (desktop-1440) causes janky scrolling and potential content cut-off. This disrupts the visual flow and creates a poor user experience, particularly on constrained devices.

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current codebase checked
- [x] Labels / milestone / priority reviewed
- [x] Recommended action recorded
- [x] Final audit note written

**Recommendation:** Merge into another issue
**Reason:** Duplicate of #1966 for a different viewport. Merging to centralize horizontal overflow fixes.

### Issue #1963 — Horizontal Overflow on `/` (mobile-375) causes janky scrolling and potential content cut-off. This disrupts the visual flow and creates a poor user experience, particularly on constrained devices.

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current codebase checked
- [x] Labels / milestone / priority reviewed
- [x] Recommended action recorded
- [x] Final audit note written

**Recommendation:** Merge into another issue
**Reason:** Duplicate of #1966 for a different viewport. Merging to centralize horizontal overflow fixes.

### Issue #1962 — Horizontal Overflow on `/` (mobile-430) causes janky scrolling and potential content cut-off. This disrupts the visual flow and creates a poor user experience, particularly on constrained devices.

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current codebase checked
- [x] Labels / milestone / priority reviewed
- [x] Recommended action recorded
- [x] Final audit note written

**Recommendation:** Merge into another issue
**Reason:** Duplicate of #1966 for a different viewport. Merging to centralize horizontal overflow fixes.

### Issue #1960 — Horizontal Overflow on `/` (desktop-1280) causes janky scrolling and potential content cut-off. This disrupts the visual flow and creates a poor user experience, particularly on constrained devices.

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current codebase checked
- [x] Labels / milestone / priority reviewed
- [x] Recommended action recorded
- [x] Final audit note written

**Recommendation:** Merge into another issue
**Reason:** Duplicate of #1966 for a different viewport. Merging to centralize horizontal overflow fixes.

### Issue #1923 — Enhance alt text for ToolImage component

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current codebase checked
- [x] Labels / milestone / priority reviewed
- [x] Recommended action recorded
- [x] Final audit note written

**Recommendation:** Keep open
**Reason:** Accessibility issue to improve alt text for ToolImage component in `src/features/research/ResearchAnalytics.tsx`. No PR addresses this yet.

### Issue #1922 — Abstract hardcoded opacity values into design tokens or component props

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current codebase checked
- [x] Labels / milestone / priority reviewed
- [x] Recommended action recorded
- [x] Final audit note written

**Recommendation:** Keep open
**Reason:** Technical debt: needs design token abstraction for hardcoded opacity values. No PR addresses this yet.

### Issue #1916 — mcp issues

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current codebase checked
- [x] Labels / milestone / priority reviewed
- [x] Recommended action recorded
- [x] Final audit note written

**Recommendation:** Keep open
**Reason:** Tracks boomtick MCP server workflow issues (hanging sequential requests, missing PR comparison tool). Currently being addressed in open PR #1918.

### Issue #1915 — [Workflow Audit] Consolidated Health Report

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current codebase checked
- [x] Labels / milestone / priority reviewed
- [x] Recommended action recorded
- [x] Final audit note written

**Recommendation:** Keep open
**Reason:** Consolidated CI/CD health report tracking multiple issues (Node 20 deprecation, Build/E2E failures, Semgrep failures). Some PRs might address parts of this, but it serves as a central tracker.

### Issue #1912 — update setup and package.json

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current codebase checked
- [x] Labels / milestone / priority reviewed
- [x] Recommended action recorded
- [x] Final audit note written

**Recommendation:** Keep open
**Reason:** Task to update local setup scripts and package.json to support running full CI checks locally (like semgrep). No PR addresses this yet.

### Issue #1908 — update setup_agent

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current codebase checked
- [x] Labels / milestone / priority reviewed
- [x] Recommended action recorded
- [x] Final audit note written

**Recommendation:** Keep open
**Reason:** Bug where `setup_agent.sh` doesn't fully install Playwright dependencies. Needs fixing. No PR addresses this yet.
