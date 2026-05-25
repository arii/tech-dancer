// impeccable-ignore-file
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text, BaseProps } from '@/layouts/Primitives';
import { pickRest } from '@/lib/utils';
import { CONTENT_METADATA_KEYS } from '@/lib/constants';
import { affiliateManager } from '@/lib/affiliateManager';

import { Star, ArrowRight, ExternalLink } from 'lucide-react';
import { CategoryPlaceholder } from './CategoryPlaceholder';

interface GearCardProps extends BaseProps {
  slug?: string;
  title: string;
  category: string;
  excerpt: string;
  basePath?: string;
  rating?: number;
  verdict?: string;
  image?: string;
  affiliateIds?: string[];
  variant?: 'default' | 'minimal';
  href?: string;
  [key: string]: unknown;
}

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
    variant = 'default',
    href,
  } = props;

  const rest = pickRest(props, [
    ...CONTENT_METADATA_KEYS,
    'basePath',
    'affiliateIds',
    'variant',
    'href'
  ] as (keyof GearCardProps)[]);

  // Resolve link: prioritization check
  const affiliateId = affiliateIds?.[0];
  const resolvedHref = href || affiliateManager.resolveResourceHref({
    id: affiliateId,
    gearSlug: slug
  });

  const isInternal = resolvedHref.startsWith('/');
  const affiliate = affiliateManager.getLink(affiliateId);

  // Ensure image is normalized with ASSET_PREFIX if it's a root-relative path
  const rawImage = propsImage || affiliate?.image;
  const image = (rawImage && rawImage.startsWith('/') && !rawImage.startsWith(import.meta.env.BASE_URL))
    ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}${rawImage}`
    : rawImage;

  if (variant === 'minimal') {
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
        {...rest}
      >
        <Stack gap={2} flex={1}>
          <Box display="flex" align="center" justify="between">
            <Text variant="mono" size="xs" weight="font-bold" color="accent" uppercase tracking="widest">
              {category}
            </Text>
            <ExternalLink className="w-4 h-4 text-accent opacity-30 group-hover:opacity-100 transition-opacity" />
          </Box>

          <Text variant="body" size="base" weight="font-bold" className="group-hover:text-accent transition-colors">
            <a href={resolvedHref} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
              {title}
            </a>
          </Text>

          <Text variant="body" size="xs" color="dim" className="line-clamp-2 leading-relaxed">
            {excerpt}
          </Text>
        </Stack>
      </Box>
    );
  }

  return (
    <Stack
      as="article"
      {...rest}
      direction="col"
      gap={3}
      height="full"
      padding={6}
      radius="lg"
      border
      data-testid="gear-card"
      className="group relative bg-surface transition-all duration-300 hover:bg-surface/80 hover:border-accent/30 hover:-translate-y-0.5"
    >
      {isInternal && (
        <Box
          as={NavLink}
          to={resolvedHref}
          aria-label={`Read gear review: ${title}`}
          data-testid="gear-card-link"
          className="absolute inset-0 z-10"
        />
      )}
      {verdict && (
        <Box display="flex" justify="end">
          <Text variant="mono" size="xs" color="body">
            Best for: {verdict}
          </Text>
        </Box>
      )}

      {/* Image zone */}
      <Box
        position="relative"
        aspect="video"
        overflow="hidden"
        radius="md"
        className="bg-surface-alt/20"
      >
        {image ? (
          <img src={image} alt={title} width={800} height={800} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
          <Box display="flex" align="center" gap={1}>
            <Star size={16} className="text-accent fill-accent" />
            <Text variant="mono" size="xs" weight="font-bold">
              {rating.toFixed(1)}/5
            </Text>
          </Box>
        )}
        <Box display="flex" align="center" gap={1}>
          {isInternal ? (
            <>
              <Text variant="mono" size="sm" weight="font-bold" color="accent" tracking="wide">
                Read review
              </Text>
              <ArrowRight className="w-3 h-3 text-accent" />
            </>
          ) : (
            <Box
              as="a"
              href={resolvedHref}
              target="_blank"
              rel="sponsored noopener noreferrer"
              display="flex"
              align="center"
              gap={1}
              className="z-20 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label={`View ${title} on external site`}
              data-testid="gear-card-store-link"
            >
              <Text variant="mono" size="sm" weight="font-bold" color="accent" tracking="wide">
                View store
              </Text>
              <ExternalLink className="w-3 h-3 text-accent" />
            </Box>
          )}
        </Box>
      </Box>
    </Stack>
  );
}
