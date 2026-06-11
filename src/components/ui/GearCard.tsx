// impeccable-ignore-file

/**
 * GearCard component for displaying gear items in grid/list view.
 *
 * NOTE: Star rating display has been removed from the card footer pending
 * Amazon affiliate approval for dynamic content updates. This prevents showing
 * static editorial ratings that could conflict with live Amazon reviews.
 *
 * The component still accepts a rating property for backward compatibility,
 * but it is not displayed. See ResourceGrid.tsx for dynamic rating integration
 * once affiliate approval is obtained.
 *
 * Reference: https://github.com/arii/tech-dancer/issues/1604
 */
import { Box, Stack, Text, BaseProps } from '@/layouts/Primitives';
import { NavLink } from 'react-router-dom';
import { pickRest } from '@/lib/utils';
import { CONTENT_METADATA_KEYS } from '@/lib/constants';
import { affiliateManager } from '@/lib/affiliateManager';

import { ArrowRight, ExternalLink } from 'lucide-react';
import { CategoryPlaceholder } from './CategoryPlaceholder';

interface GearCardProps extends BaseProps {
  slug?: string;
  title: string;
  category: string;
  excerpt: string;
  rating?: number;
  verdict?: string;
  image?: string;
  imageAlt?: string;
  affiliateIds?: string[];
  [key: string]: unknown;
}

const CARD_STYLES = {
  image: "w-full h-full object-cover object-center-20 transition-transform duration-500 group-hover:scale-105 aspect-video",
  badge: "bg-accent text-white backdrop-blur-md shadow-sm",
  verdict: "uppercase tracking-widest opacity-solid"
};

export function GearCard(props: GearCardProps) {
  const {
    slug,
    title,
    category,
    excerpt,
    rating: _rating,
    verdict,
    image: propsImage,
    imageAlt: propsImageAlt,
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

  // Internal links should always start with / (they are resolve by the router)
  // while external links will start with http
  const isExternal = resolvedHref.startsWith('http');
  const affiliate = affiliateManager.getLink(affiliateId);

  // Ensure image is normalized with ASSET_PREFIX if it's a root-relative path
  const rawImage = propsImage || affiliate?.image;
  const image = (rawImage && rawImage.startsWith('/') && !rawImage.startsWith(import.meta.env.BASE_URL))
    ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}${rawImage}`
    : rawImage;

  const alt = propsImageAlt || (title ? `Screenshot of the ${title} gear item` : "Gear item preview");

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
      className="group relative bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40"
    >
      {/* Image zone - with explicit link for external affiliates */}
      {isExternal ? (
        <Box
          as="a"
          href={resolvedHref}
          target="_blank"
          rel="noopener noreferrer sponsored"
          aria-label={`View ${title} on Amazon`}
          position="relative"
          aspect="video"
          overflow="hidden"
          radius="md"
          className="bg-surface-alt/20 block outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {image ? (
            <img src={image} alt={alt} width={640} height={360} className={CARD_STYLES.image} />
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
            opacityVariant="heavy"
            className="bg-accent text-bg backdrop-blur-md shadow-sm"
          >
            <Text variant="mono" size="micro" weight="font-bold" className="uppercase tracking-wide">
              {category}
            </Text>
          </Box>
        </Box>
      ) : (
        <Box
          as={NavLink}
          to={resolvedHref}
          position="relative"
          aspect="video"
          overflow="hidden"
          radius="md"
          className="bg-surface-alt/20 block outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {image ? (
            <img src={image} alt={alt} width={640} height={360} className={CARD_STYLES.image} />
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
            opacityVariant="heavy"
            className="bg-accent text-bg backdrop-blur-md shadow-sm"
          >
            <Text variant="mono" size="micro" weight="font-bold" className="uppercase tracking-wide">
              {category}
            </Text>
          </Box>
        </Box>
      )}

      <Stack gap={2}>
        {verdict && (
          <Box marginBottom={2}>
            <Text variant="mono" size="xs" weight="font-bold" color="main" className={CARD_STYLES.verdict}>
              Best for: {verdict}
            </Text>
          </Box>
        )}
        {/* Title with link for external affiliates */}
        {isExternal ? (
          <Box
            as="h3"
            className="group-hover:text-accent transition-colors"
          >
            <Box
              as="a"
              href={resolvedHref}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="outline-none focus-visible:ring-2 focus-visible:ring-accent hover:underline"
            >
              <Text
                variant="body"
                size="lg"
                weight="font-bold"
                color="main"
                leading="tight"
                className="group-hover:text-accent transition-colors line-clamp-2"
              >
                {title}
              </Text>
            </Box>
          </Box>
        ) : (
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
        )}

        <Text variant="body" size="sm" color="dim" leading="relaxed" className="line-clamp-3">
           {excerpt}
        </Text>
      </Stack>

      <Box display="flex" align="center" justify="between" marginTop="auto" paddingTop={3} border="t" className="border-line/30">
        {/* View Deal / Read Review button */}
        {isExternal ? (
          <Box
            as="a"
            href={resolvedHref}
            target="_blank"
            rel="noopener noreferrer sponsored"
            display="flex"
            align="center"
            gap={1.5}
            className="group-hover:translate-x-1 transition-transform outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Text variant="mono" size="sm" weight="font-bold" color="accent" tracking="wide" className="uppercase">
              View deal
            </Text>
            <ExternalLink className="w-4 h-4 text-accent" aria-hidden="true" />
          </Box>
        ) : (
          <Box
            as={NavLink}
            to={resolvedHref}
            display="flex"
            align="center"
            gap={1.5}
            className="group-hover:translate-x-1 transition-transform outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Text variant="mono" size="sm" weight="font-bold" color="accent" tracking="wide" className="uppercase">
              Read review
            </Text>
            <ArrowRight className="w-4 h-4 text-accent" aria-hidden="true" />
          </Box>
        )}
      </Box>
    </Stack>
  );
}
