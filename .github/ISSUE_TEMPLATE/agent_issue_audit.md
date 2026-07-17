---
name: 'Agent: GitHub Issue Audit'
about: Execute an audit of open issues following tech-dancer standards.
title: 'feat: GitHub Issue Audit'
labels: agent-workflow, issue-audit
assignees: ''

---

# Issue Audit Rules

These rules define how GitHub issues must be audited, tracked, and closed. They apply to all agents and automated workflows.

## 1. Audit output does not complete issues

An issue is **not** complete just because:
- An audit recommends closing it
- A status document marks it complete
- A PR references it
- A checklist item is checked
- Another agent said it was done
- A related branch exists
- Documentation was created about the issue

Audit files are evidence and planning artifacts. They are not implementation.

## 2. Required verification before closure

An issue can only be marked **Completed, close** when all applicable items are true:
- The requested change exists in the current codebase.
- The implementation matches the issue’s actual intent.
- The fix is not partial, mocked, or only documented.
- The relevant route, file, component, content entry, config, or test was inspected.
- Build, lint, typecheck, test, or CI checks pass where relevant.
- UX/content issues are verified with screenshots or route review where relevant.
- The fix is merged or included in the branch being reviewed.

## 3. PR linkage rules

Use the following phrases in PR descriptions to link issues:

- **Closes #123**: Use only when the PR fully resolves the issue.
- **Related to #123**: Use when the PR is connected but does not fully complete the issue.
- **Partially addresses #123**: Use when the PR implements some but not all required work.
- **Follow-up for #123**: Use when the PR was inspired by the issue or handles later cleanup, but does not close it.

**Agents must not add `Closes #...` unless they have verified that the PR contains a complete implementation.**

## 4. Required issue audit statuses

Agents should use the following approved statuses:

- **Keep open**: Implementation is missing or doesn't match intent.
- **Keep open, related PR exists**: Work is in progress in a PR, but not yet complete or verified.
- **Keep open, partially addressed**: Some parts are done, but the issue's main goal remains.
- **Keep open, needs clarification**: The issue description is ambiguous or missing critical info.
- **Keep open, update scope**: The original request is valid but needs adjustment.
- **Blocked by another issue or PR**: Cannot proceed until another item is resolved.
- **Ready to close after merge**: Implementation is complete and verified in a PR branch, but not yet merged to main.
- **Completed, close**: Implementation is verified in the current codebase (main or reviewed branch).
- **Duplicate, close**: Another issue tracks the same requested outcome.
- **Outdated, close**: The request is no longer applicable due to codebase or product changes.
- **Not aligned with current direction, close**: The request conflicts with current architectural or product standards.

## 5. Evidence requirements

For every issue recommended as **Completed, close**, an evidence block is required:

### Completion evidence

- **Verified implementation in**: `path/to/file`
- **Related PR**: #___
- **PR closure keyword present**: yes/no
- **Current status**: merged / open PR / branch only / already on main
- **Validation performed**:
  - [ ] Code exists in current branch or main
  - [ ] Behavior matches the issue
  - [ ] Relevant route/component/content was inspected
  - [ ] Build/lint/typecheck/test pass where relevant
  - [ ] Screenshot or manual route check completed where relevant

If this evidence is missing or incomplete, the issue **must** stay open.

## ⚠️ CLI Execution Rules
Before executing any commands using `td-cli`, you **MUST** read the schema defined in `dev-tools/cli-schema.json`.
- **DO NOT** run `td-cli --help`.
- **DO NOT** guess subcommands or flags.
- **DO NOT** use native git commands if a `td-cli` subcommand exists in the schema to accomplish the task.
Always format your shell execution exactly as defined in the `exact_usage` field of the schema.

## 6. Duplicate closure rules

An issue may only be recommended as **Duplicate, close** when:
- Another issue tracks the same requested outcome more clearly.
- The duplicate issue is linked.
- Any unique details from the duplicate are copied or referenced in the surviving issue.
- The closing comment explains where the work will continue.

## 7. Outdated or not-aligned closure rules

An issue may only be recommended as **Outdated, close** or **Not aligned, close** when the audit explains:
- What changed in the codebase or product direction.
- Why the original request no longer applies.
- Whether any smaller piece of the issue should remain open.
- Whether a replacement issue should be created.

## 8. Partial implementation rules

If only part of an issue has been implemented:
- Do not mark it complete.
- Do not close it.
- Do not use `Closes #...`.
- Explain what is done.
- Explain what remains.
- Mark it as **Keep open, partially addressed**.

## 9. Audit comment template

Use this template for issue audit comments:

```markdown
## Issue audit result

**Recommendation:** Keep open / Ready to close after merge / Completed, close / Duplicate, close / Outdated, close

**Reason:**
Explain the recommendation.

**Implementation evidence:**
- Files checked:
- PRs checked:
- Routes checked:
- Tests or validation:

**Remaining work:**
List anything still needed before this issue can close.
```

## 10. Agent prompt reference section

Copy and paste this section into agent prompts that perform issue audits:

> Before auditing GitHub issues, read `docs/agent/issue-audit-rules.md`.
>
> Do not mark an issue completed unless the requested fix exists correctly in the codebase and has been verified. Audit documents, checked boxes, open PRs, or recommendations do not complete issues by themselves.
>
> Use `Closes #...` only when a PR fully resolves an issue. Use `Related to #...` or `Partially addresses #...` for incomplete or supporting work.
>
> If completion evidence is missing, keep the issue open.
