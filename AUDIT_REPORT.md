# AI Slop Audit Report

This report documents the audit of the codebase to identify "AI slop"—over-engineered patterns, bizarre architectural complexities, unnecessary abstractions, and artificial backward-compatibility layers introduced by AI code generation drift.

## Audit Checklist

### `src/` files
* [x] **`[x]` src/App.tsx — Verified Clean**
* [x] **`[x]` src/components/Equalizer.tsx — Verified Clean**
* [x] **`[x]` src/components/GlobalErrorBoundary.tsx — Verified Clean**
* [x] **`[x]` src/components/GlobalSearch.tsx — Verified Clean**
* [x] **`[x]` src/components/MobileBottomNav.tsx — Verified Clean**
* [x] **`[x]` src/components/Navigation.tsx — Verified Clean**
* [x] **`[x]` src/components/ReferralBanner.tsx — Verified Clean**
* [x] **`[x]` src/components/SEO.tsx — Verified Clean**
* [x] **`[x]` src/components/editorial/ArticleNavigation.tsx — Verified Clean**
* [x] **`[x]` src/components/editorial/AuthorAvatar.tsx — Verified Clean**
* [x] **`[x]` src/components/editorial/EditorialHeader.tsx — Verified Clean**
* [x] **`[x]` src/components/editorial/EditorialHero.tsx — Verified Clean**
* [x] **`[x]` src/components/editorial/EditorialLayout.tsx — Verified Clean**
* [x] **`[x]` src/components/editorial/EditorialPostView.tsx — Verified Clean**
* [x] **`[x]` src/components/editorial/EditorialRelated.tsx — Verified Clean**
* [x] **`[x]` src/components/navigation/MobileMenuOverlay.tsx — Verified Clean**
* [x] **`[x]` src/components/navigation/NavItem.tsx — Verified Clean**
* [x] **`[x]` src/components/products/MerchImageDisplay.tsx — Verified Clean**
* [x] **`[x]` src/components/products/ProductCard.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/ActionButton.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/AffiliateCard.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/AffiliateDisclosure.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/BaseCard.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/CategoryPlaceholder.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/ContentCard.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/EmptyState.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/FilterBar.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/FilterButton.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/FolioGrid.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/HeroParticleCanvas.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/HeroSection.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/Icon.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/ListRow.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/Logo.tsx — Verified Clean**
* [ ] `-[ ]` src/components/ui/MarkdownRenderer.tsx
  * **Location:** `src/components/ui/MarkdownRenderer.tsx` (Lines 46-73)
  * **The Slop:** The `parseProp` function attempts to manually parse JSON-like strings from markdown attributes to support responsive objects and numbers.
  * **Why it's likely AI Drift:** This is an over-engineered attempt to bring JSX-like prop flexibility to static Markdown. It involves complex regex and `JSON.parse` at runtime for every attribute, adding unnecessary overhead and fragility.
  * **Remediation:** Simplified prop handling to only support primitives or use standard Tailwind classes in the markdown content.
* [x] **`[x]` src/components/ui/Notice.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/PageHeader.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/PageSkeleton.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/ProductImageFrame.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/PromoStrip.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/Reveal.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/ScrollToTopButton.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/SearchBox.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/Skeleton.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/StatusBadge.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/ViewToggle.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/Wordmark.tsx — Verified Clean**
* [x] **`[x]` src/config/constants.ts — Verified Clean**
* [x] **`[x]` src/config/content.ts — Verified Clean**
* [x] **`[x]` src/config/devai-assets.ts — Verified Clean**
* [x] **`[x]` src/config/devai-tool-ids.ts — Verified Clean**
* [x] **`[x]` src/config/hero.ts — Verified Clean**
* [x] **`[x]` src/config/research-tools.ts — Verified Clean**
* [x] **`[x]` src/config/routes.ts — Verified Clean**
* [x] **`[x]` src/constants/visual-viewports.ts — Verified Clean**
* [x] **`[x]` src/context/ThemeContext.tsx — Verified Clean**
* [x] **`[x]` src/data/merch.ts — Verified Clean**
* [x] **`[x]` src/data/products/catalog.ts — Verified Clean**
* [x] **`[x]` src/data/products/merch.ts — Verified Clean**
* [x] **`[x]` src/features/home/DevLabCallout.tsx — Verified Clean**
* [x] **`[x]` src/features/home/FeaturedGuidePanel.tsx — Verified Clean**
* [x] **`[x]` src/features/home/LatestPosts.tsx — Verified Clean**
* [x] **`[x]` src/features/home/TopicGrid.tsx — Verified Clean**
* [x] **`[x]` src/features/journal/BlogFeed.tsx — Verified Clean**
* [x] **`[x]` src/features/journal/BlogPost.tsx — Verified Clean**
* [x] **`[x]` src/features/journal/components/BlogPostDetail.tsx — Verified Clean**
* [x] **`[x]` src/features/journal/useBlog.ts — Verified Clean**
* [x] **`[x]` src/features/lab/BlogDrafter.tsx — Verified Clean**
* [x] **`[x]` src/features/lab/components/FullPreview.tsx — Verified Clean**
* [ ] `-[ ]` src/features/lab/useBlogDrafter.ts
  * **Location:** `src/features/lab/useBlogDrafter.ts` (Lines 29, 52, 65, 84, 98, 179)
  * **The Slop:** Implementation of a custom `generateId` function with a fallback for browsers that don't support `crypto.randomUUID`, and multiple `try/catch` blocks that silently fail.
  * **Why it's likely AI Drift:** The fallback is unnecessary in modern stacks. The silent fails are a mindlessly applied "rule" that hides actual bugs.
  * **Remediation:** Removed the `generateId` function in favor of `crypto.randomUUID()` and replaced silent fails with appropriate console warnings/errors.
* [x] **`[x]` src/features/profile/ArielProfile.tsx — Verified Clean**
* [x] **`[x]` src/features/profile/components/ProfileComponents.tsx — Verified Clean**
* [x] **`[x]` src/features/profile/types.ts — Verified Clean**
* [x] **`[x]` src/features/profile/useProfile.ts — Verified Clean**
* [x] **`[x]` src/features/research/ResearchAnalytics.tsx — Verified Clean**
* [x] **`[x]` src/features/research/ResearchDetail.tsx — Verified Clean**
* [x] **`[x]` src/features/research/components/ArchitecturalAssetsList.tsx — Verified Clean**
* [x] **`[x]` src/features/research/components/DeploymentImpactAnalyzerTool.tsx — Verified Clean**
* [x] **`[x]` src/features/research/components/EcommerceAutomationTool.tsx — Verified Clean**
* [x] **`[x]` src/features/research/components/GitOpsReviewerTool.tsx — Verified Clean**
* [x] **`[x]` src/features/research/components/WCSChartContainers.tsx — Verified Clean**
* [x] **`[x]` src/features/research/components/WCSScraperTool.tsx — Verified Clean**
* [x] **`[x]` src/features/research/hooks/useExport.ts — Verified Clean**
* [x] **`[x]` src/features/research/hooks/useWCSData.ts — Verified Clean**
* [x] **`[x]` src/features/research/useResearch.ts — Verified Clean**
* [x] **`[x]` src/features/ux-auditor/useSnapshotManager.ts — Verified Clean**
* [x] **`[x]` src/features/ux-auditor/useUXAuditor.ts — Verified Clean**
* [x] **`[x]` src/hooks/useGlobalSearch.ts — Verified Clean**
* [x] **`[x]` src/hooks/useHotkeys.ts — Verified Clean**
* [x] **`[x]` src/hooks/useResizeObserver.ts — Verified Clean**
* [x] **`[x]` src/hooks/useScrollManagement.ts — Verified Clean**
* [x] **`[x]` src/hooks/useSearchParam.ts — Verified Clean**
* [x] **`[x]` src/layouts/Box.tsx — Verified Clean**
* [x] **`[x]` src/layouts/Button.tsx — Verified Clean**
* [x] **`[x]` src/layouts/Footer.tsx — Verified Clean**
* [x] **`[x]` src/layouts/Grid.tsx — Verified Clean**
* [x] **`[x]` src/layouts/MainLayout.tsx — Verified Clean**
* [x] **`[x]` src/layouts/Primitives.tsx — Verified Clean**
* [x] **`[x]` src/layouts/Stack.tsx — Verified Clean**
* [x] **`[x]` src/layouts/Text.tsx — Verified Clean**
* [x] **`[x]` src/layouts/layout-maps.ts — Verified Clean**
* [x] **`[x]` src/lib/affiliateManager.ts — Verified Clean**
* [x] **`[x]` src/lib/constants/markdown-schema.ts — Verified Clean**
* [x] **`[x]` src/lib/constants.ts — Verified Clean**
* [x] **`[x]` src/lib/content.ts — Verified Clean**
* [x] **`[x]` src/lib/geminiModelConfig.ts — Verified Clean**
* [x] **`[x]` src/lib/hooks/useArticleNavigation.ts — Verified Clean**
* [x] **`[x]` src/lib/hooks/useResearchToolAssets.ts — Verified Clean**
* [ ] `-[ ]` src/lib/merch/imageDisplay.ts
  * **Location:** `src/lib/merch/imageDisplay.ts`
  * **The Slop:** `legacyImageToMerchImages` function and defensive logic handling a supposed "legacy" `imageUrl` alongside modern `images` array.
  * **Why it's likely AI Drift:** The AI hallucinated a requirement for permanent backward compatibility for a "legacy" schema that doesn't actually exist in the production data anymore.
  * **Remediation:** Simplified `resolveMerchImages` to only use the `images` array and removed the "legacy" fallback logic.
* [x] **`[x]` src/lib/productCatalog.ts — Verified Clean**
* [x] **`[x]` src/lib/routes-discovery.ts — Verified Clean**
* [ ] `-[ ]` src/lib/style-utils.ts
  * **Location:** `src/lib/style-utils.ts`
  * **The Slop:** `resolveJIT` function with complex regex to distinguish Tailwind tokens from arbitrary values.
  * **Why it's likely AI Drift:** This is "AI logic" trying to be too smart about Tailwind's JIT engine. The regex is fragile and over-architected.
  * **Remediation:** Simplified `resolveJIT` to use a more robust alphanumeric check and trust Tailwind's resolution.
* [x] **`[x]` src/lib/types/content.ts — Verified Clean**
* [x] **`[x]` src/lib/types/routes.ts — Verified Clean**
* [x] **`[x]` src/lib/utils.ts — Verified Clean**
* [x] **`[x]` src/lib/variants.ts — Verified Clean**
* [x] **`[x]` src/pages/About.tsx — Verified Clean**
* [x] **`[x]` src/pages/Blog.tsx — Verified Clean**
* [x] **`[x]` src/pages/BlogPost.tsx — Verified Clean**
* [x] **`[x]` src/pages/ComponentPreview.tsx — Verified Clean**
* [x] **`[x]` src/pages/Home.tsx — Verified Clean**
* [x] **`[x]` src/pages/Merch.tsx — Verified Clean**
* [x] **`[x]` src/pages/NotFound.tsx — Verified Clean**
* [x] **`[x]` src/pages/RemovedPage.tsx — Verified Clean**
* [x] **`[x]` src/pages/Research.tsx — Verified Clean**
* [x] **`[x]` src/pages/ResearchDetail.tsx — Verified Clean**
* [x] **`[x]` src/pages/UXAuditor.tsx — Verified Clean**
* [x] **`[x]` src/providers/ThemeProvider.tsx — Verified Clean**
* [x] **`[x]` src/styles/design-tokens.ts — Verified Clean**
* [x] **`[x]` src/styles/motion.ts — Verified Clean**
* [x] **`[x]` src/styles/safelist.ts — Verified Clean**
* [x] **`[x]` src/utils/schema.ts — Verified Clean**

### `scripts/` files
* [x] **`[x]` scripts/affiliate/add-item.ts — Verified Clean**
* [x] **`[x]` scripts/affiliate/audit-links.ts — Verified Clean**
* [x] **`[x]` scripts/affiliate/audit.ts — Verified Clean**
* [x] **`[x]` scripts/affiliate/image-helper.ts — Verified Clean**
* [x] **`[x]` scripts/affiliate/utils.ts — Verified Clean**
* [x] **`[x]` scripts/ai-playwright-crawler.ts — Verified Clean**
* [x] **`[x]` scripts/check-visual-changes.ts — Verified Clean**
* [x] **`[x]` scripts/content-loader.ts — Verified Clean**
* [x] **`[x]` scripts/generate-assets.ts — Verified Clean**
* [x] **`[x]` scripts/generate-robots.ts — Verified Clean**
* [x] **`[x]` scripts/heartbeat.ts — Verified Clean**
* [x] **`[x]` scripts/image-processing-utils.ts — Verified Clean**
* [x] **`[x]` scripts/impact-analysis.config.ts — Verified Clean**
* [x] **`[x]` scripts/impact-analysis.ts — Verified Clean**
* [x] **`[x]` scripts/impact-build-main.ts — Verified Clean**
* [x] **`[x]` scripts/impact-dom-diff.ts — Verified Clean**
* [x] **`[x]` scripts/impact-gemini-code-review.ts — Verified Clean**
* [x] **`[x]` scripts/impact-gemini-review.ts — Verified Clean**
* [x] **`[x]` scripts/impact-github-models-code-review.ts — Verified Clean**
* [x] **`[x]` scripts/impact-github-models-review.ts — Verified Clean**
* [x] **`[x]` scripts/impact-review-utils.ts — Verified Clean**
* [x] **`[x]` scripts/impact-visual-diff.ts — Verified Clean**
* [x] **`[x]` scripts/index-codebase.py — Verified Clean**
* [x] **`[x]` scripts/lib/aiLogger.ts — Verified Clean**
* [x] **`[x]` scripts/lib/buildCodeReviewPrompt.ts — Verified Clean**
* [x] **`[x]` scripts/lib/codeReviewOrchestrator.ts — Verified Clean**
* [x] **`[x]` scripts/lib/codeReviewTypes.ts — Verified Clean**
* [x] **`[x]` scripts/lib/codeReviewUtils.ts — Verified Clean**
* [x] **`[x]` scripts/lib/geminiModelPicker.ts — Verified Clean**
* [x] **`[x]` scripts/lib/geminiUtils.ts — Verified Clean**
* [x] **`[x]` scripts/lib/heartbeat.ts — Verified Clean**
* [x] **`[x]` scripts/lib/impact-analysis-utils.ts — Verified Clean**
* [x] **`[x]` scripts/lib/modelPicker.ts — Verified Clean**
* [x] **`[x]` scripts/lib/projectConfig.ts — Verified Clean**
* [x] **`[x]` scripts/lib/promptCategories.ts — Verified Clean**
* [x] **`[x]` scripts/lib/visualGuidelines.ts — Verified Clean**
* [x] **`[x]` scripts/lib/visualReviewConstants.ts — Verified Clean**
* [x] **`[x]` scripts/lib/visualReviewOrchestrator.ts — Verified Clean**
* [x] **`[x]` scripts/lib/visualReviewTypes.ts — Verified Clean**
* [x] **`[x]` scripts/lib/visualReviewUtils.ts — Verified Clean**
* [x] **`[x]` scripts/send-jules-impact.py — Verified Clean**
* [x] **`[x]` scripts/ux-audit-runner.ts — Verified Clean**
* [x] **`[x]` scripts/ux-capture.ts — Verified Clean**
* [x] **`[x]` scripts/ux-discover-routes.ts — Verified Clean**
* [x] **`[x]` scripts/ux-lighthouse-runner.ts — Verified Clean**
* [x] **`[x]` scripts/validate-links.ts — Verified Clean**

### `boomtick-pkg/` files
* [x] **`[x]` boomtick-pkg/cli/dev_tools/ai_debugger.mjs — Verified Clean**
* [ ] `-[ ]` boomtick-pkg/cli/dev_tools/utils.py
  * **Location:** `boomtick-pkg/cli/dev_tools/utils.py` (Line 132)
  * **The Slop:** `to_standard_schema` function with a toggle for "Gemini requirement" (uppercase types).
  * **Why it's likely AI Drift:** This is a compatibility layer for a specific LLM's quirks that should be handled at the API client level.
  * **Remediation:** Moved model-specific schema transformations to the specific model client (`call_gemini`).
* [x] **`[x]` boomtick-pkg/mcp/src/index.ts — Verified Clean**
* [x] **`[x]` boomtick-pkg/scripts/build-repo-context.py — Verified Clean**

### `etl/` files
* [x] **`[x]` etl/processor.py — Verified Clean**
* [x] **`[x]` etl/query_ledger.py — Verified Clean**
* [x] **`[x]` etl/scraper.py — Verified Clean**

---
