import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

type PathID = 'dancer' | 'roboticist';

const PATH_DATA = [
  {
    id: 'dancer' as PathID,
    title: 'ARE YOU A DANCER?',
    span: { base: 12, lg: 7 } as const,
    border: 'r' as const,
    bgGradient: 'bg-gradient-to-br',
    titleSize: { base: '4xl', md: '6xl' } as const,
    links: [
      { text: 'Lifestyle blog posts', to: '/blog?category=Lifestyle' },
      { text: 'Gear reviews', to: '/gear' },
    ],
  },
  {
    id: 'roboticist' as PathID,
    title: 'HIRING A ROBOTICIST?',
    span: { base: 12, lg: 5 } as const,
    bgGradient: 'bg-gradient-to-bl',
    titleSize: { base: '3xl', md: '5xl' } as const,
    scanlineDelay: 'delay-100',
    links: [
      { text: 'Tech blog posts', to: '/blog?category=Tech' },
      { text: 'Data & Development Lab', to: '/research' },
    ],
  },
];

export default function PathSelector() {
  const [hoveredPath, setHoveredPath] = useState<PathID | null>(null);
  const [activeId, setActiveId] = useState<PathID | null>(null);
  const navigate = useNavigate();

  return (
    <Grid cols={12} gap={0} border="y" minHeight="[60vh]" width="full" className="bg-black">
      {PATH_DATA.map((path) => {
        const isHovered = hoveredPath === path.id || activeId === path.id;
        const isOtherHovered = (hoveredPath !== null || activeId !== null) && !isHovered;

        return (
          <Stack
            key={path.id}
            span={path.span}
            border={path.border}
            position="relative"
            overflow="hidden"
            cursor="pointer"
            padding={12}
            justify="end"
            height="full"
            className="group bg-black transition-all duration-700 ease-in-out"
            onMouseEnter={() => setHoveredPath(path.id)}
            onMouseLeave={() => setHoveredPath(null)}
            onClick={() => {
              if (activeId === path.id) {
                navigate(path.links[0].to);
              } else {
                setActiveId(path.id);
              }
            }}
          >
            {/* Background Color Layer */}
            <Box
              position="absolute"
              inset
              opacity={isOtherHovered ? 60 : 100}
              className={cn(
                path.bgGradient,
                "from-accent/30 to-black transition-all duration-700 ease-in-out pointer-events-none",
                isOtherHovered && "grayscale"
              )}
            />

            {/* Dark Overlay for Readability */}
            <Box
              position="absolute"
              inset
              zIndex={10}
              className="bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"
            />

            {/* Scanline */}
            <Box
              position="absolute"
              inset="top"
              height={0.5}
              zIndex={15}
              opacity={isHovered ? 100 : 0}
              className={cn(
                "bg-accent shadow-[0_0_15px_#FF7F50] pointer-events-none transition-opacity duration-500",
                path.scanlineDelay,
                isHovered && "animate-scanline"
              )}
            />

            {/* Content (directly in the parent Stack) */}
            <Text
              as="h2"
              variant="display"
              size={path.titleSize}
              weight="font-black"
              color="white"
              marginBottom={4}
              zIndex={20}
              position="relative"
              className="transition-transform duration-500 group-hover:translate-x-2"
            >
              {path.title}
            </Text>
            <Stack
              as="ul"
              gap={4}
              marginBottom={6}
              opacity={isHovered ? 100 : 0}
              zIndex={20}
              position="relative"
              className={cn(
                "font-mono text-sm tracking-widest uppercase text-white font-bold transition-opacity duration-500 delay-75",
                !isHovered && "pointer-events-none"
              )}
            >
              {path.links.map((link) => (
                <li key={link.text}>
                  <NavLink
                    className="hover:text-accent transition-colors flex items-center gap-2"
                    to={link.to}
                  >
                    <Text color="accent" className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </Text>{' '}
                    <Text color="white">{link.text}</Text>
                  </NavLink>
                </li>
              ))}
            </Stack>
          </Stack>
        );
      })}
    </Grid>
  );
}
