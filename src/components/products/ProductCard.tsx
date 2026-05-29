import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import type { ProductCatalogItem } from '@/data/products/catalog';
import { cn } from '@/lib/utils';
import { stroke } from '@/styles/design-tokens';
import { MerchImageDisplay } from './MerchImageDisplay';

export function ProductCard({ item }: { item: ProductCatalogItem }) {
  const isPrintful = item.disclosure === 'owned-printful';

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
      className="group relative bg-surface transition-all duration-200"
    >
      <MerchImageDisplay
        title={item.title}
        href={item.href}
        images={item.images}
        imageDisplayMode={item.imageDisplayMode}
      />

      <Stack gap={3}>
        <Text
          as="a"
          href={item.href}
          target={isPrintful ? "_blank" : undefined}
          rel={isPrintful ? "sponsored noopener noreferrer" : "noopener noreferrer"}
          variant="body"
          size="lg"
          weight="font-bold"
          color="main"
          leading="tight"
          clamp={2}
          className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
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
        <Stack
          as="a"
          direction="row"
          align="center"
          gap={1}
          href={item.href}
          target={isPrintful ? "_blank" : undefined}
          rel={isPrintful ? "sponsored noopener noreferrer" : "noopener noreferrer"}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={`View ${item.title} on storefront`}
        >
          <Text
            variant="mono"
            size="sm"
            weight="font-bold"
            color="accent"
            tracking="wide"
          >
            {isPrintful ? 'SEE COLORS' : 'VIEW ITEM'}
          </Text>
          <ArrowRight className={cn('w-3 h-3 text-accent', stroke.thick)} aria-hidden="true" />
        </Stack>
      </Box>
    </Stack>
  );
}
