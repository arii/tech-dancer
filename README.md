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

## 📦 Developer Toolkit (`boomtick-pkg`)

The repository also includes a self-contained developer unit under the `boomtick-pkg/` directory:

- **`boomtick-pkg/cli/`**: A Python-based CLI (`td`) that serves as the unified entry point for repository automation, GitHub operations, and agent coordination.
- **`boomtick-pkg/mcp/`**: A Model Context Protocol (MCP) server that provides a structured interface for AI agents to interact with the repository.
- **`boomtick-pkg/mcp/actions/`**: Modular, composite GitHub Actions for the toolkit (migrated from root `.github/actions/`).

## 🚀 Quick Start

To bootstrap the developer environment, install all dependencies, and initialize the toolkit, run:

```bash
bash boomtick-pkg/install.sh
```

## 🛠 Entry Points

### 1. `td-cli` CLI
The primary tool for local automation. It automatically configures and syncs the dual Node/Python environment. After installation, you can run:
```bash
td-cli doctor
```
to verify your runtime consistency across Node, pnpm, and Python environments.

### 2. BoomTick MCP Server
A TypeScript-based MCP server communicating via stdio.
- **Location**: `boomtick-pkg/mcp/`
- **Build**: `pnpm --filter ./boomtick-pkg/mcp build`
- **Run**: `node boomtick-pkg/mcp/dist/index.js`

### 🤖 Agent Coordination & .agent-context.json
This repository uses a **Schema-Driven Contract Pipeline**. All AI agents MUST:
1. **Consult `.agent-context.json`** upon startup to verify submodule synchronization and version state, `project_config.json` for repo configuration, and `boomtick-pkg/cli/dev_tools/cli-schema.json` (or `repo.get_command_schema`) for CLI subcommand schemas.
2. **Follow the 'MCP-First' policy**: Prioritize Tier 1 (MCP) tools and Tier 2 (`td-cli`) subcommands over raw shell commands (Tier 3).
3. **Practice Self-Correction**: If you catch yourself about to run a raw shell command that has a tool equivalent, stop and use the tool.

## 📖 Documentation

- **[CONTRIBUTING.md](CONTRIBUTING.md)**: Contribution guidelines and developer protocols.
- **[AGENTS.md](AGENTS.md)**: Rules and context for AI agents working in this repository.
- **[boomtick-pkg/README.md](boomtick-pkg/README.md)**: Detailed package-level documentation.

## ⚖️ License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
