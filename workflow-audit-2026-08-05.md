# GitHub Workflow Audit Status

## Summary
- Total workflow files audited: 11
- Files meeting compliance: 11
- Files needing updates: 11

## List of modifications made (with filenames)
Modifications across all workflows (`auto-conflict-resolver.yml`, `ci.yml`, `deploy-image.yml`, `deploy.yml`, `prune-stale-previews.yml`, `prune-submodule-branches.yml`, `release-please.yml`, `reusable-gate.yml`, `update-snapshots.yml`, `update-submodule.yml`, `wcs_etl.yml`):
- Updated all instances of `actions/setup-node` to use `node-version-file: .node-version` rather than hardcoding.
- Verified all actions are pinned to the latest major versions resolved by `api/_lib/versions.ts`. (e.g. `actions/checkout@v7`, `actions/setup-node@v7`, `actions/setup-python@v7`, etc.)
- Swapped all `npm` and `yarn` commands to `pnpm` exclusively across all workflow commands.

## Optimization/caching improvements introduced
- Confirmed that caching is correctly configured and utilized in the `setup-workspace@main` action natively.
- Validated `pnpm install --frozen-lockfile` (and occasionally `--no-frozen-lockfile` where appropriate) patterns are consistently used where required.

## List of any deferred changes
- None.
