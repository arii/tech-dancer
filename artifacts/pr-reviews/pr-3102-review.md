## Comprehensive PR Review: #3102

### Summary
This PR fixes branch validation anomalies during automated Jules agent dispatch operations, centralizing the `CLIError` exception class and optimizing GitHub label searches to utilize the native Search API rather than inefficient client-side pagination.

### Observations
* **File Changes:**
  * `orchestrator.py`: `dispatch_task` now correctly raises a structured `CLIError` instead of falling back to a raw JSON print pattern when branch existence fails, satisfying the "fail-fast" pipeline requirements. The code correctly handles finding `source_id` from the AIClient before dispatching a task to the `JulesClient`.
  * `tdw_services/services/github.py`: Introduced `branch_exists` cache and transitioned `list_pull_requests` label filtering to utilize `GET /search/issues` entirely instead of iterating standard `Pulls` REST pages manually.
  * `utils.py`: Moved the `CLIError` definition into this centralized utility, eliminating duplicate definitions across different `cli.py` and `dev_tools_sdk` files.
  * `test_github.py` and `test_github_no_gh.py`: Updated mock patterns to align with the new Search API integration for PR label fetching.
* **Adherence to Repository Standards:** Moving the exception class to `utils.py` standardizes error throwing. The Search API integration avoids timeouts previously seen during heavy API loads. Using `CLIError` in `dispatch_task` enables `td_cli.py` to intercept and parse errors as `status: error` JSON outputs successfully.
* **CI Status:** The PR passes all validation (`deploy`, `build`, `resolve-conflicts`, `verify-changes`, etc.).

### Recommendations
* Excellent optimization of the GitHub Client. Server-side searching reduces token constraints and API rate limits significantly compared to the old pagination method.

### Conclusion
Code changes look excellent. Validating branch dispatch and standardizing CLI errors improve stability. Ready for merge.
