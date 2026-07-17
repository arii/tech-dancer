# Unified Dispatch Mechanism: Architectural Specification

This document defines the official, language-agnostic design specification and standard interfaces for Tech-Dancer’s async event-driven dispatch mechanism. It serves as a binding reference for decoupling `boomtick-pkg` and standardizing inter-service and task-based background communications across local CLI, API endpoints, and serverless runtimes.

---

## 1. Core Interfaces

To ensure consistent runtime and compile-time constraints across our TypeScript and Python runtimes, the dispatch mechanism implements the following concrete interfaces.

### 1.1 TypeScript Type Definitions

```typescript
export interface DispatchMetadata {
  traceId: string;
  spanId: string;
  correlationId: string;
  timestamp: string; // ISO 8601 UTC
  sender: string;    // Name of originating service or CLI subcommand
}

export interface DispatchEvent<TPayload = unknown> {
  id: string;        // UUIDv4
  type: string;      // Dot-notated string (e.g., "mcp.jules.create_session")
  payload: TPayload;
  metadata: DispatchMetadata;
}

export interface RetryPolicy {
  maxRetries: number;
  initialDelayMs: number;
  maxDelayMs: number;
  factor: number;    // Multiplier for exponential backoff
  jitter: "full" | "equal" | "none";
}

export interface DispatchResult {
  eventId: string;
  status: "SUCCESS" | "FAILED" | "RETRY_EXHAUSTED" | "PARKED_IN_DLQ";
  attempts: number;
  completedAt: string; // ISO 8601 UTC
  error?: {
    code: string;
    message: string;
    stackTrace?: string;
  };
}

export interface IDispatcher {
  /**
   * Dispatches a single event to the queue or downstream services.
   */
  dispatch<TPayload>(event: DispatchEvent<TPayload>): Promise<DispatchResult>;

  /**
   * Dispatches a collection of events transactionally.
   */
  dispatchBatch<TPayload>(events: DispatchEvent<TPayload>[]): Promise<DispatchResult[]>;
}
```

### 1.2 Python Type Definitions

```python
from typing import Dict, Any, List, Optional, Literal
from dataclasses import dataclass
from datetime import datetime

@dataclass(frozen=True)
class DispatchMetadata:
    trace_id: str
    span_id: str
    correlation_id: str
    timestamp: datetime
    sender: str

@dataclass(frozen=True)
class DispatchEvent:
    id: str
    type: str
    payload: Dict[str, Any]
    metadata: DispatchMetadata

@dataclass(frozen=True)
class RetryPolicy:
    max_retries: int
    initial_delay_ms: int
    max_delay_ms: int
    factor: float
    jitter: Literal["full", "equal", "none"]

@dataclass(frozen=True)
class DispatchError:
    code: str
    message: str
    stack_trace: Optional[str] = None

@dataclass(frozen=True)
class DispatchResult:
    event_id: str
    status: Literal["SUCCESS", "FAILED", "RETRY_EXHAUSTED", "PARKED_IN_DLQ"]
    attempts: int
    completed_at: datetime
    error: Optional[DispatchError] = None

class IDispatcher:
    def dispatch(self, event: DispatchEvent) -> DispatchResult:
        """Dispatches a single event."""
        raise NotImplementedError

    def dispatch_batch(self, events: List[DispatchEvent]) -> List[DispatchResult]:
        """Dispatches a batch of events transactionally."""
        raise NotImplementedError
```

---

## 2. Queueing Models

To safely isolate execution workloads without introducing synchronization locks in either local CLI or production serverless setups, the dispatch mechanism supports two distinct queueing models.

### 2.1 In-Memory Queue (Local & Development)

The in-memory dispatcher handles local testing and development pipelines safely, preventing "event-loop starvation" or memory bloat.

- **Non-blocking Loop:** Utilizes standard event emitters (TS) or `asyncio.Queue` (Python) to decouple publishing from subscription processing.
- **Concurrency Limiting:** Implements a token-bucket or semaphore structure to cap concurrent handler executions (e.g., maximum of 5 concurrent tasks) to match local CPU capacities.
- **Resource Cleanup:** Exposes a `close()` lifecycle hook that awaits active tasks or halts ingestion gracefully under a timeout (e.g., 5 seconds) to avoid process hang-ups.

### 2.2 Transactional Outbox Pattern (Production)

To guarantee "at-least-once" delivery of critical state-transition messages (such as when orchestrating multi-agent tasks or publishing telemetry ingestion events), the production environment implements the **Transactional Outbox Pattern**:

```
+--------------------+        1. Start Transaction        +--------------------+
|   Source Service   | ---------------------------------> |   State Store &    |
| (Vercel API, etc.) |                                    |    Outbox Table    |
+--------------------+ <--------------------------------- +--------------------+
          |                   2. Write App State &                 |
          |                      Outbox Event Record               |
          |                                                        |
          v                                                        v
+--------------------+                                    +--------------------+
|  Event Publisher   | <--------------------------------- |    Poller/Stream   |
|   (Background)     |         4. Publish Event           |      Processor     |
+--------------------+                                    +--------------------+
          |                                                        |
          v                                                        v
+--------------------+                                    3. Read Staged
|   Message Broker   |                                       Outbox Events
|    (Queue/Event)   |
+--------------------+
```

1. **Atomic DB Writes:** Application updates and the corresponding `DispatchEvent` payload are written to the database (such as Firebase Firestore) in a single atomic transaction.
2. **Guaranteed Delivery:** A background processor or serverless stream function watches/polls the outbox collection for unprocessed records.
3. **Idempotence Tracking:** After a downstream service consumes and successfully executes the event, the outbox record is marked complete. Deduplication keys (`metadata.traceId` and `event.id`) prevent duplicate runs at the target interface.

---

## 3. Retry Policies & Jitter Algorithms

Transient network issues, rate limiters, or serverless warmups can cause brief processing failures. The dispatch mechanism specifies a strict exponential backoff strategy with **Full Jitter** to protect destination services from massive concurrent retries (the "thundering herd" problem).

### 3.1 Mathematical Model

For any retry attempt $i$ (where $0 \le i \le \text{maxRetries}$):

$$\text{Interval}_i = \min\left(\text{maxDelayMs}, \text{initialDelayMs} \times \text{factor}^i\right)$$

With **Full Jitter**:

$$\text{Delay}_i = \text{random}(0, \text{Interval}_i)$$

### 3.2 Reference Implementation (TypeScript)

```typescript
export function calculateBackoffWithJitter(
  attempt: number,
  policy: RetryPolicy
): number {
  const interval = Math.min(
    policy.maxDelayMs,
    policy.initialDelayMs * Math.pow(policy.factor, attempt)
  );

  if (policy.jitter === "full") {
    return Math.random() * interval;
  } else if (policy.jitter === "equal") {
    return (interval / 2) + (Math.random() * (interval / 2));
  }

  return interval;
}
```

---

## 4. Error Handling & Circuit Breaker Strategies

### 4.1 Dead Letter Queue (DLQ) Strategy

When an event exceeds `maxRetries`, it must never be silently discarded.

- **State Transitions:** Upon reaching exhaustion, the event's status transitions to `PARKED_IN_DLQ`.
- **Payload Metadata Enrichment:** The message is moved to a dedicated `DLQ_events` store with added tracking fields:
  ```json
  {
    "dlqMetadata": {
      "originalEventId": "uuid-v4-string",
      "failedAt": "ISO-8601-Timestamp",
      "finalAttempt": 5,
      "exceptionMessage": "HTTP 504: Gateway Timeout",
      "stackTrace": "..."
    }
  }
  ```
- **Alerting & Recovery:** Re-ingest scripts or admin commands are standardized via `td-cli gh` subcommands to allow bulk reprocessing or manual purging of DLQ messages.

### 4.2 Circuit Breaker Pattern

To avoid wasting network calls or overloading a crashing backend:

- **States:**
  - **Closed:** Events are dispatched normally. Failure counts are tracked.
  - **Open:** If the failure rate of events over a sliding window (e.g., 10 attempts) exceeds 50%, the circuit opens. Dispatches fail-fast immediately with a `CircuitBreakerError` without hitting the downstream server.
  - **Half-Open:** After a cooldown period (e.g., 30 seconds), a single "canary" event is allowed through. If it succeeds, the circuit closes. If it fails, the cooldown resets and the circuit remains open.

---

## 5. Context Propagation & Observability

To trace multi-step workflows (such as a GitHub action triggering the Orchestrator, which initializes a task, which dispatches a payload to Jules, which submits a Pull Request), context headers must remain compliant with OpenTelemetry specifications.

### 5.1 The Telemetry Envelope

Every dispatched event is wrapped in a standardized envelope:

| Header Attribute | Format | Description |
|---|---|---|
| `traceparent` | `00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01` | `version-traceId-parentSpanId-traceFlags` as defined in W3C Trace Context spec. |
| `tracestate` | `congo=t61rcWkgMzE,rojo=00f067aa` | Vendor-specific routing or metadata states. |
| `x-correlation-id` | `uuid-v4-string` | Unique client-side tag to link end-to-end sessions across user actions. |

This standard enables full end-to-end trace correlation in logging systems (such as Datadog, OpenTelemetry collector, or GCP Cloud Logging), ensuring complete visibility and rapid debugging across Tech-Dancer’s entire architecture.
