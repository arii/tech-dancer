# New Pull Request Merge Strategy

Based on the refreshed and new reviews for the open PRs, here is the recommended merge strategy.

## Immediate Merge Candidates
These PRs were approved with no outstanding feedback required. They are safe to merge.
- **PR 1798**: Refactors `ArticleHero` to use primitive-only styling instead of raw Tailwind classes.
- **PR 1823**: Refactors `Merch.tsx` to use primitive-only styling instead of raw Tailwind classes.
- **PR 1826**: Cleans up AI jargon and marketing slop from `ResearchAnalytics`.
- **PR 1817**: Adds a comprehensive UX audit tooling suite to `dev-tools`.
- **PR 1824**: Adds workflow audit artifacts and conflict check filters.
- **PR 1810**: Overhauls GitHub Pages SPA routing and restricts antipattern checks to code files.
- **PR 1821**: Hardens GitHub Pages preview deployments.
- **PR 1818**: Adds issue dispatch run artifacts.
- **PR 1801**: Refines the research UI and cleans up AI jargon.
- **PR 1803**: Restores missing studies mapping in `ResearchAnalytics`.
- **PR 1805**: Fixes issues from PR review feedback for the blog redesign.
- **PR 1814**: Generates GitHub Issue Audit Reports.
- **PR 1796**: Fixes a crash bug in `audit-pr` when the copilot CLI is missing.
- **PR 1788**: Fixes lint and parsing errors in `ResearchAnalytics` related to PR 1759.

## Merge Pending Minor Changes
These PRs are approved but require small adjustments before merging to ensure strict adherence to project standards.
- **PR 1827**: Fixes flagship image overflow, but relies on `// impeccable-ignore-file` for a hardcoded pixel value (`maxHeight="300px"`). The author should explore using a standard design token instead.
- **PR 1800**: Reframes the DIY pumpkin costume tutorial. The author needs to adjust the Amazon affiliate disclosure text to match the strictly required verbiage: "As an Amazon Associate, I earn from qualifying purchases."

## Abandon Strategy
- **PR 1759**: This PR is empty (no files changed in the context) despite the descriptive title. It should be abandoned and the work pushed correctly.