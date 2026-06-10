# Repair Orchestration Plan

## Objectives
1. Verify connection with the boomtick MCP server.
2. Discover all open PRs in `tech-dancer`.
3. Assess merge conflict status and files for each PR, classifying them as BINARY_ONLY, MIXED, or TEXT.
4. Spawn a repair subagent for each conflicted PR.
5. Track progress, monitor outcomes, and aggregate results into a final status table.
6. Post triage comments on failed PRs.
7. Notify the parent agent (Sentinel) upon completion.

## Milestones & Status
| Step | Phase | Task | Verification | Status |
|------|-------|------|--------------|--------|
| 1 | Init | Call `boomtick.health` | Health check returns success | PLANNED |
| 2 | Discover | Call `github.search_open_prs` | Returns list of open PRs | PLANNED |
| 3 | Analyze | Query conflict files for each PR in parallel | Files retrieved | PLANNED |
| 4 | Classify | Categorize as BINARY_ONLY / MIXED / TEXT | Classification done | PLANNED |
| 5 | Dispatch | Spawn repair subagents for conflicted PRs | Subagents running | PLANNED |
| 6 | Monitor | Track subagents' status, handle timeouts | Reports received | PLANNED |
| 7 | Triage | Post triage comments on failures | Comments posted | PLANNED |
| 8 | Report | Compile final status table and send message to Sentinel | Final message sent | PLANNED |
