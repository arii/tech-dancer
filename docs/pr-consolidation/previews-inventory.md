# Preview Infrastructure Inventory

## PR #1870

Files:
- public/previews/index.html
- public/404.html
- src/routes/previews.tsx (possibly others)

Purpose: Fixes `/previews` dashboard routing, GitHub Pages fallback behavior, redirect loops, and reverts problematic preview routing changes.
Risk: High impact on overall GitHub Pages fallback handling if 404.html is incorrect.
Recommendation: Treat as primary source of truth for routing files. Apply first.

## PR #1885

Files:
- scripts/manage-previews.sh

Purpose: Hardens preview deployment and cleanup script, protects `gh-pages` branch deployment behavior.
Risk: Low. Isolated to bash script and workflow execution.
Recommendation: Treat as primary source of truth for deployment logic. Apply second.

## PR #1791

Preview-Specific Files:
- standalone static preview server (e.g. preview-server.js or similar)
- preview generation support scripts
- preview screenshot tooling

Purpose: Adds tooling for preview servers and screenshots.
Risk: Moderate (introduces new tooling).
Recommendation: Keep only preview-related tooling enhancements. Reject merch/storefront changes. Apply fourth.

## PR #1900

Workflow Files:
- .github/workflows/deploy.yml
- .github/workflows/deploy-preview.yml
- .github/workflows/*.yml

Purpose: Audit and optimize workflows, specifically workflow concurrency and duplicate runs.
Risk: Moderate (can break CI).
Recommendation: Keep only changes affecting preview deployment workflows (concurrency, reliability). Apply third.
