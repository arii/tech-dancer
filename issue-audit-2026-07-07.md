# Final GitHub Issue Audit

## 1. Summary of all open issues reviewed

Total open issues reviewed: 92

## 2. Recommended action for each issue
(See issue-audit-status.md for detailed breakdown per issue)

## 3. Issues that should remain open
- #3387: Design System Refactor: Remove component-specific variants from global contracts
- #3386: Design System Refactor: Localize FAB styling
- #3385: Design System Refactor: Export component-specific VariantProps
- #3384: Design System Refactor: Introduce CVA helper factories
- #3383: Design System Refactor: Export utility constants
- #3381: [Feature] Implement td agent plan-workflow-audit workflow tool
- #3379: [Feature] Implement td agent plan-issue-audit workflow tool
- #3378: [Feature] Implement td agent plan-aggregation workflow tool
- #3251: Refactor Defensive AI Infrastructure and GHA Configuration Management
- #3248: Refactor Over-engineered Layout Primitives and Remove Hallucinated JIT Resolver
- #3156: feat: Public Assets & Format Consolidation
- #2900: Investigate why mobile visual snapshots prompt unexpected updates when no changes exist
- #2784: feat(ai): Implement Structured Token Management & Strict JSON Schemas
- #2678: accessibility: fix contrast ratio regressions on homepage elements
- #2675: bug: fix clipped overflow containers and skip link text overflow
- #2672: Improve AI Review Context Management and Truncation Handling
- #2671: Optimization Needed: Impact Analysis Review Quotas Exceeded
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
- #2575: ci(review): scope reviewer to PR's stated purpose; flag only new untrusted input paths
- #2574: ci(review): enforce MAX_AI_REVIEWS cap end-to-end in the Jules remediation loop
- #2573: ci(review): require reviewer to engage with existing test/verification evidence
- #2571: ci(review): prevent reviewer from asserting framework facts it hasn't verified
- #2570: ci(review): feed full type/interface context into the reviewer, not just the diff hunk
- #2569: ci(review): require evidence for HIGH/blocking severity
- #2563: Reviewer bot (GitHub Models code review) produces inconsistent, stateless feedback across PR iterations
- #2561: Recommendations for Improving AI Code Review & Repository Standards
- #2555: model aware token usage
- #2553: CI: Move UI Anti-Pattern Audit to its own workflow
- #2552: CI: Consider merging static analysis toolchecks
- #2550: CI: Impact Analysis API returns 404 Not Found
- #2531: Replace raw flex and items-center classes with Box primitive in UXAuditor.tsx
- #2530: Replace raw form styling with UI components in BlogDrafter.tsx
- #2529: Remove raw padding and flex classes in ResearchAnalytics.tsx
- #2492: refactor(scripts): extract impact-analysis helpers into scripts/impact/ submodules with Zod schemas

## 4. Issues that need clarification or scope updates
- #3389: Agent Workflow: Dev-Tools & Pipeline Improvements Needed
- #3382: [Epic] Composable and Localized Design System Refactor
- #3377: Address mypy type-checking errors across the Python codebase
- #3376: Address pylint errors across the Python codebase
- #3354: [Jules] Support batch message sending in jules.send_message
- #3353: [MCP] Synchronize local agent configuration schemas with repository updates
- #3327: Design System Refactor: Add exported VariantProps types
- #3326: Design System Refactor: Split component contracts into distinct files
- #3325: Design System Refactor: Extract shared utility classes into tokens
- #3324: Design System Refactor: Reduce semantic overlap and component-specific variants
- #3323: Design System Refactor: Separate design tokens from component variants
- #3320: refactor(ui): Use composition via cx() instead of massive inline tailwind strings
- #3318: Design System Refactor: Export Explicit Types and Helper Factories for CVA
- #3317: Design System Refactor: Split Variants into Modular Files
- #3316: Design System Refactor: Extract Repeated Utility Classes into Shared Constants
- #3315: Design System Refactor: Standardize Component Variant Contracts (Tone, Appearance, Radius)
- #3314: Design System Refactor: Separate UI Tokens from Component Variants
- #3313: chore(ui): Add strict TypeScript enforcement to design system via `as const` and `VariantProps`
- #3310: Consolidate open Dependabot PRs into a single PR
- #3309: perf: Fix high Largest Contentful Paint (LCP) times and optimize bundle delivery
- #3307: refactor(prompt): Optimize review instructions for better AI reasoning and lower token usage
- #3265: improve devai vis layout
- #3264: Merch:  Text Spacing & Content Hierarchy
- #3263: Merch page:  Call-to-Action (CTA) Primary vs. Secondary Hierarchy
- #3258: CI: Re-run pipelines for PRs 3233 and 3235 after snapshot update
- #3257: CI: Fix td-cli PATH resolution in GitHub Actions
- #3256: Fix: Update boomtick-mcp Vitest mock expectations for td-cli error handling
- #3217: Failed to programmatically close PRs via MCP tool: Unknown error
- #3203: CI: Internalize workflows inside boomtick-pkg
- #3196: Refactor: Cleanup legacy boomtick-mcp and dev-tools references in documentation and code comments
- #3192: Improve Agent Awareness and Access to Boomtick MCP/CLI Tools over Raw shell Commands
- #3108: refactor: implement mandated architectural standards for CLI and packaging
- #3063: Refactor boomtick-pkg/mcp hardcoded github defaults in config.ts
- #3060: Refactor: Components exceed 150-line limit (AGENTS.md Rule 11)
- #3056: feat: Finalize install.sh and modularize CI actions
- #3014: Systemic CI Metrics Definition: Establish clear measurable targets
- #2997: Epic: Master tracking for individual blog post improvements
- #2996: Epic: Group and Prioritize Raw Styling UI Refactors
- #2968: context token improvements
- #2847: [Workflow Audit] Consolidated Health Report
- #2811: make Dependabot guidelines and update workflow
- #2692: content: Master audit and visual improvement of WCS blog posts
- #2687: content: Audit and improve blog posts to meet Impeccable standards
- #2685: feat: Create autonomous AI-driven Playwright crawler for dynamic visual QA and Gemini reviews
- #2664: feat: Add linked issue specifications to PR review context

## 5. Issues that should be merged into other issues
None

## 6. Issues that should be closed as duplicates
None

## 7. Issues that should be closed as completed
None

## 8. Issues that should be closed as outdated or no longer aligned
None

## 9. Label, milestone, or priority cleanup recommendations
- Apply `needs-clarification` to all issues missing spec sections.

## 10. Suggested follow-up issues to create
- None currently.

## 11. Recommended order for addressing remaining issues
1. Clarify issues missing spec sections.
2. Group epic tracking issues.
3. Prioritize issues with attached PRs.
4. Process remaining bugs and feature requests by priority.
