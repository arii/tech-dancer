import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';

const POPULAR = [
  { title: 'Make Any Shoe a Dance Shoe', slug: '2026-04-18-make-shoe-dance' },
  { title: 'WCS Travel Pack', slug: '2026-04-19-gear-essentials' },
  { title: 'Halloween costumes you can dance in', slug: '2026-04-18-halloween-costumes' },
  { title: "Why Most Above-Average Dancers Don't Make Finals", slug: '2026-04-18-why-finals-are-hard' },
];

export function PopularResources() {
  return (
    <Box as="section" marginTop={{ base: 12, lg: 20 }}>
      <Stack gap={6}>
        <Text variant="mono" size="xs" color="brand" weight="font-black" uppercase tracking="widest">
          Most Read
        </Text>
        <Box as="ul" className="space-y-4">
          {POPULAR.map((item) => (
            <Box as="li" key={item.slug} className="list-none">
              <Box
                as={NavLink}
                to={`/blog/${item.slug}`}
                display="flex"
                align="baseline"
                gap={4}
                className="group"
              >
                <Text
                  variant="mono"
                  size="xs"
                  color="dim"
                  className="group-hover:text-accent transition-colors"
                >
                  •
                </Text>
                <Text
                  variant="body"
                  size="lg"
                  weight="font-bold"
                  color="main"
                  className="group-hover:text-accent transition-colors border-b border-transparent group-hover:border-accent/20"
                >
                  {item.title}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
