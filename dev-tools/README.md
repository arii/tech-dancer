# Dev Tools & Workflows

This directory contains repository automation scripts and quality gate configurations.

## 🚀 Repository CLI (`td_cli.py`)

The unified entry point for all repository automation:
- `python3 dev-tools/td_cli.py pre-submit`: Run all quality gates locally.
- `python3 dev-tools/td_cli.py audit-pr <PR>`: Perform AI-assisted technical audits.
- `python3 dev-tools/td_cli.py validate-issue <ISSUE>`: Validate issue quality against repo standards.
- `python3 dev-tools/td_cli.py conflicts`: Detect potential merge conflicts across open PRs.
- `python3 dev-tools/td_cli.py status-board`: View status of active agent work.
- `python3 dev-tools/td_cli.py migrate-tokens`: Find and replace deprecated design tokens.

## 🧪 Quality Gates

- **UI Anti-Patterns**: `pnpm run audit` (enforced via `scripts/detect-antipatterns.mjs`).
- **Type Safety**: TypeScript `any` usage ratchet.
- **Bundle Size**: Automated size regression tracking.

## 🧱 Design System Enforcement

All code must adhere to the rules in `AGENTS.md`. Key primitives located in `src/layouts/` must be used for layout and typography.
