import { ExternalLink } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { affiliateManager } from '@/lib/affiliateManager';
import { SpecsTable } from '@/components/layout/DetailElements';

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
                surface="default"
                border
                className="hover:border-accent group transition-all"
              >
                <Text variant="mono" size="xs" weight="font-bold">{link.name || link.label || link.url}</Text>
                <ExternalLink className="w-4 h-4 text-accent opacity-30 group-hover:opacity-100" />
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
                <ExternalLink className="w-4 h-4 text-accent opacity-30 group-hover:opacity-100" />
              </Box>
            )}
          </Box>
          <Text variant="mono" size="micro" color="dim" emphasis="low" className="leading-tight italic">
            * Affiliate link support helps maintain this repository.
          </Text>
        </Stack>
      )}
    </Stack>
  );
}
