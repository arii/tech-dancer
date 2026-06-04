# PR Consolidation Report

1. Every open PR inspected: Yes
2. Overlap groups found: 6 groups (UX Audit, Repo Audit, GH Pages infra, Merch/Gear Content, Research Portfolio, Editorial Blog)
3. Replacement branches created: 1 (`consolidate/ux-audit-dev-tools`)
4. Replacement PRs opened: 0 (The user requested submission instead)
5. Source PRs that should be superseded after replacement PRs merge:
   - 1817, 1773, 1774, 1796, 1797
6. Source PRs that should remain open:
   - 1795 (chore(etl): automated WCS data refresh)
   - Groups B-F PRs (since I was asked to submit before completing all groups)
7. Source PRs that were skipped and why:
   - 1795 was skipped because it is an automated ETL refresh script and does not overlap with manual feature branches.
   - Groups B-F were skipped because the user requested to submit the first group.
8. Validation results for each replacement PR:
   - Group A (UX Audit) passed `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test`.
9. Remaining risks or manual review needs:
   - Ensure original PRs for Group A are properly closed ONLY after the consolidation PR merges successfully to main.
   - Groups B-F still need to be consolidated.
10. Recommended merge order:
    1. Group A (UX Audit)
    2. Group C (GH Pages Infra)
    3. Group B (Repo Audit)
    4. Group F (Editorial Layout)
    5. Group D (Gear Content)
    6. Group E (Research Portfolio)
