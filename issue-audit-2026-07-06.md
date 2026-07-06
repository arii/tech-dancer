# Final Issue Audit Report (2026-07-06)

## 1. Summary of all open issues reviewed
- Total open issues reviewed: 87
- Keep open: 42
- Keep open, needs clarification: 30
- Ready to close after merge: 15

## 2. Recommended action for each issue

### 3. Issues that should remain open
- #3251 - Refactor Defensive AI Infrastructure and GHA Configuration Management
- #3248 - Refactor Over-engineered Layout Primitives and Remove Hallucinated JIT Resolver
- #3156 - feat: Public Assets & Format Consolidation
- #2997 - Epic: Master tracking for individual blog post improvements
- #2996 - Epic: Group and Prioritize Raw Styling UI Refactors
- #2975 - ci: investigate and reduce long CI pipeline times
- #2900 - Investigate why mobile visual snapshots prompt unexpected updates when no changes exist
- #2784 - feat(ai): Implement Structured Token Management & Strict JSON Schemas
- #2678 - accessibility: fix contrast ratio regressions on homepage elements
- #2675 - bug: fix clipped overflow containers and skip link text overflow
- #2672 - Improve AI Review Context Management and Truncation Handling
- #2671 - Optimization Needed: Impact Analysis Review Quotas Exceeded
- #2649 - Improvement: Remove Agents & CI/CD from home page Explore by Topic grid
- #2639 - Improvement: Optimize CI Artifact Structure and Report Generation
- #2638 - Improvement: Standardize CI Script Log Formatting and Error Tracing
- #2630 - entropy gate
- #2622 - Improvement: Expand shared component traversal for impact analysis
- #2619 - Improvement: Resolve barrel exports for impact analysis
- #2618 - Improvement: Trace layout dependencies for impact analysis
- #2606 - Deployment Impact Analysis Effectiveness Audit
- #2602 - Refactor: De-slop ResearchAnalytics by extracting common UI components
- #2582 - ci(models): capture context window limits from GitHub models catalog and filter on them
- #2581 - ci(review): gate visual review routes on DOM/pixel severity
- #2579 - ci(review): run GitHub Models first; only invoke Gemini on HIGH findings or failure
- #2577 - ci(review): use incremental diff (HEAD~1..HEAD) for iterative commits, not full branch diff
- #2576 - ci(review): scope code review to changed hunks, not full file contents
- #2575 - ci(review): scope reviewer to PR's stated purpose; flag only new untrusted input paths
- #2574 - ci(review): enforce MAX_AI_REVIEWS cap end-to-end in the Jules remediation loop
- #2573 - ci(review): require reviewer to engage with existing test/verification evidence
- #2571 - ci(review): prevent reviewer from asserting framework facts it hasn't verified
- #2570 - ci(review): feed full type/interface context into the reviewer, not just the diff hunk
- #2569 - ci(review): require evidence for HIGH/blocking severity
- #2563 - Reviewer bot (GitHub Models code review) produces inconsistent, stateless feedback across PR iterations
- #2561 - Recommendations for Improving AI Code Review & Repository Standards
- #2555 - model aware token usage
- #2553 - CI: Move UI Anti-Pattern Audit to its own workflow
- #2552 - CI: Consider merging static analysis toolchecks
- #2550 - CI: Impact Analysis API returns 404 Not Found
- #2531 - Replace raw flex and items-center classes with Box primitive in UXAuditor.tsx
- #2530 - Replace raw form styling with UI components in BlogDrafter.tsx
- #2529 - Remove raw padding and flex classes in ResearchAnalytics.tsx
- #2492 - refactor(scripts): extract impact-analysis helpers into scripts/impact/ submodules with Zod schemas

### 4. Issues that need clarification or scope updates
- #3290 - chore: review all open PRs and generate audit artifacts
- #3281 - ci(review): scope reviewer to PR's stated purpose
- #3279 - Implement td-cli Latency Mitigation Strategies
- #3277 - feat(mcp): add dedicated github.get_pr tool
- #3269 - Refactor Defensive AI Infrastructure and GHA Configuration Management
- #3268 - Update navigation menu layout order
- #3265 - improve devai vis layout
- #3264 - Merch:  Text Spacing & Content Hierarchy
- #3263 - Merch page:  Call-to-Action (CTA) Primary vs. Secondary Hierarchy
- #3262 - "Shop by Style" Filter Button Wrapping & Alignment
- #3260 - navigation layout order
- #3258 - CI: Re-run pipelines for PRs 3233 and 3235 after snapshot update
- #3257 - CI: Fix td-cli PATH resolution in GitHub Actions
- #3256 - Fix: Update boomtick-mcp Vitest mock expectations for td-cli error handling
- #3217 - Failed to programmatically close PRs via MCP tool: Unknown error
- #3203 - CI: Internalize workflows inside boomtick-pkg
- #3196 - Refactor: Cleanup legacy boomtick-mcp and dev-tools references in documentation and code comments
- #3192 - Improve Agent Awareness and Access to Boomtick MCP/CLI Tools over Raw shell Commands
- #3108 - refactor: implement mandated architectural standards for CLI and packaging
- #3063 - Refactor boomtick-pkg/mcp hardcoded github defaults in config.ts
- #3060 - Refactor: Components exceed 150-line limit (AGENTS.md Rule 11)
- #3056 - feat: Finalize install.sh and modularize CI actions
- #3014 - Systemic CI Metrics Definition: Establish clear measurable targets
- #2968 - context token improvements
- #2847 - [Workflow Audit] Consolidated Health Report
- #2811 - make Dependabot guidelines and update workflow
- #2692 - content: Master audit and visual improvement of WCS blog posts
- #2687 - content: Audit and improve blog posts to meet Impeccable standards
- #2685 - feat: Create autonomous AI-driven Playwright crawler for dynamic visual QA and Gemini reviews
- #2664 - feat: Add linked issue specifications to PR review context

### 5. Issues that should be merged into other issues
- None identified.

### 6. Issues that should be closed as duplicates
- None identified.

### 7. Issues that should be closed as completed
*(Note: Issues listed as 'Ready to close after merge' are included here, but require their respective PRs to merge first)*
- #3297 - chore(review): generate audit artifacts for all open PRs
- #3296 - Execute agent feedback daemon workflow directly
- #3295 - docs: Add persistent issue audit documents
- #3292 - AI Slop Audit and Remediation
- #3291 - fix(ci): robust impact analysis and gh-pages artifact optimization
- #3289 - chore(deps): Bump gitleaks/gitleaks-action from 2 to 3
- #3288 - Fix Orchestrator initialization error in daemon process
- #3286 - fix(mcp): use sessionId for jules tools to avoid PR ID confusion
- #3285 - Standardize AI Review, Image Safety, and Design Tokens
- #3284 - ci: optimize pipeline performance and reduce wall-clock time
- #3283 - perf: Remove Speed Insights and Tabler Icons stylesheet
- #3282 - ci(review): require evidence for HIGH/blocking severity
- #3280 - fix(tests): Mock console.warn to clean up noisy test output
- #3278 - fix(cli): implement lazy orchestrator to reduce startup time
- #3270 - Fix "Shop by Style" Filter Button Wrapping & Alignment

### 8. Issues that should be closed as outdated or no longer aligned
- None identified.

### 9. Label, milestone, or priority cleanup recommendations
- Issues lacking spec-driven sections should receive a `needs-clarification` label.
- Issues blocked by open PRs should have their milestone synced with the PR's target milestone.

### 10. Suggested follow-up issues to create, if any
- Consolidate the various AI review rule updates (e.g., #3281, #3282, #3285) into a single definitive Epic to track the `ai_service.py` ruleset modifications, as recommended by the `merge-strategy.md` conflict analysis.

### 11. Recommended order for addressing remaining issues
1. Merge open PRs that fulfill the 'Ready to close after merge' issues.
2. Provide the missing spec-driven sections (Goal, Scope, Proposed Approach) for the 'needs clarification' issues.
3. Address 'Keep open' issues that have no related PR activity.
