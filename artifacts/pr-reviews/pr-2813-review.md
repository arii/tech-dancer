```markdown
## Issue audit result
**Recommendation:** Keep open, needs refinement

**Reason:**
The proposed changes introduce support for `branch` and `pr` parameters in `jules.create_session` and add a new tool `jules.trigger_feedback`. While the implementation is mostly sound, there are several areas that require refinement to ensure robustness, maintainability, and adherence to best practices.

### Observations and Concerns:
1. **Error Handling in `createJulesSessionHandler`:**
   - The logic for handling errors when fetching PR information (`gh pr view`) is insufficiently robust. Specifically:
     - The error message for parsing failures (`Failed to parse PR info for PR #${input.pr}: ${e}`) does not provide enough context about the nature of the parsing error. Consider logging the `prResult.stdout` to aid debugging.
     - The error message for failed PR retrieval (`Failed to get PR info for PR #${input.pr}: ${prResult.stderr}`) assumes `stderr` will always contain meaningful information, which may not be the case. A fallback message should be included for scenarios where `stderr` is empty or unhelpful.

2. **Default Branch Handling:**
   - The fallback logic for `startingBranch` (`process.env.DEFAULT_BASE_BRANCH || "main"`) is reasonable but lacks validation. If `DEFAULT_BASE_BRANCH` is set to an invalid value, the system may behave unpredictably. Consider validating the branch name format before using it.

3. **Dependency on `gh` CLI:**
   - The reliance on the `gh` CLI for fetching PR information introduces a runtime dependency that may not be available in all environments. This dependency should be documented clearly, and the system should gracefully handle cases where `gh` is not installed or fails to execute.

4. **Testing Coverage:**
   - The added tests for `createJulesSessionHandler` are thorough and cover various scenarios, including valid inputs and error cases. However:
     - The test for the `branch` parameter does not validate the behavior when an invalid branch name is provided. Adding such a test would improve coverage.
     - The test for the `pr` parameter assumes the `gh pr view` command will always return valid JSON. A test case for invalid JSON responses should be added to ensure the error handling logic works as intended.

5. **New Tool `jules.trigger_feedback`:**
   - The new tool `jules.trigger_feedback` is introduced with a corresponding handler and input schema. While the implementation appears sound, the diff does not include the actual implementation of `triggerJulesFeedbackHandler`. This makes it impossible to fully evaluate its correctness or potential risks. Ensure the implementation is reviewed in a separate PR or commit.

6. **Code Style and Consistency:**
   - The description for the `branch` and `pr` properties in the input schema is clear and concise. However, consider adding examples or constraints (e.g., regex validation for branch names) to ensure the inputs are well-formed.
   - The `createJulesSessionHandler` function is growing in complexity due to the addition of new parameters. Consider refactoring the function to separate concerns (e.g., extracting the PR-related logic into a helper function) for better readability and maintainability.

**Implementation evidence:**
- PRs checked: #2813
- Files reviewed:
  - `boomtick-mcp/src/mcp/server.ts`
  - `boomtick-mcp/src/tools/jules/create-session.test.ts`
  - `boomtick-mcp/src/tools/jules/create-session.ts`
  - `boomtick-mcp/src/tools/jules/trigger-feedback.test.ts`

**Remaining work:**
1. Improve error handling in `createJulesSessionHandler`:
   - Add more context to error messages for debugging purposes.
   - Validate `DEFAULT_BASE_BRANCH` and `branch` inputs to ensure they are valid branch names.
   - Add fallback logic for cases where `stderr` from `gh pr view` is empty or unhelpful.

2. Address dependency on `gh` CLI:
   - Document the dependency in the project README or relevant documentation.
   - Add runtime checks to ensure `gh` is installed and accessible, with appropriate error handling if it is not.

3. Enhance test coverage:
   - Add tests for invalid branch names.
   - Add tests for invalid JSON responses from `gh pr view`.

4. Refactor `createJulesSessionHandler`:
   - Extract PR-related logic into a separate helper function to improve readability and maintainability.

5. Review the implementation of `triggerJulesFeedbackHandler`:
   - Ensure the logic is sound and aligns with the input schema.
   - Verify that error handling and edge cases are adequately addressed.

6. Perform a final review after addressing the above concerns to ensure all changes are implemented correctly and safely.

```