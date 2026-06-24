```markdown
## Issue audit result
**Recommendation:** Keep open, needs refinement

**Reason:**
The changes in this PR introduce several improvements and refactorings to the CI workflow, but there are a few issues and areas for improvement that need to be addressed before merging:

1. **Inconsistent YAML Formatting:**
   - The indentation and formatting of the YAML file have been altered in a way that reduces readability. For example, the `branches` and `paths` keys now use a list format, which is acceptable, but the indentation is inconsistent. This can lead to confusion and potential errors in the future. Consistent formatting is critical for maintainability.

2. **Unnecessary Changes to `workflow_dispatch`:**
   - The `workflow_dispatch` key has been changed to `null`. This is unnecessary and could lead to confusion. If the intention is to disable manual triggering, it should be explicitly removed rather than set to `null`.

3. **Improper Use of Quotation Marks in Shell Commands:**
   - The updated shell commands use inconsistent quoting styles, such as double single quotes (`''`) within double quotes (`"`) in the `trap` commands. This is unconventional and could lead to issues with shell parsing. For example:
     ```bash
     run: 'echo "::group::Validate Runtime"
           trap ''echo "::endgroup::"'' EXIT
           pnpm run check:runtime-files
           pnpm run doctor
           '
     ```
     This should be rewritten for clarity and correctness:
     ```bash
     run: |
       echo "::group::Validate Runtime"
       trap 'echo "::endgroup::"' EXIT
       pnpm run check:runtime-files
       pnpm run doctor
     ```

4. **Removal of Comments:**
   - The updated PR removes several comments that provide context for the steps in the workflow, such as:
     ```yaml
     # Setup dependencies once and use caching for speedup.
     ```
     These comments are helpful for future maintainers and should not be removed unless they are incorrect or redundant.

5. **Potential Regression in Design Token Compliance Check:**
   - The `Design Token Compliance` step has been removed entirely. This step checks for raw hex colors in `.tsx` files and ensures compliance with design tokens. Removing this step could lead to regressions in design consistency. If this step is no longer needed, the PR should provide a clear justification for its removal.

6. **Lack of Explanation for Changes:**
   - The PR does not include a description or justification for the changes made to the CI workflow. For example, the changes to the `branches` and `paths` keys, as well as the removal of certain steps, are not explained. This makes it difficult to assess the intent and potential impact of the changes.

**Implementation evidence:**
- PRs checked: #2821
- The diff shows significant changes to the `.github/workflows/ci.yml` file, including formatting adjustments, removal of comments, and modifications to the workflow steps.

**Remaining work:**
1. Restore consistent YAML formatting throughout the file.
2. Remove the `workflow_dispatch: null` line if manual triggering is not required, or provide a clear explanation for this change.
3. Fix the improper use of quotation marks in shell commands for better readability and to avoid potential parsing issues.
4. Restore the removed comments that provide context for the workflow steps.
5. Reintroduce the `Design Token Compliance` step or provide a clear justification for its removal.
6. Add a detailed description to the PR explaining the intent and rationale behind each change.

Once these issues are addressed, the PR can be re-evaluated for merging.
```