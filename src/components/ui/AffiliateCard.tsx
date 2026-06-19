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
            width={{ base: 16, md: 20 }}
            height={{ base: 16, md: 20 }}
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
            <img
              src={link.image}
              alt={link.name}
              className={cn(
                "max-w-full max-h-full",
                link.imageMode === 'contain' ? 'object-contain' : 'object-cover'
              )}
              loading="lazy"
            />
          </Box>
        )}

        <Stack gap={2} flex={1} minWidth={0}>
          <Box display="flex" align="center" justify="between" width="full" className="relative z-20 pointer-events-none">
            <Text variant="mono" size="micro" weight="font-bold" color="accent" uppercase tracking="widest">
              {link.category}
            </Text>
            <ExternalLink className="w-4 h-4 text-accent opacity-medium group-hover:opacity-full transition-opacity" />
          </Box>

          <Text
            as="h4"
            variant="body"
            size="base"
            weight="font-bold"
            clamp={2}
            display="block"
            className="group-hover:text-accent transition-colors relative z-20 pointer-events-none"
          >
            {link.name}
          </Text>

          <Text
            variant="body"
            size="xs"
            color="dim"
            clamp={2}
            display="block"
            className="leading-relaxed relative z-20 pointer-events-none"
          >
            {link.description}
          </Text>
        </Stack>
      </Stack>
    </BaseCard>
  );
}
