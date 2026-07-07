# Contributing to BoomTick

Thank you for your interest in contributing! This project follows a strict protocol-driven development model to ensure consistency between human developers and AI agents.

## 🧠 Developer Protocols

This project follows a strict protocol-driven development model. Detailed guidelines for AI agents, including the **Zero-Fallback Mandate** and **CLI Failure Ledger**, are defined in [AGENTS.md](AGENTS.md).

### 1. Schema Verification
All modifications to CLI tools or workspace configurations must be validated against their respective schemas:
- **CLI Commands**: `boomtick-pkg/cli/dev_tools/cli-schema.json`
- **Workspace Config**: `boomtick-pkg/workspace-schema.json`

### 3. Domain-Specific Variants
To prevent global namespace pollution, component-specific or domain-specific variants (e.g., `journalVariants`, `cardVariants`) must reside in a `variants.ts` file within the component's directory. Only universal UI primitives should be defined in `src/lib/variants.ts`.
For example, a component `MyComponent` should have its variants in `src/components/ui/MyComponent/variants.ts` and be imported as `import { myVariants } from "./variants";` within that component or `import { myVariants } from "@/components/ui/MyComponent/variants";` externally.


### 2. Local Test Runners
Before submitting any changes, ensure all tests pass:

- **CLI Package**:
  ```bash
  td --no-json test cli
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
