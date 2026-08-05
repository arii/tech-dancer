## Problem Statement
The impact-analysis GitHub Action currently uses `github.action_path` with relative path traversal (e.g., `${{ github.action_path }}/../../../scripts/...`) to locate repository scripts. When running in containerized jobs, `github.action_path` resolves to the runner host's path rather than the mounted workspace path, leading to `ERR_MODULE_NOT_FOUND` or script not found errors.

## Root Cause Analysis
GitHub Actions documentation specifies that for container jobs, certain default path variables resolve to the host filesystem, while the checkout action populates the container's mounted workspace. Relying on relative paths from `github.action_path` incorrectly bridges these environments.

## Proposed Spec / Design
Replace all instances of `github.action_path` based relative traversal with `$GITHUB_WORKSPACE` absolute paths in composite actions.

## Acceptance Criteria
- All script executions in composite actions reference `$GITHUB_WORKSPACE` instead of `github.action_path`.
- The actions run successfully in both containerized and bare-metal runner environments.

## Context
This was noticed during fixing the impact analysis workflow where paths had to be debugged.
