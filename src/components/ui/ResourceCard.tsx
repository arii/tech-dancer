import { NavLink } from 'react-router-dom';
import { Box, Stack, Text, BaseProps } from '@/layouts/Primitives';
import { pickRest } from '@/lib/utils';
import { CONTENT_METADATA_KEYS } from '@/lib/constants';
import { affiliateManager } from '@/lib/affiliateManager';
import { ASSET_PREFIX } from '@/config/constants';

import { Star, ArrowRight, ExternalLink, ShoppingBag } from 'lucide-react';
import { CategoryPlaceholder } from './CategoryPlaceholder';

export type ResourceKind =
  | "article"
  | "guide"
  | "affiliate-product"
  | "boomtick-merch"
  | "event-guide"
  | "tool";

export type ResourceSource =
  | "editorial"
  | "affiliate"
  | "printful"
  | "internal";

interface ResourceCardProps extends BaseProps {
  id?: string;
  slug?: string;
  title: string;
  category: string;
  excerpt: string;
  basePath?: string;
  rating?: number;
  verdict?: string;
  image?: string;
  affiliateIds?: string[];
  kind?: ResourceKind;
  source?: ResourceSource;
  href?: string;
  [key: string]: unknown;
}

export function ResourceCard(props: ResourceCardProps) {
  const {
    id,
    slug,
    title,
    category,
    excerpt,
    rating,
    verdict,
    image: propsImage,
    affiliateIds,
    kind = 'article',
    source = 'editorial',
    href,
    basePath = '/resources'
  } = props;

  const rest = pickRest(props, [
    ...CONTENT_METADATA_KEYS,
    'basePath',
    'affiliateIds',
    'kind',
    'source',
    'href'
  ] as (keyof ResourceCardProps)[]);

  // Resolve link
  let resolvedHref = href;
  if (!resolvedHref) {
    if (kind === 'affiliate-product') {
      const affiliateId = affiliateIds?.[0] || id;
      resolvedHref = affiliateManager.resolveResourceHref({
        id: affiliateId,
        gearSlug: slug
      });
    } else {
      // Articles, guides, event-guides, tools etc. should use the basePath
      resolvedHref = `${basePath}/${slug || id}`;
    }
  }

  const isInternal = resolvedHref.startsWith('/') || (kind === 'article' || kind === 'guide' || kind === 'event-guide' || kind === 'tool');
  const isMerch = source === 'printful' || kind === 'boomtick-merch';

  // Final Link
  const finalHref = (isInternal && !resolvedHref.startsWith('/'))
    ? `${basePath}/${slug || id}`
    : resolvedHref;

  // Image normalization
  const image = propsImage?.startsWith('/') && !propsImage.startsWith(ASSET_PREFIX)
    ? `${ASSET_PREFIX}${propsImage}`
    : propsImage;

  const getCTAText = () => {
    switch (kind) {
      case 'article': return 'Read guide';
      case 'guide': return 'Read guide';
      case 'event-guide': return 'View event guide';
      case 'affiliate-product': return 'View recommendation';
      case 'boomtick-merch': return 'Shop merch';
      case 'tool': return 'Open tool';
      default: return 'Learn more';
    }
  };

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
      data-testid="resource-card"
      className="group relative bg-surface transition-all duration-300 hover:bg-surface/80 hover:border-accent/30 hover:-translate-y-0.5"
    >
      {isInternal && (
        <Box
          as={NavLink}
          to={finalHref}
          aria-label={`${getCTAText()}: ${title}`}
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
          className="bg-accent text-white backdrop-blur-md shadow-sm"
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
                {getCTAText()}
              </Text>
              <ArrowRight className="w-3 h-3 text-accent" />
            </>
          ) : (
            <Box
              as="a"
              href={finalHref}
              target="_blank"
              rel={isMerch ? "noopener noreferrer" : "sponsored noopener noreferrer"}
              display="flex"
              align="center"
              gap={1}
              className="z-20 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label={`${getCTAText()} on external site`}
            >
              <Text variant="mono" size="sm" weight="font-bold" color="accent" tracking="wide">
                {getCTAText()}
              </Text>
              {isMerch ? <ShoppingBag className="w-3 h-3 text-accent" /> : <ExternalLink className="w-3 h-3 text-accent" />}
            </Box>
          )}
        </Box>
      </Box>
    </Stack>
  );
}
