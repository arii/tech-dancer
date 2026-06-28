# BoomTick

BoomTick is a consolidated developer toolkit designed to empower AI agents and developers with structured access to GitHub Pull Requests, repository state, CI logs, and validation tools.

## 📦 Project Architecture

The project is organized into a single extractable unit under the `boomtick-pkg/` directory:

- **`boomtick-pkg/cli/`**: A Python-based CLI (`td`) that serves as the unified entry point for repository automation, GitHub operations, and agent coordination.
- **`boomtick-pkg/mcp/`**: A Model Context Protocol (MCP) server that provides a structured interface for AI agents to interact with the repository.

## 🚀 Quick Start

To bootstrap the developer environment and install all necessary dependencies, run:

```bash
bash boomtick-pkg/install.sh
```

## 🛠 Entry Points

### 1. `td` CLI
The primary tool for local automation. After installation, you can run:
```bash
td doctor
```
to verify your runtime consistency.

### 2. BoomTick MCP Server
A TypeScript-based MCP server communicating via stdio.
- **Location**: `boomtick-pkg/mcp/`
- **Build**: `pnpm --filter ./boomtick-pkg/mcp build`
- **Run**: `node boomtick-pkg/mcp/dist/index.js`

## 📖 Documentation

- **[CONTRIBUTING.md](CONTRIBUTING.md)**: Contribution guidelines and developer protocols.
- **[AGENTS.md](AGENTS.md)**: Rules and context for AI agents working in this repository.
- **[boomtick-pkg/README.md](boomtick-pkg/README.md)**: Detailed package-level documentation.

## ⚖️ License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
