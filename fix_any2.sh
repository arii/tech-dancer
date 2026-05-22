# Fix 'any' types in ResourceCard.tsx
sed -i 's/as={Component as any}/as={Component as React.ElementType}/g' src/components/resources/ResourceCard.tsx
sed -i '1i import React from "react";' src/components/resources/ResourceCard.tsx

# Fix 'any' types in Resources.tsx
sed -i 's/const formatMerchItem = (item: any)/const formatMerchItem = (item: BoomTickMerchItem)/g' src/pages/Resources.tsx
sed -i 's/const formatGearItem = (item: any)/const formatGearItem = (item: AffiliateGearItem)/g' src/pages/Resources.tsx
sed -i 's/const formatPostItem = (item: any)/const formatPostItem = (item: Post)/g' src/pages/Resources.tsx
sed -i 's/const formatEventItem = (item: any)/const formatEventItem = (item: Event)/g' src/pages/Resources.tsx
sed -i 's/import { BOOMTICK_MERCH_PRODUCTS }/import { BoomTickMerchItem, AffiliateGearItem } from "@\/lib\/types\/resources";\nimport { Post, Event } from "@\/lib\/types\/content";\nimport { BOOMTICK_MERCH_PRODUCTS }/g' src/pages/Resources.tsx

# Fix 'any' types in Gear.tsx
sed -i 's/const formatGearItem = (item: any)/const formatGearItem = (item: AffiliateGearItem)/g' src/pages/Gear.tsx
sed -i 's/import { AFFILIATE_GEAR }/import { AffiliateGearItem } from "@\/lib\/types\/resources";\nimport { AFFILIATE_GEAR }/g' src/pages/Gear.tsx
