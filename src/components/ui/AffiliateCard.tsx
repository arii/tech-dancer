import { ExternalLink } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { BaseCard } from './BaseCard';
import { AffiliateLink } from '@/types';
import { cn } from '@/lib/utils';

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
      <Stack direction="row" gap={4} align="start" width="full">
        {/* Product Image Thumbnail */}
        {link.image && (
          <Box
            width={20}
            height={20}
            padding={link.imageMode === 'contain' ? 2 : 0}
            shrink={0}
            radius="md"
            overflow="hidden"
            border
            className={cn(
              "border-line/40",
              link.imageMode === 'contain' ? "bg-white" : "bg-surface-alt/20"
            )}
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
              className={link.imageMode === 'contain' ? 'object-contain' : 'object-cover'}
              loading="lazy"
            />
          </Box>
        )}

        <Stack gap={2} flex={1} minWidth={0}>
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
            clamp={2}
            className="group-hover:text-accent transition-colors relative z-20 pointer-events-none"
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
