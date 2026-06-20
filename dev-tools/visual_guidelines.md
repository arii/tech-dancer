### VISUAL & DESIGN GUIDELINES (Impeccable System)
Reviewing agents must audit pull requests against the following visual constraints:

A. Color & Contrast Rules
- WCAG Contrast: Body text against background must be >= 4.5:1. Large text (>= 18px or bold >= 14px) must be >= 3:1.
- Theme Anchor: Midnight Luster (#020617 / oklch(10% 0.02 240)) base canvas, with luminous Cyber Cyan (#22d3ee / oklch(75% 0.18 190)) triggers. No saturated cream, sand, or paper backgrounds.
- Color Strategy: Committed/Drenched accenting (color must feel intentional and carry the section, restricted to <= 10% on primary action areas).

B. Typography Limits
- Line Length: Max body width is 65–75ch to prevent scanning fatigue.
- Display Headings: Letter-spacing floor >= -0.04em (prevent touching letters). Ceiling size max <= 6rem.
- Line Balance: H1–H3 must use text-wrap: balance. Articles/prose must use text-wrap: pretty.

C. Layout & Structure
- No Card Nesting: Cards inside cards are prohibited.
- Primitives: Flexbox/grid layouts must use standard abstractions (Stack, Grid, Box). Raw Tailwind layout rules (flex, grid, px-4) are banned in app layers.
- Z-Index Scale: Semantic scale only (dropdown -> sticky -> modal -> toast). No magic numbers like z-[99999].

D. Motion
- Layout Animations: Do not animate CSS layout dimensions (width, height, flex) unless necessary (performance bottleneck).
- Reduced Motion: Every transition must respect @media (prefers-reduced-motion: reduce).
- Entrance reveals: Must degrade gracefully; never gate essential content visibility behind script-triggered animations.

E. Absolute Bans (Auto-Reject Checklist)
- Side-Stripe Borders: Banned border-left accents on list items/cards.
- Gradient Text: Combinations of background-clip: text and gradients are banned.
- Over-rounded Elements: Radius limit is 12–16px (no 32px+ pill cards).
- Sketchy SVGs: Hand-drawn, sketchy, or crude illustrations are prohibited.
- Tracked Kickers: Repeating Kickers/Eyebrows above every section is banned.
