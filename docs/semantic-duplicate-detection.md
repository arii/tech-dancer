# Semantic Duplicate Detection

Boomtick can now generate an AST-based semantic duplicate inventory and report without relying on string matching. The detector fingerprints source files by JSX shape, child hierarchy, repeated `className` patterns, imported symbols, React hook calls, and utility calls.

## Run the Audit

```bash
pnpm run audit:semantic
```

The command writes:

- `artifacts/semantic-duplicates/report.md` for human review.
- `artifacts/semantic-duplicates/report.json` for CI, bots, or follow-up codemods.

Generated `artifacts/` output is intentionally ignored by Git so reports can be regenerated locally or in CI without creating noisy diffs.

## Similarity Rubric

The report uses the following weighted scoring model:

| Metric | Weight |
| --- | ---: |
| JSX structure | 40% |
| Child hierarchy | 20% |
| Class names | 15% |
| Imported components | 10% |
| Hook usage | 10% |
| Utility usage | 5% |

Scores are bucketed as:

- `90-100%`: definitely duplicate.
- `75-89%`: likely duplicate.
- `60-74%`: review manually.
- `<60%`: omitted from the candidate list.

## What It Detects

The detector reports:

1. A component inventory across `src/**/*.tsx` and `src/**/*.jsx`.
2. Semantic role groups such as hero, header, card, grid, sidebar, tool, form, and navigation components.
3. Exact JSX structure groups and repeated JSX subtree patterns that expose shared UI motifs even when component names differ.
4. Candidate duplicate component pairs that exceed the manual-review threshold.
5. Repeated literal `className` patterns that may belong behind layout primitives or composed components.
6. Duplicate date/formatting logic signals based on matching Date and formatter call signatures.

## Recommended Review Flow

1. Run `pnpm run audit:semantic` before a broad UI refactor.
2. Start with `Definitely duplicate` component pairs and repeated class patterns.
3. Prefer project primitives (`Box`, `Stack`, `Grid`, `Text`) or a focused composed component over one-off consolidation.
4. Convert high-confidence clusters into dispatchable issues; `docs/semantic-duplicate-github-issues.md` contains the initial backlog.
5. For high-confidence migrations, add a dedicated jscodeshift codemod in a separate PR after the report identifies the target API.
