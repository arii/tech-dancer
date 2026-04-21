# UI Anti-Pattern TODO List

This list is automatically generated from the `npm run audit` report. Fix these anti-patterns to adhere to the project design system.

## src/features/dashboard/EventCard.tsx
- [ ] Line 19: [Arbitrary Value] -[0.15em] - Avoid arbitrary values like -[...]. Use design tokens instead.
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
- [ ] Line 19: [Arbitrary Value] -[0_-10px_25px_-5px_rgba(0,0,0,0.05),0_-8px_10px_-6px_rgba(0,0,0,0.05)] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 19: [Raw Layout/Spacing] mx-auto - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 31: [Raw Layout/Spacing] p-1 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 46: [Non-token Color/Size] text-accent-brand - Class 'text-accent-brand' uses a value that is not a recognized design token.
## src/features/journal/BlogPost.tsx
- [ ] Line 17: [Non-token Color/Size] hover:text-accent-brand - Class 'hover:text-accent-brand' uses a value that is not a recognized design token.
## src/features/lab/BlogDrafter.tsx
- [ ] Line 15: [Non-token Color/Size] text-accent-brand - Class 'text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 20: [Non-token Color/Size] text-accent-brand - Class 'text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 20: [Raw Layout/Spacing] mt-1 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 205: [Non-token Color/Size] hover:bg-accent-brand - Class 'hover:bg-accent-brand' uses a value that is not a recognized design token.
## src/features/lab/GearCard.tsx
- [ ] Line 57: [Arbitrary Value] -[8px] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 75: [Arbitrary Value] -[8px] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 79: [Arbitrary Value] -[8px] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 82: [Arbitrary Value] -[8px] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 24: [Raw Layout/Spacing] flex - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 24: [Raw Layout/Spacing] flex-col - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 35: [Raw Layout/Spacing] flex - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 35: [Raw Layout/Spacing] items-center - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 35: [Raw Layout/Spacing] justify-center - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 40: [Raw Layout/Spacing] px-3 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 40: [Raw Layout/Spacing] py-1 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 49: [Raw Layout/Spacing] flex - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 49: [Raw Layout/Spacing] flex-col - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 49: [Raw Layout/Spacing] gap-4 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 49: [Raw Layout/Spacing] p-6 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 49: [Raw Layout/Spacing] flex-1 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 50: [Raw Layout/Spacing] flex - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 50: [Raw Layout/Spacing] flex-col - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 50: [Raw Layout/Spacing] gap-2 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 52: [Raw Layout/Spacing] flex - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 52: [Raw Layout/Spacing] items-center - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 52: [Raw Layout/Spacing] gap-1 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 52: [Raw Layout/Spacing] mb-1 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 72: [Raw Layout/Spacing] flex - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 72: [Raw Layout/Spacing] flex-wrap - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 72: [Raw Layout/Spacing] items-center - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 72: [Raw Layout/Spacing] gap-3 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 72: [Raw Layout/Spacing] mt-2 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 74: [Raw Layout/Spacing] px-2 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 74: [Raw Layout/Spacing] py-0.5 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 88: [Raw Layout/Spacing] flex - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 88: [Raw Layout/Spacing] items-center - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 88: [Raw Layout/Spacing] justify-between - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 88: [Raw Layout/Spacing] pt-4 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 88: [Raw Layout/Spacing] mt-auto - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 35: [div Layout] <div> with layout classes - Avoid using <div> for layout. Use layout primitives from src/layouts/.
- [ ] Line 39: [div Layout] <div> with layout classes - Avoid using <div> for layout. Use layout primitives from src/layouts/.
- [ ] Line 40: [div Layout] <div> with layout classes - Avoid using <div> for layout. Use layout primitives from src/layouts/.
- [ ] Line 49: [div Layout] <div> with layout classes - Avoid using <div> for layout. Use layout primitives from src/layouts/.
- [ ] Line 50: [div Layout] <div> with layout classes - Avoid using <div> for layout. Use layout primitives from src/layouts/.
- [ ] Line 52: [div Layout] <div> with layout classes - Avoid using <div> for layout. Use layout primitives from src/layouts/.
- [ ] Line 72: [div Layout] <div> with layout classes - Avoid using <div> for layout. Use layout primitives from src/layouts/.
- [ ] Line 88: [div Layout] <div> with layout classes - Avoid using <div> for layout. Use layout primitives from src/layouts/.
- [ ] Line 92: [div Layout] <div> with layout classes - Avoid using <div> for layout. Use layout primitives from src/layouts/.
## src/features/lab/GearPost.tsx
- [ ] Line 26: [Non-token Color/Size] hover:text-accent-brand - Class 'hover:text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 52: [Raw Layout/Spacing] flex - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 52: [Raw Layout/Spacing] items-center - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 52: [Raw Layout/Spacing] gap-3 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 52: [Raw Layout/Spacing] px-4 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 52: [Raw Layout/Spacing] py-2 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
## src/features/lab/Toolbox.tsx
- [ ] Line 18: [Arbitrary Value] -[10px] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 16: [Raw Layout/Spacing] mb-12 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 16: [Raw Layout/Spacing] pb-12 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 18: [Raw Layout/Spacing] px-3 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 18: [Raw Layout/Spacing] py-1 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 22: [Raw Layout/Spacing] mb-4 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 25: [Raw Layout/Spacing] mb-8 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 34: [Raw Layout/Spacing] pl-10 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 34: [Raw Layout/Spacing] pr-4 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 34: [Raw Layout/Spacing] py-3 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
## src/features/profile/ArielProfile.tsx
- [ ] Line 23: [Arbitrary Value] -[0.5] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 29: [Arbitrary Value] -[0.15em] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 40: [Arbitrary Value] -[0.15em] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 79: [Arbitrary Value] -[0.15em] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 38: [Raw Layout/Spacing] flex - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 38: [Raw Layout/Spacing] items-center - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 38: [Raw Layout/Spacing] gap-2 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
## src/features/profile/ContactConsole.tsx
- [ ] Line 116: [Arbitrary Value] -[0.15em] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 128: [Arbitrary Value] -[0.15em] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 148: [Arbitrary Value] -[0.15em] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 167: [Arbitrary Value] -[0.15em] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 183: [Arbitrary Value] -[0.15em] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 65: [Non-token Color/Size] hover:bg-accent-brand/5 - Class 'hover:bg-accent-brand/5' uses a value that is not a recognized design token.
- [ ] Line 111: [Non-token Color/Size] group-hover:bg-accent-brand/5 - Class 'group-hover:bg-accent-brand/5' uses a value that is not a recognized design token.
- [ ] Line 171: [Raw Layout/Spacing] px-4 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 171: [Raw Layout/Spacing] py-3 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 209: [Non-token Color/Size] border-bg-muted - Class 'border-bg-muted' uses a value that is not a recognized design token.
## src/features/research/ResearchAnalytics.tsx
- [ ] Line 24: [Arbitrary Value] -[0.15em] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 64: [Arbitrary Value] -[0.15em] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 41: [Non-token Color/Size] group-hover:text-accent-brand - Class 'group-hover:text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 47: [Non-token Color/Size] group-hover:text-accent-brand - Class 'group-hover:text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 51: [Non-token Color/Size] group-hover:text-accent-brand - Class 'group-hover:text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 74: [Non-token Color/Size] group-hover:text-accent-brand - Class 'group-hover:text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 87: [Non-token Color/Size] group-hover:text-accent-brand - Class 'group-hover:text-accent-brand' uses a value that is not a recognized design token.
## src/features/research/ResearchDetail.tsx
- [ ] Line 21: [Non-token Color/Size] hover:text-accent-brand - Class 'hover:text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 39: [Non-token Color/Size] hover:text-accent-brand - Class 'hover:text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 66: [Non-token Color/Size] text-accent-brand - Class 'text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 73: [Non-token Color/Size] text-accent-brand - Class 'text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 73: [Non-token Color/Size] text-dim - Class 'text-dim' uses a value that is not a recognized design token.
- [ ] Line 80: [Non-token Color/Size] bg-accent-brand/5 - Class 'bg-accent-brand/5' uses a value that is not a recognized design token.
- [ ] Line 82: [Non-token Color/Size] text-accent-brand - Class 'text-accent-brand' uses a value that is not a recognized design token.
## src/features/resources/ResourceGallery.tsx
- [ ] Line 98: [Arbitrary Value] -[0.5] - Avoid arbitrary values like -[...]. Use design tokens instead.
- [ ] Line 50: [Raw Layout/Spacing] mx-auto - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 129: [Non-token Color/Size] text-accent-brand - Class 'text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 135: [Raw Layout/Spacing] px-2 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 135: [Raw Layout/Spacing] py-0.5 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 140: [Non-token Color/Size] group-hover:text-accent-brand - Class 'group-hover:text-accent-brand' uses a value that is not a recognized design token.
- [ ] Line 148: [Non-token Color/Size] group-hover:text-accent-brand - Class 'group-hover:text-accent-brand' uses a value that is not a recognized design token.
