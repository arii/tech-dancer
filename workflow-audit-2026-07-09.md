# GitHub Workflow Audit Report (2026-07-09)

## Executive Summary
All 15 GitHub Actions workflow files located under `.github/workflows/` have been audited for compliance against the rules specified in `AGENTS.md`. At the start of the audit, 8 workflows were already compliant by utilizing the `.github/actions/setup-workspace` composite action (which correctly provisions Node.js via a `.node-version` file and configures `pnpm` caching) and avoiding legacy package managers (`npm`/`yarn`) or hardcoded action versions.

7 workflows were found to be missing this standardized workspace initialization and were subsequently modified to ensure uniformity and strict adherence to the runtime constraints. All workflows now use `pnpm` exclusively, do not hardcode Node.js versions, pin actions to their latest major versions, and properly handle dependency caching.

## Direct Modifications Made
The following files were modified to include the `uses: ./boomtick-pkg/.github/actions/setup-workspace` composite action:

1. `.github/workflows/ai-chatops.yml` - Inserted after checkout.
2. `.github/workflows/deploy-image.yml` - Inserted after checkout.
3. `.github/workflows/issue_to_pr.yml` - Replaced `actions/setup-python@v6` with the standardized composite action (which handles both Node and Python).
4. `.github/workflows/prune-stale-previews.yml` - Inserted after checkout.
5. `.github/workflows/reusable-gate.yml` - Inserted after checkout.
6. `.github/workflows/self-healing.yml` - Replaced the un-pinned local `./boomtick-pkg/.github/actions/setup` with the standardized workspace initialization.
7. `.github/workflows/wcs_etl.yml` - Inserted after checkout.

## Optimization/Caching Improvements
By ensuring that every workflow now executes the centralized `setup-workspace` composite action, we've achieved the following optimizations globally:
- **`pnpm` Store Caching:** Automatically utilizes `actions/cache@v4` with a deterministic hash based on `pnpm-lock.yaml`, drastically reducing redundant network downloads for dependencies across all workflow runs.
- **`pip` Caching:** Development tools and Python requirements are now uniformly cached across all Python/CLI-dependent workflows.
- **Consolidated Node Tooling:** Eliminates redundant calls to setup `node` environments while guaranteeing that all CI environments perfectly mirror the pinned production runtime (Node v24.16.0 / pnpm v10.28.2).

## Deferred Changes
- None. All workflows are fully compliant.
