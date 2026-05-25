// impeccable-ignore-file
import { Box, Stack, Text, BaseProps } from '@/layouts/Primitives';
import { BaseCard } from './BaseCard';
import { pickRest, cn } from '@/lib/utils';
import { CONTENT_METADATA_KEYS } from '@/lib/constants';
import { affiliateManager } from '@/lib/affiliateManager';

import { Star, ArrowRight, ExternalLink } from 'lucide-react';
import { CategoryPlaceholder } from './CategoryPlaceholder';

interface GearCardProps extends BaseProps {
  slug?: string;
  title: string;
  category: string;
  excerpt: string;
  rating?: number;
  verdict?: string;
  image?: string;
  affiliateIds?: string[];
  [key: string]: unknown;
}

const CARD_STYLES = {
  image: "w-full h-full object-cover object-center-20 transition-transform duration-500 group-hover:scale-105 aspect-video",
  badge: "bg-accent text-white backdrop-blur-md shadow-sm",
  verdict: "uppercase tracking-widest opacity-90"
};

export function GearCard(props: GearCardProps) {
  const {
    slug,
    title,
    category,
    excerpt,
    rating,
    verdict,
    image: propsImage,
    affiliateIds,
  } = props;

  const rest = pickRest(props, [
    ...CONTENT_METADATA_KEYS,
    'affiliateIds'
  ] as (keyof GearCardProps)[]);

  // Resolve link: prioritization check
  const affiliateId = affiliateIds?.[0];
  const resolvedHref = affiliateManager.resolveResourceHref({
    id: affiliateId,
    gearSlug: slug
  });

  const isExternal = /^https?:\/\//.test(resolvedHref);
  const isInternal = !isExternal;
  const affiliate = affiliateManager.getLink(affiliateId);

  // Ensure image is normalized with ASSET_PREFIX if it's a root-relative path
  const rawImage = propsImage || affiliate?.image;
  const image = (rawImage && rawImage.startsWith('/') && !rawImage.startsWith(import.meta.env.BASE_URL))
    ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}${rawImage}`
    : rawImage;

  return (
    <BaseCard
      as="article"
      href={resolvedHref}
      isExternal={isExternal}
      ariaLabel={isExternal ? `Open external gear link: ${title}` : `Read gear review: ${title}`}
      {...rest}
      direction="col"
      gap={3}
      height="full"
      padding={6}
    >
      {/* Image zone */}
      <Box
        position="relative"
        aspect="video"
        overflow="hidden"
        radius="md"
        className="bg-surface-alt/20"
      >
        {image ? (
          <img src={image} alt={title} width={640} height={360} className={CARD_STYLES.image} />
        ) : (
          <CategoryPlaceholder category={category} />
        )}
        {/* Dark overlay */}
        <Box
          position="absolute"
          inset
          className="bg-black/15 pointer-events-none"
          aria-hidden="true"
        />
        {/* Category badge */}
        <Box
          position="absolute"
          top={3}
          right={3}
          paddingX={2}
          paddingY={1}
          radius="full"
          opacity={80}
          className="bg-accent text-bg backdrop-blur-md shadow-sm"
        >
          <Text variant="mono" size="micro" weight="font-bold" className="uppercase tracking-wide">
            {category}
          </Text>
        </Box>
      </Box>
      <Stack gap={2}>
        {verdict && (
          <Box marginBottom={2}>
            <Text variant="mono" size="xs" weight="font-bold" color="main" className={CARD_STYLES.verdict}>
              Best for: {verdict}
            </Text>
          </Box>
        )}
        <Text
          as="h3"
          variant="body"
          size="lg"
          weight="font-bold"
            color="main"
            leading="tight"
            className="group-hover:text-accent transition-colors line-clamp-2"
        >
          {title}
        </Text>

        <Text variant="body" size="sm" color="dim" leading="relaxed" className="line-clamp-3">
           {excerpt}
        </Text>
      </Stack>

      <Box display="flex" align="center" justify="between" marginTop="auto" paddingTop={3} border="t" className="border-line/30">
        {rating !== undefined && (
          <Box display="flex" align="center" gap={1.5}>
            <Star size={14} className="text-accent fill-accent" aria-hidden="true" />
            <Text variant="mono" size="xs" weight="font-bold" color="accent">
              {rating.toFixed(1)}/5
            </Text>
          </Box>
        )}
        <Box display="flex" align="center" gap={1.5} className="group-hover:translate-x-1 transition-transform">
          <Text variant="mono" size="sm" weight="font-bold" color="accent" tracking="wide" className="uppercase">
            {isExternal ? "View deal" : "Read review"}
          </Text>
          {isExternal ? (
            <ExternalLink className="w-4 h-4 text-accent" aria-hidden="true" />
          ) : (
            <ArrowRight className="w-4 h-4 text-accent" aria-hidden="true" />
          )}
        </Box>
      </Box>
    </BaseCard>
  );
}
