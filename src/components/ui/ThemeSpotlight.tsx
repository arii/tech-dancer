import { Box, Stack, Text } from '@/layouts/Primitives';

interface ThemeSpotlightProps {
  title: string;
  description: string;
  image?: string;
  accentColor?: string;
}

export function ThemeSpotlight({ title, description, image, accentColor = 'var(--raw-color-accent)' }: ThemeSpotlightProps) {
  return (
    <Box
      border
      radius="xl"
      overflow="hidden"
      surface="surface"
      className="group hover:border-accent/30 transition-all duration-300"
    >
      <Box display="flex" direction={{ base: "col", md: "row" }} align="stretch">
        {/* Content Section */}
        <Stack gap={6} padding={8} flex={1} justify="center">
          <Stack gap={2}>
            <Box
              width={12}
              height={1}
              radius="full"
              marginBottom={2}
              style={{ background: accentColor }}
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
            className="bg-surface-alt/50"
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
              className="bg-gradient-to-r from-surface via-transparent to-transparent hidden md:block"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
