# GitHub Actions Workflow Audit Status

## Summary

- Workflow files found: 18
- Workflows with run history: Multiple
- Runs inspected: Multiple (sampled over 20+ recent)
- Failed runs inspected: 27914879532 (mergellama.yml), 27867222480 (ci.yml), 27923084405 (mass-audit-prs.yml), 27954712973 (ci.yml), 27950892802 (ci.yml)
- Successful runs inspected: 27914935996 (issue-comment-dispatcher.yml), 27961350278 (mergellama.yml), 27961349007 (deploy.yml), 27961297893 (codeql.yml), 27961083489 (workflow-validation.yml)
- Long-running runs inspected: 27961297463 (CI - 3m+), 27954712973 (CI - 15m+), 27950892802 (CI - 14m+)
- Artifact-heavy runs inspected: 27867222480 (ci.yml - Playwright artifacts)
- Findings created: 4
- Fixes implemented: 3
- Follow-up issues recommended: 1

## Workflow checklist

### Workflow: `ai-chatops.yml`
File: `.github/workflows/ai-chatops.yml`
- [x] Workflow file inspected
- [x] Trigger rules checked
- [x] Findings recorded

### Workflow: `auto-conflict-resolver.yml`
File: `.github/workflows/auto-conflict-resolver.yml`
- [x] Workflow file inspected
- [x] Trigger rules checked
- [x] Findings recorded

### Workflow: `ci.yml`
File: `.github/workflows/ci.yml`
- [x] Workflow file inspected
- [x] Recent runs inspected
- [x] Failed runs inspected where available
- [x] Successful runs inspected where available
- [x] Slowest jobs identified
- [x] Artifacts inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [x] Fix recommendations written

### Workflow: `codeql.yml`
File: `.github/workflows/codeql.yml`
- [x] Workflow file inspected
- [x] Trigger rules checked

### Workflow: `deploy-image.yml`
File: `.github/workflows/deploy-image.yml`
- [x] Workflow file inspected
- [x] Trigger rules checked

### Workflow: `deploy.yml`
File: `.github/workflows/deploy.yml`
- [x] Workflow file inspected
- [x] Recent runs inspected
- [x] Cache usage checked

### Workflow: `issue-comment-dispatcher.yml`
File: `.github/workflows/issue-comment-dispatcher.yml`
- [x] Workflow file inspected
- [x] Trigger rules checked

### Workflow: `issue_to_pr.yml`
File: `.github/workflows/issue_to_pr.yml`
- [x] Workflow file inspected
- [x] Trigger rules checked

### Workflow: `jules-fix-trigger.yml`
File: `.github/workflows/jules-fix-trigger.yml`
- [x] Workflow file inspected
- [x] Trigger rules checked

### Workflow: `mass-audit-prs.yml`
File: `.github/workflows/mass-audit-prs.yml`
- [x] Workflow file inspected
- [x] Recent runs inspected
- [x] Failed runs inspected where available
- [x] Findings recorded

### Workflow: `mergellama.yml`
File: `.github/workflows/mergellama.yml`
- [x] Workflow file inspected
- [x] Recent runs inspected
- [x] Failed runs inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [x] Fix recommendations written

### Workflow: `prune-stale-previews.yml`
File: `.github/workflows/prune-stale-previews.yml`
- [x] Workflow file inspected

### Workflow: `reusable-gate.yml`
File: `.github/workflows/reusable-gate.yml`
- [x] Workflow file inspected

### Workflow: `self-healing.yml`
File: `.github/workflows/self-healing.yml`
- [x] Workflow file inspected
- [x] Cache usage checked

### Workflow: `update-snapshots.yml`
File: `.github/workflows/update-snapshots.yml`
- [x] Workflow file inspected

### Workflow: `validate_issue.yml`
File: `.github/workflows/validate_issue.yml`
- [x] Workflow file inspected

### Workflow: `wcs_etl.yml`
File: `.github/workflows/wcs_etl.yml`
- [x] Workflow file inspected

### Workflow: `workflow-validation.yml`
File: `.github/workflows/workflow-validation.yml`
- [x] Workflow file inspected


## Run samples
| Run ID | Workflow | Event | Branch/PR | Status | Duration | Why sampled |
|---|---|---|---|---|---|---|
| 27914879532 | mergellama.yml | pull_request | dependabot/npm_and_yarn/boomtick-mcp/vitest-4.1.9 | failure | 1m33s | Failed checkout step |
| 27867222480 | ci.yml | pull_request | feat/power-charging-visuals-refactor-6634082971449407759 | failure | 7m5s | High severity visual review failure |
| 27954712973 | ci.yml | pull_request | fix-accessibility-and-typography-10261143225900937106-15829855596929269118 | failure | 15m5s | Slow and failed run |
| 27950892802 | ci.yml | pull_request | fix-accessibility-and-typography-10261143225900937106-15829855596929269118 | failure | 14m50s | Slow and failed run |
| 27923084405 | mass-audit-prs.yml | schedule | main | failure | 2m6s | Scheduled job failure |
| 27914935996 | issue-comment-dispatcher.yml | issue_comment | main | success | 14m47s | Successful comment dispatcher |
| 27961350278 | mergellama.yml | pull_request | fix-accessibility... | success | 1m55s | Successful run |
| 27961349007 | deploy.yml | push | fix-accessibility... | success | 1m6s | Successful run |
| 27961297893 | codeql.yml | pull_request | jules/refactor... | success | 2m9s | Successful run |
| 27961083489 | workflow-validation.yml | pull_request | feat/mass-audit... | success | 17s | Fast successful run |

## Findings

### Finding: mergellama.yml fails on checkout for dependabot PRs
- Workflow: Auto-Resolve Merge Conflicts
- File: .github/workflows/mergellama.yml
- Run evidence: 27914879532
- Severity: medium
- Recommendation: Add `repository` field pointing to the PR's head full name.
- Status: Implemented

### Finding: redundant pnpm install steps without cache
- Workflow: ci.yml, deploy.yml, self-healing.yml, etc.
- File: .github/workflows/ci.yml, etc.
- Run evidence: Code audit
- Severity: low
- Recommendation: Replace raw bash `pnpm install` block with the existing `setup-node-pnpm` action in jobs lacking it.
- Status: Implemented

### Finding: Visual review agent fails CI dynamically but does not provide step summary of its specific failure
- Workflow: Deployment Impact Analysis
- File: .github/workflows/ci.yml
- Run evidence: 27867222480
- Severity: low
- Recommendation: Make the CI step reliably print the visual evaluation details natively into `$GITHUB_STEP_SUMMARY`.
- Status: Recommended for follow-up

### Finding: mass-audit-prs.yml fails due to missing `copilot` binary
- Workflow: Mass Audit PRs
- File: .github/workflows/mass-audit-prs.yml
- Run evidence: 27923084405
- Severity: high
- Recommendation: Ensure HEADLESS=true is exported during audit script run so interactive tools like copilot are not executed.
- Status: Implemented
