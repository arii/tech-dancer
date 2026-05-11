import { ExternalLink } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { AffiliateLink } from '@/types';

interface AffiliateCardProps {
  link: AffiliateLink;
}

export function AffiliateCard({ link }: AffiliateCardProps) {
  return (
    <Box
      as="a"
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      display="flex"
      direction="col"
      padding={5}
      surface="default"
      border
      radius="lg"
      className="hover:border-accent group transition-all h-full"
    >
      <Stack gap={2} flex={1}>
        <Box display="flex" align="center" justify="between">
          <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">
            {link.category}
          </Text>
          <ExternalLink className="w-4 h-4 text-accent opacity-30 group-hover:opacity-100 transition-opacity" />
        </Box>

        <Text variant="body" size="base" weight="font-bold" className="group-hover:text-accent transition-colors">
          {link.name}
        </Text>

        <Text variant="body" size="sm" color="dim" className="line-clamp-2 leading-relaxed">
          {link.description}
        </Text>
      </Stack>
    </Box>
  );
}
