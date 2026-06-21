import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import type { ResponsiveProp } from '@/layouts/system-utils';
import { BaseCard } from '@/components/ui/BaseCard';
import { MerchImageDisplay } from '@/components/products/MerchImageDisplay';
import type { ProductCatalogItem } from '@/data/products/catalog';
import { cn } from '@/lib/utils';
import { stroke } from '@/styles/design-tokens';

export type ProductCardVariant = 'default' | 'featured' | 'stretched';

interface ProductCardProps {
  item: ProductCatalogItem;
  /**
   * Layout variant of the card.
   * - 'default': Standard grid card with 2-line clamping.
   * - 'featured': Prominent card with no clamping and larger image.
   * - 'stretched': Card that fills vertical space and removes clamping on desktop.
   */
  variant?: ProductCardVariant;
  /** @deprecated use variant="featured" */
  isFeatured?: boolean;
  /** @deprecated use variant="stretched" */
  fillHeight?: boolean;
  imageHeight?: ResponsiveProp<string | number>;
  clampTitle?: ResponsiveProp<number | boolean>;
  clampDescription?: ResponsiveProp<number | boolean>;
}

const VARIANT_CONFIG = {
  featured: {
    clamp: 0,
    imageHeight: { base: 64, sm: 72, md: 96 },
    padding: { base: 5, md: 6 },
    gap: 5,
    contentGap: 4,
    titleSize: { base: 'xl', md: '2xl' } as const,
    descSize: 'base' as const,
    footerPaddingTop: 5,
    footerGap: 4,
    highlight: true,
  },
  stretched: {
    clamp: { base: 2, md: 0 },
    imageHeight: { base: 64, sm: 72, md: 96 },
    padding: { base: 4, md: 5 },
    gap: 4,
    contentGap: 3,
    titleSize: { base: 'lg', md: 'xl' } as const,
    descSize: 'sm' as const,
    footerPaddingTop: 3,
    footerGap: 3,
    highlight: false,
  },
  default: {
    clamp: 2,
    imageHeight: { base: 64, sm: 72, md: 64 },
    padding: { base: 4, md: 5 },
    gap: 4,
    contentGap: 3,
    titleSize: { base: 'lg', md: 'xl' } as const,
    descSize: 'sm' as const,
    footerPaddingTop: 3,
    footerGap: 3,
    highlight: false,
  },
};

export function ProductCard({
  item,
  variant: variantProp,
  isFeatured,
  fillHeight,
  imageHeight,
  clampTitle,
  clampDescription,
}: ProductCardProps) {
  // Resolve variant with backward compatibility
  const variant = variantProp ?? (isFeatured ? 'featured' : (fillHeight ? 'stretched' : 'default'));
  const config = VARIANT_CONFIG[variant];

  const finalClampTitle = clampTitle ?? config.clamp;
  const finalClampDescription = clampDescription ?? config.clamp;
  const finalImageHeight = imageHeight ?? config.imageHeight;

  // Use "SEE OPTIONS" if there might be multiple configurations, otherwise "VIEW ON PRINTFUL"
  const ctaText = item.imageDisplayMode === 'both-equal' || (item.images && item.images.length > 1)
    ? 'SEE OPTIONS'
    : 'VIEW ON PRINTFUL';

  return (
    <BaseCard
      gap={config.gap}
      height="full"
      padding={config.padding}
      radius="lg"
      border
      maxWidth="full"
      className={cn(
        "hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-glow",
        config.highlight && "border-accent/20 bg-accent/5"
      )}
      data-testid="product-card"
    >
      <MerchImageDisplay
        title={item.title}
        href={item.href}
        imageUrl={item.imageUrl}
        images={item.images}
        imageDisplayMode={item.imageDisplayMode}
        height={finalImageHeight}
      />

      <Stack gap={config.contentGap}>
        <Text
          as="a"
          href={item.href}
          target="_blank"
          rel="sponsored noopener noreferrer"
          variant="body"
          size={config.titleSize}
          weight="font-bold"
          color="main"
          leading="tight"
          clamp={finalClampTitle}
          className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {item.title}
        </Text>

        <Text variant="body" size={config.descSize} color="dim" leading="relaxed" clamp={finalClampDescription}>
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

      <Stack marginTop="auto" paddingTop={config.footerPaddingTop} border="t" gap={config.footerGap} className="border-line/30">
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
