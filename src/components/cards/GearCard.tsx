// impeccable-ignore-file
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text, BaseProps } from '@/layouts/Primitives';
import { pickRest, cn } from '@/lib/utils';
import { CONTENT_METADATA_KEYS } from '@/lib/constants';
import { affiliateManager } from '@/lib/affiliateManager';

import { Star, ArrowRight, ExternalLink, ShoppingCart } from 'lucide-react';
import { CategoryPlaceholder } from '../ui/CategoryPlaceholder';

interface GearCardProps extends BaseProps {
  slug?: string;
  title: string;
  category: string;
  excerpt: string;
  rating?: number;
  verdict?: string;
  image?: string;
  affiliateIds?: string[];
  price?: string;
  roles?: string[];
  tags?: string[];
  href?: string;
  disclosure?: 'sponsored' | 'owned-printful';
  [key: string]: unknown;
}

const CARD_STYLES = {
  container: cn(
    "group relative bg-surface transition-all duration-300",
    "hover:bg-surface/80 hover:border-accent/30 hover:-translate-y-0.5"
  ),
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
    price,
    roles,
    tags,
    href,
    disclosure,
  } = props;

  const isMerch = disclosure === 'owned-printful' || !!price;

  const rest = pickRest(props, [
    ...CONTENT_METADATA_KEYS,
    'affiliateIds',
    'price',
    'roles',
    'tags',
    'href',
    'disclosure',
    'data-testid'
  ] as (keyof GearCardProps)[]);

  // Resolve link: prioritization check
  const affiliateId = affiliateIds?.[0];
  const resolvedHref = href || affiliateManager.resolveResourceHref({
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

  const getCtaText = () => {
    if (isMerch) return "SEE COLORS";
    if (isExternal) return "VIEW DEAL";
    return "READ REVIEW";
  };

  const Icon = isMerch ? ShoppingCart : isExternal ? ExternalLink : ArrowRight;

  return (
    <Stack
      as="article"
      {...rest}
      data-testid={props["data-testid"] || (isMerch ? "product-card" : undefined)}
      direction="col"
      gap={3}
      height="full"
      padding={6}
      radius="lg"
      border
      className={CARD_STYLES.container}
    >
      {isInternal ? (
        <Box
          as={NavLink}
          to={resolvedHref}
          aria-label={`Read gear review: ${title}`}
          className="absolute inset-0 z-10 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 rounded-lg"
        />
      ) : (
        <Box
          as="a"
          href={resolvedHref}
          target="_blank"
          rel={disclosure === 'owned-printful' ? "noopener noreferrer" : "noopener noreferrer sponsored"}
          aria-label={`${isMerch ? 'Buy' : 'Open external link'}: ${title}`}
          className="absolute inset-0 z-10 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 rounded-lg"
        />
      )}

      {/* Image zone */}
      {(image || !isInternal) && (
        <Box
          position="relative"
          aspect="video"
          maxHeight={isMerch ? { base: 56, lg: 72 } : undefined}
          overflow="hidden"
          radius="md"
          className={isMerch ? "bg-surface-alt/35" : "bg-surface-alt/20"}
        >
          {image ? (
            <Box
              as="img"
              src={image}
              alt={title}
              width="full"
              height="full"
              padding={isMerch ? 4 : 0}
              className={cn(
                "h-full w-full transition-transform duration-500 group-hover:scale-105",
                isMerch ? "object-contain" : "object-cover object-center-20"
              )}
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

          {/* Price badge */}
          {price && (
            <Box
              position="absolute"
              top={3}
              right={3}
              paddingX={2}
              paddingY={1}
              radius="full"
              opacity={80}
              zIndex={20}
              className="bg-accent text-white backdrop-blur-md shadow-sm"
            >
              <Text variant="mono" size="micro" weight="font-black" uppercase tracking="wide">
                {price.includes('$') ? price : `$${price}`}
              </Text>
            </Box>
          )}

          {/* Category badge (if no price) */}
          {!price && (
            <Box
              position="absolute"
              top={3}
              right={3}
              paddingX={2}
              paddingY={1}
              radius="full"
              opacity={80}
              zIndex={20}
              className="bg-accent text-bg backdrop-blur-md shadow-sm"
            >
              <Text variant="mono" size="micro" weight="font-bold" className="uppercase tracking-wide">
                {category}
              </Text>
            </Box>
          )}

          {/* Roles badges */}
          {roles && (
            <Box position="absolute" bottom={3} left={3} zIndex={20}>
              <Stack direction="row" gap={1}>
                {roles.map((role) => (
                  <Box
                    key={role}
                    paddingX={2}
                    paddingY={0.5}
                    radius="full"
                    surface={role === 'lead' ? 'accent' : role === 'follow' ? 'warning' : role === 'switch' ? 'alt' : 'default'}
                    bgOpacity={80}
                    className="font-mono font-bold uppercase tracking-wider backdrop-blur-md"
                  >
                    <Text size="micro" as="span" inherit>
                      {role}
                    </Text>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
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
        <Box display="flex" align="center" gap={rating !== undefined ? 4 : 2}>
          {rating !== undefined && (
            <Box display="flex" align="center" gap={1.5}>
              <Star size={14} className="text-accent fill-accent" aria-hidden="true" />
              <Text variant="mono" size="xs" weight="font-bold" color="accent">
                {rating.toFixed(1)}/5
              </Text>
            </Box>
          )}

          {tags && tags.length > 0 && (
            <Stack direction="row" gap={2} wrap="wrap">
              {tags.slice(0, 2).map((tag) => (
                <Text key={tag} variant="mono" size="micro" color="dim" uppercase tracking="tighter" className="opacity-60">
                  {tag}
                </Text>
              ))}
            </Stack>
          )}
        </Box>

        <Box display="flex" align="center" gap={1.5} className="group-hover:translate-x-1 transition-transform">
          <Text variant="mono" size="sm" weight="font-bold" color="accent" tracking="wide" className="uppercase">
            {getCtaText()}
          </Text>
          <Icon className="w-4 h-4 text-accent" aria-hidden="true" />
        </Box>
      </Box>
    </Stack>
  );
}
