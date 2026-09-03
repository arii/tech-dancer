import { ExternalLink } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { affiliateManager } from '@/lib/affiliateManager';
import { SpecsTable } from '@/components/layout/DetailElements';
import { ResourceGrid } from '../ResourceGrid';
import { DISCLOSURE_TEXT } from '@/components/ui/AffiliateDisclosure';

interface ResourceHeaderExtrasProps {
  author: string;
  rating?: number;
  durability?: number;
  value?: number;
  priceCategory: string;
}

export function ResourceHeaderExtras({ author, rating: _rating, durability, value, priceCategory }: ResourceHeaderExtrasProps) {
  return (
    <Stack gap={6} marginTop={6}>
      <Stack direction="row" align="center" gap={2} color="dim">
        <Box width={8} height={8} radius="full" surface="muted" />
        <Text variant="mono" size="xs">{author}</Text>
      </Stack>

      <ResourceGrid
        rating={0}
        durability={durability}
        value={value}
        priceCategory={priceCategory}
      />
    </Stack>
  );
}

export function ResourceBodyExtras({ heading }: { heading?: string }) {
  if (!heading) return null;
  return (
    <Box marginBottom={6}>
      <Text variant="headline" size="2xl" color="main">{heading}</Text>
    </Box>
  );
}

interface ResourceSidebarProps {
  affiliateIds?: string[];
  affiliateLink?: string; // For manual entry in BlogDrafter
  shopUrl?: string;
  provider?: string;
  specs?: Record<string, string>;
}

export function ResourceSidebar({ affiliateIds, affiliateLink, shopUrl, provider, specs }: ResourceSidebarProps) {
  const affiliateLinks = (affiliateIds || [])
    .map(id => affiliateManager.getLink(id))
    .filter((link): link is NonNullable<typeof link> => !!link);

  const hasWhereToBuy = affiliateLinks.length > 0 || !!affiliateLink || !!shopUrl;

  return (
    <Stack gap={8}>
      {specs && Object.keys(specs).length > 0 && <SpecsTable specs={specs} />}

      {hasWhereToBuy && (
        <Stack gap={4}>
          <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase className="tracking-widest border-b border-line" paddingBottom={2}>
            Where to Buy
          </Text>
          <Grid cols={1} gap={3}>
            {shopUrl && (
              <Box
                as="a"
                href={shopUrl}
                target="_blank"
                rel="sponsored noopener noreferrer"
                display="flex"
                align="center"
                justify="between"
                padding={4}
                surface="default"
                border
                className="hover:border-accent group transition-all bg-accent/5"
              >
                <Text variant="mono" size="xs" weight="font-bold">
                  {provider === 'printful' || shopUrl.includes('printful') ? 'Buy on Printful' : 'Buy Now'}
                </Text>
                <ExternalLink className="w-4 h-4 text-accent opacity-medium group-hover:opacity-full" />
              </Box>
            )}
            {affiliateLinks.map(link => (
              <Box
                key={link.id}
                as="a"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                display="flex"
                align="center"
                justify="between"
                padding={4}
                surface="default"
                border
                className="hover:border-accent group transition-all"
              >
                <Text variant="mono" size="xs" weight="font-bold">{link.name || link.label || link.url}</Text>
                <ExternalLink className="w-4 h-4 text-accent opacity-medium group-hover:opacity-full" />
              </Box>
            ))}
            {affiliateLink && (
              <Box
                as="a"
                href={affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                display="flex"
                align="center"
                justify="between"
                padding={4}
                surface="default"
                border
                className="hover:border-accent group transition-all"
              >
                <Text variant="mono" size="xs" weight="font-bold">Buy on Amazon</Text>
                <ExternalLink className="w-4 h-4 text-accent opacity-medium group-hover:opacity-full" />
              </Box>
            )}
          </Grid>
          <Text variant="mono" size="micro" color="dim" emphasis="low" className="leading-tight not-italic">
            {DISCLOSURE_TEXT}
          </Text>
        </Stack>
      )}
    </Stack>
  );
}
