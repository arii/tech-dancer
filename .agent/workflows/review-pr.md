> Follow `.agent/AGENT_CONTRACT.md` before reading anything else.

## Failure Modes (Read Before Starting)

- **DO NOT** read context from any source other than the files specified below.
- **DO NOT** create new files unless this workflow explicitly says so.
- **DO NOT** skip steps because an earlier step produced no output.
- **DO NOT** submit partial JSON — all placeholder values must be replaced.
- If you are uncertain about a line number, re-read the diff. Never guess.

---

## description: review a single GitHub pull request with in-depth inline feedback using decoupled files

## Workflow State

Current step: [ ] Step 0 | [ ] Step 1 | [ ] Step 2 | [ ] Step 3 | [ ] Step 4

Instructions: Mark each step complete (`[x]`) before proceeding to the next.
A step is only complete when its output file exists and contains non-placeholder content.

# Review a Pull Request

// turbo-all

0. **Environment Setup & Pre-flight validation**: **Node >=22** is required for full visual regression testing.

```bash
bash dev-tools/verify.sh
source .venv/bin/activate
export PYTHONPATH=$(pwd)/dev-tools

td-cli gh conflicts --pr PR_NUMBER
td-cli gh validate-issue --issue-number RELATED_ISSUE_NUMBER
PYTHONPATH=$(pwd)/dev-tools python3 dev-tools/tdw_services/cli.py gh detect-conflicts --pr PR_NUMBER
PYTHONPATH=$(pwd)/dev-tools python3 dev-tools/tdw_services/cli.py gh validate-issue --issue-number RELATED_ISSUE_NUMBER
```

1. **Generate the review documents**:

```bash
td-cli gh audit-pr PR_NUMBER --fetch
PYTHONPATH=$(pwd)/dev-tools python3 dev-tools/tdw_services/cli.py gh audit-pr PR_NUMBER --fetch
```

(This creates `dev-tools/logs/reviews/pr-context-PR_NUMBER.md` for reading, and `dev-tools/logs/reviews/pr-review-PR_NUMBER.md` for writing).

2. **Read the Context & Instructions**:
   - Read `.agent/workflows/REVIEW_INSTRUCTIONS.md` to understand the audit criteria. The audit scope includes `src/features`, `src/pages`, `src/components`, and `src/layouts`.
   - Read `dev-tools/logs/reviews/pr-context-PR_NUMBER.md` to analyze the code diffs, stats, and **CI Status**.
   - **Log Triage**: If the CI Status section shows failures, examine the "Failing Tests/Build Errors" and "Failure Logs Snippet" to identify root causes.

3. **Draft the Feedback (Output)**:
   - Open the generated `dev-tools/logs/reviews/pr-review-PR_NUMBER.md` file.
   - Explicitly mark every `- [ ]` checklist item as `- [x]` or note the violation. The **Anti-AI-Slop checklist** is mandatory for all reviews.
   - Fill in the `body` string within the JSON block at the bottom of the file with your overall findings and final recommendation. Ensure the output strictly follows the required JSON schema.
   - Populate the `comments` array within the JSON block with specific inline feedback. Ensure path and line match the diff exactly.
   - **Do not edit the pr-context file.**

4. **Submit & Cleanup**: Parse the document and submit the review in one step. If programmatic approval is restricted (e.g., self-approval constraints), use the `--event COMMENT` flag. Use `--cleanup` to remove the working files on success:

```bash
td-cli gh audit-pr PR_NUMBER --submit --cleanup [--event COMMENT]
PYTHONPATH=$(pwd)/dev-tools python3 dev-tools/tdw_services/cli.py gh audit-pr PR_NUMBER --submit --cleanup [--event COMMENT]
```
