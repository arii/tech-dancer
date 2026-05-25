import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { BaseCard } from '@/components/ui/BaseCard';
import { ASSET_PREFIX } from '@/config/constants';
import type { ProductCatalogItem } from '@/data/products/catalog';
import { cn } from '@/lib/utils';
import { stroke } from '@/styles/design-tokens';

export function ProductCard({ item }: { item: ProductCatalogItem }) {
  return (
    <BaseCard
      as="article"
      href={item.href}
      isExternal
      ariaLabel={`Buy ${item.title} on storefront`}
      gap={4}
      height="full"
      padding={5}
      data-testid="product-card"
    >

      <Box
        position="relative"
        aspect="video"
        maxHeight={{ base: 56, lg: 72 }}
        overflow="hidden"
        radius="md"
        className="bg-surface-alt/35"
      >
        <Box
          as="img"
          src={item.imageUrl.startsWith('http') ? item.imageUrl : `${ASSET_PREFIX}${item.imageUrl}`}
          alt={item.title}
          width="full"
          height="full"
          padding={4}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        {item.price ? (
          <Box position="absolute" top={3} right={3} paddingX={2} paddingY={1} radius="full" opacity={80} className="bg-accent text-white backdrop-blur-md shadow-sm">
            <Text variant="mono" size="micro" weight="font-black" uppercase tracking="wide">
              {item.price.includes('$') ? item.price : `$${item.price}`}
            </Text>
          </Box>
        ) : null}

        {item.roles && (
          <Box position="absolute" bottom={3} left={3}>
            <Stack direction="row" gap={1}>
              {item.roles.map((role) => (
                <Box
                  key={role}
                  paddingX={2}
                  paddingY={0.5}
                  radius="full"
                  surface={role === 'lead' ? 'accent' : role === 'follow' ? 'warning' : role === 'switch' ? 'alt' : 'default'}
                  bgOpacity={80}
                  className="font-mono font-bold uppercase tracking-wider backdrop-blur-md"
                >
                  <Text size="micro" as="span" inherit>
                    {role}
                  </Text>
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Box>

      <Stack gap={2}>
        <Text as="h3" variant="body" size="lg" weight="font-bold" color="main" leading="tight" clamp={2} className="group-hover:text-accent transition-colors">
          {item.title}
        </Text>

        <Text variant="body" size="sm" color="dim" leading="relaxed" clamp={3}>
          {item.description}
        </Text>
      </Stack>

      <Box display="flex" align="center" justify="between" marginTop="auto" paddingTop={3} border="t" className="border-line/30">
        <Stack direction="row" gap={2} wrap="wrap">
          {item.tags.slice(0, 2).map((tag) => (
            <Text key={tag} variant="mono" size="micro" color="dim" uppercase tracking="tighter" className="opacity-60">
              {tag}
            </Text>
          ))}
        </Stack>
        <Box display="flex" align="center" gap={1}>
          <Text variant="mono" size="sm" weight="font-bold" color="accent" tracking="wide">
            SEE COLORS
          </Text>
          <ArrowRight className={cn('w-3 h-3 text-accent', stroke.thick)} />
        </Box>
      </Box>
    </BaseCard>
  );
}
