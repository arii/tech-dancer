import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { motion } from 'motion/react';

type PathID = 'dancer' | 'roboticist';

export interface PathLink {
  label: string;
  path: string;
}

interface PathSelectorProps {
  dancerLinks: PathLink[];
  roboticistLinks: PathLink[];
}

export default function PathSelector({ dancerLinks, roboticistLinks }: PathSelectorProps) {
  const [hoveredPath, setHoveredPath] = useState<PathID | null>(null);

  const PATH_DATA = [
    {
      id: 'dancer' as PathID,
      title: 'ARE YOU A DANCER?',
      span: { base: 12, lg: 7 },
      bgGradient: 'from-accent/30 to-black',
      size: '4xl' as const,
      lgSize: '6xl' as const,
      links: dancerLinks,
      border: 'r' as const
    },
    {
      id: 'roboticist' as PathID,
      title: 'HIRING A ROBOTICIST?',
      span: { base: 12, lg: 5 },
      bgGradient: 'from-accent/30 to-black',
      size: '3xl' as const,
      lgSize: '5xl' as const,
      scanlineDelay: 'delay-100',
      links: roboticistLinks,
    },
  ];

  return (
    <Grid cols={1} lg={12} gap={0} border="y" minHeight="[60vh]" width="full" className="bg-black">
      {PATH_DATA.map((path) => {
        const isHovered = hoveredPath === path.id;
        const isOtherHovered = hoveredPath !== null && !isHovered;

        return (
          <Box
            key={path.id}
            span={path.span}
            position="relative"
            overflow="hidden"
            cursor="pointer"
            border={path.border}
            className="group"
            onMouseEnter={() => setHoveredPath(path.id)}
            onMouseLeave={() => setHoveredPath(null)}
          >
            {/* Background */}
            <Box
              position="absolute"
              inset
              opacity={isOtherHovered ? 60 : 100}
              className={`bg-gradient-to-br ${path.bgGradient} transition-all duration-700 ease-in-out ${
                isOtherHovered ? 'grayscale' : ''
              }`}
            />

            {/* Scanline */}
            <Box
              position="absolute"
              inset="top"
              height="[2px]"
              zIndex="docked"
              className={`bg-accent shadow-[0_0_15px_#FF7F50] pointer-events-none transition-opacity duration-500 ${
                path.scanlineDelay || ''
              } ${isHovered ? 'opacity-100 animate-scanline' : 'opacity-0'}`}
            />

            {/* Content Container */}
            <Box
              position="relative"
              zIndex="dropdown"
              padding={12}
              height="full"
              display="flex"
              direction="col"
              justify="end"
              className="bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            >
              <Text
                as={motion.h2}
                variant="display"
                size={{ base: path.size, lg: path.lgSize }}
                weight="font-black"
                marginBottom={4}
                className="text-white transition-transform duration-500 group-hover:translate-x-2"
              >
                {path.title}
              </Text>
              <Stack as="ul" gap={4} marginBottom={6} opacity={80} className="group-hover:opacity-100 transition-opacity duration-500 delay-75">
                {path.links.map((link) => (
                  <Box as="li" key={link.label}>
                    <NavLink
                      className="hover:text-accent transition-colors flex items-center gap-2"
                      to={link.path}
                    >
                      <Text variant="mono" size="sm" weight="font-bold" className="text-white flex items-center gap-2">
                        <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>{' '}
                        {link.label}
                      </Text>
                    </NavLink>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        );
      })}
    </Grid>
  );
}
