# BRIEFING — 2026-06-08T13:27:27-07:00

## Mission
Orchestrate the autonomous repair of all open PRs with merge conflicts in the tech-dancer repository.

## 🔒 My Identity
- Archetype: orchestrator
- Roles: orchestrator, user_liaison, human_reporter, successor
- Working directory: /home/ari/tech-dancer/.agents/orchestrator
- Original parent: main agent
- Original parent conversation ID: a9e84890-b844-4dbf-9910-6ce9593129b3

## 🔒 My Workflow
- **Pattern**: Custom Parallel Repair Orchestrator
- **Scope document**: /home/ari/tech-dancer/.agents/orchestrator/ORIGINAL_REQUEST.md
1. **Decompose**: Retrieve open PRs, check conflict status for each, classify conflict types, spawn parallel repair subagents ("self", Workspace "branch").
2. **Dispatch & Execute**:
   - Delegate (sub-orchestrator / repair worker): Spawn one repair subagent per conflicted PR.
3. **On failure**:
   - Retry / Replace / Triage: Mark PR repair as failed and post a triage comment explaining the blocker.
4. **Succession**: Self-succeed if spawn count >= 16 (on succession, kill timers, spawn successor, soft handoff).
- **Work items**:
  1. Call boomtick health check [pending]
  2. Search all open PRs [pending]
  3. Query merge conflict files and classify [pending]
  4. Invoke repair subagents in parallel [pending]
  5. Monitor repairs and compile status table [pending]
  6. Post triage comments on failures [pending]
  7. Report completion to parent [pending]
- **Current phase**: Phase 1: Discovery & Initialization
- **Current focus**: Check merge conflicts for all open PRs.

## 🔒 Key Constraints
- NEVER write, modify, or create source code files directly (delegate to workers).
- NEVER run build/test commands directly.
- Post triage comments on any FAILED PRs.
- Use boomtick MCP server tools for all GitHub and repo operations.
- Never reuse a subagent after it has delivered its handoff — always spawn fresh.

## Current Parent
- Conversation ID: a9e84890-b844-4dbf-9910-6ce9593129b3
- Updated: not yet

## Key Decisions Made
- Setup workspace at /home/ari/tech-dancer/.agents/orchestrator
- Spawned explorer_1 to discover open PRs (completed)

## Team Roster
| Agent | Type | Work Item | Status | Conv ID |
|-------|------|-----------|--------|---------|
| 989521f3-ccd5-465e-adc3-7ae01b3f9cc8 | teamwork_preview_explorer | Health Check & Search PRs | completed | 989521f3-ccd5-465e-adc3-7ae01b3f9cc8 |
| bb705717-fa4d-49d6-9e96-85c35bead674 | teamwork_preview_explorer | PR Conflict Check & Classify | in-progress | bb705717-fa4d-49d6-9e96-85c35bead674 |

## Succession Status
- Succession required: no
- Spawn count: 2 / 16
- Pending subagents: bb705717-fa4d-49d6-9e96-85c35bead674
- Predecessor: none
- Successor: not yet spawned

## Active Timers
- Heartbeat cron: task-19
- Safety timer: none

## Artifact Index
- /home/ari/tech-dancer/.agents/orchestrator/ORIGINAL_REQUEST.md — Verbatim user request
- /home/ari/tech-dancer/.agents/orchestrator/plan.md — Orchestrator project plan
- /home/ari/tech-dancer/.agents/orchestrator/progress.md — Heartbeat and task progress
- /home/ari/tech-dancer/.agents/orchestrator/context.md — Context and status records
