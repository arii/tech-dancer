import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Resource } from '@/lib/types/content';
import { getMerchImageConfig, legacyImageToMerchImages } from '@/lib/merch/imageDisplay';
import { MerchImageSingle, MerchImagePair, MerchImageFeatured } from '@/components/ui/merch/MerchImageDisplay';

// impeccable-ignore-file - Component renders dynamic markdown HTML content

interface MerchPostDetailProps {
  post: Resource;
  onBack: () => void;
  backLabel: string;
}

export function MerchPostDetail({
  post,
  onBack,
  backLabel,
}: MerchPostDetailProps) {
  // Normalize images: use new format if available, fall back to legacy
  const normalizedImages = post.images || legacyImageToMerchImages(post.image, post.imageBack);

  // Determine display configuration
  const config = getMerchImageConfig(normalizedImages, post.displayMode, post.featuredSide);

  // Render image based on display mode
  const renderImage = () => {
    if (config.displayMode === 'pair' && config.primary && config.secondary) {
      return <MerchImagePair images={[config.primary, config.secondary]} />;
    }

    if (config.displayMode === 'featured' && config.primary) {
      return <MerchImageFeatured primary={config.primary} secondary={config.secondary} />;
    }

    if (config.primary) {
      return <MerchImageSingle image={config.primary} />;
    }

    return <Box className="w-full aspect-video bg-surface-alt rounded-lg" />;
  };

  return (
    <Box padding="panel">
      <Stack gap={8} maxWidth="3xl">
        {/* Back button */}
        <Box
          as="button"
          onClick={onBack}
          display="flex"
          align="center"
          gap={2}
          className="group hover:text-accent transition-colors text-dim"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <Text variant="mono" size="xs" weight="font-semibold" uppercase>
            {backLabel}
          </Text>
        </Box>

        {/* Product Title */}
        <Stack gap={3}>
          <Box display="flex" align="center" gap={3} wrap>
            <Text as="h1" variant="display" size="2xl" weight="font-bold">
              {post.title}
            </Text>
            {post.category && (
              <Box
                paddingX={2}
                paddingY={1}
                radius="full"
                className="bg-accent/10 text-accent"
              >
                <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="wide">
                  {post.category}
                </Text>
              </Box>
            )}
          </Box>

          {post.excerpt && (
            <Text variant="body" size="lg" color="dim" leading="relaxed">
              {post.excerpt}
            </Text>
          )}
        </Stack>

        {/* Product Image */}
        <Box marginY={4}>
          {renderImage()}
        </Box>

        {/* Product Content */}
        {post.content && (
          <Stack gap={4} className="prose prose-invert max-w-none">
            {/* impeccable-ignore - Dynamic HTML content from markdown rendering */}
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="text-main leading-relaxed"
            />
          </Stack>
        )}

        {/* Shop Button */}
        {post.shopUrl && (
          <Box marginTop={8}>
            <Box
              as="a"
              href={post.shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              paddingX={6}
              paddingY={3}
              radius="lg"
              display="flex"
              align="center"
              gap={2}
              width="fit"
              className="bg-accent text-bg hover:bg-accent/90 transition-colors font-semibold"
            >
              Shop Now
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </Box>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
