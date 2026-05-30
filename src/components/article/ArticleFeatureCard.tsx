

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
  image
}: ArticleFeatureCardProps) {
  return (
    <Box className="relative group">
      {/* Card Shell */}
      <ArticleCard className="overflow-hidden">
        {image ? (
          <Box className="aspect-[4/3] sm:aspect-video lg:aspect-[4/3] overflow-hidden relative">
            {showImagePair && imageBack ? (
              <Box className="w-full h-full flex transition-transform duration-700 group-hover:scale-105">
                <Box className="flex-1 border-r border-line/50">
                  <img src={image} alt={title || "Feature visual front"} className="w-full h-full object-contain" />
                </Box>
                <Box className="flex-1">
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
          <Box className="aspect-[4/3] sm:aspect-video lg:aspect-[4/3] bg-surface flex items-center justify-center border-b border-line/50 relative overflow-hidden">
             {/* Simplified Fallback pattern */}
             <Box className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />

             {/* Data Card visualization placeholder if no image */}
             <Stack gap={4} align="center" className="p-8 text-center relative z-10 hidden lg:flex">
                {type && (
                  <Box className="px-2 py-1 rounded bg-accent/10 border border-cyan-500/20">
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
          <Box className="p-5 lg:p-6 border-t border-line/50 hidden lg:block">
            <Stack gap={1}>
              {!image && caption && (
                <Text size="sm" className="text-text-dim italic">{caption}</Text>
              )}
              {image && (
                 <>
                   {title && <Text weight="font-bold" color="body">{title}</Text>}
                   {subtitle && <Text size="xs" className="text-text-dim">{subtitle}</Text>}
                   {caption && <Text size="xs" color="dim" className="mt-2 italic">{caption}</Text>}
                 </>
              )}
            </Stack>
          </Box>
        )}
      </ArticleCard>

      {/* Decorative Accents */}
      <Box className="absolute -top-2 -right-2 w-24 h-24 bg-accent/5 blur-3xl rounded-full pointer-events-none" />
      <Box className="absolute -bottom-2 -left-2 w-24 h-24 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />
    </Box>
  );
}
