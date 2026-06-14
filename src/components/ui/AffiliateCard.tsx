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
      <Stack direction="row" gap={4} align="center" width="full">
        {/* Product Image Thumbnail */}
        {link.image && (
          <Box
            width={16}
            height={16}
            shrink={0}
            radius="md"
            overflow="hidden"
            border
            className="border-line/40 bg-surface-alt/20"
            display="flex"
            align="center"
            justify="center"
          >
            <Box
              as="img"
              src={link.image}
              alt={link.name}
              maxWidth="full"
              maxHeight="full"
              className={link.imageMode === 'contain' ? 'object-contain p-1' : 'object-cover'}
              loading="lazy"
            />
          </Box>
        )}

        <Stack gap={1} flex={1} minWidth={0}>
          <Box display="flex" align="center" justify="between" width="full">
            <Text variant="mono" size="micro" weight="font-bold" color="accent" uppercase tracking="widest">
              {link.category}
            </Text>
            <ExternalLink className="w-4 h-4 text-accent opacity-medium group-hover:opacity-full transition-opacity" />
          </Box>

          <Text
            variant="body"
            size="base"
            weight="font-bold"
            className="group-hover:text-accent transition-colors relative z-20 pointer-events-none truncate"
          >
            {link.name}
          </Text>

          <Text variant="body" size="xs" color="dim" className="leading-relaxed line-clamp-2">
            {link.description}
          </Text>
        </Stack>
      </Stack>
    </BaseCard>
  );
}
