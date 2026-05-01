# UI Anti-Pattern TODO List

This list is automatically generated from the audit report. Fix these anti-patterns to adhere to the project design system.

## src/components/MobileBottomNav.tsx
- [ ] Line 15: [Arbitrary Value] -[safe-area-inset-bottom] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 25: [Arbitrary Value] -[44px] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 30: [Raw Layout/Spacing] mt-1 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.

## src/components/GlobalErrorBoundary.tsx
- [ ] Line 56: [Arbitrary Value] -[300px] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 58: [Raw Layout/Spacing] mb-2 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.

## src/components/ui/SearchBox.tsx
- [ ] Line 43: [Raw Layout/Spacing] pl-10 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.

## src/components/ui/PageSkeleton.tsx
- [ ] Line 36: [Raw Layout/Spacing] mx-auto - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.

## src/components/ui/PageHeader.tsx
- [ ] Line 47: [Non-token Color/Size] text-pretty - Class 'text-pretty' uses a value that is not a recognized design token.

## src/components/ui/MarkdownRenderer.tsx
- [ ] Line 23: [Raw Layout/Spacing] mb-2 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 24: [Raw Layout/Spacing] m-0 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 24: [Raw Layout/Spacing] p-0 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 28: [Inline Styles] style={{ - Inline styles are banned. Use design tokens (AGENTS.md §11)
- [ ] Line 28: [Raw Layout/Spacing] mt-12 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 28: [Raw Layout/Spacing] mb-6 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 35: [Arbitrary Value] -[counter(section,decimal-leading-zero)] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 35: [Raw Layout/Spacing] mb-2 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 35: [Raw Layout/Spacing] before:mr-2 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 37: [Raw Layout/Spacing] m-0 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 38: [Raw Layout/Spacing] mt-4 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.

## src/components/ui/ListRow.tsx
- [ ] Line 29: [Raw Layout/Spacing] py-3 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.

## src/components/ui/HeroPathCard.tsx
- [ ] Line 42: [Arbitrary Value] -[0.98] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 86: [Non-token Color/Size] bg-gradient-to-t - Class 'bg-gradient-to-t' uses a value that is not a recognized design token.

## src/components/ui/FolioGrid.tsx
- [ ] Line 77: [Non-token Color/Size] hover:bg-card-bg - Class 'hover:bg-card-bg' uses a value that is not a recognized design token.

## src/components/ui/FilterBar.tsx
- [ ] Line 24: [Arbitrary Value] -[44px] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 24: [Arbitrary Value] -[44px] - Avoid arbitrary values like -[...]. Use design tokens instead.

## src/components/ui/ContentCard.tsx
- [ ] Line 95: [Raw Layout/Spacing] mt-auto - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 100: [Raw Layout/Spacing] ml-auto - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.

## src/components/ui/CardImagePlaceholder.tsx
- [ ] Line 33: [Non-token Color/Size] bg-muted/10 - Class 'bg-muted/10' uses a value that is not a recognized design token.
- [ ] Line 39: [Raw Layout/Spacing] px-3 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 39: [Raw Layout/Spacing] py-1 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.

## src/components/navigation/NavItem.tsx
- [ ] Line 44: [Arbitrary Value] -[44px] - Avoid arbitrary values like -[...]. Use design tokens instead.

## src/components/navigation/MobileMenuOverlay.tsx
- [ ] Line 66: [Arbitrary Value] -[100] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 86: [Arbitrary Value] -[44px] - Avoid arbitrary values like -[...]. Use design tokens instead.

## src/components/navigation/MobileHeader.tsx
- [ ] Line 18: [Arbitrary Value] -[backdrop-filter] - Avoid arbitrary values like -[...]. Use design tokens instead.

## src/components/layout/DetailLayout.tsx
- [ ] Line 77: [Non-token Color/Size] bg-muted - Class 'bg-muted' uses a value that is not a recognized design token.
- [ ] Line 93: [Raw Layout/Spacing] mx-auto - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 94: [Inline Styles] style={{ - Inline styles are banned. Use design tokens (AGENTS.md §11)
