# Codex / Agent Runtime Rules

This repository uses a strictly pinned runtime environment to prevent build inconsistencies and dependency drift.

## Runtime Contract

- **Node.js**: `22.22.2`
- **pnpm**: `10.28.2`

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
- ❌ Do **not** delete `pnpm-lock.yaml`.

If the environment validation fails, stop and report the mismatch immediately.
