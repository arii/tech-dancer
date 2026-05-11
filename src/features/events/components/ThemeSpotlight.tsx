import { useMemo } from 'react';
import { Box, Stack, Text } from '@/layouts/Primitives';

interface ThemeSpotlightProps {
  title: string;
  description: string;
  image?: string;
  accentColor?: string;
}

export function ThemeSpotlight({ title, description, image, accentColor = 'var(--raw-color-accent)' }: ThemeSpotlightProps) {
  const accentStyle = useMemo(() => ({ backgroundColor: accentColor } as React.CSSProperties), [accentColor]);

  return (
    <Box
      border
      radius="xl"
      overflow="hidden"
      surface="surface"
      className="group hover:border-accent/30 transition-all duration-300"
    >
      <Stack direction={{ base: "col", md: "row" }} align="stretch">
        {/* Content Section */}
        <Stack gap={6} padding={8} flex={1} justify="center">
          <Stack gap={2}>
            <Box
              width={12}
              height={1}
              radius="full"
              marginBottom={2}
              style={accentStyle}
            />
            <Text
              as="h3"
              variant="display"
              size="2xl"
              weight="font-black"
              color="white"
              tracking="tight"
            >
              {title}
            </Text>
          </Stack>
          <Text
            variant="body"
            size="base"
            color="dim"
            className="leading-relaxed"
          >
            {description}
          </Text>
        </Stack>

        {/* Image Section */}
        {image && (
          <Box
            width={{ base: "full", md: "2/5" }}
            minHeight={{ base: 48, md: "auto" }}
            position="relative"
            overflow="hidden"
            className="theme-spotlight-image-bg"
          >
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              aria-hidden="true"
            />
            <Box
              position="absolute"
              inset
              display={{ base: "none", md: "block" }}
              className="theme-spotlight-image-overlay"
            />
          </Box>
        )}
      </Stack>
    </Box>
  );
}
