# UI Anti-Pattern TODO List

This list is automatically generated from the audit report. Fix these anti-patterns to adhere to the project design system.

## src/features/MultiLineTest.tsx
- [ ] Line 1: [Unnecessary React Import] import React from 'react' - Unnecessary React import — React 17+ (AGENTS.md §4)
- [ ] Line 5: [div Layout] <div className="flex flex-col" - Avoid using <div> for layout. Use layout primitives from src/layouts/.
- [ ] Line 6: [Raw Layout/Spacing] flex - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 6: [Raw Layout/Spacing] flex-col - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 6: [Layout Suggestion] flex flex-col - Consider replacing 'flex flex-col' with <Stack direction="col">
- [ ] Line 7: [Inline Styles] style={{ - Inline styles are banned. Use design tokens (AGENTS.md §11)
- [ ] Line 9: [div Layout] <div className="grid grid-cols-1" - Avoid using <div> for layout. Use layout primitives from src/layouts/.
- [ ] Line 9: [Raw Layout/Spacing] grid - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 9: [Raw Layout/Spacing] grid-cols-1 - Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.
- [ ] Line 9: [Layout Suggestion] grid grid-cols - Consider replacing 'grid grid-cols' with <Grid cols={...}>
- [ ] Line 10: [Arbitrary Value] -[#ff0000] - Avoid arbitrary values like -[...]. Use design tokens instead.
