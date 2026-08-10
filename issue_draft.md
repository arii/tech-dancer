# Standardize Product Display Modules and Sizing

# Problem Statement

Product feature sections within blog posts fluctuate structurally. Currently, some listings repeat the exact same item back-to-back, and image thumbnail sizing/presence is highly inconsistent. This leads to an uneven horizontal layout grid and disrupted visual hierarchy across editorial blog content.

# Goal

Enforce a consistent visual rhythm and layout structure for all embedded product modules within editorial content, ensuring proper sizing, fixed aspect ratios, and clean typographic constraints.

# Non-Goals

Changing the global eCommerce catalog layout on the main Merch page. This work is strictly isolated to inline product embeddings within blog posts and editorial content.

# Proposed Approach

1. **Enforce Atomic Component Rule**: Enforce a strict atomic component rule for items under `#### SHOP SELECTED ITEMS`. Every product card must render exactly once (preventing back-to-back duplicate data rendering) with:
   - A standard aspect-ratio image thumbnail.
   - The product title.
   - A 1-line value proposition/description.
   - A styled CTA action button.
2. **Unified `<ProductEmbed />` Component**: Create and export a unified `<ProductEmbed />` component (e.g., in `src/components/products/ProductEmbed.tsx` or similar directory).
3. **Markdown Integration**: Standardize the markdown component mapping used in `MarkdownRenderer.tsx` to support `<ProductEmbed />` and `<product-embed />`.
4. **ID Lookup Engine**: The component should accept an `id` prop and look up data from:
   - `affiliateManager.getLink(id)` for affiliate items.
   - The product catalog (`src/data/products/catalog.ts`) for owned merchandise.
   - Support optional override props (`title`, `image`, `description`, `href`) if an ID is not specified.

# Alternatives Considered

Allowing arbitrary markdown image embeds and text blocks for product sections. This was rejected because it leads to inconsistent sizing, missing CTA buttons, and a ragged, non-standardized layout.

# Architectural Impact

- **Zero-Submodule Compliance**: Keeps changes local to the host repository.
- **Anti-Pattern Compliance**: Built strictly using Layout Primitives (`<Box>`, `<Stack>`, `<Grid>`) instead of raw Tailwind layout class utilities. No inline styles. No hardcoded non-token colors.
- **Clean MDX Parsing**: Standardizes `<ProductEmbed />` configuration inside `MarkdownRenderer.tsx`.

# Scope

- `src/components/ui/MarkdownRenderer.tsx` (or `src/components/editorial/MarkdownRenderer.tsx`)
- `src/components/products/ProductEmbed.tsx` (new component)
- Content files (updating inline embeddings in `/content/**/*.md`)

# UNDERSTAND THE ISSUE

Inline product recommendations look messy and unstandardized. Some articles use raw markdown, while others use notice boxes, resulting in inconsistent aspect ratios, redundant data, and a layout that disrupts horizontal alignment and visual rhythm.

# DETERMINE APPROACH

We will create and strictly enforce a standard `<ProductEmbed />` component.
- The component must feature:
  - Container: `<Box>` or `<Stack>` with standard surface, border (`border-line/30`), and soft shadow.
  - Image: Fixed aspect ratio (`aspect-square` or predefined size) using `<Box as="img" />` with `object-contain` or `object-cover` styling.
  - Title: Clamped to 1 or 2 lines.
  - Value Prop: Clamped strictly to 1 line (`clamp={1}`) to keep all cards uniform.
  - CTA Button: Standard styling using `<Button>` with an external link arrow.
- We will map both `<ProductEmbed />` and `<productembed />` in `MarkdownRenderer.tsx`.
- We will replace repetitive and non-standardized inline items under `#### SHOP SELECTED ITEMS` across blog post files.

# SPECIFY SCOPE

1. **Component Design**: `src/components/products/ProductEmbed.tsx` and related types/interfaces.
2. **Markdown Mapping**: `src/components/ui/MarkdownRenderer.tsx`.
3. **Content Alignment**: Editorial content markdown files under `content/posts/` and `content/blog/`.

# DEFINITION OF DONE

1. **Consistent Grid Layout**: All embedded products in blog posts follow a uniform layout with consistent aspect ratios and non-repeating data.
2. **No Layout Utility Violations**: `<ProductEmbed />` uses `<Box>`, `<Stack>`, `<Grid>` primitives and contains no raw layout Tailwind classes (like `flex`, `grid`, etc.).
3. **No Lint or Type Errors**: The project builds, lints, and passes type checking successfully via `pnpm run ci:local`.
4. **Verification**: Automated smoke or visual tests verify rendering without layout distortion.
