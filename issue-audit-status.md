# GitHub Issue Audit Status

## Summary

- Total open issues reviewed: 120
- Issues recommended to keep open: 10
- Issues recommended for clarification: 106
- Issues recommended to merge: 0
- Issues recommended to close: 2
- Issues blocked by PRs or other work: 0
- Issues recommended to convert into smaller issues: 2

## Issue Checklist

### Issue #2477 — bug(deploy): SHA verification always times out — dotfiles not copied to preview dirs by cp glob

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for bug(deploy): sha verification always times out — dotfiles not copied to preview dirs by cp glob.

**Audit Note:** Summary: ## summary  the `deploy` job in `.github/workflows/deploy.yml` spends up to **5 minutes polling** fo... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2476 — Clean up redundant Git and Path configuration

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Follow-up cleanup tasks are valid.

**Audit Note:** Summary: multiple workflows (e.g., `self-healing.yml`) contain redundant `git config --global --add safe.dire... | Relevance: Yes, cleanup tasks are necessary. | Actionable: Yes. | Action: Keep open and assign.

### Issue #2475 — Standardize AI service error handling

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Follow-up cleanup tasks are valid.

**Audit Note:** Summary: the current `call_ai_service` uses hardcoded fallbacks that could hide transient network errors from... | Relevance: Yes, cleanup tasks are necessary. | Actionable: Yes. | Action: Keep open and assign.

### Issue #2472 — Centralize AI Configuration Provider

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Follow-up cleanup tasks are valid.

**Audit Note:** Summary: create a new file `dev-tools/ai_provider.py` to encapsulate token resolution and `langchain` client... | Relevance: Yes, cleanup tasks are necessary. | Actionable: Yes. | Action: Keep open and assign.

### Issue #2471 — Fix Error Handling in call_ai

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Follow-up cleanup tasks are valid.

**Audit Note:** Summary: in `dev-tools/utils.py`, move the `importerror` check for `langchain` packages outside the `call_ai`... | Relevance: Yes, cleanup tasks are necessary. | Actionable: Yes. | Action: Keep open and assign.

### Issue #2469 — Clean up unused configuration artifacts

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Outdated, close
**Reason:** Local Ollama usage is explicitly deprecated in favor of remote APIs.

**Audit Note:** Summary: remove the `dev-tools/codereviewer.mf` file if it is no longer used or is only serving as a referenc... | Relevance: Outdated, local Ollama is deprecated. | Actionable: No. | Action: Close as outdated.

### Issue #2468 — Consolidate Workflow Dependencies

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Follow-up cleanup tasks are valid.

**Audit Note:** Summary: audit the `tech-dancer` image to confirm all common cli tools (`pygithub`, `requests`, `click`) are... | Relevance: Yes, cleanup tasks are necessary. | Actionable: Yes. | Action: Keep open and assign.

### Issue #2466 — Move power-charging.md to draft due to generic AI filler content

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Follow-up cleanup tasks are valid.

**Audit Note:** Summary: ## problem the `power-charging.md` post contains low-value, generic "ai-generated" style filler text... | Relevance: Yes, cleanup tasks are necessary. | Actionable: Yes. | Action: Keep open and assign.

### Issue #2465 — Increase and standardize CTA tap target area in DevLabCallout

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for increase and standardize cta tap target area in devlabcallout.

**Audit Note:** Summary: ## problem the `devlabcallout` "view portfolio ->" cta appears misaligned or pushed away from standa... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2464 — Reduce HeroSection vertical height to improve above-the-fold content visibility

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for reduce herosection vertical height to improve above-the-fold content visibility.

**Audit Note:** Summary: ## problem hero image and waveform visualization consume excessive vertical space on desktop without... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2463 — Fix hardcoded image dimensions in FeaturedGuidePanel

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for fix hardcoded image dimensions in featuredguidepanel.

**Audit Note:** Summary: ## problem the `featuredguidepanel` component bypasses the layout system by hardcoding `width={420}`... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2462 — [Workflow Audit] Consolidated Health Report

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Automated dispatches indicate recently verified bugs or follow-ups.

**Audit Note:** Summary: ## 📊 workflow health audit report      ### 🎯 executive summary > the workflow failed during the 'set... | Relevance: Yes, automated issue. | Actionable: Yes. | Action: Keep open.

### Issue #2461 — Move power-charging.md to draft due to generic AI filler content

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Follow-up cleanup tasks are valid.

**Audit Note:** Summary: ## problem the `power-charging.md` post contains low-value, generic "ai-generated" style filler text... | Relevance: Yes, cleanup tasks are necessary. | Actionable: Yes. | Action: Keep open and assign.

### Issue #2460 — Increase and standardize CTA tap target area in DevLabCallout

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for increase and standardize cta tap target area in devlabcallout.

**Audit Note:** Summary: ## problem the `devlabcallout` "view portfolio ->" cta appears misaligned or pushed away from standa... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2459 — Reduce HeroSection vertical height to improve above-the-fold content visibility

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for reduce herosection vertical height to improve above-the-fold content visibility.

**Audit Note:** Summary: ## problem hero image and waveform visualization consume excessive vertical space on desktop without... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2458 — Fix hardcoded image dimensions in FeaturedGuidePanel

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for fix hardcoded image dimensions in featuredguidepanel.

**Audit Note:** Summary: ## problem the `featuredguidepanel` component bypasses the layout system by hardcoding `width={420}`... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2449 — chore: migrate all workflows to use ghcr.io/arii/tech-dancer container image

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Outdated, close
**Reason:** Local Ollama usage is explicitly deprecated in favor of remote APIs.

**Audit Note:** Summary: ## background  `deploy-image.yml` already builds and publishes `ghcr.io/arii/tech-dancer:latest` fro... | Relevance: Outdated, local Ollama is deprecated. | Actionable: No. | Action: Close as outdated.

### Issue #2416 — update devai portfolio

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for update devai portfolio.

**Audit Note:** Summary: <html><head></head><body><h1>research page mobile ux update guide</h1> <p>reference mockup: boomtick... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2389 — landing page updates

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Convert into smaller issues
**Reason:** Too broad. Meta issues should be broken down.

**Audit Note:** Summary: Epic issue for landing page updates. | Relevance: Yes but too broad. | Actionable: No, needs breakdown. | Action: Convert to smaller issues.

### Issue #2386 — # Blog Post Fixes — boomtick.blog

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for # blog post fixes — boomtick.blog.

**Audit Note:** Summary: ## 1. outdoor dancing gear - illustration shows a fanny pack with items pictured *outside* it (key,... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2385 — Add project highlight list to DevAI portfolio card

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for add project highlight list to devai portfolio card.

**Audit Note:** Summary: 1. below the new one-sentence summary (from step 3), add a small vertical list of project highlights... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2382 — Add merch promo strip data and component shell

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for add merch promo strip data and component shell.

**Audit Note:** Summary: 1. create a `promostrip` component (e.g. `promostrip.tsx`) accepting props as defined by `interface... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2378 — Manually verify deployed preview

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for manually verify deployed preview.

**Audit Note:** Summary: manually verify on the deployed preview (vercel preview url) that: - filter pills, sticky behavior,... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2377 — Run and confirm CI pipeline passes

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for run and confirm ci pipeline passes.

**Audit Note:** Summary: run the existing ci pipeline (lint, type-check, build, playwright) and confirm all pass. verify test... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2376 — Take and compare full-page screenshots

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for take and compare full-page screenshots.

**Audit Note:** Summary: take updated full-page screenshots (desktop ~1280px and mobile ~390px) and compare against pre-chang... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2375 — Add/update Playwright tests for /merch page

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for add/update playwright tests for /merch page.

**Audit Note:** Summary: add/update playwright test(s) for `/merch`: - sticky filter bar remains in viewport after scrolling... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2374 — Verify bundle badge component with test data

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for verify bundle badge component with test data.

**Audit Note:** Summary: if no bundle skus exist yet on printful, this step is structural-only: build and verify the componen... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2373 — Display bundleNote text below product description

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for display bundlenote text below product description.

**Audit Note:** Summary: display `bundlenote` text (e.g. "save 10% as a set") below the product description, only when `isbun... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2370 — Ensure filter pills work with sections

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for ensure filter pills work with sections.

**Audit Note:** Summary: ensure the "all" filter shows all sections; selecting a specific style filter (e.g. "rainbow pride")... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2366 — Render CollectionSection components for each group

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for render collectionsection components for each group.

**Audit Note:** Summary: for each non-empty group, render a `collectionsection` component: ```tsx <section>   <div classname=... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2365 — Group products by collectionId for rendering

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for group products by collectionid for rendering.

**Audit Note:** Summary: in the merch page component, group the filtered product array by `collectionid` (use `array.prototyp... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2364 — Preserve existing filter logic

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for preserve existing filter logic.

**Audit Note:** Summary: keep existing filter logic (clicking a pill filters the grid) unchanged — this step is positioning/s... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2363 — Ensure sticky bar responsiveness on mobile

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for ensure sticky bar responsiveness on mobile.

**Audit Note:** Summary: ensure the sticky bar does not overlap content awkwardly on mobile. test at 375px and 768px widths.... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2362 — Confirm --header-height value

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for confirm --header-height value.

**Audit Note:** Summary: confirm `--header-height` (or equivalent) is a real, correct value. measure the site header and hard... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2360 — Create/refactor MerchFilterBar component

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for create/refactor merchfilterbar component.

**Audit Note:** Summary: create (or refactor existing) `merchfilterbar` component containing: - a small icon + label (optiona... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2359 — Set isBundle and bundleNote for multi-item sets

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for set isbundle and bundlenote for multi-item sets.

**Audit Note:** Summary: set `isbundle: true` and `bundlenote` only on products that are genuinely multi-item sets. if no bun... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2358 — Populate collectionId and collectionLabel for existing products

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for populate collectionid and collectionlabel for existing products.

**Audit Note:** Summary: populate `collectionid` and `collectionlabel` for every existing product based on its current style... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2357 — Add new fields to MerchProduct interface

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for add new fields to merchproduct interface.

**Audit Note:** Summary: add two new optional fields to the product type: ```ts interface merchproduct {   // ...existing fie... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2356 — Locate merch product data source

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for locate merch product data source.

**Audit Note:** Summary: locate the merch product data source. this is likely a `products.ts`, `products.json`, or a fetch fr... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2355 — merch updates

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Convert into smaller issues
**Reason:** Too broad. Meta issues should be broken down.

**Audit Note:** Summary: Epic issue for merch updates. | Relevance: Yes but too broad. | Actionable: No, needs breakdown. | Action: Convert to smaller issues.

### Issue #2354 — Implement Smooth Filter Animations

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for implement smooth filter animations.

**Audit Note:** Summary: ensure smooth transitions for active state changes and content updates when filters are applied. ver... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2353 — Implement Card Reveal Animation on Scroll

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for implement card reveal animation on scroll.

**Audit Note:** Summary: implement a reveal animation for content cards as they enter the viewport during scrolling. use inte... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2352 — Implement Subtle Page Transitions

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for implement subtle page transitions.

**Audit Note:** Summary: implement subtle fade page transitions with a duration between 150ms–250ms. verify tests. run audit... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2351 — Implement Virtualized Rendering (Conditional)

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for implement virtualized rendering (conditional).

**Audit Note:** Summary: implement virtualized rendering for content listings if the number of posts exceeds 100+. verify tes... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2350 — Implement Skeleton Loading

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for implement skeleton loading.

**Audit Note:** Summary: add skeleton loading states for content card skeletons and search skeletons to improve perceived per... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2349 — Implement Image Optimization

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for implement image optimization.

**Audit Note:** Summary: optimize all images by ensuring they are delivered in webp format, support responsive sizes, and imp... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2348 — Implement Social Discovery Links in Footer

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for implement social discovery links in footer.

**Audit Note:** Summary: add social media links to the footer, specifically for github, instagram, linkedin, and youtube, if... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2347 — Expand Footer Navigation

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for expand footer navigation.

**Audit Note:** Summary: expand the footer to include new navigation sections. under an "explore" heading, add links for blog... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2346 — Add Newsletter Module

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for add newsletter module.

**Audit Note:** Summary: implement a newsletter module between the content and the footer. include a compelling call to actio... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2344 — Implement Topic Navigation Section

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for implement topic navigation section.

**Audit Note:** Summary: add a "browse more:" section with navigation links to key topics such as guides, gear, travel, and e... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2343 — Implement Related Articles Section

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for implement related articles section.

**Audit Note:** Summary: add a "related articles" section below the main article content. implement an algorithm for related... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2342 — Add Reading Progress Indicator

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for add reading progress indicator.

**Audit Note:** Summary: add a progress bar at the top of the article page that updates while the user scrolls, indicating re... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2341 — Improve Article Typography

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for improve article typography.

**Audit Note:** Summary: increase the line-height of article body text to 1.7. set the maximum content width for article body... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2340 — Implement Automatic Table of Contents

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for implement automatic table of contents.

**Audit Note:** Summary: generate a table of contents automatically from h2 and h3 sections within the article content. on de... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2339 — Implement Article Hero Section

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for implement article hero section.

**Audit Note:** Summary: implement an article hero section at the top of each article page. this section must include the tit... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2338 — Introduce Featured Articles Row

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for introduce featured articles row.

**Audit Note:** Summary: create a top content section labeled featured articles. this section should use larger cards and a 2... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2337 — Set Maximum Content Width

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for set maximum content width.

**Audit Note:** Summary: add max-width: 1800px; and margin: auto; to the main content container to constrain its width on ver... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2336 — Upgrade to Responsive Content Grid

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for upgrade to responsive content grid.

**Audit Note:** Summary: replace the fixed grid behavior with a responsive grid. implement the css grid-template-columns: rep... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2335 — Implement Card Hover Improvements

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for implement card hover improvements.

**Audit Note:** Summary: for desktop, add a transform: translatey(-4px); effect on card hover. additionally, introduce a subt... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2334 — Improve Content Card Metadata Display

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for improve content card metadata display.

**Audit Note:** Summary: display the following metadata on each content card: category, title, description, date, reading tim... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2333 — Add Category Badges to Content Cards

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for add category badges to content cards.

**Audit Note:** Summary: implement category badges on each content card. examples of badges include guide, gear, event, trave... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2332 — Add Featured Images to Content Cards

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for add featured images to content cards.

**Audit Note:** Summary: implement support for a featured image on every blog card. the interface should be interface blogcar... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2331 — Search Enhancement

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for search enhancement.

**Audit Note:** Summary: move the search component above the content grid. add the placeholder text search posts, guides, gea... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2330 — Improve Filter Navigation

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for improve filter navigation.

**Audit Note:** Summary: convert existing filter pills into the following navigation structure: all posts guides gear events... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2329 — Add Content Overview Section

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for add content overview section.

**Audit Note:** Summary: directly below the page description, add the following content overview section: explore: • guides •... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2328 — blog updates

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for blog updates.

**Audit Note:** Summary: <img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/e0aa9a3c... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2327 — Optimize Page Performance

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for optimize page performance.

**Audit Note:** Summary: optimize page performance to meet lighthouse scores ≥ 95 and cls < 0.1. implement strategies such as... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2326 — Conduct Accessibility Audit and Implement Fixes

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for conduct accessibility audit and implement fixes.

**Audit Note:** Summary: conduct a comprehensive accessibility audit. verify keyboard navigation is fully functional, visible... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2325 — Optimize Ultrawide Layout

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for optimize ultrawide layout.

**Audit Note:** Summary: implement specific optimizations for ultrawide monitors. ensure that the featured layout expands app... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2324 — Implement Desktop Responsive Layout

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for implement desktop responsive layout.

**Audit Note:** Summary: implement a 3-column layout for desktop devices, providing an optimal display for larger screens whi... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2323 — Implement Tablet Responsive Layout

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for implement tablet responsive layout.

**Audit Note:** Summary: implement a 2-column layout for tablet devices, optimizing card display and content flow for medium-... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2322 — Implement Mobile Responsive Layout

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for implement mobile responsive layout.

**Audit Note:** Summary: implement a 1-column layout for mobile devices, ensuring content stacks vertically and is easily con... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2321 — Improve Grid Rhythm and Max Widths

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for improve grid rhythm and max widths.

**Audit Note:** Summary: optimize grid rhythm for different screen sizes. set the `max-width` for desktop layouts to `1440px`... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2320 — Implement Elevation System

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for implement elevation system.

**Audit Note:** Summary: implement a consistent elevation system using defined css variables or classes such as `surface-1`,... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2319 — Create Consistent Badge System

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for create consistent badge system.

**Audit Note:** Summary: develop and implement a consistent badge system by creating reusable components like <statusbadge />... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2318 — Implement Typography System

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for implement typography system.

**Audit Note:** Summary: implement a new typography system to increase contrast and establish visual hierarchy. set the follo... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2317 — Add Research Collections

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for add research collections.

**Audit Note:** Summary: implement a section for "research collections" on the page. display example collections such as "ai... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2316 — Add Technology Relationships Display

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for add technology relationships display.

**Audit Note:** Summary: display the technologies used for each research item, under a "built with:" heading. examples includ... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2315 — Add Related Research Section

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for add related research section.

**Audit Note:** Summary: implement a "related research" section below each research card. this section should display links t... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2314 — Improve Featured Article Treatment

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for improve featured article treatment.

**Audit Note:** Summary: highlight the latest article by implementing a "2x width card" treatment for it, positioned prominen... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2313 — Add Article Metadata

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for add article metadata.

**Audit Note:** Summary: display relevant metadata on article cards, such as "published", "8 min read", and "ai research". en... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2312 — Introduce Dedicated Article Cards

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for introduce dedicated article cards.

**Audit Note:** Summary: implement distinct article cards that emphasize "title", "summary", "published date", "read time", a... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2311 — Increase Whitespace in Engineering Systems Cards

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for increase whitespace in engineering systems cards.

**Audit Note:** Summary: adjust the css for engineering systems cards to increase whitespace. apply `padding: 24-32px` and `g... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2310 — Add Metadata Row to Engineering Systems Cards

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for add metadata row to engineering systems cards.

**Audit Note:** Summary: implement a dedicated metadata row on each engineering system card displaying information such as "a... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2309 — Improve Engineering Systems Card Status Indicators

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for improve engineering systems card status indicators.

**Audit Note:** Summary: replace plain text status indicators (active, in progress, archived, experimental) with colored badg... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2308 — Standardize Engineering Systems Card Layout

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for standardize engineering systems card layout.

**Audit Note:** Summary: implement a standardized layout for engineering systems cards. each card should include an icon, sta... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2307 — Add Research Metadata to Featured Projects

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for add research metadata to featured projects.

**Audit Note:** Summary: display relevant research metadata on the featured project cards. this metadata should include "stat... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2306 — Select and Display Featured Projects

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for select and display featured projects.

**Audit Note:** Summary: integrate the designated featured projects (candidates: repoauditor ai, gitops review agent, blast r... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2305 — Create Featured Research Layout

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for create featured research layout.

**Audit Note:** Summary: implement a dedicated layout for the featured research section. for desktop, the layout should be st... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2304 — Add URL Persistence for Filters

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for add url persistence for filters.

**Audit Note:** Summary: implement url persistence for the filter state. when a filter is applied, the url should update to r... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2303 — Build Filter State Management

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for build filter state management.

**Audit Note:** Summary: implement front-end filter state management using a mechanism like `const [activefilter, setactivefi... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2302 — Create Metadata Taxonomy for Filters

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for create metadata taxonomy for filters.

**Audit Note:** Summary: implement a metadata taxonomy for research items, adding tags such as `category: - ai - automation -... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2301 — Create Filter Chips

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for create filter chips.

**Audit Note:** Summary: implement interactive filter chips with the following categories: "all", "ai", "automation", "devtoo... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2300 — Create Research Metrics Strip

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for create research metrics strip.

**Audit Note:** Summary: implement a horizontal metric section displaying the following information: "research projects 12",... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2299 — Add Background Visual Layer to Hero

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for add background visual layer to hero.

**Audit Note:** Summary: implement a subtle, lightweight background visual layer for the hero section. choose one of the foll... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2298 — Add Quick Navigation Buttons to Hero

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for add quick navigation buttons to hero.

**Audit Note:** Summary: implement quick navigation buttons in the hero section. the buttons should be labeled "explore resea... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2297 — Add Research Statistics to Hero

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for add research statistics to hero.

**Audit Note:** Summary: implement metric cards within the hero section displaying the following statistics: "12+ research pr... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2296 — Replace Hero Copy

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for replace hero copy.

**Audit Note:** Summary: update the hero section copy with the following structure: "research & innovation" as the main title... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2295 — Remove Generic Grid Feel

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for remove generic grid feel.

**Audit Note:** Summary: introduce hierarchy to the current card display. implement distinct visual treatments for featured i... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2294 — Create Page Sections

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for create page sections.

**Audit Note:** Summary: create explicit sections using the following components: <researchhero />, <researchmetrics />, <res... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2277 — Consolidate duplicated get_github_token and legacy utility functions across dev-tools and SDK

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Follow-up cleanup tasks are valid.

**Audit Note:** Summary: ### description there is significant semantic code duplication across the developer tools and the in... | Relevance: Yes, cleanup tasks are necessary. | Actionable: Yes. | Action: Keep open and assign.

### Issue #2275 — Improve td_cli.py GitHub token resolution and PyGithub exception handling

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for improve td_cli.py github token resolution and pygithub exception handling.

**Audit Note:** Summary: ### description currently, `dev-tools/td_cli.py` and its underlying helper utilities (e.g. `get_gith... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2190 — Draft [POST]: Moving Beyond AI Assisted Engineering

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for draft [post]: moving beyond ai assisted engineering.

**Audit Note:** Summary: ### new post submission  **json data for pipeline:** ```json {   "title": "moving beyond ai assisted... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2175 — impact analysis for dynamic features

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for impact analysis for dynamic features.

**Audit Note:** Summary: to verify dynamic state transitions—like entering an input, clicking a button, modal openings, form... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2168 — AI-First Repository Optimization Guide

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for ai-first repository optimization guide.

**Audit Note:** Summary: this guide explains how to optimize a repository so ai coding assistants (chatgpt, claude code, gemi... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2167 — Automated Impact Review System: Repository Grooming & AI Context Engineering Guide

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for automated impact review system: repository grooming & ai context engineering guide.

**Audit Note:** Summary: this document provides thorough instructions and a comprehensive architectural framework to optimize... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #2165 — Add LangChain and multi agents to deployment impact review system

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for add langchain and multi agents to deployment impact review system.

**Audit Note:** Summary: you can structure this cleanly in langchain as a **multi-agent ci review pipeline**, where each agen... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #1882 — [Jules] Boomtick MCP: Integration, Schema Compliance, and Tool Dispatch Improvements

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for [jules] boomtick mcp: integration, schema compliance, and tool dispatch improvements.

**Audit Note:** Summary: # boomtick mcp tool execution error log  this document tracks configuration issues, api failures, an... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #1836 — Consolidated: Normalize mobile card heights, reduce metadata wrapping, and improve tap targets

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for consolidated: normalize mobile card heights, reduce metadata wrapping, and improve tap targets.

**Audit Note:** Summary: ## problem  mobile navigation is difficult to scan due to overlapping elements, inconsistent mobile... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #1835 — Consolidated: Fix oversized hero image and decorative overlay on desktop pushing content below the fold

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for consolidated: fix oversized hero image and decorative overlay on desktop pushing content below the fold.

**Audit Note:** Summary: ## problem  hero image and its decorative overlays are too large on the home page, pushing useful co... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #1819 — Epic: Improve Visual Regression Tools

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for epic: improve visual regression tools.

**Audit Note:** Summary: ````md id="visual-regression-cleanup-issue" # clean up and consolidate visual regression snapshot to... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #1816 — Update AGENTS.md with affiliate, SEO, and URL stability requirements

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for update agents.md with affiliate, seo, and url stability requirements.

**Audit Note:** Summary: ## goal  update `agents.md` so coding/content agents consistently protect affiliate compliance, goog... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #1767 — Verify MerchImageDisplay Height Responsiveness

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open
**Reason:** Follow-up cleanup tasks are valid.

**Audit Note:** Summary: the `merchimagedisplay` component's height was significantly reduced (`base: 80, md: 96` to `base: 3... | Relevance: Yes, cleanup tasks are necessary. | Actionable: Yes. | Action: Keep open and assign.

### Issue #1749 — Research page: add UX storyboard and visual redesign plan

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for research page: add ux storyboard and visual redesign plan.

**Audit Note:** Summary: status: blocked by dependencies or other repository work.... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #1748 — Research page: add SEO-focused DevAI implementation articles

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for research page: add seo-focused devai implementation articles.

**Audit Note:** Summary: status: blocked by dependencies or other repository work.... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #1747 — Research page: feature BoomTick.blog and RepoAuditor AI as flagship outputs

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for research page: feature boomtick.blog and repoauditor ai as flagship outputs.

**Audit Note:** Summary: status: blocked by dependencies or other repository work.... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #1746 — Research page: rename and clarify project taxonomy

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for research page: rename and clarify project taxonomy.

**Audit Note:** Summary: # research page: rename and clarify project taxonomy  ## verdict: needs updating / likely should be... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #1738 — Add dry-run and validation guardrails for Printful store mutation scripts

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for add dry-run and validation guardrails for printful store mutation scripts.

**Audit Note:** Summary: # add dry-run and validation guardrails for printful store mutation scripts  ## verdict: important /... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #1736 — Protect affiliate disclosure and outbound-link compliance

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for protect affiliate disclosure and outbound-link compliance.

**Audit Note:** Summary: # protect affiliate disclosure and outbound-link compliance  ## verdict: important / high priority.... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.

### Issue #1732 — Update BoomTick Merch descriptions, colors, and mockups via Printful API

- [x] Relevance checked
- [x] Duplicate check completed
- [x] Related PRs checked
- [x] Current implementation checked
- [x] Labels / milestone reviewed
- [x] Audit note written
- [x] Recommendation recorded

**Recommendation:** Keep open, needs clarification
**Reason:** Requires further review of scope for update boomtick merch descriptions, colors, and mockups via printful api.

**Audit Note:** Summary: # update boomtick merch descriptions, colors, and mockups via printful api  ## verdict: needs major... | Relevance: Potentially relevant. | Actionable: Not currently, needs scope clarification. | Action: Keep open but ask author for details.
