import { Box, Stack, Text } from '@/layouts/Primitives';
import { BaseCard } from '@/components/ui/BaseCard';
import { MerchImageDisplay } from '@/components/products/MerchImageDisplay';
import type { ProductCatalogItem } from '@/data/products/catalog';
import { cn } from '@/lib/utils';

function getRoleBadgeStyles(role: string) {
  switch (role) {
    case 'lead':
      return "text-accent bg-accent/10 border-accent/20";
    case 'follow':
      return "text-warning bg-warning/10 border-warning/20";
    case 'switch':
      return "text-accent-sky bg-accent-sky/10 border-accent-sky/20";
    default:
      return "text-text-dim bg-surface-alt/10 border-line/20";
  }
}

export function ProductCard({ item }: { item: ProductCatalogItem }) {
  return (
    <BaseCard
      as="article"
      gap={4}
      height="full"
      padding={{ base: 4, md: 5 }}
      radius="2xl"
      border
      maxWidth="full"
      className="bg-surface-alt/10 hover:-translate-y-0.5 hover:border-accent/40 transition-all duration-300"
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
        <Stack gap={1.5}>
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
        </Stack>

        <Stack gap={2}>
          {item.roles && (
            <Stack direction="row" gap={1.5} wrap="wrap">
              {item.roles.map((role) => (
                <Box
                  key={role}
                  paddingX={3}
                  paddingY={1}
                  radius="full"
                  border
                  className={cn(getRoleBadgeStyles(role))}
                >
                  <Text size="micro" weight="font-bold" uppercase tracking="wide">
                    {role}
                  </Text>
                </Box>
              ))}
            </Stack>
          )}

          <Stack direction="row" gap={1.5} wrap="wrap">
            {item.tags.slice(0, 3).map((tag) => (
              <Box key={tag} paddingX={2.5} paddingY={1} radius="full" className="bg-surface-alt/80 border border-line/20">
                <Text variant="mono" size="micro" color="dim" uppercase tracking="wide">
                  {tag}
                </Text>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Stack>

      <Stack marginTop="auto" paddingTop={3} border="t" gap={3} className="border-line/30">
        <Stack
          as="a"
          href={item.href}
          target="_blank"
          rel="sponsored noopener noreferrer"
          aria-label={`See Printful options for ${item.title}`}
          direction="row"
          align="center"
          justify="center"
          gap={1}
          width="full"
          paddingY={2.5}
          radius="xl"
          className="bg-accent hover:bg-accent-sky transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Text variant="mono" size="sm" weight="font-bold" color="bg" tracking="widest">
            SEE OPTIONS
          </Text>
          <span className="text-bg font-bold">→</span>
          <span className="sr-only"> Opens in Printful storefront</span>
        </Stack>
      </Stack>
    </BaseCard>
  );
}
