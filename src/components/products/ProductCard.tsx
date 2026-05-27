import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { BaseCard } from '@/components/ui/BaseCard';
import { ASSET_PREFIX } from '@/config/constants';
import type { ProductCatalogItem } from '@/data/products/catalog';
import { cn } from '@/lib/utils';
import { stroke } from '@/styles/design-tokens';
import styles from '@/components/ui/merch/MerchImages.module.css';

export function ProductCard({ item }: { item: ProductCatalogItem }) {
  const resolvedPrimary = {
    src: item.imageUrl.startsWith('http') ? item.imageUrl : `${ASSET_PREFIX}${item.imageUrl}`,
    alt: item.title,
  };

  const cropClass = item.cardCrop === 'front-print' ? styles.crop_front_print :
                    item.cardCrop === 'back-print' ? styles.crop_back_print :
                    item.cardCrop === 'hoodie' ? styles.crop_hoodie : '';

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
      <div className={styles.merch_card_media}>
        <img
          src={resolvedPrimary.src}
          alt={resolvedPrimary.alt}
          className={cn(styles.merch_card_primary_image, cropClass)}
        />
      </div>

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
