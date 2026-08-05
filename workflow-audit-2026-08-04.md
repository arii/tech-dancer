# GitHub Workflow Audit Final Report - 2026-08-04

## Executive Summary
All 11 workflow files in `.github/workflows/` have been audited. They are now fully compliant with the repository standards, specifically enforcing `actions/setup-node@v4` with `node-version-file: '.node-version'`, utilizing `pnpm` exclusively via `pnpm/action-setup@v4`, and ensuring all GitHub actions are pinned to their latest major versions. The previous dependency on the submodule's `setup-workspace` composite action has been removed to ensure reliable execution logic entirely decoupled from submodule variations.

## Direct List of Modifications Made
- `.github/workflows/auto-conflict-resolver.yml`: Migrated setup action to `actions/setup-node@v4` and `pnpm/action-setup@v4`, enforced `node-version-file` usage, replaced npm/yarn with pnpm, and updated action tags to their latest major versions.
- `.github/workflows/ci.yml`: Migrated setup action to `actions/setup-node@v4` and `pnpm/action-setup@v4`, enforced `node-version-file` usage, reinstated `actions/setup-python@v5` where required, replaced npm/yarn with pnpm, and updated action tags to their latest major versions.
- `.github/workflows/deploy-image.yml`: Migrated setup action to `actions/setup-node@v4` and `pnpm/action-setup@v4`, enforced `node-version-file` usage, replaced npm/yarn with pnpm, and updated action tags to their latest major versions.
- `.github/workflows/deploy.yml`: Migrated setup action to `actions/setup-node@v4` and `pnpm/action-setup@v4`, enforced `node-version-file` usage, reinstated `actions/setup-python@v5` where required, replaced npm/yarn with pnpm, and updated action tags to their latest major versions.
- `.github/workflows/prune-stale-previews.yml`: Migrated setup action to `actions/setup-node@v4` and `pnpm/action-setup@v4`, enforced `node-version-file` usage, replaced npm/yarn with pnpm, and updated action tags to their latest major versions.
- `.github/workflows/prune-submodule-branches.yml`: Migrated setup action to `actions/setup-node@v4` and `pnpm/action-setup@v4`, enforced `node-version-file` usage, replaced npm/yarn with pnpm, and updated action tags to their latest major versions.
- `.github/workflows/release-please.yml`: Migrated setup action to `actions/setup-node@v4` and `pnpm/action-setup@v4`, enforced `node-version-file` usage, replaced npm/yarn with pnpm, and updated action tags to their latest major versions.
- `.github/workflows/reusable-gate.yml`: Migrated setup action to `actions/setup-node@v4` and `pnpm/action-setup@v4`, enforced `node-version-file` usage, replaced npm/yarn with pnpm, and updated action tags to their latest major versions.
- `.github/workflows/update-snapshots.yml`: Migrated setup action to `actions/setup-node@v4` and `pnpm/action-setup@v4`, enforced `node-version-file` usage, replaced npm/yarn with pnpm, and updated action tags to their latest major versions.
- `.github/workflows/update-submodule.yml`: Migrated setup action to `actions/setup-node@v4` and `pnpm/action-setup@v4`, enforced `node-version-file` usage, replaced npm/yarn with pnpm, and updated action tags to their latest major versions.
- `.github/workflows/wcs_etl.yml`: Migrated setup action to `actions/setup-node@v4` and `pnpm/action-setup@v4`, enforced `node-version-file` usage, reinstated `actions/setup-python@v5` where required, replaced npm/yarn with pnpm, and updated action tags to their latest major versions.

## Optimization/Caching Improvements Introduced
- Integrated `cache: 'pnpm'` natively into `actions/setup-node` across all workflows, utilizing `pnpm/action-setup@v4` for fast `pnpm` availability, thereby eliminating redundant cache step definitions and accelerating dependency resolution safely.

## Deferred Changes
- No deferred changes.
