# GitHub Actions Workflow Audit Status

## Summary

- Workflow files found: 15
- Workflows with run history: 5 (CI, Deploy to GitHub Pages, Prune Stale Previews, Issue Comment Dispatcher, Auto-Resolve Merge Conflicts)
- Runs inspected: 50 (latest from `gh run list --limit 50`)
- Failed runs inspected: 3 (deploy-pages, CI impact-analysis)
- Successful runs inspected: 10+
- Long-running runs inspected: 2 (CI runs taking ~14m)
- Artifact-heavy runs inspected: 1 (deploy-pages artifact limit)
- Findings created: 2
- Fixes implemented: 0
- Follow-up issues recommended: 0

## Workflow checklist

### Workflow: `ci.yml`
- [x] Workflow file inspected
- [x] Recent runs inspected
- [x] Failed runs inspected where available
- [x] Successful runs inspected where available
- [x] Slowest jobs identified (Deployment Impact Analysis, Security Scan)
- [x] Artifacts inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [x] Fix recommendations written

### Workflow: `deploy.yml`
- [x] Workflow file inspected
- [x] Recent runs inspected
- [x] Failed runs inspected where available
- [x] Successful runs inspected where available
- [ ] Slowest jobs identified
- [x] Artifacts inspected where available (Artifact size limit)
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [x] Fix recommendations written

## Run samples

| Run ID | Workflow | Event | Branch/PR | Status | Duration | Why sampled |
|---|---|---|---|---|---|---|
| 28750605571 | pages build and deployment | dynamic | gh-pages | failure | 4m1s | Failed deploy-pages run |
| 28715259646 | CI | pull_request | perf-improvements... | failure | 14m5s | Failed CI run |
| 28696935600 | CI | schedule | main | failure | 19m18s | Slow CI failure |

## Findings

### Finding: GitHub Pages artifact exceeds 1GB limit
- Workflow: `Deploy to GitHub Pages`
- File: `.github/workflows/deploy.yml`
- Jobs affected: `build`, `deploy`
- Evidence:
  - Run: 28750605571
  - Log excerpt: `##[warning]Uploaded artifact size of 1661029101 bytes exceeds the allowed size of 1 GB. Deployment might fail.`

### Finding: CI deployment impact analysis fails due to strict verification
- Workflow: `CI`
- File: `boomtick-pkg/.github/actions/impact-analysis/action.yml`
- Jobs affected: `impact-analysis`
- Evidence:
  - Run: 28715259646
  - Log excerpt: `td-cli gh verify-metrics ... ❌ CI Metrics verification failed.`
### Finding: Missing environment propagation for CI metrics verification
- Workflow: `CI`
- File: `.github/workflows/ci.yml`
- Jobs affected: `impact-analysis`
- Evidence:
  - Run: 28715259646
  - Log excerpt: `td-cli gh verify-metrics ... ❌ CI Metrics verification failed.`
  - The script `verify_ci_metrics` in `boomtick-pkg/cli/dev_tools/utils.py` reads AI usage metrics from `boomtick-pkg/cli/logs/ai/review-run.jsonl`. This log file is written during AI token usage (e.g. `call_github_models`). However, the AI token thresholds (e.g. `MAX_INPUT_TOKENS`, `MAX_OUTPUT_TOKENS`, `MAX_TOTAL_TOKENS`) are not defined in the environment, causing the script to use tight defaults (150k/50k/200k) which are easily exceeded during larger code base audits.
- Severity: High
- Recommendation: Pass the necessary token thresholds as environment variables in the `Verify CI Metrics` step within `boomtick-pkg/.github/actions/impact-analysis/action.yml`. The thresholds should match the ones used in `utils.py` (`MAX_INPUT_TOKENS`, `MAX_OUTPUT_TOKENS`, `MAX_TOTAL_TOKENS`). Another potential issue is that `td-cli gh verify-metrics` requires `GITHUB_TOKEN` to be set, but it was set to `${{ inputs.github_token }}`. In successful runs (e.g., `28737191650`), the token thresholds weren't exceeded because the number of tokens used was smaller.
### Finding: Missing rsync with exclusions for gh-pages sync causes 1GB artifact limits to be exceeded
- Workflow: `Deploy to GitHub Pages`
- File: `.github/workflows/deploy.yml`
- Jobs affected: `deploy`
- Evidence:
  - Memory: `Environment & Execution: GitHub Pages branch deployments (e.g., in deploy.yml) must exclude large media files using rsync --exclude when syncing PR previews to the gh-pages branch to prevent pages build and deployment action failures caused by the 1GB artifact size limit.`
  - The script uses `cp -r ../dist-assets/. "$DEST_DIR/"` and `cp -r ../dist-assets/. ./` without any size filtering or exclusion, failing the build when large media is included.
- Severity: High
- Recommendation: Modify the copy command in `deploy.yml` to use `rsync -av --exclude="*.mp4" --exclude="*.webm" --exclude="assets/videos/" ../dist-assets/ "$DEST_DIR/"` instead of `cp -r`.
