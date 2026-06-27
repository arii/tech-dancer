# GitHub Issue Audit Summary

## Summary

- Total open issues reviewed: 89
- Issues recommended to keep open: 62
- Issues recommended for clarification: 1
- Issues recommended to merge: 0
- Issues recommended to close: 26
- Issues blocked by PRs or other work: 0

## Issues Recommended to Keep Open

- **#3066** — Consolidate PRs
- **#3065** — Consolidate overlapping PRs 3038, 3046, 3049, and 3050
- **#3064** — Ensure project_config fallback behaves as standalone module in CLI
- **#3063** — Refactor boomtick-pkg/mcp hardcoded github defaults in config.ts
- **#3062** — Fix Orchestrator subprocess module import errors
- **#3060** — Refactor: Components exceed 150-line limit (AGENTS.md Rule 11)
- **#3059** — Tool Failure: PR Review Diff Extraction
- **#3058** — Bug: td_cli.py gh subcommands fail due to missing gh binary
- **#3054** — perf: optimize python dependency installations and setup-agent execution speed
- **#3050** — Consolidate static analysis and security workflows
- **#3049** — Systemic CI Metrics Definition: Establish clear measurable targets
- **#3048** — Improve BlogDrafter usability and submission reliability
- **#3047** — [Workflow Audit] Consolidated Health Report Fixes
- **#3046** — Refactor TD CLI issue commands for style, security, and redundancy
- **#3045** — chore: gitignore and untrack .agent-context.json cleanup
- **#3044** — boomtick-mcp tool schema and argument issues
- **#3043** — Fix text clamping and vertical space filling on Merch page Featured Picks
- **#3042** — [Workflow Audit] Consolidated Health Report
- **#3041** — [Workflow Audit] Consolidated Health Report
- **#3040** — refactor: address outstanding style, security, and redundancy code review findings for TD CLI issue commands
- **#3038** — [Resolved] feat: prevent AI-induced version downgrades on stack configurations
- **#3036** — chore: gitignore and untrack .agent-context.json
- **#3030** — boomtick-mcp tool schema and argument issues
- **#3014** — Systemic CI Metrics Definition: Establish clear measurable targets
- **#3003** — Prevent AI-Induced Version Downgrades (Knowledge Cutoff Regression)
- **#2997** — Epic: Master tracking for individual blog post improvements
- **#2996** — Epic: Group and Prioritize Raw Styling UI Refactors
- **#2986** — leverage recent CI updates for background steps
- **#2984** — update homepage cta
- **#2968** — context token improvements
- **#2847** — [Workflow Audit] Consolidated Health Report
- **#2811** — make Dependabot guidelines and update workflow
- **#2784** — feat(ai): Implement Structured Token Management & Strict JSON Schemas
- **#2672** — Improve AI Review Context Management and Truncation Handling
- **#2671** — Optimization Needed: Impact Analysis Review Quotas Exceeded
- **#2630** — entropy gate
- **#2622** — Improvement: Expand shared component traversal for impact analysis
- **#2619** — Improvement: Resolve barrel exports for impact analysis
- **#2618** — Improvement: Trace layout dependencies for impact analysis
- **#2582** — ci(models): capture context window limits from GitHub models catalog and filter on them
- **#2581** — ci(review): gate visual review routes on DOM/pixel severity — skip LOW routes
- **#2579** — ci(review): run GitHub Models first; only invoke Gemini on HIGH findings or failure
- **#2577** — ci(review): use incremental diff (HEAD~1..HEAD) for iterative commits, not full branch diff
- **#2576** — ci(review): scope code review to changed hunks, not full file contents
- **#2575** — ci(review): scope reviewer to PR's stated purpose; flag only new untrusted input paths
- **#2574** — ci(review): enforce MAX_AI_REVIEWS cap end-to-end in the Jules remediation loop
- **#2573** — ci(review): require reviewer to engage with existing test/verification evidence
- **#2571** — ci(review): prevent reviewer from asserting framework facts it hasn't verified
- **#2570** — ci(review): feed full type/interface context into the reviewer, not just the diff hunk
- **#2563** — Reviewer bot (GitHub Models code review) produces inconsistent, stateless feedback across PR iterations
- **#2561** — Recommendations for Improving AI Code Review & Repository Standards
- **#2555** — model aware token usage
- **#2554** — Improve token usage
- **#2553** — CI: Move UI Anti-Pattern Audit to its own workflow
- **#2552** — CI: Consider merging static analysis toolchecks
- **#2551** — CI: Dependabot failure on Node engine mismatch
- **#2550** — CI: Impact Analysis API returns 404 Not Found
- **#2534** — Rewrite "The Story Behind the Merch" blog post to align with brand voice and fix missing images
- **#2531** — Replace raw flex and items-center classes with Box primitive in UXAuditor.tsx
- **#2530** — Replace raw form styling with UI components in BlogDrafter.tsx
- **#2529** — Remove raw padding and flex classes in ResearchAnalytics.tsx
- **#2492** — refactor(scripts): extract impact-analysis helpers into scripts/impact/ submodules with Zod schemas
- **#2461** — Move power-charging.md to draft due to generic AI filler content

## Issues Recommended to Close as Completed

- **#3056** — feat: Finalize install.sh and modularize CI actions
- **#3055** — feat: Map agent dispatch commands to jules_feedback_loop
- **#3053** — feat: Implement heartbeat logs for impact-analysis
- **#3052** — feat: Refactor issue-comment-dispatcher logic
- **#3051** — feat: Consolidate CI setup logic into composite action
- **#2975** — ci: investigate and reduce long CI pipeline times
- **#2900** — Investigate why mobile visual snapshots prompt unexpected updates when no changes exist
- **#2692** — content: Master audit and visual improvement of WCS blog posts
- **#2689** — content: Refactor the merch story blog post to meet Impeccable standards
- **#2687** — content: Audit and improve blog posts to meet Impeccable standards
- **#2685** — feat: Create autonomous AI-driven Playwright crawler for dynamic visual QA and Gemini reviews
- **#2678** — accessibility: fix contrast ratio regressions on homepage elements
- **#2675** — bug: fix clipped overflow containers and skip link text overflow
- **#2665** — Improvement: Fix blog-drafter sizing, preview formatting, and submit crash
- **#2664** — feat: Add linked issue specifications to PR review context
- **#2649** — Improvement: Remove Agents & CI/CD from home page Explore by Topic grid
- **#2642** — Improvement: Fix text clamping and vertical space filling on Merch page Featured Picks
- **#2639** — Improvement: Optimize CI Artifact Structure and Report Generation
- **#2638** — Improvement: Standardize CI Script Log Formatting and Error Tracing
- **#2606** — Deployment Impact Analysis Effectiveness Audit
- **#2603** — fix: optimize github actions caching and checkout depths [requires changes]
- **#2602** — Refactor: De-slop ResearchAnalytics by extracting common UI components
- **#2600** — feat: Enhance entropy check and streamline CI process [requires changes]
- **#2569** — ci(review): require evidence for HIGH/blocking severity

## Issues Recommended to Close as Duplicate

- **#2485** — refactor(dev-tools): consolidate duplicated utilities and auth into dev_tools_sdk
- **#2277** — Consolidate duplicated get_github_token and legacy utility functions across dev-tools and SDK

## Issues Recommended to Close as Outdated


## Label / Priority Cleanup Recommendations
- Bulk update labels based on audit recommendations.

## Suggested Follow-up Issues
1. Refactor remaining layout primitives into standard shared components to resolve the outstanding anti-pattern violations (e.g., UXAuditor flex constraints).
2. Continue migrating Python CLI dependencies directly into `tdw_services` submodules, clearing out any remaining legacy `dev-tools` scripts.
3. Centralize AI reviewer system prompts to ensure standard context blocks (like PR goals, issue details, and verification results) are consistently appended without hallucination risks.

## Recommended Order for Addressing Remaining Issues
1. **Critical Pipeline & Security Consolidation**: Prioritize merging static analysis workflows (#3050, #2552, #2553) to ensure stable CI behavior and efficient compute utilization.
2. **AI Review Orchestration Enhancements**: Complete the 257X series (e.g., #2570, #2571, #2573, #2574, #2575, #2576, #2577, #2579) to minimize LLM token wastage, reduce false-positive layout assertions, and implement stable iterative reviews.
3. **Frontend & Merch Layout Stability**: Fix text clamping gaps (#3043, #2642), complete BlogDrafter usability (#3048, #2665), and overflow containers (#2675).
4. **Content & Brand Registers**: Wrap up the massive WCS blog post audit (#2692, #2689) by injecting necessary imagery and voice-driven alt-texts.
