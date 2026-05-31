# Open PR UX, Code-Quality, and AI-Slop Review Comments — 2026-05-30

This document contains ready-to-post review comments for every PR that was open in `arii/tech-dancer` during the latest 2026-05-30 refresh pass.

## Review method

- Refreshed the open PR inventory from `GET /repos/arii/tech-dancer/pulls?state=open&per_page=100` and each PR's `files` endpoint. The current set contains **21 open PRs**.
- Captured the current local UI baseline with the repository Playwright screenshot utility (`pnpm exec tsx scripts/ux-capture.ts`) at desktop (`1440x900`) and mobile (`390x844`) sizes for `/`, `/research`, `/merch`, `/blog`, `/gear`, `/events`, and `/ux-auditor`.
- Ran the iPhone 12 browser-emulation audit (`python3 dev-tools/td_cli.py gh mobile-audit`) to measure document overflow, elements outside containers, clipped content, and horizontal-scroll regions instead of relying on screenshots alone.
- Reviewed each PR for UX regressions, correctness, scope discipline, design-system compliance, duplicate abstractions, generated-looking filler, unnecessary workflow/config changes, tracked artifacts, missing validation, and other forms of AI slop.
- Comments were not posted. Copy the relevant fenced block into the corresponding PR review.

## Shared AI-slop standard

A PR should not merge merely because generated code compiles. Remove speculative abstractions, repeated marketing prose, placeholder content, dead files, unrelated edits, magic styling, redundant components, and tests that only mirror the implementation. Prefer the smallest coherent change, reuse established primitives, and include evidence for user-visible claims.

## Current mobile baseline findings

The iPhone 12 emulation audit found one blocking clipped-text issue and four horizontal-scroll regions that require an explicit affordance check:

- `/`: the featured guide venue text (`Hyatt Regency San Francisco Airport`) is 294px wide inside a 254px clipped container.
- `/merch`: category controls are 456px wide inside a 358px container.
- `/blog`: category controls are 601px wide inside a 358px container.
- `/gear`: category controls are 409px wide inside a 358px container.
- `/events`: category controls are 512px wide inside a 358px container.

Treat these as baseline findings, not permission to add more overflow. Relevant PRs should fix or explicitly preserve intentional scrolling with a discoverable affordance.

## PR #1761 — Editorial Blog Post System Refactor

URL: https://github.com/arii/tech-dancer/pull/1761

```markdown
Request changes: this is a large editorial-system refactor (26 files, roughly 900 added lines) that overlaps #1752 and #1696. Please identify the canonical article architecture before merging another parallel implementation.

- **UX:** Attach desktop and iPhone 12 screenshots for the article top, mid-body callouts/affiliate blocks, disclosure area, and footer. Run the mobile audit and ensure article text stays inside its containers. The `/blog` listing already has a 601px category row inside a 358px container, so preserve intentional scrolling only with a discoverable affordance and do not add clipping.
- **Code quality:** Reduce the 26-file surface to the minimum coherent refactor. Verify the new article components are reused rather than one-off wrappers, and run the TSX audit on every touched component. This branch contains a high volume of `className` decisions, so token/primitives compliance needs explicit review.
- **AI-slop check:** Remove placeholder/demo text, duplicated editorial prose, dead abstractions, debug logging, and components that exist only to subdivide markup without adding reuse or clarity. Compare against #1752/#1696 and close superseded branches.
```

## PR #1760 — Implement Merch Design Generation Logic

URL: https://github.com/arii/tech-dancer/pull/1760

```markdown
Request changes before merge: keep this as the single canonical merch-generation branch and close #1733 if this supersedes it.

- **UX:** Show the generated front/back artwork inside real `/merch` product cards on desktop and iPhone 12 emulation, plus one zoom/detail state. Confirm preview-only backgrounds do not leak into customer-facing cards, crops preserve the design, and the 456px-wide category row inside its 358px mobile container has an obvious scroll affordance.
- **Code quality:** Run the asset verifier and document deterministic regeneration. Confirm the licensed font is not tracked in git, generated outputs are intentionally committed, and site references use the new preview/print paths.
- **AI-slop check:** Remove redundant generated assets, stale paths, fallback behavior that hides generation failures, and verbose helper code that does not improve reproducibility. Do not merge two competing asset pipelines.
```

## PR #1759 — Rename and clarify project taxonomy on DevAI Portfolio page

URL: https://github.com/arii/tech-dancer/pull/1759

```markdown
Needs a focused pass: this started as taxonomy cleanup but now touches `PageHeader` plus multiple research files. Keep the change narrow and make the terminology consistent everywhere.

- **UX:** Attach refreshed `/research` desktop/mobile screenshots showing nav label, eyebrow, H1, intro, and first flagship row. Confirm longer labels do not crowd the desktop nav or create awkward mobile wrapping.
- **Code quality:** Avoid introducing a page-header variant solely for one page unless it is genuinely reusable. Reconcile terminology with #1750, #1753, #1755, and #1756 before merge.
- **AI-slop check:** Remove synonym churn and generic portfolio buzzwords. Use one deliberate taxonomy, not several near-duplicate labels generated across config and component files.
```

## PR #1758 — Fix WCS Travel Pack Guide and Link

URL: https://github.com/arii/tech-dancer/pull/1758

```markdown
Request a scope split or clear justification: a WCS guide/link fix should not casually bundle DevTools auth/orchestrator changes.

- **UX:** Show the homepage featured-guide card and WCS Travel Pack detail page on desktop/mobile. Fix or intentionally wrap the measured mobile clipping for `Hyatt Regency San Francisco Airport` (294px text inside a 254px container), and confirm title, CTA, lead image, and first content block render without broken images or the large empty mobile space visible in the current home baseline.
- **Code quality:** Keep route/content normalization and its tests together. Move unrelated DevTools GitHub automation edits into a separate PR unless they are strictly required and explained.
- **AI-slop check:** Remove drive-by refactors, duplicated normalization paths, and broad cleanup unrelated to the user-visible bug. Consolidate with #1695 so there is one canonical guide fix.
```

## PR #1757 — Expand blog drafter with Amazon affiliate automation

URL: https://github.com/arii/tech-dancer/pull/1757

```markdown
Please harden the generated-output contract before merge.

- **UX:** Render at least one generated affiliate item in its final blog/gear card context on desktop/mobile, including long-title and missing-image fallback cases.
- **Code quality:** Document required inputs, affiliate-tag validation, deterministic filenames, idempotency, and failure behavior. The scripts add substantial console output; distinguish actionable CLI messages from debug noise and add tests for reruns.
- **AI-slop check:** Reject generic product copy, invented claims, placeholder images, duplicate catalog entries, and verbose generated descriptions. Automation should improve consistency, not mass-produce low-quality content.
```

## PR #1756 — Add Ecommerce Automation section to Research portfolio

URL: https://github.com/arii/tech-dancer/pull/1756

```markdown
Request changes: the Ecommerce Automation section is reasonable, but the unrelated `.github/workflows/security.yml` edit should be split out and justified separately.

- **UX:** Add desktop/mobile screenshots showing where the new section sits relative to Flagship Projects. Check visual rhythm, label clipping, mobile stacking, and horizontal overflow.
- **Code quality:** Keep the feature component focused and covered by meaningful behavior tests. Rebase against the other research PRs before merge to avoid multiple competing section models.
- **AI-slop check:** Remove generic automation marketing copy, decorative metrics without a source, unnecessary cards, and workflow changes unrelated to the visible feature.
```

## PR #1755 — Add SEO-focused DevAI implementation articles to Research Portfolio

URL: https://github.com/arii/tech-dancer/pull/1755

```markdown
Please perform an editorial-quality pass before merge. Adding many SEO articles at once has a high risk of thin, repetitive, AI-generated content.

- **UX:** Show the research/studies listing and one detail page on desktop/mobile. Confirm titles, tags, excerpts, and dates remain scannable without a wall of indistinguishable cards.
- **Code quality:** Validate frontmatter schema, ordering, links, and content loading. Keep listing changes minimal and avoid one-off rendering branches for the new articles.
- **AI-slop check:** Require concrete evidence, source links where factual claims are made, distinct article value, and human-edited prose. Remove repeated templates, generic conclusions, keyword stuffing, and claims that cannot be verified.
```

## PR #1754 — Add UX storyboard and visual redesign plan for /research

URL: https://github.com/arii/tech-dancer/pull/1754

```markdown
Documentation-only, but please make the storyboard actionable rather than aspirational.

- **UX:** Tie each proposed frame to the current `/research` desktop/mobile baseline and state responsive priority for hero, first flagship row, and added modules.
- **Code quality:** Link recommendations to the implementation PRs that own them and separate accepted changes from future ideas.
- **AI-slop check:** Remove generic design-language filler, repeated principles, and speculative sections without a user problem, measurable goal, or implementation owner.
```

## PR #1753 — Feature BoomTick.blog and RepoAuditor AI as flagship research outputs

URL: https://github.com/arii/tech-dancer/pull/1753

```markdown
Request a scope correction: the flagship-project UI should not be bundled with `.github/workflows/mergellama.yml` unless there is a documented, reviewable dependency.

- **UX:** Provide desktop/mobile screenshots of both flagship cards together, including titles, supporting copy, and CTAs. Ensure neither project relies on screenshot imagery alone to communicate value.
- **Code quality:** Split unrelated workflow changes, rebase with the other `/research` PRs, and trim duplicate config/content definitions.
- **AI-slop check:** Replace broad AI claims with specific shipped capabilities. Remove decorative telemetry language, generic “AI-powered” prose, and metrics without evidence.
```

## PR #1752 — Implement reusable editorial blog post template

URL: https://github.com/arii/tech-dancer/pull/1752

```markdown
Please reconcile this with #1761 and #1696 before merge. The repo should have one editorial template system, not three overlapping variants.

- **UX:** Attach desktop/mobile screenshots for article header, representative body section, newsletter block, and related content. Preserve readable line length and a calm reading hierarchy.
- **Code quality:** Demonstrate which extracted components are reused. Remove wrappers that merely rename markup, and route styling through existing tokens/variants rather than new one-off CSS.
- **AI-slop check:** Avoid component fragmentation, repetitive boilerplate, placeholder newsletter copy, and abstractions generated for symmetry rather than an actual reuse case.
```

## PR #1750 — Reposition Research page as DevAI Systems Portfolio

URL: https://github.com/arii/tech-dancer/pull/1750

```markdown
The direction is coherent, but please keep the PR focused and avoid committing disposable screenshot artifacts unless the repo has an intentional visual-fixture location.

- **UX:** Show the refreshed desktop/mobile `/research` hero and first flagship row. Keep hero copy concise so users reach project proof quickly.
- **Code quality:** Explain whether `portfolio_desktop.png` and `portfolio_mobile.png` are durable review artifacts, test fixtures, or files that should stay out of the branch. Reconcile route/SEO terminology with #1759.
- **AI-slop check:** Remove generic positioning copy and unsupported claims. Prefer concrete shipped systems and outcomes over AI-branding language.
```

## PR #1745 — Refine Merch Page UX and Visual Hierarchy

URL: https://github.com/arii/tech-dancer/pull/1745

```markdown
Request changes: this is no longer a focused merch UX PR. It now spans 37 files, including `AGENTS.md`, PR template/config tooling, article components, content posts, and merch files. Split it before review.

- **UX:** For the merch slice only, attach before/after desktop/mobile screenshots showing hero, discount block, fulfillment note, tabs, and first product row. Mobile still delays product imagery below the initial viewport.
- **Code quality:** Separate merch UX, editorial components, content edits, and repository-policy/tooling edits into independent PRs. Do not modify agent instructions as a drive-by change inside a feature branch.
- **AI-slop check:** This is the clearest scope-creep risk in the open set. Remove unrelated cleanup, generated-looking bulk edits, dead abstractions, and broad rewrites that cannot be justified by the merch UX goal.
```

## PR #1743 — Conservative SEO and Product JSON-LD implementation

URL: https://github.com/arii/tech-dancer/pull/1743

```markdown
Please establish whether this supersedes #1740 and keep only one schema policy implementation.

- **UX:** Provide smoke screenshots for `/merch` and `/gear`; this change should be visually neutral, with cards, filters, images, and disclosures unchanged.
- **Code quality:** Keep schema emission conservative, test omission behavior for incomplete products, and avoid unrelated Toolbox/Merch page changes unless required.
- **AI-slop check:** Do not invent product facts, prices, ratings, availability, or identifiers for richer JSON-LD. Sparse truthful schema is better than synthetic metadata.
```

## PR #1740 — Define safe Product JSON-LD rules for merch and gear

URL: https://github.com/arii/tech-dancer/pull/1740

```markdown
Please consolidate with #1743 rather than merging two competing schema implementations.

- **UX:** Confirm `/merch` and `/gear` remain visually unchanged.
- **Code quality:** Keep tests centered on observable schema policy: emit only supported fields and omit incomplete products. Avoid duplicating production logic inside tests.
- **AI-slop check:** Reject fabricated values, speculative defaults, and over-engineered schema builders. The smallest truthful structured-data output is the correct target.
```

## PR #1733 — Implement Merch Design Generation Logic

URL: https://github.com/arii/tech-dancer/pull/1733

```markdown
Request closure in favor of #1760 unless this branch has a unique, demonstrated visual result.

- **UX:** If retained, compare both branches side-by-side inside the same `/merch` product-card layout.
- **Code quality:** Do not track `scripts/merch/fonts/CooperBlack.ttf`; keep licensed fonts out of git and document local setup. Avoid parallel generated-asset locations.
- **AI-slop check:** Remove stale generated files, duplicate pipelines, and fallback output that hides missing dependencies. One deterministic generator is enough.
```

## PR #1718 — Merch Page Overhaul: Curated Storefront & Editorial Layout

URL: https://github.com/arii/tech-dancer/pull/1718

```markdown
Please rebase against the chosen merch asset and merch hierarchy branches before merge.

- **UX:** Provide desktop/iPhone 12 screenshots for top-of-page, category tabs, first product row, and missing/draft asset fallback. Mobile shopping momentum is the key concern because products appear after substantial promotional content; also make the measured 456px category row inside its 358px container visibly scrollable.
- **Code quality:** Keep product-card/image-display abstractions cohesive, verify tests cover user behavior rather than implementation details, and reconcile data changes with #1745/#1760.
- **AI-slop check:** Remove duplicate catalog representations, over-configured card variants, and editorial copy that does not help product selection.
```

## PR #1696 — Redesign BoomTick blog post pages for editorial layouts

URL: https://github.com/arii/tech-dancer/pull/1696

```markdown
Request consolidation: this 28-file editorial redesign overlaps #1752 and #1761. Choose one canonical architecture and close or reduce the others.

- **UX:** Attach desktop/iPhone 12 top, mid-article, and footer screenshots for a long post. Check line length, spacing, callout hierarchy, affiliate prominence, related-content density, and measured container overflow rather than relying on screenshots alone.
- **Code quality:** Audit the large article-component set for genuine reuse. Remove parallel components that solve the same presentation problem and ensure token/primitives compliance.
- **AI-slop check:** Avoid “component apocalypse”: wrappers, cards, callouts, and feature blocks should exist only when they serve a distinct editorial need. Remove filler copy and speculative abstractions.
```

## PR #1695 — Fix WCS Travel Pack Guide and Link

URL: https://github.com/arii/tech-dancer/pull/1695

```markdown
Please close or consolidate this older WCS guide fix with #1758.

- **UX:** If retained, show homepage featured-card and destination-article screenshots on desktop/mobile, with no broken images, blank hero space, or clipped CTA/title.
- **Code quality:** Keep one normalization/rendering path and one guide-fix branch. Avoid mixing automation cleanup into the user-facing content repair.
- **AI-slop check:** Remove duplicate fixes, drive-by component changes, and content churn unrelated to the broken guide path.
```

## PR #1573 — Add curated gear sections to existing event guides

URL: https://github.com/arii/tech-dancer/pull/1573

```markdown
Please keep event-guide recommendations useful and restrained.

- **UX:** Attach event-guide screenshots before/after the curated gear section on desktop/iPhone 12 and run the mobile audit. Current `/events` controls measure 512px inside a 358px container, so add a discoverable horizontal-scroll affordance or stack them; the new module must not add clipping or bury event facts.
- **Code quality:** Validate frontmatter/schema changes, isolate side effects, and reconcile ThemeSpotlight/AffiliateCard overlap with #1570.
- **AI-slop check:** Curated gear needs a specific event rationale. Remove generic affiliate lists, invented recommendations, repeated descriptions, and items without a clear user need.
```

## PR #1570 — Implement Theme Spotlight Inspiration Section

URL: https://github.com/arii/tech-dancer/pull/1570

```markdown
Please rebase and prove that Theme Spotlight remains a focused, responsive addition rather than another overlapping event-guide system.

- **UX:** Show the spotlight with surrounding sections on desktop/iPhone 12. Confirm obvious stack/scroll behavior and address the measured `/events` category row (512px inside a 358px container) without introducing clipped text.
- **Code quality:** Avoid inline styles and magic values; route styling through tokens/primitives. Reconcile component ownership with #1573.
- **AI-slop check:** Remove decorative theme copy, generic inspiration lists, and UI ornaments that add visual weight without helping event planning.
```

## PR #1566 — Update gear cards with local Amazon product images

URL: https://github.com/arii/tech-dancer/pull/1566

```markdown
Request a strict content and asset audit before merging this 100-file image update.

- **UX:** Provide a desktop/iPhone 12 screenshot grid covering wide, portrait, low-resolution-risk, and missing/fallback image cases. The mobile audit measures the `/gear` category row at 409px inside a 358px container, so add a clear scrolling affordance or stack the controls and verify product text stays inside cards.
- **Code quality:** Add or generate a manifest mapping each resource to its local image, verify paths, and confirm every asset is intentionally allowed for local hosting. Mark uncertain assets draft rather than silently shipping them.
- **AI-slop check:** Remove placeholder resources, autogenerated filenames that do not map cleanly to content, duplicate products, generic descriptions, and unverified affiliate claims. Large bulk asset PRs need explicit human QA evidence.
```
