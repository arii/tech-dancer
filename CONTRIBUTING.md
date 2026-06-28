# Contributing to BoomTick

Thank you for your interest in contributing! This project follows a strict protocol-driven development model to ensure consistency between human developers and AI agents.

## 🧠 Developer Protocols

### 1. Zero-Fallback Mandate
AI agents working on this repository must use the provided Tier 1 (`boomtick-mcp`) or Tier 2 (`td` CLI) tools. Bypassing these tools with raw bash commands or manual Git operations is strictly prohibited unless the tool is genuinely unavailable.

If a tool failure occurs, you **must** document the failure in `progress_and_next_steps.md` (CLI Failure Ledger) before proceeding with a manual fallback.

### 2. Schema Verification
All modifications to CLI tools or workspace configurations must be validated against their respective schemas:
- **CLI Commands**: `boomtick-pkg/cli/dev_tools/cli-schema.json`
- **Workspace Config**: `boomtick-pkg/workspace-schema.json`

### 3. Local Test Runners
Before submitting any changes, ensure all tests pass:

- **CLI Package**:
  ```bash
  PYTHONPATH=boomtick-pkg/cli:boomtick-pkg/cli/dev_tools python3 -m pytest boomtick-pkg/cli/tests/
  ```
- **MCP Package**:
  ```bash
  pnpm --filter ./boomtick-pkg/mcp test
  ```
- **Root Workspace**:
  ```bash
  pnpm run ci:local
  ```
- **Runtime Check**:
  ```bash
  td doctor
  ```

## 🛠 Development Workflow

1. **Setup**: Run `bash boomtick-pkg/install.sh` to initialize your environment.
2. **Branching**: Create a descriptive branch for your changes.
3. **Coding**: Follow the React and TypeScript guidelines defined in `AGENTS.md`.
4. **Testing**: Run the relevant test runners listed above.
5. **PR**: Open a Pull Request. Ensure CI passes before requesting a review.

## ⚖️ License
By contributing to BoomTick, you agree that your contributions will be licensed under the project's Apache License 2.0.
