## Comprehensive PR Review: #3114

### Summary
This PR implements the `github.create_issue` MCP tool within the `boomtick-mcp` package. It correctly acts as a Tier 1 layer wrapping the Tier 2 `td-cli gh create-issue` command, utilizing Zod for robust input and output parsing.

### Observations
* **File Changes:**
  * `boomtick-pkg/mcp/src/mcp/definitions.ts`: Adds the `github.create_issue` schema (Title, Body).
  * `boomtick-pkg/mcp/src/mcp/server.ts`: Wires the tool directly to its new handler (`createIssueHandler`).
  * `boomtick-pkg/mcp/src/tools/github.create_issue.ts`: Implements the handler, correctly calling `runCommand("td-cli", [...])` and parsing the output string against a Zod schema.
  * `boomtick-pkg/mcp/src/tools/github.create_issue.test.ts`: Complete unit tests mocking the CLI shell wrapper.
  * `td_cli.py`: Adjusts `sys.path.append` logic to ensure both CLI root and `dev_tools` are available, fixing implicit import errors.
  * `package.json`: Prefixes the `audit:anti-patterns` script with `PYTHONPATH` exports so the anti-pattern script runs properly locally.
* **Adherence to Repository Standards:** The new MCP tool perfectly aligns with memory constraints: it uses `runCommand("td-cli", ["gh", ...])` instead of raw `gh` binaries, and it validates CLI inputs/outputs using `Zod`.
* **CI Status:** The PR passes all validation (`deploy`, `build`, `resolve-conflicts`, `verify-changes`, etc.).

### Recommendations
* The implementation is clean and completes the `github.create_issue` feature request robustly. The addition of Python path bootstrapping in `td_cli.py` makes it far more resilient.

### Conclusion
Excellent addition to the MCP server. The tool is fully compliant with repository constraints. Ready for merge.
