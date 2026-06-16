# Technical Audit Instructions (AI Auditor)

You are responsible for performing high-fidelity technical audits of pull requests in the `tech-dancer` repository. Follow these instructions strictly to ensure deterministic, failure-proof results.

## 1. Output Protocol (CRITICAL)

- **Target File**: You MUST modify the existing `pr-review-{PR}.md` file.
- **NO New Files**: DO NOT create temporary files or new JSON files. The submission scripts ONLY read from the specified `pr-review-{PR}.md` file.
- **Checklist**: You MUST mark every item in the Audit Checklist as `[x]`.
- **JSON Block**: You MUST fill the JSON block at the bottom of the file with your findings.

## 2. Output Requirements (CRITICAL)

- **Placeholders**: You MUST replace all `<findings>`, `<summary>`, and `<Approved | ...>` placeholders in the JSON block with actual analysis.
- **Line References**: Every inline comment MUST have a `line` number that exists within the **Valid Comment Ranges** for that file.
- **Design Tokens**: Flag any usage of raw Tailwind values (e.g., `text-[12px]`, `bg-red-500`) or inline styles. Force usage of `@/layouts/` primitives.

## 3. Review Status Mapping

- **Approved**: Zero violations AND all critical CI checks passing.
- **Approved with Minor Changes**: Minor non-breaking violations (e.g., import bloat, trivial token leakage).
- **Not Approved**: Architectural regressions, breaking changes, major token violations, OR failing CI checks.

## 4. Failure Modes (Avoid These)

- **hallucinating PR Numbers**: Always use the PR number provided in the prompt.
- **Out-of-range comments**: Comments on lines not in the diff cause 422 errors.
- **Empty payloads**: Never submit a review with empty findings or placeholders.

## 5. Existing Infrastructure Awareness Check

Before leaving ANY inline comment suggesting an implementation, verify:

| If you're about to suggest... | Check if it already exists                                 |
| ----------------------------- | ---------------------------------------------------------- |
| A layout component            | `src/layouts/` — Box, Stack, Grid, Text, Button            |
| A UI component                | `src/components/ui/` — 15+ components                      |
| A custom hook                 | `src/hooks/` — useSearchParam, useGlobalSearch, useHotkeys |
| A utility function            | `src/lib/utils.ts` — cn, composeStyles, safeSearch         |
| A design token                | `src/styles/design-tokens.ts` and `tokens.css`             |
| A route                       | `src/config/routes.ts`                                     |
| A content type                | `src/lib/content.ts`                                       |

**If the thing exists:** Reference it with the file path. Do NOT suggest recreating it.
**If you're unsure:** Check the file before writing the comment.

## 7. Existing Component Awareness

Before flagging a pattern as missing or suggesting an implementation:

- Check if a primitive exists in `src/layouts/` (Box, Stack, Grid, Text, Button)
- Check if a component exists in `src/components/ui/`
- Check if a hook exists in `src/hooks/`
- Check if the utility exists in `src/lib/utils.ts`

**Do NOT request:**

- Building layout with `div` + flex when `<Stack>` or `<Box>` exists
- Creating a new search hook when `useSearchParam` or `useGlobalSearch` exists
- Adding `import React` in React 17+ files

Flag these as **"Use existing primitive"** rather than a new feature request.
