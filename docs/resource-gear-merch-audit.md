# Resource / Gear / Merch Audit

| Path | Current Purpose | Classification | Keep? | Duplicate Risk | Migration Target |
|---|---|---|---|---|---|
| `src/pages/Resources.tsx` | New resource hub page with previews/disclosures | resource | Yes | Low | Keep as discovery hub |
| `src/pages/Gear.tsx` | Gear landing page wrapper for toolbox content | affiliateGear | Yes | Medium | Keep for affiliate recommendations only |
| `src/features/lab/Toolbox.tsx` | Renders gear review/recommendation cards from resource markdown | affiliateGear | Yes | Medium | Keep, remove merch-like records from feed |
| `src/pages/Merch.tsx` | Printful storefront presentation | boomtickMerch | Yes | Low | Keep as dedicated merch catalog |
| `src/data/merch.ts` | BoomTick Printful products | boomtickMerch | Yes | Low | Keep and evolve to `boomtickMerch.ts` model |
| `src/data/affiliates.json` | Affiliate/outbound product link registry | affiliateGear + duplicate | Yes (cleanup) | High | Remove `boomtick.printful.me` entries from affiliate registry |
| `content/resources/*.md` | Resource/gear markdown cards used by Gear page | mixed | Yes (cleanup) | High | Split into affiliate gear vs merch references |
| `src/lib/affiliateManager.ts` | Affiliate link resolution and tracking | affiliateGear | Yes | Low | Keep for affiliate only |

## Immediate Cleanup Notes

1. Remove Printful URLs from affiliate registries and affiliate metadata.
2. Keep affiliate disclosures only on gear/recommendation contexts.
3. Keep merch store notice only on merch contexts.
4. Keep Resources as preview/index sections, not duplicated full grids.
