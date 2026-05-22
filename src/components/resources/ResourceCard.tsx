import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { ResourceCardItem } from '@/lib/types/resources';
import { ASSET_PREFIX } from '@/config/constants';
import { ArrowRight } from 'lucide-react';

interface ResourceCardProps {
  item: ResourceCardItem;
}

export function ResourceCard({ item }: ResourceCardProps) {
  const isExternal = item.href.startsWith('http');
  const Component = isExternal ? 'a' : NavLink;
  const linkProps = isExternal ? { href: item.href, target: '_blank', rel: 'sponsored noopener noreferrer' } : { to: item.href };

  const getCtaLabel = (kind: string) => {
    switch (kind) {
      case 'article': return 'Read guide';
      case 'event-guide': return 'View event guide';
      case 'affiliate-product': return 'View recommendation';
      case 'boomtick-merch': return 'Shop merch';
      case 'tool': return 'Open tool';
      default: return 'Learn more';
    }
  };

  const getTypeLabel = (kind: string) => {
    switch (kind) {
      case 'affiliate-product': return 'Recommended gear';
      case 'boomtick-merch': return 'BoomTick merch';
      case 'article': return 'Guide';
      case 'event-guide': return 'Event guide';
      case 'tool': return 'Tool';
      default: return 'Resource';
    }
  };

  return (
    <Stack
      as="article"
      gap={4}
      height="full"
      padding={5}
      radius="lg"
      border
      className="group relative bg-surface transition-all duration-300 hover:bg-surface/80 hover:border-accent/30 hover:-translate-y-0.5"
    >
      <Box
        as={Component as any}
        {...linkProps}
        className="absolute inset-0 z-10"
        aria-label={getCtaLabel(item.kind)}
      />

      {item.image && (
        <Box position="relative" aspect="video" overflow="hidden" radius="md" className="bg-surface-alt/20 mb-2">
          <Box
            as="img"
            src={item.image.startsWith('http') ? item.image : `${ASSET_PREFIX}${item.image}`}
            alt={item.title}
            width="full"
            height="full"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Box>
      )}

      <Stack gap={2} flex={1}>
        <Stack direction="row" justify="between" align="center">
          <Text variant="mono" size="micro" uppercase tracking="wider" color="dim" className="opacity-70">
            {getTypeLabel(item.kind)}
          </Text>
        </Stack>

        <Text
          as="h3"
          variant="body"
          size="lg"
          weight="font-bold"
          color="main"
          leading="tight"
          clamp={2}
          className="group-hover:text-accent transition-colors"
        >
          {item.title}
        </Text>

        <Text variant="body" size="sm" color="dim" leading="relaxed" clamp={3}>
          {item.description}
        </Text>
      </Stack>

      <Box display="flex" align="center" justify="between" marginTop="auto" paddingTop={3} border="t" className="border-line/30">
        <Stack direction="row" gap={2} wrap="wrap">
          {item.tags?.slice(0, 2).map((tag) => (
            <Text key={tag} variant="mono" size="micro" color="dim" uppercase tracking="tighter" className="opacity-60">
              {tag}
            </Text>
          ))}
        </Stack>
        <Box display="flex" align="center" gap={1}>
          <Text variant="mono" size="sm" weight="font-bold" color="accent" tracking="wide">
            {getCtaLabel(item.kind)}
          </Text>
          <ArrowRight className="w-3 h-3 text-accent" />
        </Box>
      </Box>
    </Stack>
  );
}
