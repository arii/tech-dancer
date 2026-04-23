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
## src/features/email-capture/NewsletterBanner.tsx
- [ ] Line 19: [Raw Layout/Spacing] mx-auto - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 31: [Raw Layout/Spacing] p-1 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 46: [Non-token Color/Size] text-accent-brand - Class 'text-accent-brand' uses a value that is not a recognized design token.
## src/features/journal/BlogPost.tsx
- [ ] Line 31: [Non-token Color/Size] hover:text-accent-brand - Class 'hover:text-accent-brand' uses a value that is not a recognized design token.
## src/features/journal/components/BlogPostDetail.tsx
- [ ] Line 36: [Raw Layout/Spacing] flex - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 36: [Raw Layout/Spacing] items-center - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 36: [Raw Layout/Spacing] justify-center - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 56: [Non-token Color/Size] hover:text-accent-brand - Class 'hover:text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 65: [Raw Layout/Spacing] mb-8 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
## src/features/lab/BlogDrafter.tsx
- [ ] Line 26: [Non-token Color/Size] text-accent-brand - Class 'text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 31: [Non-token Color/Size] text-accent-brand - Class 'text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 31: [Raw Layout/Spacing] mt-1 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 212: [Non-token Color/Size] hover:bg-accent-brand - Class 'hover:bg-accent-brand' uses a value that is not a recognized design token.
## src/features/lab/GearCard.tsx
- [ ] Line 89: [Arbitrary Value] -[1px] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 26: [Raw Layout/Spacing] flex - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 26: [Raw Layout/Spacing] flex-col - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 41: [Non-token Color/Size] text-amber-500 - Class 'text-amber-500' uses a value that is not a recognized design token.
- [ ] Line 52: [Raw Layout/Spacing] px-1.5 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 52: [Raw Layout/Spacing] py-0.5 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 74: [Non-token Color/Size] bg-amber-50/50 - Class 'bg-amber-50/50' uses a value that is not a recognized design token.
- [ ] Line 74: [Raw Layout/Spacing] px-2 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 74: [Raw Layout/Spacing] py-0.5 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 75: [Non-token Color/Size] text-amber-700 - Class 'text-amber-700' uses a value that is not a recognized design token.
- [ ] Line 90: [Raw Layout/Spacing] ml-auto - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
## src/features/lab/GearPost.tsx
- [ ] Line 38: [Non-token Color/Size] hover:text-accent-brand - Class 'hover:text-accent-brand' uses a value that is not a recognized design token.
## src/features/lab/Toolbox.tsx
- [ ] Line 23: [Raw Layout/Spacing] mb-12 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 23: [Raw Layout/Spacing] pb-12 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 29: [Raw Layout/Spacing] mb-4 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 32: [Raw Layout/Spacing] mb-8 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 38: [Raw Layout/Spacing] flex-1 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 42: [Raw Layout/Spacing] pl-10 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 42: [Raw Layout/Spacing] pr-4 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 42: [Raw Layout/Spacing] py-3 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 38: [div Layout] <div> with layout classes - Avoid using <div> for layout. Use layout primitives from src/layouts/.
## src/features/lab/components/GearPostDetail.tsx
- [ ] Line 35: [Raw Layout/Spacing] pb-2 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
## src/features/profile/ProfileSidebar.tsx
- [ ] Line 33: [Arbitrary Value] -[0.5] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 46: [Arbitrary Value] -[0.15em] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 65: [Arbitrary Value] -[0.15em] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 100: [Arbitrary Value] -[0.15em] - Avoid arbitrary values like -[...]. Use design tokens instead.
## src/features/research/ResearchAnalytics.tsx
- [ ] Line 110: [Arbitrary Value] -[40ch] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 47: [Non-token Color/Size] group-hover:text-accent-brand - Class 'group-hover:text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 53: [Non-token Color/Size] group-hover:text-accent-brand - Class 'group-hover:text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 57: [Non-token Color/Size] group-hover:text-accent-brand - Class 'group-hover:text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 82: [Non-token Color/Size] group-hover:text-accent-brand - Class 'group-hover:text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 95: [Non-token Color/Size] group-hover:text-accent-brand - Class 'group-hover:text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 107: [Non-token Color/Size] text-slate-300 - Class 'text-slate-300' uses a value that is not a recognized design token.
## src/features/research/ResearchDetail.tsx
- [ ] Line 50: [Non-token Color/Size] hover:text-accent-brand - Class 'hover:text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 78: [Non-token Color/Size] hover:text-accent-brand - Class 'hover:text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 105: [Non-token Color/Size] text-accent-brand - Class 'text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 112: [Non-token Color/Size] text-accent-brand - Class 'text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 112: [Non-token Color/Size] text-dim - Class 'text-dim' uses a value that is not a recognized design token.
- [ ] Line 119: [Non-token Color/Size] bg-accent-brand/5 - Class 'bg-accent-brand/5' uses a value that is not a recognized design token.
- [ ] Line 121: [Non-token Color/Size] text-accent-brand - Class 'text-accent-brand' uses a value that is not a recognized design token.
## src/pages/UXAuditor.tsx
- [ ] Line 76: [Arbitrary Value] -[var(--color-success,#16a34a)] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 174: [Arbitrary Value] -[var(--color-success-dim,#dcfce7)] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 174: [Arbitrary Value] -[var(--color-success,#16a34a)] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 174: [Arbitrary Value] -[var(--color-warning-dim,#fef3c7)] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 174: [Arbitrary Value] -[var(--color-warning,#d97706)] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 295: [Arbitrary Value] -[var(--color-error,#ef4444)] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 295: [Arbitrary Value] -[var(--color-warning,#f59e0b)] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 129: [Non-token Color/Size] text-text - Class 'text-text' uses a value that is not a recognized design token.
- [ ] Line 214: [Non-token Color/Size] hover:text-text - Class 'hover:text-text' uses a value that is not a recognized design token.
- [ ] Line 269: [Raw Layout/Spacing] mx-auto - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 269: [Raw Layout/Spacing] mb-2 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 294: [Raw Layout/Spacing] flex - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 294: [Raw Layout/Spacing] items-center - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 294: [Raw Layout/Spacing] gap-2 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
