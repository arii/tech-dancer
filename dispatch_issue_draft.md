# Problem Statement

Our current backend architectures lack a formalized, unified specification for a message dispatch mechanism. Event dispatching and task execution are handled ad-hoc across various subsystems, including the `boomtick-mcp` service, automated orchestrator scripts (e.g., `scripts/orchestrator/agent_2_orchestrator.py`), and the telemetry ingestion pipeline (`api/telemetry`). This leads to several architectural vulnerabilities:
- **Tight Coupling:** Components trigger async side-effects directly in-process or depend on synchronous HTTP calls, making them susceptible to execution delays and transient failures.
- **Inconsistent Error Handling:** Retry policies and failure recovery behaviors are reinvented across different services. There is no standard for Dead Letter Queues (DLQ) or exponential backoff with jitter.
- **Poor Observability:** Telemetry and tracking of dispatch events are fragmented. There is no trace ID propagation across event boundaries, making end-to-end debugging of automated tasks (e.g., orchestrator-to-Jules-agent loops) extremely complex.
- **Blockers for Decoupling:** As outlined in `docs/infrastructure/decoupling-guide.md`, we aim to fully decouple `boomtick-pkg` from the parent repository and transition monolithic components into highly cohesive, event-driven services. Without a unified, validated specification for inter-service and task dispatching, this transition risks architectural drift and regressions.

# Goal

Provide a comprehensive, spec-driven design blueprint that outlines the core interfaces, queueing models, retry strategies, and error-handling policies for the new dispatch system. This document will establish strict architectural guidelines and schema-enforced interfaces to align all developers and future agents when implementing robust dispatchers.

# Non-Goals

- **No Implementation in this Issue:** This issue is strictly for documenting the architectural specification, establishing consensus on design patterns, and validating the spec. No codebase changes or implementation commits are within scope.
- **No complete refactor of underlying networking layers:** We will not be modifying current HTTP, gRPC, or socket-level layers. This spec defines a logical overlay for event-driven dispatching, and existing transport protocols will be adapted to implement it.

# Proposed Approach

1. **Draft and Specialize the Dispatch Core Interface:**
   Define precise TypeScript and Python type definitions for the dispatcher, payload contracts, execution states, and tracking metadata.
2. **Standardize Queueing Models:**
   Provide explicit designs for:
   - *In-Memory Queue (Local/Dev):* High-efficiency, non-blocking queueing using Promise-based or asyncio token-bucket concurrency limiters.
   - *Transactional Outbox Pattern (Production):* Storing events in a database (e.g., Firestore) within the same transaction as state updates, then publishing them asynchronously via a dedicated worker to guarantee "at-least-once" delivery.
3. **Establish Exponential Backoff with Jitter Retry Policies:**
   Document the exact mathematical models for retries to avoid "thundering herd" conditions during service outages.
4. **Formulate Error Handling & DLQ Strategies:**
   Outline the lifecycle of failed messages, specifying how they transition through retry loops, trigger circuit breakers, and are eventually parked in a structured DLQ for manual review.
5. **Enforce Observability and Context Propagation:**
   Define a unified telemetry envelope that embeds trace IDs, Span IDs, and retry counters directly into the dispatch headers.

# Alternatives Considered

- **Direct Implementation without Spec:** Dismissed. Due to the multi-agent nature of this repository (with automated agents like Jules working concurrently), implementing a dispatch mechanism without an established, validated spec would lead to divergent patterns, code duplication, and integration failures.
- **Using Legacy Synchronous Callbacks:** Rejected. Synchronous invocation is brittle and introduces blocking delays in serverless functions (such as the Vercel API environment), leading to high runtime costs and performance degradation.
- **Standardizing on a Single Cloud Vendor's Native Tooling (e.g., AWS SQS/Lambda):** Rejected because our deployments run on hybrid/agnostic architectures (e.g., Vercel Serverless, local Docker, and GitHub Actions environments). The dispatch contract must remain cloud-agnostic, defining a pluggable adapter layer.

# Architectural Impact

- **Decoupling and Modularization:** Directly supports `docs/infrastructure/decoupling-guide.md` by enabling asynchronous, non-blocking communication between the `tech-dancer` parent codebase and the decoupled packages.
- **Resilience and Scalability:** Mitigates cascading failures through circuit breakers and standardized retries.
- **Standardized Developer Experience:** Provides a single, clear reference point for all future automated tasks, CLI command executions, and backend communications.

# Scope

The scope includes defining:
- Core Interface APIs for TS/JS and Python.
- Queueing patterns (Local Memory and Transactional Outbox).
- Math and logic of retry policies (Exponential Backoff with Full Jitter).
- DLQ structure, state-machine transitions, and manual recovery workflows.
- Trace propagation standards (compatibility with OpenTelemetry standards).

The scope excludes:
- Specific frontend UI/UX views (e.g., status dashboards for dispatch queues).
- Choice or implementation of physical cloud brokers (such as Redis/BullMQ, Kafka, or RabbitMQ).

# UNDERSTAND THE ISSUE

The lack of a formal specification for our dispatch system causes architectural friction, inconsistent retry behaviors, and tech debt across decoupled components. Developers and agents currently write custom dispatch handlers without validation, leading to brittle integrations in serverless and CLI environments.

# DETERMINE APPROACH

Our approach involves crafting a comprehensive, language-agnostic design specification detailing interface definitions, queueing behaviors, retry models, and observability. This spec will be saved as an architectural blueprint, validated by our dev-tools CLI, and updated with feedback before any implementation code is authored.

# SPECIFY SCOPE

The scope is strictly bounded to documenting the dispatch architecture, API signatures, error-handling states, and trace/context propagation schemas. Physical infrastructure setups and frontend monitoring interfaces are explicitly out of scope.

# DEFINITION OF DONE

1. **A complete spec document is written** with zero placeholder text, incorporating concrete, highly detailed TypeScript/Python definitions, retry algorithms, and DLQ schemas.
2. **The design is approved** by running the internal `validate-issue` tool with zero blocking warnings.
3. **The issue is successfully created** in the project repository using the standard `gh create-issue` subcommand, establishing a permanent architectural reference.
4. **The local workspace and environment are fully verified** as clean and regression-free via our comprehensive `pnpm run doctor` and testing suites.
