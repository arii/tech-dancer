import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Grid, Stack, Text } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

type PathID = 'dancer' | 'roboticist';

const PATH_DATA = [
  {
    id: 'dancer' as PathID,
    title: 'ARE YOU A DANCER?',
    spanClasses: 'col-span-1 lg:col-span-7',
    lgBorder: { r: true } as const,
    bgGradient: 'bg-gradient-to-br',
    titleSize: { base: '3xl', lg: '5xl' } as const,
    links: [
      { text: 'Lifestyle blog posts', to: '/blog?category=Lifestyle' },
      { text: 'Gear reviews', to: '/gear' },
    ],
  },
  {
    id: 'roboticist' as PathID,
    title: 'HIRING A ROBOTICIST?',
    spanClasses: 'col-span-1 lg:col-span-5',
    bgGradient: 'bg-gradient-to-bl',
    titleSize: { base: '2xl', lg: '4xl' } as const,
    scanlineDelay: 'delay-100',
    links: [
      { text: 'Tech blog posts', to: '/blog?category=Tech' },
      { text: 'Data & Development Lab', to: '/research' },
    ],
  },
];

export default function PathSelector() {
  const [hoveredPath, setHoveredPath] = useState<PathID | null>(null);


  return (
    <Grid
      as="section"
      role="img"
      aria-label="Interactive generative tech-dancer visualization: Choose between Dancer and Roboticist paths"
      cols={{ base: 1, lg: 12 }}
      gap={0}
      border="y"

      width="full"
      className="min-h-96 bg-black touch-manipulation"
    >
      {PATH_DATA.map((path) => {
        const isHovered = hoveredPath === path.id;
        const isOtherHovered = hoveredPath !== null && !isHovered;

        return (
          <Box
            key={path.id}
            lgBorder={path.lgBorder as any}
            position="relative"
            overflow="hidden"
            cursor="pointer"
            className={cn(path.spanClasses, "group touch-manipulation")}
            onMouseEnter={() => setHoveredPath(path.id)}
            onMouseLeave={() => setHoveredPath(null)}
          >
            {/* Background */}
            <Box
              position="absolute"
              inset
              className={cn(
                path.bgGradient,
                "from-accent/30 to-black transition-all duration-700 ease-in-out",
                isOtherHovered ? 'grayscale opacity-60' : 'opacity-100'
              )}
            />

            {/* Scanline */}
            <Box
              position="absolute"
              inset="top"

              zIndex={10}
              className={cn(
                "h-0.5 bg-accent shadow-[0_0_15px_#FF7F50] pointer-events-none transition-opacity duration-500",
                path.scanlineDelay,
                isHovered ? 'opacity-100 motion-safe:animate-scanline' : 'opacity-0'
              )}
            />

            {/* Content Container */}
            <Stack
              position="relative"
              zIndex={20}
              padding={{ base: 6, md: 8 }}
              height="full"
              justify="end"
              className="bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            >
              <Text
                as="h2"
                variant="display"
                size={path.titleSize}
                weight="font-black"
                color="white"
                className="transition-transform duration-500 group-hover:translate-x-2 mb-3"
              >
                {path.title}
              </Text>

              <Box as="ul" className="space-y-2 mb-2">
                {path.links.map((link) => (
                  <li key={link.text}>
                    <Text
                      as={NavLink}
                      to={link.to}
                      variant="mono"
                      size={{ base: 'xs', md: 'sm' }}
                      tracking="widest"
                      uppercase
                      weight="font-bold"
                      color="white"
                      className="opacity-80 group-hover:opacity-100 transition-opacity hover:text-accent flex items-center gap-2"
                    >
                      <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>{' '}
                      {link.text}
                    </Text>
                  </li>
                ))}
              </Box>
            </Stack>
          </Box>
        );
      })}
    </Grid>
  );
}
