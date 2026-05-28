import { Box, Text } from '@/layouts/Primitives';
import { ASSET_PREFIX } from '@/config/constants';
import type {
  MerchImageDisplayMode,
  MerchProductImage,
} from '@/data/products/catalog';
import { resolveMerchImages } from '@/lib/merch/imageDisplay';
import { cn } from '@/lib/utils';

interface MerchImageDisplayProps {
  title: string;
  href: string;
  imageUrl: string;
  images?: MerchProductImage[];
  imageDisplayMode?: MerchImageDisplayMode;
}

function resolveImageSrc(src: string) {
  if (src.startsWith('http')) return src;
  return `${ASSET_PREFIX}${src}`;
}

interface ImageLinkProps {
  href: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

const ImageLink = ({
  href,
  title,
  children,
  className,
  ariaLabel,
}: ImageLinkProps) => (
  <a
    href={href}
    rel="sponsored noopener noreferrer"
    target="_blank"
    aria-label={ariaLabel || `View ${title} on Printful`}
    className={cn(
      'block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent overflow-hidden',
      className
    )}
  >
    {children}
  </a>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <Box
    position="absolute"
    bottom={2}
    right={2}
    paddingX={1.5}
    paddingY={0.5}
    radius="sm"
    className="bg-surface/80 backdrop-blur-sm border border-line/20"
  >
    <Text size="micro" weight="font-bold" color="dim" uppercase tracking="wider">
      {children}
    </Text>
  </Box>
);

export function MerchImageDisplay({
  title,
  href,
  imageUrl,
  images,
  imageDisplayMode,
}: MerchImageDisplayProps) {
  const resolved = resolveMerchImages({
    title,
    imageUrl,
    images,
    imageDisplayMode,
  });

  if (resolved.mode === 'both-equal') {
    return (
      <Box
        display="grid"
        gridCols={{ base: 2 }}
        gap={2}
        height={{ base: 72, md: 80 }}
      >
        {resolved.equal.map((img, idx) => (
          <ImageLink
            key={img.src + idx}
            href={href}
            title={title}
            className="relative h-full border border-line/20 bg-surface-alt/35"
          >
            <Box
              as="img"
              src={resolveImageSrc(img.src)}
              alt={img.alt}
              maxWidth="full"
              maxHeight="full"
              padding={2}
              className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
            />
            <Label>{img.side}</Label>
          </ImageLink>
        ))}
      </Box>
    );
  }

  if (resolved.mode === 'front-prominent' || resolved.mode === 'back-prominent') {
    return (
      <Box
        position="relative"
        height={{ base: 72, md: 80 }}
      >
        <ImageLink href={href} title={title} className="h-full border border-line/20 bg-surface-alt/35">
          {resolved.primary && (
            <Box
              as="img"
              src={resolveImageSrc(resolved.primary.src)}
              alt={resolved.primary.alt}
              maxWidth="full"
              maxHeight="full"
              padding={4}
              className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
            />
          )}
        </ImageLink>

        {resolved.secondary && (
          <Box
            position="absolute"
            bottom={3}
            right={3}
            width={24}
            height={24}
            radius="md"
            className="z-20 shadow-lg border-2 border-surface bg-surface-alt"
          >
            <ImageLink href={href} title={title} className="h-full">
              <Box
                as="img"
                src={resolveImageSrc(resolved.secondary.src)}
                alt={resolved.secondary.alt}
                maxWidth="full"
                maxHeight="full"
                padding={1}
                className="h-full w-full object-contain transition-transform duration-300 hover:scale-110"
              />
              <Label>{resolved.secondary.side}</Label>
            </ImageLink>
          </Box>
        )}
      </Box>
    );
  }

  // Single mode (default)
  return (
    <Box
      position="relative"
      height={{ base: 72, md: 80 }}
    >
      <ImageLink href={href} title={title} className="h-full border border-line/20 bg-surface-alt/35">
        {resolved.primary && (
          <Box
            as="img"
            src={resolveImageSrc(resolved.primary.src)}
            alt={resolved.primary.alt}
            maxWidth="full"
            maxHeight="full"
            padding={4}
            className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
          />
        )}
        {resolved.primary?.side === 'back' && <Label>Back</Label>}
      </ImageLink>
    </Box>
  );
}
