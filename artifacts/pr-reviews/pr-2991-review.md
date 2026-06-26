## PR Review

**Summary:** This PR enhances the `td_cli.py` GitHub integration by adding subcommands for getting, updating, and commenting on issues. It updates the orchestrator to decouple file reading from API requests and expands the Python MCP server with corresponding tools (`gh_get_issue`, `gh_update_issue`, `gh_issue_comment`).

**Findings:**
- **Code Organization:** The change refactoring `_read_safe_file` out of `create_issue` and `post_comment` in `orchestrator.py` is a solid improvement. It correctly pushes IO handling to the CLI layer (`td_cli.py`) or MCP handler, ensuring the core services operate on raw strings.
- **MCP Validation:** In `boomtick-mcp/src/github_tools.py`, the added JSON schemas correctly define the inputs, and the `execute_github_tool` function efficiently routes these new tools.
- **Documentation:** `dev-tools/cli-schema.json` is accurately updated to include the `get-issue`, `update-issue`, and `issue-comment` commands, maintaining the canonical source of truth for the CLI.
- **Testing:** The Python unit tests in `test_td_cli.py` have been correctly updated to mock `_read_safe_file` rather than the broader functions, tightening the test suite. All CI checks pass successfully.

**Recommendation:** Approved. The implementation successfully expands the utility of the dev-tools to manage GitHub issues natively and over MCP, adhering to the project's abstraction boundaries.
