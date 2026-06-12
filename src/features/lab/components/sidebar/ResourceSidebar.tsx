import { Box, Stack, Text } from '@/layouts/Primitives';
import { affiliateManager } from '@/lib/affiliateManager';
import { SpecsTable } from '@/components/layout/DetailElements';
import { ResourceGrid } from '../ResourceGrid';
import { DISCLOSURE_TEXT } from '@/components/ui/AffiliateDisclosure';
import { InfoRow } from '@/components/ui/InfoList';

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
  specs?: Record<string, string>;
}

export function ResourceSidebar({ affiliateIds, affiliateLink, specs }: ResourceSidebarProps) {
  const affiliateLinks = (affiliateIds || [])
    .map(id => affiliateManager.getLink(id))
    .filter((link): link is NonNullable<typeof link> => !!link);

  return (
    <Stack gap={8}>
      {specs && Object.keys(specs).length > 0 && <SpecsTable specs={specs} />}

      {(affiliateLinks.length > 0 || affiliateLink) && (
        <Stack gap={4}>
          <Text variant="mono" size="tiny" weight="font-bold" color="dim" uppercase className="tracking-widest border-b border-line" paddingBottom={2}>
            Where to Buy
          </Text>
          <Stack gap={3}>
            {affiliateLinks.map(link => (
              <InfoRow
                key={link.id}
                label={link.name || link.label || link.url}
                href={link.url}
              />
            ))}
            {affiliateLink && (
              <InfoRow
                key="manual"
                label="Buy on Amazon"
                href={affiliateLink}
              />
            )}
          </Stack>
          <Text variant="mono" size="micro" color="dim" emphasis="low" className="leading-tight not-italic">
            {DISCLOSURE_TEXT}
          </Text>
        </Stack>
      )}
    </Stack>
  );
}
