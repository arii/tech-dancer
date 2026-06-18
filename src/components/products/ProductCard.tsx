import { Package } from 'lucide-react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { BaseCard } from '@/components/ui/BaseCard';
import { MerchImageDisplay } from '@/components/products/MerchImageDisplay';
import type { ProductCatalogItem } from '@/data/products/catalog';
import { cn } from '@/lib/utils';
import { stroke } from '@/styles/design-tokens';

export function ProductCard({ item, isFeatured }: { item: ProductCatalogItem; isFeatured?: boolean }) {
  // Use "SEE OPTIONS" if there might be multiple configurations, otherwise "VIEW ON PRINTFUL"
  const ctaText = item.imageDisplayMode === 'both-equal' || (item.images && item.images.length > 1)
    ? 'SEE OPTIONS'
    : 'VIEW ON PRINTFUL';

  const cardPadding = isFeatured ? { base: 5, md: 8 } : { base: 5, md: 6 };
  const cardGap = isFeatured ? 6 : 5;
  const titleSize = isFeatured ? { base: 'xl', md: '2xl' } : { base: 'lg', md: 'xl' };
  const descSize = isFeatured ? 'base' : 'sm';
  const descClamp = isFeatured ? 0 : 2;

  return (
    <BaseCard
      gap={cardGap}
      height="full"
      padding={cardPadding}
      radius="lg"
      border
      maxWidth="full"
      className={cn(
        "hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-glow",
        isFeatured && "border-accent/20 bg-accent/5"
      )}
      data-testid="product-card"
    >
      <Box position="relative">
        <MerchImageDisplay
          title={item.title}
          href={item.href}
          imageUrl={item.imageUrl}
          images={item.images}
          imageDisplayMode={item.imageDisplayMode}
          isFeatured={isFeatured}
        />
        {item.isBundle && (
          <Stack
            direction="row"
            align="center"
            gap={1.5}
            position="absolute"
            top={3}
            right={3}
            paddingX={2}
            paddingY={1}
            radius="md"
            surface="accent"
            zIndex={10}
            className="text-white shadow-lg"
            data-testid="bundle-badge"
          >
            <Package className="w-3.5 h-3.5" />
            <Text variant="mono" size="micro" weight="font-bold" uppercase tracking="widest">
              Bundle
            </Text>
          </Stack>
        )}
      </Box>

      <Stack gap={isFeatured ? 5 : 4}>
        <Stack gap={1.5}>
          <Text
            as="a"
            href={item.href}
            target="_blank"
            rel="sponsored noopener noreferrer"
            variant="body"
            size={titleSize}
            weight="font-bold"
            color="main"
            leading="tight"
            clamp={descClamp}
            className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {item.title}
          </Text>

        </Stack>

        <Stack gap={1}>
          <Text variant="body" size={descSize} color="dim" leading="relaxed" clamp={descClamp}>
            {item.description}
          </Text>

          {item.isBundle && item.bundleNote && (
            <Text variant="body" size="xs" color="dim">
              {item.bundleNote}
            </Text>
          )}
        </Stack>

        {item.roles && (
          <Stack direction="row" gap={1.5} wrap="wrap">
            {item.roles.map((role) => (
              <Box
                key={role}
                paddingX={2}
                paddingY={0.5}
                radius="md"
                surface={role === 'lead' ? 'accent' : role === 'follow' ? 'warning' : role === 'switch' ? 'alt' : 'default'}
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

      <Stack marginTop="auto" paddingTop={isFeatured ? 4 : 3} border="t" gap={isFeatured ? 3 : 2} className="border-line/30">
        <Stack direction="row" gap={1.5} wrap="wrap">
          {item.tags.slice(0, 3).map((tag) => (
            <Box key={tag} paddingX={2} paddingY={0.5} radius="md" surface="alt" className="border border-line/20">
              <Text variant="mono" size="xs" color="dim" uppercase tracking="tighter">
                {tag}
              </Text>
            </Box>
          ))}
        </Stack>
        <Button
          as="a"
          href={item.href}
          target="_blank"
          rel="sponsored noopener noreferrer"
          variant="primary"
          fullWidth
          gap={1.5}
          aria-label={`View ${item.title} on Printful`}
        >
          {ctaText}
          <ArrowRight className={cn('w-3.5 h-3.5 text-current', stroke.thick)} aria-hidden="true" />
        </Button>
      </Stack>
    </BaseCard>
  );
}
