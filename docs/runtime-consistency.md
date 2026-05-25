# Runtime Consistency Contract

This repository enforces a strict runtime environment to ensure consistency across local development, CI/CD, and production environments.

## Runtime Contract

- **Node.js**: `22.22.2` (Pinned in `.node-version` and `.nvmrc`)
- **pnpm**: `10.28.2` (Pinned in `package.json#packageManager` and `package.json#engines.pnpm`)
- **Vercel**: `22.x` (Defined in `package.json#engines.node`)

## Enforcement Tooling

To maintain this contract, the following scripts and commands are provided:

### `pnpm doctor`
Executes `scripts/check-runtime.mjs`. This script validates that the active Node.js and pnpm versions in your current shell match the project's pinned versions. It is also configured as a `preinstall` hook to prevent accidental use of incorrect versions.

### `pnpm check:runtime-files`
Executes `scripts/check-runtime-files.mjs`. This script performs a static check of the repository's configuration files (`.node-version`, `.nvmrc`, `package.json`) to ensure they have not drifted from the defined runtime contract.

## Environment Setup

To align your environment with the contract, use Corepack:

```bash
corepack enable
corepack prepare pnpm@10.28.2 --activate
```

Do not use `nvm use`, `pnpm env use`, or manual installations that might deviate from the pinned versions.
