import { ReactNode } from 'react';
import { Box, Stack, Grid, Text } from '@/layouts/Primitives';

export interface ProfileStoryRowProps {
  id?: string;
  eyebrow?: string;
  title: string;
  content?: string;
  imageSrc?: string;
  imageAlt?: string;
  caption?: string;
  reverse?: boolean;
  children?: ReactNode;
}

const ProfileStoryRow = ({
  id,
  eyebrow,
  title,
  content,
  imageSrc,
  imageAlt,
  caption,
  reverse = false,
  children,
}: ProfileStoryRowProps) => {
  return (
    <Box as="section" id={id} scrollMarginTop={24} width="full" paddingY={{ base: 4, lg: 6 }}>
      <Grid
        cols={{ default: 1, lg: 12 }}
        gap={{ default: 8, lg: 12 }}
        align="center"
        width="full"
      >
        {/* Text Column */}
        <Box
          className={`lg:col-span-7 ${
            reverse ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <Stack gap={4} className="max-w-2xl">
            {eyebrow && (
              <Box
                display="inline-flex"
                align="center"
                gap={2}
                paddingX={2.5}
                paddingY={0.5}
                radius="md"
                border
                className="bg-surface border-line/60 text-brand-cyan w-fit"
              >
                <Text variant="mono" size="xs" weight="font-bold" uppercase tracking="wider">
                  {eyebrow}
                </Text>
              </Box>
            )}

            <Text
              as="h2"
              variant="headline"
              size="fluid-4"
              weight="font-bold"
              leading="tight"
              tracking="tight"
              className="text-text-main"
            >
              {title}
            </Text>

            {content && (
              <Text
                variant="body"
                size={{ base: "base", sm: "lg" }}
                className="text-text-dim leading-relaxed text-pretty"
              >
                {content}
              </Text>
            )}

            {children}
          </Stack>
        </Box>

        {/* Image Column */}
        {imageSrc && (
          <Box
            className={`lg:col-span-5 flex justify-center ${
              reverse ? 'lg:order-1 lg:justify-start' : 'lg:order-2 lg:justify-end'
            }`}
          >
            <Box
              width="full"
              maxWidth="sm"
              overflow="hidden"
              radius="2xl"
              border
              className="border-line/60 bg-surface shadow-xl group transition-all duration-300 hover:border-brand-cyan/40"
            >
              <Box width="full" overflow="hidden" position="relative" aspect="4/5">
                <img
                  src={imageSrc}
                  alt={imageAlt || title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </Box>
              {caption && (
                <Box
                  paddingX={4}
                  paddingY={2}
                  display="flex"
                  align="center"
                  justify="between"
                  border="t"
                  className="bg-surface/90 backdrop-blur-md border-line/40"
                >
                  <Text variant="mono" size="xs" weight="font-medium" className="text-text-dim">
                    {caption}
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default ProfileStoryRow;
