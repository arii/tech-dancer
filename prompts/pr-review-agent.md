# Agent: Comprehensive PR Review Agent

Review every currently open PR in this repository and create a persistent `review-status.md` document that tracks the full process with checkboxes.

You must continue working until every open PR has been reviewed. Do not stop to ask questions, request verification, or wait for confirmation. Make reasonable decisions based on the repository, agent docs, existing conventions, PR contents, CI output, and the available dev-tools CLI.

---

## Required Setup

1. Read the repository agent docs first (`docs/agent/`).
2. Verify environment and remote setup:
   ```bash
   python3 dev-tools/td_cli.py gh conflicts
   ```
3. Create or update a `review-status.md` file before beginning detailed review work.
4. Keep `review-status.md` updated as you complete each PR review.

Use the dev-tools CLI wherever it helps inspect PRs, compare branches, check CI, review diffs, or validate behavior:

```bash
# Fetch full PR context (CI status, annotated diffs, failing logs)
python3 dev-tools/td_cli.py gh audit-pr <PR_NUMBER> --fetch

# Run headless anti-pattern audit on changed .tsx/.ts files
python3 dev-tools/td_cli.py gh audit-pr <PR_NUMBER> --audit

# Check for conflicts between PRs
python3 dev-tools/td_cli.py gh detect-conflicts --pr <PR_NUMBER>

# View PR status board
python3 dev-tools/td_cli.py gh status-board

# Check for overlapping PRs
python3 dev-tools/td_cli.py gh overlaps
```

---

## Review Scope

For each open PR, evaluate:

- Purpose and scope of the PR
- UX layout on desktop
- UX layout on mobile
- Consistency with existing site patterns and design system
- Conflicts or likely conflicts with the current `main` branch
- CI status, including failing checks
- Build, lint, test, formatting, or type errors
- Risk of regressions
- Duplicate or overlapping work with other PRs
- Whether the PR is mergeable after fixes

### Impact Analysis for UI Changes

If the PR touches `src/components/`, `src/layouts/`, `src/pages/`, or `src/index.css`, run:

```bash
pnpm run impact:analysis
pnpm run impact:build-main
pnpm run impact:visual-diff
pnpm run impact:dom-diff
```

---

## Feedback Requirements

For every PR, provide clear, critical, and helpful review feedback.

Your feedback must:

- Explain what is working well
- Identify specific issues
- Give actionable instructions for fixing each issue
- Include guidance for resolving CI failures when checks are failing
- Reference files, components, or checks when useful
- Avoid vague comments like "improve layout" without explaining what to change
- Avoid telling a PR to abandon its work in favor of another PR
- Focus each PR's feedback on how that PR can be improved on its own merits

Do not recommend closing, abandoning, or replacing a PR during the individual PR reviews. Save that judgment for the final merge strategy.

### Submit Formal GitHub Review

After auditing each PR:

```bash
python3 dev-tools/td_cli.py gh audit-pr <PR_NUMBER> --submit --execute
```

---

## `review-status.md` Requirements

Maintain a markdown checklist that includes:

- List of every open PR reviewed
- Review status for each PR
- Desktop UX review completed
- Mobile UX review completed
- Main branch conflict check completed
- CI status checked
- Feedback provided
- Merge readiness assessment
- Notes on blockers, risks, and required fixes

Update this document throughout the process as each item is completed.

### Example Format

```markdown
## PR Review Status

### PR #123 — Title Here
- [ ] Purpose & scope reviewed
- [ ] Desktop UX reviewed
- [ ] Mobile UX reviewed
- [ ] Main branch conflict check
- [ ] CI status checked
- [ ] Anti-pattern audit run
- [ ] Impact analysis run (if UI changes)
- [ ] Feedback submitted
- [ ] Merge readiness: 🟡 Needs fixes / 🟢 Ready / 🔴 Blocked

**Blockers:** ...
**Required fixes:** ...
```

---

## Final Audit Document

When all PR reviews are complete, commit a markdown audit file (`pr-audit-<date>.md`) that includes:

1. Summary of all open PRs reviewed
2. Feedback provided for each PR
3. CI status and failure guidance for each PR
4. UX concerns by PR
5. Conflict or overlap notes
6. Recommended merge order
7. Recommended fix-before-merge items
8. Final merge / defer / abandon strategy

Only provide the final merge, defer, or abandon strategy after every open PR has been fully reviewed.

---

## Completion Rule

Do not stop until:

- Every open PR has been reviewed
- `review-status.md` has been fully updated
- PR-specific feedback has been provided via `audit-pr --submit`
- The final audit markdown file has been created and committed
- The final merge strategy has been written

Do not ask questions. Do not wait for verification. Complete the full review process using the available repository context and tooling.
