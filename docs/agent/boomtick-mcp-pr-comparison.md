# Comparison of Boomtick MCP PRs: #1844 vs #1847

This document evaluates the state of two related Pull Requests introducing the `boomtick-mcp` package: PR #1844 and PR #1847.

## Overview

Both Pull Requests aim to introduce the Model Context Protocol (MCP) server for Boomtick, primarily serving as a foundation for PR rescue and merge-conflict workflows.

However, they differ significantly in their completeness and testing scope.

### PR #1844
* **Title:** Introduce boomtick-mcp package: MCP server scaffold, safe shell wrapper, and tests
* **Scope:** It sets up the basic scaffold, configuration, and a safe shell wrapper.
* **Testing:** Uses a basic `verify-tools.ts` script to test registered tools (`boomtick.health`, `boomtick.echo`).

### PR #1847
* **Title:** Add boomtick-mcp: MVP read-only MCP server with tools, prompts, and tests
* **Scope:** A much more mature and comprehensive implementation. It includes all the base features from 1844 but expands heavily:
    * Detailed documentation inside `docs/` (`demo-case-study.md`, `safety.md`, `testing.md`, `tool-contracts.md`, `tracking.md`).
    * Implements the actual tools that were missing or stubbed in 1844 (`github.search_open_prs.ts`, `repo.get_package_scripts.ts`).
    * Adds several predefined agent prompts under `src/agents/` (e.g., `conflict-scout`, `repo-context`, `repair-agent`, `verifier-agent`, `pr-writer`).
    * Incorporates structured Github interactions (`src/lib/github.ts`) and evaluation fixtures (`src/evals/`).
    * Has a robust verification script `scripts/verify-mcp-tools.ts` mimicking GitHub interactions to ensure all MCP resources (tools, resources, prompts) are exposed correctly.

## Assessment

**PR #1847 is clearly the superior and more complete Pull Request.**
PR #1844 appears to be an earlier draft or a subset of the work that is fully realized in PR #1847.

* The codebase builds successfully on both.
* The test suites (`pnpm run test` for shell interactions, and the `verify-mcp-tools.ts` MCP integration verifier) pass on their respective branches (after bypassing rigid node version scripts on 1847).
* PR 1847 provides the full "MVP read-only MCP server" experience as per its commit messages and documentation, including the necessary prompts, resources, and Github tools which are completely missing in 1844.

## Recommendation

* **Consolidate PR #1844 in favor of PR #1847.**
* Use the phrase "Supersedes #1844" or "Consolidates work from #1844" when merging or commenting on PR #1847 so that #1844 is handled correctly without being unceremoniously closed.
* PR #1847 should be reviewed for merge into `main` after resolving any merge conflicts or small runtime mismatches (such as node version checks).
