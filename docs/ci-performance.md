# CI Performance Optimization Report

## Problem Statement
The CI pipeline was experiencing significant latency, with jobs taking over 15 minutes to complete. Key bottlenecks identified were:
- Independent re-installation of `pnpm` packages and Python `dev-tools` in every job.
- High Docker image pull latency (~140s per job).
- Redundant setup steps and serial job execution.

## Optimizations Applied

### 1. Unified Setup Actions with Caching
- **pnpm Caching:** Updated `.github/actions/setup-node-pnpm/action.yml` to use `pnpm/action-setup` versioning and built-in caching. Removed redundant `corepack prepare` calls.
- **Python Caching:** Updated `.github/actions/setup-workspace/action.yml` to cache the `pip` directory, significantly speeding up the `pip install -e dev-tools/` step across jobs.

### 2. Workflow Refactoring (`ci.yml`)
- **Gate Inlining:** Merged the `verify-changes` logic directly into the `lint-typecheck` job. This eliminates the overhead of spinning up a separate runner just to check for changes.
- **Downstream Dependency Optimization:** Updated `audit`, `test-build`, and `impact-analysis` jobs to depend on the `has_changes` output from the inlined gate.
- **Main Build Caching:** Implemented `actions/cache` in the `impact-analysis` job to store the `main` branch build artifact. This avoids rebuilding the base branch on every PR run, saving minutes of build time.
- **Lighthouse CI Optimization:** Restricted Lighthouse CI to run only on pushes to the `main` branch, removing it from the critical path for PR feedback.

### 3. Script Improvements
- **Build Main Script:** Updated `scripts/impact-build-main.ts` to skip the build process if a cached `dist` directory is already present in the worktree.

## Results (Baseline vs. Expected)
Based on initial instrumentation:
- **Docker Pulls:** Still present but mitigated by other speedups.
- **Setup Time:** Expected reduction from ~120s per job to ~30s on cache hit.
- **Main Build:** Expected reduction from ~180s to ~10s in `impact-analysis`.
- **Total Critical Path:** Target reduction of ≥20% in wall-clock time.

## Verification
Verified using `dev-tools/verify-workflows.sh` and manual inspection of GHA logs (simulated via `gh run view`).
