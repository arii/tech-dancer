import { ExternalLink } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { affiliateManager } from '@/lib/affiliateManager';
import { ResourceGrid } from '../ResourceGrid';
import { DISCLOSURE_TEXT } from '@/components/ui/AffiliateDisclosure';
import { SidebarCard } from '@/components/article/ArticleSidebar';

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
    <Stack gap={6}>
      {specs && Object.keys(specs).length > 0 && (
        <SidebarCard title="Technical Specs">
          <Stack gap={3}>
            {Object.entries(specs).map(([key, value]) => (
              <Stack key={key} gap={1}>
                <Text variant="mono" size="micro" color="dim" uppercase>{key}</Text>
                <Text size="xs" weight="font-bold" color="body">{value}</Text>
              </Stack>
            ))}
          </Stack>
        </SidebarCard>
      )}

      {(affiliateLinks.length > 0 || affiliateLink) && (
        <SidebarCard title="Where to Buy">
          <Stack gap={4}>
            <Box display="grid" gap={3} gridCols={1}>
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
                  surface="surface-alt"
                  border
                  className="rounded-lg hover:border-accent group transition-all"
                >
                  <Text variant="mono" size="xs" weight="font-bold" color="main" className="group-hover:text-accent transition-colors">
                    {link.name || link.label || link.url}
                  </Text>
                  <ExternalLink className="w-4 h-4 text-accent opacity-30 group-hover:opacity-100 transition-opacity" />
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
                  surface="surface-alt"
                  border
                  className="rounded-lg hover:border-accent group transition-all"
                >
                  <Text variant="mono" size="xs" weight="font-bold" color="main" className="group-hover:text-accent transition-colors">
                    Buy on Amazon
                  </Text>
                  <ExternalLink className="w-4 h-4 text-accent opacity-30 group-hover:opacity-100 transition-opacity" />
                </Box>
              )}
            </Box>
            <Text variant="mono" size="micro" color="dim" className="leading-tight not-italic">
              {DISCLOSURE_TEXT}
            </Text>
          </Stack>
        </SidebarCard>
      )}
    </Stack>
  );
}
