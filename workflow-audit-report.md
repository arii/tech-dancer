# Comprehensive Open Issue Audit & Merge Strategy (2026-06-28)

## 1. Automated Dependency Updates (Dependabot)
These PRs are standard, isolated dependency bumps with passing CI.

- **PR 3137:** chore(deps): bump recharts from 2.15.0 to 3.9.0
- **PR 3136:** chore(deps-dev): bump tsx from 4.21.0 to 4.22.4
- **PR 3135:** chore(deps-dev): bump knip from 6.7.0 to 6.23.0
- **PR 3134:** chore(deps-dev): bump @types/node from 24.13.2 to 26.0.1
- **PR 3133:** chore(deps-dev): bump @types/node from 26.0.0 to 26.0.1 in /boomtick-pkg/mcp
- **PR 3132:** chore(deps): bump hyparquet from 1.25.6 to 1.26.1

**Merge Strategy:** Auto-merge (or manual merge immediately). They are non-overlapping and have full CI coverage.

## 2. CI/CD & Workflow Modernization Cluster
These PRs heavily touch `.github/workflows/`, GitHub Actions (`.github/actions/`), and the scripts used within them.

- **PR 3081:** feat: Finalize install.sh and modularize CI actions
- **PR 3105:** Implement Parallelism in CI using Background Process Execution
- **PR 3115:** Fix pathing and configuration anomalies in setup scripts
- **PR 3119:** Leverage recent CI updates for background steps
- **PR 3120:** Workflow Health Audit Fixes
- **PR 3122:** CI: Implement JSCPD and Internalize Workflows
- **PR 3130:** ci: complete workflow audit and implement safe fixes

**Merge Strategy:** High Overlap Risk.
- Merge PR 3081 first as it lays foundational structural changes.
- Consolidate PRs 3105, 3119, 3120, 3122, and 3130. They all target workflow performance, parallelism, and workflow validation. It is safer to rebase/merge these into a single modernization PR to prevent CI breakage between commits.

## 3. CLI & Dev Tools Refactoring Cluster
These PRs improve the internal `td_cli.py` and `tdw_services` architecture.

- **PR 3116:** Refactor TD CLI issue commands for style, security, and redundancy
- **PR 3118:** refactor: Task 2 - Configuration Simplification and Logic Flattening
- **PR 3121:** Refactor CLI entrypoint architectural anti-patterns
- **PR 3124:** fix(cli): modernize entrypoints by eliminating sys path and argv anti-patterns

**Merge Strategy:** Moderate Overlap Risk.
- PR 3121 and 3124 target the exact same issue (`sys.path` and `sys.argv` anti-patterns). Consolidate these.
- PR 3116 and 3118 are related but distinct enough to merge sequentially. Merge 3118 first (configuration base), then 3116.

## 4. MCP Tools & Agent Infrastructure Cluster
These PRs relate to the Model Context Protocol server and agent dispatching logic.

- **PR 3102:** Prevent agent dispatch on non-existent branches
- **PR 3114:** Implement github.create_issue MCP tool
- **PR 3117:** Prevent AI-Induced Version Downgrades (Knowledge Cutoff Regression)
- **PR 3123:** Verify and fix boomtick-pkg extraction via subtree push
- **PR 3127:** chore(daemon): Execute jules_feedback_loop to provide feedback

**Merge Strategy:** Low to Moderate Overlap Risk.
- Merge PR 3114 and PR 3102 independently.
- Merge PR 3117 as it affects core version resolution logic.
- PR 3123 involves deployment strategy (`subtree push`); review and merge carefully to ensure the pkg extraction doesn't fail.

## 5. Audit & Reporting Generation Cluster
These PRs are outputs of automated or manual issue/workflow audits.

- **PR 3125:** docs: Comprehensive Open Issue Audit (2026-06-28)
- **PR 3129:** Comprehensive Open PR Review Audit
- **PR 3131:** chore: perform complete github issue audit and generate status report

**Merge Strategy:** These are tracking and reporting PRs. Merge PR 3131 and close the others to maintain a single source of truth for the current audit status.
