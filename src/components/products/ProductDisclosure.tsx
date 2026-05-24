/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Text, Box } from '@/layouts/Primitives';
import { ProductSource } from '@/data/products/catalog';

interface ProductDisclosureProps {
  source: ProductSource;
}

export function getProductDisclosure(source: ProductSource) {
  if (source === 'affiliate') {
    return 'Some gear links may be affiliate links. BoomTick may earn a commission if you purchase through those links, at no extra cost to you.';
  }

  if (source === 'owned-merch') {
    return 'BoomTick merch links go to our Printful storefront. These are BoomTick-created products, not affiliate recommendations.';
  }

  return null;
}

export function ProductDisclosure({ source }: ProductDisclosureProps) {
  const text = getProductDisclosure(source);
  if (!text) return null;

  return (
    <Box paddingY={4} border="t" className="border-line/30">
      <Text variant="body" size="xs" color="dim" className="italic">
        {text}
      </Text>
    </Box>
  );
}
