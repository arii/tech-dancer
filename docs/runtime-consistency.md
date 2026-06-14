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

## Enforcement & Activation

To ensure compliance with the runtime contract, use the consolidated setup script which performs both activation and verification:

```bash
./setup-agent.sh
```

This script automates:
1. **Activation**: `corepack` activation of pnpm `10.28.2`.
2. **Verification**: Running `pnpm run doctor` and `pnpm run check:runtime-files`.
3. **Provisioning**: Installing Node, Python, and Playwright dependencies.
