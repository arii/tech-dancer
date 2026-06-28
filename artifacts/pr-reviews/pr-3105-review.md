## Comprehensive PR Review: #3105

### Summary
This PR renames `td_cli.py` to `td` to establish a more idiomatic shell tool interface. It updates documentation, workspace scripts, and CI configurations to reflect this change. It also introduces `run-parallel.sh`, a robust bash script for executing multiple commands in parallel with fail-fast capabilities and aggregated logging, along with two new CI audit scripts (`audit-antipatterns.sh`, `audit-design-tokens.sh`).

### Observations
* **File Renames & Usage:** References to `td_cli.py` across `package.json`, `plan.md`, `scripts/orchestrator/README.md`, `scripts/orchestrator/utils.py`, and `src/config/devai-assets.ts` have been correctly updated to `td`.
* **New Script `run-parallel.sh`:** Well-implemented parallel executor utilizing associative arrays and subshells. It includes clean PID tracking, trap-based cleanup (`SIGINT`, `EXIT`), and ordered log aggregation.
* **New Audit Scripts:** `audit-antipatterns.sh` and `audit-design-tokens.sh` successfully encapsulate previous inline CI logic, improving workflow readability. `audit-design-tokens.sh` properly enforces zero raw hex color usage in TSX files.
* **CI Status:** The PR passes all validation (`deploy`, `build`, `resolve-conflicts`, `verify-changes`, etc.).

### Recommendations
* The transition to `td` simplifies execution. Be aware that other open PRs (#3121, #3115, #3124) make modifications directly to `td_cli.py`. Depending on merge order, those changes must be re-applied to the renamed `td` file or merged before this rename occurs to avoid massive conflicts.
* `run-parallel.sh` uses `#!/usr/bin/env bash` which is correct and portable.

### Conclusion
Excellent refactor moving towards standard CLI naming conventions (`td` over `td_cli.py`) and solid improvements to parallel script execution. Code is clean and well-structured.
