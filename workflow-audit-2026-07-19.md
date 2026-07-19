# GitHub Workflow Audit Report - 2026-07-19

## Executive Summary
All GitHub Actions workflow files under `.github/workflows/` have been fully audited for compliance with the `AGENTS.md` rules. They now strictly adhere to Node.js versioning via `.node-version`, pin actions to their latest major versions, use `pnpm` exclusively, and configure `pnpm` caching correctly.

## Modifications Made
The following modifications were made to ensure compliance:

1. **Action Version Pinning**: Updated all actions to their latest major versions (determined via the `api/_lib/versions.ts` tool):
    - `actions/checkout` to `v7`
    - `actions/setup-node` to `v7`
    - `VeyronSakai/conflict-resolver` to `v0.5`
    - `peter-evans/create-or-update-comment` to `v5`
    - `github/codeql-action` to `v3`
    - `gitleaks/gitleaks-action` to `v3`
    - `docker/build-push-action` to `v7`
    - `docker/login-action` to `v4`
    - `docker/metadata-action` to `v6`
    - `docker/setup-buildx-action` to `v4`
    - `actions/download-artifact` to `v8`
    - `actions/github-script` to `v9`
    - `actions/upload-artifact` to `v7`
    - `actions/create-github-app-token` to `v3`
    - `googleapis/release-please-action` to `v5`
    - `peter-evans/create-pull-request` to `v8`
    *(Modified files: all `.github/workflows/*.yml` files using these actions)*

2. **Node.js Version Compliance**: Ensured that `actions/setup-node` uses `node-version-file: '.node-version'` and removed any hardcoded `node-version: ...` from the workflow files.
    *(Modified files: `auto-conflict-resolver.yml`, `ci.yml`, `deploy.yml`, `update-snapshots.yml`, `update-submodule.yml`)*

3. **Package Manager Selection**: Verified that all Javascript/TypeScript workflows run `pnpm` exclusively. No `npm` or `yarn` commands were found.

## Optimization/Caching Improvements Introduced
- Configured pnpm caching correctly in `actions/setup-node` by adding `cache: 'pnpm'` in all workflows that set up Node.js.

## Deferred Changes
- None.
