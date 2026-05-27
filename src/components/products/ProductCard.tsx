import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { BaseCard } from '@/components/ui/BaseCard';
import type { ProductCatalogItem } from '@/data/products/catalog';
import { cn } from '@/lib/utils';
import { stroke } from '@/styles/design-tokens';
import { MerchImageSingle, MerchImagePair, MerchImageFeatured } from '@/components/ui/merch/MerchImageDisplay';
import { getMerchImageConfig, legacyImageToMerchImages } from '@/lib/merch/imageDisplay';

export function ProductCard({ item }: { item: ProductCatalogItem }) {
  // Normalize images: use new format if available, fall back to legacy
  const normalizedImages = item.images || legacyImageToMerchImages(item.imageUrl);

  // Determine display configuration: respect item's primaryImageLabel and showSecondaryInset options
  const config = getMerchImageConfig(
    normalizedImages,
    item.showSecondaryInset ? 'featured' : undefined,
    item.primaryImageLabel?.toLowerCase() as any
  );

  // Render image based on display mode
  const renderImage = () => {
    if (config.displayMode === 'pair' && config.primary && config.secondary) {
      return <MerchImagePair images={[config.primary, config.secondary]} />;
    }

    if (config.displayMode === 'featured' && config.primary) {
      return <MerchImageFeatured primary={config.primary} secondary={config.secondary} />;
    }

    if (config.primary) {
      return <MerchImageSingle image={config.primary} />;
    }

    return <Box className="w-full aspect-video bg-surface-alt rounded-lg" />;
  };

  return (
    <BaseCard
      gap={4}
      height="full"
      padding={5}
      radius="lg"
      border
      maxWidth="sm"
      data-testid="product-card"
      href={item.href}
      rel="sponsored noopener noreferrer"
      ariaLabel={`Buy ${item.title} on storefront`}
    >
      <Box
        position="relative"
        overflow="hidden"
        radius="lg"
      >
        {renderImage()}
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
    </BaseCard>
  );
}
