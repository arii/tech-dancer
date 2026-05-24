# Resource, Gear, and Merch Audit

## File Inventory

### Pages
- `src/pages/Gear.tsx`: Currently hosts the "Toolbox" (Gear Reviews).
- `src/pages/Merch.tsx`: Currently hosts the Printful storefront.
- `src/pages/Resources.tsx`: **Missing**. Needs to be created as the main hub.

### Data
- `src/data/affiliates.json`: Contains both external affiliate products and some BoomTick merch.
- `src/data/merch.ts`: Contains BoomTick merch products.
- `content/resources/*.md`: Contains a mix of editorial resources and duplicates of BoomTick merch products.

### Components
- `src/components/ui/GearCard.tsx`: Used for gear reviews and affiliate links.
- `src/pages/Merch.tsx` (Internal `ProductCard`): Used for merch products.

## Classification

| Item | Type | Source | Target Path |
|------|------|--------|-------------|
| Loop Earplugs | affiliateGear | `affiliates.json` | `/gear` |
| Bloch Grecian Sandal | affiliateGear | `affiliates.json` | `/gear` |
| LOVE Neon T-Shirt | boomtickMerch | `merch.ts` / `content/resources` | `/merch` |
| NorCal BestCal Tee | boomtickMerch | `merch.ts` / `content/resources` | `/merch` |
| Suede Shoe DIY | resource | `content/resources` | `/resources` |

## Duplication Issues
- Merch items exist in `src/data/merch.ts`, `src/data/affiliates.json`, AND `content/resources/*.md`.
- `GearCard` and `ProductCard` have similar but slightly different implementations.

## Migration Plan
1. Create `src/pages/Resources.tsx` as a hub.
2. Clean `src/data/affiliates.json`: Remove all `boomtick.printful.me` links.
3. Clean `content/resources/`: Remove markdown files that are purely merch products (unless they are actual reviews).
4. Update `src/data/merch.ts` to be the single source of truth for BoomTick merch.
5. Update `GearCard.tsx` or create `ResourceCard.tsx` to handle all types with appropriate disclosures.
