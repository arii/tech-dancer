# 🛠️ Impeccable Refactoring Instructions

Based on the visual audit of `tech-dancer`, follow these specific instructions to eliminate design anti-patterns and align with the Impeccable standard.

## 1. Eliminate "Cardocalypse" in Blog Feed
**Target:** `src/features/journal/BlogFeed.tsx` and `src/components/ui/ContentCard.tsx`
- **Anti-pattern:** Every post is wrapped in a shadowed, bordered box.
- **Action:**
    - Refactor `ContentCard.tsx` to support a `minimal` or `no-box` variant.
    - Remove `surface`, `border`, `radius`, and `shadow` props from the outer container.
    - Use a simple horizontal line (`border-b`) or ample whitespace between posts.
    - Increase the title weight and size to let typography provide the structure.

## 2. Break "Grid Fatigue" in Research Tools
**Target:** `src/features/research/Research.tsx`
- **Anti-pattern:** Uniform list of tool cards.
- **Action:**
    - Switch from a card grid to an editorial list format.
    - Use asymmetric spacing: e.g., Tool name on the left, description shifted slightly right, "Launch" button as a minimal text link with a long arrow.
    - Remove the gray background containers.

## 3. Cure "Centering Sickness" in Studies Section
**Target:** `src/features/research/Research.tsx` (Studies segment)
- **Anti-pattern:** The "Pipeline Synchronizing..." state is centered and boxed.
- **Action:**
    - Left-align the empty state/loading content.
    - Use a vertical accent bar (similar to the Home Hero) to define the space instead of a dashed border box.

## 4. Typography Upgrades (Global)
**Target:** `src/layouts/Text.tsx` and various features
- **Anti-pattern:** Over-reliance on default sans-serif for body and sub-headings.
- **Action:**
    - Apply `variant="headline"` to all section headers (e.g., "Blog Posts", "Tools Ecosystem").
    - Use `italic` for excerpts or descriptions to add a "designed" editorial feel.
    - Ensure neutrals are tinted: check that `text-text-dim` and `text-text-body` are using the tinted variables from `tokens.css` (e.g., `--color-text-dim: color-mix(in srgb, var(--color-accent-navy) 60%, white)`).

## 5. Neutral Tinting
- **Action:** Ensure no pure `#000000` or `#FFFFFF` is used for large surfaces.
- **Check:** `src/styles/tokens.css` for background and text color definitions.
