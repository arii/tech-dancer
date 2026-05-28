
/* impeccable-ignore-file */
import { Box, Stack, Text } from '@/layouts/Primitives';

interface ArticleFeatureCardProps {
  type?: string;
  title?: string;
  subtitle?: string;
  caption?: string;
  image?: string;
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
      <Box className="rounded-2xl border border-slate-800/80 bg-slate-950/60 overflow-hidden backdrop-blur-sm">
        {image ? (
          <Box className="aspect-[4/3] overflow-hidden relative">
            <img
              src={image}
              alt={title || "Feature visual"}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <Box className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          </Box>
        ) : (
          <Box className="aspect-[4/3] bg-slate-900 flex items-center justify-center border-b border-slate-800/50">
             {/* Data Card visualization placeholder if no image */}
             <Stack gap={4} align="center" className="p-8 text-center">
                {type && (
                  <Box className="px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">
                    <Text variant="mono" size="micro" className="text-cyan-400 font-bold uppercase tracking-widest">{type}</Text>
                  </Box>
                )}
                {title && <Text variant="display" size="lg" className="text-slate-100">{title}</Text>}
                {subtitle && <Text variant="mono" size="xs" color="dim">{subtitle}</Text>}
             </Stack>
          </Box>
        )}

        {/* Caption/Metadata below image/visual */}
        {(caption || (image && (title || subtitle))) && (
          <Box className="p-5 lg:p-6 border-t border-slate-800/50">
            <Stack gap={1}>
              {!image && caption && (
                <Text size="sm" className="text-slate-400 italic">{caption}</Text>
              )}
              {image && (
                 <>
                   {title && <Text weight="font-bold" className="text-slate-200">{title}</Text>}
                   {subtitle && <Text size="xs" className="text-slate-500">{subtitle}</Text>}
                   {caption && <Text size="xs" className="text-slate-400 mt-2 italic">{caption}</Text>}
                 </>
              )}
            </Stack>
          </Box>
        )}
      </Box>

      {/* Decorative Accents */}
      <Box className="absolute -top-2 -right-2 w-24 h-24 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />
      <Box className="absolute -bottom-2 -left-2 w-24 h-24 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />
    </Box>
  );
}
