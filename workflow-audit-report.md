# GitHub Actions Workflow Audit Report

## 1. Audit Scope
This audit covers the GitHub Actions workflows and associated dev-tools configurations in the repository. The goal is to identify failures, flakes, slow jobs, unnecessary work, artifact bloat, and performance bottlenecks, and to recommend and implement actionable fixes.

## 2. Workflow Files Reviewed
- `.github/workflows/ci.yml`
- `.github/workflows/deploy.yml`
- `boomtick-pkg/.github/actions/impact-analysis/action.yml`
- `.github/actions/setup-workspace/action.yml`
- And 11 other related configuration files.

## 3. Run Sampling Strategy
A sample of recent runs was collected across different workflows, focusing specifically on failures, long-running jobs, and PR checks.

## 4. Table of Sampled Runs
| Run ID | Workflow | Event | Branch/PR | Status | Duration | Why sampled |
|---|---|---|---|---|---|---|
| 28715259646 | CI | pull_request | perf-improvements-838045588113786752 | failure | 14m5s | Failed run with large artifacts and long runtime |
| 28714391639 | pages build and deployment | dynamic | gh-pages | failure | 3m51s | Failed deploy run due to large artifacts |
| 28696935600 | CI | schedule | main | failure | 19m18s | Slowest run, failed on verify-metrics |

## 5. Findings

### Finding: Fragile JSON parsing in impact-analysis action

**Severity:** high
**Priority:** P1
**Workflow:** `CI`
**File:** `boomtick-pkg/.github/actions/impact-analysis/action.yml`
**Jobs affected:** `impact-analysis`
**Evidence:**
- Run: #28715259646
- Log excerpt: `jq: parse error: Invalid numeric literal at line 1, column 6`
- File reference: `boomtick-pkg/.github/actions/impact-analysis/action.yml:133`

## Problem
The `impact-analysis` action uses `jq` to parse AI-generated JSON verdicts. When AI generation is skipped or malformed (due to rate limits or API errors), `jq` fails with an error and halts the entire CI job.

## Impact
- hidden failures
- flaky required checks
- slower PR feedback

## Recommended fix
Suppress `jq` errors with `2>/dev/null` and downgrade malformed parse errors to warnings instead of failing the job.

---

### Finding: Artifact Bloat on Deploy

**Severity:** critical
**Priority:** P0
**Workflow:** `Deploy to GitHub Pages`
**File:** `.github/workflows/deploy.yml`
**Jobs affected:** `deploy`
**Evidence:**
- Run: #28714391639
- Log excerpt: `##[warning]Uploaded artifact size of 1601800925 bytes exceeds the allowed size of 1 GB. Deployment might fail.`

## Problem
The deploy workflow copies all files into the deployment artifact using `cp -r`. This includes large image files (e.g., `*.png`, `*.jpg`) from test snapshots or public assets, which causes the artifact to exceed the 1GB GitHub Pages limit.

## Impact
- failing required checks
- excessive artifact storage
- broken branch previews

## Recommended fix
Replace `cp -r` with `rsync -a` and explicitly exclude large media files using `--exclude="*.png" --exclude="*.jpg"`.

---

### Finding: CI AI token thresholds are too low

**Severity:** high
**Priority:** P1
**Workflow:** `CI`
**File:** `boomtick-pkg/cli/dev_tools/utils.py`
**Jobs affected:** `verify-metrics`
**Evidence:**
- Run: #28696935600
- Log excerpt: `❌ CI Metrics verification failed.`
- File reference: `boomtick-pkg/cli/dev_tools/utils.py:65`

## Problem
The token usage thresholds set in `utils.py` (150k input, 50k output, 200k total) are too low for comprehensive AI code review audits, causing the CI to fail unnecessarily when a large PR is audited.

## Impact
- hidden failures
- failing required checks

## Recommended fix
Increase the token limits to 800k (input), 200k (output), 1M (total) as specified in the environment's memory context.

---

### Finding: Setup workspace caching for containers

**Severity:** medium
**Priority:** P2
**Workflow:** `Reusable Setup Action`
**File:** `.github/actions/setup-workspace/action.yml`
**Jobs affected:** all jobs using `setup-workspace`
**Evidence:**
- Run: #28696935600
- Duration: Slow dependency installation.
- File reference: `.github/actions/setup-workspace/action.yml`

## Problem
The `setup-node` caching mechanism does not persist well across container-based runs. Pip dependencies aren't being cached at all.

## Impact
- slower PR feedback
- unnecessary CI cost

## Recommended fix
Replace `setup-node` caching with manual `actions/cache@v4` steps for both the pnpm store and the pip directory. Use the required `# nosemgrep` comments.

## 6. Proposed Fix Order
1. Fix fragile JSON parsing in `impact-analysis`.
2. Fix deploy artifact bloat using `rsync`.
3. Update CI AI token thresholds.
4. Implement manual caching in `setup-workspace`.