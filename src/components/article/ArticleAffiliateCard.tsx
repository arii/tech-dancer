
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
    <ArticleCard marginY={8} overflow="hidden" className="group hover:border-cyan-500/30 transition-all duration-300">
      <Stack direction={{ base: 'column', md: 'row' }} gap={0}>
        {link.image && (
          <Box width="full" mdWidth={48} lgWidth={64} aspect="square" overflow="hidden" className="border-b md:border-b-0 md:border-r border-line/50">
            <img
              src={link.image}
              alt={link.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Box>
        )}
        <Stack gap={4} padding={{ base: 6, lg: 8 }} flex justify="center">
          <Stack gap={2}>
            <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="widest">
              {link.category || 'Featured Gear'}
            </Text>
            <Text variant="display" size="xl" color="main">
              {link.name}
            </Text>
            {link.description && (
              <Text size="sm" color="dim" className="leading-relaxed line-clamp-2">
                {link.description}
              </Text>
            )}
          </Stack>

          <Box
            as="a"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            display="inline-flex" align="center" gap={2} paddingX={6} paddingY={3} radius="xl" surface="surface" border className="hover:border-accent/50 hover:bg-surface-alt font-bold transition-all w-fit"
          >
            <span>{cta}</span>
            <ExternalLink size={14} className="text-accent" />
          </Box>
        </Stack>
      </Stack>
    </ArticleCard>
  );
}
