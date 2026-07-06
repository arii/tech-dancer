# GitHub Actions Workflow Audit Report

## 1. Audit scope
The audit covered 15 workflow files in `.github/workflows/`, evaluating their correctness, performance, reliability, and artifact handling. Particular attention was given to execution logs from recent runs via the `gh` CLI.

## 2. Workflow files reviewed
- `ai-chatops.yml`
- `auto-conflict-resolver.yml`
- `ci.yml`
- `deploy-image.yml`
- `deploy.yml`
- `issue-comment-dispatcher.yml`
- `issue_to_pr.yml`
- `jules-fix-trigger.yml`
- `mergellama.yml`
- `prune-stale-previews.yml`
- `reusable-gate.yml`
- `self-healing.yml`
- `update-snapshots.yml`
- `validate_issue.yml`
- `wcs_etl.yml`

## 3. Run sampling strategy
Runs were inspected using `gh run list --limit 50`. We sampled failing runs (specifically `pages build and deployment` and `CI`), successful runs (to verify duration expectations), and analyzed artifact sizes and durations.

## 4. Table of sampled runs
| Run ID | Workflow | Event | Branch/PR | Status | Duration | Why sampled |
|---|---|---|---|---|---|---|
| 28750605571 | pages build and deployment | dynamic | gh-pages | failure | 4m1s | Failed deploy-pages run |
| 28715259646 | CI | pull_request | perf-improvements... | failure | 14m5s | Failed CI run |
| 28696935600 | CI | schedule | main | failure | 19m18s | Slow CI failure |
| 28737191650 | CI | pull_request | jules-ci-review... | success | 11m34s | Successful CI for duration comparison |

## 5. Slowest jobs and workflows
- The CI pipeline (`ci.yml`) is the longest workflow (~11-19 minutes).
- `Security Scan` and `Deployment Impact Analysis` are the slowest jobs in `ci.yml`.

## 6. Most common failures
- **Pages Build and Deployment**: Frequently fails dynamically generated `pages-build-deployment` workflows because the artifact size exceeds the 1GB limit.
- **CI > Deployment Impact Analysis**: Fails during metric verification because AI thresholds aren't injected as environment variables.

## 7. Flaky or likely flaky checks
- AI Metric verification in the Impact Analysis relies on hard-coded tight limits if not supplied via environment variables, leading to seemingly spurious failures on larger PRs.

## 8. Artifact size and naming issues
- `gh-pages` deployments attempt to copy all assets, including large media files, leading to GitHub Pages deployment limits (1GB) being surpassed.

## 9. Cache and dependency install findings
- Caching strategy appears generally acceptable, relying heavily on local image containers for pre-warmed runtimes.

## 10. Trigger and path filter findings
- Reusable gate correctly scopes out unnecessary workflow execution.

## 11. Recommended quick wins
- **Fix AI metrics thresholds in CI:** Export variables like `MAX_INPUT_TOKENS`, `MAX_OUTPUT_TOKENS`, `MAX_TOTAL_TOKENS` into the `impact-analysis` action environment.
- **Fix GitHub Pages 1GB size limit:** Use `rsync --exclude` to strip out large video/media assets from the `dist-assets` sync for the PR preview deploys to keep the `gh-pages` branch small.

## 12. Proposed fix order
1. Implement the `rsync` fix in `.github/workflows/deploy.yml`.
2. Implement the threshold pass-through in `boomtick-pkg/.github/actions/impact-analysis/action.yml`.

---

## Detailed Findings

### Finding: GitHub Pages artifact exceeds 1GB limit
**Severity:** HIGH
**Priority:** P0
**Workflow:** `Deploy to GitHub Pages`
**File:** `.github/workflows/deploy.yml`
**Jobs affected:** `deploy`
**Evidence:**
- Run: 28750605571
- Log excerpt: `##[warning]Uploaded artifact size of 1661029101 bytes exceeds the allowed size of 1 GB. Deployment might fail.`

#### Problem
The `cp -r` command copies all artifacts directly into the branch directory, including excessively large media files (like `.mp4` or `.webm`). As previews accumulate, the size of the `gh-pages` branch explodes and GitHub's internal pages deployment action fails.

#### Impact
Failing preview deployments block visual regression and UX review workflows, decreasing PR confidence.

#### Recommended fix
Replace `cp -r` with `rsync -av --exclude="*.mp4" --exclude="*.webm" --exclude="assets/videos/"` in `.github/workflows/deploy.yml`.

### Finding: CI deployment impact analysis fails due to strict verification
**Severity:** HIGH
**Priority:** P1
**Workflow:** `CI`
**File:** `boomtick-pkg/.github/actions/impact-analysis/action.yml`
**Jobs affected:** `impact-analysis`
**Evidence:**
- Run: 28715259646
- Log excerpt: `td-cli gh verify-metrics ... ❌ CI Metrics verification failed.`

#### Problem
The `verify_ci_metrics` python tool looks for environment variables like `MAX_TOTAL_TOKENS` to judge whether the AI reviews breached thresholds. The CI job doesn't set these, falling back to strict defaults which get exceeded during multi-agent reviews or large diffs.

#### Impact
CI fails falsely, slowing PR merges.

#### Recommended fix
Export the necessary environment variables (`MAX_INPUT_TOKENS`, `MAX_OUTPUT_TOKENS`, `MAX_TOTAL_TOKENS`) in the `Verify CI Metrics` step within `boomtick-pkg/.github/actions/impact-analysis/action.yml`, potentially defaulting to values like 800000, 200000, and 1000000.
