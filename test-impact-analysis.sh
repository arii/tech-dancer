#!/usr/bin/bash
export GEMINI_API_KEY=$GOOGLE_API_KEY
export GITHUB_TOKEN=$GITHUB_PAT
pnpm run impact:analysis
#pnpm run impact:build-main
#pnpm run impact:visual-diff
#pnpm run impact:dom-diff
#pnpm run impact:gemini-code-review
pnpm run impact:github-models-code-review
#pnpm run impact:gemini-review
#pnpm run impact:github-models-review