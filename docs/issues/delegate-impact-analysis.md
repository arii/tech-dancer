# Delegate Impact Analysis and Remove Obsolete Submodule Dependencies

# Problem Statement
The `impact-analysis` job in the repository’s CI pipeline currently fails because it cannot resolve the paths to scripts (`check-visual-changes.ts` and `send-jules-impact.py`) executed within the local `boomtick-pkg` submodule path resolution context.

# Goal
Delegate the deployment impact analysis strictly to the remote reusable workflow (`arii/boomtick/.github/workflows/ci.yml@main`), enabling the complete architectural decoupling from the local `boomtick-pkg` submodule in GHA workflows.

# Non-Goals
We do not intend to fix the path resolutions within the existing `impact-analysis` action. We do not intend to modify `boomtick-pkg` submodule content.

# Proposed Approach
We will remove the current `impact-analysis` job from `.github/workflows/ci.yml` and replace it with a `run-boomtick-ci` job. This new job will `uses: arii/boomtick/.github/workflows/ci.yml@main`, declare `secrets: inherit`, and define necessary write permissions. We will also remove `submodules: recursive` across all checkout steps in the repo, purge `boomtick-pkg` from workflow trigger paths, and remove the obsolete `update-submodule.yml` sync action. Finally, we'll implement a validation test to ensure this layout is preserved.

# Alternatives Considered
Attempting to fix `TARGET_PATH="${{ github.action_path }}/../../../scripts/..."` in the sub-action was considered, but this violates the Phase 4 Zero-Submodule decoupling memory constraint which demands the use of the remote `ci.yml` caller job.

# Architectural Impact
This aligns the CI environment with the "Zero-Submodule Strategy", permanently stripping any reliance on `.gitmodules` syncing within Actions environments, increasing workflow startup speed and consistency.

# Scope
1. Update `.github/workflows/ci.yml`.
2. Clean `submodules:` parameters from all `.github/workflows/*.yml` files.
3. Remove `boomtick-pkg` paths triggers in `deploy-image.yml` and `ci.yml`.
4. Delete `update-submodule.yml`.
5. Add `workflow-validation.test.ts`.

# UNDERSTAND THE ISSUE
The issue is fundamentally a mismatch between a local execution architecture and an upcoming decoupled architecture. The CI is failing because a local submodule path breaks path resolution in composite actions.

# DETERMINE APPROACH
Replacing local submodule dependencies with a unified remote reusable workflow invocation allows centralizing CI verification safely.

# SPECIFY SCOPE
The modifications are limited strictly to `.github/workflows/*.yml` configuration files and `tests/unit/`.

# DEFINITION OF DONE
1. `impact-analysis` job is replaced by `run-boomtick-ci` calling `arii/boomtick/.github/workflows/ci.yml@main` with `secrets: inherit` and proper permissions.
2. `update-submodule.yml` is deleted.
3. No workflow retains `submodules: recursive` or `submodules: true`.
4. `workflow-validation.test.ts` exists and passes.
