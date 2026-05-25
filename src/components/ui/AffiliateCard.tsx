import { ExternalLink } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { AffiliateLink } from '@/types';
import { BaseCard } from './BaseCard';

interface AffiliateCardProps {
  link: AffiliateLink;
}

export function AffiliateCard({ link }: AffiliateCardProps) {
  return (
    <BaseCard
      href={link.url}
      isExternal
      padding={5}
    >
      <Stack gap={2} flex={1}>
        <Box display="flex" align="center" justify="between">
          <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">
            {link.category}
          </Text>
          <ExternalLink className="w-4 h-4 text-accent opacity-30 group-hover:opacity-100 transition-opacity" />
        </Box>

        <Text variant="body" size="base" weight="font-bold" className="group-hover:text-accent transition-colors">
          <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${link.name}`} className="after:absolute after:inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
            {link.name}
          </a>
        </Text>

        <Text variant="body" size="xs" color="dim" className="line-clamp-2 leading-relaxed">
          {link.description}
        </Text>
      </Stack>
    </BaseCard>
  );
}
