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
  imageMode?: 'wide' | 'contain' | 'apparel' | 'square' | 'frontBack' | 'cover';
  imagePosition?: 'center' | 'top' | 'bottom' | 'left' | 'right' | string;
  affiliateIds?: string[];
  variant?: 'standard' | 'featured';
  [key: string]: unknown;
}

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
    imageMode: propsImageMode,
    imagePosition: propsImagePosition,
    affiliateIds,
    variant = 'standard',
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

  // Resolve image mode and position.
  const mode = (propsImageMode || affiliate?.imageMode || 'cover') as GearCardProps['imageMode'] & string;

  // We use 'center 20%' as default for cover mode to prioritize the top-middle area
  // of Amazon product photos, which often puts the item (like shoes or shirts)
  // in a better visual frame than a strict center crop.
  const position = propsImagePosition || affiliate?.imagePosition || (mode === 'cover' ? 'center 20%' : 'center');

  // Explicitly map image modes to their corresponding object-fit behavior.
  const OBJECT_FIT_MAP: Record<string, "contain" | "cover"> = {
    contain: 'contain',
    apparel: 'contain',
    wide: 'cover',
    square: 'cover',
    cover: 'cover',
    frontBack: 'contain'
  };

  const imageProps = {
    objectFit: OBJECT_FIT_MAP[mode] || 'cover',
    objectPosition: position,
  };

  const imageFrame = (
    <Box
      as={isExternal ? "a" : NavLink}
      {...(isExternal ? {
        href: resolvedHref,
        target: "_blank",
        rel: "noopener noreferrer sponsored",
        "aria-label": `View ${title} on Amazon`
      } : {
        to: resolvedHref
      })}
      position="relative"
      aspect={variant === 'featured' ? 'video' : 'auto'}
      overflow="hidden"
      radius="md"
      bg="surface-alt"
      opacity="low"
      display="block"
      className="outline-none focus-visible:ring-2 focus-visible:ring-accent-brand/40"
    >
      {image ? (
        <Box
          as="img"
          src={image}
          alt={alt}
          width={16}
          height={9}
          transition="transform"
          className="w-full h-full duration-500 group-hover:scale-105"
          {...imageProps}
        />
      ) : (
        <CategoryPlaceholder category={category} />
      )}
      {/* Dark overlay for consistent look */}
      <Box
        position="absolute"
        inset
        bg="neutral"
        pointerEvents="none"
        opacityVariant="ghost"
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
        shadow="sm"
        bg="accent"
        className="backdrop-blur-md"
      >
        <Text
          variant="mono"
          size="micro"
          weight="font-bold"
          uppercase
          tracking="wide"
          color="bg"
        >
          {category}
        </Text>
      </Box>
    </Box>
  );

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
      surface="default"
      className="group relative transition-all duration-200 hover:border-accent/40"
    >
      {/* Image zone */}
      {imageFrame}

      <Stack gap={2}>
        {verdict && (
          <Box marginBottom={2}>
            <Text
              variant="mono"
              size="xs"
              weight="font-bold"
              color="main"
              uppercase
              tracking="widest"
            >
              Best for: {verdict}
            </Text>
          </Box>
        )}
        {/* Title with link for external affiliates */}
        {isExternal ? (
          <Box as="h3">
            <Box
              as="a"
              href={resolvedHref}
              target="_blank"
              rel="noopener noreferrer sponsored"
              display="block"
              className="outline-none focus-visible:ring-2 focus-visible:ring-accent-brand/40 hover:underline"
            >
              <Text
                variant="body"
                size="lg"
                weight="font-bold"
                color="main"
                leading="tight"
                hoverColor="accent"
                clamp={2}
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
            hoverColor="accent"
            clamp={2}
          >
            {title}
          </Text>
        )}

        <Text variant="body" size="sm" color="dim" leading="relaxed" className="line-clamp-3">
           {excerpt}
        </Text>
      </Stack>

      <Box
        display="flex"
        align="center"
        justify="between"
        marginTop="auto"
        paddingTop={3}
        border="t"
        className="border-line/30"
      >
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
            height={{ base: 12, md: "auto" }}
            className="group-hover:translate-x-1 transition-all outline-none focus-visible:ring-2 focus-visible:ring-accent-brand/40"
          >
            <Text
              variant="mono"
              size="sm"
              weight="font-bold"
              color="accent"
              tracking="wide"
              uppercase
            >
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
            height={{ base: 12, md: "auto" }}
            className="group-hover:translate-x-1 transition-all outline-none focus-visible:ring-2 focus-visible:ring-accent-brand/40"
          >
            <Text
              variant="mono"
              size="sm"
              weight="font-bold"
              color="accent"
              tracking="wide"
              uppercase
            >
              Read review
            </Text>
            <ArrowRight className="w-4 h-4 text-accent" aria-hidden="true" />
          </Box>
        )}
      </Box>
    </Stack>
  );
}
