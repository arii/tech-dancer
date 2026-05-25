# Runtime Consistency Contract

This project enforces a strict runtime contract to ensure consistency across local development, CI/CD, and production environments.

## Contract

| Runtime | Version | Source of Truth |
|---------|---------|-----------------|
| Node.js | 22.22.2  | `.node-version`, `.nvmrc` |
| pnpm    | 10.28.2 | `package.json` (`packageManager`) |

## Enforcement

- **`scripts/check-runtime.mjs`**: Validates that the active Node.js and pnpm versions match the contract. Runs automatically on `preinstall`.
- **`scripts/check-runtime-files.mjs`**: Validates that the configuration files themselves (`.node-version`, `.nvmrc`, `package.json`) have not drifted.
- **`pnpm doctor`**: Alias for `node scripts/check-runtime.mjs`.
- **`pnpm check:runtime-files`**: Alias for `node scripts/check-runtime-files.mjs`.

## How to Align

If your environment is out of sync:

1. **Node.js**: Use a version manager like `fnm` or `nvm` that respects `.node-version` or `.nvmrc`. Ensure you are using exactly `22.22.2`.
2. **pnpm**: Use Corepack to manage pnpm:
   ```bash
   corepack enable
   corepack prepare pnpm@10.28.2 --activate
   ```
