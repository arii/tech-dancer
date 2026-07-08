# PR Merge Strategy

The following 10 PRs have been audited, reviewed, and approved via the comprehensive PR review agent. Based on their impact and potential conflicts, this is the recommended merge order:

## Group 1: High Priority / Foundational Fixes
These PRs resolve critical CI/CD failures and improve tooling reliability with minimal dependencies. They should be merged first.

1. **PR 3460:** `fix(ci): update wcs etl workflow to use python3 explicitly`
   - Fixes immediate CI failures due to environment changes (`python` -> `python3`). No conflicts.
2. **PR 3458:** `Improve dev-tools reliability: AI Review Parsing, Patch Resilience, and Symlink Awareness`
   - Touches core utilities (`utils.py`, `setup-agent.sh`). Required for downstream dev-tools reliability.
3. **PR 3457:** `Improve Python CLI developer experience and environment robustness`
   - Follows closely on PR 3458, adding `@json_option` and robust pathing. Expected minor conflicts with PR 3458 in `cli.py` and `utils.py` that can be resolved trivially during merge.
4. **PR 3454:** `Resilient AI Review JSON Validation`
   - Enhances AI review parsing. Will conflict slightly with PR 3458 in `ai_service.py`, but semantic intent is additive.
5. **PR 3452:** `Improve AI Code Review JSON Parsing Robustness`
   - Depends structurally on the foundation laid by 3458 and 3454 for JSON parsing.

## Group 2: Script Relocation and Orchestration
These PRs reorganize scripts and add higher-level commands. They should be merged after the core utilities are stable.

6. **PR 3451:** `Refactor: Move code review and impact analysis scripts to boomtick-pkg`
   - Moves scripts and updates `package.json`. No major conflicts expected with Group 1.
7. **PR 3453:** `Improve PR feedback loop and dev-tools CLI reliability`
   - Adds `sync-pr` subcommand. Will conflict with Group 1 PRs in `cli.py` and `orchestrator.py` but is essential for future workflow.
8. **PR 3456:** `Support batch message sending in jules.send_message`
   - Adds batching logic. Minor conflict in `orchestrator.py` expected with PR 3453.

## Group 3: Core Application and UI
These PRs touch the main application code (TypeScript, UI components) and are isolated from the dev-tools infrastructure changes above.

9. **PR 3455:** `chore(ui): Add strict TypeScript enforcement to design system`
   - Enforces design tokens system-wide.
10. **PR 3462:** `fix(ui): standardize filter buttons to match system default`
    - Refines `FilterButton` components. Will have minor conflict with PR 3455 in `variants.ts` (resolvable).

## Group 4: Historical Fixes
11. **PR 3435:** `Improve inline comment line resolution in post_pr_review`
    - An older PR fixing GitHub line mapping. Needs to be rebased and merged carefully after Group 1 and 2 to ensure it doesn't revert recent `github.py` robustness improvements.

**Note on Conflicts:**
The overlapping files (`cli.py`, `utils.py`, `orchestrator.py`, `ai_service.py`) across Group 1 and 2 will require manual merge conflict resolution. It is recommended to perform sequential rebases on the feature branches prior to merging to maintain a clean history.
