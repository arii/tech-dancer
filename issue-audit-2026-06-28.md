# Final Issue Audit (2026-06-28)

## 1. Summary of all open issues reviewed
Total issues reviewed: 48

## 2. Recommended action for each issue
- **#2811**: Keep open - make Dependabot guidelines and update workflow
- **#2784**: Keep open - feat(ai): Implement Structured Token Management & Strict JSON Schemas
- **#2692**: Keep open - content: Master audit and visual improvement of WCS blog posts
- **#2689**: Duplicate, close - content: Refactor the merch story blog post to meet Impeccable standards
- **#2687**: Keep open - content: Audit and improve blog posts to meet Impeccable standards
- **#2685**: Keep open - feat: Create autonomous AI-driven Playwright crawler for dynamic visual QA and Gemini reviews
- **#2678**: Keep open - accessibility: fix contrast ratio regressions on homepage elements
- **#2675**: Keep open - bug: fix clipped overflow containers and skip link text overflow
- **#2672**: Keep open - Improve AI Review Context Management and Truncation Handling
- **#2671**: Keep open - Optimization Needed: Impact Analysis Review Quotas Exceeded
- **#2664**: Keep open - feat: Add linked issue specifications to PR review context
- **#2649**: Keep open - Improvement: Remove Agents & CI/CD from home page Explore by Topic grid
- **#2639**: Keep open - Improvement: Optimize CI Artifact Structure and Report Generation
- **#2630**: Keep open - entropy gate
- **#2622**: Keep open - Improvement: Expand shared component traversal for impact analysis
- **#2619**: Keep open - Improvement: Resolve barrel exports for impact analysis
- **#2618**: Keep open - Improvement: Trace layout dependencies for impact analysis
- **#2606**: Keep open - Deployment Impact Analysis Effectiveness Audit
- **#2603**: Keep open - fix: optimize github actions caching and checkout depths [requires changes]
- **#2602**: Keep open - Refactor: De-slop ResearchAnalytics by extracting common UI components
- **#2600**: Keep open - feat: Enhance entropy check and streamline CI process [requires changes]
- **#2582**: Keep open - ci(models): capture context window limits from GitHub models catalog and filter on them
- **#2581**: Keep open - ci(review): gate visual review routes on DOM/pixel severity — skip LOW routes
- **#2579**: Keep open - ci(review): run GitHub Models first; only invoke Gemini on HIGH findings or failure
- **#2577**: Keep open - ci(review): use incremental diff (HEAD~1..HEAD) for iterative commits, not full branch diff
- **#2576**: Keep open - ci(review): scope code review to changed hunks, not full file contents
- **#2575**: Keep open - ci(review): scope reviewer to PR's stated purpose; flag only new untrusted input paths
- **#2574**: Keep open - ci(review): enforce MAX_AI_REVIEWS cap end-to-end in the Jules remediation loop
- **#2573**: Keep open - ci(review): require reviewer to engage with existing test/verification evidence
- **#2571**: Keep open - ci(review): prevent reviewer from asserting framework facts it hasn't verified
- **#2570**: Keep open - ci(review): feed full type/interface context into the reviewer, not just the diff hunk
- **#2569**: Keep open - ci(review): require evidence for HIGH/blocking severity
- **#2563**: Keep open - Reviewer bot (GitHub Models code review) produces inconsistent, stateless feedback across PR iterations
- **#2561**: Keep open - Recommendations for Improving AI Code Review & Repository Standards
- **#2555**: Keep open - model aware token usage
- **#2554**: Duplicate, close - Improve token usage
- **#2553**: Keep open - CI: Move UI Anti-Pattern Audit to its own workflow
- **#2552**: Keep open - CI: Consider merging static analysis toolchecks
- **#2551**: Keep open - CI: Dependabot failure on Node engine mismatch
- **#2550**: Keep open - CI: Impact Analysis API returns 404 Not Found
- **#2534**: Keep open - Rewrite "The Story Behind the Merch" blog post to align with brand voice and fix missing images
- **#2531**: Keep open - Replace raw flex and items-center classes with Box primitive in UXAuditor.tsx
- **#2530**: Keep open - Replace raw form styling with UI components in BlogDrafter.tsx
- **#2529**: Keep open - Remove raw padding and flex classes in ResearchAnalytics.tsx
- **#2492**: Keep open - refactor(scripts): extract impact-analysis helpers into scripts/impact/ submodules with Zod schemas
- **#2485**: Keep open - refactor(dev-tools): consolidate duplicated utilities and auth into dev_tools_sdk
- **#2461**: Keep open - Move power-charging.md to draft due to generic AI filler content
- **#2277**: Keep open - Consolidate duplicated get_github_token and legacy utility functions across dev-tools and SDK

## 3. Issues that should remain open
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
- #2630: entropy gate
- #2622: Improvement: Expand shared component traversal for impact analysis
- #2619: Improvement: Resolve barrel exports for impact analysis
- #2618: Improvement: Trace layout dependencies for impact analysis
- #2606: Deployment Impact Analysis Effectiveness Audit
- #2603: fix: optimize github actions caching and checkout depths [requires changes]
- #2602: Refactor: De-slop ResearchAnalytics by extracting common UI components
- #2600: feat: Enhance entropy check and streamline CI process [requires changes]
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
- #2551: CI: Dependabot failure on Node engine mismatch
- #2550: CI: Impact Analysis API returns 404 Not Found
- #2534: Rewrite "The Story Behind the Merch" blog post to align with brand voice and fix missing images
- #2531: Replace raw flex and items-center classes with Box primitive in UXAuditor.tsx
- #2530: Replace raw form styling with UI components in BlogDrafter.tsx
- #2529: Remove raw padding and flex classes in ResearchAnalytics.tsx
- #2492: refactor(scripts): extract impact-analysis helpers into scripts/impact/ submodules with Zod schemas
- #2485: refactor(dev-tools): consolidate duplicated utilities and auth into dev_tools_sdk
- #2461: Move power-charging.md to draft due to generic AI filler content
- #2277: Consolidate duplicated get_github_token and legacy utility functions across dev-tools and SDK

## 4. Issues that need clarification or scope updates

## 5. Issues that should be merged into other issues

## 6. Issues that should be closed as duplicates
- #2689: content: Refactor the merch story blog post to meet Impeccable standards (Reason: This is essentially tracking the exact same thing as #2534 (Rewrite The Story Behind the Merch blog post).)
- #2554: Improve token usage (Reason: Vague request, superseded by #2784 (Implement Structured Token Management & Strict JSON Schemas) and #2555 (model aware token usage).)

## 7. Issues that should be closed as completed

## 8. Issues that should be closed as outdated or no longer aligned

## 9. Label, milestone, or priority cleanup recommendations
- General recommendation: Assign priority labels (high, medium, low) to the remaining open issues to guide future development.
- Apply 'duplicate' label to issues #2689 and #2554 before closing them.

## 10. Suggested follow-up issues to create, if any
- None explicitly identified at this time, existing issues cover the required scope.

## 11. Recommended order for addressing remaining issues
1. Address UI/UX anti-pattern issues (e.g., #2531, #2530, #2529) to clean up technical debt in styling.
2. Proceed with content audit issues (#2687, #2692, #2534) to maintain brand standards.
3. Address CI and tooling improvements (e.g., Dependabot, token management, CI review optimizations).
