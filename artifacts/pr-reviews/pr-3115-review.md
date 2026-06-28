## Comprehensive PR Review: #3115

### Summary
This PR fixes execution pathing and environment anomaly bugs in setup/verification scripts specifically related to the monorepo migration and CLI validation.

### Observations
* **File Changes:**
  * `td_cli.py`: Introduces `ALLOW_HELP="1"` check to allow `--help` bypasses for verification scripts (fixing the fatal exit anomaly).
  * `pyproject.toml`: Adds missing `PyYAML` dependency.
  * `setup-agent.sh`: Updates `snapshot.sh` path execution to correctly use `$SCRIPT_DIR` instead of hardcoded `dev-tools`.
  * `snapshot.sh` and `verify-workflows.sh`: Corrected `cd "$(dirname "$0")` depth traversal for the new monorepo layout (i.e., `../..`).
  * `verify-workflows.sh`: Fully wired `PYTHONPATH=boomtick-pkg/cli python3 boomtick-pkg/cli/dev_tools/td_cli.py` across all checks and injected `ALLOW_HELP=1`.
  * `detect-antipatterns.mjs`: Added explicit standard `--help` support to prevent the script from treating it as a target directory or crashing.
* **Adherence to Repository Standards:** This PR correctly implements environment requirements: `export PYTHONPATH=boomtick-pkg/cli...` for executing `td_cli.py`, `ALLOW_HELP=1` bypassing, and fixing paths in standard scripts.
* **CI Status:** The PR passes all validation (`deploy`, `build`, `resolve-conflicts`, `verify-changes`, etc.).

### Recommendations
* The changes are architecturally sound. Modifying `snapshot.sh` and `verify-workflows.sh` path resolution correctly handles the package extraction (`boomtick-pkg/cli/`).
* The `ALLOW_HELP=1` bypass implementation in `td_cli.py` is straightforward. Note that PR #3121 entirely refactors how `--help` is blocked in `td_cli.py` and `cli.py` (via `DynamicHelpGroup`), so if PR #3121 is merged after this, it will overwrite the inline `sys.argv` changes here. However, the bash script changes and dependency additions here are fully orthogonal and correct.

### Conclusion
Excellent cleanup of broken script paths and help-flag handling. Ready for merge.
