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
import { BaseCard } from './BaseCard';
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
  verdict?: string;
  image?: string;
  imageFit?: 'contain' | 'cover' | 'fill' | 'scale-down';
  imagePosition?: string;
  imagePadding?: boolean;
  affiliateIds?: string[];
  [key: string]: unknown;
}

const CARD_STYLES = {
  image: "w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-90",
  badge: "bg-accent text-white backdrop-blur-md shadow-sm",
  verdict: "uppercase tracking-widest opacity-90"
};

export function GearCard(props: GearCardProps) {
  const {
    slug,
    title,
    category,
    excerpt,
    verdict,
    image: propsImage,
    affiliateIds,
  } = props;

  const rest = pickRest(props, [
    ...CONTENT_METADATA_KEYS,
    'affiliateIds',
    'imageFit',
    'imagePosition',
    'imagePadding'
  ] as (keyof GearCardProps)[]);

  // Image display options
  const imageFit = props.imageFit || 'contain';
  const imagePosition = props.imagePosition || 'center';
  const shouldPadImage = props.imagePadding !== false;

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
      {...rest}
      direction="col"
      gap={3}
      height="full"
      padding={6}
      to={isInternal ? resolvedHref : undefined}
      href={!isInternal ? resolvedHref : undefined}
      rel={!isInternal ? "noopener noreferrer sponsored" : undefined}
      ariaLabel={isInternal ? `Read gear review: ${title}` : `Open external gear link: ${title}`}
    >
      {/* Image zone */}
      <Box
        position="relative"
        aspect="video"
        overflow="hidden"
        radius="md"
        padding={shouldPadImage ? 4 : 0}
        className={shouldPadImage ? "bg-surface-alt/30" : "bg-surface-alt/20"}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            width={640}
            height={360}
            className={`w-full h-full ${imageFit === 'cover' ? 'object-cover' : 'object-contain'} transition-opacity duration-300 group-hover:opacity-90`}
            style={{ objectPosition: imagePosition }}
          />
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
        {/* Illustration badge for sketches */}
        {image?.includes('/sketches/') && (
          <Box
            position="absolute"
            top={3}
            left={3}
            paddingX={2}
            paddingY={1}
            radius="full"
            opacity={70}
            className="bg-bg/80 text-accent backdrop-blur-md shadow-sm"
          >
            <Text variant="mono" size="micro" weight="font-bold" className="uppercase tracking-wide">
              Illustration
            </Text>
          </Box>
        )}
        {/* Affiliate badges - only "Earns commission" badge stays in image */}
        <Box position="absolute" top={3} right={3} display="flex" gap={2} direction="col" align="end">
          {isExternal && (
            <Box
              paddingX={1.5}
              paddingY={0.5}
              radius="full"
              opacity={70}
              className="bg-accent/60 text-accent-sky backdrop-blur-md shadow-sm"
            >
              <Text variant="mono" size="micro" weight="font-bold" className="uppercase tracking-wide text-xs">
                Earns Commission
              </Text>
            </Box>
          )}
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
        <Box display="flex" align="center" justify="between" gap={2}>
          <Box flex={1}>
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
          </Box>
          <Box
            paddingX={2}
            paddingY={1}
            radius="full"
            className="bg-accent/10 text-accent shrink-0"
          >
            <Text variant="mono" size="micro" weight="font-bold" className="uppercase tracking-wide whitespace-nowrap">
              {category}
            </Text>
          </Box>
        </Box>

        <Text variant="body" size="sm" color="dim" leading="relaxed" className="line-clamp-2">
          {excerpt}
        </Text>
      </Stack>

      <Box display="flex" align="center" justify="end" marginTop="auto" paddingTop={3} border="t" className="border-line/30">
        <Box display="flex" align="center" gap={1.5} className="group-hover:translate-x-1 transition-transform">
          <Text variant="body" size="sm" weight="font-semibold" color="accent" className="font-semibold">
            {isExternal ? "View product" : "Read review"}
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
