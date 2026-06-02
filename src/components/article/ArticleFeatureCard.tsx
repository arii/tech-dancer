

import { Box, Stack, Text } from '@/layouts/Primitives';
import { ArticleCard } from './ArticleCard';

interface ArticleFeatureCardProps {
  type?: string;
  title?: string;
  subtitle?: string;
  caption?: string;
  image?: string;
  imageBack?: string;
  showImagePair?: boolean;
}

export function ArticleFeatureCard({
  type,
  title,
  subtitle,
  caption,
  image,
  imageBack,
  showImagePair
}: ArticleFeatureCardProps) {
  return (
    <Box className="relative group">
      {/* Card Shell */}
      <ArticleCard className="overflow-hidden">
        {image ? (
          <Box aspect={{ base: "4/3", sm: "video", lg: "4/3" }} overflow="hidden" position="relative">
            {showImagePair && imageBack ? (
              <Box width="full" height="full" display="flex" className="transition-transform duration-700 group-hover:scale-105">
                <Box flex={1} className="border-r border-line/50">
                  <img src={image} alt={title || "Feature visual front"} className="w-full h-full object-contain" />
                </Box>
                <Box flex={1}>
                  <img src={imageBack} alt={title || "Feature visual back"} className="w-full h-full object-contain" />
                </Box>
              </Box>
            ) : (
              <img
                src={image}
                alt={title || "Feature visual"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <Box className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
          </Box>
        ) : (
          <Box aspect={{ base: "4/3", sm: "video", lg: "4/3" }} surface="surface" display="flex" align="center" justify="center" overflow="hidden" position="relative" className="border-b border-line/50">
             {/* Simplified Fallback pattern */}
             <Box className="absolute inset-0 opacity-20 bg-accent/5" />

             {/* Data Card visualization placeholder if no image */}
             <Stack gap={4} align="center" padding={8} textAlign="center" position="relative" zIndex={10} display={{ base: "none", lg: "flex" }}>
                {type && (
                  <Box paddingX={2} paddingY={1} radius="md" border className="bg-accent/10 border-cyan-500/20">
                    <Text variant="mono" size="micro" className="text-accent font-bold uppercase tracking-widest">{type}</Text>
                  </Box>
                )}
                <Text variant="display" size="lg" className="text-text-main">{title || "BoomTick.blog"}</Text>
                {subtitle && <Text variant="mono" size="xs" color="dim">{subtitle}</Text>}
             </Stack>
          </Box>
        )}

        {/* Caption/Metadata below image/visual */}
        {(caption || (image && (title || subtitle))) && (
          <Box padding={{ base: 5, lg: 6 }} display={{ base: "none", lg: "block" }} border="t" className="border-line/50">
            <Stack gap={1}>
              {!image && caption && (
                <Text size="sm" className="text-text-dim italic">{caption}</Text>
              )}
              {image && (
                 <>
                   {title && <Text weight="font-bold" color="body">{title}</Text>}
                   {subtitle && <Text size="xs" className="text-text-dim">{subtitle}</Text>}
                   {caption && <Text size="xs" color="dim" marginTop={2} className="italic">{caption}</Text>}
                 </>
              )}
            </Stack>
          </Box>
        )}
      </ArticleCard>

      {/* Decorative Accents */}
      <Box className="absolute -top-2 -right-2 w-24 h-24 bg-accent/5 blur-3xl rounded-full pointer-events-none" />
      <Box position="absolute" bottom={-2} left={-2} width={24} height={24} className="bg-accent-purple/5 blur-3xl rounded-full pointer-events-none" />
    </Box>
  );
}
