# Issue Audit Report - 2026-07-04

## 1. Summary of all open issues reviewed
Total reviewed: 67

## 2. Recommended action for each issue
- **#3279**: Implement td-cli Latency Mitigation Strategies -> Keep open
- **#3265**: improve devai vis layout -> Keep open
- **#3264**: Merch:  Text Spacing & Content Hierarchy -> Keep open
- **#3263**: Merch page:  Call-to-Action (CTA) Primary vs. Secondary Hierarchy -> Keep open
- **#3262**: "Shop by Style" Filter Button Wrapping & Alignment -> Ready to close after merge
- **#3260**: navigation layout order -> Ready to close after merge
- **#3258**: CI: Re-run pipelines for PRs 3233 and 3235 after snapshot update -> Keep open
- **#3257**: CI: Fix td-cli PATH resolution in GitHub Actions -> Keep open
- **#3256**: Fix: Update boomtick-mcp Vitest mock expectations for td-cli error handling -> Keep open
- **#3251**: Refactor Defensive AI Infrastructure and GHA Configuration Management -> Keep open
- **#3248**: Refactor Over-engineered Layout Primitives and Remove Hallucinated JIT Resolver -> Keep open
- **#3217**: Failed to programmatically close PRs via MCP tool: Unknown error -> Keep open
- **#3203**: CI: Internalize workflows inside boomtick-pkg -> Keep open
- **#3196**: Refactor: Cleanup legacy boomtick-mcp and dev-tools references in documentation and code comments -> Keep open
- **#3192**: Improve Agent Awareness and Access to Boomtick MCP/CLI Tools over Raw shell Commands -> Keep open
- **#3156**: feat: Public Assets & Format Consolidation -> Keep open
- **#3108**: refactor: implement mandated architectural standards for CLI and packaging -> Keep open
- **#3063**: Refactor boomtick-pkg/mcp hardcoded github defaults in config.ts -> Keep open
- **#3060**: Refactor: Components exceed 150-line limit (AGENTS.md Rule 11) -> Keep open
- **#3056**: feat: Finalize install.sh and modularize CI actions -> Keep open
- **#3014**: Systemic CI Metrics Definition: Establish clear measurable targets -> Keep open
- **#2997**: Epic: Master tracking for individual blog post improvements -> Keep open, update scope
- **#2996**: Epic: Group and Prioritize Raw Styling UI Refactors -> Keep open, update scope
- **#2975**: ci: investigate and reduce long CI pipeline times -> Ready to close after merge
- **#2968**: context token improvements -> Keep open
- **#2900**: Investigate why mobile visual snapshots prompt unexpected updates when no changes exist -> Keep open
- **#2847**: [Workflow Audit] Consolidated Health Report -> Keep open
- **#2811**: make Dependabot guidelines and update workflow -> Keep open
- **#2784**: feat(ai): Implement Structured Token Management & Strict JSON Schemas -> Keep open
- **#2692**: content: Master audit and visual improvement of WCS blog posts -> Keep open
- **#2687**: content: Audit and improve blog posts to meet Impeccable standards -> Keep open
- **#2685**: feat: Create autonomous AI-driven Playwright crawler for dynamic visual QA and Gemini reviews -> Keep open
- **#2678**: accessibility: fix contrast ratio regressions on homepage elements -> Keep open
- **#2675**: bug: fix clipped overflow containers and skip link text overflow -> Keep open
- **#2672**: Improve AI Review Context Management and Truncation Handling -> Keep open
- **#2671**: Optimization Needed: Impact Analysis Review Quotas Exceeded -> Keep open
- **#2664**: feat: Add linked issue specifications to PR review context -> Keep open
- **#2649**: Improvement: Remove Agents & CI/CD from home page Explore by Topic grid -> Keep open
- **#2639**: Improvement: Optimize CI Artifact Structure and Report Generation -> Keep open
- **#2638**: Improvement: Standardize CI Script Log Formatting and Error Tracing -> Keep open
- **#2630**: entropy gate -> Keep open
- **#2622**: Improvement: Expand shared component traversal for impact analysis -> Keep open
- **#2619**: Improvement: Resolve barrel exports for impact analysis -> Keep open
- **#2618**: Improvement: Trace layout dependencies for impact analysis -> Keep open
- **#2606**: Deployment Impact Analysis Effectiveness Audit -> Keep open
- **#2602**: Refactor: De-slop ResearchAnalytics by extracting common UI components -> Keep open
- **#2582**: ci(models): capture context window limits from GitHub models catalog and filter on them -> Keep open
- **#2581**: ci(review): gate visual review routes on DOM/pixel severity — skip LOW routes -> Keep open
- **#2579**: ci(review): run GitHub Models first; only invoke Gemini on HIGH findings or failure -> Keep open
- **#2577**: ci(review): use incremental diff (HEAD~1..HEAD) for iterative commits, not full branch diff -> Keep open
- **#2576**: ci(review): scope code review to changed hunks, not full file contents -> Keep open
- **#2575**: ci(review): scope reviewer to PR's stated purpose; flag only new untrusted input paths -> Ready to close after merge
- **#2574**: ci(review): enforce MAX_AI_REVIEWS cap end-to-end in the Jules remediation loop -> Keep open
- **#2573**: ci(review): require reviewer to engage with existing test/verification evidence -> Keep open
- **#2571**: ci(review): prevent reviewer from asserting framework facts it hasn't verified -> Keep open
- **#2570**: ci(review): feed full type/interface context into the reviewer, not just the diff hunk -> Keep open
- **#2569**: ci(review): require evidence for HIGH/blocking severity -> Ready to close after merge
- **#2563**: Reviewer bot (GitHub Models code review) produces inconsistent, stateless feedback across PR iterations -> Keep open
- **#2561**: Recommendations for Improving AI Code Review & Repository Standards -> Ready to close after merge
- **#2555**: model aware token usage -> Keep open
- **#2553**: CI: Move UI Anti-Pattern Audit to its own workflow -> Keep open
- **#2552**: CI: Consider merging static analysis toolchecks -> Keep open
- **#2550**: CI: Impact Analysis API returns 404 Not Found -> Keep open
- **#2531**: Replace raw flex and items-center classes with Box primitive in UXAuditor.tsx -> Keep open
- **#2530**: Replace raw form styling with UI components in BlogDrafter.tsx -> Keep open
- **#2529**: Remove raw padding and flex classes in ResearchAnalytics.tsx -> Keep open
- **#2492**: refactor(scripts): extract impact-analysis helpers into scripts/impact/ submodules with Zod schemas -> Keep open

## 3. Issues that should remain open
- #3279: Implement td-cli Latency Mitigation Strategies
- #3265: improve devai vis layout
- #3264: Merch:  Text Spacing & Content Hierarchy
- #3263: Merch page:  Call-to-Action (CTA) Primary vs. Secondary Hierarchy
- #3258: CI: Re-run pipelines for PRs 3233 and 3235 after snapshot update
- #3257: CI: Fix td-cli PATH resolution in GitHub Actions
- #3256: Fix: Update boomtick-mcp Vitest mock expectations for td-cli error handling
- #3251: Refactor Defensive AI Infrastructure and GHA Configuration Management
- #3248: Refactor Over-engineered Layout Primitives and Remove Hallucinated JIT Resolver
- #3217: Failed to programmatically close PRs via MCP tool: Unknown error
- #3203: CI: Internalize workflows inside boomtick-pkg
- #3196: Refactor: Cleanup legacy boomtick-mcp and dev-tools references in documentation and code comments
- #3192: Improve Agent Awareness and Access to Boomtick MCP/CLI Tools over Raw shell Commands
- #3156: feat: Public Assets & Format Consolidation
- #3108: refactor: implement mandated architectural standards for CLI and packaging
- #3063: Refactor boomtick-pkg/mcp hardcoded github defaults in config.ts
- #3060: Refactor: Components exceed 150-line limit (AGENTS.md Rule 11)
- #3056: feat: Finalize install.sh and modularize CI actions
- #3014: Systemic CI Metrics Definition: Establish clear measurable targets
- #2968: context token improvements
- #2900: Investigate why mobile visual snapshots prompt unexpected updates when no changes exist
- #2847: [Workflow Audit] Consolidated Health Report
- #2811: make Dependabot guidelines and update workflow
- #2784: feat(ai): Implement Structured Token Management & Strict JSON Schemas
- #2692: content: Master audit and visual improvement of WCS blog posts
- #2687: content: Audit and improve blog posts to meet Impeccable standards
- #2685: feat: Create autonomous AI-driven Playwright crawler for dynamic visual QA and Gemini reviews
- #2678: accessibility: fix contrast ratio regressions on homepage elements
- #2675: bug: fix clipped overflow containers and skip link text overflow
- #2672: Improve AI Review Context Management and Truncation Handling
- #2671: Optimization Needed: Impact Analysis Review Quotas Exceeded
- #2664: feat: Add linked issue specifications to PR review context
- #2649: Improvement: Remove Agents & CI/CD from home page Explore by Topic grid
- #2639: Improvement: Optimize CI Artifact Structure and Report Generation
- #2638: Improvement: Standardize CI Script Log Formatting and Error Tracing
- #2630: entropy gate
- #2622: Improvement: Expand shared component traversal for impact analysis
- #2619: Improvement: Resolve barrel exports for impact analysis
- #2618: Improvement: Trace layout dependencies for impact analysis
- #2606: Deployment Impact Analysis Effectiveness Audit
- #2602: Refactor: De-slop ResearchAnalytics by extracting common UI components
- #2582: ci(models): capture context window limits from GitHub models catalog and filter on them
- #2581: ci(review): gate visual review routes on DOM/pixel severity — skip LOW routes
- #2579: ci(review): run GitHub Models first; only invoke Gemini on HIGH findings or failure
- #2577: ci(review): use incremental diff (HEAD~1..HEAD) for iterative commits, not full branch diff
- #2576: ci(review): scope code review to changed hunks, not full file contents
- #2574: ci(review): enforce MAX_AI_REVIEWS cap end-to-end in the Jules remediation loop
- #2573: ci(review): require reviewer to engage with existing test/verification evidence
- #2571: ci(review): prevent reviewer from asserting framework facts it hasn't verified
- #2570: ci(review): feed full type/interface context into the reviewer, not just the diff hunk
- #2563: Reviewer bot (GitHub Models code review) produces inconsistent, stateless feedback across PR iterations
- #2555: model aware token usage
- #2553: CI: Move UI Anti-Pattern Audit to its own workflow
- #2552: CI: Consider merging static analysis toolchecks
- #2550: CI: Impact Analysis API returns 404 Not Found
- #2531: Replace raw flex and items-center classes with Box primitive in UXAuditor.tsx
- #2530: Replace raw form styling with UI components in BlogDrafter.tsx
- #2529: Remove raw padding and flex classes in ResearchAnalytics.tsx
- #2492: refactor(scripts): extract impact-analysis helpers into scripts/impact/ submodules with Zod schemas

## 4. Issues that need clarification or scope updates
- #2997: Epic: Master tracking for individual blog post improvements
- #2996: Epic: Group and Prioritize Raw Styling UI Refactors

## 5. Issues that should be merged into other issues
- None

## 6. Issues that should be closed as duplicates
- None

## 7. Issues that should be closed as completed
- None

## 8. Issues that should be closed as outdated or no longer aligned
- None

## 9. Label, milestone, or priority cleanup recommendations
- Apply relevant labels to Epics to distinguish them.
- Close blocked/ready issues once their PRs are merged.

## 10. Suggested follow-up issues to create, if any
- Create a dedicated tracking issue for all the 'Keep open' tasks grouped by component (e.g. CI, Merch, AI).

## 11. Recommended order for addressing remaining issues
1. Address and merge issues in 'Ready to close after merge' state.
2. Break down Epics and issues needing clarification.
3. Tackle high-priority bugs and UI regressions.
