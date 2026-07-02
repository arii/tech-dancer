# Merge Strategy & Order

Based on the audit, the following merging sequence is recommended to fix broken pipelines first, unblock dependent PRs, and keep the build green:

## 1. Unblockers (Merge Immediately)
These PRs fix underlying tests and snapshot baselines, which will unblock others.
- **Merge PR 3243**: Updates the Playwright visual snapshots, which will fix the `Deployment Impact Analysis` failures currently blocking PRs 3233 and 3235.
- **Merge PR 3244 & 3228**: Safe bumps for `setuptools` across `pyproject.toml` and `.devcontainer/Dockerfile`.

## 2. Safe Structural & Docs (Merge Next)
- **Merge PR 3202**: Resolves legacy pathing to `boomtick-pkg`.
- **Merge PR 3236**: Adds AI Slop `AUDIT_REPORT.md`.
- **Merge PR 3245**: Completes Issue audits.
- **Merge PR 3237**: Removes React anti-pattern (`useNavigate`).
- **Merge PR 3246**: Safe daemon feature addition.

## 3. Needs Action (Do Not Merge Yet)
- **PR 3233 & 3235**: Wait for PR 3243 to merge, then re-run CI on these branches. They should pass the visual regression checks and be ready for approval.
- **PR 3198**: The author must fix the Vitest assertions that are failing due to string/mock mismatches.
- **PR 3216**: The workflow must be amended to properly export the PATH for `~/.local/bin` so that `td-cli` can be executed by downstream scripts.
