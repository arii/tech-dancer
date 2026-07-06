# Code Review Standards & Instructions

When evaluating a Pull Request, you must read the generated diff context (pr-context-<PR_NUMBER>.md) and evaluate the code against the following rigorous standards.

You will record your findings in the writeable `pr-review-<PR_NUMBER>.md` file.

## 1. Output Protocol (CRITICAL)

- **Target File**: You MUST modify the existing `pr-review-{PR}.md` file.
- **NO New Files**: DO NOT create temporary files or new JSON files. The submission scripts ONLY read from the specified `pr-review-{PR}.md` file.
- **Checklist Completion**: Every item in the Audit Checklist MUST be marked to indicate it was verified.
- **JSON Block**: You MUST fill the JSON block at the bottom of the file with your findings.

## 2. Review Philosophy & Audit Checklist

You MUST adopt a **Senior Engineer** mindset.

### Review Philosophy:
- **Evidence Rule**: Every issue MUST satisfy: Point to exact line, explain why it's incorrect, explain runtime consequence, and explain why the previous version was better. No speculation.
- **Regression Mindset**: Review ONLY changes in this PR. Assume original code worked. Ignore pre-existing issues unless made worse.
- **Simplicity**: Prefer removing code. Flag unnecessary abstractions (wrapper classes, pass-through hooks, one-line helpers).
- **False Positive Filter**: Before reporting, verify: Is it introduced by the PR? Would it occur at runtime? Am I certain?

### Audit Checklist Marking:
- **`[x]`**: Verified and **passed**.
- **`[ ]`**: Verified and **failed**. Provide feedback in `FINDINGS` and JSON comments.

The **Anti-AI-Slop checklist** is mandatory:
- **Dead abstractions**: Simplest primitive used?
- **Unnecessary indirection**: Direct function calls preferred over wrappers?
- **Responsibility creep**: State/logic in the correct place?
- **Import bloat**: No redundant `import React`?
- **Token compliance**: Established design tokens used (no raw Tailwind for layout)?
- **Audit ratio**: For > 100 lines added, identified 10 lines to refactor/remove?

## 3. CI Failure Handling

If the PR context indicates failing CI checks:
- **Block Approvals**: You MUST NOT recommend "Approved" if there are failing CI checks that are related to the PR changes.
- **Log Triage**: You must complete the "CI Log Triage" section in the review file. Use the "Detected Errors" and "Failure Logs Snippet" from the context file to perform a Root Cause Analysis and provide Remediation Steps.
- **Prioritize Fixes**: Mention the CI failures prominently in your review body and prioritize their resolution.

## 4. Severity & Confidence

Every blocking issue MUST include a **Confidence Score**: **high**, **medium**, **low**.
Only report blocking issues when confidence is **HIGH**.

### Severity Definitions:
- **error**: Incorrect behavior, data loss, security vulnerability, crash, broken API, build failure, deterministic bug.
- **warn**: Maintainability regression, readability regression, unnecessary complexity, duplicated logic, performance issue.
- **info**: Documentation, naming, formatting.

Never label style preferences as errors.

### Review Status Mapping:
- **Approved**: Zero violations AND all critical CI checks passing.
- **Approved with Minor Changes**: Minor non-breaking violations (e.g., info/warn issues).
- **Not Approved**: Architectural regressions, breaking changes (errors), major token violations, OR failing CI checks.

## 5. Formatting the JSON Output

At the bottom of `pr-review-<PR_NUMBER>.md`, there is a JSON block. You must write your feedback strictly into this JSON structure.

### The JSON Schema:

```json
{
  "body": "## ANTI-AI-SLOP\n- [x] No dead abstractions\n- [x] No unnecessary indirection\n- [x] No responsibility creep\n- [x] No import bloat\n- [x] Token compliance verified\n- [x] Audit ratio satisfied\n\n## FINDINGS\n<summary of key findings and observations>\n\n## FINAL RECOMMENDATION\n<Approved | Approved with Minor Changes | Not Approved>",
  "comments": [
    {
      "path": "src/example.tsx",
      "line": 42,
      "body": "This abstraction is unnecessary. Consider passing this as a direct prop."
    }
  ]
}
```

### Output Rules:

- **Replace Placeholders**: Replace all `<findings>`, `<summary>`, and `<Approved | ...>` placeholders with actual analysis.
- **Always provide at least one comment** in the `comments` array.
- **Line Numbers**: Every inline comment MUST have a `line` number that exists within the **Valid Comment Ranges** for that file in the diff context.
- **JSON Validity**: Ensure the final submission block remains 100% valid JSON.

## 6. Infrastructure & Component Awareness

Before suggesting an implementation, verify if it already exists:

- **Layout primitives**: `src/layouts/` (Box, Stack, Grid, Text, Button)
- **UI components**: `src/components/ui/`
- **Custom hooks**: `src/hooks/` (useSearchParam, useGlobalSearch, useHotkeys)
- **Utilities**: `src/lib/utils.ts` (cn, safeSearch)
- **Design tokens**: `src/styles/design-tokens.ts` and `tokens.css`

**Do NOT request:**
- Building layout with `div` + flex when `<Stack>` or `<Box>` exists.
- Adding `import React` in React 17+ files.

## 7. Failure Modes (Avoid These)

- **hallucinating PR Numbers**: Always use the PR number provided in the prompt.
- **Out-of-range comments**: Comments on lines not in the diff cause 422 errors.
- **Empty payloads**: Never submit a review with empty findings or placeholders.

## 8. Tooling Guidelines

Agents must not directly use git or gh commands but reuse existing tooling (`td-cli`).
