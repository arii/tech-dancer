# Architectural Summary: Jules and Local Agent Separation

## Overview
This refactor correctly separates "Jules" (an external task-oriented execution system) from "Local Agents" (interactive execution flows) inside the `boomtick-mcp` service. Previously, these distinct concepts were conflated (e.g. Jules being modeled as just another local agent).

## Types
1. Created `boomtick-mcp/src/tools/types.ts`.
2. Extracted and defined specific types for **Local Agents**:
3. Extracted and defined specific types for **Jules**:
   - `JulesStatus` ("PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED").
   - `JulesSession` interface (`id`, `status`, `createdAt`, `pullRequestUrl`).
4. Verified that anti-patterns such as `AgentProvider.JULES` and `AgentType.JULES` are no longer present.

## Files Created
We created distinct domains and split tool implementations logically.

**Local Agent Tools** (`boomtick-mcp/src/tools/agents/`):
- `agy.ts` and `agy.test.ts`
- `ollama.ts` and `ollama.test.ts`

**Jules Tools** (`boomtick-mcp/src/tools/jules/`):
- `create-session.ts` and `create-session.test.ts`
- `get-session.ts`
- `list-sessions.ts`
- `cancel-session.ts`
- `get-pr.ts` and `get-pr.test.ts`

## Tool Registration
The `boomtick-mcp/src/mcp/server.ts` was updated to explicitly and separately register tools for agents `agents.run_agy`, `agents.run_ollama`) and for Jules (`jules.create_session`, `jules.get_session`, `jules.list_sessions`, `jules.cancel_session`, `jules.get_pr`).

## Why these abstractions remain separated
Jules handles background operations that take substantial time, create a GitHub PR, and act as an isolated process. Local Agents are interactive query systems designed to provide direct output over local workflows. By organizing Jules under a task-oriented model with `JulesSession` objects, the domain model avoids conceptual leakage and cleanly models reality.
