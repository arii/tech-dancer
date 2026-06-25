# Codex / Agent Runtime Rules

This repository uses a strictly pinned runtime environment to prevent build inconsistencies and dependency drift.

## Runtime Contract

- **Node.js**: `24.16.0`
- **pnpm**: `10.28.2`

## Implementation Files

The following files define and enforce the contract:

- `.node-version`: Primary source for Node.js version.
- `.nvmrc`: Compatibility file for NVM users.
- `.npmrc`: Development environment configuration (must **not** contain `use-node-version`).
- `package.json`:
    - `engines.node`: Set to `24.x` for Vercel compatibility.
    - `engines.pnpm`: Set to `10.28.2`.
    - `packageManager`: Set to `pnpm@10.28.2`.
- `vercel.json`: Ensures Corepack and the pinned pnpm version are used during deployment.
- `.devcontainer/Dockerfile`: Uses `node:24.16.0-bookworm` as the base image.
- `.github/workflows/*.yml`: All workflows use `actions/setup-node` with `node-version-file: '.node-version'`.

## Mandatory Protocol for Agents

Before performing any tasks involving dependencies, builds, or tests, you **must** ensure the environment is correctly configured using the consolidated setup script:

```bash
./setup-agent.sh
```

This script handles environment activation, runtime verification, and dependency installation in a single step.

## Forbidden Actions

- ❌ Do **not** run `npm install`.
- ❌ Do **not** run `npm install -g pnpm`.
- ❌ Do **not** run `pnpm env use`.
- ❌ Do **not** run `nvm install` or `nvm use`.
- ❌ Do **not** change the Node.js version in any configuration file unless explicitly instructed to update the runtime contract.
- ❌ Do **not** add `use-node-version` to `.npmrc` (this breaks Vercel deployments).
- ❌ Do **not** delete `pnpm-lock.yaml`.

If the environment validation fails, stop and report the mismatch immediately.
