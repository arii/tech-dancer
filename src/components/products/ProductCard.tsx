import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ASSET_PREFIX } from '@/config/constants';
import type { ProductCatalogItem } from '@/data/products/catalog';
import { cn } from '@/lib/utils';
import { stroke } from '@/styles/design-tokens';

export function ProductCard({ item }: { item: ProductCatalogItem }) {
  return (
    <Stack
      as="article"
      gap={4}
      height="full"
      padding={5}
      radius="lg"
      border
      maxWidth="sm"
      data-testid="product-card"
      className="group relative bg-surface transition-all duration-300 hover:bg-surface/80 hover:border-accent/30 hover:-translate-y-0.5"
    >
      <Box
        as="a"
        href={item.href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        aria-label={`Buy ${item.title} on storefront`}
        className="absolute inset-0 z-10"
      />

      <Box
        position="relative"
        display="flex"
        align="center"
        justify="center"
        height={{ base: 72, md: 80 }}
        overflow="hidden"
        radius="lg"
        className="bg-surface-alt/35"
      >
        <Box
          as="img"
          src={item.imageUrl.startsWith('http') ? item.imageUrl : `${ASSET_PREFIX}${item.imageUrl}`}
          alt={item.title}
          maxWidth="full"
          maxHeight="full"
          padding={4}
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />

      </Box>

      <Stack gap={3}>
        <Text as="h3" variant="body" size="lg" weight="font-bold" color="main" leading="tight" clamp={2} className="group-hover:text-accent transition-colors">
          {item.title}
        </Text>

        <Text variant="body" size="sm" color="dim" leading="relaxed" clamp={3}>
          {item.description}
        </Text>

        {item.roles && (
          <Stack direction="row" gap={1.5} wrap="wrap">
            {item.roles.map((role) => (
              <Box
                key={role}
                paddingX={2}
                paddingY={0.5}
                radius="md"
                surface={role === 'lead' ? 'accent' : role === 'follow' ? 'warning' : role === 'switch' ? 'alt' : 'default'}
                bgOpacity={10}
                className={cn(
                  "border border-line/30",
                  role === 'lead' ? "text-accent" : role === 'follow' ? "text-warning" : role === 'switch' ? "text-text-main" : "text-text-dim"
                )}
              >
                <Text size="micro" weight="font-bold" uppercase tracking="wider">
                  {role}
                </Text>
              </Box>
            ))}
          </Stack>
        )}
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
    </Stack>
  );
}
