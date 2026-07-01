# Review Pull Request

This workflow has been migrated to deterministic workflow generation.

Generate:

boomtick-pkg/cli/logs/workflows/workflow-plan-pr-{PR_NUMBER}.md

using:

td ai review \
  --pr PR_NUMBER \
  --issue ISSUE_NUMBER

Then execute:

Execute boomtick-pkg/cli/logs/workflows/workflow-plan-pr-{PR_NUMBER}.md
