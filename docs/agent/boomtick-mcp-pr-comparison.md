# Comparison of Boomtick MCP PRs: #1844, #1847, and #1853

This document evaluates the state of three related Pull Requests introducing the `boomtick-mcp` package: PR #1844, PR #1847, and the latest PR #1853.

## Overview

All three Pull Requests aim to introduce the Model Context Protocol (MCP) server for Boomtick, serving as a foundation for PR rescue and merge-conflict workflows.

They represent progressive stages of implementation, from a basic scaffold to a fully featured server.

### PR #1844
* **Title:** Introduce boomtick-mcp package: MCP server scaffold, safe shell wrapper, and tests
* **Scope:** It sets up the basic scaffold, configuration, and a safe shell wrapper. It lacks the actual tools needed to perform the required github or repo functionality.

### PR #1847
* **Title:** Add boomtick-mcp: MVP read-only MCP server with tools, prompts, and tests
* **Scope:** A much more mature and comprehensive read-only implementation. It adds initial tools (`github.search_open_prs.ts`, `repo.get_package_scripts.ts`), predefined agent prompts, and an MVP structure for verification.

### PR #1853
* **Title:** Implement Boomtick MCP Server for PR Rescue
* **Scope:** This is the most comprehensive iteration. It implements the complete suite of features specified for the PR Rescue guide:
    * **15 structured Tools** for repository and GitHub operations (e.g., `github.get_pr_diff`, `repo.run_tests`, `repo.run_lighthouse`, `repo.commit_patch`, `github.open_replacement_pr`).
    * **5 MCP Resources** for accessing repository metadata and CI/Diff data directly.
    * **5 MCP Prompts** fleshed out to guide specialized agents.
    * Enforces safety rules with mandatory `writeMode` and `pushMode` flags for mutating actions, keeping the default posture secure.
    * Features robust architecture including Git worktrees for isolated, non-mutating conflict detection and repair.
    * Integrates structured JSON outputs for tools like Lighthouse and Playwright.

## Assessment

**PR #1853 is the definitive, fully-featured implementation.**
PR #1844 and PR #1847 represent earlier drafts or partial subsets of the functionality that is fully realized in PR #1853.

## Recommendation

* **Consolidate PR #1844 and PR #1847 in favor of PR #1853.**
* Use phrases like "Supersedes #1844 and #1847" or "Consolidates work from #1844 and #1847" when merging or discussing PR #1853 to ensure the older PRs are closed logically as part of the overall work rather than being abandoned.
* PR #1853 is the complete solution and should be reviewed for merge into `main`.
