import { Link } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { affiliateManager } from '@/lib/affiliateManager';
import { detectContentType, getCtaLabel } from '@/lib/contentTypeDetector';
import type { AffiliateLink } from '@/types';
import { cn } from '@/lib/utils';

export type Product = AffiliateLink;

interface EventProductCardProps {
  product: Product;
  variant?: 'compact' | 'featured';
}

export function EventProductCard({ product, variant = 'compact' }: EventProductCardProps) {
  const href = affiliateManager.resolveResourceHref({ id: product.id, gearSlug: product.gearSlug });
  const isExternal = /^https?:\/\//.test(href);
  const CtaTag = isExternal ? 'a' : Link;
  const ctaProps = isExternal ? { href, rel: 'noopener noreferrer sponsored', target: '_blank' } : { to: href };
  const ctaLabel = getCtaLabel(detectContentType(product), isExternal);

  return (
    <Box as="article" border radius="xl" surface="surface" padding={4} height="full" className="overflow-hidden border-white/10 bg-white/[0.04] shadow-sm transition-all hover:-translate-y-0.5 hover:border-cyan-400/30 hover:shadow-lg">
      <Stack direction="col" gap={3} height="full">
        <Box className={cn('w-full h-32 md:h-36 rounded-xl bg-slate-900/55 ring-1 ring-white/10 overflow-hidden shrink-0')}>
          {product.image ? (
            <Box as={isExternal ? 'a' : Link} href={isExternal ? href : undefined} to={!isExternal ? href : undefined} rel={isExternal ? 'noopener noreferrer sponsored' : undefined} target={isExternal ? '_blank' : undefined} display="flex" height="full" width="full" className="hover:opacity-90 transition-opacity">
              <Box padding={6} width="full" height="full" display="flex" align="center" justify="center">
                <img src={product.image} alt={product.name} className="max-h-full w-4/5 object-contain mix-blend-multiply" loading="lazy" />
              </Box>
            </Box>
          ) : (
            <Box display="flex" align="center" justify="center" height="full" padding={3}>
              <Text variant="mono" size="xs" color="dim" uppercase>{product.category}</Text>
            </Box>
          )}
        </Box>

        <Stack gap={2} height="full" flex={1} justify="between" minWidth="0">
          <Stack gap={1} minWidth="0">
            <Text as="h3" size={variant === 'featured' ? 'lg' : 'base'} weight="font-bold" color="white" clamp={2} className="leading-snug">
              {product.name}
            </Text>
            <Text size="sm" color="dim" clamp={2} className="leading-6">
              {product.description}
            </Text>
          </Stack>

          <Text as={CtaTag} variant="mono" size="sm" weight="font-semibold" color="accent" className={cn(!isExternal && 'hover:underline')} {...ctaProps}>
            {ctaLabel}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
