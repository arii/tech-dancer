# CI Performance Optimization Report

## Baseline Performance (P90)
Measured from the last 20 CI runs prior to optimizations.

| Job Name | Total Duration | Container Init | Checkout | Setup/Install |
| :--- | :--- | :--- | :--- | :--- |
| **verify-changes** (Serial) | ~60s | N/A | ~15s | N/A |
| **Lint & Type Check** | ~250s | ~125s | ~55s | ~50s |
| **Build & E2E** | ~380s | ~120s | ~55s | ~70s |
| **Impact Analysis** | ~425s | ~120s | ~55s | ~150s (incl. main build) |

**Total Critical Path (PR Signal):** ~450s - 500s (due to serial `verify-changes` + longest job).

## Optimizations Applied

### 1. Removal of Serial `verify-changes` Job
- **Change**: Inlined path filtering into the `ci.yml` `on` trigger.
- **Impact**: Removes ~60s of serial wall-clock time. All jobs now start immediately in parallel.

### 2. Dependency Caching (pnpm & pip)
- **Change**: Added `actions/cache` for the pnpm virtual store and pip cache directory in all `setup-workspace` actions.
- **Impact**: Reduces `pnpm install` and `pip install` to near-zero seconds on cache hits.

### 3. Main-Branch Build Caching
- **Change**: Implemented caching for the `.tmp-main` worktree used in `impact-analysis`.
- **Impact**: Saves ~180-240s in the `impact-analysis` job by avoiding a full build of the `main` branch for every PR.

### 4. Lighthouse CI Offloading
- **Change**: Conditionalized Lighthouse CI to run only on `main` branch pushes.
- **Impact**: Reduces the `test-build` job duration on PRs by ~60-90s.

### 5. Shallow Checkout
- **Change**: Removed `fetch-depth: 0` (full history) from quality-gate jobs that don't require it.
- **Impact**: Reduces `actions/checkout` duration from ~55s to ~10s per job.

## Projected Improvements
- **Wall-clock time to PR signal**: Estimated reduction of **35-45%**.
- **Impact Analysis duration**: Estimated reduction of **50%**.
- **Runner minutes consumed**: Reduced by avoiding redundant installs and builds.
