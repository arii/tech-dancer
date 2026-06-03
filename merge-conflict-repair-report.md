# Merge Conflict Repair Report

1. All open PRs inspected: 28 open PRs checked.
2. Conflicted PRs found: 6 PRs with mergeable = CONFLICTING or mergeStateStatus = DIRTY.
3. Repair branches created: 1 (`agent/resolve-conflicts-pr-1756`).
4. Repair PRs opened: 1.
5. Conflict files by PR:
   - **PR 1756**: `pnpm-lock.yaml`, `src/components/ui/MarkdownRenderer.tsx`, `src/index.css`.
6. Validation results by PR:
   - **PR 1756**: `pnpm install`, `pnpm run audit`, `pnpm test`, `pnpm build`, `pnpm lint` passed.
7. PRs that could not be safely repaired:
   - **PR 1755**: Skipped. Unrelated history merge produces 54 conflicts including binary snapshot images.
   - **PR 1696**: Skipped. Draft PR, unrelated history merge conflicts.
   - **PR 1573**: Skipped. Unrelated history merge conflicts.
   - **PR 1570**: Skipped. Draft PR, unrelated history merge conflicts.
   - **PR 1566**: Skipped. Draft PR, unrelated history merge conflicts.
8. Common conflict patterns:
   - Pnpm lockfile desync.
   - Disjointed branch histories resulting in "unrelated histories" git errors, leading to massive add/add conflicts across unchanged base files.
9. Recommendations to reduce future conflicts:
   - Frequently rebase long-running branches onto `main`.
   - Avoid force-pushing rewritten histories to branches.
   - Automate pnpm lockfile synchronization.
