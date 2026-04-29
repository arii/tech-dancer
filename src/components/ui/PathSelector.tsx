import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';

type PathID = 'dancer' | 'roboticist';

const PATH_DATA = [
  {
    id: 'dancer' as PathID,
    title: 'ARE YOU A DANCER?',
    wrapperClass: 'lg:col-span-7 border-r border-line/20',
    bgGradient: 'bg-gradient-to-br',
    titleClass: 'text-4xl md:text-6xl',
    links: [
      { text: 'Lifestyle blog posts', to: '/blog?category=Lifestyle' },
      { text: 'Gear reviews', to: '/gear' },
    ],
  },
  {
    id: 'roboticist' as PathID,
    title: 'HIRING A ROBOTICIST?',
    wrapperClass: 'lg:col-span-5',
    bgGradient: 'bg-gradient-to-bl',
    titleClass: 'text-3xl md:text-5xl',
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
    <Box className="grid grid-cols-1 lg:grid-cols-12" gap={0} border="y" height="[60vh]" width="full" surface="contrast">
      {PATH_DATA.map((path) => {
        const isHovered = hoveredPath === path.id;
        const isOtherHovered = hoveredPath !== null && !isHovered;

        return (
          <Box
            key={path.id}
            className={`${path.wrapperClass} group cursor-pointer`}
            position="relative"
            overflow="hidden"
            onMouseEnter={() => setHoveredPath(path.id)}
            onMouseLeave={() => setHoveredPath(null)}
            onClick={() => setHoveredPath(isHovered ? null : path.id)}
          >
            {/* Background */}
            <Box
              position="absolute"
              inset
              className={`${path.bgGradient} from-accent/30 to-black transition-all duration-700 ease-in-out ${
                isOtherHovered ? 'grayscale opacity-60' : 'opacity-100'
              }`}
            />

            {/* Scanline */}
            <Box
              position="absolute"
              top={0}
              left={0}
              width="full"
              height={0.5}
              className={`bg-accent shadow-[0_0_15px_var(--color-accent-shadow)] z-10 pointer-events-none transition-opacity duration-500 ${
                path.scanlineDelay || ''
              } ${isHovered ? 'opacity-100 animate-scanline' : 'opacity-0'}`}
            />

            {/* Content Container */}
            <Stack position="relative" zIndex={20} padding={12} height="full" direction="col" justify="end" gap={0} className="bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <Text
                as="h2"
                className={`${path.titleClass} font-display font-black mb-4 text-white transition-transform duration-500 group-hover:translate-x-2`}
              >
                {path.title}
              </Text>
              <Stack as="ul" gap={4} marginBottom={6} className="font-mono text-sm tracking-widest uppercase text-white font-bold opacity-80 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                {path.links.map((link) => (
                  <li key={link.text}>
                    <NavLink
                      className="hover:text-accent transition-colors flex items-center gap-2"
                      to={link.to}
                    >
                      <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>{' '}
                      {link.text}
                    </NavLink>
                  </li>
                ))}
              </Stack>
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
}
