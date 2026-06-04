# Building a PR Rescue Agent with MCP for Boomtick

## Problem

Open PRs can become stale, conflicted, or blocked by CI failures. Manual triage is repetitive and can accidentally mix unrelated repairs.

## Solution

This package starts a local MCP server that exposes PR data, repo context, safety-aware shell helpers, resources, and workflow prompts as structured MCP capabilities.

## Architecture

- TypeScript MCP server over stdio.
- GitHub CLI integration for read-only PR discovery.
- Safe shell allowlist for future validation and repair commands.
- Read-only resources for package scripts and design-token context.
- Agent prompts for scout, context, repair, verifier, and PR writer roles.

## Safety decisions

- Read-only by default.
- Explicit write and push mode flags.
- Secret redaction in shell output.
- Human review through draft replacement PRs for future write tools.
