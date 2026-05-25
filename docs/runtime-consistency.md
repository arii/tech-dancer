# Runtime Consistency Contract

To ensure predictable behavior across local development, CI, and production, this repository enforces a strict runtime contract.

## Contract Specifications

- **Node.js**: `22.22.2` (exactly)
- **pnpm**: `10.28.2` (exactly)

## Implementation Files

The following files define and enforce the contract:

- `.node-version`: Primary source for Node.js version.
- `.nvmrc`: Compatibility file for NVM users.
- `package.json`:
    - `engines.node`: Set to `22.x` for Vercel compatibility.
    - `engines.pnpm`: Set to `10.28.2`.
    - `packageManager`: Set to `pnpm@10.28.2`.
- `vercel.json`: Ensures Corepack and the pinned pnpm version are used during deployment.
- `.devcontainer/Dockerfile`: Uses `node:22.22.2-bookworm` as the base image.
- `.github/workflows/*.yml`: All workflows use `actions/setup-node` with `node-version-file: '.node-version'`.

## Enforcement Commands

- `pnpm run check:runtime-files`: Validates that configuration files match the contract.
- `pnpm run doctor`: Validates that the current active environment matches the contract.

## Activation Protocol

If you encounter a version mismatch, run the following to activate the correct pnpm version:

```bash
corepack enable
corepack prepare pnpm@10.28.2 --activate
```
