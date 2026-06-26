## ANTI-AI-SLOP
In `.github/workflows/ci.yml`, the environment variable `BUNDLE_BASELINE_KB` was changed from reading a repository variable to a hardcoded string `3685`. Hardcoding this value circumvents the repository variable mechanism.

## FINDINGS
This PR updates `jspdf` to `4.2.1` and uses `pnpm.overrides` to force `shell-quote` to `^1.9.0` to address security vulnerabilities. The security patches are necessary and effective, but the hardcoding of `BUNDLE_BASELINE_KB: 3685` in `.github/workflows/ci.yml` is an anti-pattern. Consider updating the repository variable instead.

## FINAL RECOMMENDATION
Approved with Minor Changes

<!-- td-review-manager-comment -->
