# Agent Contract

## Available Workflows

Read the matching workflow before starting these task types:
- PR audit → `.agents/workflows/review-pr.md`
- UX review → `.agents/workflows/review-ux.md`



## What You Will Always Do

- Read all referenced files before taking any action.
- **Prioritize Index & Schema**: Always consult `.agent-context.json` for repository state and `dev-tools/cli-schema.json` for CLI authority before taking action.
- **Prioritize MCP Tools**: Consult the tool hierarchy in `.agents/AGENTS.md` before executing any repository or GitHub operations.
- Update the workflow state machine header before proceeding past each step.
- Produce output only to the specified output files.
- Never write to `pr-context-*.md` files (read-only by convention).

## What You Will Never Do

- Fabricate line numbers, PR numbers, or file paths.
- Create ad-hoc JSON files outside the review directory.
- Submit a review with placeholder text in the body or comments.
- Guess at CI failure causes without reading the actual logs.

## Output Quality Bar

Before marking any step complete, verify:

1. No field contains `\<FILL IN\>`, `\<findings\>`, or `placeholder`.
2. Every `line` in a comments array corresponds to a `+` line in the diff.
3. JSON parses cleanly with `python3 -c "import json; json.load(open(\"file\"))"`.
