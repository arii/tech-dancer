import { useMemo } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { AffiliateCard } from '@/components/ui/AffiliateCard';
import { AffiliateLink } from '@/types';

interface ThemeSpotlightProps {
  id?: string;
  title: string;
  label?: string;
  description: string;
  image?: string;
  outfits?: AffiliateLink[];
  accessories?: AffiliateLink[];
  colors?: string[];
  accentColor?: string;
}

export function ThemeSpotlight({
  id,
  title,
  label,
  description,
  image,
  outfits = [],
  accessories = [],
  colors = [],
  accentColor = 'var(--raw-color-accent)'
}: ThemeSpotlightProps) {
  const accentStyle = useMemo(() => ({ backgroundColor: accentColor } as React.CSSProperties), [accentColor]);

  return (
    <Box
      id={id}
      data-testid="theme"
      border
      scrollMarginTop={32}
      radius="xl"
      overflow="hidden"
      surface="surface"
      className="group hover:border-accent/30 transition-all duration-300"
    >
      <Stack direction={{ base: "col", md: "row" }} align="stretch">
        {/* Content Section */}
        <Stack gap={6} padding={8} flex={1} justify="center">
          <Stack gap={2}>
            {label && (
              <Text
                variant="mono"
                size="xs"
                weight="font-bold"
                color="accent"
                uppercase
                tracking="widest"
                marginBottom={1}
              >
                {label}
              </Text>
            )}
            <Box
              width={12}
              height={1}
              radius="full"
              marginBottom={2}
              style={accentStyle} // impeccable-ignore - Dynamic theme-driven accent color requires inline style.
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

          {colors.length > 0 && (
            <Stack direction="row" gap={3} align="center">
              {colors.map((color, i) => (
                <Box
                  key={`${color}-${i}`}
                  width={6}
                  height={6}
                  radius="full"
                  border
                  style={{ backgroundColor: color }} // impeccable-ignore - Dynamic color swatches require inline styles for arbitrary data-driven colors.
                  className="hover:scale-110 transition-transform cursor-help shadow-sm"
                  title={color}
                />
              ))}
            </Stack>
          )}

          <Text
            variant="body"
            size="base"
            color="dim"
            className="leading-relaxed"
          >
            {description}
          </Text>

          {/* Outfit Recommendations */}
          {outfits.length > 0 && (
            <Stack gap={4} marginTop={4}>
              <Text variant="mono" size="sm" weight="font-bold" color="dim" uppercase tracking="widest">
                Recommended Outfits
              </Text>
              <Grid cols={{ base: 1, sm: 2 }} gap={4}>
                {outfits.map(link => (
                  <AffiliateCard key={link.id} link={link} />
                ))}
              </Grid>
            </Stack>
          )}

          {/* Accessory Recommendations */}
          {accessories.length > 0 && (
            <Stack gap={4} marginTop={4}>
              <Text variant="mono" size="sm" weight="font-bold" color="dim" uppercase tracking="widest">
                Recommended Accessories
              </Text>
              <Grid cols={{ base: 1, sm: 2 }} gap={4}>
                {accessories.map(link => (
                  <AffiliateCard key={link.id} link={link} />
                ))}
              </Grid>
            </Stack>
          )}
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
