# Description

This repository is the source code for boomtick.blog, a West Coast Swing dancer site with some tech features by the author.

The development and AI-agent automation tools previously maintained here (`boomtick-mcp`, `td-cli`, and other agentic dev tools used by this package) have been migrated to the new repository [arii/boomtick](https://github.com/arii/boomtick). Please note that the `boomtick-mcp` tools are intended to be repo agnostic.

Please provide a summary of the changes and which content scope this PR covers.

## Scope (Select One)

- [ ] **Event Facts**: Factual corrections (venue, city, date, hero labels, URL).
- [ ] **Gear/Assets**: Broken or incorrect image/path fixes.
- [ ] **Merch Catalog**: Copy or layout updates for products.
- [ ] **Article Editorial**: Content updates or date strategy for blog posts.

---

## Validation Checklist

### 📍 Event Facts
- [ ] Source URL provided in comments/description.
- [ ] Verified venue, city, and event dates match the source.
- [ ] Hero labels and event URLs are correct.

### 🖼 Gear/Assets
- [ ] Broken assets identified and updated.
- [ ] Missing assets marked as `draft: true` (do not use placeholder paths).
- [ ] No changes to event facts or merch catalog copy.

### 🛍 Merch Catalog
- [ ] Product removals (if any) are listed explicitly in the description.
- [ ] Copy and layout updates verified against brand guidelines.
- [ ] No changes to event facts or gear asset paths.

### ✍️ Article Editorial
- [ ] Rationale provided for any post date changes.
- [ ] Old content does not appear "newly published" without intent.
- [ ] No changes to factual event data or product catalogs.

---

## Technical Checks
- [ ] `pnpm build` passes.
- [ ] `node boomtick-pkg/scripts/detect-antipatterns.mjs` shows no new UI anti-patterns.
- [ ] PR touches only files relevant to the selected scope.
