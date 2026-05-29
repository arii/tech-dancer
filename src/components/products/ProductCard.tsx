import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { BaseCard } from '@/components/ui/BaseCard';
import { MerchImageDisplay } from '@/components/products/MerchImageDisplay';
import type { ProductCatalogItem } from '@/data/products/catalog';
import { cn } from '@/lib/utils';
import { stroke } from '@/styles/design-tokens';

export function ProductCard({ item }: { item: ProductCatalogItem }) {
  // Use "SEE OPTIONS" if there might be multiple configurations, otherwise "VIEW ON PRINTFUL"
  const ctaText = item.imageDisplayMode === 'both-equal' || (item.images && item.images.length > 1)
    ? 'SEE OPTIONS'
    : 'VIEW ON PRINTFUL';

  return (
    <BaseCard
      gap={4}
      height="full"
      padding={{ base: 4, md: 5 }}
      radius="lg"
      border
      maxWidth="full"
      className="hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-glow"
      data-testid="product-card"
    >
      <MerchImageDisplay
        title={item.title}
        href={item.href}
        imageUrl={item.imageUrl}
        images={item.images}
        imageDisplayMode={item.imageDisplayMode}
      />

      <Stack gap={3}>
        <Text
          as="a"
          href={item.href}
          target="_blank"
          rel="sponsored noopener noreferrer"
          variant="body"
          size={{ base: 'lg', md: 'xl' }}
          weight="font-bold"
          color="main"
          leading="tight"
          clamp={2}
          className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {item.title}
        </Text>

        <Text variant="body" size="sm" color="dim" leading="relaxed" clamp={2}>
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

      <Stack marginTop="auto" paddingTop={3} border="t" gap={3} className="border-line/30">
        <Stack direction="row" gap={1.5} wrap="wrap">
          {item.tags.map((tag, index) => (
            <Box
              key={tag}
              paddingX={2}
              paddingY={0.5}
              radius="md"
              surface="alt"
              className={cn(
                "border border-line/20",
                index >= 2 && "hidden sm:block" // Limit to 2 tags on mobile
              )}
            >
              <Text variant="mono" size="xs" color="dim" uppercase tracking="tighter">
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
          gap={1}
          width="full"
          paddingY={3}
          radius="md"
          minHeight={11} // Spacing token 11 * 4 = 44px
          className="bg-accent hover:bg-accent-sky transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={`View ${item.title} on Printful`}
        >
          <Text variant="mono" size="sm" weight="font-bold" color="bg" tracking="wide">
            {ctaText}
          </Text>
          <ArrowRight className={cn('w-3 h-3 text-bg', stroke.thick)} aria-hidden="true" />
        </Stack>
      </Stack>
    </BaseCard>
  );
}
