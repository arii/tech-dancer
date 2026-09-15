import { Box, Stack, Text, Button } from '@/layouts/Primitives';

import { ShieldCheck } from 'lucide-react';

export interface ClientCardProps {
  name: string;
  location: string;
  description: string;
  niche: string;
  tags: string[];
  imageSrc: string;
  url: string;
}

export function ClientCard({ name, location, description, niche, tags, imageSrc, url }: ClientCardProps) {
  return (
    <Box as="article" border radius="lg" overflow="hidden" surface="default" height="full" display="flex" flexDirection="column" className="creator-card group">
      <Box className="creator-media" position="relative" height={48} width="full" bg="surface-alt">
        <Box as="img" src={imageSrc} alt={`${name} - ${location} ${niche}`} className="w-full h-full object-cover" />
        <Box position="absolute" top={4} right={4} paddingX={3} paddingY={1} radius="full" className="bg-bg/90 backdrop-blur-sm text-xs font-bold uppercase text-accent">
          {niche}
        </Box>
      </Box>
      <Stack className="creator-body" padding={6} gap={4} flex={1}>
        <Stack gap={1}>
          <Text as="h2" variant="headline" size="xl" weight="font-bold">{name}</Text>
          <Text as="p" className="creator-location" variant="mono" size="xs" color="dim">{location}</Text>
        </Stack>

        <Box display="flex" alignItems="center" gap={1.5} className="text-success">
          <ShieldCheck size={14} className="shrink-0" />
          <Text as="span" variant="mono" size="xs" weight="font-medium" color="success">
            Licensed Professional · 15 Years of Experience
          </Text>
        </Box>

        <Text as="p" className="creator-description" variant="body" size="sm" color="main" flex={1}>
          {description}
        </Text>
        <Stack className="creator-features" direction="row" wrap gap={2}>
          {tags.map((tag) => (
            <Box key={tag} as="span" paddingX={2} paddingY={1} radius="md" border className="text-xs bg-surface-alt/50 border-line/50">{tag}</Box>
          ))}
        </Stack>
        <Box className="creator-actions" marginTop={4}>
          <Button as="a" href={url} target="_blank" rel="noopener" variant="outline" width="full">
            Visit Website ↗
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
