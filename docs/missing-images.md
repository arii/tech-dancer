# Missing Product Images - Gear Resources

**Status:** 8 items drafted pending correct product images  
**Last Updated:** 2026-05-26  
**Priority:** High (blocks item activation on `/gear` page)

---

## Items Requiring Images

| # | Affiliate ID | Product Name | Category | Description | Current Issue | Amazon Search |
|---|---|---|---|---|---|---|
| 1 | `foam-roller` | Foam Roller / Hypervolt | recovery | Good for sore legs, tight hips, and post-event recovery. | Has packing cubes image (wrong) | Foam Roller OR Hypervolt massage device |
| 2 | `shoe-brush` | Suede Shoe Brush | gear | Keep your suede soles clean and grippy. | Has suede adhesive sheets image (wrong) | Suede shoe brush OR suede sole cleaner |
| 3 | `portable-charger` | Anker Portable Power Bank | travel | High-capacity charger to keep your phone alive during long event days. | Has neck fan image (wrong) | Anker power bank OR portable charger 20000mAh |
| 4 | `portable-steamer` | Portable Garment Steamer | travel | Keep your event outfits wrinkle-free with this compact steamer. | Duplicate of garment-steamer affiliate | Portable garment steamer OR handheld steam press |
| 5 | `hand-sanitizer` | Purell Advanced Hand Sanitizer | travel | Stay healthy while dancing with hundreds of people. | No image (toiletry bag placeholder) | Purell Advanced Hand Sanitizer OR hand sanitizer pump bottle |
| 6 | `rainbow-fan` | Rainbow Folding Fan | gear | Show your pride while staying cool. | Has holographic rave fan image (wrong) | Rainbow folding fan OR pride folding fan |
| 7 | `electric-fan` | Handheld Mini Fan | gear | A life-saver on a crowded, hot dance floor. | Has neck fan image (wrong) | Handheld mini fan OR portable electric fan |
| 8 | `mints` | Altoids Peppermint Mints | travel | Essential for social dancing confidence. | Has Listerine tabs image (wrong) | Altoids Peppermint Mints OR Altoids original peppermint |

---

## How to Fix

### For Each Item:

1. **Search Amazon** using the provided search term
2. **Download product image** (PNG or JPG, ideally 640x360px)
3. **Save to** `public/images/gear/amazon/` with descriptive filename
4. **Update** `src/data/affiliates.json`:
   - Change `image` property to new filename
   - Remove `draft: true` flag
5. **Verify** on `http://localhost:3000/gear` page
6. **Commit** changes

### Example Update in affiliates.json:

```json
{
  "foam-roller": {
    "name": "Foam Roller / Hypervolt",
    "category": "recovery",
    "description": "Good for sore legs, tight hips, and post-event recovery.",
    "url": "https://amazon.com/...",
    "image": "foam-roller-hypervolt-product.jpg",
    "draft": false
  }
}
```

---

## Priority Levels

### 🔴 Critical (Wrong Image Categories)
- Foam Roller (packing cubes → needs massage equipment)
- Portable Charger (fan → needs power bank)
- Rainbow Fan (rave fan → needs rainbow fan)
- Hand Sanitizer (toiletry → needs sanitizer bottle)

### 🟠 High (Tool/Equipment)
- Suede Shoe Brush (adhesive sheets → needs brush tool)
- Handheld Mini Fan (neck fan → needs palm fan)
- Altoids Mints (Listerine → needs mints tin)

### 🟡 Medium (Duplicate)
- Portable Steamer (duplicate of garment-steamer - consider consolidation)

---

## Reference: Correct Images (Kept Active)

| Affiliate ID | Product | Image | Status |
|---|---|---|---|
| `travel-bottles` | Leak-Proof Travel Bottles | leak-proof-refillable-silicone-travel-bottles-3oz-travel-size-containe.png | ✅ Active |
| `rave-fan` | Rave Folding Fan | zolee-large-rave-folding-hand-fan-with-bamboo-ribs-for-men-women-chine.png | ✅ Active |
| `neck-fan` | Neck Fan | ushake-slim-running-belt-ultra-light-bounce-free-waist-pouch-fitness-w.jpeg | ✅ Active |
| `garment-steamer` | Garment Steamer | travel-steamer.jpg | ✅ Active |
| `compression-cubes` | Compression Cubes | packing-cubes.jpg | ✅ Active |
| `listerine-tabs` | Listerine Tabs | listerine.jpg | ✅ Active |
| `suede-sheets` | Suede Sheets | suede-sheets.jpg | ✅ Active |

---

## Related PRs & Issues

- PR #1566: Gear images audit and duplicate cleanup
- Database: `image_duplicates` table tracks all 8 items
- Session artifacts: `missing_images_lookup.md`

---

## Notes

- Images should be sourced from official Amazon product pages
- Prefer PNG/JPG format, ~640x360px aspect ratio (video preview size)
- File naming: use descriptive product name (lowercase, hyphens, no spaces)
- After updating, run `pnpm run audit` to verify no new antipatterns
- Consider removing `portable-steamer` entirely if confirmed duplicate
