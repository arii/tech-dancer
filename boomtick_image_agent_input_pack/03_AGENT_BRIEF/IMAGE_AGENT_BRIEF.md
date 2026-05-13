# BoomTick Gear Artwork Image-Agent Brief

## Objective

Create final gear-card artwork for BoomTick.blog affiliate/resource cards.

Each final asset must be a **real-reference-informed hand-drawn product sketch**, not a generic icon, procedural drawing, or text-only interpretation.

Final output path:

```txt
public/assets/gear/{item-id}.jpg
```

Final image size:

```txt
800x300 JPG
```

## Source of truth order

Use inputs in this order:

1. `00_STYLE_LOCK_APPROVED_EXAMPLES/`
   - This defines the visual style.
   - Match these examples first.
2. `01_REAL_REFERENCES_READY/`
   - These are direct product-image references or local approved references.
   - Items here are ready for sketch generation.
3. `02_NEEDS_DIRECT_IMAGE_EXTRACTION/`
   - Items here are **not ready**.
   - First obtain a real product image and save it into `01_REAL_REFERENCES_READY/{item-id}.jpg`.

Do not generate final artwork from item descriptions alone.

## Approved visual style

The approved BoomTick gear-card style has these traits:

- Wide horizontal card crop, approximately 800x300.
- Product isolated on a light gray, lightly textured paper background.
- Product silhouette clearly based on the real reference image.
- Black / dark navy ballpoint-style contour lines.
- Light blue ballpoint or colored-pencil shading.
- Organic hand pressure: imperfect, sketchy, not vector-clean.
- Cross-hatching follows the form and shadow, not random noise.
- Sparse whimsical function marks only when useful:
  - speaker: sound waves
  - steamer: steam puffs
  - earplugs: sound dampening/acoustic marks
  - fan: airflow marks
- Soft cast shadow under the product.
- Product color preserved only where important:
  - UE speaker red/blue
  - blue steamer
  - Loop earplugs light blue/silver
  - rainbow items should use restrained rainbow color, not neon overload.
- No large text labels inside the image.
- No cluttered lifestyle background.

## Hard rejection criteria

Reject and regenerate if the output:

- Looks like a flat vector icon.
- Looks like procedural geometry or primitive shapes.
- Ignores the real product silhouette.
- Uses a noisy paper background.
- Uses heavy purple/earthy/neon palette instead of the approved blue/gray card style.
- Includes large readable brand text or fake labels.
- Is square instead of wide card format.
- Contains multiple unrelated objects unless the real product is a set.
- Is generated from the description without a real product image reference.

## Per-item workflow

For each `item-id`:

1. Confirm there is a real reference image:
   - `01_REAL_REFERENCES_READY/{item-id}.jpg`, or
   - a direct image URL in `{item-id}.reference-url.txt`.
2. If only a URL exists, download/save it as:
   - `01_REAL_REFERENCES_READY/{item-id}.jpg`
3. Study the real product:
   - silhouette
   - proportions
   - handles/straps/buttons/nozzles
   - material texture
   - color accents
   - shadows and perspective
4. Redraw it in the approved sketch style.
5. Save final output:
   - `04_OUTPUT_TARGET/public/assets/gear/{item-id}.jpg`
6. Add it to the QA contact sheet:
   - real reference image on the left
   - final sketch output on the right

## Required QA contact sheet

Create:

```txt
05_QA_CONTACT_SHEET_REQUIRED/gear-artwork-qa-contact-sheet.jpg
```

Contact sheet columns:

```txt
Item ID | Real reference image | Sketch output | QA status/notes
```

Do not mark an item complete unless the reference column shows a real product image, not a generated placeholder.

## Ready items

The first ready batch is listed in:

```txt
01_REAL_REFERENCES_READY/ready-direct-image-items.csv
```

Generate those first.

## Items needing image extraction

Do not sketch these yet. First collect real product images:

```txt
02_NEEDS_DIRECT_IMAGE_EXTRACTION/needs-direct-image-extraction.csv
```

## Final deliverables

The final completed pack must contain:

```txt
public/assets/gear/{item-id}.jpg
references/{item-id}.jpg
gear-artwork-qa-contact-sheet.jpg
image-agent-completion-manifest.json
```

The completion manifest should include:

```json
{
  "item_id": "...",
  "reference_image": "references/{item-id}.jpg",
  "final_output": "public/assets/gear/{item-id}.jpg",
  "status": "complete | needs-regeneration | blocked",
  "qa_notes": "..."
}
```
