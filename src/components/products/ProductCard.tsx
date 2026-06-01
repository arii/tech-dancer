import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { BaseCard } from '@/components/ui/BaseCard';
import { MerchImageDisplay } from '@/components/products/MerchImageDisplay';
import type { ProductCatalogItem } from '@/data/products/catalog';
import { cn } from '@/lib/utils';
import { stroke } from '@/styles/design-tokens';

function getRoleBadgeStyles(role: string) {
  switch (role) {
    case 'lead':
      return 'bg-accent/10 text-accent';
    case 'follow':
      return 'bg-purple-400/10 text-purple-400';
    case 'switch':
      return 'bg-emerald-400/10 text-emerald-400';
    default:
      return 'bg-surface-alt text-text-dim';
  }
}

export function ProductCard({ item }: { item: ProductCatalogItem }) {
  return (
    <BaseCard
      as="article"
      gap={5}
      height="full"
      padding={4}
      radius="3xl"
      border
      maxWidth="full"
      surface="card"
      className="shadow-sm hover:border-slate-700 transition-colors"
      data-testid="product-card"
    >
      <MerchImageDisplay
        title={item.title}
        href={item.href}
        imageUrl={item.imageUrl}
        images={item.images}
        imageDisplayMode={item.imageDisplayMode}
      />

      <Stack gap={4}>
        <Stack gap={1}>
          <Text
            as="a"
            href={item.href}
            target="_blank"
            rel="sponsored noopener noreferrer"
            variant="body"
            size="lg"
            weight="font-bold"
            color="main"
            leading="tight"
            className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Box as="h3" display="inline">
              {item.title}
            </Box>
          </Text>

          <Text variant="body" size="sm" color="dim" leading="relaxed" clamp={2}>
            {item.description}
          </Text>
        </Stack>

        {item.roles && (
          <Stack direction="row" gap={2} wrap="wrap">
            {item.roles.map((role) => (
              <Box
                key={role}
                paddingX={3}
                paddingY={1}
                radius="full"
                className={cn("font-semibold uppercase tracking-wide", getRoleBadgeStyles(role))}
              >
                <Text size="micro" weight="font-bold" color="inherit">
                  {role}
                </Text>
              </Box>
            ))}
          </Stack>
        )}

        <Stack direction="row" gap={2} wrap="wrap">
          {item.tags.slice(0, 3).map((tag) => (
            <Box
              key={tag}
              paddingX={2.5}
              paddingY={1}
              radius="full"
              surface="alt"
            >
              <Text size="micro" weight="font-bold" color="dim" uppercase tracking="wide">
                {tag}
              </Text>
            </Box>
          ))}
        </Stack>

        <Stack
          as="a"
          href={item.href}
          target="_blank"
          rel="sponsored noopener noreferrer"
          direction="row"
          align="center"
          justify="center"
          gap={2}
          width="full"
          paddingY={3}
          radius="xl"
          className="bg-accent hover:opacity-90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={`See Printful options for ${item.title}`}
        >
          <Text variant="mono" size="sm" weight="font-bold" color="bg" tracking="widest" className="uppercase">
            See options
            <span className="sr-only"> Opens in Printful storefront</span>
          </Text>
          <ArrowRight className={cn('w-4 h-4 text-bg', stroke.thick)} aria-hidden="true" />
        </Stack>
      </Stack>
    </BaseCard>
  );
}
