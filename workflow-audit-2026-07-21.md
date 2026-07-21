# Workflow Audit Report - 2026-07-21

## Executive Summary
Successfully audited 11 workflows in `.github/workflows/`. All are now compliant with repository policies (Node pinning, Action versions, pnpm).

## Modifications Made
- **auto-conflict-resolver.yml**: Updated setup-node format, enforced latest major versions, and/or converted npm/yarn commands to pnpm as applicable.
- **ci.yml**: Updated setup-node format, enforced latest major versions, added pnpm caching where applicable, and/or converted npm/yarn commands to pnpm.
- **deploy-image.yml**: Audited and found to already meet compliance. No changes required.
- **deploy.yml**: Updated setup-node format, enforced latest major versions, and/or converted npm/yarn commands to pnpm as applicable.
- **prune-stale-previews.yml**: Audited and found to already meet compliance. No changes required.
- **prune-submodule-branches.yml**: Audited and found to already meet compliance. No changes required.
- **release-please.yml**: Audited and found to already meet compliance. No changes required.
- **reusable-gate.yml**: Audited and found to already meet compliance. No changes required.
- **update-snapshots.yml**: Updated setup-node format, enforced latest major versions, and/or converted npm/yarn commands to pnpm as applicable.
- **update-submodule.yml**: Updated setup-node format, enforced latest major versions, and/or converted npm/yarn commands to pnpm as applicable.
- **wcs_etl.yml**: Audited and found to already meet compliance. No changes required.

## Optimization/Caching Improvements
- Added `cache: 'pnpm'` to `actions/setup-node` across all relevant CI workflows.
- Added `pnpm/action-setup@v6` prior to `setup-node` where applicable to ensure cache is found.

## Deferred Changes
- None. All changes were applied.
