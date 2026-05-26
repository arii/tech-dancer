import { useMemo } from 'react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { AffiliateLink } from '@/types';

function InspirationTile({ link }: { link: AffiliateLink }) {
  return (
    <Stack
      as="a"
      href={link.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      radius="lg"
      overflow="hidden"
      surface="surface-alt"
      border
      className="group/tile hover:border-accent/40 transition-all duration-300"
    >
      <Box aspect="square" overflow="hidden" className="bg-bg/50">
        {link.image ? (
          <img
            src={link.image}
            alt={link.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/tile:scale-110"
          />
        ) : (
          <Box flex display="flex" align="center" justify="center" height="full">
            <Text variant="mono" size="micro" color="dim">{link.category}</Text>
          </Box>
        )}
      </Box>
      <Stack padding={3} gap={1}>
        <Text variant="mono" size="micro" color="accent" uppercase tracking="widest">
          {link.category}
        </Text>
        <Text variant="body" size="xs" weight="font-bold" color="white" className="line-clamp-1">
          {link.name}
        </Text>
      </Stack>
    </Stack>
  );
}

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
      radius="xl"
      overflow="hidden"
      surface="surface"
      className="group hover:border-accent/30 transition-all duration-300"
    >
      <Stack direction={{ base: "col", md: "row" }} align="stretch">
        {/* Content Section */}
        <Stack gap={6} padding={8} flex={1} justify="center">
          <Stack gap={2}>
            <Text
              variant="mono"
              size="xs"
              weight="font-bold"
              color="accent"
              uppercase
              tracking="widest"
              marginBottom={1}
            >
              Theme Spotlight
            </Text>
            {label && (
              <Text
                variant="mono"
                size="micro"
                weight="font-medium"
                color="dim"
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
            <Stack direction="row" gap={2} align="center" wrap>
              {colors.map((color, i) => (
                <Box
                  key={`${color}-${i}`}
                  width={8}
                  height={8}
                  radius="full"
                  border
                  style={{ backgroundColor: color }} // impeccable-ignore - Dynamic color swatches require inline styles for arbitrary data-driven colors.
                  className="hover:scale-110 hover:shadow-glow transition-all duration-200 cursor-help"
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

          {/* Outfit Inspiration */}
          {outfits.length > 0 && (
            <Stack gap={4} marginTop={4}>
              <Text variant="mono" size="sm" weight="font-bold" color="dim" uppercase tracking="widest">
                Outfit Inspiration
              </Text>
              <Grid cols={{ base: 2, md: 3 }} gap={4}>
                {outfits.map(link => (
                  <InspirationTile key={link.id} link={link} />
                ))}
              </Grid>
            </Stack>
          )}

          {/* Accessory Ideas */}
          {accessories.length > 0 && (
            <Stack gap={4} marginTop={4}>
              <Text variant="mono" size="sm" weight="font-bold" color="dim" uppercase tracking="widest">
                Accessory Ideas
              </Text>
              <Grid cols={{ base: 2, md: 3 }} gap={4}>
                {accessories.map(link => (
                  <InspirationTile key={link.id} link={link} />
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
