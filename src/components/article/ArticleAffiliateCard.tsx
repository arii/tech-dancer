
import { Box, Text, Stack } from '@/layouts/Primitives';
import { ExternalLink } from 'lucide-react';
import { affiliateManager } from '@/lib/affiliateManager';
import { ArticleCard } from './ArticleCard';

interface ArticleAffiliateCardProps {
  id: string;
  cta?: string;
}

export function ArticleAffiliateCard({ id, cta = "View Product" }: ArticleAffiliateCardProps) {
  const link = affiliateManager.getLink(id);

  if (!link) return null;

  return (
    <ArticleCard marginY={8} className="overflow-hidden group hover:border-accent/30 transition-all duration-300">
      <Stack direction={{ base: 'column', md: 'row' }} gap={0}>
        {link.image && (
          <Box
            width={{ base: 'full', md: 48, lg: 64 }}
            className="aspect-square overflow-hidden border-b md:border-b-0 md:border-r border-line/50"
          >
            <img
              src={link.image}
              alt={link.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Box>
        )}
        <Stack gap={4} padding={{ base: 6, lg: 8 }} flex="1" justify="center">
          <Stack gap={2}>
            <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="utility">
              {link.category || 'Featured Gear'}
            </Text>
            <Text variant="display" size="xl" color="main">
              {link.name}
            </Text>
            {link.description && (
              <Text size="sm" color="dim" leading="relaxed" className="line-clamp-2">
                {link.description}
              </Text>
            )}
          </Stack>

          <Stack
            as="a"
            direction="row"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            align="center"
            gap={2}
            width="fit"
            paddingX={6}
            paddingY={3}
            radius="xl"
            surface="surface"
            border
            className="hover:border-accent/50 hover:bg-surface-alt text-text-body transition-all"
          >
            <Text weight="font-bold">{cta}</Text>
            <ExternalLink size={14} className="text-accent" />
          </Stack>
        </Stack>
      </Stack>
    </ArticleCard>
  );
}
