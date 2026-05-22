# Resource, Gear, and Merch Audit

## File Inventory and Classifications

### Data Files
* `src/data/merch.ts` -> Renamed to `src/data/boomtickMerch.ts` (Classification: boomtickMerch)
* `src/data/affiliates.json` -> Converted to `src/data/affiliateGear.ts` (Classification: affiliateGear). All Printful/Boomtick links removed.

### Content Files
The following merch-specific files in `content/resources/` were duplicate catalogs of BoomTick Printful merch and have been DELETED:
* `2024-06-01-love-neon-follow-shirt.md`
* `2024-06-01-love-neon-lead-shirt.md`
* `2024-06-01-love-neon-switch-shirt.md`
* `2024-06-01-love-unisex-shirt.md`
* `2024-06-01-norcal-bear-tank.md`
* `2024-06-01-norcal-bestcal-tshirt.md`
* `2024-06-01-norcal-crop-top.md`
* `2024-06-01-norcal-gate-crop-hoodie.md`
* `2024-06-01-norcal-pride-bear-shirt.md`
* `2024-06-01-norcal-pride-gate-shirt.md`
* `2024-06-01-war-eagle-shirt.md`

### Components & Pages
* `src/pages/Merch.tsx`: Updated to use `boomtickMerch.ts`.
* `src/pages/Gear.tsx`: Updated to only show third-party affiliate gear.
* `src/pages/Resources.tsx`: Created as a centralized hub to link and preview content from Gear, Merch, and Events.
