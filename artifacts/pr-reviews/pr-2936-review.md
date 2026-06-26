## ANTI-AI-SLOP
The `Build & E2E` check failed. This PR introduces `-linux.png` snapshots which directly violates the repository context ("Default Playwright OS suffixes (like -linux.png) are obsolete and should be purged").

## FINDINGS
This PR aims to stabilize mobile visual snapshots by adopting native Playwright snapshot features (`toHaveScreenshot`). However, the PR introduces obsolete `-linux.png` suffixed snapshots which violates the repository's Playwright configuration constraints and fails the CI. Please remove the OS suffixes from the snapshot names to rely on the project-level directory grouping.

## FINAL RECOMMENDATION
Not Approved

<!-- td-review-manager-comment -->
