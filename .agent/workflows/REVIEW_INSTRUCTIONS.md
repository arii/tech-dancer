# Code Review Standards & Instructions

When evaluating a Pull Request, you must read the generated diff context (pr-context-<PR_NUMBER>.md) and evaluate the code against the following rigorous standards.

You will record your findings in the writeable pr-review-<PR_NUMBER>.md file.

## 1. Audit Checklist Verification

The pr-review-<PR_NUMBER>.md file contains a checklist. You MUST systematically verify each item against the diff context and check it off (- [x]).

- **Dead abstractions**: Did they introduce a new class, context, or hook that a simpler primitive could handle?
- **Unnecessary indirection**: Does this add a layer of wrapping where a direct function call would suffice?
- **Responsibility creep**: Is a component taking on state or logic that belongs in a parent container or a custom hook?
- **Import bloat**: Is `import React from 'react'` included unnecessarily (not needed in React 17+)?
- **Token compliance**: Are they using raw Tailwind values (e.g., `text-[13px]`, `bg-[#f4f4f4]`) or inline styles instead of the established design tokens?
- **Audit ratio**: If the PR adds > 100 lines of code, you must find at least 10 lines of code to recommend removing or refactoring.

## 2. Formatting the JSON Output

At the bottom of pr-review-<PR_NUMBER>.md, there is a JSON block. You must write your feedback strictly into this JSON structure. Your script will parse this exact block to submit to the GitHub API.

### The JSON Schema:

```json
{
  "body": "## ANTI-AI-SLOP\n<findings>\n\n## FINDINGS\n<summary>\n\n## FINAL RECOMMENDATION\n<Approved | Approved with Minor Changes | Not Approved>",
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

- **Checkboxes First**: You must interact with and check the `- [ ]` boxes in the markdown portion of the file before filling out the JSON.
- **Always provide at least one comment** in the `comments` array. If the PR is flawless, mention it is clean in the main body but still provide at least one commendation comment.
- **Line Numbers**: The `line` property in your comment must match an actual added or modified line (`+`) in the diff context.
- **JSON Validity**: Ensure the final submission block remains 100% valid JSON. Escape double quotes `\"` and newlines `\n` within the string values.
