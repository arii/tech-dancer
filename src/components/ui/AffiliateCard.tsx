import { ExternalLink } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { BaseCard } from './BaseCard';
import { AffiliateLink } from '@/types';

interface AffiliateCardProps {
  link: AffiliateLink;
}

export function AffiliateCard({ link }: AffiliateCardProps) {
  return (
    <BaseCard
      padding={{ base: 3, md: 4 }}
      height="full"
      href={link.url}
      rel="noopener noreferrer sponsored"
      ariaLabel={`Open ${link.name}`}
    >
      <Stack gap={2} flex={1}>
        <Box display="flex" align="center" justify="between">
          <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">
            {link.category}
          </Text>
          <ExternalLink className="w-4 h-4 text-accent opacity-medium group-hover:opacity-full transition-opacity" />
        </Box>

        <Text variant="body" size="base" weight="font-bold" className="group-hover:text-accent transition-colors relative z-20 pointer-events-none">
          {link.name}
        </Text>

        <Text variant="body" size="xs" color="dim" className="leading-relaxed">
          {link.description}
        </Text>
      </Stack>
    </BaseCard>
  );
}
