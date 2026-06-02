import { ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { affiliateManager } from '@/lib/affiliateManager';
import { AffiliateLink } from '@/types';

interface CompactAffiliateLinkProps {
  link: AffiliateLink;
}

export function CompactAffiliateLink({ link }: CompactAffiliateLinkProps) {
  const href = affiliateManager.resolveResourceHref({ id: link.id });
  const isExternal = href.startsWith('http');

  return (
    <Box
      as={isExternal ? 'a' : Link}
      {...(isExternal ? { href, target: '_blank', rel: 'noopener noreferrer sponsored' } : { to: href })}
      display="flex"
      align="center"
      justify="between"
      paddingX={4}
      paddingY={3}
      radius="md"
      border
      className="group/item hover:border-accent transition-colors bg-surface-alt/10"
    >
      <Stack direction="row" align="center" gap={3}>
        <Box padding={1.5} radius="sm" surface="muted" className="group-hover/item:text-accent transition-colors">
          <Text variant="mono" size="xs" weight="font-bold">
            {link.category?.toUpperCase() || 'GEAR'}
          </Text>
        </Box>
        <Text variant="body" size="sm" weight="font-bold" className="group-hover/item:text-accent transition-colors">
          {link.name}
        </Text>
      </Stack>
      {isExternal ? (
        <ExternalLink className="w-3.5 h-3.5 text-dim group-hover/item:text-accent transition-colors" />
      ) : (
        <ArrowRight className="w-3.5 h-3.5 text-dim group-hover/item:text-accent transition-colors" />
      )}
    </Box>
  );
}
