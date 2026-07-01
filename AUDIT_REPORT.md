# AI Slop Audit Report

## Verification Checklist


* [ ] `./.agents/scripts/` files
  - [x] **`[x]` `./.agents/scripts/audit-ai-slop.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./` files
  - [x] **`[x]` `./.dependency-cruiser.config.mjs` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./boomtick-pkg/.agents/scripts/` files
  - [x] **`[x]` `./boomtick-pkg/.agents/scripts/audit-ai-slop.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./boomtick-pkg/cli/` files
  - [x] **`[x]` `./boomtick-pkg/cli/ai-debugger.mjs` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./boomtick-pkg/cli/clients/` files
  - [x] **`[x]` `./boomtick-pkg/cli/clients/__init__.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./boomtick-pkg/cli/dev_tools/` files
  - [x] **`[x]` `./boomtick-pkg/cli/dev_tools/__init__.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/cli/dev_tools/cli.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/cli/dev_tools/config.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/cli/dev_tools/get_ai_context.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./boomtick-pkg/cli/dev_tools/handlers/` files
  - [x] **`[x]` `./boomtick-pkg/cli/dev_tools/handlers/__init__.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/cli/dev_tools/handlers/command_handler.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./boomtick-pkg/cli/dev_tools/` files
  - [x] **`[x]` `./boomtick-pkg/cli/dev_tools/models.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/cli/dev_tools/orchestrator.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [ ] `./boomtick-pkg/cli/dev_tools/review_read_pass.py`

    * **Detected Slop Patterns:**
    * L235: Unnecessary React import (React 17+) | import React from 'react'

  - [x] **`[x]` `./boomtick-pkg/cli/dev_tools/schema_gen.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/cli/dev_tools/scope_check.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./boomtick-pkg/cli/dev_tools/services/` files
  - [x] **`[x]` `./boomtick-pkg/cli/dev_tools/services/__init__.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [ ] `./boomtick-pkg/cli/dev_tools/services/ai_service.py`

    * **Detected Slop Patterns:**
    * L632: Unnecessary React import (React 17+) | import React from 'react'

  - [x] **`[x]` `./boomtick-pkg/cli/dev_tools/services/dependency_graph.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/cli/dev_tools/services/github.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/cli/dev_tools/services/jules.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/cli/dev_tools/services/repair_service.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/cli/dev_tools/services/vector_store.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/cli/dev_tools/services/vision_service.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./boomtick-pkg/cli/dev_tools/` files
  - [x] **`[x]` `./boomtick-pkg/cli/dev_tools/td_cli.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/cli/dev_tools/utils.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/cli/dev_tools/ux_report.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/cli/dev_tools/verify_versions.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/cli/dev_tools/version_utils.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./boomtick-pkg/mcp/scripts/` files
  - [x] **`[x]` `./boomtick-pkg/mcp/scripts/export-mcp-schema.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/scripts/sync-contracts.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./boomtick-pkg/mcp/src/` files
  - [x] **`[x]` `./boomtick-pkg/mcp/src/config.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./boomtick-pkg/mcp/src/evals/` files
  - [x] **`[x]` `./boomtick-pkg/mcp/src/evals/run-evals.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./boomtick-pkg/mcp/src/` files
  - [x] **`[x]` `./boomtick-pkg/mcp/src/index.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./boomtick-pkg/mcp/src/lib/` files
  - [x] **`[x]` `./boomtick-pkg/mcp/src/lib/error_utils.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/lib/git.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/lib/result.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/lib/shell.test.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/lib/shell.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/lib/test-utils.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./boomtick-pkg/mcp/src/mcp/` files
  - [x] **`[x]` `./boomtick-pkg/mcp/src/mcp/definitions.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/mcp/server.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/mcp/tools.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./boomtick-pkg/mcp/src/tools/` files
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/ddgs.search.test.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/ddgs.search.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/ddgs_search.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/github.checkout_branch.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/github.comment_triage_summary.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/github.create_issue.test.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/github.create_issue.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/github.create_pull_request.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/github.get_merge_conflict_files.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/github.get_pr_diff.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/github.issue_comment.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/github.issue_update.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/github.issue_view.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/github.open_replacement_pr.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/github.search_open_prs.test.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/github.search_open_prs.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./boomtick-pkg/mcp/src/tools/jules/` files
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/jules/cancel-session.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/jules/create-session.test.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/jules/create-session.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/jules/get-messages.test.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/jules/get-messages.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/jules/get-pr.test.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/jules/get-pr.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/jules/get-session.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/jules/list-sessions.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/jules/send-message.test.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/jules/send-message.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/jules/trigger-feedback.test.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/jules/trigger-feedback.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./boomtick-pkg/mcp/src/tools/` files
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/repo.commit_patch.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/repo.create_branch.test.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/repo.create_branch.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/repo.create_repair_branch.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/repo.get_changed_files.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/repo.get_package_scripts.test.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/repo.get_package_scripts.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/repo.get_route_map.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/repo.logs.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/repo.read_ci_logs.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/repo.run_lighthouse.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/repo.run_playwright.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/repo.run_tests.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./boomtick-pkg/mcp/src/tools/types.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./boomtick-pkg/mcp/` files
  - [x] **`[x]` `./boomtick-pkg/mcp/vitest.config.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./boomtick-pkg/scripts/` files
  - [x] **`[x]` `./boomtick-pkg/scripts/build-repo-context.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./` files
  - [x] **`[x]` `./eslint.config.mjs` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./etl/` files
  - [x] **`[x]` `./etl/__init__.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./etl/processor.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./etl/query_ledger.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./etl/scraper.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./` files
  - [x] **`[x]` `./knip.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./playwright.config.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./scripts/affiliate/` files
  - [x] **`[x]` `./scripts/affiliate/add-item.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/affiliate/audit-links.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/affiliate/audit.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/affiliate/image-helper.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/affiliate/utils.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./scripts/` files
  - [x] **`[x]` `./scripts/ai-playwright-crawler.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/base-path.js` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/check-runtime-files.mjs` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/check-runtime.mjs` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/check-suppression-inventory.mjs` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/check-visual-changes.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/clean-sitemap.mjs` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/cleanup-ports.mjs` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./scripts/clients/` files
  - [x] **`[x]` `./scripts/clients/geminiCodeReviewClient.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/clients/geminiVisualReviewClient.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/clients/githubModelsCodeReviewClient.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/clients/githubModelsVisualReviewClient.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./scripts/` files
  - [x] **`[x]` `./scripts/configure-log-drains.mjs` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/content-loader.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/detect-antipatterns.mjs` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/detect-semantic-duplicates.mjs` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/generate-assets.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/generate-robots.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/generate-spa-stubs.mjs` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/heartbeat.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/image-processing-utils.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/impact-analysis.config.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/impact-analysis.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/impact-build-main.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/impact-dom-diff.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/impact-gemini-code-review.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [ ] `./scripts/impact-gemini-review.ts`

    * **Detected Slop Patterns:**
    * L16: Potential textbook-style redundant comment | // The orchestrator handles missing visual summary

  - [x] **`[x]` `./scripts/impact-github-models-code-review.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/impact-github-models-review.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/impact-review-utils.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/impact-visual-diff.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/index-codebase.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./scripts/lib/` files
  - [x] **`[x]` `./scripts/lib/aiLogger.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/lib/buildCodeReviewPrompt.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/lib/codeReviewOrchestrator.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/lib/codeReviewTypes.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [ ] `./scripts/lib/codeReviewUtils.ts`

    * **Detected Slop Patterns:**
    * L5: Potential academic docstring | /**\n * Generates a stable SHA-256 hash for a code

  - [x] **`[x]` `./scripts/lib/geminiModelPicker.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/lib/geminiUtils.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/lib/heartbeat.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/lib/impact-analysis-utils.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/lib/modelPicker.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/lib/projectConfig.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/lib/promptCategories.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/lib/visualGuidelines.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/lib/visualReviewConstants.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/lib/visualReviewOrchestrator.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/lib/visualReviewTypes.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/lib/visualReviewUtils.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./scripts/orchestrator/` files
  - [x] **`[x]` `./scripts/orchestrator/agent_2_orchestrator.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./scripts/orchestrator/experiments/` files
  - [x] **`[x]` `./scripts/orchestrator/experiments/continuous_dev_loop.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/orchestrator/experiments/deterministic_loop.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/orchestrator/experiments/genai_orchestrator.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./scripts/orchestrator/` files
  - [x] **`[x]` `./scripts/orchestrator/utils.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./scripts/` files
  - [x] **`[x]` `./scripts/send-jules-impact.py` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/test-audit.mjs` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/ux-audit-runner.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/ux-capture.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/ux-discover-routes.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/ux-lighthouse-runner.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./scripts/validate-links.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/` files
  - [x] **`[x]` `./src/App.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/affiliate-tool.test.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/components/` files
  - [x] **`[x]` `./src/components/Equalizer.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/GlobalErrorBoundary.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/GlobalSearch.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/MobileBottomNav.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/Navigation.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ReferralBanner.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/SEO.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/components/editorial/` files
  - [x] **`[x]` `./src/components/editorial/ArticleNavigation.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/editorial/AuthorAvatar.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/editorial/EditorialHeader.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/editorial/EditorialHero.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/editorial/EditorialLayout.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/editorial/EditorialRelated.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/components/navigation/` files
  - [x] **`[x]` `./src/components/navigation/MobileMenuOverlay.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/navigation/NavItem.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/components/products/` files
  - [x] **`[x]` `./src/components/products/MerchImageDisplay.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/products/ProductCard.test.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/products/ProductCard.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/components/ui/` files
  - [x] **`[x]` `./src/components/ui/ActionButton.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/AffiliateCard.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/AffiliateDisclosure.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/BaseCard.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/CategoryPlaceholder.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/ContentCard.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/EmptyState.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/FilterBar.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/FilterButton.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/FolioGrid.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/HeroParticleCanvas.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/HeroSection.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/Icon.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/ListRow.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/Logo.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/MarkdownRenderer.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/Notice.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/PageHeader.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/PageSkeleton.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/ProductImageFrame.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/PromoStrip.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/Reveal.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/ScrollToTopButton.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/SearchBox.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/Skeleton.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/StatusBadge.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/ViewToggle.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/components/ui/Wordmark.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/config/` files
  - [x] **`[x]` `./src/config/constants.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/config/content.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/config/devai-assets.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/config/devai-tool-ids.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/config/hero.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [ ] `./src/config/research-tools.ts`

    * **Detected Slop Patterns:**
    * L1: Potential academic docstring | /**\n * Represents a tool or project in the resear

  - [x] **`[x]` `./src/config/routes.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/constants/` files
  - [x] **`[x]` `./src/constants/visual-viewports.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/context/` files
  - [x] **`[x]` `./src/context/ThemeContext.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/data/` files
  - [x] **`[x]` `./src/data/merch.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/data/products/` files
  - [x] **`[x]` `./src/data/products/catalog.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/data/products/merch.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/features/home/` files
  - [x] **`[x]` `./src/features/home/DevLabCallout.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/features/home/FeaturedGuidePanel.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/features/home/LatestPosts.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/features/home/TopicGrid.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/features/journal/` files
  - [x] **`[x]` `./src/features/journal/BlogFeed.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/features/journal/BlogPost.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/features/journal/components/` files
  - [x] **`[x]` `./src/features/journal/components/BlogPostDetail.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/features/journal/` files
  - [x] **`[x]` `./src/features/journal/useBlog.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/features/lab/` files
  - [x] **`[x]` `./src/features/lab/BlogDrafter.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/features/lab/components/` files
  - [x] **`[x]` `./src/features/lab/components/FullPreview.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/features/lab/` files
  - [x] **`[x]` `./src/features/lab/useBlogDrafter.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/features/profile/` files
  - [x] **`[x]` `./src/features/profile/ArielProfile.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/features/profile/components/` files
  - [x] **`[x]` `./src/features/profile/components/ProfileComponents.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/features/profile/` files
  - [x] **`[x]` `./src/features/profile/types.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/features/profile/useProfile.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/features/research/` files
  - [x] **`[x]` `./src/features/research/ResearchAnalytics.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/features/research/ResearchDetail.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/features/research/components/` files
  - [x] **`[x]` `./src/features/research/components/ArchitecturalAssetsList.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/features/research/components/DeploymentImpactAnalyzerTool.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/features/research/components/EcommerceAutomationTool.test.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/features/research/components/EcommerceAutomationTool.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/features/research/components/GitOpsReviewerTool.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/features/research/components/WCSChartContainers.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/features/research/components/WCSScraperTool.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/features/research/hooks/` files
  - [x] **`[x]` `./src/features/research/hooks/useExport.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/features/research/hooks/useWCSData.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/features/research/` files
  - [x] **`[x]` `./src/features/research/useResearch.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/features/ux-auditor/` files
  - [x] **`[x]` `./src/features/ux-auditor/useSnapshotManager.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/features/ux-auditor/useUXAuditor.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/hooks/` files
  - [x] **`[x]` `./src/hooks/useGlobalSearch.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/hooks/useHotkeys.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/hooks/useResizeObserver.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/hooks/useScrollManagement.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/hooks/useSearchParam.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/layouts/` files
  - [ ] `./src/layouts/Box.tsx`

    * **Detected Slop Patterns:**
    * L157: Use of redundant style wrapper (composeStyles) | composeStyles(
    * L140: Use of hallucinated JIT resolver (resolveJIT) | resolveJIT(
    * L195: Use of hallucinated JIT resolver (resolveJIT) | resolveJIT(
    * L196: Use of hallucinated JIT resolver (resolveJIT) | resolveJIT(
    * L197: Use of hallucinated JIT resolver (resolveJIT) | resolveJIT(
    * L198: Use of hallucinated JIT resolver (resolveJIT) | resolveJIT(
    * L199: Use of hallucinated JIT resolver (resolveJIT) | resolveJIT(
    * L200: Use of hallucinated JIT resolver (resolveJIT) | resolveJIT(
    * L208: Use of hallucinated JIT resolver (resolveJIT) | resolveJIT(
    * L208: Use of hallucinated JIT resolver (resolveJIT) | resolveJIT(
    * L209: Use of hallucinated JIT resolver (resolveJIT) | resolveJIT(
    * L228: Use of hallucinated JIT resolver (resolveJIT) | resolveJIT(
    * L235: Use of hallucinated JIT resolver (resolveJIT) | resolveJIT(

  - [x] **`[x]` `./src/layouts/Button.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/layouts/Footer.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [ ] `./src/layouts/Grid.tsx`

    * **Detected Slop Patterns:**
    * L20: Use of redundant style wrapper (composeStyles) | composeStyles(

  - [x] **`[x]` `./src/layouts/MainLayout.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/layouts/Primitives.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [ ] `./src/layouts/Stack.tsx`

    * **Detected Slop Patterns:**
    * L42: Use of redundant style wrapper (composeStyles) | composeStyles(

  - [ ] `./src/layouts/Text.tsx`

    * **Detected Slop Patterns:**
    * L47: Use of redundant style wrapper (composeStyles) | composeStyles(
    * L60: Use of hallucinated JIT resolver (resolveJIT) | resolveJIT(
    * L61: Use of hallucinated JIT resolver (resolveJIT) | resolveJIT(
    * L67: Use of hallucinated JIT resolver (resolveJIT) | resolveJIT(
    * L73: Use of hallucinated JIT resolver (resolveJIT) | resolveJIT(

  - [x] **`[x]` `./src/layouts/layout-maps.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/lib/` files
  - [x] **`[x]` `./src/lib/affiliateManager.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/lib/constants.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/lib/constants/` files
  - [x] **`[x]` `./src/lib/constants/markdown-schema.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/lib/` files
  - [ ] `./src/lib/content.ts`

    * **Detected Slop Patterns:**
    * L18: Potential cargo-culting of safety patterns (Object.create(null)) | Object.create(null)
    * L26: Potential cargo-culting of safety patterns (Object.create(null)) | Object.create(null)
    * L33: Potential cargo-culting of safety patterns (Object.create(null)) | Object.create(null)

  - [x] **`[x]` `./src/lib/geminiModelConfig.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/lib/hooks/` files
  - [x] **`[x]` `./src/lib/hooks/useArticleNavigation.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/lib/hooks/useResearchToolAssets.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/lib/merch/` files
  - [x] **`[x]` `./src/lib/merch/imageDisplay.test.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/lib/merch/imageDisplay.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/lib/` files
  - [x] **`[x]` `./src/lib/productCatalog.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/lib/routes-discovery.test.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/lib/routes-discovery.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [ ] `./src/lib/style-utils.ts`

    * **Detected Slop Patterns:**
    * L9: Use of hallucinated JIT resolver (resolveJIT) | resolveJIT(
    * L45: Use of hallucinated JIT resolver (resolveJIT) | resolveJIT(


* [ ] `./src/lib/types/` files
  - [x] **`[x]` `./src/lib/types/content.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/lib/types/routes.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/lib/` files
  - [ ] `./src/lib/utils.ts`

    * **Detected Slop Patterns:**
    * L15: Use of redundant style wrapper (composeStyles) | composeStyles(

  - [x] **`[x]` `./src/lib/variants.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/` files
  - [x] **`[x]` `./src/main.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/pages/` files
  - [x] **`[x]` `./src/pages/About.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/pages/Blog.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/pages/BlogPost.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/pages/ComponentPreview.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/pages/Home.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/pages/Merch.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/pages/NotFound.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/pages/RemovedPage.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/pages/Research.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/pages/ResearchDetail.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/pages/UXAuditor.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/providers/` files
  - [x] **`[x]` `./src/providers/ThemeProvider.tsx` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/styles/` files
  - [x] **`[x]` `./src/styles/design-tokens.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/styles/motion.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./src/styles/safelist.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/` files
  - [x] **`[x]` `./src/types.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/utils/` files
  - [x] **`[x]` `./src/utils/schema.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./src/` files
  - [x] **`[x]` `./src/vite-env.d.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).

* [ ] `./` files
  - [x] **`[x]` `./svgo.config.mjs` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./tailwind.config.mjs` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
  - [x] **`[x]` `./vite.config.ts` — Verified Clean** (No hallucinated compatibility layers, cargo-culted boilerplate, or non-functional abstractions found).
