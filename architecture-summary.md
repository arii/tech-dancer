# Architectural Summary: Jules Separation

## Overview
This refactor correctly isolates "Jules" (an external task-oriented execution system) within the `boomtick-mcp` service. Previously, Jules was conflated with interactive "Local Agents". Following design directives, Local Agent logic has been omitted from this service layer entirely to prevent conceptual leakage, focusing exclusively on a robust, purely Jules-driven REST architecture.

## Types
1. Created `boomtick-mcp/src/tools/types.ts`.
2. Extracted and defined specific types for **Jules**:
   - `JulesStatus` ("PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED").
   - `JulesSession` interface (`id`, `status`, `createdAt`, `pullRequestUrl`, `recentMessage`).

## Files Created
We created a distinct domain for Jules tools that directly hits the official REST API `jules.googleapis.com` via `node-fetch`.

**Jules Tools** (`boomtick-mcp/src/tools/jules/`):
- `create-session.ts` and `create-session.test.ts`
- `get-session.ts` and `get-session.test.ts`
- `list-sessions.ts` and `list-sessions.test.ts`
- `cancel-session.ts` and `cancel-session.test.ts`
- `get-pr.ts` and `get-pr.test.ts`
- `send-message.ts` and `send-message.test.ts`
- `get-messages.ts` and `get-messages.test.ts`

## Tool Registration
The `boomtick-mcp/src/mcp/server.ts` was updated to explicitly register purely task-oriented tools for Jules (`jules.create_session`, `jules.get_session`, `jules.list_sessions`, `jules.cancel_session`, `jules.get_pr`, `jules.send_message`, `jules.get_messages`). Local agent endpoints have been completely removed.

## Why these abstractions remain separated
Jules handles background operations that take substantial time, create a GitHub PR, and act as an isolated external process. By organizing Jules under a task-oriented model with `JulesSession` objects and direct REST API integrations, the domain model correctly matches the infrastructure reality and avoids conflation with interactive local tooling.
