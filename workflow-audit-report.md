# GitHub Actions Workflow Audit Report

## Audit Scope
- Inspected all `.yml` workflows in `.github/workflows/` (13 files).
- Inspected `.github/actions/` and `boomtick-pkg/.github/actions/`.
- Validated build scripts in `package.json`.

## Workflow Files Reviewed
- `ci.yml`
- `deploy.yml`
- `prune-stale-previews.yml`
- `auto-conflict-resolver.yml`
- `issue-comment-dispatcher.yml`
- `validate_issue.yml`
- `wcs_etl.yml`
- `ai-chatops.yml`
- `deploy-image.yml`
- `issue_to_pr.yml`
- `jules-fix-trigger.yml`
- `mergellama.yml`
- `reusable-gate.yml`
- `self-healing.yml`
- `update-snapshots.yml`

## Run Sampling Strategy
- Extracted a list of 20 recent runs using GitHub CLI.
- Analyzed specific failures: `pages build and deployment` hitting artifact size limits and `CI` `Deployment Impact Analysis` failing on JSON parse errors.

## Table of Sampled Runs
| Run ID | Workflow | Event | Branch/PR | Status | Duration | Why sampled |
|---|---|---|---|---|---|---|
| 28677697149 | pages build and deployment | dynamic | gh-pages | failure | 3m59s | Failed, artifact too large |
| 28674357656 | CI | pull_request | improve-ai-review-standards... | success | 12m52s | Slow job, CI |
| 28656500990 | CI | pull_request | dependabot... | failure | 13m3s | Failed impact analysis job |

## Current Workflow Map
- **CI**: Runs lint, typecheck, tests, audits, and deployment impact analysis on PRs and main pushes.
- **Deploy**: Runs on push. Builds the Vite app and copies files to a `gh-pages` branch for deployment via GitHub Pages. Manages an index of PR previews.
- **WCS ETL**: Weekly scheduled pipeline to scrape data.
- **Other**: AI code review workflows, issue validation, PR conflict resolution, self-healing.

## Slowest Jobs and Workflows
- The `CI` workflow is the slowest, taking up to 13 minutes, heavily bogged down by the `Deployment Impact Analysis` which builds the project multiple times and invokes external LLMs.

## Most Common Failures
- The `pages build and deployment` action frequently fails due to artifact sizes exceeding the 1GB limit.
- The `Deployment Impact Analysis` step fails sporadically if the LLM agents output malformed JSON or if the API key is not provided (e.g. for Dependabot PRs) due to fragile `jq` checks in bash.

## Flaky or Likely Flaky Checks
- `impact-analysis/action.yml`: The bash script reading `*-verdict.json` was vulnerable to throwing errors if `jq` failed.

## Artifact Size and Naming Issues
- `deploy.yml`: The deployment script simply copied the entirety of `dist-assets` into a subdirectory for every branch preview. Because the codebase contains a lot of large media files, replicating these for every PR quickly bloats the overall size of the `gh-pages` branch well past 1GB.

## Cache and Dependency Install Findings
- `setup-workspace` handles pnpm caching correctly via `setup-node`.
- Caching in `deploy.yml` and `ci.yml` leverages `setup-workspace`, mitigating slow install times mostly.

## Trigger and Path Filter Findings
- Path filters in `ci.yml` are appropriately specified.

## Security and Permission Findings
- Permissions are strictly defined for writing issues and PRs only where needed.

## Recommended Quick Wins
- **Fixed**: Modifying the PR preview generation in `deploy.yml` to exclude media/images using `rsync --exclude`. This reduces artifact bloat drastically, preserving the 1GB deployment limit.
- **Fixed**: Modifying the JSON parser in `impact-analysis/action.yml` to tolerate `jq` parse errors (e.g. from an agent that was skipped or truncated) and only fail if a legitimate false passed verdict was returned.

## Recommended Larger Refactors
- Investigate splitting out the AI code review / Impact Analysis into a purely asynchronous `workflow_run` action so it doesn't block the main CI test loop if the LLM is slow.

## Proposed Fix Order
1. Fix CI failure logic in Impact Analysis (done).
2. Fix GitHub Pages artifact bloat (done).
