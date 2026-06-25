---
name: Spec-Driven Issue
about: Propose a change with a structured specification to ensure clarity and scope.
title: 'feat: Modernize Docker pnpm and Git Worktree setup'
labels: spec-driven
assignees: ''

---

## Problem Statement

Our current repository setup lacks native support for parallel multi-agent development via Git Worktrees and does not fully optimize our Docker/CI environment for pnpm cache sharing.

## Goal

Modernize our pnpm setup by leveraging `enableGlobalVirtualStore` for efficient Git Worktree usage by AI agents, and improve our `.devcontainer/Dockerfile` by following official pnpm recommendations to minimize build times and share package caches efficiently.

## Non-Goals

- Changing the core runtime contract (Node.js 24.16.0 or pnpm 10.28.2).
- Rewriting application code or CI/CD pipelines beyond basic environment setup.
- Replacing GitHub Actions with another CI provider.

---

## Proposed Approach

1. **Git Worktree Optimization**:
   - Add a `pnpm-workspace.yaml` file to the repository root.
   - Set `enableGlobalVirtualStore: true` inside this file. This allows AI agents to create isolated Git Worktrees while sharing a single, content-addressable package store on disk, ensuring near-instant dependency installation with almost zero extra disk overhead per agent.
2. **Docker / DevContainer Modernization**:
   - Update `.devcontainer/Dockerfile` to utilize BuildKit cache mounts (`--mount=type=cache,id=pnpm,target=/pnpm/store`) when executing `pnpm install` steps in environments that support it. This will prevent redundant downloads across builds.
   - Evaluate using the official `ghcr.io/pnpm/pnpm` base image if it fits within our existing container architecture, though retaining our current Playwright base and applying cache mounts might be the most practical approach for our E2E requirements.

### Alternatives Considered

| Approach | Rejected because |
|---|---|
| Multiple Full Clones for AI Agents | Extremely slow to duplicate the repository, wastes huge amounts of disk space for `node_modules` in each copy, and ignores pnpm's global virtual store benefits. |
| Relying solely on `npm` or standard `pnpm install` in isolated workspaces | Fails to optimize disk usage and download times when working across many branches locally or in agents, making multi-agent orchestrations slow. |

### Architectural Impact

- [ ] Introduces a new dependency
- [ ] Changes a shared type/interface used elsewhere
- [ ] Touches core/shared service code (not feature-local)
- [ ] Requires a data/schema/storage migration
- [x] None of the above — fully isolated change

This is an infrastructure-level improvement focused entirely on developer experience and agent scalability.

---

## Scope

### Files expected to change

- `pnpm-workspace.yaml` (new file)
- `.devcontainer/Dockerfile` (and potentially other Dockerfiles if added later)
- `.github/workflows/deploy-image.yml` (potentially, to enable BuildKit cache if not already enabled)

1. UNDERSTAND THE ISSUE

Restate the problem in your own words:
We need a more efficient way to handle dependencies across multiple parallel Git branches (worktrees) used by AI agents, and we need faster Docker builds.

State the underlying GOAL:
Enable `globalVirtualStore` in pnpm to share `node_modules` across Git Worktrees, and introduce BuildKit cache mounts in Docker.

Flag any ambiguity in the issue as written:
None.

2. DETERMINE APPROACH

Propose the most likely correct solution approach:
Introduce `pnpm-workspace.yaml` with `enableGlobalVirtualStore: true` and refactor the Dockerfile to use pnpm cache mounts.

Identify at least one alternative approach and state why it was rejected:
Continuing with full repo clones instead of worktrees - rejected because it's slow and space-inefficient.

Call out any architectural decisions this approach forces:
Requires the use of Git Worktrees for parallel development rather than separate clones.

Flag if the approach touches shared/core code used by multiple features:
No feature code is touched, only workspace config and Dockerfile.

3. SPECIFY SCOPE

IN SCOPE:
- Adding `pnpm-workspace.yaml`
- Modifying `.devcontainer/Dockerfile` to support cache mounts or use the official pnpm image.

OUT OF SCOPE:
- Altering the application source code.
- Altering existing `package.json` dependencies.

Flag if achieving the goal is impossible without violating the out-of-scope boundary:
No violations expected.

4. DEFINITION OF DONE

- [ ] `pnpm-workspace.yaml` exists at the root with `enableGlobalVirtualStore: true`.
- [ ] `.devcontainer/Dockerfile` is updated according to official pnpm Docker best practices.

State what must be manually verified vs. what can be automated:
Manual verification: Testing that a newly created git worktree correctly links its `node_modules` to the global virtual store.
Automated: CI runs successfully with the new workspace config.

State explicitly what is NOT required for this issue to be considered done:
We do not need to rewrite any application logic or change the currently pinned versions of Node or pnpm.
