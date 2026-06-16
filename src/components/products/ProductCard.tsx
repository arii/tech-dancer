import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { BaseCard } from '@/components/ui/BaseCard';
import { MerchImageDisplay } from '@/components/products/MerchImageDisplay';
import type { ProductCatalogItem } from '@/data/products/catalog';
import { cn } from '@/lib/utils';
import { stroke } from '@/styles/design-tokens';
import { COLLECTIONS } from '@/data/merch';
import { getCollectionUrl } from '@/lib/productCatalog';

export function ProductCard({ item, isFeatured }: { item: ProductCatalogItem; isFeatured?: boolean }) {
  // Use "SEE OPTIONS" if there might be multiple configurations, otherwise "VIEW ON PRINTFUL"
  const ctaText = item.imageDisplayMode === 'both-equal' || (item.images && item.images.length > 1)
    ? 'SEE OPTIONS'
    : 'VIEW ON PRINTFUL';

  return (
    <BaseCard
      gap={isFeatured ? 5 : 4}
      height="full"
      padding={isFeatured ? { base: 5, md: 6 } : { base: 4, md: 5 }}
      radius="lg"
      border
      maxWidth="full"
      className={cn(
        "hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-glow",
        isFeatured && "border-accent/20 bg-accent/5"
      )}
      data-testid="product-card"
    >
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
          clamp={isFeatured ? 0 : 2}
          className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {item.title}
        </Text>

        <Text variant="body" size={isFeatured ? 'base' : 'sm'} color="dim" leading="relaxed" clamp={isFeatured ? 0 : 2}>
          {item.description}
        </Text>

        <Stack direction="row" gap={1.5} wrap="wrap">
          {/* Collection Tags - Interactive links with subtle accent styling */}
          {item.collections.map((collId) => {
            const coll = COLLECTIONS.find(c => c.id === collId);
            if (!coll) return null;
            const href = getCollectionUrl(collId);
            const isExternal = href.startsWith('http');

            return (
              <Box
                key={collId}
                as="a"
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "sponsored noopener noreferrer" : undefined}
                paddingX={2}
                paddingY={0.5}
                radius="md"
                surface="alt"
                className="border border-accent/30 hover:border-accent/60 transition-colors bg-accent/5"
              >
                <Text size="micro" weight="font-bold" uppercase tracking="wider" color="accent">
                  {coll.label}
                </Text>
              </Box>
            );
          })}

          {/* Role Tags - Static metadata with muted styling */}
          {item.roles && item.roles.map((role) => (
            <Box
              key={role}
              paddingX={2}
              paddingY={0.5}
              radius="md"
              surface="alt"
              className="border border-line/20"
            >
              <Text
                size="micro"
                weight="font-bold"
                uppercase
                tracking="wider"
                className={cn(
                  role === 'lead' ? "text-accent/60" : role === 'follow' ? "text-warning/60" : "text-text-dim"
                )}
              >
                {role}
              </Text>
            </Box>
          ))}
        </Stack>
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
