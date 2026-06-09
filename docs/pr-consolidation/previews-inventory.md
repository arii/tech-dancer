# Preview Infrastructure Inventory

## PR #1870

Files:
- `.github/workflows/deploy.yml`
- `.github/workflows/prune-stale-previews.yml`
- `src/lib/routes-discovery.ts`
Purpose: Fix `/previews` dashboard routing, GitHub Pages fallback behavior, redirect loops, revert problematic preview routing changes.
Risk: Low. Specifically targets routing regressions and dashboard behavior.
Recommendation: Prioritize and merge as Step 1.

## PR #1885

Files:
- `.github/workflows/deploy.yml`
- `.github/workflows/prune-stale-previews.yml`
- `scripts/manage-previews.sh`
Purpose: Repair PR for preview deployment workflow. Hardens deployment scripts and protects gh-pages branch integrity.
Risk: Low. Safety net.
Recommendation: Prioritize and merge as Step 2. Will need to resolve any minor conflicts with #1870 on `.github/workflows/deploy.yml` and `prune-stale-previews.yml` (they both change the concurrency group to `gh-pages-deploy`, but #1870 sets `cancel-in-progress: false` which #1885 also does).

## PR #1791

Preview-Specific Files:
- `playwright.config.ts` (if applicable)
- `tests/utils/playwright-helpers.ts` (if applicable)
Purpose: Overhaul merch page, add standalone static preview server, preview generation support, screenshot path resolution.
Risk: Medium. Includes unrelated merch changes that must be excluded.
Recommendation: Extract ONLY preview server, preview URL generation, and preview screenshot support. Reject merch UI/storefront changes. Merge as Step 4.

## PR #1900

Workflow Files:
- `.github/workflows/deploy.yml`
- `.github/workflows/prune-stale-previews.yml`
Purpose: Audit and optimize github actions workflows, improve workflow concurrency and reliability.
Risk: Low. Workflow reliability improvements.
Recommendation: Extract only changes that affect preview deployments. Merge as Step 3.