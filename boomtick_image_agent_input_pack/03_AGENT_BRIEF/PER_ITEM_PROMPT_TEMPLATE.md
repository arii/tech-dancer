# Per-item image prompt template

Use this template for each item after the real product reference image is available.

## Prompt

Using the provided real product reference image for `{ITEM_ID}`, recreate the product as a BoomTick.blog gear-card illustration.

Draw the exact product silhouette and identifying details from the reference image, then render it in the approved style shown in `00_STYLE_LOCK_APPROVED_EXAMPLES`.

Style requirements:
- wide 800x300 horizontal card image
- isolated product centered on light gray textured paper
- black and deep blue ballpoint pen contours
- light blue colored-pencil shading
- subtle cross-hatching following product form
- soft cast shadow
- sparse motion/function lines only if relevant
- preserve real product color only where visually important
- no large text labels
- no fake brand labels
- no cluttered background
- not vector art
- not procedural geometry

Output:
`04_OUTPUT_TARGET/public/assets/gear/{ITEM_ID}.jpg`

QA:
Add row to contact sheet with real reference on the left and final sketch on the right.
