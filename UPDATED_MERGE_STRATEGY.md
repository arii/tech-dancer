# Updated Pull Request Merge Strategy

Based on the refreshed reviews for the 9 open PRs, the recommended strategy is outlined below.

## Immediate Merge Candidates
These PRs were approved with no outstanding feedback required and represent safe additions, automated updates, or cleanups.
- **PR 1797**: Code comment cleanup. Removes verbose "how" comments in favor of "why", aligning with project standards. Safe to merge.
- **PR 1795**: Automated WCS data refresh. This is a simple data patch affecting `event_queue.json` and `wcs_prelims.parquet`. Safe to merge.
- **PR 1774**: Tests for mobile audit / comment PR scripts. Adds isolated Python tests cleanly utilizing `unittest.mock`. Safe to merge.
- **PR 1773**: Tests for post review comments script. Adds comprehensive dry-run/mocked tests for new orchestrator features. Safe to merge.
- **PR 1755**: Backend/Typing improvements. Adds status/read time to unified frontmatter transform and improves hardcoded test screenshot paths. Safe to merge.
- **PR 1752**: Editorial layout transition. Safely applies the `prose-editorial` paradigm across Blog and Research detail layouts. Safe to merge.
- **PR 1573**: Event frontmatter schemas. Extracts the Event Zod schema cleanly and simplifies content transformation by utilizing flat mappings. Safe to merge.

## Merge Pending Minor Changes
These PRs are approved but require small, non-blocking adjustments before or shortly after merging to ensure strict adherence to project standards.
- **PR 1791 (Merch UX)**: Recommended to merge, but the author should resolve the raw Tailwind class usage (`min-w-max`, `overflow-x-auto`) inside `Merch.tsx` by converting them to native layout primitive props if supported by `<Box>` or `<Stack>`.
- **PR 1756 (Ecommerce Automation)**: Recommended to merge, but the author should update `tests/contact.spec.ts` so it doesn't bypass the strict verification of the success path (e.g. removing `.or(errorMsg)` and ensuring the dev bypass is consistently triggered).

## Abandon Strategy
None of the open PRs need to be abandoned. They are all contributing distinct, valuable features, refactors, or tests.