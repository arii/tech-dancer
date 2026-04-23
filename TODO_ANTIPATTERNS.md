# UI Anti-Pattern TODO List

This list is automatically generated from the `npm run audit` report. Fix these anti-patterns to adhere to the project design system.

## src/features/contact/components/ContactFormView.tsx
- [ ] Line 57: [Non-token Color/Size] group-hover:bg-accent-brand/5 - Class 'group-hover:bg-accent-brand/5' uses a value that is not a recognized design token.
- [ ] Line 138: [Raw Layout/Spacing] py-4 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
## src/features/contact/components/SuccessState.tsx
- [ ] Line 36: [Non-token Color/Size] hover:bg-accent-brand/5 - Class 'hover:bg-accent-brand/5' uses a value that is not a recognized design token.
## src/features/dashboard/EventCard.tsx
- [ ] Line 14: [Raw Layout/Spacing] flex - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 14: [Raw Layout/Spacing] flex-col - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 14: [Raw Layout/Spacing] p-6 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 14: [Raw Layout/Spacing] lg:p-8 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 17: [Raw Layout/Spacing] flex - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 17: [Raw Layout/Spacing] items-center - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 17: [Raw Layout/Spacing] gap-3 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
## src/features/email-capture/EmailForm.tsx
- [ ] Line 25: [Arbitrary Value] -[44px] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 31: [Arbitrary Value] -[44px] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 31: [Arbitrary Value] -[140px] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 31: [Arbitrary Value] -[180px] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 31: [Raw Layout/Spacing] px-6 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 40: [Raw Layout/Spacing] flex - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 40: [Raw Layout/Spacing] items-center - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 40: [Raw Layout/Spacing] justify-center - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 40: [Raw Layout/Spacing] gap-2 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
