import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';

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
    <Grid cols={12} gap={0} border="y" minHeight="60vh" width="full" className="bg-black">
      {PATH_DATA.map((path) => {
        const isHovered = hoveredPath === path.id || activeId === path.id;
        const isOtherHovered = (hoveredPath !== null || activeId !== null) && !isHovered;

        return (
          <Box
            key={path.id}
            span={path.span}
            border={path.border}
            position="relative"
            overflow="hidden"
            cursor="pointer"
            className="group"
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
            {/* Background */}
            <Box
              position="absolute"
              inset
              opacity={isOtherHovered ? 60 : 100}
              className={`${path.bgGradient} from-accent/30 to-black transition-all duration-700 ease-in-out ${
                isOtherHovered ? 'grayscale' : ''
              }`}
            ></Box>

            {/* Scanline */}
            <Box
              position="absolute"
              inset="top"
              height="[2px]"
              zIndex={10}
              opacity={isHovered ? 100 : 0}
              className={`bg-accent shadow-[0_0_15px_#FF7F50] pointer-events-none transition-opacity duration-500 ${
                path.scanlineDelay || ''
              } ${isHovered ? 'animate-scanline' : ''}`}
            ></Box>

            {/* Content Container */}
            <Stack
              position="relative"
              zIndex={20}
              padding={12}
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
                marginBottom={4}
                className="transition-transform duration-500 group-hover:translate-x-2"
              >
                {path.title}
              </Text>
              <Stack
                as="ul"
                gap={4}
                marginBottom={6}
                opacity={80}
                className="font-mono text-sm tracking-widest uppercase text-white font-bold group-hover:opacity-100 transition-opacity duration-500 delay-75"
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
          </Box>
        );
      })}
    </Grid>
  );
}
