# Architectural Summary: Jules Domain Model

## Overview
This documentation outlines the architecture of "Jules" (an external task-oriented execution system) inside the `boomtick-mcp` service.

## Types
1. Created `boomtick-mcp/src/tools/types.ts`.
2. Extracted and defined specific types for **Jules**:
   - `JulesStatus` ("PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED").
   - `JulesSession` interface (`id`, `status`, `createdAt`, `pullRequestUrl`).
3. Verified that anti-patterns such as `AgentProvider.JULES` and `AgentType.JULES` are no longer present.

## Files Created
We created distinct domains and split tool implementations logically.

**Jules Tools** (`boomtick-mcp/src/tools/jules/`):
- `create-session.ts` and `create-session.test.ts`
- `get-session.ts`
- `list-sessions.ts`
- `cancel-session.ts`
- `get-pr.ts` and `get-pr.test.ts`

## Tool Registration
The `boomtick-mcp/src/mcp/server.ts` was updated to register tools for Jules (`jules.create_session`, `jules.get_session`, `jules.list_sessions`, `jules.cancel_session`, `jules.get_pr`).

## Why these abstractions remain separated
Jules handles background operations that take substantial time, create a GitHub PR, and act as an isolated process. By organizing Jules under a task-oriented model with `JulesSession` objects, the domain model avoid conceptual leakage and cleanly models reality.
