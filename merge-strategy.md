# Merge Strategy

Based on the `td-cli gh conflicts` analysis and the PR review process, we identified several logical groups of PRs. To ensure a safe integration and prevent merge conflicts, we recommend the following strategy:

## Group 1: Dependency Updates
These PRs touch package definitions (`package.json`, `pnpm-lock.yaml`) and CI workflows.
- PR 3303 (sharp)
- PR 3302 (axe-core/playwright)
- PR 3301 (typescript)
- PR 3300 (dependency-cruiser)
- PR 3299 (@tailwindcss/typography)
- PR 3289 (gitleaks-action)
- PR 3284 (ci optimization)

**Strategy:** Merge PR 3284 (ci optimization) first, then merge PR 3289. Finally, run a consolidated `pnpm update` locally and submit a single PR to bump the remaining NPM packages, closing 3299-3303 to avoid lockfile collisions.

## Group 2: Documentation & Audits
These PRs touch audit tracking documents and status files.
- PR 3298 (docs: add persistent issue audit documents)
- PR 3295 (docs: Add persistent issue audit documents)
- PR 3290 (chore: review all open PRs and generate audit artifacts)
- PR 3297 (chore(review): generate audit artifacts for all open PRs)

**Strategy:** Close duplicate PRs 3295 and 3297. Merge PR 3298 first to establish the audit documentation baseline, then merge PR 3290 to finalize the audit artifacts.

## Group 3: Tooling & Daemon Logic
These PRs interact with the internal dev-tools, orchestrator, and AI service.
- PR 3292 (AI Slop Audit and Remediation)
- PR 3288 (Fix Orchestrator initialization error in daemon process)
- PR 3278 (fix(cli): implement lazy orchestrator to reduce startup time)
- PR 3269 (Refactor Defensive AI Infrastructure and GHA Configuration Management)
- PR 3286 (fix(mcp): use sessionId for jules tools to avoid PR ID confusion)
- PR 3277 (feat(mcp): add dedicated github.get_pr tool)
- PR 3285 (Standardize AI Review, Image Safety, and Design Tokens)
- PR 3282 (ci(review): require evidence for HIGH/blocking severity)
- PR 3281 (ci(review): scope reviewer to PR's stated purpose)

**Strategy:** Merge 3269 as the foundational infrastructure change. Follow with the MCP tool updates (3277, then 3286). Next, merge 3288 and 3278 for orchestrator stability. Finally, merge the AI service tweaks (3281, 3282, 3285, 3292) sequentially, running local tests between each to catch any cascading effects.

## Group 4: Independent Fixes
These PRs do not conflict and can be merged in any order once the above groups are stable.
- PR 3283 (perf: Remove Speed Insights and Tabler Icons stylesheet)
- PR 3280 (fix(tests): Mock console.warn)
- PR 3270 (Fix "Shop by Style" Filter Button Wrapping)
- PR 3268 (Update navigation menu layout order)
- PR 3296 (Execute agent feedback daemon workflow directly)

**Strategy:** Merge at will.
