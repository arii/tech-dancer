# BoomTick

BoomTick is a consolidated developer toolkit and a high-performance content platform (`boomtick.blog`).

## 🌐 Content Platform (`boomtick.blog`)

The core of this repository is a Vite-powered React application that serves as the `boomtick.blog` platform.

- **Source Code**: Located in the `src/` directory.
- **Development**:
  ```bash
  pnpm dev
  ```
- **Build**:
  ```bash
  pnpm build
  ```

## 📦 Developer Toolkit & Agents

This repository integrates with the standalone **BoomTick** developer automation ecosystem:

- **`td` CLI**: Installed via `boomtick-cli` (`pip install --upgrade boomtick-cli`). Serves as the unified entry point for repository automation, preflight checks, conflict detection, and agent coordination.
- **BoomTick MCP Server**: Provided by `@arii/boomtick-mcp`. Exposes structured MCP tools for autonomous AI agents.

### 🛠 Entry Points

#### 1. `td` CLI
The primary tool for local automation and environment health. Verify runtime consistency across Node, pnpm, and Python:
```bash
td doctor
```

#### 2. Preflight & Audits
Run automated preflight verification:
```bash
td preflight
```

### 🤖 Agent Coordination
This repository uses a **Schema-Driven Contract Pipeline**. All AI agents MUST:
1. **Follow the 'MCP-First' policy**: Prioritize Tier 1 (MCP) tools and Tier 2 (`td`) subcommands over raw shell commands (Tier 3).
2. **Practice Self-Correction**: If you catch yourself about to run a raw shell command that has a tool equivalent, stop and use the tool.

## 📖 Documentation

- **[CONTRIBUTING.md](CONTRIBUTING.md)**: Contribution guidelines and developer protocols.
- **[AGENTS.md](AGENTS.md)**: Rules and context for AI agents working in this repository.

## ⚖️ License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
