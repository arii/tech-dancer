import { ExternalLink } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { AffiliateLink } from '@/types';

interface AffiliateCardProps {
  link: AffiliateLink;
}

export function AffiliateCard({ link }: AffiliateCardProps) {
  return (
    <Box
      position="relative"
      display="flex"
      direction="col"
      padding={5}
      surface="default"
      border
      radius="lg"
      className="group transition-all h-full hover:border-accent"
    >
      <Stack gap={2} flex={1}>
        <Box display="flex" align="center" justify="between">
          <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">
            {link.category}
          </Text>
          <ExternalLink className="w-4 h-4 text-accent opacity-30 group-hover:opacity-100 transition-opacity" />
        </Box>

        <Text variant="body" size="base" weight="font-bold" className="group-hover:text-accent transition-colors">
          {link.resourceSlug ? (
            <NavLink to={`/gear/${link.resourceSlug}`} className="after:absolute after:inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
              {link.resourceTitle || link.name}
            </NavLink>
          ) : (
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
              {link.name}
            </a>
          )}
        </Text>

        <Text variant="body" size="xs" color="dim" className="line-clamp-2 leading-relaxed">
          {link.resourceExcerpt || link.description}
        </Text>
      </Stack>
    </Box>
  );
}
