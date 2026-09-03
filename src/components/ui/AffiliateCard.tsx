import { ExternalLink } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { BaseCard } from './BaseCard';
import { AffiliateLink } from '@/types';
import { cn } from '@/lib/utils';

interface AffiliateCardProps {
  link: AffiliateLink;
  layout?: 'compact' | 'vertical';
}

export function AffiliateCard({ link, layout = 'compact' }: AffiliateCardProps) {
  const isVertical = layout === 'vertical';

  return (
    <BaseCard
      data-testid="affiliate-card"
      padding={{ base: 3, sm: 3.5 }}
      height="full"
      href={link.url}
      rel="noopener noreferrer sponsored"
      ariaLabel={`Open ${link.name}`}
      className="w-full overflow-hidden"
    >
      <Stack
        direction={isVertical ? 'col' : 'row'}
        gap={3}
        align={isVertical ? 'start' : 'center'}
        width="full"
      >
        {/* Product Image Thumbnail */}
        {link.image && (
          <Box
            width={isVertical ? 'full' : { base: 16, sm: 20 }}
            height={isVertical ? 36 : { base: 16, sm: 20 }}
            padding={link.imageMode === 'contain' ? 2 : 0}
            shrink={0}
            radius="md"
            overflow="hidden"
            border
            className={cn(
              "border-line/40 shrink-0",
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
              width="full"
              height="full"
              className={cn(
                link.imageMode === 'contain' ? 'object-contain' : 'object-cover',
                "w-full h-full"
              )}
              loading="lazy"
            />
          </Box>
        )}

        <Stack gap={1} flex={1} minWidth={0} width="full">
          <Box display="flex" align="center" justify="between" width="full" className="relative z-20 pointer-events-none">
            <Text variant="mono" size="micro" weight="font-bold" color="accent" uppercase tracking="widest" className="truncate">
              {link.category}
            </Text>
            <ExternalLink className="w-3.5 h-3.5 text-accent opacity-60 group-hover:opacity-100 transition-opacity shrink-0 ml-1.5" />
          </Box>

          <Text
            as="h4"
            variant="body"
            size="sm"
            weight="font-bold"
            leading="snug"
            className="line-clamp-2 group-hover:text-accent transition-colors relative z-20 pointer-events-none text-text-main break-words"
          >
            {link.name}
          </Text>

          <Text
            variant="body"
            size="xs"
            color="dim"
            leading="relaxed"
            className="line-clamp-2 relative z-20 pointer-events-none break-words"
          >
            {link.description}
          </Text>
        </Stack>
      </Stack>
    </BaseCard>
  );
}
