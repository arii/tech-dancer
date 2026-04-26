# UI Anti-Pattern TODO List

This list is automatically generated from the audit report. Fix these anti-patterns to adhere to the project design system.

## src/features/contact/components/ContactFormView.tsx
- [ ] Line 123: [Raw Layout/Spacing] mt-2 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.

## src/features/lab/BlogDrafter.tsx
- [ ] Line 38: [Arbitrary Value] -[160px] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 38: [Raw Layout/Spacing] p-6 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 77: [Raw Layout/Spacing] pb-4 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 83: [Raw Layout/Spacing] p-2 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 83: [Non-token Color/Size] hover:bg-muted - Class 'hover:bg-muted' uses a value that is not a recognized design token.
- [ ] Line 86: [Raw Layout/Spacing] p-2 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 86: [Non-token Color/Size] hover:bg-muted - Class 'hover:bg-muted' uses a value that is not a recognized design token.
- [ ] Line 103: [Raw Layout/Spacing] ml-auto - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
## src/features/lab/components/GearPostDetail.tsx
- [ ] Line 35: [Raw Layout/Spacing] pb-2 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
## src/features/research/ResearchDetail.tsx
- [ ] Line 111: [Non-token Color/Size] text-dim - Class 'text-dim' uses a value that is not a recognized design token.
