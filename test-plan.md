1. Use React `useState` to track which half is hovered (`'dancer'`, `'roboticist'`, or `null`).
2. Update the background divs:
   - Make them colored by default (remove `from-neutral-800/40`, start with `from-accent/30`).
   - If the other half is hovered, apply `grayscale opacity-60`.
3. Update the scanline divs:
   - Conditionally add the `animate-scanline` class ONLY when the current half is hovered, so the animation starts from the beginning upon hover.
