import { Box, Stack, Text, BaseProps } from '@/layouts/Primitives';
import { BaseCard } from './BaseCard';
import { SourceBadge } from './SourceBadge';
import { pickRest } from '@/lib/utils';
import { CONTENT_METADATA_KEYS } from '@/lib/constants';
import { ExternalLink } from 'lucide-react';
import { CategoryPlaceholder } from './CategoryPlaceholder';

interface MerchCardProps extends BaseProps {
  slug?: string;
  title: string;
  category: string;
  excerpt: string;
  image?: string;
  shopUrl: string;
  [key: string]: unknown;
}

const CARD_STYLES = {
  image: "w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 aspect-video",
};

/**
 * MerchCard for BoomTick Printful items.
 * 
 * Distinct from affiliate gear cards:
 * - CTA is always "Shop merch"
 * - Links directly to Printful shop URL
 * - Source badge shows "BoomTick Printful merch"
 * - Simplified layout (no rating badges)
 */
export function MerchCard(props: MerchCardProps) {
  const {
    slug,
    title,
    category,
    excerpt,
    image,
    shopUrl,
  } = props;

  const rest = pickRest(props, [
    ...CONTENT_METADATA_KEYS,
    'shopUrl'
  ] as (keyof MerchCardProps)[]);

  return (
    <BaseCard
      {...rest}
      direction="col"
      gap={3}
      height="full"
      padding={6}
      href={shopUrl}
      target="_blank"
      rel="noopener noreferrer"
      ariaLabel={`Shop BoomTick merch: ${title}`}
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
        <Box position="absolute" top={3} right={3}>
          <Box
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

        {/* Source badge */}
        <SourceBadge type="merch" position="bottom-left" />
      </Box>

      {/* Content */}
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

        <Text variant="body" size="sm" color="dim" leading="relaxed" className="line-clamp-2">
          {excerpt}
        </Text>
      </Stack>

      {/* CTA */}
      <Box display="flex" align="center" justify="end" marginTop="auto" paddingTop={3} border="t" className="border-line/30">
        <Box display="flex" align="center" gap={1.5} className="group-hover:translate-x-1 transition-transform">
          <Text variant="body" size="sm" weight="font-semibold" color="accent" className="font-semibold">
            Shop merch
          </Text>
          <ExternalLink className="w-4 h-4 text-accent" aria-hidden="true" />
        </Box>
      </Box>
    </BaseCard>
  );
}
