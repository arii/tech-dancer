---
name: Spec-Driven Issue
about: Propose a change with a structured specification to ensure clarity and scope.
title: 'feat: '
labels: spec-driven
assignees: ''

---

## Problem Statement

<!-- One or two sentences. What is broken, missing, or needed? -->

## Goal

<!-- Why does this matter? What breaks, what's slower, or what's
     impossible without this change? Avoid restating the problem —
     state the underlying motivation. -->

## Non-Goals

<!-- Explicitly state what this issue is NOT trying to solve, even if
     adjacent. This is the single most skipped section and the single
     biggest cause of scope creep. -->

---

## Proposed Approach

<!-- The recommended solution, in plain language. Not code — approach. -->

### Alternatives Considered

<!-- At least one other approach and why it was rejected. If you can't
     think of an alternative, that's a signal you haven't looked hard
     enough at the problem yet. -->

| Approach | Rejected because |
|---|---|
| | |

### Architectural Impact

- [ ] Introduces a new dependency
- [ ] Changes a shared type/interface used elsewhere
- [ ] Touches core/shared service code (not feature-local)
- [ ] Requires a data/schema/storage migration
- [ ] None of the above — fully isolated change

If any box above is checked, explain the blast radius:

<!-- e.g. "Adds a field to EnrichedPullRequest, which is consumed by
     PullRequests.tsx, CodeReview.tsx, and JulesManagement.tsx" -->

---

## Scope

### Files expected to change

1. UNDERSTAND THE ISSUE

Restate the problem in your own words:
[Your text here]

State the underlying GOAL:
[Your text here]

Flag any ambiguity in the issue as written:
[Your text here]

2. DETERMINE APPROACH

Propose the most likely correct solution approach:
[Your text here]

Identify at least one alternative approach and state why it was rejected:
[Your text here]

Call out any architectural decisions this approach forces:
[Your text here]

Flag if the approach touches shared/core code used by multiple features:
[Your text here]

3. SPECIFY SCOPE

IN SCOPE:
[Your text here]

OUT OF SCOPE:
[Your text here]

Flag if achieving the goal is impossible without violating the out-of-scope boundary:
[Your text here]

4. DEFINITION OF DONE

List concrete, verifiable completion criteria:

- [ ] [Criteria 1]

State what must be manually verified vs. what can be automated:
[Your text here]

State explicitly what is NOT required for this issue to be considered done:
[Your text here]
