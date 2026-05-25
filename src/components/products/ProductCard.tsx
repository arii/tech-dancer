/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ASSET_PREFIX } from '@/config/constants';
import { ProductCatalogItem } from '@/data/products/catalog';
import { cn } from '@/lib/utils';

export type ProductCardVariant = 'full' | 'compact' | 'event' | 'resource-preview';

interface ProductCardProps {
  product: ProductCatalogItem;
  variant?: ProductCardVariant;
}

export function ProductCard({ product, variant = 'full' }: ProductCardProps) {
  const isCompact = variant === 'compact' || variant === 'resource-preview';

  return (
    <Stack
      as="article"
      gap={isCompact ? 3 : 4}
      height="full"
      padding={isCompact ? 4 : 5}
      radius="lg"
      border
      data-testid="product-card"
      className={cn(
        "group relative bg-surface transition-all duration-300 hover:bg-surface/80 hover:border-accent/30 hover:-translate-y-0.5",
        variant === 'resource-preview' && "border-line/50"
      )}
    >
      {product.href.startsWith('/') ? (
        <Box
          as={NavLink}
          to={product.href}
          aria-label={`View ${product.title}`}
          className="absolute inset-0 z-10"
        />
      ) : (
        <Box
          as="a"
          href={product.href}
          target="_blank"
          rel="sponsored noopener noreferrer"
          aria-label={`Buy ${product.title}`}
          className="absolute inset-0 z-10"
        />
      )}

      {/* Image zone */}
      <Box
        position="relative"
        aspect="video"
        maxHeight={isCompact ? { base: 40, lg: 48 } : { base: 56, lg: 72 }}
        overflow="hidden"
        radius="md"
        className="bg-surface-alt/35"
      >
        <Box
          as="img"
          src={product.imageUrl.startsWith('http') || product.imageUrl.startsWith(ASSET_PREFIX) ? product.imageUrl : `${ASSET_PREFIX}${product.imageUrl}`}
          alt={product.title}
          width="full"
          height="full"
          padding={isCompact ? 2 : 4}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {/* Price badge */}
        {product.price && (
          <Box
            position="absolute"
            top={3}
            right={3}
            paddingX={2}
            paddingY={1}
            radius="full"
            opacity={80}
            className="bg-accent text-white backdrop-blur-md shadow-sm"
          >
            <Text variant="mono" size="micro" weight="font-black" uppercase tracking="wide">
              {product.price.includes('$') ? product.price : `$${product.price}`}
            </Text>
          </Box>
        )}

        {product.roles && product.roles.length > 0 && (
          <Box position="absolute" bottom={3} left={3}>
            <Stack direction="row" gap={1}>
              {product.roles.map((role) => (
                <Box
                  key={role}
                  paddingX={2}
                  paddingY={0.5}
                  radius="full"
                  surface={
                    role === 'lead' ? 'accent' :
                    role === 'follow' ? 'warning' :
                    role === 'switch' ? 'alt' : 'default'
                  }
                  className="bg-opacity-80 font-mono font-bold uppercase tracking-wider backdrop-blur-md"
                >
                  <Text size="micro" as="span">
                    {role}
                  </Text>
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Box>

      <Stack gap={2}>
        <Text
          as="h3"
          variant="body"
          size={isCompact ? "base" : "lg"}
          weight="font-bold"
          color="main"
          leading="tight"
          clamp={2}
          className="group-hover:text-accent transition-colors"
        >
          {product.title}
        </Text>

        {!isCompact && (
          <Text variant="body" size="sm" color="dim" leading="relaxed" clamp={3}>
            {product.description}
          </Text>
        )}
      </Stack>

      <Box display="flex" align="center" justify="between" marginTop="auto" paddingTop={3} border="t" className="border-line/30">
        <Stack direction="row" gap={2} wrap="wrap">
          {product.tags.slice(0, 2).map((tag) => (
            <Text key={tag} variant="mono" size="micro" color="dim" uppercase tracking="tighter" className="opacity-60">
              {tag}
            </Text>
          ))}
        </Stack>
        <Box display="flex" align="center" gap={1}>
          <Text variant="mono" size={isCompact ? "micro" : "sm"} weight="font-bold" color="accent" tracking="wide">
            {product.source === 'owned-merch' ? 'SEE COLORS' : 'VIEW GEAR'}
          </Text>
          <ArrowRight className="w-3 h-3 text-accent" />
        </Box>
      </Box>
    </Stack>
  );
}
