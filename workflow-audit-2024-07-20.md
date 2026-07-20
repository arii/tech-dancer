# GitHub Workflow Audit Report (2024-07-20)

## Executive Summary
All 11 workflow files in `.github/workflows/` were audited for compliance with the repository runtime configuration and policies defined in `AGENTS.md`.
The workflows are compliant with:
- `actions/setup-node` using `node-version-file: '.node-version'`. No hardcoded node versions found.
- All GitHub Actions are pinned to their latest major versions, as validated by `api/_lib/versions.ts`.
- Exclusively using `pnpm` in JS/TS workflow scripts. No `npm` or `yarn` commands found.
- Proper pnpm caching configuration. Added built-in caching where `actions/setup-node` was used without it. Also explicitly added `pnpm/action-setup@v4` with version `10.28.2` before `actions/setup-node` to ensure caching successfully finds the `pnpm` binary.

## Direct List of Modifications
Added `pnpm/action-setup@v4` with `version: 10.28.2` and `cache: 'pnpm'` property to `actions/setup-node` in the following workflow files to enable caching:
- `.github/workflows/auto-conflict-resolver.yml`
- `.github/workflows/ci.yml`
- `.github/workflows/deploy.yml`
- `.github/workflows/update-snapshots.yml`
- `.github/workflows/update-submodule.yml`

## Optimization/Caching Improvements Introduced
Build times and resource usage should decrease due to the introduction of native `cache: 'pnpm'` for step jobs that didn't previously inherit caching rules explicitly through composite actions.

## Deferred Changes
No deferred changes were required. All actions already meet versioning standards, Node configurations, and package manager constraints without manual token setups or complex workarounds.
