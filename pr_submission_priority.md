# PR Submission Priority List

Based on the analysis of PR status (`mass-evaluate`, CI statuses), overlaps, and conflicts, the following priority order is recommended for merging PRs.

## Priority 1: CI and Foundational Workflow Fixes
These PRs fix CI/CD and core scripts and should be merged first so other PRs can be successfully validated.
- **PR #2200** (`chore: audit and fix github actions`): Overlaps with #1733 on GitHub workflow files. Merging this first will likely resolve CI issues for other branches.
- **PR #2183** (`update-local-ci-setup-3692064932704943224`): CI setup improvements.
- **PR #2184** (`fix/playwright-setup-automation-6850060061976974527`): Playwright setup fixes.

## Priority 2: Standalone Tooling Updates (Mergeable)
- **PR #2199** (`issue-dispatch-audit-...`): No major overlaps with the large UI cluster. Passing CI.

## Priority 3: Resolve Failing but Mergeable PRs
These PRs have no merge conflicts currently but are failing CI checks. They should be fixed locally, pushed, and then merged.
- **PR #2198** (`feature/deployment-impact-analysis-routing`): Failing CI.
- **PR #2185** (`feat/impact-interaction-manifest`): Failing CI.
- **PR #2181** (`UX Redesign: Global Fixes and Foundation`): Failing CI. (This is a foundational PR for the massive UI redesign cluster).

## Priority 4: Resolve Conflicting PR Clusters
Once CI is stable, resolve the conflicts in the following clusters.
1. **Impact Analysis Tools Cluster:** PRs #2174, #2177, #2185, #2186.
   - #2174 and #2177 are conflicting. Resolve conflicts and merge the foundational script refactor first.
   - Then rebase #2186 and #2185 on top.
2. **Merch Pipeline:** PR #1733.
   - Conflicting and failing. Will likely need a rebase after #2200 is merged.
3. **UX Redesign Cluster:** PRs #2176, #2179, #2181, #2182, #2187, #2188, #2189, #2195, #2196.
   - Fix and merge #2181 first (Global Fixes and Foundation).
   - Resolve conflicts and overlaps on the more specific feature branches (#2182, #2196, #2195) prioritizing foundational components before page-level layouts.

## Action Items
1. Merge **#2200, #2183, #2184, #2199** immediately if reviews are approved.
2. Fix CI failures on **#2198, #2185, #2181**.
3. Resolve merge conflicts on **#2177/#2174** and **#1733**.
