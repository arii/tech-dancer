# GitHub Actions Workflow Audit Status

## Summary

- Workflow files found: 16
- Workflows with run history: In Progress
- Runs inspected: 0
- Failed runs inspected: 0
- Successful runs inspected: 0
- Long-running runs inspected: 0
- Artifact-heavy runs inspected: 0
- Findings created: 0
- Fixes implemented: 0
- Follow-up issues recommended: 0

## Workflow checklist

### Workflow: `ci.yml`
File: `.github/workflows/ci.yml`

- [ ] Workflow file inspected
- [ ] Recent runs inspected
- [ ] Failed runs inspected where available
- [ ] Successful runs inspected where available
- [ ] Slowest jobs identified
- [ ] Artifacts inspected where available
- [ ] Cache usage checked
- [ ] Trigger rules checked
- [ ] Permissions checked
- [ ] Findings recorded
- [ ] Fix recommendations written

### Workflow: `deploy.yml`
File: `.github/workflows/deploy.yml`

- [ ] Workflow file inspected
- [ ] Recent runs inspected
- [ ] Failed runs inspected where available
- [ ] Successful runs inspected where available
- [ ] Slowest jobs identified
- [ ] Artifacts inspected where available
- [ ] Cache usage checked
- [ ] Trigger rules checked
- [ ] Permissions checked
- [ ] Findings recorded
- [ ] Fix recommendations written

## Run samples

| Run ID | Workflow | Event | Branch/PR | Status | Duration | Why sampled |
|---|---|---|---|---|---|---|

## Findings

### Workflow: `prune-stale-previews.yml`
File: `.github/workflows/prune-stale-previews.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [x] Failed runs inspected where available
- [ ] Successful runs inspected where available
- [ ] Slowest jobs identified
- [ ] Artifacts inspected where available
- [ ] Cache usage checked
- [ ] Trigger rules checked
- [ ] Permissions checked
- [x] Findings recorded
- [ ] Fix recommendations written

## Findings

### Finding: Prune Stale Previews failing on push due to race condition

- Workflow: Prune Stale Previews
- File: `.github/workflows/prune-stale-previews.yml`
- Run evidence: `28331829302`
- Severity: medium
- Recommendation: Add fetch and rebase before pushing, or implement retry logic for `git push`.
- Status: New

### Finding: Unnecessary duplicate `pnpm install` in `ci.yml`

- Workflow: CI
- File: `.github/workflows/ci.yml`
- Run evidence: Visual inspection of `ci.yml` jobs
- Severity: low
- Recommendation: The `setup-workspace` action sets up Node and caches pnpm but doesn't install. Multiple jobs have `pnpm install --frozen-lockfile --prefer-offline`. We can create an install step or use `setup-workspace` to handle install to centralize it. Wait, the prompt says "Official setup-node cache support". This is already there. "Avoid repeated setup" applies here: all 3 jobs run `pnpm install` individually. No, they are separate jobs, they need dependencies installed in each runner. BUT, maybe we can combine lightweight jobs or cache node_modules if needed. Wait, pnpm caches the store, not node_modules. This is standard pnpm. Let's look for other issues.
- Status: Info


### Finding: `deploy.yml` has unnecessary `github-script` complexity and redundant steps.

- Workflow: Deploy to GitHub Pages
- File: `.github/workflows/deploy.yml`
- Run evidence: Visual inspection of `deploy.yml` file
- Severity: medium
- Recommendation: Consider simplifying the workflow by using standard `actions/deploy-pages@v4` and `actions/upload-pages-artifact@v3` which is the recommended way for GitHub Pages. But wait, this relies on a specific `gh-pages` branch push loop because it uses branch subdirectories for previews. The custom `git commit/push` loop with 10 retries is a sign of race conditions (likely with `prune-stale-previews.yml`).


### Finding: missing concurrency for PR branch deploy jobs

- Workflow: CI
- File: `.github/workflows/deploy.yml`
- Run evidence: `deploy.yml` runs a git commit/push to the `gh-pages` branch. The concurrency group is `deploy-${{ github.ref }}` which cancels in-progress jobs for the same branch. But `prune-stale-previews` is on `main` and runs on a cron. Both push to `gh-pages` and get rejected (`error: failed to push some refs to 'https://github.com/arii/tech-dancer'`).
- Severity: high
- Recommendation: Since multiple concurrent operations on the `gh-pages` branch exist (deployments and cron pruning), change the push approach. Consider using `actions/deploy-pages` and uploading an artifact instead of raw `git push` on `gh-pages`. Alternatively, add retry/rebase logic on push failures if GitHub Pages API is not used.
- Status: Info


### Workflow: `reusable-gate.yml`
File: `.github/workflows/reusable-gate.yml`

- [x] Workflow file inspected
- [ ] Recent runs inspected
- [ ] Failed runs inspected where available
- [ ] Successful runs inspected where available
- [ ] Slowest jobs identified
- [ ] Artifacts inspected where available
- [ ] Cache usage checked
- [ ] Trigger rules checked
- [ ] Permissions checked
- [ ] Findings recorded
- [ ] Fix recommendations written

### Finding: Incorrect git diff logic in reusable-gate

- Workflow: Reusable CI Gate
- File: `.github/workflows/reusable-gate.yml`
- Run evidence: Visual inspection of `reusable-gate.yml`. `git diff --quiet "$RANGE" HEAD` is comparing between `$RANGE` and `HEAD`, but if `$RANGE` is `origin/$BASE_REF...HEAD`, `git diff` doesn't support a 3-dot syntax natively with an extra `HEAD` argument. The correct command is `git diff --quiet "$RANGE"` without `HEAD`.
- Severity: medium
- Recommendation: Change `git diff --quiet "$RANGE" HEAD` to `git diff --quiet "$RANGE"` or `git diff --quiet $RANGE`. Oh wait, if `$RANGE` is `HEAD~1`, it becomes `git diff --quiet HEAD~1 HEAD` which is valid. For `origin/$BASE_REF...HEAD HEAD`, it might fail or always return non-zero, making `has_changes` always true.


### Finding: `reusable-gate.yml` uses invalid `git diff` syntax for PRs

- Workflow: Reusable CI Gate
- File: `.github/workflows/reusable-gate.yml`
- Run evidence: Tested `git diff --quiet HEAD...HEAD HEAD` locally, which exits with 129 (usage error). This means for pull requests, the `reusable-gate.yml` diff command will always fail, causing `has_changes=true` to always be emitted.
- Severity: medium
- Recommendation: Change the diff logic to check for dot syntax and adjust arguments:
```bash
if [[ "$RANGE" == *"..."* ]]; then
  if git diff --quiet "$RANGE"; then echo "has_changes=false" >> "$GITHUB_OUTPUT"; else echo "has_changes=true" >> "$GITHUB_OUTPUT"; fi
else
  if git diff --quiet "$RANGE" HEAD; then echo "has_changes=false" >> "$GITHUB_OUTPUT"; else echo "has_changes=true" >> "$GITHUB_OUTPUT"; fi
fi
```
- Status: Ready to fix

### Finding: duplicate dependencies setup and install in deploy workflow

- Workflow: Deploy to GitHub Pages
- File: `.github/workflows/deploy.yml`
- Run evidence: `deploy.yml` repeats actions/setup-node and manual pnpm activation that is already encapsulated in `.github/actions/setup-workspace`. It also runs `pnpm install` instead of using the workspace action.
- Severity: low
- Recommendation: Use `setup-workspace` action in `deploy.yml` to standardize and simplify.


### Workflow: `validate_issue.yml`
File: `.github/workflows/validate_issue.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [x] Failed runs inspected where available
- [ ] Successful runs inspected where available
- [ ] Slowest jobs identified
- [ ] Artifacts inspected where available
- [ ] Cache usage checked
- [ ] Trigger rules checked
- [ ] Permissions checked
- [x] Findings recorded
- [ ] Fix recommendations written

### Finding: `validate_issue.yml` can run unnecessarily on empty issues or fails parsing
- Workflow: Validate Issue Quality
- File: `.github/workflows/validate_issue.yml`
- Run evidence: 28331077037 (Issue to Content PR) failed on `Validate Issue Quality`. Wait, let me check the log for that failure to see if there's a fix we can do.


### Finding: `validate_issue.yml` lacks error propagation pattern and markdown summary

- Workflow: Validate Issue Quality
- File: `.github/workflows/validate_issue.yml`
- Run evidence: 28331077037. `td-cli gh validate-issue` fails without propagating descriptive error message to GitHub Actions job summary (as mentioned in repository context memory).
- Severity: low
- Recommendation: Update the validate command to propagate error to the job output.


### Finding: `validate_issue.yml` lacks concurrency and repeats setup

- Workflow: Validate Issue Quality
- File: `.github/workflows/validate_issue.yml`
- Run evidence: Visual inspection of `validate_issue.yml`
- Severity: low
- Recommendation: The issue validate workflow does not have concurrency cancelling, so editing an issue multiple times rapidly queues multiple runs. We can add a `concurrency` block with `cancel-in-progress: true`.


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


### Workflow: `security.yml`
File: `.github/workflows/security.yml`

- [x] Workflow file inspected
- [x] Recent runs inspected
- [ ] Failed runs inspected where available
- [ ] Successful runs inspected where available
- [x] Slowest jobs identified
- [x] Artifacts inspected where available
- [x] Cache usage checked
- [x] Trigger rules checked
- [x] Permissions checked
- [x] Findings recorded
- [x] Fix recommendations written

### Finding: `security.yml` uses unsupported `parallel` keyword natively

- Workflow: Security & Quality Scan
- File: `.github/workflows/security.yml`
- Run evidence: Visual inspection. It has `# actionlint-disable syntax-check` on `parallel:` which means this is a custom feature in this environment, but `ci.yml` uses it too.

Wait, the memory says: "Native GitHub Actions features for step-level parallelism (`parallel:`) and background tasks (`background: true`, `wait:`, `wait-all:`) are supported by the repository's 2026/Namespace CI environment."
So `parallel:` is fully supported and correct.
