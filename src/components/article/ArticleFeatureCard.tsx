

import { Box, Stack, Text } from '@/layouts/Primitives';
import { ArticleCard } from './ArticleCard';

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
    <Box position="relative" className="group">
      {/* Card Shell */}
      <ArticleCard className="overflow-hidden">
        {image ? (
          <Box position="relative" aspect="16/9" overflow="hidden">
            <img
              src={image}
              alt={title || "Feature visual"}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <Box position="absolute" inset={0} className="bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
          </Box>
        ) : (
          <Box
            position="relative"
            aspect="16/9"
            surface="surface"
            border="b"
            display="flex"
            align="center"
            justify="center"
            overflow="hidden"
            className="border-line/50"
          >
             <Box
               position="absolute"
               inset={0}
               opacity={10}
               className="bg-accent blur-3xl"
             />

             <Stack
                gap={4}
                align="center"
                padding={8}
                display={{ base: 'none', lg: 'flex' }}
                position="relative"
                className="text-center z-10"
             >
                {type && (
                  <Box paddingX={2} paddingY={1} radius="sm" className="bg-accent/10 border border-accent/20">
                    <Text variant="mono" size="micro" color="accent" weight="font-bold" uppercase tracking="utility">{type}</Text>
                  </Box>
                )}
                <Text variant="display" size="lg" color="main">{title}</Text>
                {subtitle && <Text variant="mono" size="xs" color="dim">{subtitle}</Text>}
             </Stack>
          </Box>
        )}

        {/* Caption/Metadata below image/visual */}
        {(caption || (image && (title || subtitle))) && (
          <Box padding={{ base: 5, lg: 6 }} border="t" display={{ base: 'none', lg: 'block' }} className="border-line/50">
            <Stack gap={1}>
              {!image && caption && (
                <Text size="sm" color="dim" className="italic">{caption}</Text>
              )}
              {image && (
                 <>
                   {title && <Text weight="font-bold" color="body">{title}</Text>}
                   {subtitle && <Text size="xs" color="dim">{subtitle}</Text>}
                   {caption && <Text size="xs" color="dim" marginTop={2} className="italic">{caption}</Text>}
                 </>
              )}
            </Stack>
          </Box>
        )}
      </ArticleCard>

      {/* Decorative Accents */}
      <Box position="absolute" top={-2} right={-2} width={24} height={24} radius="full" className="bg-accent/5 blur-3xl pointer-events-none" />
      <Box position="absolute" bottom={-2} left={-2} width={24} height={24} radius="full" className="bg-accent/5 blur-3xl pointer-events-none opacity-50" />
    </Box>
  );
}
