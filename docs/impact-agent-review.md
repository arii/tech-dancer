# Impact Agent Review

This script runs after the standard impact analysis (visual diff, DOM diff, etc.) to review the visual difference output using a Gemini model and produce an actionable PR comment indicating what specifically changed from a visual standpoint.

## Prerequisites

You must have the `impact` pipeline executed before running the agent review to ensure there are screenshots to process. Ensure you have Node and pnpm setup correctly according to the repo standard.

To be able to run this script locally and interact with the Gemini API, you need to set up the `GEMINI_API_KEY` in your environment. To have the script comment on a Pull Request, you need the optional `GITHUB_TOKEN`, `GITHUB_REPOSITORY`, and `PR_NUMBER` environment variables set.

## Running locally

To generate visual UI diff output to analyze and run the review script locally, you first need to run the prerequisites, then run the newly added `impact:agent-review` script.

\`\`\`bash
# 1. Run the impact visual suite to generate artifacts
pnpm impact:analysis
pnpm impact:build-main
pnpm impact:visual-diff
pnpm impact:dom-diff

# 2. Run the Gemini review agent
export GEMINI_API_KEY="your-gemini-api-key"
pnpm run impact:agent-review
\`\`\`

The agent will output a markdown report locally at `artifacts/agent-review.md`.

### Commenting to a PR

If you'd like the output to actually be commented to a PR when testing locally, just define the GitHub specific variables:

\`\`\`bash
GEMINI_API_KEY="your-gemini-api-key" \\
GITHUB_TOKEN="your-github-token" \\
GITHUB_REPOSITORY="owner/repo" \\
PR_NUMBER="42" \\
pnpm run impact:agent-review
\`\`\`
