# GitHub Workflow Audit Report (2026-07-30)

## Executive Summary
All GitHub Actions workflows in `.github/workflows/` have been audited. They are now fully compliant with the repository's configuration policies (AGENTS.md): Node.js versioning uses `node-version-file: .node-version`, action versions are pinned to their latest major versions, and only `pnpm` commands are used for dependency management and scripts. Caching is handled properly via `actions/setup-node` configuration options or explicitly via `actions/cache`.

## List of Modifications
- **auto-conflict-resolver.yml**: Pinned actions to latest major versions. Ensured pnpm usage.
- **ci.yml**: Pinned actions to latest major versions. Replaced npm usage with pnpm.
- **deploy-image.yml**: Pinned `actions/checkout`, `docker/setup-buildx-action`, `docker/login-action`, `docker/metadata-action`, and `docker/build-push-action` to latest major versions.
- **deploy.yml**: Pinned `actions/checkout`, `actions/upload-artifact`, and `actions/download-artifact` to latest major versions. Replaced npm with pnpm.
- **prune-stale-previews.yml**: Pinned `actions/checkout` to latest major version.
- **prune-submodule-branches.yml**: Pinned `actions/checkout` to latest major version.
- **release-please.yml**: Pinned `actions/create-github-app-token` and `googleapis/release-please-action` to latest major versions.
- **reusable-gate.yml**: Pinned `actions/checkout` to latest major version.
- **update-snapshots.yml**: Pinned actions to latest major versions. Ensure pnpm usage.
- **update-submodule.yml**: Pinned actions to latest major versions. Enforced pnpm.
- **wcs_etl.yml**: Pinned actions to latest major versions.

## Optimization & Caching Improvements
- Ensured all uses of Node setup delegate to `.node-version` for version resolution.
- Enforced use of `pnpm` globally, avoiding cache fragmentation and speed issues with npm.

## Deferred Changes
- There are no deferred changes.
