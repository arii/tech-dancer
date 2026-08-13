import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Button, type TextProps, type BoxProps } from '@/layouts/Primitives';
import { BaseCard } from '@/components/ui/BaseCard';
import { MerchImageDisplay } from '@/components/products/MerchImageDisplay';
import type { ProductCatalogItem } from '@/data/products/catalog';
import { cn } from '@/lib/utils';
import { stroke } from '@/styles/design-tokens';
import { getImageUrl } from '@/utils/schema';
import { BASE_URL } from '@/config/constants';
import ProductJsonLd from '@/components/ProductJsonLd';

export const EDITORIAL_CLAMP = 0;
export const DEFAULT_CLAMP = 2;

export function ProductCard({
  item,
  isFeatured,
  clampTitle = isFeatured ? EDITORIAL_CLAMP : DEFAULT_CLAMP,
  clampDescription = isFeatured ? EDITORIAL_CLAMP : DEFAULT_CLAMP,
  className,
  ...props
}: {
  item: ProductCatalogItem;
  isFeatured?: boolean;
  clampTitle?: TextProps['clamp'];
  clampDescription?: TextProps['clamp'];
} & Omit<BoxProps, 'children'>) {
  // Use "SEE OPTIONS" if there might be multiple configurations, otherwise "VIEW ON PRINTFUL"
  const ctaText = item.imageDisplayMode === 'both-equal' || (item.images && item.images.length > 1)
    ? 'SEE OPTIONS'
    : 'VIEW ON PRINTFUL';

  const productItem = useMemo(() => {
    const parsedPrice = item.price ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : undefined;
    return {
      id: item.id,
      name: item.title,
      description: item.description,
      imageUrl: getImageUrl(item.imageUrl),
      url: item.href.startsWith('http') ? item.href : `${BASE_URL}${item.href}`,
      price: parsedPrice,
      currency: 'USD',
      inStock: true,
    };
  }, [item]);

  return (
    <BaseCard
      gap={isFeatured ? 5 : 4}
      height="full"
      padding={isFeatured ? { base: 5, md: 6 } : { base: 4, md: 5 }}
      radius="md"
      border
      maxWidth="full"
      className={cn(
        "hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-glow",
        isFeatured && "border-accent/20 bg-accent/5",
        className
      )}
      data-testid="product-card"
      {...props}
    >
      <ProductJsonLd item={productItem} />
      <MerchImageDisplay
        title={item.title}
        href={item.href}
        imageUrl={item.imageUrl}
        images={item.images}
        imageDisplayMode={item.imageDisplayMode}
        isFeatured={isFeatured}
      />

      <Stack gap={isFeatured ? 4 : 3}>
        <Text
          as="a"
          href={item.href}
          target="_blank"
          rel="sponsored noopener noreferrer"
          variant="body"
          size={isFeatured ? { base: 'xl', md: '2xl' } : { base: 'lg', md: 'xl' }}
          weight="font-bold"
          color="main"
          leading="tight"
          clamp={clampTitle}
          className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {item.title}
        </Text>

        <Text variant="body" size={isFeatured ? 'base' : 'sm'} color="dim" leading="relaxed" clamp={clampDescription}>
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

      <Stack marginTop="auto" paddingTop={isFeatured ? 5 : 3} border="t" gap={isFeatured ? 4 : 3} className="border-line/30">
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
