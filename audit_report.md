# Deployment Impact Analysis Audit

## Overall Accuracy

PRs Reviewed: 70

Precision: 0%

Recall: 0%

False Negative Rate: 100%

---

## Most Common Misses

### Shared Layout Changes

Occurrences: 2

Examples:
- PR #2538

Recommendation:
- Traverse layout hierarchy upward.

---

### CSS Module Changes

Occurrences: 2

Recommendation:
- Include style dependency graph.

---

## Bot Effectiveness

### GitHub Models Reviewer

Comments Reviewed: 33

Useful Findings: 29

False Alarms: 26

Missed Issues: 13

Effectiveness Score: Moderate

---

### Gemini Reviewer

Comments Reviewed: 1

Useful Findings: 0

False Alarms: 0

Missed Issues: 16

Effectiveness Score: Good

---

## High Priority Improvements

1. Trace layout dependencies.
2. Resolve barrel exports.
3. Include dynamic import analysis.
4. Propagate CSS impacts.
5. Expand shared component traversal.

---

## Example False Negative

PR: #2538

Deployment Analysis:

Impact Level: LOW

Routes:
None

Human Reviewer:

"double check that no regressions were introduced to existing test suites."

Root Cause:

Shared component `issue-dispatch-report.md` was modified but upward traversal stopped at barrel export.

Recommended Fix:

Add barrel export resolution to dependency graph builder.

## Example False Positive

PR: #2549

Deployment Analysis:

Impact Level: HIGH

Routes:
- /blog/2026-04-18-halloween-costumes

Reviewers report:
"No user-visible changes."

Root Cause:
Incorrect Route Attribution. No dependency chain exists between `src/components/ui/MarkdownRenderer.tsx` and `/blog/2026-04-18-halloween-costumes`.
