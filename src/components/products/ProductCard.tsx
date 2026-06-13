import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Button } from '@/layouts/Primitives';
import { BaseCard } from '@/components/ui/BaseCard';
import { MerchImageDisplay } from '@/components/products/MerchImageDisplay';
import type { ProductCatalogItem } from '@/data/products/catalog';
import { cn } from '@/lib/utils';
import { stroke } from '@/styles/design-tokens';

function formatRoles(roles: string[]) {
  if (roles.length === 0) return '';
  return roles.map(r => r.charAt(0).toUpperCase() + r.slice(1)).join(' · ');
}

const ROLE_COLORS: Record<string, { surface: "accent" | "warning" | "alt" | "default"; text: string }> = {
  lead: { surface: 'accent', text: 'text-accent' },
  follow: { surface: 'warning', text: 'text-warning' },
  switch: { surface: 'alt', text: 'text-text-main' },
};

function getRoleColors(role: string) {
  return ROLE_COLORS[role] || { surface: 'default', text: 'text-text-dim' };
}

export function ProductCard({ item, isFeatured }: { item: ProductCatalogItem; isFeatured?: boolean }) {
  // Use "SEE OPTIONS" if there might be multiple configurations, otherwise "VIEW ON PRINTFUL"
  const ctaText = item.imageDisplayMode === 'both-equal' || (item.images && item.images.length > 1)
    ? 'SEE OPTIONS'
    : 'VIEW ON PRINTFUL';

  const roleSummary = item.roles ? formatRoles(item.roles) : '';

  return (
    <BaseCard
      gap={{ base: 3, md: isFeatured ? 5 : 4 }}
      height="full"
      padding={isFeatured ? { base: 4, md: 6 } : { base: 3, md: 5 }}
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

        {item.roles && (
          <>
            {/* Mobile: Summarized text line */}
            <Text
              variant="mono"
              size="micro"
              color="dim"
              weight="font-bold"
              uppercase
              tracking="wider"
              display={{ base: 'block', md: 'none' }}
              data-testid="product-role-summary"
            >
              {roleSummary}
            </Text>

            {/* Desktop: Pill list */}
            <Stack direction="row" gap={1.5} wrap="wrap" display={{ base: 'none', md: 'flex' }}>
              {item.roles.map((role) => {
                const colors = getRoleColors(role);
                return (
                  <Box
                    key={role}
                    paddingX={2}
                    paddingY={0.5}
                    radius="md"
                    surface={colors.surface}
                    className={cn("border border-line/30", colors.text)}
                  >
                    <Text size="micro" weight="font-bold" uppercase tracking="wider">
                      {role}
                    </Text>
                  </Box>
                );
              })}
            </Stack>
          </>
        )}
      </Stack>

      <Stack marginTop="auto" paddingTop={{ base: 2, md: isFeatured ? 5 : 3 }} border="t" gap={isFeatured ? 4 : 3} className="border-line/30">
        <Stack direction="row" gap={1.5} wrap="wrap">
          {item.tags.slice(0, 3).map((tag, index) => (
            <Box
              key={tag}
              paddingX={2}
              paddingY={0.5}
              radius="md"
              surface="alt"
              className="border border-line/20"
              display={index > 1 ? { base: 'none', md: 'block' } : 'block'}
              data-testid={index < 2 ? "product-tag-primary" : "product-tag-secondary"}
            >
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
